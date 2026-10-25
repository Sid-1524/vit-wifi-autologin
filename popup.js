const $ = id => document.getElementById(id);
const msg = t => { $("msg").textContent = t; setTimeout(() => ($("msg").textContent = ""), 1500); };

chrome.storage.local.get(
  { username: "", password: "", enabled: true, autoSubmit: false },
  d => {
    $("u").value = d.username;
    $("p").value = d.password;
    $("en").checked = d.enabled;
    $("as").checked = d.autoSubmit;
  }
);

$("save").onclick = () =>
  chrome.storage.local.set(
    { username: $("u").value, password: $("p").value, enabled: $("en").checked, autoSubmit: $("as").checked },
    () => msg("Saved")
  );

$("clear").onclick = () =>
  chrome.storage.local.remove(["username", "password"], () => {
    $("u").value = ""; $("p").value = ""; msg("Cleared");
  });