chrome.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
  const urlList = (await chrome.storage.local.get("urlList")).urlList;

  // urlなし;
  if (!urlList) {
    return;
  }

  const lists = await Promise.all(
    urlList.map(async (url) => {
      const data = (await chrome.storage.local.get(url))[url];

      if (!data) {
        return;
      }

      return { url, ...data };
    })
  );

  const flattenList = lists.filter((v) => !!v).flat();

  if (!flattenList || flattenList.length === 0) {
    return;
  }

  // ロードの完了していない場合は何もしない
  if (changeInfo.status !== "complete") {
    return;
  }

  const isTargetSite = flattenList.some(({ url }) => tab.url.includes(url));

  // 対象サイトでない場合は何もしない
  if (!isTargetSite) {
    return;
  }

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["main.js"],
  });
});
