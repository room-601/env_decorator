const button = document.getElementById("addButton");

button.addEventListener("click", async (e) => {
  e.preventDefault();

  const appKey = document.getElementById("appKey").value;
  const config = document.getElementById("config").value;

  // for dev
  // chrome.storage.local.remove("appKeys");
  // chrome.storage.local.remove("sample");

  // TODO
  if (!appKey || !config) {
    return;
  }

  const storedAppConfig = (await chrome.storage.local.get(appKey))[appKey];

  if (!storedAppConfig) {
    const keys = await chrome.storage.local.get("appKeys")["appKeys"];
    const _keys = !keys ? [appKey] : [...keys, appKey];
    chrome.storage.local.set({ appKeys: _keys });
  }

  chrome.storage.local.set({ [appKey]: JSON.parse(config) });
});
