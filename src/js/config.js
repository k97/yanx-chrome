export const date = new Date();
export const storeKey = "yanxdrafts";
export const noteDateRef = "yanx-note-";

export const quoteObjKey = "yanxquote";
export const cachedQKey = "yanxcachedquote"

const notesTweeters = [
  "Start scratching",
  "Make a dent",
  "Fill me with words",
  "Don't forget that",
];
const placeholderText = notesTweeters[date.getDay() % notesTweeters.length];
export const noteConfig = {
  toolbar: {
    buttons: ['bold', 'underline', 'strikethrough', 'anchor', 'orderedlist', 'pre', 'outdent', 'indent', 'h3'],
  },
  placeholder: {
    text: placeholderText,
  },
  targetCheckbox: true,
  buttonLabels: 'fontawesome',
  paste: {
    cleanPastedHTML: true,
    forcePlainText: false,
    cleanTags: ['meta'],
    cleanAttrs: ['class', 'style', 'dir'],
  }
};

export const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const adjectives = [
  "an awesome",
  "an incredible",
  "a thoughtful",
  "a dashing",
  "an amazing"
];

export const today = date.getDate() + ' ' + months[date.getMonth()];
export const message = adjectives[date.getDay() % adjectives.length];

export const SetContent = (eleID, content) => {
  document.getElementById(eleID).innerHTML = content;
}
