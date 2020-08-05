import { date, storeKey, noteDateRef } from './config';

var globalStore;

export const getNotebook = (store, dateRef) => {
  let note;

  //If store is passed from storage
  if (store) {
    store = clearOldNotes(store);
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

export const initNotebook = (datekey, editorRef) => {
  if (!chrome.storage) {
    let result = localStorage.getItem(storeKey);
    let storeBlob = JSON.parse(result);
    let data = getNotebook(storeBlob, datekey);
    editorRef.setContent(data, 0);
    return
  }

  chrome.storage.sync.get([datekey], function (result) {
    let data = getNotebook(result, datekey);
    editorRef.setContent(data, 0);
  });
}

export const clearOldNotes = (store) => {
  let updatedStore = {};

  let activeDateKeys = [...Array(7)].map((val, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    return noteDateRef + d.toDateString().split(' ').join('-');
  });

  const keys = Object.keys(store);
  for (let key of keys) {
    for (let i = 0; i < activeDateKeys.length; i++) {
      if (key === activeDateKeys[i]) {
        Object.assign(updatedStore, {
          [key]: store[key]
        });
      }
    }
  }
  return updatedStore;
}
