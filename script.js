// global storage
let classes = JSON.parse(localStorage.getItem("classes")) || [];
let students = JSON.parse(localStorage.getItem("students")) || []; // Key matched to save value
let notices = JSON.parse(localStorage.getItem("notices")) || [];
let publicNotices = JSON.parse(localStorage.getItem("publicNotices")) || [];

// Navigation handlers
const sections = {
    Dashboard: "dashboard-section",
    Class: "class-section",
    Students: "student-section",
    Notice: "notice-section",
    "Public Notice" : "public-section",
    Report: "report-section",
    Search: "search-section",
};

// Sidebar click events - (Case matched to class name ".Sidebar")
document.querySelectorAll(".Sidebar ul li").forEach((item) => {
    item.addEventListener('click', () => {
        document.querySelector(".Sidebar ul li.active")?.classList.remove("active");
        item.classList.add("active");

        const sectionName = item.textContent.trim();
        showSection(sectionName);
    });
});

// Show and hide section
function showSection(name) {
    document.getElementById("section-title").textContent = name;

    Object.values(sections).forEach((id) => {
        document.getElementById(id).classList.add("hidden");
    });

    const targetId = sections[name];
    if (targetId) {
        document.getElementById(targetId).classList.remove("hidden");
    }

    if (name === "Report") updateReport();
    if (name === "Dashboard") updateDashboard();
    if (name === "Search") globalSearch();
}

// initialization
document.addEventListener("DOMContentLoaded", () => {
    renderAll();
    updateDashboard();
    showSection("Dashboard");
});

// helpers
function saveToStorage(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
}

// Master function to fulfill renderAll call standard safely
function renderAll() {
    renderClassList();
    renderStudentList();
    renderNoticeList();
    renderPublicList();
}

// Functional updates for your tab counters
function updateDashboard() {
    const tc = document.getElementById("total-class");
    const ts = document.getElementById("total-student");
    const tn = document.getElementById("total-notice");
    const tp = document.getElementById("total-public");

    if (tc) tc.textContent = classes.length;
    if (ts) ts.textContent = students.length;
    if (tn) tn.textContent = notices.length;
    if (tp) tp.textContent = publicNotices.length;

    updateChart();
}

function updateReport() {
    const rc = document.getElementById("report-class");
    const rs = document.getElementById("report-student");
    const rn = document.getElementById("report-notice");
    const rp = document.getElementById("report-public");

    if (rc) rc.textContent = classes.length;
    if (rs) rs.textContent = students.length;
    if (rn) rn.textContent = notices.length;
    if (rp) rp.textContent = publicNotices.length;
}

// Functional update for manual view call
function globalSearch() {
    const event = new Event('input');
    document.getElementById("global-search")?.dispatchEvent(event);
}

// Class Section
function renderClassList(filtered = classes) {
    const list = document.getElementById("class-list");
    if (!list) return;
    list.innerHTML = "";
    filtered.forEach((cls, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <span>${cls}</span>
        <div>
            <button class="edit" onclick="editClass(${i})">Edit</button>
            <button class="delete" onclick="deleteClass(${i})">Delete</button>
        </div>
        `;
        list.appendChild(li);
    });
}

document.getElementById("class-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("class-name").value.trim();
    const index = document.getElementById("class-index").value;

    if (index === "") {
        classes.push(name);
    } else {
        classes[index] = name;
    }

    saveToStorage("classes", classes);
    document.getElementById("class-form").reset();
    document.getElementById("class-index").value = "";
    renderClassList();
    updateDashboard();
});

function editClass(i) {
    document.getElementById("class-name").value = classes[i];
    document.getElementById("class-index").value = i;
}

function deleteClass(i) {
    classes.splice(i, 1);
    saveToStorage("classes", classes);
    renderClassList();
    updateDashboard();
}

document.getElementById("class-search")?.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    renderClassList(classes.filter(cls => cls.toLowerCase().includes(keyword)));
});


// ********** STUDENT SECTION **********
function renderStudentList(filtered = students) {
    const list = document.querySelector("#student-list tbody");
    if (!list) return;
    list.innerHTML = "";
    filtered.forEach((s, i) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${s.name}</td>
            <td>${s.father}</td>
            <td>${s.gender}</td>
            <td>${s.className}</td>
            <td>${s.grade}</td>
            <td>${s.roll}</td>
            <td>${s.sectionField || ''}</td>
            <td>
                <button class="edit" onclick="editStudent(${i})">Edit</button>
                <button class="delete" onclick="deleteStudent(${i})">Delete</button>
            </td>
        `;
        list.appendChild(row);
    });
}

document.getElementById("student-form")?.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = document.getElementById("student-name").value.trim();
    const father = document.getElementById("student-father").value.trim();
    const gender = document.getElementById("student-gender").value;
    const className = document.getElementById("student-class").value.trim();
    const grade = document.getElementById("student-grade").value.trim();
    const roll = document.getElementById("student-roll").value.trim();
    const sectionField = document.getElementById("student-section-field").value.trim();
    const index = document.getElementById("student-index").value;

    const newStudent = { name, father, gender, className, grade, roll, sectionField };

    if (index === "") {
        students.push(newStudent);
    } else {
        students[index] = newStudent;
    }

    saveToStorage("students", students);
    document.getElementById("student-form").reset();
    document.getElementById("student-index").value = "";
    renderStudentList();
    updateDashboard();
});

function editStudent(i) {
    const s = students[i];
    document.getElementById("student-name").value = s.name;
    document.getElementById("student-father").value = s.father;
    document.getElementById("student-gender").value = s.gender;
    document.getElementById("student-class").value = s.className;
    document.getElementById("student-grade").value = s.grade;
    document.getElementById("student-roll").value = s.roll;
    document.getElementById("student-section-field").value = s.sectionField || '';
    document.getElementById("student-index").value = i;
}

function deleteStudent(i) {
    students.splice(i, 1);
    saveToStorage("students", students);
    renderStudentList();
    updateDashboard();
}

document.getElementById("student-search")?.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    renderStudentList(
        students.filter(
            (s) =>
                s.name.toLowerCase().includes(keyword) ||
                s.father.toLowerCase().includes(keyword) ||
                s.className.toLowerCase().includes(keyword) ||
                (s.sectionField && s.sectionField.toLowerCase().includes(keyword)) ||
                s.roll.toLowerCase().includes(keyword)
        )
    );
});


// ********** NOTICE SECTION **********
function renderNoticeList(filtered = notices) {
  const list = document.getElementById("notice-list");
  if (!list) return;
  list.innerHTML = "";
  filtered.forEach((n, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <span>${n}</span>
      <div>
        <button class="edit" onclick="editNotice(${i})">Edit</button>
        <button class="delete" onclick="deleteNotice(${i})">Delete</button>
      </div>
    `;
    list.appendChild(li);
  });
}

document.getElementById("notice-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = document.getElementById("notice-text").value.trim();
    const index = document.getElementById("notice-index").value;

    if (index === "") {
        notices.push(text);
    } else {
        notices[index] = text;
    }

    saveToStorage("notices", notices);
    document.getElementById("notice-form").reset();
    document.getElementById("notice-index").value = "";
    renderNoticeList();
    updateDashboard();
});

function editNotice(i) {
    document.getElementById("notice-text").value = notices[i];
    document.getElementById("notice-index").value = i;
}

function deleteNotice(i) {
    notices.splice(i, 1);
    saveToStorage("notices", notices);
    renderNoticeList();
    updateDashboard();
}

document.getElementById("notice-search")?.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    renderNoticeList(notices.filter(n => n.toLowerCase().includes(keyword)));
});


// ========= PUBLIC NOTICE SECTION =========
function renderPublicList(filtered = publicNotices) {
    const list = document.getElementById("public-list");
    if (!list) return;
    list.innerHTML = "";
    filtered.forEach((n, i) => {
        const li = document.createElement("li");
        li.innerHTML = `
        <span>${n}</span>
        <div>
            <button class="edit" onclick="editPublic(${i})">Edit</button>
            <button class="delete" onclick="deletePublic(${i})">Delete</button>
        </div>
        `;
        list.appendChild(li);
    });
}

document.getElementById("public-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = document.getElementById("public-text").value.trim();
    const index = document.getElementById("public-index").value;
    if (index === "") {
        publicNotices.push(text);
    } else {
        publicNotices[index] = text;
    }
    saveToStorage("publicNotices", publicNotices);
    document.getElementById("public-form").reset();
    document.getElementById("public-index").value = "";
    renderPublicList();
    updateDashboard();
});

function editPublic(i) {
    document.getElementById("public-text").value = publicNotices[i];
    document.getElementById("public-index").value = i;
}

function deletePublic(i) {
    publicNotices.splice(i, 1);
    saveToStorage("publicNotices", publicNotices);
    renderPublicList();
    updateDashboard();
}

document.getElementById("public-search")?.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    renderPublicList(publicNotices.filter(n => n.toLowerCase().includes(keyword)));
});

// ========= GLOBAL SEARCH =========
document.getElementById("global-search")?.addEventListener("input", (e) => {
    const keyword = e.target.value.toLowerCase();
    const results = [];
    classes.forEach((cls) => {
        if (cls.toLowerCase().includes(keyword)) {
            results.push(`📘 Class: ${cls}`);
        }
    });
    students.forEach((s) => {
        if (s.name.toLowerCase().includes(keyword) ||
            s.grade.toLowerCase().includes(keyword) ||
            (s.sectionField && s.sectionField.toLowerCase().includes(keyword))) {
            results.push(`🎓 Student: ${s.name} (Grade: ${s.grade})`);
        }
    });
    notices.forEach((n) => {
        if (n.toLowerCase().includes(keyword)) {
            results.push(`📢 Class Notice: ${n}`);
        }
    });
    publicNotices.forEach((n) => {
        if (n.toLowerCase().includes(keyword)) {
            results.push(`🔵 Public Notice: ${n}`);
        }
    });
    const list = document.getElementById("global-results");
    if (!list) return;
    list.innerHTML = "";
    results.forEach((r) => {
        const li = document.createElement("li");
        li.textContent = r;
        list.appendChild(li);
    });
});

// ========== CHART.JS ==========
let chart;

function updateChart() {
    // 1. Double check if the canvas exists in HTML right now
    const canvas = document.getElementById("dashboard-chart");
    if (!canvas) return;
    
    // 2. Safety check: If the internet or CDN is slow, wait 100ms and try again
    if (typeof Chart === 'undefined') {
        setTimeout(updateChart, 100);
        return;
    }

    const ctx = canvas.getContext("2d");

    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Class", "Students", "Notices", "Public"],
            datasets: [{
                label: "Total Count",
                data: [classes.length, students.length, notices.length, publicNotices.length],
                backgroundColor: ["#1e90ff", "#ffa500", "#28a745", "#dc3545"],
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false, /* Lets the chart fill the CSS container height nicely */
            plugins: {
                legend: {
                    display: false
                },
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 1
                    }
                },
            },
        },
    });
}


// Global exposure allocation for safe inline execution triggers
window.editClass = editClass;
window.deleteClass = deleteClass;
window.editStudent = editStudent;
window.deleteStudent = deleteStudent;
window.editNotice = editNotice;
window.deleteNotice = deleteNotice;
window.editPublic = editPublic;
window.deletePublic = deletePublic;
