// =====================
// Job Data (5 roles, sample entries)
// =====================
const jobs = [
  // Frontend
  { title: "Frontend Developer", company: "TechCorp", location: "Bangalore", role: "Frontend", experience: "Fresher" },
  { title: "UI Engineer", company: "PixelWorks", location: "Hyderabad", role: "Frontend", experience: "3+ years" },
  { title: "React Developer", company: "CodeNest", location: "Chennai", role: "Frontend", experience: "Fresher" },
  { title: "Angular Developer", company: "BrightSoft", location: "Pune", role: "Frontend", experience: "3+ years" },
  { title: "Vue.js Developer", company: "DesignHub", location: "Delhi", role: "Frontend", experience: "Fresher" },

  // Backend
  { title: "Backend Engineer", company: "CodeWorks", location: "Hyderabad", role: "Backend", experience: "Fresher" },
  { title: "Java Backend Developer", company: "ServerSide", location: "Chennai", role: "Backend", experience: "3+ years" },
  { title: "Python Backend Engineer", company: "DataFlow", location: "Delhi", role: "Backend", experience: "Fresher" },
  { title: "Node.js Backend Developer", company: "Cloudify", location: "Mumbai", role: "Backend", experience: "3+ years" },
  { title: "API Developer", company: "Connectify", location: "Pune", role: "Backend", experience: "Fresher" },

  // Full Stack
  { title: "Full Stack Developer", company: "Stackify", location: "Chennai", role: "Full Stack", experience: "Fresher" },
  { title: "Senior Full Stack Engineer", company: "Buildify", location: "Delhi", role: "Full Stack", experience: "3+ years" },
  { title: "MERN Developer", company: "DevNest", location: "Pune", role: "Full Stack", experience: "Fresher" },
  { title: "MEAN Developer", company: "AppStack", location: "Hyderabad", role: "Full Stack", experience: "3+ years" },
  { title: "Web Application Dev", company: "Appify", location: "Mumbai", role: "Full Stack", experience: "Fresher" },

  // Data Science
  { title: "Data Analyst", company: "InsightLabs", location: "Mumbai", role: "Data Science", experience: "Fresher" },
  { title: "Machine Learning Engineer", company: "AIWorks", location: "Bangalore", role: "Data Science", experience: "3+ years" },
  { title: "Junior Data Scientist", company: "DataVision", location: "Hyderabad", role: "Data Science", experience: "Fresher" },
  { title: "AI Researcher", company: "DeepMind India", location: "Delhi", role: "Data Science", experience: "3+ years" },
  { title: "Business Intelligence Analyst", company: "BizTech", location: "Chennai", role: "Data Science", experience: "Fresher" },

  // DevOps
  { title: "DevOps Engineer", company: "CloudOps", location: "Bangalore", role: "DevOps", experience: "Fresher" },
  { title: "Senior DevOps Specialist", company: "InfraCloud", location: "Hyderabad", role: "DevOps", experience: "3+ years" },
  { title: "Automation Engineer", company: "AutoSys", location: "Delhi", role: "DevOps", experience: "Fresher" },
  { title: "CI/CD Engineer", company: "PipelinePro", location: "Mumbai", role: "DevOps", experience: "3+ years" },
  { title: "Cloud Infrastructure Engineer", company: "CloudMasters", location: "Chennai", role: "DevOps", experience: "Fresher" }
];

// =====================
// LOGIN
// =====================
const authForm = document.getElementById("authForm");
if (authForm) {
  authForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value;
    localStorage.setItem("user", username);
    showToast(`Welcome ${username}!`);
    setTimeout(() => window.location.href = "index.html", 1000);
  });
}

// =====================
// LOGOUT
// =====================
function logout() {
  localStorage.clear();
  showToast("Logged out successfully!");
  setTimeout(() => window.location.href = "login.html", 1000);
}

// =====================
// Render Jobs
// =====================
const jobList = document.getElementById("jobList");
function renderJobs(filteredJobs = jobs) {
  if (!jobList) return;
  jobList.innerHTML = "";
  filteredJobs.forEach(job => {
    const jobCard = document.createElement("div");
    jobCard.className = "job-card";
    jobCard.innerHTML = `
      <h3>${job.title}</h3>
      <p>${job.company} - ${job.location}</p>
      <p>Role: ${job.role} | Experience: ${job.experience}</p>
      <button onclick="bookmarkJob('${job.title}')">🔖 Save</button>
      <button onclick="openApplyForm('${job.title}')">📄 Apply</button>
    `;
    jobList.appendChild(jobCard);
  });
}
if (jobList) renderJobs();

// =====================
// Search & Filter
// =====================
function filterJobs() {
  const search = document.getElementById("searchInput")?.value.toLowerCase() || "";
  const role = document.getElementById("filterRole")?.value || "";
  const experience = document.getElementById("filterExperience")?.value || "";

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(search) &&
    (role === "" || job.role === role) &&
    (experience === "" || job.experience === experience)
  );

  renderJobs(filtered);
}
document.getElementById("searchInput")?.addEventListener("input", filterJobs);
document.getElementById("filterRole")?.addEventListener("change", filterJobs);
document.getElementById("filterExperience")?.addEventListener("change", filterJobs);

// =====================
// Bookmark Jobs
// =====================
function bookmarkJob(title) {
  let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
  if (!savedJobs.includes(title)) {
    savedJobs.push(title);
    localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
    showToast(`Job "${title}" saved! ✅`);
  } else {
    showToast(`Job "${title}" already saved ⚠️`);
  }
}

// =====================
// Application Form Popup
// =====================
function openApplyForm(title) {
  const popup = document.getElementById("applyPopup");
  if (popup) {
    popup.classList.remove("hidden");
    document.getElementById("applyJobTitle").textContent = title;
  }
}

function closeApplyForm() {
  document.getElementById("applyPopup").classList.add("hidden");
}

const applyForm = document.getElementById("applyForm");
if (applyForm) {
  applyForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const jobTitle = document.getElementById("applyJobTitle").textContent;
    let applications = JSON.parse(localStorage.getItem("applications")) || [];
    applications.push({ job: jobTitle, date: new Date().toLocaleString() });
    localStorage.setItem("applications", JSON.stringify(applications));
    showToast(`Applied to "${jobTitle}" successfully! 🎉`);
    closeApplyForm();
  });
}

// =====================
// Career Journey Page
// =====================
const savedJobsList = document.getElementById("savedJobsList");
if (savedJobsList) {
  const savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
  savedJobsList.innerHTML = savedJobs.length ? "" : "No saved jobs yet.";
  savedJobs.forEach(job => {
    const jobItem = document.createElement("div");
    jobItem.className = "job-card";
    jobItem.innerHTML = `
      <h3>${job}</h3>
      <button onclick="removeSavedJob('${job}')">❌ Remove</button>
    `;
    savedJobsList.appendChild(jobItem);
  });
}
function removeSavedJob(title) {
  let savedJobs = JSON.parse(localStorage.getItem("savedJobs")) || [];
  savedJobs = savedJobs.filter(job => job !== title);
  localStorage.setItem("savedJobs", JSON.stringify(savedJobs));
  showToast(`Removed "${title}" from saved jobs.`);
  location.reload();
}

const recentJobs = document.getElementById("recentJobs");
if (recentJobs) {
  const applications = JSON.parse(localStorage.getItem("applications")) || [];
  recentJobs.innerHTML = applications.length ? "" : "No recent applications yet.";
  applications.forEach(app => {
    const appItem = document.createElement("div");
    appItem.className = "job-card";
    appItem.innerHTML = `
      <h3>${app.job}</h3>
      <p>Applied on: ${app.date}</p>
    `;
    recentJobs.appendChild(appItem);
  });
}

// =====================
// Toast Notifications
// =====================
function showToast(message) {
  const toast = document.getElementById("toast");
  if (toast) {
    toast.textContent = message;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 3000);
  }
}