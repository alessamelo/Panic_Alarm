/*
=====================================
globaltimer.js
QuickSOS Global Emergency Timer
Clean version with styled modal
=====================================

FIXED:
- timer no longer resets on navigation
- proper confirmation popup
- popup uses CSS classes (not ugly inline styles)
- timer does not freeze at 00:00
- modal appears correctly
- only resets when user confirms
=====================================
*/

const TIMER_MINUTES = 15;
const WARNING_MINUTES = 10;

/*
=====================================
INITIAL FLAGS
=====================================
*/

if (!localStorage.getItem("softCheckTriggered")) {
  localStorage.setItem(
    "softCheckTriggered",
    "false"
  );
}

if (!localStorage.getItem("userConfirmed")) {
  localStorage.setItem(
    "userConfirmed",
    "false"
  );
}

/*
=====================================
SAFE INITIAL TIMER SETUP
=====================================
*/

let emergencyEndTime;

const savedTime =
  localStorage.getItem("emergencyEndTime");

if (savedTime && !isNaN(savedTime)) {
  emergencyEndTime = parseInt(savedTime);
} else {
  emergencyEndTime =
    Date.now() + TIMER_MINUTES * 60 * 1000;

  localStorage.setItem(
    "emergencyEndTime",
    emergencyEndTime
  );
}

/*
=====================================
PAGE LOAD
=====================================
*/

document.addEventListener("DOMContentLoaded", () => {
  createConfirmationModal();
  createAlarmAudio();
  startGlobalMonitoring();
});

/*
=====================================
RESET TIMER
ONLY MANUAL RESET
=====================================
*/

function resetEmergencyTimer() {
  emergencyEndTime =
    Date.now() + TIMER_MINUTES * 60 * 1000;

  localStorage.setItem(
    "emergencyEndTime",
    emergencyEndTime
  );

  localStorage.setItem(
    "softCheckTriggered",
    "false"
  );

  localStorage.setItem(
    "userConfirmed",
    "false"
  );
}

/*
=====================================
GLOBAL LOOP
=====================================
*/

function startGlobalMonitoring() {
  updateGlobalTimerDisplay();

  setInterval(() => {
    const remaining =
      emergencyEndTime - Date.now();

    if (remaining <= 0) {
      const alreadyTriggered =
        localStorage.getItem("softCheckTriggered");

      if (alreadyTriggered !== "true") {
        startSoftCheck();
      }
    }

    updateGlobalTimerDisplay();
  }, 1000);
}

/*
=====================================
UPDATE TIMER DISPLAY
=====================================
*/

function updateGlobalTimerDisplay() {
  const display =
    document.getElementById("timerDisplay");

  if (!display) return;

  const remainingSeconds =
    Math.max(
      0,
      Math.floor(
        (emergencyEndTime - Date.now()) / 1000
      )
    );

  const minutes =
    String(
      Math.floor(remainingSeconds / 60)
    ).padStart(2, "0");

  const seconds =
    String(
      remainingSeconds % 60
    ).padStart(2, "0");

  display.textContent =
    `${minutes}:${seconds}`;
}

/*
=====================================
SOFT CHECK
=====================================
*/

function startSoftCheck() {
  const alreadyTriggered =
    localStorage.getItem("softCheckTriggered");

  if (alreadyTriggered === "true") return;

  localStorage.setItem(
    "softCheckTriggered",
    "true"
  );

  const softSound =
    document.getElementById("softBirdSound");

  if (softSound) {
    softSound.currentTime = 0;
    softSound.play();
  }

  showConfirmationModal();

  setTimeout(() => {
    const confirmed =
      localStorage.getItem("userConfirmed");

    if (confirmed !== "true") {
      triggerRealEmergency();
    }
  }, WARNING_MINUTES * 60 * 1000);
}

/*
=====================================
SHOW MODAL
=====================================
*/

function showConfirmationModal() {
  const modal =
    document.getElementById("wellnessModal");

  if (modal) {
    modal.style.display = "flex";
  }
}

/*
=====================================
USER CONFIRMATION
=====================================
*/

function confirmWellBeing() {
  localStorage.setItem(
    "userConfirmed",
    "true"
  );

  localStorage.setItem(
    "softCheckTriggered",
    "false"
  );

  const modal =
    document.getElementById("wellnessModal");

  if (modal) {
    modal.style.display = "none";
  }

  resetEmergencyTimer();
  updateGlobalTimerDisplay();
}

/*
=====================================
REAL EMERGENCY
=====================================
*/

function triggerRealEmergency() {
  const realAlarm =
    document.getElementById("realEmergencyAlarm");

  if (realAlarm) {
    realAlarm.currentTime = 0;
    realAlarm.play();
  }

  showEmergencyAlert();

  if (navigator.vibrate) {
    navigator.vibrate([
      500, 300,
      500, 300,
      1000
    ]);
  }
}

/*
=====================================
BEAUTIFUL ALERT
(no ugly alert())
=====================================
*/

function showEmergencyAlert() {
  const existing =
    document.getElementById("emergencyAlert");

  if (existing) return;

  const alertBox =
    document.createElement("div");

  alertBox.id = "emergencyAlert";

  alertBox.innerHTML = `
    <div class="modal-card">
      <h2>🚨 Emergency Mode Activated</h2>

      <p>
        Please get help immediately.<br>
        Your emergency system is active.
      </p>

      <button
        class="modal-confirm-btn"
        onclick="closeEmergencyAlert()"
      >
        CLOSE
      </button>
    </div>
  `;

  document.body.appendChild(alertBox);

  alertBox.style.display = "flex";
}

function closeEmergencyAlert() {
  const alertBox =
    document.getElementById("emergencyAlert");

  if (alertBox) {
    alertBox.remove();
  }
}

/*
=====================================
MANUAL HELP
=====================================
*/

function manualEmergencyTrigger() {
  triggerRealEmergency();
}

/*
=====================================
CONFIRMATION MODAL
Uses CSS classes from emergency.css
=====================================
*/

function createConfirmationModal() {
  if (
    document.getElementById("wellnessModal")
  ) return;

  const modal =
    document.createElement("div");

  modal.id = "wellnessModal";

  modal.innerHTML = `
    <div class="modal-card">
      <h2>💛 Are you okay?</h2>

      <p>
        We noticed inactivity.<br>
        Please confirm your wellbeing
        within 10 minutes.
      </p>

      <button
        class="modal-confirm-btn"
        onclick="confirmWellBeing()"
      >
        I'M OK
      </button>
    </div>
  `;

  document.body.appendChild(modal);
}

/*
=====================================
AUDIO
=====================================
*/

function createAlarmAudio() {
  if (
    !document.getElementById("softBirdSound")
  ) {
    const softAudio =
      document.createElement("audio");

    softAudio.id = "softBirdSound";
    softAudio.src =
      "https://actions.google.com/sounds/v1/animals/bird_chirp.ogg";

    document.body.appendChild(softAudio);
  }

  if (
    !document.getElementById("realEmergencyAlarm")
  ) {
    const realAudio =
      document.createElement("audio");

    realAudio.id = "realEmergencyAlarm";
    realAudio.src =
      "https://actions.google.com/sounds/v1/alarms/alarm_clock.ogg";
    realAudio.loop = true;

    document.body.appendChild(realAudio);
  }
}