// declare global variables for targeted elements
let timerEl = document.getElementById('countdown');
let questionWrapperEl = document.getElementById('question-wrapper');
let questionEl = document.getElementById('question');
let answerBtnEl = document.getElementById('answer-buttons');
let startBtn = document.querySelector('#start_btn');
let submitBtn =  document.querySelector('#submit_btn');
let messageEl = document.getElementById('message');
let highScoreEl =  document.querySelector('#high-score');
let scoreList = document.querySelector('#score-list');
let scorRecordEl = document.querySelector('#score-record');
let refreshBtn = document.querySelector('#retake_btn');
let clearBtn = document.querySelector('#clear_score_btn');
let initialDivEl = document.querySelector('#collect-initials');

let yourScore = document.createElement('h2');
let recordScore = [];

// variable to keep tract of score
let scoreEl =  document.querySelector('#score');
let score = 0;

// declare varibles to shuffle questions and determine question index
let randomizeQuestions, currentQuestionPos;

// set quiz duration in minutes then convert to seconds
const quizDuration = 0.75;
let timeLeft = quizDuration * 60;


// let playerScore = {
//     initial: initialEl.value,
//     highScore: score
// };

// use setInterval for countdown
function countdown() {

    let timeInterval = setInterval(function() {
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
    let feedback = document.createElement('h2');
    // var message = "";

    // chkAnswer
    if(correct==="true") {
        score += 2;
        feedback.innerText = ("Correct!");
        
    }else {
        feedback.innerText = ("Wrong");
        // add 10 second penalty for wrong answer
        timeLeft -= 10; 
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
    // let yourScore = document.createElement('h2');
    yourScore.innerText = `Your Total Score:  ${score}/10`;
    // console.log(yourScore.innerText);
    
    scoreEl.appendChild(yourScore);
    let initialEl = document.querySelector('#collect-initials')
    initialEl.classList.remove('hide');
    submitBtn.classList.remove('hide');

}

// buttons event listeners
startBtn.addEventListener('click', startQuiz);
submitBtn.addEventListener('click', getRecordScore)

function getRecordScore() {
    
    let initialEl = document.querySelector('#initials');
    // making global variable
    let playerScore = {
        initial: initialEl.value,
        highScore: score
    };

    //  get data back from local storage
    recordScore = JSON.parse(localStorage.getItem('playerScore'));
    // recordScore.push(savedScore);

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
    renderRecordScore(recordScore);
}


function renderRecordScore(data) {

    let scoreRecordTag = document.createElement("h3");
    scoreRecordTag.innerText = "Recorded High Scores"
    scorRecordEl.appendChild(scoreRecordTag);


    for(i = 0; i < data.length; i++) {
        let initScore = data[i]

        // create list item to append to ordered list
        let li = document.createElement("li");
        
        li.textContent = initScore.initial + ':' + ' ' + initScore.highScore + '/10';
        li.setAttribute("data-index", i);
        scoreList.appendChild(li);      
    }

    refreshBtn.classList.remove('hide');
    scoreList.classList.remove('hide');     
    highScoreEl.classList.add('hide'); 
    initialDivEl.classList.add('hide'); 
    yourScore.innerText = " ";

    // refresh the page after 7 seconds
    setTimeout(function() { 
        window.location.reload();
    },5000);

    // renderRecordScore();
}

refreshBtn.addEventListener('click', function () {
  window.location.reload();
});
