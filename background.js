chrome.tabs.onUpdated.addListener(async (tabId, changeInfo, tab) => {
  const appKeys = (await chrome.storage.local.get("appKeys"))["appKeys"];

  if (!appKeys) return;

  const lists = await Promise.all(
    appKeys.map(async (key) => {
      const list = (await chrome.storage.local.get(key))[key];
      console.log(list);
      return list;
    })
  );

  if (!lists || lists.length === 0) return;

  const flattenList = lists.filter((v) => v).flat();

  if (!flattenList || flattenList.length === 0) return;

  // ロードの完了を待つ
  if (changeInfo.status === "complete") {
    const isTargetSite = flattenList.some(
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
