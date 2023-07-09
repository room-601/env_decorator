chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  chrome.storage.local.clear();

  chrome.storage.local.set({
    domainList: {
      list: [
        {
          url: "https://qiita.com/opportunities",
          color: "red",
          title: "本番",
        },
      ],
    },
  });

  // ロードの完了を待つ
  if (changeInfo.status === "complete") {
    const list = (await chrome.storage.local.get("domainList"))["domainList"];

    const targetLists = list["list"];

    // storageに対象のリストがない場合
    if (!targetLists) return;

    const isTargetSite = targetLists.some(
      ({ url }) => tab.url.indexOf(url) > -1
    );

    // 対象サイトでない場合は何もしない
    if (!isTargetSite) return;

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ["main.js"],
    });
  }
});
