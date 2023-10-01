const timeDisplay = document.getElementById('time');
const dateDisplay = document.getElementById('date');
const alarmTimeInput = document.getElementById('alarm-time');
const setAlarmBtn = document.getElementById('set-alarm-btn');
const stopAlarmBtn = document.getElementById('stop-alarm-btn');
const alarmSound = document.getElementById('alarm-sound');
let alarmInterval;

// Function to update the clock
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const year = now.getFullYear();

     
    const time = `${hours} : ${minutes} : ${seconds}`;
    const date = `${month}/${day}/${year}`;

    timeDisplay.textContent = time;
    dateDisplay.textContent = date;
}

// Function to play the alarm sound
function playAlarmSound() {
    alarmSound.play();
}

// Function to stop the alarm sound
function stopAlarmSound() {
    alarmSound.pause();
    alarmSound.currentTime = 0;
}

// Function to check if the current time matches the alarm time
function checkAlarm() {
    const now = new Date();
    const currentHour = now.getHours();
    const currentMinute = now.getMinutes();
    const alarmHour = parseInt(alarmTimeInput.value.split(':')[0]);
    const alarmMinute = parseInt(alarmTimeInput.value.split(':')[1]);

    if (currentHour === alarmHour && currentMinute === alarmMinute) {
        playAlarmSound();
        setAlarmBtn.disabled = true;
        stopAlarmBtn.disabled = false;
    }
}

// Function to start the alarm interval
function startAlarmInterval() {
    alarmInterval = setInterval(checkAlarm, 1000);
}

// Event listener for the "Set Alarm" button
setAlarmBtn.addEventListener('click', () => {
    startAlarmInterval();
});

// Event listener for the "Stop Alarm" button
stopAlarmBtn.addEventListener('click', () => {
    stopAlarmSound();
    setAlarmBtn.disabled = false;
    stopAlarmBtn.disabled = true;
    clearInterval(alarmInterval);
});

// Initial clock update
updateClock();
// Clock update interval (every second)
setInterval(updateClock, 1000);
