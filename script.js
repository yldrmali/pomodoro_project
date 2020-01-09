
const bodyDisplay = document.querySelector("body");
const container = document.querySelector(".container");

const playbtn=document.querySelector(".play img:nth-child(1)")
const stopbtn = document.querySelector(".play img:nth-child(2)");
const resetbtn = document.querySelector(".reset");
const currentStateDisplay = document.querySelector(".current-state");
const currentTimeDisp = document.querySelector(".time");


const session_minusBtn = document.querySelector(".session_minus");
const session_plusBtn = document.querySelector(".session_plus");
const break_minusBtn = document.querySelector(".break_minus");
const break_plusBtn = document.querySelector(".break_plus");
const sessionTimeDisp = document.querySelector(".work-time");
const breakTimeDisplay = document.querySelector(".break-time");

// Default Values
let sessionMin = 25;
let breakMin = 5;

const timer = {
    workTime: sessionMin * 60,
    breakTime: breakMin * 60,
    isStopped: false,
    status: "Session",
    avoidRepeat: true,


}

// Temp values to record whether changes were made during menu 
let tempSession;
let tempBreak;

// Check for changes if so, update currentTimeDisp
if (tempSession !== sessionMin && timer.status === "Session") {
    updateValues();
} else if (tempBreak !== breakMin && timer.status === "Break") {
    updateValues();
} else if (tempSession !== sessionMin) {
    updateSessionTime();
} else if (tempBreak !== breakMin) {
    updateBreakTime();
}

//play-stop button current situation
playbtn.addEventListener("click", ()=>{
    console.log(playbtn.classList);
    (!playbtn.classList.contains("stopped")) ? stop(): start();
});
stopbtn.addEventListener("click",()=>{
    (!stopbtn.classList.contains("stopped"))? start():stop();
});

function stop() {
    playbtn.classList.add("stopped");
    timer.isStopped = false;

    playbtn.style.visibility='hidden'
    stopbtn.style.visibility='visible'
    countdown();
}

function start() {
    playbtn.classList.remove("stopped");
    timer.isStopped = true;
    playbtn.style.visibility='visible'
    stopbtn.style.visibility='hidden'
    
   
}
 window.onload = function() {
    updateDisplay();
}


function countdown() {
    if (timer.avoidRepeat == true) {
        setInterval(function() {
            if (!timer.isStopped && timer.status === "Session") {
                timer.workTime -= 1;
            } else if (!timer.isStopped) {
                timer.breakTime -= 1;
            }
            updateDisplay();
            timer.avoidRepeat = false
        }, 1);
    }
}


resetbtn.addEventListener("click", function() {
    start();
    updateValues();
    updateDisplay();
});

function updateValues() {
    timer.workTime = sessionMin * 60;
    timer.breakTime = breakMin * 60;
}

function updateBreakTime() {
    timer.breakTime = breakMin * 60;
}

function updateSessionTime() {
    timer.workTime = sessionMin * 60;
}

let minutes;
let seconds;

function updateDisplay() {

    if (timer.status === "Session") {
        minutes = parseInt(timer.workTime / 60);
        seconds = parseInt(timer.workTime % 60);
    } else if (timer.status === "Break") {
        minutes = parseInt(timer.breakTime / 60);
        seconds = parseInt(timer.breakTime % 60);
    }
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    currentTimeDisp.textContent = minutes + ":" + seconds;
    document.title = `(${minutes}:${seconds}) Pomodoro - ${timer.status}`;

    if (parseInt(minutes) === 0 && parseInt(seconds) === 0) {
        updateStatus();
        updateDisplay();
    }
    currentStateDisplay.textContent = (timer.status === "Session") ? "Session" : "Break";
}




function updateStatus() {
    if (timer.status === "Session") {
        timer.status = "Break";
        alert("It's time to Break!");
    } else {
        timer.status = "Session";
        updateValues();
        alert("It's time to get back to Session!");
    }
}


function updateManageDisp() {
    sessionTimeDisp.textContent = sessionMin;
    breakTimeDisplay.textContent = breakMin;
}
updateManageDisp();

session_minusBtn.addEventListener("click", function() {
    if (sessionMin > 5) {
        sessionMin -= 5;
        updateManageDisp();
        updateValues();
        updateDisplay();
    }
});

session_plusBtn.addEventListener("click", function() {
    if (sessionMin < 60) {
        sessionMin += 5;
        updateManageDisp()
        updateValues();
        updateDisplay();
    }
});

break_minusBtn.addEventListener("click", function() {
    if (breakMin > 5) {
        breakMin -= 5;
        updateManageDisp()
        updateValues();
        updateDisplay();

    }
});

break_plusBtn.addEventListener("click", function() {
    if (breakMin < 60) {
        breakMin += 5;
        updateManageDisp()
        updateValues();
        updateDisplay();
    }
});