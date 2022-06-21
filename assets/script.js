// declare global variables for targeted elements
var timerEl = document.getElementById('countdown');
var questionWrapperEl = document.getElementById('question-wrapper');
var questionEl = document.getElementById('question');
var answerBtnEl = document.getElementById('answer-buttons');
var startBtn = document.querySelector('#start_btn');
var submitBtn =  document.querySelector('#submit_btn');
var messageEl = document.getElementById('message');
var highScoreEl =  document.querySelector('#high-score');


var recordScore = [];

// variable to keep tract score
var scoreEl =  document.querySelector('#score');
var score = 0;

// declare varibles to shuffle questions and determine question index
let randomizeQuestions, currentQuestionPos;

// set quiz duration in minutes then convert to seconds
const quizDuration = 0.75;
var timeLeft = quizDuration * 60;

// use setInterval for countdown
function countdown() {

    var timeInterval = setInterval(function() {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // display countdown in minute and second format
        timerEl.textContent = `Time Remaining: ${minutes}: ${seconds} `;
       

        if (timeLeft <= 0) {
            clearInterval(timeInterval);
            timerEl.textContent = " ";
            showResults();
        }

    // set countdown interval in miliseconds   
    }, 1000);  
}


function startQuiz () { 
    countdown();
    startBtn.classList.add('hide');
    randomizeQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionPos = 0;
    questionWrapperEl.classList.remove('hide');
    setQuestions();
}


function setQuestions() {
    resetPage();
    displayQuestion(randomizeQuestions[currentQuestionPos]);
}

function displayQuestion(question) {

    questionEl.innerHTML = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        // if(answer.correct) {
        //     button.dataset.correct = answer.correct;
        // }
        button.dataset.correct = answer.correct;
        
        
        button.addEventListener('click', selectAnswer);
        answerBtnEl.appendChild(button);

    })
}

function resetPage() {
    submitBtn.classList.add('hide');
    while(answerBtnEl.firstChild) {
        answerBtnEl.removeChild(answerBtnEl.firstChild)
    }
}


function selectAnswer(e) {
    // const buttonChoice = e.target.value;
    // console.log(e);
    const correct = e.target.dataset.correct;
    var feedback = document.createElement('h2');
    // var message = "";

    // chkAnswer
    if(correct==="true") {
        score += 2;
        feedback.innerText = ("Correct!");
        // console.log(`your score is ${score}`);
        // messageEl.appendChild(chk);
        
    }else {
        feedback.innerText = ("Wrong");
        // add 10 second penalty for wrong answer
        timeLeft -= 10;
        // messageEl.appendChild(chk);
    }
    // console.log(message);
    messageEl.appendChild(feedback);
    setTimeout(function() {
        // feedback.classList.add('hide');
        feedback.remove();
    },500);
   



    if (randomizeQuestions.length > currentQuestionPos + 1) {
        currentQuestionPos++;
        setTimeout(setQuestions, 500); 
        // submitBtn.classList.remove('hide');
    } else {
        showResults();
    }


    // setStatusClass(document.body, correct);
    // Array.from(answerBtnEl.children).forEach(button => {
    //     setStatusClass(button, button.dataset.correct)
    // })
    // if (randomizeQuestions.length >currentQuestionPos + 1) {
    //     submitBtn.classList.remove('hide');
    // } else {
    //     submitBtn.innerText = 'Restart';
   
    // }
}


const questions = [
    {
        question: 'Which of the following is not a keyword for javaScript variable declaration?',
        answers: [
            {text: 'A. let', correct: false},
            {text: 'B. var', correct: false},
            {text: 'C. make', correct: true},
            {text: 'D. const', correct: false}
        ]
    },

    {
        question: 'What is the result of this expression: (5 + 6 ) * 10 ?',
        answers: [
            {text: 'A. 110', correct: true},
            {text: 'B. 65', correct: false},
            {text: 'C. 56', correct: false},
            {text: 'D. undefined', correct: false}
        ]
    },

    {
        question: 'Which of the following statement is true about comments?',
        answers: [
            {text: 'A. They are required for functions to work.', correct: false},
            {text: 'B. They are ignored during runtime.', correct: true},
            {text: "C. They add style to the page.", correct: false},
            {text: 'D. They linked HTML to the javaScript code.', correct: false}
        ]
    },

    {
        question: "If g20 is an array of the world's 20 most industrial economies, how would you access the last index of g20?",
        answers: [
            {text: 'A. g20.last', correct: false},
            {text: 'B. g20.length', correct: false},
            {text: 'C. g20.last-1', correct: false},
            {text: 'D. g20.length-1', correct: true}
        ]
    },

    {
        question: "Which of the following data type cannot contain a value?",
        answers: [
            {text: 'A. string', correct: false},
            {text: 'B. number', correct: false},
            {text: 'C. null', correct: true},
            {text: 'D. function', correct: false}
        ]
    }
]

function showResults() {
    questionWrapperEl.classList.add('hide');
    timerEl.classList.add('hide');
    var yourScore = document.createElement('h2');
    yourScore.innerText = `Your Total Score:  ${score}/10`;
    // console.log(yourScore.innerText);
    
    
    scoreEl.appendChild(yourScore);
    let initialEl = document.querySelector('#collect-initials')
    initialEl.classList.remove('hide');
    submitBtn.classList.remove('hide');

}

startBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', () => {
    let initialEl = document.querySelector('#initials');

    let playerScore = {
        initial: initialEl.value,
        highScore: score
    };
    //  get data back from local storage

    recordScore = JSON.parse(localStorage.getItem('playerScore'));
    // recordScore.push(savedScore);

    // recordScore = JSON.parse(localStorage.getItem('playerScore'));
    // combines data from local storage and new data 

    if(recordScore) {
        recordScore.push(playerScore);

    } else {
        recordScore = [playerScore];
    }


    // placed combined data back into local storage 
    localStorage.setItem('playerScore', JSON.stringify(recordScore));
    // recordScore.push(playerScore);
    submitBtn.classList.add('hide');
    // currentQuestionPos++;
    // setQuestions();
    // return recordScore;

    // i can console log recordScore within the function
    console.log(recordScore);

})


    // i cannot console log recordScore outside the function
    console.log(recordScore);





// function getHighScore() {


//     return recordScore

    
// }

// getHighScore();

