const apps = [
  {
    id: "app-1",
    name: "Sample App 1",
    url: "https://script.google.com/macros/s/YOUR-APPSCRIPT-DEPLOYMENT-ID-ONE/exec",
  },
  {
    id: "app-2",
    name: "Sample App 2",
    url: "https://script.google.com/macros/s/YOUR-APPSCRIPT-DEPLOYMENT-ID-TWO/exec",
  },
];

const appList = document.getElementById("app-list");
const appFrame = document.getElementById("app-frame");
const frameStatus = document.getElementById("frame-status");
let loadTimeout;

function isSafeAppUrl(url) {
  return /^https:\/\/script\.google\.com\/macros\/s\/[A-Za-z0-9-]{20,}\/exec$/.test(url);
}

function setStatus(message, tone = "info") {
  if (!frameStatus) {
    return;
  }

  frameStatus.textContent = message;
  frameStatus.className =
    tone === "error" ? "mt-2 text-sm text-rose-300" : "mt-2 text-sm text-slate-400";
}

function setActiveApp(app) {
  if (!isSafeAppUrl(app.url)) {
    console.warn(`Invalid or unsafe Apps Script URL for ${app.name}`);
    setStatus(`Cannot load ${app.name}: invalid URL configuration.`, "error");
    return;
  }

  clearTimeout(loadTimeout);
  setStatus(`Loading ${app.name}...`);
  appFrame.src = app.url;

  loadTimeout = setTimeout(() => {
    setStatus(`Still waiting for ${app.name}. Check deployment access and URL.`, "error");
  }, 15000);

  document.querySelectorAll("[data-app-id]").forEach((button) => {
    button.classList.toggle("bg-indigo-500", button.dataset.appId === app.id);
    button.classList.toggle("text-white", button.dataset.appId === app.id);
    button.classList.toggle("bg-slate-800", button.dataset.appId !== app.id);
    button.classList.toggle("text-slate-100", button.dataset.appId !== app.id);
  });
}

appFrame.addEventListener("load", () => {
  clearTimeout(loadTimeout);
  setStatus("App loaded.");
});

apps.forEach((app, index) => {
  const button = document.createElement("button");
  button.type = "button";
  button.dataset.appId = app.id;
  button.className =
    "w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition hover:bg-indigo-400 hover:text-white";
  button.textContent = app.name;
  button.addEventListener("click", () => setActiveApp(app));
  appList.appendChild(button);

  if (index === 0) {
    setActiveApp(app);
  }
});
