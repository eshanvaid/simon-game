buttonColors = ["red", "blue", "green", "yellow"];
gamePattern = [];
userClickedPattern = [];
var level = 0;

$(".restart-btn").hide();

function playSound(colorName) {
    var audio = new Audio("sounds/" + colorName + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);

}

function nextSequence() {
    var randomNumber = Math.floor(Math.random() * 4);
    randomColor = buttonColors[randomNumber];
    gamePattern.push(randomColor);
    $("." + randomColor).fadeOut(100).fadeIn(100);
    playSound(randomColor);
    $("#level-title").text("Level " + level);
    level++;
}

var currentClick = 0;
var firstPressed = false;

$(".btn").click(function(event) {
    var userChosenColour = (event.target.id);
    userClickedPattern.push(userChosenColour);
    if (userClickedPattern[currentClick] == gamePattern[currentClick]) {
        playSound(userChosenColour);
        animatePress(userChosenColour);
        currentClick++;
        if (currentClick == level) {
            currentClick = 0;
            userClickedPattern = [];
            setTimeout(function() {
                nextSequence();
            }, 700);
        }
    } else {
        playSound("wrong");
        $(".container").hide();
        $("#level-title").text("Game Over");
        var scoreLine = "Score: " + (level - 1);
        var scoreCard = $("<h2 class='score'></h2>").text(scoreLine);
        $("#level-title").after(scoreCard);
        // var restartButton = $("");
        // $(".score").after(restartButton);
        $(".restart-btn").show();
        $(".restart-btn").click(function() {
            restartGame();
        });

        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 500);
    }
});

$(document).on("keypress", function() {
    if (!firstPressed) {
        nextSequence();
        firstPressed = true;
    }
});

function restartGame() {
    level = 0;
    currentClick = 0;
    firstPressed = false
    userClickedPattern = [];
    gamePattern = [];
    $(".container").show();
    $(".score").hide();
    $(".restart-btn").hide();
    setTimeout(function() {
        nextSequence();
    }, 500);
}