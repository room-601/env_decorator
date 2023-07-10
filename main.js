const addBar = async () => {
  const currentUrl = window.location.href;

  const appKeys = (await chrome.storage.local.get("appKeys"))["appKeys"];

  // 指定キーなし
  if (!appKeys) return;

  const lists = await Promise.all(
    appKeys.map(async (key) => {
      const list = (await chrome.storage.local.get(key))[key];
      console.log(list);
      return list;
    })
  );

  const flattenList = lists.flat();

  // リストなし
  if (!flattenList) return;

  const currentEnv = flattenList.find(({ url }) => currentUrl.startsWith(url));

  // 対象の環境がない場合
  if (!currentEnv) return;

  const text = currentEnv.title || "sampleです";
  const color = currentEnv.color || "white";

  const body = document.getElementsByTagName("body");
  const ele = document.createElement("div");
  ele.innerHTML = text;
  ele.style.cssText = `width: 100%; height: 30px; top: 0; left: 0; z-index: 1000000; opacity: 0.8; display: flex; align-items: center; justify-content: center; font-weight: bold; position: fixed; background-color: ${color};`;
  body.item(0).prepend(ele);
};

addBar();
