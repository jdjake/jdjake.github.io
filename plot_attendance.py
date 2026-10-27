from pathlib import Path
import re
import argparse

import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from bs4 import BeautifulSoup

import seaborn as sns
from itertools import cycle


def extract_original_game(file_path):
    """Extract date and players from an original game HTML file."""
    match = re.search(r"(\d{4}\.\d{2}\.\d{2})", file_path.name)
    if not match:
        print(f"Skipping file with unrecognized date: {file_path}")
        return None

    game_date = pd.to_datetime(match.group(1), format="%Y.%m.%d")

    with file_path.open("r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    players_heading = next(
        (
            h4 for h4 in soup.find_all("h4")
            if re.search(
                r"\bPlayers\s*:",
                h4.get_text(" ", strip=True),
                flags=re.IGNORECASE,
            )
        ),
        None,
    )

    if players_heading is None:
        print(f"No Players heading found: {file_path}")
        return None

    text = players_heading.get_text(" ", strip=True)
    player_text = re.split(
        r"\bPlayers\s*:", text, maxsplit=1, flags=re.IGNORECASE
    )[1]

    players = [
        name.strip()
        for name in player_text.split(",")
        if name.strip()
    ]

    return {
        "date": game_date,
        "players": sorted(set(players)),
        "source": "Original",
        "file": str(file_path),
    }



def extract_chime_session(file_path):
    from bs4 import BeautifulSoup
    from pathlib import Path
    import re
    import pandas as pd

    with open(file_path, "r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    # Find a date such as "11th July, 2026" or "23rd May, 2026".
    date = None
    date_pattern = re.compile(
        r"\b(\d{1,2})(?:st|nd|rd|th)?\s+"
        r"([A-Za-z]+),?\s+(\d{4})\b",
        re.IGNORECASE,
    )

    # Prefer paragraphs in the main article, avoiding navigation text.
    main = soup.find("main") or soup
    for paragraph in main.find_all("p"):
        match = date_pattern.search(paragraph.get_text(" ", strip=True))
        if match:
            date_text = (
                f"{match.group(1)} {match.group(2)} {match.group(3)}"
            )
            date = pd.to_datetime(
                date_text, format="%d %B %Y", errors="coerce"
            )
            if pd.notna(date):
                break

    if date is None or pd.isna(date):
        print(f"WARNING: Could not find date in {file_path}")
        return None

    # Match both "Players" and "Players:" headings, including headings
    # that contain anchor links or other nested elements.
    players_heading = None
    for heading in main.find_all(["h1", "h2", "h3", "h4", "h5", "h6"]):
        heading_text = heading.get_text(" ", strip=True)
        if re.match(r"^Players\s*:?\s*$", heading_text, re.IGNORECASE):
            players_heading = heading
            break

    if players_heading is None:
        print(f"WARNING: Could not find Players heading in {file_path}")
        return None

    # Find the first list after the Players heading, stopping if another
    # heading appears first.
    players_list = None
    for element in players_heading.find_all_next(["ul", "ol", "h1", "h2", "h3", "h4", "h5", "h6"]):
        if element.name in ["h1", "h2", "h3", "h4", "h5", "h6"]:
            break
        if element.name in ["ul", "ol"]:
            players_list = element
            break

    if players_list is None:
        print(f"WARNING: Could not find player list in {file_path}")
        return None

    players = []
    for li in players_list.find_all("li", recursive=False):
        # Use the visible player name, excluding "(Playing Character)".
        player_text = li.get_text(" ", strip=True)
        player_name = re.sub(r"\s*\(Playing\b.*$", "", player_text).strip()

        if player_name:
            players.append(player_name)

    if not players:
        print(f"WARNING: No players extracted from {file_path}")
        return None

    return {
        "date": date,
        "players": players,
        "source": str(Path(file_path)),
    }


def main():
    parser = argparse.ArgumentParser(
        description="Plot cumulative attendance across both datasets."
    )

    parser.add_argument(
        "folder",
        nargs="?",
        default="rpg",
        help="Folder containing original game HTML files.",
    )

    parser.add_argument(
        "--chime-folder",
        default="chime/campaign-info/session-summaries",
        help="Root folder containing Chime session summaries.",
    )

    # Add this alongside your existing command-line arguments
    parser.add_argument(
        "--dolmenwood-folder",
        type=Path,
        default=Path("dolmenwood/campaign-info/session-summaries"),
        help="Folder containing Dolmenwood session summaries",
    )

    parser.add_argument(
        "--output",
        default="attendance",
        help="Output filename prefix.",
    )

    args = parser.parse_args()

    original_folder = Path(args.folder)
    chime_folder = Path(args.chime_folder)

    if not original_folder.is_dir():
        raise SystemExit(
            f"Original game folder not found: {original_folder}"
        )

    if not chime_folder.is_dir():
        raise SystemExit(
            f"Chime session folder not found: {chime_folder}"
        )

    # Collect original games.
    games = []

    for file_path in original_folder.glob("*.html"):
        result = extract_original_game(file_path)
        if result is not None:
            games.append(result)





    # Parse session summaries from both campaigns
    session_folders = [
        args.chime_folder,
        args.dolmenwood_folder,
    ]

    for folder in session_folders:
        folder = Path(folder)
        if not folder.exists():
            print(f"WARNING: Session folder not found: {folder}")
            continue

        for index_file in folder.rglob("index.html"):
            session = extract_chime_session(index_file)
            if session is not None:
                games.append(session)






    if not games:
        raise SystemExit("No valid attendance data found.")

    # Sort both datasets together by date.
    games.sort(key=lambda game: game["date"])

    all_players = sorted({
        player
        for game in games
        for player in game["players"]
    })

    # Create one attendance row per game/session.
    rows = []

    for game in games:
        row = {
            player: int(player in game["players"])
            for player in all_players
        }
        row["date"] = game["date"]
        rows.append(row)

    attendance = pd.DataFrame(rows).set_index("date")
    attendance.index.name = "date"

    # Combine events occurring on the same date.
    attendance = attendance.groupby(level=0).sum().sort_index()

    # Cumulative attendance across both datasets.
    cumulative = attendance.cumsum()

    # Export all players to CSV, including one-time attendees.
    csv_path = f"{args.output}.csv"
    cumulative.to_csv(csv_path, index_label="date")

    # Only display players who attended more than one event overall.
    players_to_plot = [
        player for player in cumulative.columns
        if cumulative[player].iloc[-1] > 3 and cumulative[player].iloc[-1] <= 10
    ]

    # Generate a distinct color for every player
    palette = sns.color_palette(
        "husl",
        n_colors=len(players_to_plot)
    )

    # Cycle through line styles as an additional visual distinction
    line_styles = cycle(["-", "--", "-.", ":"])

    fig, ax = plt.subplots(figsize=(16, 9))

    for player, color in zip(players_to_plot, palette):
        ax.step(
            cumulative.index,
            cumulative[player],
            where="post",
            label=player,
            color=color,
            linestyle=next(line_styles),
            linewidth=2
        )

    ax.set_title(
        "Cumulative Player Attendance Over Time",
        fontsize=16,
    )
    ax.set_xlabel("Date", fontsize=12)
    ax.set_ylabel("Total Games / Sessions Attended", fontsize=12)

    ax.xaxis.set_major_locator(mdates.AutoDateLocator())
    ax.xaxis.set_major_formatter(
        mdates.ConciseDateFormatter(ax.xaxis.get_major_locator())
    )

    ax.set_ylim(bottom=0)
    ax.grid(True, alpha=0.3)

    if players_to_plot:
        ax.legend(
            title="Players (3-10 games)",
            bbox_to_anchor=(1.02, 1),
            loc="upper left",
        )
    else:
        ax.text(
            0.5, 0.5,
            "No players have attended more than one event",
            ha="center",
            va="center",
            transform=ax.transAxes,
        )

    fig.tight_layout()

    plot_path = f"{args.output}.png"
    fig.savefig(plot_path, dpi=200, bbox_inches="tight")
    plt.show()

    print(f"Original games processed: "
          f"{sum(g['source'] == 'Original' for g in games)}")
    print(f"Chime sessions processed: "
          f"{sum(g['source'] == 'Chime' for g in games)}")
    print(f"Total players found: {len(all_players)}")
    print(f"Players shown in graph: {len(players_to_plot)}")
    print(f"CSV saved to: {csv_path}")
    print(f"Graph saved to: {plot_path}")


if __name__ == "__main__":
    main()