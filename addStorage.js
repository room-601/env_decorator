const addButton = document.getElementById("addButton");
const deleteButton = document.getElementById("deleteButton");

/**
 * configを登録する
 */
const saveConfigs = async (e) => {
  e.preventDefault();

  const applicationId = document.getElementById("applicationId").value;
  const url = document.getElementById("url").value;
  const color = document.getElementById("color").value;
  const title = document.getElementById("title").value;

  if (!applicationId) {
    window.alert("アプリケーションIDが入っていません");
  }

  if (!url) {
    window.alert("URLが入っていません");
  }

  if (!color) {
    window.alert("カラーが入っていません");
  }

  if (!title) {
    window.alert("タイトルが入っていません");
  }

  const applicationIds = (await chrome.storage.local.get("applicationIds"))
    .applicationIds;

  const isIdExist = applicationIds
    ? applicationIds.some((id) => id === applicationId)
    : false;

  if (isIdExist) {
    const storedConfig = (await chrome.storage.local.get(applicationId))[
      applicationId
    ];

    const isUrlExist = storedConfig.some((config) => config.url === url);

    if (isUrlExist) {
      window.alert("指定したURLはすでに登録されています");
      return;
    }

    await chrome.storage.local.set({
      [applicationId]: [...storedConfig, { url, title, color }],
    });
  } else {
    await chrome.storage.local.set({
      [applicationId]: [{ url, title, color }],
    });

    await chrome.storage.local.set({
      applicationIds: applicationIds
        ? [...applicationIds, applicationId]
        : [applicationId],
    });
  }

  window.alert(
    isIdExist
      ? `更新しました:${applicationId}`
      : `新規で登録しました:${applicationId}`
  );
};

/**
 * configsを削除する
 */
const deleteConfigs = async (e) => {
  e.preventDefault();

  const deleteAppId = document.getElementById("applicationId").value;

  const applicationIds = (await chrome.storage.local.get("applicationIds"))
    .applicationIds;

  const isApplicationIdExist = applicationIds?.some((id) => id === deleteAppId);

  if (!isApplicationIdExist) {
    window.alert("指定したアプリケーションIDが存在しません");
  }

  await chrome.storage.local.remove(deleteAppId);

  if (applicationIds) {
    await chrome.storage.local.set({
      applicationIds: applicationIds.filter((id) => id !== deleteAppId),
    });
  }

  window.alert("削除しました");
};

addButton.addEventListener("click", saveConfigs);
deleteButton.addEventListener("click", deleteConfigs);
