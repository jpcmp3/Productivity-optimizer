// Define initial timer values
const INITIAL_WORK_MINUTES = 25;
const INITIAL_BREAK_MINUTES = 5;

// Get DOM elements
const start = document.getElementById("start");
const reset = document.getElementById("reset");
const pause = document.getElementById("pause");
const wm = document.getElementById("w_minutes");
const ws = document.getElementById("w_seconds");
const bm = document.getElementById("b_minutes");
const bs = document.getElementById("b_seconds");
const cyclesCounter = document.getElementById("cycles_counter");

// Load sound files
const clickSound = new Audio("public/sounds/button_click.mp3");
const timerEndSound = new Audio("public/sounds/notification_sound.mp3");

let startTimer; // Store the interval ID

// Set initial timer values dynamically on page load
window.onload = function () {
  wm.innerText = String(INITIAL_WORK_MINUTES).padStart(2, "0");
  ws.innerText = "00";
  bm.innerText = String(INITIAL_BREAK_MINUTES).padStart(2, "0");
  bs.innerText = "00";
  cyclesCounter.innerText = "0";
};

// Play click sound for all buttons
[start, reset, pause].forEach((button) => {
  button.addEventListener("click", () => clickSound.play());
});

// Start button functionality
start.addEventListener("click", function () {
  if (!startTimer) {
    startTimer = setInterval(timer, 1000);
  } else {
    alert("Timer is already running.");
  }
});

// Pause button functionality
pause.addEventListener("click", function () {
  pauseInterval();
  startTimer = undefined;
});

// Reset button functionality with confirmation
reset.addEventListener("click", function () {
  const confirmReset = confirm("Are you sure you want to reset the timer?");
  if (confirmReset) {
    wm.innerText = String(INITIAL_WORK_MINUTES).padStart(2, "0");
    ws.innerText = "00";
    bm.innerText = String(INITIAL_BREAK_MINUTES).padStart(2, "0");
    bs.innerText = "00";
    cyclesCounter.innerText = "0";
    pauseInterval();
    startTimer = undefined;
  }
});

let isWorkPhase = true; // Track whether we are in the work or break phase
let isTimerSoundPlayed = false; // Prevent sound from repeating

function playTimerEndSound() {
  if (!isTimerSoundPlayed) {
    timerEndSound.play();
    isTimerSoundPlayed = true; // Ensure sound plays only once
  }
}

function handleWorkPhase() {
  // Work timer logic
  if (ws.innerText != "00") {
    ws.innerText = String(ws.innerText - 1).padStart(2, "0");
    return; // Exit early if still counting down work seconds
  }

  if (wm.innerText != "00" && ws.innerText === "00") {
    ws.innerText = "59";
    wm.innerText = String(wm.innerText - 1).padStart(2, "0");
    return; // Exit early if still counting down work minutes
  }

  if (wm.innerText === "00" && ws.innerText === "00") {
    playTimerEndSound();
    cyclesCounter.innerText = String(Number(cyclesCounter.innerText) + 1);
    isWorkPhase = false; // Transition to break phase
    isTimerSoundPlayed = false; // Reset sound flag for the next phase
  }
}

function handleBreakPhase() {
  // Break timer logic
  if (bs.innerText != "00") {
    bs.innerText = String(bs.innerText - 1).padStart(2, "0");
    return; // Exit early if still counting down break seconds
  }

  if (bm.innerText != "00" && bs.innerText === "00") {
    bs.innerText = "59";
    bm.innerText = String(bm.innerText - 1).padStart(2, "0");
    return; // Exit early if still counting down break minutes
  }

  if (bm.innerText === "00" && bs.innerText === "00") {
    playTimerEndSound();
    wm.innerText = String(INITIAL_WORK_MINUTES).padStart(2, "0");
    ws.innerText = "00";
    bm.innerText = String(INITIAL_BREAK_MINUTES).padStart(2, "0");
    bs.innerText = "00";
    isWorkPhase = true; // Reset to work phase
    isTimerSoundPlayed = false; // Reset sound flag
  }
}

function pauseInterval() {
  clearInterval(startTimer); // Stops the timer by clearing the interval
}

function timer() {
  if (isWorkPhase) {
    handleWorkPhase();
  } else {
    handleBreakPhase();
  }
}
