function rollDie(max) {
    return Math.floor(Math.random() * max) + 1;
}

function arraySelect(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function getActivity() {
    const activities = [
        ["Celebrating",false],
        ["Lost / Exploring", false],
        ["Chasing", true],
        ["Marking Territory", false],
        ["Constructing", false],
        ["Mating / Courting", false],
        ["Defecating", false],
        ["Negotiating with", true],
        ["Dying / Wounded", false],
        ["Patrolling / Guarding", false],
        ["Fleeing From", true],
        ["Resting / Camping", false],
        ["Hallucinating", false],
        ["Ritual / Magic", false],
        ["Hunting / Foraging", false],
        ["Sleeping", false],
        ["In Combat with", true],
        ["Trapped / Imprisoned", false],
        ["Journey / Pilgramage", false],
        ["Washing", false]
    ];

    return arraySelect(activities);
}

function generateCreature(type, region) {
    const type_roll = rollDie(8);

    const day_road_encounters = [
        "Animal",
        "Monster",
        "Mortal",
        "Mortal",
        "Sentient",
        "Sentient",
        "Regional",
        "Regional"
    ];

    const day_wild_encounters = [
        "Animal",
        "Monster",
        "Mortal",
        "Sentient",
        "Regional",
        "Regional",
        "Regional",
        "Regional"
    ];

    const night_fire_encounters = [
        "Monster",
        "Monster",
        "Mortal",
        "Mortal",
        "Sentient",
        "Sentient",
        "Regional",
        "Regional"       
    ];

    const night_no_fire_encounters = [
        "Animal",
        "Animal",
        "Monster",
        "Monster",
        "Monster",
        "Regional",
        "Regional",
        "Regional"       
    ];

    switch (type) {
        case "Day Road":
            genre = arraySelect(day_road_encounters);
            break;

        case "Day Wild":
            genre = arraySelect(day_wild_encounters);
            break;

        case "Night Fire":
            genre = arraySelect(night_fire_encounters);
            break;

        case "Night Fireless":
            genre = arraySelect(night_no_fire_encounters);
            break;

        case true:
            throw new Error("Error Type Not Recognized: ", type);
    }

    const animal_table = [
        ["Giant Bats (DMB 112)",          1, 10],
        ["Bears (DMB 112)",                1,  4],
        ["Boars (DMB 113)",                1,  6],
        ["Giant Burrowing Beetles (DMB 113)",    2,  4],
        ["Carrion Worms (DMB 113)",        1,  3],
        ["Giant Centipedes (DMB 113)",    1,  8],
        ["False Unicorns (DMB 113)",       3,  4],
        ["Giant Fire Beetles (DMB 114)",  2,  6],
        ["Giant Flies (DMB 114)",          2,  6],
        ["Insect Swarms (DMB 115)",        1,  3],
        ["Rapacious Beetles (DMB 117)",    2,  4],
        ["Giant Rats (DMB 117)",          3,  6],
        ["Red Deers (DMB 117)",             3, 10],
        ["Shaggy Mammoths (DMB 117)",       2,  8],
        ["Snakes (Adder) (DMB 118)",          1,  8],
        ["Stirges (DMB 118)",               2,  6],
        ["Giant Toads (DMB 118)",          1,  4],
        ["Giant Weasels (DMB 119)",        1,  6],
        ["Wolves (DMB 119)",                 3,  6],
        ["Yegrils (DMB 119)",               3,  8]
    ];

    const monster_table = [
        ["Giant Ants (DMB 112)",            3,  4],
        ["Bestial Centaurs (DMB 24)",       1,  1],
        ["Cockatrice (DMB 27)",            1,  4],
        ["Ghouls (DMB 45)",                 2,  4],
        ["Griffons (DMB 114)",               2,  8],
        ["Headless Riders (DMB 51)",        1,  4],
        ["Mogglewomps (DMB 59)",            1,  1],
        ["Mugwudges (DMB 62)",              1,  4],
        ["Ogres (DMB 65)",                  1,  6],
        ["Owlbears (DMB 116)",               1,  4],
        ["Root Things (DMB 71)",            1,  4],
        ["Giant Mutant Snails (DMB 77)",   1,  3],
        ["Giant Spinning Spiders (DMB 118)", 1,  3],
        ["Stirges (DMB 118)",                2,  6],
        ["Treoweres (DMB 83)",              1,  8],
        ["Werewolves (DMB 87)",              1,  6],
        ["Dire Wolves (DMB 119)",            2,  4],
        ["Black Bile Wyrms (DMB 97)",       1,  1],
        ["Blood Wyrms (DMB 98)",            1,  1],
        ["Yickerwills (DMB 101)",            1,  6]
    ];

    const mortal_table = [
        ["Adventuring Party (DMB 108)",     1, 1],
        ["Clerics (DMB 104)",                1, 20],
        ["Criers (DMB 110)",                 1, 6],
        ["Cottager Drune (DMB 35)",        1, 4],
        ["Fighters (DMB 105)",               2, 6],
        ["Fortune-Tellers (DMB 110)",       1, 3],
        ["Friars (DMB 106)",                 1, 6],
        ["Hunters (DMB 106)",                3, 6],
        ["Knights (DMB 106)",                2, 6],
        ["Lost Souls (DMB 111)",             1, 4],
        ["Magicians (DMB 107)",              1, 4],
        ["Merchants (DMB 111)",              1, 20],
        ["Pedlars (DMB 111)",                1, 4],
        ["Pedlars (DMB 111)",                1, 4],
        ["Pilgrims (DMB 111)",               4, 8],
        ["Priests (DMB 111)",                1, 6],
        ["Thieves (Bandits) (DMB 107)",        3, 10],
        ["Thieves (Bandits) (DMB 107)",        3, 10],
        ["Villagers (DMB 111)",              2, 10],
        ["Witches (DMB 90)",                 1, 6]
    ];

    const sentient_table = [
        ["Barrowbogeys (DMB 14)",            2,  6],
        ["Breggle Shorthorns (DMB 23)",      3, 10],
        ["Crookhorn (DMB 28)",              3, 10],
        ["Deorling Stags (DMB 31)",          1,  6],
        ["Elf Courtiers (DMB 37) or Elf Knights (DMB 38)", 1,  4],
        ["Elf Wanderers (DMB 39)",           1,  6],
        ["Goblins (DMB 47)",                 2,  6],
        ["Grimalkin (DMB 48)",              1,  4],
        ["Mosslings (DMB 60)",               2,  8],
        ["Nutcaps (DMB 63)",                 2,  6],
        ["Redcaps (DMB 69)",                 2,  6],
        ["Scarecrows (DMB 72)",              1,  4],
        ["Scrabeys (DMB 73)",                1,  6],
        ["Shape-Stealers (DMB 75)",          1,  6],
        ["Sprites (DMB 80)",                 3,  6],
        ["Talking Animals (DMB 82)",         1,  4],
        ["Treoweres (DMB 83)",               1,  8],
        ["Trolls (DMB 84)",                  1,  3],
        ["Wodewoses (DMB 93)",               1,  6],
        ["Woodgrues (DMB 94)",               3,  6]
    ];

    const aldweald_table = [
        ["Antler Wraiths (DMB 12)",       2, 4],
        ["Breggle Shorthorns (DMB 23)",   3, 10],
        ["Sylvan Centaurs (DMB 25)",      2, 6],
        ["Deorling Does (DMB 30)",        4, 4],
        ["Elf Knights (DMB 38)",          1, 4],
        ["Elf Wanderers (DMB 39)",        1, 6],
        ["Fairy Horses (DMB 40)",         1, 1],
        ["Gelatinous Hulks (DMB 44)",     1, 4],
        ["Gloam (DMB 46)",               1, 1],
        ["Goblins (DMB 47)",              2, 6],
        ["Grimalkin (DMB 48)",           1, 4],
        ["Pedlars (DMB 111)",              1, 4],
        ["Redcaps (DMB 69)",              2, 6],
        ["Giant Psionic Snail (DMB 78)",1, 1],
        ["Sprites (DMB 80)",              3, 6],
        ["Thieves (Bandit) (DMB 107)",      3, 10],
        ["Blessed Unicorns (DMB 85)",     1, 6],
        ["Wild Hunt (DCB 355)",           1, 1],
        ["Witches (DMB 90)",               1, 6],
        ["Woodgrue (DMB 94)",            3, 6]
    ];

    const aquatic_table = [
        ["Adventuring Party (DMB 108)",       1, 1],
        ["Anglers (DMB 110)",                  2, 4],
        ["Boggins (DMB 19)",                  1, 6],
        ["Giant Catfish (DMB 113)",          1, 2],
        ["Giant Crabs (DMB 113)",             1, 6],
        ["Giant Flies (DMB 114)",              2, 6],
        ["Insect Swarms (DMB 115)",            1, 3],
        ["Kelpies (DMB 53)",                  1, 1],
        ["Killer Bees (DMB 116)",              2, 6],
        ["Giant Leeches (DMB 116)",            1, 4],
        ["Madtoms (DMB 54)",                  1, 12],
        ["Merchants (DMB 111)",                1, 20],
        ["Merfauns (DMB 58)",                 2, 6],
        ["Pedlars (DMB 111)",                  1, 4],
        ["Giant Pikes (DMB 116)",             1, 4],
        ["Stirges (DMB 118)",                  2, 6],
        ["Thief (Pirate) (DMB 107)",          3, 10],
        ["Giant Toads (DMB 118)",             1, 4],
        ["Giant Water Termites (DMB 119)",    1, 3],
        ["Phlegm Wyrm (DMB 99)",             1, 1]
    ];

    const dwelmfurgh_table = [
        ["Antler Wraiths (DMB 12)",          2, 4],
        ["Basilisks (DMB 15)",               1, 6],
        ["Bramblings (21)",              1, 4],
        ["Giant Centipedes (DMB 113)",       1, 8],
        ["Crookhorns (DMB 28)",              3, 10],
        ["Audrune Drune (DMB 33)",          1, 1],
        ["Braithmaid Drune (DMB 34)",       1, 4],
        ["Cottager Drune (DMB 35)",         1, 4],
        ["Cottager Drune (DMB 35)",         2, 6],
        ["Drunewife (DMB 36)",        1, 1],
        ["Lost Souls (DMB 111)",              1, 4],
        ["Shadows (DMB 74)",                 1, 8],
        ["Skeletons (DMB 76)",               3, 6],
        ["Giant Spinning Spiders (DMB 118)", 1, 3],
        ["Sprites (DMB 80)",                 3, 6],
        ["Thieves (Bandit) (DMB 107)",         3, 10],
        ["Wicker Giant (DMB 88)",           1, 1],
        ["Wights (DMB 89)",                  1, 6],
        ["Witches (DMB 90)",                  1, 6],
        ["Yellow Bile Wyrm (DMB 100)",       1, 1]
    ];

    const fever_marsh_table = [
        ["Vampire Bats (DMB 112)",          1, 10],
        ["Black Tentacles (DMB 16)",       1, 4],
        ["Bog Salamanders (DMB 18)",        1, 3],
        ["Bestial Centaur (DMB 24)",       1, 1],
        ["Crookhorns (DMB 28)",             3, 10],
        ["Giant Flies (DMB 114)",             2, 6],
        ["Galoshers (DMB 42)",               2, 6],
        ["Gelatinous Hulks (DMB 44)",        1, 4],
        ["Harridan (DMB 50)",               1, 3],
        ["Insect Swarms (DMB 115)",           1, 3],
        ["Jack-o’-Lanterns (DMB 52)",        1, 8],
        ["Giant Leeches (DMB 116)",           1, 4],
        ["Madtoms (DMB 54)",                 1, 12],
        ["Marsh Lanterns (DMB 57)",          1, 12],
        ["Mugwudges (DMB 62)",               1, 4],
        ["Redcaps (DMB 69)",                 2, 6],
        ["Shadows (DMB 74)",                 1, 8],
        ["Giant Toads (DMB 118)",             1, 4],
        ["Trolls (DMB 84)",                  1, 3],
        ["Phlegm Wyrms (DMB 99)",             1, 1]
    ];

    const hags_addle_table = [
        ["Banshees (DMB 13)",                 1, 1],
        ["Giant Bats (DMB 112)",              1, 10],
        ["Black Tentacles (DMB 16)",         1, 4],
        ["Bog Corpse (DMB 17)",              2, 4],
        ["Bog Salamanders (DMB 18)",          1, 3],
        ["Boggins (DMB 19)",                  1, 6],
        ["Galoshers (DMB 42)",                2, 6],
        ["Ghouls (DMB 45)",                   2, 4],
        ["Gloam (DMB 46)",                   1, 1],
        ["Giant Leeches (DMB 116)",            1, 4],
        ["Marsh Lanterns (DMB 57)",           1, 12],
        ["Mugwudges (DMB 62)",                1, 4],
        ["Shadows (DMB 74)",                  1, 8],
        ["Swamp Sloths (DMB 118)",             1, 6],
        ["Giant Swamp Spiders (DMB 118)",     1, 3],
        ["The Hag (DCB 82)",                 1, 1],
        ["Giant Toads (DMB 118)",             1, 4],
        ["Trolls (DMB 84)",                   1, 3],
        ["Corrupt Unicorns (DMB 86)",         1, 6],
        ["Wronguncle (DMB 95)",              1, 1]
    ];

    const high_wold_table = [
        ["Barrowbogeys (DMB 14)",             2, 6],
        ["Breggle Longhorns (DMB 22)",        2, 4],
        ["Breggle Shorthorns (DMB 23)",       3, 10],
        ["Breggle Shorthorns (DMB 23)",       3, 10],
        ["Criers (DMB 110)",                   1, 6],
        ["Devil Goats (DMB 32)",              1, 4],
        ["Braithmaids (DMB 34)",        1, 4],
        ["Cottager Drune (DMB 35)",          1, 4],
        ["Elf Knights (DMB 38)",              1, 4],
        ["Goblins (DMB 47)",                  2, 6],
        ["Grimalkin (DMB 48)",               1, 4],
        ["Knights (DMB 106)",                  2, 6],
        ["Merchants (DMB 111)",                1, 20],
        ["Pedlars (DMB 111)",                  1, 4],
        ["Priests (DMB 111)",                  1, 6],
        ["Scrabeys (DMB 73)",                 1, 6],
        ["Thieves (Bandit) (DMB 107)",          3, 10],
        ["Witches (DMB 90)",                   1, 6],
        ["Witch Owls (DMB 92)",               1, 6],
        ["Woodgrues (DMB 94)",                3, 6]
    ];

    const mulchgrove_table = [
        ["Vampire Bats (DMB 112)",            1, 10],
        ["Bog Corpses (DMB 17)",              2, 4],
        ["Bog Salamanders (DMB 18)",          1, 3],
        ["Brainconks (DMB 20)",               1, 8],
        ["Gelatinous Hulks (DMB 44)",         1, 4],
        ["Jack-o’-Lanterns (DMB 52)",         1, 8],
        ["Mosslings (DMB 60)",                2, 8],
        ["Mosslings (DMB 60)",                2, 8],
        ["Mosslings (DMB 60)",                2, 8],
        ["Mosslings (DMB 60)",                4, 8],
        ["Mould Oracles (DMB 61)",            1, 3],
        ["Ochre Slime-Hulk (DMB 64)",        1, 1],
        ["Ochre Slime-Hulk (DMB 64)",        1, 1],
        ["Onyx Blob (DMB 66)",               1, 1],
        ["Pook Morels (DMB 68)",              2, 10],
        ["Pook Morels (DMB 68)",              2, 10],
        ["Redslobs (DMB 70)",                 1, 4],
        ["Redslobs (DMB 70)",                 1, 4],
        ["Wodewoses (DMB 93)",                1, 6],
        ["Wronguncle (DMB 95)",              1, 1]
    ];

    const nagwood_table = [
        ["Atanuwë (DCB 42)",                 1, 1],
        ["Vampire Bats (DMB 112)",            1, 10],
        ["Bog Corpses (DMB 17)",              2, 4],
        ["Bestial Centaur (DMB 24)",         1, 1],
        ["Crookhorns (DMB 28)",               3, 10],
        ["Crookhorns (DMB 28)",               3, 10],
        ["Crookhorns (DMB 28)",               6, 10],
        ["Harpies (DMB 49)",                   2, 4],
        ["Harridan (DMB 50)",                1, 3],
        ["Manticores (DMB 56)",               1, 4],
        ["Ochre Slime-Hulk (DMB 64)",        1, 1],
        ["Ogres (DMB 65)",                    1, 6],
        ["Ogres (DMB 65)",                    1, 6],
        ["Owlbears (DMB 116)",                 1, 4],
        ["Giant-Mutant Snails (DMB 77)",     1, 3],
        ["Giant Spinning Spiders (DMB 118)",  1, 4],
        ["Chaotic Treoweres (DMB 83)",      1, 8],
        ["Corrupt Unicorns (DMB 86)",         1, 6],
        ["Dire Wolves (DMB 119)",              2, 4],
        ["Black Bile Wyrm (DMB 97)",         1, 1]
    ];

    const northern_scratch_table = [
        ["Banshees (DMB 13)",                 1, 1],
        ["Vampire Bats (DMB 112)",            1, 10],
        ["Black Tentacles (DMB 16)",         1, 4],
        ["Bog Corpses (DMB 17)",              2, 4],
        ["Bog Salamanders (DMB 18)",          1, 3],
        ["Deorling Stags (DMB 31)",           1, 6],
        ["Fomorians (DMB 41)",                1, 3],
        ["Galoshers (DMB 42)",                2, 6],
        ["Gloam (DMB 46)",                   1, 1],
        ["Harridan (DMB 50)",                1, 3],
        ["Giant Leeches (DMB 116)",            1, 4],
        ["Madtoms (DMB 54)",                  1, 12],
        ["Marsh Lanterns (DMB 57)",           1, 12],
        ["Mugwudges (DMB 62)",                1, 4],
        ["Redcaps (DMB 69)",                  2, 6],
        ["Scarecrows (DMB 72)",               1, 4],
        ["Shadows (DMB 74)",                  1, 8],
        ["Spectres (DMB 79)",                 1, 4],
        ["Wights (DMB 89)",                   1, 6],
        ["Witch Owls (DMB 92)",               1, 6]
    ];

    const table_downs_table = [
        ["Banshees (DMB 13)",                 1, 1],
        ["Crookhorns (DMB 28)",               3, 10],
        ["Deorling Doe (DMB 30)",            4, 4],
        ["Cottager Drune (DMB 35)",          1, 4],
        ["Elf Wanderers (DMB 39)",            1, 6],
        ["Giant Flies (DMB 114)",              2, 6],
        ["Ghouls (DMB 45)",                   2, 4],
        ["Gloam (DMB 46)",                   1, 1],
        ["Harpies (DMB 49)",                   2, 4],
        ["Headless Riders (DMB 51)",          1, 4],
        ["Lost Souls (DMB 111)",               1, 4],
        ["Peryton (DMB 67)",                 2, 4],
        ["Peryton (DMB 67)",                 2, 4],
        ["Shadows (DMB 74)",                  1, 8],
        ["Shape-Stealers (DMB 75)",           1, 6],
        ["Skeletons (DMB 76)",                3, 6],
        ["Spectres (DMB 79)",                 1, 4],
        ["Wights (DMB 89)",                   1, 6],
        ["Witches (DMB 90)",                   1, 6],
        ["Woodgrue (DMB 94)",                3, 6]
    ];

    const tithelands_table = [
        ["Breggle Shorthorns (DMB 23)",       3, 10],
        ["Clerics (DMB 104)",                  1, 20],
        ["Elf Wanderers (DMB 39)",            1, 6],
        ["Fighters (DMB 105)",                 2, 6],
        ["Friars (DMB 106)",                   1, 6],
        ["Gloam (DMB 46)",                   1, 1],
        ["Goblins (DMB 47)",                  2, 6],
        ["Griffons (DMB 114)",                 2, 8],
        ["Grimalkin (DMB 48)",               1, 4],
        ["Killer Bees (DMB 116)",              2, 6],
        ["Knights (DMB 106)",                  2, 6],
        ["Merchants (DMB 111)",                1, 20],
        ["Mosslings (DMB 60)",                2, 8],
        ["Pilgrims (DMB 111)",                 4, 8],
        ["Pook Morels (DMB 68)",              2, 10],
        ["Scrabeys (DMB 73)",                 1, 6],
        ["Sprites (DMB 80)",                  3, 6],
        ["Villagers (DMB 111)",                2, 10],
        ["Witches (DMB 90)",                   1, 6],
        ["Woodgrue (DMB 94)",                3, 6]
    ];

    const valley_of_wise_beasts_table = [
        ["Cobbin (DMB 26)",                  1, 4],
        ["Cobbin (DMB 26)",                  1, 4],
        ["Cobbin (DMB 26)",                  1, 4],
        ["Cobbin (DMB 26)",                  3, 8],
        ["Crookhorns (DMB 28)",               3, 10],
        ["Crookhorns (DMB 28)",               3, 10],
        ["Crookhorns (DMB 28)",               3, 10],
        ["Deorling Stag (DMB 31)",           1, 6],
        ["Goblin (DMB 47)",                  2, 6],
        ["Grimalkin (DMB 48)",               1, 4],
        ["Lost Souls (DMB 111)",               1, 4],
        ["Mosslings (DMB 60)",                2, 8],
        ["Ochre Slime-Hulk (DMB 64)",        1, 1],
        ["Ogres (DMB 65)",                    1, 6],
        ["Owlbears (DMB 116)",                 1, 4],
        ["Redslobs (DMB 70)",                 1, 4],
        ["Sprites (DMB 80)",                  3, 6],
        ["Trolls (DMB 84)",                   1, 3],
        ["Wodewose (DMB 93)",                1, 6],
        ["Woodgrue (DMB 94)",                3, 6]
    ];

    switch (genre) {
        case "Animal":
            encounter_and_number = arraySelect(animal_table);
            break;

        case "Monster":
            encounter_and_number = arraySelect(monster_table);
            break;

        case "Mortal":
            encounter_and_number = arraySelect(mortal_table);
            break;

        case "Sentient":
            encounter_and_number = arraySelect(sentient_table);
            break;

        case "Regional":
            switch (region) {
                case "Aldweald":
                    encounter_and_number = arraySelect(aldweald_table);
                    break;

                case "Aquatic":
                    encounter_and_number = arraySelect(aquatic_table);
                    break;

                case "Dwelmfurgh":
                    encounter_and_number = arraySelect(dwelmfurgh_table);
                    break;

                case "Fever Marsh":
                    encounter_and_number = arraySelect(fever_marsh_table);
                    break;

                case "Hag's Addle":
                    encounter_and_number = arraySelect(hags_addle_table);
                    break;

                case "High Wold":
                    encounter_and_number = arraySelect(high_wold_table);
                    break;

                case "Mulchgrove":
                    encounter_and_number = arraySelect(mulchgrove_table);
                    break;

                case "Nagwood":
                    encounter_and_number = arraySelect(nagwood_table);
                    break;

                case "Northern Scrathc":
                    encounter_and_number = arraySelect(northern_scratch_table);
                    break;

                case "Table Downs":
                    encounter_and_number = arraySelect(table_downs_table);
                    break;

                case "Tithelands":
                    encounter_and_number = arraySelect(tithelands_table);
                    break;

                case "Valley of the Wise Beasts":
                    encounter_and_number = arraySelect(valley_of_wise_beasts_table);
                    break;

                case true:
                    throw new Error("Error Region Not Recognized: ", region);
            }

            break;

        case true:
            throw new Error("Error Genre Not Recognized: ", genre);
    }

    console.log(genre);

    encounter = encounter_and_number[0];
    total = 0
    for (i = 0; i < encounter_and_number[1]; i++) {
        total += rollDie(encounter_and_number[2]);
    }

    return [encounter, total];
}

function generateResult() {
    var encounter_type_dd = document.getElementById("Encounter Type");
    var encounter_type = encounter_type_dd.options[encounter_type_dd.selectedIndex].value;

    var region_dd = document.getElementById("Region");
    var region = region_dd.options[region_dd.selectedIndex].value;

    const creature_and_total = generateCreature(encounter_type, region);
    const creature = creature_and_total[0];
    const total = creature_and_total[1];

    if (rollDie(3) >= 2) {
        encounter_surprised = "";
    } else { encounter_surprised = "not " }

    if (rollDie(3) >= 2) {
        party_surprised = "";
    } else { party_surprised = "not " }

    document.getElementById("encounter_result").textContent = `Encounter: ${total} ${creature} (${encounter_surprised}Surprised).`;

    document.getElementById("party_surprised").textContent = `Party is ${party_surprised}Surprised`;

    encounter_distance = 0;
    if ((party_surprised == "") && (encounter_surprised == "")) {
        encounter_distance += rollDie(4)*30;
    } else {
        for (i = 0; i < 2; i++) { encounter_distance += rollDie(6)*30; }
    }

    document.getElementById("encounter_distance").textContent = `Encounter Distance: ${encounter_distance}'`;    

    const activity_and_need_another = getActivity();
    const activity = activity_and_need_another[0];
    const need_another = activity_and_need_another[1];

    if (need_another) {
        const another_creature_and_total = generateCreature(encounter_type, region);
        const another_creature = another_creature_and_total[0];
        const another_total = another_creature_and_total[1];

        if (rollDie(3) >= 2) {
            another_encounter_surprised = "";
        } else { another_encounter_surprised = "not " }

        document.getElementById("activity").textContent = `Activity: ${activity} ${another_total} ${another_creature} (${another_encounter_surprised}Surprised)`;
    } else {
        document.getElementById("activity").textContent = `Activity: ${activity}`;
    }   
};

document.getElementById("generate-button").addEventListener("click", generateResult);