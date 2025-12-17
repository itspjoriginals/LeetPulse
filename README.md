# 🚀 LeetPulse

> **Track your LeetCode progress like a pro.**
> A clean, modern, glassmorphism-based web app to visualize your LeetCode statistics in real time.

---

## ✨ What is LeetPulse?

**LeetPulse** is a frontend web application that fetches and visualizes LeetCode user statistics using the official **LeetCode GraphQL API**.

It helps you:

* Track solved problems by difficulty (Easy / Medium / Hard)
* Visualize progress with animated circular charts
* View submission statistics at a glance
* Share your progress as a portfolio-worthy project

This project is built with **vanilla HTML, CSS, and JavaScript**, focusing on clean UI, strong UX, and production-ready code structure.

---

## 🔥 Features

* 🎯 **Difficulty-wise Progress Rings** (Easy / Medium / Hard)
* 📊 **Submission Statistics Cards**
* ⚡ **Real-time Data Fetching** using LeetCode GraphQL
* 🧠 **Smart Data Mapping** (no hard-coded indexes)
* 💾 **LocalStorage Caching** for faster repeat searches
* ⌨️ **Enter Key Support** for quick search
* 🪄 **Glassmorphism + Premium UI**
* 📱 **Fully Responsive Design**

---

## 🖼️ UI Preview

> Modern glassmorphism UI with animated circular progress indicators and clean typography.

*(Add screenshots here for better presentation)*

---

## 🛠️ Tech Stack

* **HTML5** – Semantic structure
* **CSS3** – Glassmorphism, gradients, animations
* **JavaScript (ES6+)** – Async/Await, Fetch API, DOM manipulation
* **LeetCode GraphQL API** – User stats
* **CORS Anywhere** – Temporary CORS handling

---

## 📂 Project Structure

```
LeetPulse/
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## 🚀 Getting Started

### 1️⃣ Clone the repository

```bash
git clone https://github.com/itspjoriginals/LeetPulse
cd leetpulse
```

### 2️⃣ Enable CORS Anywhere (Required)

This project uses **cors-anywhere** temporarily.

Visit the following URL and click **“Request temporary access”**:

```
https://cors-anywhere.herokuapp.com/
```

> ⚠️ Note: This is for development/demo purposes only.

---

### 3️⃣ Run the app

Simply open `index.html` in your browser:

```bash
open index.html
```

or use **Live Server** in VS Code.

---

## 🧠 How It Works

1. User enters a LeetCode username
2. App sends a **GraphQL POST request** to LeetCode
3. Data is:

   * Validated
   * Mapped by difficulty
   * Cached in LocalStorage
4. UI updates dynamically:

   * Progress rings animate
   * Stats cards render

---

## 🔐 Username Validation

Usernames are validated using regex:

```js
/^[a-zA-Z0-9_-]{3,20}$/
```

This prevents invalid API requests.

---

## 📈 Future Enhancements

* 🔄 Compare two LeetCode users
* 📅 Streak & consistency tracking
* 📤 Export stats as image (shareable card)
* 🌙 Dark / AMOLED toggle
* ⚛️ React + Tailwind version

---

## 🧑‍💻 Author

**Prashant Kumar Jha**
Web Developer | DSA Enthusiast | Frontend Engineer

* 💼 **LinkedIn:** [itspjoriginals](https://www.linkedin.com/in/itspjoriginals/)
* 🧠 **LeetCode:** [itspjoriginals](https://leetcode.com/u/itspjoriginals/)
* 🧑‍💻 **GitHub:** [itspjoriginals](https://github.com/itspjoriginals)

---

## ⭐ Show Your Support

If you found this project useful:

* ⭐ Star the repository
* 🍴 Fork it
* 📢 Share it on LinkedIn

---

## 📜 License

This project is open-source and available under the **MIT License**.

---

> *LeetPulse — Feel the rhythm of your coding journey.* 💙
