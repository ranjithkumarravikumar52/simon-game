var buttonColors = [
    "red", "blue", "green", "yellow"
];

var gamePattern = [];

var userClickedPattern = [];

var level = 0;

/**
 * when user clicks on any of the button
 * 1. push the id to userClickedPattern
 * 2. when clicks reached to gamePattern then check game logic
 */
$(".btn").click(function () {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    //every time the button is clicked, check the logic
    var isSequenceCorrect = checkLogic();
    if(isSequenceCorrect) {
        if(userClickedPattern.length === gamePattern.length) {
            nextSequence();
        }
    } else {
        gameOver();
    }
});

/**
 * Start the game only when we are at level 0 and user presses any key
 */
$("body").keypress(function (event) {
    if (level === 0) {
        nextSequence();
    }
});

function playSound(randomChosenColor) {
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.addEventListener('canplaythrough', function () {
        audio.play();
    });
}

function nextSequence() {
    userClickedPattern = [];
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    let $selectedColorElement = $("#" + randomChosenColor);
    $selectedColorElement.fadeOut(250).fadeIn(250);
    playSound(randomChosenColor);
    level++;
    $("#level-title").text("Level " + level);
}

function animatePress(currentColor) {
    let $currentColorElement = $("#" + currentColor);
    $currentColorElement.toggleClass("pressed");
    setTimeout(function () {
        $currentColorElement.toggleClass("pressed");
    }, 100)
}

function checkLogic() {
    console.log("=============================================================================================");
    console.log('gamePattern ==', gamePattern);
    console.log('userClickedPattern ==', userClickedPattern);

    for (var i = 0; i < userClickedPattern.length; i++) {
        if (gamePattern[i] !== userClickedPattern[i]) {
            return false;
        }
    }
    return true;
}


function gameOver() {
    $("#level-title").text("Game Over! Press any key to continue");
    $("body").toggleClass("game-over");
    setTimeout(function () {
        $("body").toggleClass("game-over");
    }, 200);
    playSound("wrong");

    level = 0;
    userClickedPattern = [];
    gamePattern = [];

}