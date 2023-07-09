const sampleFunction = () => {
  window.alert("sample");
};

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  console.log(tabId);
  console.log(changeInfo);
  console.log(tab);
  if (changeInfo.status === "complete") {
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["main.js"],
    });
  }
});
