$(document).ready(function() {
var possibleQuestions = [];
var Question1 = {
    question: "question 1",
    correctAnswer: "correct answer to question 1",
    trickAnswer1: "first trick answer to question 1",
    trickAnswer2: "Q1 answer 2",
    trickAnswer3: "Q1 Answer 3",
    image: "q1.png"
};
var Question2 = {
    question: "question 2",
    correctAnswer: "correct answer to question 2",
    trickAnswer1: "first trick answer to question 2",
    trickAnswer2: "Q2 answer 2",
    trickAnswer3: "Q2 Answer 3",
    image: "q2.png"
};
possibleQuestions = [Question1, Question2];
var gameTracking = {}
var questionTimeout;
var beginningTimeOfTimer
var questionTimeout


function displayQuestion() {
    $("#question").html(possibleQuestions[gameTracking.currentQuestion].question);
}

function displayPossibleAnswers() {
    var shufflePossibleAnswers = []
    shufflePossibleAnswers.push(possibleQuestions[gameTracking.currentQuestion].correctAnswer)
    for (j=0; j<=2; j++) {
        shufflePossibleAnswers.push(possibleQuestions[gameTracking.currentQuestion].trickAnswers[j]);
    }
    $("#answerOne").html(shufflePossibleAnswers[0]);
    $("#answerTwo").html(shufflePossibleAnswers[1]);
    $("#answerThree").html(shufflePossibleAnswers[2]);
    $("#answerFour").html(shufflePossibleAnswers[3]);
    setTimer();

}

function displayTimer(secondsGoneBy) {
    $("#timeRemaining").html(secondsGoneBy);
}

function checkIfTimeOut() {
    var currentTime = (new Date()).getTime();
    var secondsGoneBy = Math.floor((currentTime - beginningTimeOfTimer)/1000);
    if (secondsGoneBy < gameTracking.timeToAnswerQuestions ) {
        displayTimer(secondsGoneBy);
        setTimeout(checkIfTimeOut, 1000);
    }
    else {
        displayResultsScreen();        
    }
}

function setTimer() {
    beginningTimeOfTimer = (new Date()).getTime();
    checkIfTimeOut();
    
}




















//Active area of development
function displayResultsScreen() {
    console.log("You timed out")
}

function displayResultsScreen() {
    $("result").html(gameTracking.result);
    $("#correctAnswer").html("The correct answer was: " + possibleQuestions[gameTracking.currentQuestion].correctAnswer);
    $("correctAnswerCount").html("Correct Answers:" + possibleQuestions[gameTracking.correctAnswerCount]);
    $("incorrectAnswerCount").html("Incorrect Answers:" + possibleQuestions[gameTracking.incorrectAnswerCount]);
    $("unansweredQuestionsCount").html("Timeout Questions:" + possibleQuestions[gameTracking.unansweredQuestionsCount]);
    $(".resultsScreen").show();    
    $(".notResultsScreen").hide();

}




function checkResult(button) {
    if ($(button).html()===possibleQuestions[gameTracking.currentQuestion].correctAnswer) {
        gameTracking.correctAnswerCount = gameTracking.correctAnswerCount + 1;
        gameTracking.result = "You got it right!";
    }
    else if ($(button).html()!=null) {
        gameTracking.incorrectAnswerCount = gameTracking.incorrectAnswerCount + 1;
        gameTracking.result = "You got it wrong!";
    }
    else {
        gameTracking.result = "You timed out!";
    };
    setTimeout(displayQuestionScreen, gameTracking.timeToWaitBeforeNextQuestion);
    displayResultsScreen();
};

function getNextQuestion() {        
        if (gameTracking.currentQuestion<possibleQuestions.length-1) {
                                gameTracking.currentQuestion = gameTracking.currentQuestion + 1
        }
        else {
            displayStartScreen();
        }
};

function displayQuestionScreen() {
    getNextQuestion()
    $("#answerOne").html(possibleQuestions[gameTracking.currentQuestion].correctAnswer);
    $("#answerTwo").html(possibleQuestions[gameTracking.currentQuestion].trickAnswer1);
    $("#answerThree").html(possibleQuestions[gameTracking.currentQuestion].trickAnswer2);
    $("#answerFour").html(possibleQuestions[gameTracking.currentQuestion].trickAnswer3)
    $("#question").html(possibleQuestions[gameTracking.currentQuestion].question);
    $(".questionScreen").show();
    $(".notQuestionScreen").hide();
    
};

function initializeNewGame() {
    gameTracking.timeToAnswerQuestions = 3000;
    gameTracking.timeToWaitBeforeNextQuestion = 3000;
    gameTracking.correctAnswerCount = 0;
    gameTracking.incorrectAnswerCount = 0;
    gameTracking.unansweredQuestionsCount = 0;
    gameTracking.currentQuestion = -1;
    gameTracking.result = "";
};

function displayStartScreen() {
    initializeNewGame();
    $(".startScreen").show();    
    $(".notStartScreen").hide();
}

displayStartScreen();

//**************Listening for Button Clicks*********************/
$("#startButton").on("click", displayQuestionScreen);

$("#answerOne").on("click", (function() {
    clearInterval(questionTimeout);
    checkResult("#answerOne");
}));

$("#answerTwo").on("click", (function() {
    clearInterval(questionTimeout);
    checkResult("#answerTwo");
}));

$("#answerThree").on("click", (function() {
    clearInterval(questionTimeout);
    checkResult("#answerThree");
}));

$("#answerFour").on("click", (function() {
    clearInterval(questionTimeout);
    checkResult("#answerFour");
}));

});
