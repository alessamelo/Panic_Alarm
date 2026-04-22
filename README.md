# Smart Inactivity Emergency Monitoring System

## Overview

This project is designed as a personal safety system for individuals who may experience sudden physical weakness, fainting episodes, dizziness, or medical emergencies while working alone on a computer.

Instead of relying on the user to manually press an emergency button, the system monitors inactivity and requests confirmation of wellbeing. If no confirmation is provided after multiple warning stages, the system activates emergency protocols automatically.

This approach functions similarly to a "Dead Man’s Switch", commonly used in industrial safety and medical monitoring systems.

---

# Main Problem

In emergency situations such as:

- dizziness
- fainting
- sudden weakness
- loss of consciousness
- adrenal crisis symptoms
- severe hypotension
- unexpected medical events

the user may not have enough time or physical ability to:

1. unlock their phone
2. open a browser
3. open the emergency page
4. manually press a help button

This makes a traditional emergency button insufficient.

The solution must work automatically when the user becomes inactive.

---

# Proposed Solution

## Smart Inactivity Detection System

The system continuously monitors user activity while working on the computer.

Activity includes:

- keyboard usage
- mouse movement
- system interaction
- normal computer usage
- active presence at the workstation

If activity is detected:

- the timer resets
- no action is taken

If prolonged inactivity is detected:

- the system begins a multi-stage verification process

---

# Multi-Stage Emergency Logic

---

## Stage 1 — Soft Wellness Check

After a predefined period of inactivity (for example 15 minutes), the system displays a small and non-invasive popup notification:

### Example Message

"Are you okay? Please confirm your status."

This stage is designed to avoid false alarms and provide a gentle reminder.

No loud sound is triggered at this stage.

If the user confirms:

- timer resets
- monitoring continues normally

---

## Stage 2 — Serious Confirmation Warning

If no confirmation is received after the first warning, the system escalates after an additional waiting period (for example 10 minutes).

Actions:

- stronger popup appears
- warning sound may begin
- screen may flash softly
- urgency increases

### Example Message

"Emergency mode will activate soon. Please confirm immediately."

This stage ensures the user has another opportunity to cancel the alert.

---

## Stage 3 — Emergency Activation

If there is still no response after the warning stages, the system assumes a possible medical emergency.

Emergency actions are triggered automatically:

- loud alarm siren
- red flashing emergency screen
- WhatsApp emergency message to trusted contacts
- optional live GPS location sharing
- optional desktop notifications
- possible integration with smartwatch alerts

This ensures that even if the user loses consciousness, nearby people or trusted contacts are alerted.

---

# Technical Architecture

## Why GitHub Pages Alone Is Not Enough

GitHub Pages only supports:

- HTML
- CSS
- JavaScript

This means it cannot reliably detect:

- system-wide keyboard activity
- activity outside the browser tab
- background computer usage
- user activity across applications
- reliable inactivity while using other programs

Browser security restrictions prevent this behavior.

Therefore, GitHub Pages alone is insufficient for true inactivity monitoring.

---

# Recommended Technical Solution

## Hybrid Architecture

### Component 1 — Local Background Monitor

A local desktop application (recommended in Python) runs continuously in the background and detects:

- keyboard input
- mouse movement
- system inactivity
- global user presence

This provides reliable monitoring across the entire operating system.

---

### Component 2 — GitHub Emergency Interface

A GitHub Pages web interface provides:

- emergency dashboard
- alarm activation screen
- visual alerts
- backup manual emergency button
- emergency status display

This keeps the interface simple, accessible, and easy to deploy.

---

# Recommended Technologies

## Backend / Monitoring

- Python

Recommended libraries:

- pynput
- pyautogui
- keyboard
- plyer
- tkinter (optional UI)
- requests (for notifications)

---

## Frontend

- HTML
- CSS
- JavaScript
- GitHub Pages deployment

---

## Communication

- WhatsApp Deep Links (recommended)
- optional secure backend for advanced messaging
- optional GPS APIs
- optional smartwatch integration

---

# Security Considerations

Direct integration with APIs such as WhatsApp Business API should not expose:

- tokens
- passwords
- API secrets
- authentication credentials

Sensitive credentials must never be stored in frontend code.

Recommended safer approach:

## WhatsApp Deep Links

Example:

https://wa.me/593XXXXXXXXX?text=I%20need%20help%20right%20now

This avoids security risks while keeping emergency communication fast and practical.

---

# Expected Benefits

This system improves:

- personal medical safety
- response speed during emergencies
- independence while working alone
- automatic emergency escalation
- reliability compared to manual alarm buttons

It transforms a simple emergency webpage into a true proactive medical safety tool.

---

# Final Objective

The goal is not simply to create an alarm button.

The goal is to build a reliable personal emergency monitoring system capable of detecting dangerous inactivity and requesting help automatically when the user cannot do so manually.

This creates a significantly more effective and realistic solution for real-world medical safety.
