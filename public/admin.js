const PASSWORD = "tipmaster2025";

function login() {
  const input = document.getElementById("admin-password").value;
  if (input === PASSWORD) {
    localStorage.setItem("adminLoggedIn", "true");
    showDashboard();
  } else {
    document.getElementById("login-error").style.display = "block";
  }
}

function logout() {
  localStorage.removeItem("adminLoggedIn");
  location.reload();
}

function showDashboard() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  loadRounds();
  loadLeaderboard();
}

function loadRounds() {
  fetch("mock/rounds.json")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("round-list");
      list.innerHTML = "";
      data.forEach((round, i) => {
        const li = document.createElement("li");
        li.textContent = `Round ${i + 1}: ${round.user} - ${round.score} pts`;
        const delBtn = document.createElement("button");
        delBtn.textContent = "Delete";
        delBtn.onclick = () => alert("Delete logic goes here");
        li.appendChild(delBtn);
        list.appendChild(li);
      });
    });
}

function loadLeaderboard() {
  fetch("mock/leaderboard.json")
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("leaderboard");
      list.innerHTML = "";
      data.forEach(entry => {
        const li = document.createElement("li");
        li.textContent = `${entry.user}: ${entry.totalScore} pts`;
        list.appendChild(li);
      });
    });
}

if (localStorage.getItem("adminLoggedIn") === "true") {
  showDashboard();
}