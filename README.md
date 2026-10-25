# Personal Expense Tracker

A production-ready, client-side financial portfolio tracking application featuring interactive state persistence and a modern iOS-style Light Glassmorphic user interface.

## ✨ Core Features
- **Persistent Data Layers:** Financial logs remain fully preserved across hard browser tab refreshes and session closures using the native web `localStorage` API.
- **Dynamic Balance Engine:** Automatically parses data arrays in real-time to compute exact net balances, total income inflows, and collective expense distributions.
- **State Filtration Pipelines:** Integrated high-performance ECMAScript 6 array filters (`.filter()`) to segment transactional history logs dynamically into Income, Expenses, or All channels without reloading the DOM.
- **Input Validation Architecture:** Hardened client-side form controls that handle error state triggers and safely sanitize entries before updating the global state object.

## 🛠️ Architecture & Tech Stack
- **Frontend Layer:** Semantic HTML5 structures for absolute readability and layout definition.
- **Styling Architecture:** Modern CSS3 utilizing custom properties (CSS variables), modular Flexbox/Grid systems, and hardware-accelerated frosted glass (`backdrop-filter`) layout mechanics.
- **Logic Engine:** Native Vanilla JavaScript (ES6+) leveraging explicit state orchestration patterns, strict input event streams, and dynamic DOM injection fragments.

## 📦 Directory Structure
```text
personal-expense-tracker/
├── index.html     # Application view and structural bindings
├── style.css      # Custom interface layout and color variables
└── app.js         # Core business logic and state persistence layer
```

## ⚙️ Installation & Local Setup
1. Clone this repository to your local system:
   ```bash
   git clone https://github.com
   ```
2. Navigate directly into the project workspace:
   ```bash
   cd personal-expense-tracker
   ```
3. Open `index.html` in any modern web browser to run the application instantly.
