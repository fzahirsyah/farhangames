const appList = document.getElementById("app-list");
const appFrame = document.getElementById("app-frame");
const frameStatus = document.getElementById("frame-status");

const pages = {
  select: document.getElementById("page-select-game"),
  list: document.getElementById("page-game-list"),
  menu: document.getElementById("page-menu"),
};

const navButtons = {
  select: document.getElementById("nav-select-game"),
  list: document.getElementById("nav-game-list"),
  menu: document.getElementById("nav-menu"),
};

function setStatus(message, tone = "info") {
  if (!frameStatus) return;
  frameStatus.textContent = message;
  frameStatus.className =
    tone === "error" ? "mt-2 px-1 text-xs text-rose-300" : "mt-2 px-1 text-xs text-slate-400";
}

function setNavActive(key) {
  Object.entries(navButtons).forEach(([k, btn]) => {
    const active = k === key;
    btn.classList.toggle("nav-btn-active", active);
    btn.classList.toggle("nav-btn-idle", !active);
  });
}

function showPage(key) {
  Object.entries(pages).forEach(([k, el]) => {
    el.classList.toggle("hidden", k !== key);
  });
  setNavActive(key);
}