var buttonColors = [
    "red", "blue", "green", "yellow"
];

var gamePattern = [

];

var userClickedPattern = [

];


function playSound(randomChosenColor) {
    var audio = new Audio("sounds/" + randomChosenColor + ".mp3");
    audio.addEventListener('canplaythrough', function () {
        audio.play();
    });
}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    let $selectedColorElement = $("#"+randomChosenColor);
    $selectedColorElement.fadeOut(50).fadeIn(50);
    playSound(randomChosenColor);

}nextSequence();

//check which button is pressed
$(".btn").click(function() {
    let userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
});

function animatePress(currentColor) {
    let $currentColorElement = $("#"+currentColor);
    $currentColorElement.toggleClass("pressed");
    setTimeout(function() {
        $currentColorElement.toggleClass("pressed");
    }, 100)
}