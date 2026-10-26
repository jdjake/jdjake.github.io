
from pathlib import Path
import re
import argparse

import pandas as pd
import matplotlib.pyplot as plt
import matplotlib.dates as mdates
from bs4 import BeautifulSoup


def extract_game_data(file_path):
    """Extract the game date and attending players from one HTML file."""
    # Extract date from filenames such as 2026.05.06.html
    match = re.search(r"(\d{4}\.\d{2}\.\d{2})", file_path.name)
    if not match:
        print(f"Skipping file with unrecognized date: {file_path.name}")
        return None

    game_date = pd.to_datetime(match.group(1), format="%Y.%m.%d")

    # Parse HTML
    with file_path.open("r", encoding="utf-8") as f:
        soup = BeautifulSoup(f, "html.parser")

    # Find the heading containing the player list
    players_heading = next(
        (
            h4 for h4 in soup.find_all("h4")
            if re.search(r"\bPlayers\s*:", h4.get_text(" ", strip=True),
                         flags=re.IGNORECASE)
        ),
        None,
    )

    if players_heading is None:
        print(f"No Players heading found: {file_path.name}")
        return None

    # Extract names following "Players:"
    text = players_heading.get_text(" ", strip=True)
    player_text = re.split(r"\bPlayers\s*:", text, maxsplit=1,
                            flags=re.IGNORECASE)[1]

    players = [
        name.strip()
        for name in player_text.split(",")
        if name.strip()
    ]

    return game_date, players


def main():
    parser = argparse.ArgumentParser(
        description="Plot cumulative player attendance from game HTML files."
    )
    parser.add_argument(
        "folder",
        nargs="?",
        default="rpg",
        help="Folder containing HTML files (default: html_files)",
    )
    parser.add_argument(
        "--output",
        default="attendance",
        help="Output filename prefix (default: attendance)",
    )
    args = parser.parse_args()

    folder = Path(args.folder)

    if not folder.is_dir():
        raise SystemExit(f"Folder not found: {folder}")

    # Read all HTML files in the folder
    games = []
    for file_path in sorted(folder.glob("*.html")):
        result = extract_game_data(file_path)
        if result is not None:
            game_date, players = result
            games.append({
                "date": game_date,
                "players": players,
                "file": file_path.name,
            })

    if not games:
        raise SystemExit("No valid game data found.")

    # Sort games chronologically
    games.sort(key=lambda game: game["date"])

    # Count attendance for every player at every game
    all_players = sorted({
        player
        for game in games
        for player in game["players"]
    })

    # Each row represents one game; each column represents a player.
    # A 1 means the player attended that game; otherwise, 0.
    attendance = pd.DataFrame(
        0,
        index=pd.DatetimeIndex(
            [game["date"] for game in games], name="date"
        ),
        columns=all_players,
    )

    for game in games:
        for player in set(game["players"]):
            attendance.loc[game["date"], player] += 1

    # Combine games on the same date, if there are multiple.
    attendance = attendance.groupby(level=0).sum().sort_index()

    # Calculate cumulative attendance through each date
    cumulative = attendance.cumsum()

    # Save cumulative attendance data
    csv_path = f"{args.output}.csv"
    cumulative.to_csv(csv_path, index_label="date")

    # Plot one line per player
    # Plot only players who have attended more than one game
    fig, ax = plt.subplots(figsize=(13, 7))

    players_to_plot = [
        player for player in cumulative.columns
        if cumulative[player].iloc[-1] > 3
    ]

    for player in players_to_plot:
        ax.step(
            cumulative.index,
            cumulative[player],
            where="post",
            label=player,
            linewidth=2,
        )

    ax.set_title("Cumulative Player Attendance Over Time", fontsize=16)
    ax.set_xlabel("Game Date", fontsize=12)
    ax.set_ylabel("Total Games Attended", fontsize=12)

    ax.xaxis.set_major_locator(mdates.AutoDateLocator())
    ax.xaxis.set_major_formatter(
        mdates.ConciseDateFormatter(ax.xaxis.get_major_locator())
    )

    ax.set_ylim(bottom=0)
    ax.grid(True, alpha=0.3)

    if players_to_plot:
        ax.legend(
            title="Players (4+ games)",
            bbox_to_anchor=(1.02, 1),
            loc="upper left",
        )
    else:
        ax.text(
            0.5, 0.5,
            "No players have attended more than one game",
            ha="center",
            va="center",
            transform=ax.transAxes,
        )

    fig.tight_layout()

    plot_path = f"{args.output}.png"
    fig.savefig(plot_path, dpi=200, bbox_inches="tight")
    plt.show()

    print(f"Games processed: {len(games)}")
    print(f"Players found: {len(all_players)}")
    print(f"Attendance CSV saved to: {csv_path}")
    print(f"Graph saved to: {plot_path}")


if __name__ == "__main__":
    main()