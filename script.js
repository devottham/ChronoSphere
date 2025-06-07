// DOM Elements
const menuBtn = document.getElementById('menuBtn');
const closeBtn = document.getElementById('closeBtn');
const settingsMenu = document.getElementById('settingsMenu');
const dynamicQuote = document.getElementById('dynamicQuote');
const daysDisplay = document.getElementById('days');
const hoursDisplay = document.getElementById('hours');
const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const daysInput = document.getElementById('daysInput');
const hoursInput = document.getElementById('hoursInput');
const minutesInput = document.getElementById('minutesInput');
const secondsInput = document.getElementById('secondsInput');
const quoteInput = document.getElementById('quoteInput');
const applyTimerBtn = document.getElementById('applyTimerBtn');
const startDate = document.getElementById('startDate');
const endDate = document.getElementById('endDate');
const calculateBtn = document.getElementById('calculateBtn');
const calculatorResult = document.getElementById('calculatorResult');
const daysResult = document.getElementById('daysResult');
const setAsDaysBtn = document.getElementById('setAsDaysBtn');
const alarm = document.getElementById('alarm');

// Timer variables
let totalSeconds = 0;
let timerInterval;
let isRunning = false;

// Set default dates for calculator
const today = new Date();
const nextWeek = new Date();
nextWeek.setDate(today.getDate() + 7);

startDate.valueAsDate = today;
endDate.valueAsDate = nextWeek;

// Menu toggle
menuBtn.addEventListener('click', () => {
    settingsMenu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
    settingsMenu.classList.remove('active');
});

// Apply timer settings
applyTimerBtn.addEventListener('click', () => {
    const days = parseInt(daysInput.value) || 0;
    const hours = parseInt(hoursInput.value) || 0;
    const minutes = parseInt(minutesInput.value) || 0;
    const seconds = parseInt(secondsInput.value) || 0;
    const quote = quoteInput.value || "BE READY FOR SOMETHING AMAZING!";
    
    totalSeconds = (days * 86400) + (hours * 3600) + (minutes * 60) + seconds;
    
    dynamicQuote.textContent = quote;
    updateDisplay();
    
    // Close menu after applying
    settingsMenu.classList.remove('active');
    
    // Reset timer state
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        startBtn.textContent = "START";
        startBtn.querySelector('i').className = "fas fa-play";
    }
    
    //visual feedback
    applyTimerBtn.innerHTML = '<i class="fas fa-check-circle"></i> APPLIED!';
    setTimeout(() => {
        applyTimerBtn.innerHTML = '<i class="fas fa-check-circle"></i> APPLY SETTINGS';
    }, 2000);
});

// Timer controls
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        if (totalSeconds <= 0) {
            alert("Please set a timer duration first!");
            return;
        }
        
        startTimer();
        startBtn.innerHTML = '<i class="fas fa-play"></i> RESUME';
        startBtn.style.display = 'none';
        pauseBtn.style.display = 'flex';
    }
});

pauseBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;
        pauseBtn.style.display = 'none';
        startBtn.style.display = 'flex';
    }
});

resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    totalSeconds = 0;
    updateDisplay();
    dynamicQuote.textContent = "Timer has been reset. Set a new duration!";
    startBtn.style.display = 'flex';
    pauseBtn.style.display = 'none';
});

// Date calculator
calculateBtn.addEventListener('click', () => {
    const start = new Date(startDate.value);
    const end = new Date(endDate.value);
    
    if (!start || !end) {
        alert("Please select both dates!");
        return;
    }
    
    if (start > end) {
        alert("End date must be after start date!");
        return;
    }
    
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    daysResult.textContent = diffDays;
    calculatorResult.style.display = 'block';
    
    //visual feedback
    calculateBtn.innerHTML = '<i class="fas fa-check"></i> CALCULATED!';
    setTimeout(() => {
        calculateBtn.innerHTML = '<i class="fas fa-calculator"></i> CALCULATE DURATION';
    }, 2000);
});

setAsDaysBtn.addEventListener('click', () => {
    const days = parseInt(daysResult.textContent) || 0;
    daysInput.value = days;
    hoursInput.value = 0;
    minutesInput.value = 0;
    secondsInput.value = 0;
    
    //visual feedback
    setAsDaysBtn.innerHTML = '<i class="fas fa-check"></i> APPLIED!';
    setTimeout(() => {
        setAsDaysBtn.innerHTML = '<i class="fas fa-sync-alt"></i> SET AS TIMER DAYS';
    }, 2000);
});

// Timer functions
function startTimer() {
    isRunning = true;
    
    timerInterval = setInterval(() => {
        if (totalSeconds <= 0) {
            clearInterval(timerInterval);
            isRunning = false;
            alarm.play();
            dynamicQuote.textContent = "TIME'S UP!";
            startBtn.style.display = 'flex';
            pauseBtn.style.display = 'none';
            
            // Adding effect to the countdown
            document.querySelectorAll('.countdown-value').forEach(el => {
                el.style.animation = "none";
                setTimeout(() => {
                    el.style.animation = "pulse 0.5s 3";
                }, 10);
            });
            return;
        }
        
        totalSeconds--;
        updateDisplay();
        
        // Update quote based on time remaining
        if (totalSeconds === 0) {
            dynamicQuote.textContent = "TIME'S UP!";
        } else if (totalSeconds < 60) {
            dynamicQuote.textContent = "Final moments... Make them count!";
        } else if (totalSeconds < 3600) {
            dynamicQuote.textContent = "Less than an hour remains!";
        }
    }, 1000);
}

function updateDisplay() {
    const days = Math.floor(totalSeconds / 86400);
    const hours = Math.floor((totalSeconds % 86400) / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    
    daysDisplay.textContent = days.toString().padStart(2, '0');
    hoursDisplay.textContent = hours.toString().padStart(2, '0');
    minutesDisplay.textContent = minutes.toString().padStart(2, '0');
    secondsDisplay.textContent = seconds.toString().padStart(2, '0');
}

// Initialize
updateDisplay();
pauseBtn.style.display = 'none';

// Apply a default timer on load
setTimeout(() => {
    daysInput.value = 0;
    hoursInput.value = 0;
    minutesInput.value = 30;
    secondsInput.value = 0;
    quoteInput.value = "BE READY FOR SOMETHING AMAZING!";
    applyTimerBtn.click();
}, 1000);
