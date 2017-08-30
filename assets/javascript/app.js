// ON LOAD

$(document).ready(function() {

// $("#start-game").on("click", launchQA);

// GLOBAL VARIABLES

var correctAnswers = 0;
var incorrectAnswers = 0;
var unanswered = 0;

var countdown = 11;
var intervalId;

var userHasClickedOnAnswer = false;
var timedOut = false;

var blazingIndex = 0;
var correctAnswerIndex;

var qaArray = [
	{
		question: "How far is the Moon moving away from the Earth each year?",
		answers: ["3.8cm", "3.8m", "3.8km", "3.8 light years"],
		correctAnswerIndex: 0
		// pic_correct: 'PATH',
		// pic_wrong: 'PATH',
	},
	{
		question: "In what month is the Earth closest to the sun?",
		answers: ["February", "January", "September", "December"],
		correctAnswerIndex: 1
	},
	{
		question: "All the planets in the solar system rotate in the same direction, except which?",
		answers: ["Neptune", "Uranus", "Mars", "Venus"],
		correctAnswerIndex: 3
	},
	{
		question: "The Sun's core releases the energy equivalent of _______ nuclear bombs every second.",
		answers: ["100,000", "100 million", "100 billion", "100 trillion"],
		correctAnswerIndex: 2
	},
	{
		question: "We can only detect about _______ of the matter in the universe.",
		answers: ["5%", "10%", "15%", "20%"],
		correctAnswerIndex: 0
	}
];

// FUNCTIONS 

function startCountdown() {
	intervalId = setInterval(decrement, 1000);
}

function decrement() {
	countdown--;
	$("#countdown").html("<h2>Timer: " + countdown + "</h2>");
		if (countdown === 0) {
	    stop();
	    timeUp();
		}
}

function stop() {
	clearInterval(intervalId);
}

function launchQA() {

	$("button").hide();
	countdown = 11;
	startCountdown();


	$("#questions").html("<h2>" + qaArray[blazingIndex].question + "</h2>");
	$("#answer0").html("<h3>" + qaArray[blazingIndex].answers[0] + "</h3>");
	$("#answer1").html("<h3>" + qaArray[blazingIndex].answers[1] + "</h3>");
	$("#answer2").html("<h3>" + qaArray[blazingIndex].answers[2] + "</h3>");
	$("#answer3").html("<h3>" + qaArray[blazingIndex].answers[3] + "</h3>");

	userGuess();

}

function userGuess() {

	$('.answer').click(function() {
  	stop();
  	
  	if (userHasClickedOnAnswer == false && timedOut !== true) {
  	var userAnswer = $('.answer').index(this);
	  	if (userAnswer === qaArray[blazingIndex].correctAnswerIndex) {
				correctAnswer();
	  	}
	  	else {
				incorrectAnswer();
	  	}
		}
  })
}

function correctAnswer() {
	userHasClickedOnAnswer = true;
	// $('#main-panel').empty().html("<h3>Correct!</h3>");
	$('#results').html("<h3>Correct!</h3>");
	correctAnswers++;
	console.log("Correct answers: " + correctAnswers);
	setTimeout(advance, 3000);
}

function incorrectAnswer() {
	userHasClickedOnAnswer = true;
	// $('#main-panel').empty().html("<h3>Stupid! You're so stupid! <br><br> The correct answer was XXXXX.</h3>");
	$('#results').html("<h3>Wrong!</h3>");
	incorrectAnswers++;
	console.log("Incorrect answers: " + incorrectAnswers);
	setTimeout(advance, 3000);
}

function timeUp() {
	timedOut = true;
	// $('#main-panel').empty().html("<h3>Time's up! <br><br> The correct answer was XXXXX.</h3>");
	$('#results').html("<h3>Time's up!</h3>");
	unanswered++;
	console.log("Unanswered: " + unanswered);
	setTimeout(advance, 3000);
}

function advance() {

	userHasClickedOnAnswer = false;
	timedOut = false;

	$('#results').empty();
	blazingIndex++;

	if (blazingIndex < qaArray.length) {
		launchQA();
	}
	else {
		resultScreen();
	}

	// setTimeout(advance, 3000);
	
}

function resultScreen() {

	stop();

	$("#questions").html("<h3>All done!</h3");
	$('#answer0').html("<h3>Correct answers: " + correctAnswers + "</h3>");
	$('#answer1').html("<h3>Incorrect answers: " + incorrectAnswers + "</h3");
	$('#answer2').html("<h3>Unanswered: " + unanswered + "</h3>");
	$('#answer3').html(" ");
	$('#results').html("<h3>Start over?</h3>"); // need to add reset

}

function startOver() {
	$("button").show();
	launchQA();
}

// MAIN PROCESS

$("#start-game").on("click", launchQA);

});







