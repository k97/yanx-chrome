import { date, storeKey, noteDateRef } from './config';

var globalStore;

export const initNotebook = (store, dateRef) => {
  let note;
  if (store) {
    globalStore = store;
    note = store[dateRef]
  } else {
    note = globalStore[dateRef]
  }
  note = (note && note.length) ? JSON.parse(note) : null;
  return note;
}

export const updateNotebook = (data) => {
  let dateRef = noteDateRef + date.toDateString().split(' ').join('-');
  let obj = globalStore ? globalStore : {};
  obj[dateRef] = data;
  if (!chrome.storage) {
    localStorage.setItem(storeKey, JSON.stringify(obj));
    return
  }
  chrome.storage.sync.set(obj);
}

export const readNotebook = (datekey, editorRef) => {
  if (!chrome.storage) {
    let result = localStorage.getItem(storeKey);
    let storeBlob = JSON.parse(result);
    let data = initNotebook(storeBlob, datekey);
    editorRef.setContent(data, 0);
    return
  }

  chrome.storage.sync.get([datekey], function (result) {
    let data = initNotebook(result, datekey);
    editorRef.setContent(data, 0);
  });
}


