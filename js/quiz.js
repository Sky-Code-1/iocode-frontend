    function onTakeQuiz(){
        document.getElementById('footer').classList.add('none');
        document.getElementById('topic-details-section').classList.add('none');
        document.getElementById('quiz-section').classList.remove('none');
    }

    var questionIndex = 0;
    var attempted = 0;
    var answers = [];
    var userAnswer = [];
    var userAnswers = [];
    var counter = 0;
    var timeRemaining;
    var selectedOption;
    var optionA = document.getElementById('optiona');
    var optionB = document.getElementById('optionb');
    var optionC = document.getElementById('optionc');
    var optionD = document.getElementById('optiond');
    var labela = document.getElementById('labela');
    var labelb = document.getElementById('labelb');
    var labelc = document.getElementById('labelc');
    var labeld = document.getElementById('labeld');
    var quizFinished = false;
    for(let i = 0; i < questions.length; i++){
        let {answer} = questions[i];
        answers.push(answer);
        userAnswer[i] = 0;
    }
    console.log(answers);
    console.log(userAnswer);
    function onUserSelection(option){
        userAnswer[questionIndex] = option;
        userAnswers[questionIndex] = document.getElementById(option).value;
        console.log(userAnswers[questionIndex]);
        selectedOption = option;
    }

    function displayQuiz(){
        if(questionIndex < 0 || quizFinished){
            return;
        }
        if(questionIndex === questions.length)
            return;
        if(selectedOption != null && selectedOption)
            document.getElementById(selectedOption).checked = false;
        if(userAnswer[questionIndex] !== 0){
            console.log(`User Answer: ${userAnswer[questionIndex]}`);
            document.getElementById(userAnswer[questionIndex]).checked = true;
        }
        document.getElementById('question-number').innerText = `Question #${questionIndex + 1}`;
        document.querySelector('.quiz-question').innerHTML = questions[questionIndex].body;
        optionA.value = questions[questionIndex].optionA;
        optionB.value = questions[questionIndex].optionB;
        optionC.value = questions[questionIndex].optionC;
        optionD.value = questions[questionIndex].optionD;
        labela.innerHTML = optionA.value;
        labelb.innerHTML = optionB.value;
        labelc.innerHTML = optionC.value;
        labeld.innerHTML = optionD.value;
    }

    function startTimer() {
      const timeLimit = 240;
      timeRemaining = timeLimit;

      function updateTime() {
        const timerElement = document.getElementById("timer");
        timeRemaining--;
        let minutes = Math.floor(timeRemaining / 60);
        let seconds = timeRemaining % 60;
        if(seconds < 10)
            seconds = `0${seconds}`;
        if (timeRemaining < 0 || questionIndex == questions.length) {
          endQuiz();
        } else {
            timer = setTimeout(updateTime, 500);
        }
        if(timeRemaining > 0 && questionIndex < questions.length)
            document.getElementById('timer').innerText = `  ${minutes}:${seconds}`;
      }
      updateTime();
    }

    function nextQuestion(){
        if(questionIndex < questions.length){
            questionIndex++;
            displayQuiz();
        }
        else
            return;
    }

    function previousQuestion(){
        if(questionIndex > 0){
            questionIndex--;
            displayQuiz();
        }
        else
            return;
    }
    function endQuiz() {
      quizFinished = true;
      var score = compareAnswers(userAnswers, answers);
//      console.log(compareAnswers(userAnswer, answers));
      const quizContainer = document.querySelector(".end-quiz");
      quizContainer.innerHTML = `<h2>Quiz Completed!</h2>
                                  <p>Your Score: ${score} out of ${questions.length}</p>`;
      quizContainer.classList.remove('none');
      document.getElementById('quiz-body').classList.add('none');
      timeRemaining = 0;
    }
    function showFirst(){
        displayQuiz();
    }
    function startQuiz(){
        document.getElementById('start-div').classList.add('none');
        document.getElementById('quiz-body').classList.remove('none');
        startTimer();
    }
    function compareAnswers(userResponse, correctResponse){
        let score = 0;
        for(let i = 0; i < correctResponse.length; i++){
            if(userResponse[i] == correctResponse[i])
                score++;
        }
        return score;
    }
    function closeQuiz(){
        document.getElementById('quiz-section').classList.add('none');
        document.getElementById('topic-details-section').classList.remove('none');
        document.getElementById('footer').classList.remove('none');
    }