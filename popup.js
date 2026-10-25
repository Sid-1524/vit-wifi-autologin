const $ = id => document.getElementById(id);
let messageTimer;

const msg = text => {
  clearTimeout(messageTimer);
  $("msg").textContent = text;
  messageTimer = setTimeout(() => { $("msg").textContent = ""; }, 2500);
};

chrome.storage.local.get(
  { username: "", password: "", enabled: true, autoSubmit: false },
  d => {
    $("u").value = d.username;
    $("p").value = d.password;
    $("en").checked = d.enabled;
    $("as").checked = d.autoSubmit;
  }
);

$("credentials").addEventListener("submit", event => {
  event.preventDefault();
  chrome.storage.local.set(
    { username: $("u").value, password: $("p").value, enabled: $("en").checked, autoSubmit: $("as").checked },
    () => msg(chrome.runtime.lastError ? "Could not save settings" : "Settings saved")
  );
});

$("clear").addEventListener("click", () =>
  chrome.storage.local.remove(["username", "password"], () => {
    if (chrome.runtime.lastError) {
      msg("Could not clear credentials");
      return;
    }
    $("u").value = "";
    $("p").value = "";
    msg("Credentials cleared");
  })
);

$("reveal").addEventListener("click", () => {
  const password = $("p");
  const isVisible = password.type === "text";
  password.type = isVisible ? "password" : "text";
  $("reveal").textContent = isVisible ? "Show" : "Hide";
  $("reveal").setAttribute("aria-pressed", String(!isVisible));
});