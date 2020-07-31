export const storeKey = "yanxdrafts";

export const updateNotebook = (key, data) => {
  let obj = {}
  obj[storeKey] = data;

  if(!chrome.storage) {
    localStorage.setItem(key, JSON.stringify(obj));
    return
  }
  chrome.storage.sync.set(obj);
}

export const readNotebook = (key, notebook) => {
  if (!chrome.storage) {
    let result = localStorage.getItem(key);
    let obj = (result && result.length) ? JSON.parse(result) : '';
    let data = (obj) ? JSON.parse(obj[key]) : '';
    notebook.setContent(data, 0);
    return
  }
  chrome.storage.sync.get([key], function(result) {
    let data = JSON.parse(result[key]);
    notebook.setContent(data, 0)
  });
}
