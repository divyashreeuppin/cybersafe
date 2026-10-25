// CyberSafe Quiz Questions

const questions = [
    {
        question: "1. What is phishing?",
        options: [
            "A type of computer",
            "A fraudulent attempt to steal information",
            "A programming language",
            "A web browser"
        ],
        answer: 1
    },
    {
        question: "2. Which password is the strongest?",
        options: [
            "123456",
            "password",
            "Divya123",
            "T#9mK!72pL"
        ],
        answer: 3
    },
    {
        question: "3. What should you do with a suspicious email link?",
        options: [
            "Click it immediately",
            "Forward it to everyone",
            "Avoid clicking it",
            "Share your password"
        ],
        answer: 2
    },
    {
        question: "4. What does antivirus software do?",
        options: [
            "Creates websites",
            "Protects against malicious software",
            "Increases screen brightness",
            "Deletes all files"
        ],
        answer: 1
    },
    {
        question: "5. What is the full form of OTP?",
        options: [
            "One Time Password",
            "Online Transfer Process",
            "Open Text Program",
            "Only Trusted Person"
        ],
        answer: 0
    },
    {
        question: "6. What is malware?",
        options: [
            "A useful application",
            "A type of keyboard",
            "Malicious software",
            "A search engine"
        ],
        answer: 2
    },
    {
        question: "7. Why is two-factor authentication useful?",
        options: [
            "It adds an extra layer of security",
            "It removes your account",
            "It slows down the internet",
            "It shares your data"
        ],
        answer: 0
    },
    {
        question: "8. What should you do on public Wi-Fi?",
        options: [
            "Access unknown websites",
            "Share banking details",
            "Use caution and avoid sensitive transactions",
            "Share your passwords"
        ],
        answer: 2
    },
    {
        question: "9. What is a firewall?",
        options: [
            "A security system that filters network traffic",
            "A photo editing tool",
            "A gaming application",
            "A social media platform"
        ],
        answer: 0
    },
    {
        question: "10. What should you do if you receive a suspicious attachment?",
        options: [
            "Open it immediately",
            "Download it",
            "Send it to friends",
            "Do not open it and report it"
        ],
        answer: 3
    }
];

// Variables
let currentQuestion = 0;
let score = 0;
let selectedAnswer = null;

// HTML Elements
const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("nextBtn");
const quizElement = document.getElementById("quiz");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");

// Display Question
function loadQuestion() {
    selectedAnswer = null;

    const current = questions[currentQuestion];

    questionElement.textContent = current.question;
    optionsElement.innerHTML = "";

    current.options.forEach((option, index) => {
        const button = document.createElement("button");

        button.textContent = option;
        button.classList.add("option-btn");

        button.onclick = function () {
            selectAnswer(index, button);
        };

        optionsElement.appendChild(button);
    });

    nextButton.textContent =
        currentQuestion === questions.length - 1
            ? "Finish Quiz"
            : "Next Question";
}

// Select Answer
function selectAnswer(index, button) {
    selectedAnswer = index;

    const allButtons =
        document.querySelectorAll(".option-btn");

    allButtons.forEach(btn => {
        btn.classList.remove("selected");
    });

    button.classList.add("selected");
}

// Next Question
function nextQuestion() {

    if (selectedAnswer === null) {
        alert("Please select an answer first!");
        return;
    }

    if (selectedAnswer === questions[currentQuestion].answer) {
        score++;
    }

    currentQuestion++;

    if (currentQuestion < questions.length) {
        loadQuestion();
    } else {
        showResult();
    }
}

// Display Result
function showResult() {
    quizElement.classList.add("hidden");
    resultElement.classList.remove("hidden");

    scoreElement.textContent =
        "Your Score: " + score + " / " + questions.length;
}

// Restart Quiz
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    selectedAnswer = null;

    resultElement.classList.add("hidden");
    quizElement.classList.remove("hidden");

    loadQuestion();
}

// Start Quiz
loadQuestion();