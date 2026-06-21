let loadTimeout;
const SELECTED_APP_KEY = "fg_selected_app_id";

function isSafeAppUrl(url) {
  return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9_-]{40,200}\/exec$/.test(url);
}

function getAppById(id) {
  return apps.find((a) => a.id === id) || null;
}

function saveSelectedAppId(id) {
  localStorage.setItem(SELECTED_APP_KEY, id);
}

function getSavedSelectedApp() {
  const savedId = localStorage.getItem(SELECTED_APP_KEY);
  if (!savedId) return null;
  return getAppById(savedId);
}

function updateActiveButtonUI(activeId) {
  document.querySelectorAll("[data-app-id]").forEach((button) => {
    const isActive = button.dataset.appId === activeId;
    button.classList.toggle("bg-indigo-500", isActive);
    button.classList.toggle("text-white", isActive);
    button.classList.toggle("bg-slate-800", !isActive);
    button.classList.toggle("text-slate-100", !isActive);
  });
}

function loadAppToFrame(app) {
  if (!app) {
    setStatus("No app selected.", "error");
    return;
  }

  if (!isSafeAppUrl(app.url)) {
    console.warn(`Invalid or unsafe Apps Script URL for ${app.id}`);
    setStatus(`Cannot load ${app.name}: invalid URL configuration.`, "error");
    return;
  }

  clearTimeout(loadTimeout);
  setStatus(`Loading ${app.name}...`);
  appFrame.src = app.url;

  loadTimeout = setTimeout(() => {
    setStatus(`Still waiting for ${app.name}. Check deployment access and URL.`, "error");
  }, LOAD_TIMEOUT_MS);
}

function selectApp(app, options = { goToSelectPage: true }) {
  saveSelectedAppId(app.id);
  updateActiveButtonUI(app.id);
  loadAppToFrame(app);

  if (options.goToSelectPage) {
    showPage("select");
  }
}

function createAppButton(app) {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.appId = app.id;
  button.className =
    "w-full rounded-lg bg-slate-800 px-3 py-2 text-left text-sm font-medium text-slate-100 transition hover:bg-indigo-400 hover:text-white";
  button.textContent = app.name;
  button.addEventListener("click", () => selectApp(app, { goToSelectPage: true }));
  return button;
}

function renderApps() {
  appList.innerHTML = "";
  apps.forEach((app) => appList.appendChild(createAppButton(app)));
}

function initSelectedApp() {
  const saved = getSavedSelectedApp();
  if (saved) {
    updateActiveButtonUI(saved.id);
    loadAppToFrame(saved);
    return;
  }

  // no saved selection yet
  if (apps.length > 0) {
    updateActiveButtonUI(null);
    setStatus("Go to List and select a game.");
  } else {
    setStatus("No apps configured.", "error");
  }
}

appFrame.addEventListener("load", () => {
  clearTimeout(loadTimeout);
  setStatus("App loaded.");
});

renderApps();
initSelectedApp();