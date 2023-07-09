const addBar = async () => {
  const currentUrl = window.location.href;

  const list = (await chrome.storage.local.get("domainList"))["domainList"];

  const targetLists = list["list"];

  // 対象サイトがない場合
  if (!targetLists) return;

  const currentEnv = targetLists.find(({ url }) => currentUrl.startsWith(url));

  // 対象の環境がない場合
  if (!currentEnv) return;

  const text = currentEnv.title || "sampleです";
  const color = currentEnv.color || "white";

  const body = document.getElementsByTagName("body");
  const ele = document.createElement("div");
  ele.innerHTML = text;
  ele.style.cssText = `width: 100%; height: 40px; position: sticky; background-color: ${color}`;
  body.item(0).prepend(ele);
};

addBar();
