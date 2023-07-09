const addBar = () => {
  const body = document.getElementsByTagName("body");
  const ele = document.createElement("div");
  ele.innerHTML = "sampleです";
  ele.style.cssText = "width: 100%; height: 40px; position: sticky;";
  body.item(0).prepend(ele);
};
addBar();
