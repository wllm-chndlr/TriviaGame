// ON LOAD

$(document).ready(function() {

	$('#start-over').hide();

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
var correctAnswerText;

// ARRAY TO HOLD QUESTIONS AND ANSWERS

var qaArray = [
	{
		question: "Neutron stars can spin at a rate of _______ rotations per second.",
		answers: ["10", "100", "300", "600"],
		correctAnswerIndex: 3,
		correctAnswerText: "600"
	},
	{
		question: "All the planets in the solar system rotate in the same direction, except which?",
		answers: ["Neptune", "Uranus", "Mars", "Venus"],
		correctAnswerIndex: 3,
		correctAnswerText: "Venus"
	},
	{
		question: "The Sun's core releases the energy equivalent of _______ nuclear bombs every second.",
		answers: ["100,000", "100 million", "100 billion", "100 trillion"],
		correctAnswerIndex: 2,
		correctAnswerText: "100 billion"
	},
	{
		question: "We can only detect about _______ of the matter in the universe.",
		answers: ["5%", "10%", "15%", "20%"],
		correctAnswerIndex: 0,
		correctAnswerText: "5%"
	},
	{
		question: "The Sun accounts for 99% of our solar system's mass.",
		answers: ["25%", "50%", "75%", "99%"],
		correctAnswerIndex: 3,
		correctAnswerText: "99%"
	},
	{
		question: "How far is the Moon moving away from the Earth each year?",
		answers: ["3.8cm", "3.8m", "3.8km", "3.8 light years"],
		correctAnswerIndex: 0,
		correctAnswerText: "3.8cm"
		// pic_correct: 'PATH',
		// pic_wrong: 'PATH',
	}
];

// FUNCTIONS 

function startCountdown() {
	intervalId = setInterval(decrement, 1000);
}

function decrement() {
	countdown--;
	$("#countdown").html("<h2>Time left before implosion: " + countdown + "</h2>");
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
	$('#countdown').show();

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
	  $('#countdown').hide().empty();
  	
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
	$('#results').html("<h3>Correct!</h3>");
	correctAnswers++;
	setTimeout(advance, 3000);
}

function incorrectAnswer() {
	userHasClickedOnAnswer = true;
	$('#results').html("<h3>Wrong! The correct answer is " + qaArray[blazingIndex].correctAnswerText + ". <br>Your body is hereby committed to the cold vacuum of space.</h3>");
	$('#imgif').html("<img src='http://gph.is/QEbSYA'>");
	incorrectAnswers++;
	setTimeout(advance, 3000);
}

function timeUp() {
	timedOut = true;
	$('#results').html("<h3>Time's up! (Although time is just a construct.) <br> The correct answer is " + qaArray[blazingIndex].correctAnswerText + ".</h3>");
	$('#countdown').hide().empty();
	unanswered++;
	setTimeout(advance, 3000);
}

function advance() {

	userHasClickedOnAnswer = false;
	timedOut = false;
	
	$('#results').empty();
	blazingIndex++;

	if (blazingIndex < qaArray.length) {
		launchQA();
		// countdown = 11;
	}
	else {
		resultScreen();
	}

	// setTimeout(advance, 3000);
	
}

function resultScreen() {

	stop();
	timedOut = false;
	$('#countdown').hide();

	$("#questions").html("<h3>All done!</h3");
	$('#answer0').html("<h3>Correct answers: " + correctAnswers + "</h3>");
	$('#answer1').html("<h3>Incorrect answers: " + incorrectAnswers + "</h3");
	$('#answer2').html("<h3>Unanswered: " + unanswered + "</h3>");
	$('#answer3').html(" ");

	$('#start-over').show().on("click", startOver);

}

function startOver() {
	
	blazingIndex = 0;
	correctAnswers = 0;
	incorrectAnswers = 0;
	unanswered = 0;
	countdown = 11;

	$("#questions").empty();
	$('#answer0').empty();
	$('#answer1').empty();
	$('#answer2').empty();
	$('#answer3').empty();

	$('#countdown').show();
	launchQA();

}

// MAIN PROCESS

$("#start-game").on("click", launchQA);

});