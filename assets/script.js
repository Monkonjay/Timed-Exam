var timerEl = document.getElementById('countdown');
var quizEl = document.getElementById('question');

// var timeLeft = 5;
const quizDuration = 2;
var timeLeft = quizDuration * 60;

function countdown() {
    var timeInterval = setInterval(function() {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        let seconds = timeLeft % 60;
        seconds = seconds < 10 ? '0' + seconds : seconds;

        // timerEl.textContent = `Time Remaining: ${timeLeft} `;
        timerEl.textContent = `Time Remaining: ${minutes}: ${seconds} `;
       

        if (timeLeft === 0) {
            clearInterval(timeInterval);
            timerEl.textContent = " ";
       
        // //     timeLeft--;
        }

        // else{
          
        
//         renderQuiz();
//         }
       
    }, 1000);
}


countdown();



// let questionNumber = 0;
// let quiz, quiz_status, question, selection, selections, answerA, answerB, answerC, answerD, correct = 0;




// let questions = [
//     ["Which of the following is not a keyword for variable declaration?", "let", "var", "make", "const", "C"],
//     ["What is the result of this expression: (5 + 6 ) * 10 ?", "110", "65", "56", "undefine", "A"],
//     ["Which of the following statement is true about comments?", "They are required for functions to work", "They are ignored during runtime", "They add style to the page", "They linked HTML to the javaScript code", "B"],
//     ["If g20 is an array of the world's 20 most industrial economies, how would you access the last index of g20?", "g20.last", "g20.length", "g20.last-1", "g20.length-1", "D"],
//     ["Which of the following data type cannot contain a value ?", "string", "numbers", "null", "functions", "C"]
// ];

// function displayQuestion() {
//     let quiz = document.querySelector("#quiz");
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

// displayQuestion();
