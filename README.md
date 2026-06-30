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

```
├── index.html      # Main HTML file
├── style.css       # Styling
├── script.js       # App logic (CRUD operations, search, dashboard, chart)
└── README.md
```

## Getting Started

1. Clone or download this repository.
   ```bash
   git clone https://github.com/<your-username>/<repo-name>.git](https://github.com/KishanSaha2000/Student-Management-System.git
   ```
2. Open `index.html` directly in your browser — no server or installation required.

> **Note:** Since data is stored in `localStorage`, it is specific to the browser/device you use and will persist only on that browser unless cleared.

## Usage

- Use the sidebar to navigate between Dashboard, Class, Students, Notice, Public Notice, Report, and Search sections.
- Fill out the form in each section to add a new entry. Click **Edit** on any list/table item to update it, or **Delete** to remove it.
- Use the search bar within each section to filter results, or use the **Search** tab for a global search across all data.

## Future Improvements

- Add user authentication
- Migrate from `localStorage` to a backend database (e.g., Firebase, MongoDB)
- Export reports as PDF/Excel
- Add pagination for large student lists

## License

This project is open source and available under the [MIT License](LICENSE).
