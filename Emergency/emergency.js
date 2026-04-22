/*
=====================================
emergency.js
QuickSOS Emergency Contact System
Only for emergency.html
=====================================

Handles:
- enable/disable emergency contact
- save contact
- edit contact
- delete contact
- render preview
- WhatsApp emergency message
=====================================
*/

/*
=====================================
PAGE LOAD
=====================================
*/

window.onload = function () {
  loadEmergencyContact();
};

/*
=====================================
TOGGLE ENABLE SWITCH
=====================================
*/

function toggleEmergencyFields() {
  const enabled =
    document.getElementById("enableEmergency").checked;

  const fields =
    document.getElementById("emergencyFields");

  fields.style.display =
    enabled ? "block" : "none";

  localStorage.setItem(
    "emergencyEnabled",
    enabled
  );
}

/*
=====================================
SAVE CONTACT
=====================================
*/

function saveEmergencyContact() {
  const name =
    document.getElementById("contactName").value.trim();

  const phone =
    document.getElementById("contactPhone").value.trim();

  const message =
    document.getElementById("emergencyMessage").value.trim();

  if (!name || !phone || !message) {
    alert("Please complete all fields.");
    return;
  }

  const data = {
    name,
    phone,
    message
  };

  localStorage.setItem(
    "emergencyContact",
    JSON.stringify(data)
  );

  renderPreview(data);

  alert("Emergency contact saved successfully.");
}

/*
=====================================
LOAD SAVED CONTACT
=====================================
*/

function loadEmergencyContact() {
  const enabled =
    localStorage.getItem("emergencyEnabled") === "true";

  document.getElementById("enableEmergency").checked =
    enabled;

  if (enabled) {
    document.getElementById("emergencyFields").style.display =
      "block";
  }

  const saved =
    JSON.parse(localStorage.getItem("emergencyContact"));

  if (saved) {
    document.getElementById("contactName").value =
      saved.name;

    document.getElementById("contactPhone").value =
      saved.phone;

    document.getElementById("emergencyMessage").value =
      saved.message;

    renderPreview(saved);
  }
}

/*
=====================================
RENDER PREVIEW
=====================================
*/

function renderPreview(data) {
  const preview =
    document.getElementById("savedPreview");

  preview.innerHTML = `
    <strong>Name:</strong> ${data.name}<br><br>
    <strong>Phone:</strong> ${data.phone}<br><br>
    <strong>Message:</strong><br>
    ${data.message}
  `;
}

/*
=====================================
EDIT CONTACT
=====================================
*/

function editEmergencyContact() {
  const saved =
    JSON.parse(localStorage.getItem("emergencyContact"));

  if (!saved) {
    alert("No saved emergency contact found.");
    return;
  }

  document.getElementById("enableEmergency").checked =
    true;

  document.getElementById("emergencyFields").style.display =
    "block";

  document.getElementById("contactName").value =
    saved.name;

  document.getElementById("contactPhone").value =
    saved.phone;

  document.getElementById("emergencyMessage").value =
    saved.message;

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}

/*
=====================================
DELETE CONTACT
=====================================
*/

function deleteEmergencyContact() {
  const confirmDelete =
    confirm("Delete emergency contact?");

  if (!confirmDelete) return;

  localStorage.removeItem("emergencyContact");
  localStorage.removeItem("emergencyEnabled");

  document.getElementById("contactName").value = "";
  document.getElementById("contactPhone").value = "";
  document.getElementById("emergencyMessage").value = "";

  document.getElementById("enableEmergency").checked =
    false;

  document.getElementById("emergencyFields").style.display =
    "none";

  document.getElementById("savedPreview").innerHTML =
    "No emergency contact configured yet.";

  alert("Emergency contact deleted.");
}

/*
=====================================
SEND WHATSAPP MESSAGE
=====================================
*/

function sendEmergencyMessage() {
  const enabled =
    localStorage.getItem("emergencyEnabled") === "true";

  if (!enabled) {
    alert("Emergency contact system is disabled.");
    return;
  }

  const saved =
    JSON.parse(localStorage.getItem("emergencyContact"));

  if (!saved) {
    alert("Please configure your emergency contact first.");
    return;
  }

  const phone =
    saved.phone.replace(/\D/g, "");

  const message =
    encodeURIComponent(saved.message);

  const whatsappURL =
    `https://wa.me/${phone}?text=${message}`;

  window.open(whatsappURL, "_blank");
}