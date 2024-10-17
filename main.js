const addBar = async () => {
  const currentUrl = window.location.href;

  const applicationIds = (await chrome.storage.local.get("applicationIds"))
    .applicationIds;

  // 指定キーなし
  if (!applicationIds) {
    return;
  }

  const lists = await Promise.all(
    applicationIds.map(async (id) => {
      return (await chrome.storage.local.get(id))[id];
    })
  );

  const flattenList = lists.flat();

  // リストなし
  if (!flattenList) {
    return;
  }

  const currentEnv = flattenList.find(({ url }) => currentUrl.startsWith(url));

  // 対象の環境がない場合
  if (!currentEnv) {
    return;
  }

  const text = currentEnv.title || "sampleです";
  const color = currentEnv.color || "white";

  const body = document.getElementsByTagName("body");
  const ele = document.createElement("div");
  ele.innerHTML = text;
  ele.style.cssText = `width: 100%; height: 30px; top: 0; left: 0; z-index: 1000000; opacity: 0.8; display: flex; align-items: center; justify-content: center; font-weight: bold; position: fixed; background-color: ${color};`;
  body.item(0).prepend(ele);
};

addBar();
