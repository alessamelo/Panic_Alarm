
let time = 25 * 60;
let timer;

function updateTimer() {
  const display = document.getElementById("timerDisplay");
  if (!display) return;

  const min = String(Math.floor(time / 60)).padStart(2, '0');
  const sec = String(time % 60).padStart(2, '0');
  display.textContent = `${min}:${sec}`;
}

function startPomodoro() {
  clearInterval(timer);
  timer = setInterval(() => {
    if (time > 0) {
      time--;
      updateTimer();
    }
  }, 1000);
}

function resetPomodoro() {
  clearInterval(timer);
  time = 25 * 60;
  updateTimer();
}

function triggerAlarm() {
  const alarm = document.getElementById("alarmSound");
  if (alarm) {
    alarm.currentTime = 0;
    alarm.play();
  }
}

updateTimer();
