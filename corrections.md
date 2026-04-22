# Tomorrow Work Notes — StudyOS / QuickSOS Improvements

## Current Failures Detected

### 1. Timer only works if user stays on Emergency page

Problem:
If the user changes to another page (dashboard, pomodoro, index), the inactivity timer stops or effectively resets behavior.

Required fix:
The inactivity timer must continue globally across the entire system, not only inside `emergency.html`.

Goal:
Timer should work across:

* index.html
* dashboard.html
* pomodoro.html
* emergency.html

and continue even if the user navigates between pages.

---

### 2. Emergency button only exists in emergency page

Problem:
The HELP emergency button only appears inside `emergency.html`.

Required fix:
The emergency button must be visible from every screen.

Goal:
Persistent QuickSOS access from:

* dashboard
* pomodoro
* homepage
* emergency page

This should probably be implemented as:

* floating fixed button
  or
* persistent emergency widget

so user can trigger help immediately from anywhere.

---

### 3. Timer should not stop when user leaves page

Problem:
Current countdown depends on the page being actively open.

Required fix:
Timer must continue even if:

* user changes page
* browser tab changes
* another page inside StudyOS is opened

Important note:
Browser limitations may require:

* shared localStorage timestamp system
  or later
* desktop Python monitor

instead of simple per-page JavaScript timer.

Timestamp-based persistence is likely the correct next implementation.

---

### 4. 25 minutes may be too long

Observation:
25 minutes feels too long for real emergency monitoring.

Suggested improvement:

Change timer from:

25 minutes

to:

15 minutes

This is safer and more realistic for medical monitoring.

---

### 5. Confirmation must be a real floating popup

Problem:
Current confirmation only changes text on screen.

This is too easy to miss.

Required fix:
Instead of text replacement:

Create:

floating modal popup

with clear message like:

"Are you okay?
Please confirm within X minutes"

This must interrupt attention and be clearly visible.

Should include:

* popup window
* centered modal
* strong visibility
* confirmation button

not just text in status box.

---

### 6. Soft reminder sound is wrong

Problem:
Current sound is only a small generic beep.

This is not what was intended.

Required change:

Replace with:

calm bird/chill notification sound

Something like:

"hey, are you here?"

instead of:

alarm beep

Goal:
Gentle wellness check, not aggressive alarm.

Soft reminder:
calm, cute, noticeable

Real alarm:
strong emergency sound

These should feel clearly different.

---

## Priority for Next Session

Highest priority:

1. Global persistent timer across all pages
2. Floating confirmation popup
3. Floating emergency HELP button
4. Better soft reminder sound
5. Change timer from 25 → 15 minutes

These are the most important fixes.

---

## Long-Term Direction

Likely future architecture:

GitHub Pages frontend
+
Python desktop background monitor

because browser-only limitations still affect true inactivity monitoring.
