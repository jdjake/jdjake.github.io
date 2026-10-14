function rollDie(max) {
    return Math.floor(Math.random() * max) + 1;
}

function arraySelect(array) {
    return array[Math.floor(Math.random() * array.length)];
}

function generateAdventurer(normal) {
    const is_normal_roll = rollDie(6);

    console.log(normal);

    const is_normal = (is_normal_roll <= 4);

    if (is_normal) {
        kindred = normal;
    }
    else {
        const kindred_table = [
            "Breggle",
            "Breggle",
            "Breggle",
            "Elf",
            "Grimalkin",
            "Human",
            "Human",
            "Human",
            "Human",
            "Mossling",
            "Mossling",
            "Woodgrue"
        ];

        kindred = arraySelect(kindred_table);
    }

    const breggle_table = [
        "Bard",
        "Cleric",
        "Enchanter",
        "Fighter",
        "Fighter",
        "Fighter",
        "Fighter",
        "Fighter",
        "Friar",
        "Hunter",
        "Hunter",
        "Knight",
        "Knight",
        "Knight",
        "Knight",
        "Magician",
        "Magician",
        "Magician",
        "Thief",
        "Thief"
    ];

    const elf_table = [
        "Bard",
        "Bard",
        "Enchanter",
        "Enchanter",
        "Enchanter",
        "Enchanter",
        "Enchanter",
        "Enchanter",
        "Fighter",
        "Fighter",
        "Fighter",
        "Fighter",
        "Hunter",
        "Hunter",
        "Hunter",
        "Magician",
        "Magician",
        "Thief",
        "Thief",
        "Thief"
    ];

    const grimalkin_table = [
        "Bard",
        "Bard",
        "Bard",
        "Bard",
        "Enchanter",
        "Enchanter",
        "Enchanter",
        "Enchanter",
        "Fighter",
        "Fighter",
        "Hunter",
        "Hunter",
        "Hunter",
        "Hunter",
        "Magician",
        "Magician",
        "Thief",
        "Thief",
        "Thief",
        "Thief"
    ];

    const human_table = [
        "Bard",
        "Bard",
        "Cleric",
        "Cleric",
        "Cleric",
        "Enchanter",
        "Fighter",
        "Fighter",
        "Fighter",
        "Fighter",
        "Friar",
        "Friar",
        "Hunter",
        "Hunter",
        "Knight",
        "Knight",
        "Magician",
        "Magician",
        "Thief",
        "Thief"
    ];

    const mossling_table = [
        "Bard",
        "Bard",
        "Bard",
        "Enchanter",
        "Fighter",
        "Fighter",
        "Fighter",
        "Fighter",
        "Fighter",
        "Fighter",
        "Hunter",
        "Hunter",
        "Hunter",
        "Hunter",
        "Hunter",
        "Hunter",
        "Magician",
        "Thief",
        "Thief",
        "Thief"
    ];

    const woodgrue_table = [
        "Bard",
        "Bard",
        "Bard",
        "Bard",
        "Bard",
        "Enchanter",
        "Enchanter",
        "Enchanter",
        "Fighter",
        "Fighter",
        "Hunter",
        "Hunter",
        "Hunter",
        "Hunter",
        "Magician",
        "Magician",
        "Thief",
        "Thief",
        "Thief",
        "Thief"
    ];

    switch (kindred) {
        case "Breggle":
            aclass = arraySelect(breggle_table);
            break;

        case "Elf":
            aclass = arraySelect(elf_table);
            break;

        case "Grimalkin":
            aclass = arraySelect(grimalkin_table);
            break;

        case "Human":
            aclass = arraySelect(human_table);
            break;

        case "Mossling":
            aclass = arraySelect(mossling_table);
            break;

        case "Woodgrue":
            aclass = arraySelect(woodgrue_table);
            break;

        case true:
            throw new Error("Error Type Not Recognized: ", kindred);
    }

    return [kindred, aclass];
}

function generateResult() {
    var normal_type_dd = document.getElementById("Normal Kindred");
    var normal_type = normal_type_dd.options[normal_type_dd.selectedIndex].value;

    const kindred_and_class = generateAdventurer(normal_type);
    const kindred = kindred_and_class[0];
    const aclass = kindred_and_class[1];

    document.getElementById("adventurer_result").textContent = `A ${kindred} ${aclass}.`;
};

document.getElementById("generate-button-adventurer").addEventListener("click", generateResult);