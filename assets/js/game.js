var daenerysCard = $("#daenerys");
var snowCard = $("#snow");
var cerseiCard = $("#cersei");
var nightCard = $("#night");
var characterChoice = $("#chosenCharacter");
var enemies = $("#enemiesAvail");
var restart = $("#startingPlace");
var currentEnemy = $("#currentDefender");
var gameUpdate = $("#gameStatus");
var attack = $("#attackButton");
var characterPicked = false;
var enemyPicked = false;
var turnCounter = 1;
var killCount = 0;
var enemies = [];
var myAttacker;
var currentOpponent;

var characters = {
    'daenerys': {
        name: 'daenerys',
        healthPoints: 150,
        attackPower: 9,
        counterAttackPower: 23,
        imageUrl: './assets/images/daenerys.jpg'
    },
    'snow': {
        name: 'snow',
        healthPoints: 100,
        attackPower: 6,
        counterAttackPower: 16,
        imageUrl: './assets/images/jonSnow.jpg'
    },
    'cersei': {
        name: 'cersei',
        healthPoints: 120,
        attackPower: 7,
        counterAttackPower: 18,
        imageUrl: './assets/images/cersei.jpg'
    },
    'night': {
        name: 'night',
        healthPoints: 180,
        attackPower: 10,
        counterAttackPower: 25,
        imageUrl: './assets/images/nightKing.jpg'
    }
}

function renderOne(character, renderArea, makeChar) {
    var characterCard = $('<div class="card text-center" id="' + character.name + '" data-name="' + character.name + '">');
    var cardBody = $('<div class="card-body">');
    var charName = $('<div class="card-title text-secondary text-capitalize">').text(character.name);
    var charImage = $('<img class="img-fluid characters">').attr("src", character.imageUrl);
    var charHealth = $('<div class="card-text text-secondary align-middle HP">').text(character.healthPoints);
    characterCard.append(cardBody);
    cardBody.append(charName).append(charImage).append(charHealth);
    $(renderArea).append(characterCard);

    if (makeChar == 'enemy') {
        $(characterCard).addClass('enemy');
    } else if (makeChar == 'attacker') {
        myAttacker = character;
        $(characterCard).addClass('myChar')
    } else if (makeChar == 'defender') {
        currentOpponent = character;
        $(characterCard).addClass('target-enemy');
    }
};

function renderCharacters(charObj, areaRender) {
    if (areaRender == '#startingPlace') {
        $(areaRender).empty();
        for (var key in charObj) {
            if (charObj.hasOwnProperty(key)) {
                renderOne(charObj[key], areaRender, '');
            }
        }
    } else if (areaRender == '#chosenCharacter') {
        renderOne(charObj, areaRender, 'attacker');
    } else if (areaRender == '#enemiesAvail') {
        for (var i = 0; i < charObj.length; i++) {
            renderOne(charObj[i], areaRender, 'enemy');
        }

    }
};

$.when($.ready).then(function () {

    renderCharacters(characters, '#startingPlace');

    $("#startingPlace").on("click", '.card', function () {
        var name = $(this).data('name');

        if (characterPicked == false) {
            myAttacker = characters[name];
            console.log(myAttacker);
            characterPicked = true;
            for (var key in characters) {
                if (key != name) {
                    enemies.push(characters[key]);
                }
            }
            renderCharacters(myAttacker, "#chosenCharacter");
            renderCharacters(enemies, "#enemiesAvail");
            restart.empty();
        }
    });
    $("#enemiesAvail").on('click', '.enemy', function () {
        var name = $(this).data('name');
        if ($('#currentDefender').children().length === 0) {
            $(this).appendTo("#currentDefender");
            $(this).addClass("target-enemy");
            enemyPicked = true;
            currentOpponent = characters[name];
            $("#gameStatus1").empty();
            $("#gameStatus2").empty();
        }
    });
    $(attack).on("click", function () {
        if (enemyPicked) {
            currentOpponent.healthPoints -= (myAttacker.attackPower * turnCounter);
            var attackMessage = "You attacked " + currentOpponent.name + " for " + (myAttacker.attackPower * turnCounter) + " damage.";

            if (currentOpponent.healthPoints > 0) {
                $('#currentDefender').empty();
                renderOne(currentOpponent, '#currentDefender', 'defender');
                myAttacker.healthPoints -= currentOpponent.counterAttackPower;
                $('#chosenCharacter').empty();
                renderOne(myAttacker, '#chosenCharacter', 'attacker');
                var counterAttackMessage = currentOpponent.name + " attacked you back for " + currentOpponent.counterAttackPower + " damage.";
                $("#gameStatus1").text(attackMessage);
                $("#gameStatus2").text(counterAttackMessage);
                if (myAttacker.healthPoints <= 0) {
                    var defeatMessage = "You have been defeated by " + currentOpponent.name + ".";
                    $("#gameStatus1").text(defeatMessage);
                    $("#gameStatus2").empty();
                    $(attack).unbind("click");
                }
            } else {
                $('#currentDefender').empty();
                var winMessage = "You have defeated " + currentOpponent.name + ", you can choose to fight another enemy.";
                $("#gameStatus1").text(winMessage);
                $("#gameStatus2").empty();
                enemyPicked = false;
                killCount++;
                if (killCount >= 3) {
                    var winMessage = "Congratulations! You have defeated " + currentOpponent.name + ", the last of your opponents.";
                    $("#gameStatus1").text(winMessage);
                    setTimeout(startNewGame, 3000);
                }
            }
        }

        turnCounter++;
    })

});

function startNewGame() {
    characterPicked = false;
    enemyPicked = false;
    turnCounter = 1;
    killCount = 0;
    enemies = [];
    myAttacker;
    currentOpponent;
    $("#chosenCharacter").empty();
    $("#gameStatus1").empty();
    $("#gameStatus2").empty();

    characters = {
        'daenerys': {
            name: 'daenerys',
            healthPoints: 150,
            attackPower: 9,
            counterAttackPower: 23,
            imageUrl: './assets/images/daenerys.jpg'
        },
        'snow': {
            name: 'snow',
            healthPoints: 100,
            attackPower: 6,
            counterAttackPower: 16,
            imageUrl: './assets/images/jonSnow.jpg'
        },
        'cersei': {
            name: 'cersei',
            healthPoints: 120,
            attackPower: 7,
            counterAttackPower: 18,
            imageUrl: './assets/images/cersei.jpg'
        },
        'night': {
            name: 'night',
            healthPoints: 180,
            attackPower: 10,
            counterAttackPower: 25,
            imageUrl: './assets/images/nightKing.jpg'
        }
    }

    renderCharacters(characters, '#startingPlace');

    $("#startingPlace").on("click", '.card', function () {
        var name = $(this).data('name');

        if (characterPicked == false) {
            myAttacker = characters[name];
            console.log(myAttacker);
            characterPicked = true;
            for (var key in characters) {
                if (key != name) {
                    enemies.push(characters[key]);
                }
            }
            renderCharacters(myAttacker, "#chosenCharacter");
            renderCharacters(enemies, "#enemiesAvail");
            restart.empty();
        }
    });
    $("#enemiesAvail").on('click', '.enemy', function () {
        var name = $(this).data('name');
        if ($('#currentDefender').children().length === 0) {
            $(this).appendTo("#currentDefender");
            $(this).addClass("target-enemy");
            enemyPicked = true;
            currentOpponent = characters[name];
            $("#gameStatus1").empty();
            $("#gameStatus2").empty();
        }
    });
    $(attack).on("click", function () {
        if (enemyPicked) {
            currentOpponent.healthPoints -= (myAttacker.attackPower * turnCounter);
            var attackMessage = "You attacked " + currentOpponent.name + " for " + (myAttacker.attackPower * turnCounter) + " damage.";

            if (currentOpponent.healthPoints > 0) {
                $('#currentDefender').empty();
                renderOne(currentOpponent, '#currentDefender', 'defender');
                myAttacker.healthPoints -= currentOpponent.counterAttackPower;
                $('#chosenCharacter').empty();
                renderOne(myAttacker, '#chosenCharacter', 'attacker');
                var counterAttackMessage = currentOpponent.name + " attacked you back for " + currentOpponent.counterAttackPower + " damage.";
                $("#gameStatus1").text(attackMessage);
                $("#gameStatus2").text(counterAttackMessage);
                if (myAttacker.healthPoints <= 0) {
                    var defeatMessage = "You have been defeated by " + currentOpponent.name + ".";
                    $("#gameStatus1").text(defeatMessage);
                    $("#gameStatus2").empty();
                    $(attack).unbind("click");
                }
            } else {
                $('#currentDefender').empty();
                var winMessage = "You have defeated " + currentOpponent.name + ", you can choose to fight another enemy.";
                $("#gameStatus1").text(winMessage);
                $("#gameStatus2").empty();
                enemyPicked = false;
                killCount++;
                if (killCount >= 3) {
                    var winMessage = "Congratulations! You have defeated " + currentOpponent.name + ", the last of your opponents.";
                    $("#gameStatus1").text(winMessage);
                    setTimeout(startNewGame, 3000);
                }
            }
        }

        turnCounter++;
    })
};