// declare global variables for targeted elements
var timerEl = document.getElementById('countdown');
var questionWrapperEl = document.getElementById('question-wrapper');
var questionEl = document.getElementById('question');
var answerBtnEl = document.getElementById('answer-buttons');
var startBtn = document.querySelector('#start_btn');
var submitBtn =  document.querySelector('#submit_btn');
var messageEl = document.getElementById('message');

// declare varibles to shuffle questions and determine question index
let randomizeQuestions, currentQuestionPos;

// set quiz duration in minutes then convert to seconds
const quizDuration = 0.5;
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
       

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timerEl.textContent = " ";
            results();
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
        
        feedback.innerText = ("Correct!");
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
    }


    // setStatusClass(document.body, correct);
    // Array.from(answerBtnEl.children).forEach(button => {
    //     setStatusClass(button, button.dataset.correct)
    // })
    // if (randomizeQuestions.length >currentQuestionPos + 1) {
    //     submitBtn.classList.remove('hide');
    // } else {
    //     submitBtn.innerText = 'Restart';
    //     submitBtn.classList.remove('hide');
    // }
}


function setStatusClass(element, correct) {
    clearStatusClass(element);
    if (correct) {
        element.classList.add('correct');
    } else {
        element.classList.add('wrong');
    }
}

function clearStatusClass(element) {
    element.ClassList.remove('correct');
    element.ClassList.remove('wrong');
}

const questions = [
    {
        question: 'Which of the following is not a keyword for javaScript variable declaration?',
        answers: [
            {text: 'let', correct: false},
            {text: 'var', correct: false},
            {text: 'make', correct: true},
            {text: 'const', correct: false}
        ]
    },

    {
        question: 'What is the result of this expression: (5 + 6 ) * 10 ?',
        answers: [
            {text: '110', correct: true},
            {text: '65', correct: false},
            {text: '56', correct: false},
            {text: 'undefined', correct: false}
        ]
    },

    {
        question: 'Which of the following statement is true about comments?',
        answers: [
            {text: 'They are required for functions to work.', correct: false},
            {text: 'They are ignored during runtime.', correct: true},
            {text: "They add style to the page.", correct: false},
            {text: 'They linked HTML to the javaScript code.', correct: false}
        ]
    },

    {
        question: "If g20 is an array of the world's 20 most industrial economies, how would you access the last index of g20?",
        answers: [
            {text: 'g20.last', correct: false},
            {text: 'g20.length', correct: false},
            {text: 'g20.last-1', correct: false},
            {text: 'g20.length-1', correct: true}
        ]
    },

    {
        question: "Which of the following data type cannot contain a value?",
        answers: [
            {text: 'string', correct: false},
            {text: 'number', correct: false},
            {text: 'null', correct: true},
            {text: 'function', correct: false}
        ]
    }
]

function results() {
    questionWrapperEl.classList.add('hide');
}

startBtn.addEventListener('click', startQuiz);
// submitBtn.addEventListener('click', () => {
//     currentQuestionPos++;
//     setQuestions();
// })