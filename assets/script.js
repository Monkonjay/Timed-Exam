var timerEl = document.getElementById('countdown');
var questionWrapperEl = document.getElementById('question-wrapper');
var questionEl = document.getElementById('question');
var answerBtnEl = document.getElementById('answer-buttons');
var startBtn = document.querySelector('#start_btn');

// display question randomly 
let randomizeQuestions, currentQuestionPos;

const quizDuration = 1;
var timeLeft = quizDuration * 60;

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
        }

    // set countdown interval    
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
    displayQuestion(randomizeQuestions[currentQuestionPos]);

    
    // let questionNumber = 0;
    // let quiz, quiz_status, question, selection, selections, answerA, answerB, answerC, answerD, correct = 0;


    // // multidimensional array to store questions
    // let questions = [
    //     
    //     ["What is the result of this expression: (5 + 6 ) * 10 ?", "110", "65", "56", "undefine", "A"],
    //     ["Which of the following statement is true about comments?", "They are required for functions to work", "They are ignored during runtime", "They add style to the page", "They linked HTML to the javaScript code", "B"],
    //     ["If g20 is an array of the world's 20 most industrial economies, how would you access the last index of g20?", "g20.last", "g20.length", "g20.last-1", "g20.length-1", "D"],
    //     ["Which of the following data type cannot contain a value?", "string", "numbers", "null", "functions", "C"]
    // ];


    // function displayQuestion() {
    //     let quiz = document.querySelector("#question");
    //     question = questions[questionNumber][0];
    //     answerA =  questions[questionNumber][1];
    //     answerB =  questions[questionNumber][2];
    //     answerC =  questions[questionNumber][3];
    //     answerD =  questions[questionNumber][4];
    
    //     quiz.innerHTML = "<h3>"+question+"<h3>";
    //     quiz.innerHTML += "<input type='radio' name = 'selections' value = 'A'> "+answerA+"<br>";
    //     quiz.innerHTML += "<input type='radio' name = 'selections' value = 'B'> "+answerA+"<br>";
    //     quiz.innerHTML += "<input type='radio' name = 'selections' value = 'C'> "+answerA+"<br>";
    //     quiz.innerHTML += "<input type='radio' name = 'selections' value = 'D'> "+answerA+"<br>";
        
    // }

}

function displayQuestion(question) {
    questionEl.innerHTML = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener('click', selectAnswers);
        answerBtnEl.appendChild(button);


    })

}



function selectAnswers() {

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
            {text: 'They are required for functions to work', correct: false},
            {text: 'They are ignored during runtime', correct: true},
            {text: "They add style to the page", correct: false},
            {text: 'They linked HTML to the javaScript code', correct: false}
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

startBtn.addEventListener('click', startQuiz);