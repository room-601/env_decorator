chrome.tabs.onUpdated.addListener(async (_, changeInfo, tab) => {
  const applicationIds = (await chrome.storage.local.get("applicationIds"))
    .applicationIds;

  // 何も登録されていない場合
  if (!applicationIds) {
    return;
  }

  const lists = await Promise.all(
    applicationIds.map(async (id) => {
      return (await chrome.storage.local.get(id))[id];
    })
  );

  if (!lists || lists.length === 0) {
    return;
  }

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
