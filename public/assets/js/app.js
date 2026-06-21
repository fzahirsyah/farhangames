const apps = [
  {
    id: "app-1",
    name: "Sample App 1",
    url: "https://script.google.com/macros/s/REPLACE_WITH_APP_1/exec",
  },
  {
    id: "app-2",
    name: "Sample App 2",
    url: "https://script.google.com/macros/s/REPLACE_WITH_APP_2/exec",
  },
];

const appList = document.getElementById("app-list");
const appFrame = document.getElementById("app-frame");

function isSafeAppUrl(url) {
  return /^https:\/\/script\.google\.com\/macros\/s\/.+\/exec$/.test(url);
}

function setActiveApp(app) {
  if (!isSafeAppUrl(app.url)) {
    return;
  }

  appFrame.src = app.url;

  document.querySelectorAll("[data-app-id]").forEach((button) => {
    button.classList.toggle("bg-indigo-500", button.dataset.appId === app.id);
    button.classList.toggle("text-white", button.dataset.appId === app.id);
    button.classList.toggle("bg-slate-800", button.dataset.appId !== app.id);
    button.classList.toggle("text-slate-100", button.dataset.appId !== app.id);
  });
}

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
