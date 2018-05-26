var daenerysHP = $("#daenerysHP");
var snowHP = $("#snowHP");
var cerseiHP = $("#cerseiHP");
var nightHP = $("#cerseiHP");
var daenerysCard = $("#daenerysCard");
var snowCard = $("#snowCard");
var cerseiCard = $("#cerseiCard");
var nightCard = $("#nightCard");
var characterChoice = $("#chosenCharacter");
var enemies = $("#enemiesAvail");
var restart = $("#startingPlace");
var currentEnemy = $("#currentDefender");
var gameUpdate = $("#gameStatus");
var attack = $("#attackButton");
var characterPicked = false;
var enemyPicked = false;

function Character(name, hp, ap, cap) {
    this.name = name;
    this.healthPoints = hp;
    this.attackPower = ap;
    this.counterAttackPower = cap;
}

function attack() {
    $(currentEnemy)
}

// attacker / defender difference

$.when($.ready).then(function () {

    $(".card").on("click", function () {
        if (characterPicked == false) {
            $(characterChoice).append(this);
            $(restart).find(".card").appendTo(enemies);
            characterPicked = true;

        } else if (enemyPicked == false) {
            $(currentEnemy).append(this);
            enemyPicked = true;
        }

        $(attack).on("click", function () {
            // defender.hp -= attacker.ap
            //counterattack
            //attacker.hp -= defender.cap
            //attacker.ap += attacker.ap

        })
    });

    function startNewGame() {
        $(document).find(".card").appendTo(restart);
    };

})