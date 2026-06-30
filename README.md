# Student Management System

A simple, browser-based Student Management System built with vanilla HTML, CSS, and JavaScript. All data is stored locally in the browser using `localStorage`, so no backend or database is required.

## Features

- **Dashboard** – At-a-glance summary cards (total classes, students, notices, public notices) plus a bar chart visualization powered by Chart.js.
- **Class Management** – Add, edit, delete, and search classes.
- **Student Management** – Add, edit, delete, and search students with details like name, father's name, gender, class, grade, roll number, and section.
- **Class Notices** – Create, edit, delete, and search class-specific notices.
- **Public Notices** – Create, edit, delete, and search notices visible to everyone.
- **Reports** – A quick summary view of total counts across all data.
- **Global Search** – Search across classes, students, and notices from a single search bar.
- **Persistent Storage** – Data is saved in the browser's `localStorage`, so it remains available even after refreshing the page.
- **Responsive Design** – Layout adapts to smaller screens (sidebar collapses, forms stack vertically).

## Tech Stack

- **HTML5** – Page structure
- **CSS3** – Styling and responsive layout
- **JavaScript (Vanilla)** – App logic and DOM manipulation
- **Chart.js** – Dashboard chart visualization
- **localStorage** – Client-side data persistence

## Project Structure
- index.html — Main HTML file
- style.css — Styling for the project
- script.js — JavaScript logic (handles classes, students, notices, dashboard, and search)
- LICENSE — MIT License file
- README.md — Project documentation
