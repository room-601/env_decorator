const addButton = document.getElementById("addButton");
const deleteButton = document.getElementById("deleteButton");

/**
 * configを登録する
 */
const saveConfigs = async (e) => {
  e.preventDefault();

  const url = document.getElementById("url").value;
  const color = document.getElementById("color").value;
  const title = document.getElementById("title").value;

  if (!url) {
    window.alert("URLが入っていません");
  }

  if (!color) {
    window.alert("カラーが入っていません");
  }

  if (!title) {
    window.alert("タイトルが入っていません");
  }

  const urlList = (await chrome.storage.local.get("urlList")).urlList;

  const isUrlExist = urlList ? urlList.some((_url) => _url === url) : false;

  await chrome.storage.local.set({ [url]: { title, color } });
  await chrome.storage.local.set({
    urlList: urlList ? [...urlList, url] : [url],
  });

  window.confirm(
    `${isUrlExist ? "更新しました" : "新規で登録しました"}:${url}`
  );

  window.location.reload();
};

/**
 * configsを削除する
 */
const deleteConfigs = async (e) => {
  e.preventDefault();

  const deleteUrl = document.getElementById("url").value;

  const urlList = (await chrome.storage.local.get("urlList")).urlList;

  const isUrlExist = urlList?.some((_url) => _url === deleteUrl);

  if (!isUrlExist) {
    window.alert("指定したURLは存在しません");
  }

  await chrome.storage.local.remove(deleteUrl);

  if (urlList) {
    await chrome.storage.local.set({
      applicationIds: urlList.filter((_url) => _url !== deleteUrl),
    });
  }

  window.confirm("削除しました");

  window.location.reload();
};

const appendUrlList = async () => {
  const appendTargetElement = document.getElementById("lists");

  const urlList = (await chrome.storage.local.get("urlList")).urlList;

  if (!urlList) {
    return;
  }

  urlList.forEach((url) => {
    const li = document.createElement("li");
    li.textContent = url;
    appendTargetElement.appendChild(li);
  });
};

addButton.addEventListener("click", saveConfigs);
deleteButton.addEventListener("click", deleteConfigs);
window.onload = appendUrlList();
