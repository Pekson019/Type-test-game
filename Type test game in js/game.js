// Array of random words
const words = ['the', 'of', 'and', 'a', 'to', 'in', 'is', 'you', 'that', 'it',
'he', 'was', 'for', 'on', 'are', 'as', 'with', 'his', 'they', 'I',
'at', 'be', 'this', 'have', 'from', 'or', 'one', 'had', 'by', 'word',
'but', 'not', 'what', 'all', 'were', 'we', 'when', 'your', 'can', 'said',
'there', 'use', 'an', 'each', 'which', 'she', 'do', 'how', 'their', 'if',
'will', 'up', 'other', 'about', 'out', 'many', 'then', 'them', 'these', 'so',
'some', 'her', 'would', 'make', 'like', 'him', 'into', 'time', 'has', 'look',
'two', 'more', 'write', 'go', 'see', 'number', 'no', 'way', 'could', 'people',
'my', 'than', 'first', 'water', 'been', 'call', 'who', 'oil', 'its', 'now',
'find', 'long', 'down', 'day', 'did', 'get', 'come', 'made', 'may', 'part'];

// Get DOM elements
const sentenceContainer = document.getElementById('sentence-container');
const sentenceInput = document.getElementById('sentence-input');
const result = document.getElementById('result');
const timerDisplay = document.getElementById('timer');
const speedDisplay = document.getElementById('speed');
const startBtn = document.querySelector("#start");

startBtn.addEventListener("click", () => {
    document.querySelector(".game").style.display = "block";
    sentenceInput.focus()
})
// Initialize game
let currentSentence = '';
let score = 0;
let timer;
let startTime;
let timeRemaining;

// Function to generate a random sentence
function generateRandomSentence() {
    const randomWords = [];
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        randomWords.push(words[randomIndex]);
    }
    return randomWords.join(' ');
}

// Function to start a new round
function startNewRound() {
    // Generate a random sentence
    currentSentence = generateRandomSentence();

    // Display the sentence
    sentenceContainer.textContent = currentSentence;

    // Clear input field
    sentenceInput.value = '';
    sentenceInput.focus();

    // Clear previous result
    result.textContent = '';
    speedDisplay.textContent = '';

    // Reset timer
    timeRemaining = 60;
    timerDisplay.textContent = `Time: ${timeRemaining}s`;

    // Clear previous interval
    clearInterval(timer);

    // Start the timer
    timer = setInterval(() => {
        timerDisplay.textContent = `Time: ${timeRemaining}s`;
        timeRemaining--;

        if (timeRemaining < 0) {
            clearInterval(timer);
            sentenceInput.disabled = true;
            timerDisplay.textContent = 'Time\'s up!';
            calculateTypingSpeed();
            setTimeout(startNewRound, 2000); // Start a new round after 2 seconds
        }
    }, 1000);
    startTime = Date.now();
}

// Function to check the input sentence
function checkSentence() {
    const inputSentence = sentenceInput.value.trim().toLowerCase();

    if (inputSentence === currentSentence) {
        // Sentence spelled correctly
        result.textContent = 'Correct!';
        score++;
    } else {
        // Sentence spelled incorrectly
        result.textContent = 'Incorrect!';
    }
}

// Function to calculate typing speed
function calculateTypingSpeed() {
    const endTime = Date.now();
    const timeElapsed = (endTime - startTime) / 1000; // Convert to seconds
    const typingSpeed = Math.round((currentSentence.length / timeElapsed) * 60); // Characters per minute
    speedDisplay.textContent = `Typing Speed: ${typingSpeed} CPM`;
}

// Event listener for input field keyup event
sentenceInput.addEventListener('keyup', () => {
    const inputSentence = sentenceInput.value.trim().toLowerCase();

    if (inputSentence === currentSentence) {
        // Sentence spelled correctly
        result.textContent = 'Correct!';
        score++;
        clearInterval(timer);
        calculateTypingSpeed();
        setTimeout(startNewRound, 2000); // Start a new round after 2 seconds
    } else {
        // Sentence spelled incorrectly
        result.textContent = 'Incorrect!';
    }
});

// Start the game
startNewRound();
