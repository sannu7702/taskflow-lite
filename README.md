# TaskFlow Lite 📋

> Your client-side task management solution

## Overview

TaskFlow Lite is a fully functional task manager built with **vanilla JavaScript** (no frameworks). It runs entirely in the browser and persists data using `localStorage`.

---

## Features

- ✅ **Create** tasks via form submission
- 📖 **Read** tasks with completion status displayed
- ✏️ **Update** task text with inline editing
- 🗑️ **Delete** tasks with confirmation
- 🔄 **Toggle** task completion via checkbox
- 💾 **Data Persistence** — tasks survive page refresh (localStorage)
- 🔍 **Filter** by All / Active / Completed
- 🛡️ **Validation** — empty, too-short, too-long inputs rejected
- ♿ **Accessible** — ARIA labels, keyboard navigation
- 📱 **Responsive** — works on mobile and desktop
- 🌙 **Dark mode** design

---

## Project Structure

```
taskflow-lite/
├── index.html          # Main application interface
├── styles/
│   ├── main.css        # Core styling
│   └── utilities.css   # Helper classes
├── app.js              # Application logic (entry point)
├── modules/
│   ├── storage.js      # localStorage abstraction
│   ├── render.js       # DOM rendering functions
│   └── validation.js   # Form validation logic
└── README.md           # Project documentation
```
## How to Run

1. Open `index.html` in any modern browser
2. **OR** use Live Server in VS Code for hot reload



## Deployment

### GitHub Pages
1. Push this folder to a GitHub repository
2. Go to **Settings → Pages → Source: main branch / root**
3. Your app is live at `https://github.com/sannu7702/taskflow-lite.git`


