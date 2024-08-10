const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startButton = document.getElementById('startBtn');
const stopButton = document.getElementById('stopBtn');
const pauseButton = document.getElementById('pauseBtn');
const resetButton = document.getElementById('resetBtn'); 

const lapList = document.getElementById('laplist');

// Stopwatch variables
let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;

startButton.addEventListener('click', startTimer);
stopButton.addEventListener('click', stopTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);

function startTimer() {
    if (!interval) { // Prevent multiple intervals
        interval = setInterval(updateTimer, 10);
    }
    startButton.disabled = true; // Disable start button while running
    pauseButton.disabled = false; // Enable pause button
    resetButton.disabled = false; // Enable reset button
}

function stopTimer() {
    clearInterval(interval);
    interval = null; // Ensure interval is cleared
    addToLapList();
    resetTimerData();
    startButton.disabled = false; // Enable start button after stopping
    pauseButton.disabled = true; // Disable pause button
    resetButton.disabled = true; // Disable reset button
}

function pauseTimer() {
    clearInterval(interval);
    interval = null; // Clear interval to pause
    startButton.disabled = false; // Allow restart
}

function resetTimer() {
    clearInterval(interval);
    interval = null; // Ensure interval is cleared
    resetTimerData();
    lapList.innerHTML = ''; // Clear lap list
    startButton.disabled = false; // Enable start button after reset
    pauseButton.disabled = true; // Disable pause button
    resetButton.disabled = true; // Disable reset button
}

function updateTimer() {
    milliseconds++;
    if (milliseconds === 100) { // Reset milliseconds at 100
        milliseconds = 0;
        seconds++;
        if (seconds === 60) {
            seconds = 0;
            minutes++;
        }
    }
    displayTimer();
}

function displayTimer() {
    millisecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);
}

function padTime(time) {
    return time.toString().padStart(2, '0');
}

function resetTimerData() {
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer();
}

function addToLapList() {
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;
    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span>${lapTime}`;
    lapList.appendChild(listItem);
}
