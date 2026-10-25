// CYBERSAFE - QUESTION BANK

const questions = {
    Easy: [
        {
            question: "What does WWW stand for?",
            options: [
                "World Wide Web",
                "World Web Window",
                "Wide World Website",
                "Web World Work"
            ],
            answer: 0
        },
        {
            question: "Which of these is a strong password?",
            options: [
                "123456",
                "password",
                "Divya@2026#Safe",
                "abcdef"
            ],
            answer: 2
        },
        {
            question: "What is a computer virus?",
            options: [
                "A hardware device",
                "A type of malware",
                "An operating system",
                "A web browser"
            ],
            answer: 1
        },
        {
            question: "What does HTTPS indicate?",
            options: [
                "A secure connection",
                "A computer game",
                "A search engine",
                "A programming language"
            ],
            answer: 0
        },
        {
            question: "What should you do with a suspicious email?",
            options: [
                "Open every link",
                "Share your password",
                "Ignore or report it",
                "Forward it to everyone"
            ],
            answer: 2
        }
    ],

    Medium: [
        {
            question: "What is phishing?",
            options: [
                "A hacking attempt using fake messages",
                "A computer upgrade",
                "A programming method",
                "A data backup"
            ],
            answer: 0
        },
        {
            question: "What does 2FA stand for?",
            options: [
                "Two File Access",
                "Two-Factor Authentication",
                "Two Firewall Applications",
                "Two Fast Accounts"
            ],
            answer: 1
        },
        {
            question: "What is ransomware?",
            options: [
                "Antivirus software",
                "A web browser",
                "Malware that locks or encrypts data",
                "A password manager"
            ],
            answer: 2
        },
        {
            question: "Which protocol is commonly used for secure web browsing?",
            options: [
                "HTTP",
                "FTP",
                "HTTPS",
                "SMTP"
            ],
            answer: 2
        },
        {
            question: "What is a firewall?",
            options: [
                "A security system that filters network traffic",
                "A type of keyboard",
                "A photo editing tool",
                "A storage device"
            ],
            answer: 0
        }
    ],

    Hard: [
        {
            question: "What is SQL injection?",
            options: [
                "A database backup method",
                "An attack that manipulates database queries",
                "A programming language",
                "A network cable"
            ],
            answer: 1
        },
        {
            question: "Which algorithm is commonly used for public-key encryption?",
            options: [
                "AES",
                "RSA",
                "MD5",
                "SHA-256"
            ],
            answer: 1
        },
        {
            question: "What does XSS stand for?",
            options: [
                "Extra Security System",
                "Cross-Site Scripting",
                "Extended Server Software",
                "External Secure Service"
            ],
            answer: 1
        },
        {
            question: "What is the main purpose of a digital signature?",
            options: [
                "Increase screen brightness",
                "Verify authenticity and integrity",
                "Compress files",
                "Speed up internet"
            ],
            answer: 1
        },
        {
            question: "Which security principle gives users only the access they need?",
            options: [
                "Open access",
                "Least privilege",
                "Full permission",
                "Public access"
            ],
            answer: 1
        }
    ]
};


// QUIZ VARIABLES

let currentQuestions = [];
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;
let playerName = "";
let currentLevel = "";
let timeLeft = 60;
let timerInterval = null;
let quizFinished = false;


// HTML ELEMENTS

const startScreen = document.getElementById("startScreen");
const quizScreen = document.getElementById("quizScreen");
const resultScreen = document.getElementById("resultScreen");
const leaderboardScreen = document.getElementById("leaderboardScreen");


// START QUIZ

function startQuiz(level) {

    playerName = document.getElementById("playerName").value.trim();

    if (!playerName) {
        alert("Please enter your name first!");
        return;
    }

    currentLevel = level;
    currentQuestions = questions[level];

    currentQuestion = 0;
    score = 0;
    timeLeft = 60;
    quizFinished = false;

    startScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    leaderboardScreen.classList.add("hidden");
    quizScreen.classList.remove("hidden");

    document.getElementById("levelDisplay").textContent =
        "Level: " + level;

    showQuestion();
    updateTimer();

    clearInterval(timerInterval);

    timerInterval = setInterval(function () {

        timeLeft--;
        updateTimer();

        if (timeLeft <= 0) {
            endQuiz(true);
        }

    }, 1000);
}


// SHOW QUESTION

function showQuestion() {

    selectedAnswer = null;

    const questionData = currentQuestions[currentQuestion];

    document.getElementById("progress").textContent =
        "Question " + (currentQuestion + 1) +
        " of " + currentQuestions.length;

    document.getElementById("question").textContent =
        questionData.question;

    const optionsDiv = document.getElementById("options");

    optionsDiv.innerHTML = "";

    questionData.options.forEach(function (option, index) {

        const button = document.createElement("button");

        button.textContent = option;
        button.className = "option";

        button.onclick = function () {
            selectAnswer(index, button);
        };

        optionsDiv.appendChild(button);

    });

    document.getElementById("nextBtn").disabled = true;

    document.getElementById("nextBtn").textContent =
        currentQuestion === currentQuestions.length - 1
            ? "Finish Quiz"
            : "Next Question →";
}


// SELECT ANSWER

function selectAnswer(index, button) {

    if (selectedAnswer !== null || quizFinished) {
        return;
    }

    selectedAnswer = index;

    const allOptions = document.querySelectorAll(".option");

    allOptions.forEach(function (option) {
        option.disabled = true;
    });

    button.classList.add("selected");

    document.getElementById("nextBtn").disabled = false;

}


// NEXT QUESTION

function nextQuestion() {

    if (selectedAnswer === null || quizFinished) {
        return;
    }

    if (
        selectedAnswer === currentQuestions[currentQuestion].answer
    ) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < currentQuestions.length) {
        showQuestion();
    } else {
        endQuiz(false);
    }

}


// UPDATE TIMER

function updateTimer() {

    document.getElementById("timer").textContent =
        "⏱️ " + timeLeft + " seconds";

}


// END QUIZ

function endQuiz(timeOver) {

    if (quizFinished) {
        return;
    }

    quizFinished = true;

    clearInterval(timerInterval);

    // Count the last selected answer if time runs out
    if (timeOver && selectedAnswer !== null) {

        if (
            selectedAnswer === currentQuestions[currentQuestion].answer
        ) {
            score++;
        }

    }

    quizScreen.classList.add("hidden");
    resultScreen.classList.remove("hidden");

    document.getElementById("score").textContent =
        "Your Score: " + score + " / " + currentQuestions.length;

    document.getElementById("resultMessage").textContent =
        timeOver
            ? "Time is up! Your quiz has ended."
            : "Congratulations " + playerName + "! You completed the quiz.";

    saveScore();

}


// SAVE LEADERBOARD

function saveScore() {

    let leaderboard = JSON.parse(
        localStorage.getItem("cybersafeLeaderboard") || "[]"
    );

    leaderboard.push({
        name: playerName,
        level: currentLevel,
        score: score,
        total: currentQuestions.length,
        date: new Date().toLocaleDateString()
    });

    leaderboard.sort(function (a, b) {
        return (b.score / b.total) - (a.score / a.total);
    });

    leaderboard = leaderboard.slice(0, 10);

    localStorage.setItem(
        "cybersafeLeaderboard",
        JSON.stringify(leaderboard)
    );

}


// SHOW LEADERBOARD

function showLeaderboard() {

    resultScreen.classList.add("hidden");
    leaderboardScreen.classList.remove("hidden");

    const leaderboard = JSON.parse(
        localStorage.getItem("cybersafeLeaderboard") || "[]"
    );

    const list = document.getElementById("leaderboardList");

    list.innerHTML = "";

    if (leaderboard.length === 0) {

        list.textContent = "No scores available yet.";

        return;
    }

    leaderboard.forEach(function (item, index) {

        const row = document.createElement("div");

        row.className = "leaderboard-item";

        const name = document.createElement("span");
        name.textContent =
            (index + 1) + ". " + item.name + " (" + item.level + ")";

        const points = document.createElement("strong");
        points.textContent = item.score + "/" + item.total;

        row.appendChild(name);
        row.appendChild(points);

        list.appendChild(row);

    });

}


// RESTART QUIZ

function restartQuiz() {

    clearInterval(timerInterval);

    quizFinished = true;

    quizScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");
    leaderboardScreen.classList.add("hidden");

    startScreen.classList.remove("hidden");

    document.getElementById("playerName").value = "";

}


// GO HOME

function goHome() {

    clearInterval(timerInterval);

    leaderboardScreen.classList.add("hidden");
    resultScreen.classList.add("hidden");

    startScreen.classList.remove("hidden");

}