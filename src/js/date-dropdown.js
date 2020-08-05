import { months, storeKey, noteDateRef, date, placeholderText, noteConfig } from './config';
import { getNotebook, setNotebook } from './store';

const toggleClass = (elem, className) => {
  if (elem.className.indexOf(className) !== -1) {
    elem.className = elem.className.replace(className, '');
  }
  else {
    elem.className = elem.className.replace(/\s+/g, ' ') + ' ' + className;
  }

  return elem;
}

const toggleDisplay = (elem) => {
  const curDisplayStyle = elem.style.display;

  if (curDisplayStyle === 'none' || curDisplayStyle === '') {
    elem.style.display = 'block';
  }
  else {
    elem.style.display = 'none';
  }

}

export const toggleMenuDisplay = (e) => {
  const dropdown = e.currentTarget.parentNode;
  const menu = dropdown.querySelector('.datemenu');
  const icon = dropdown.querySelector('.fa-angle-right');

  toggleClass(menu, 'hide');
  toggleClass(icon, 'rotate-90');
}

const setNotebookContent = (dateObj, content) => {
  let eleRef = document.getElementById('yx-body');
  eleRef.contentEditable = false;
  eleRef.classList.add('yanx-note-readonly');
  if (dateObj.toString() == date.toString()) {
    // eleRef.dataset.placeholder = '';
    eleRef.contentEditable = true;
    eleRef.classList.remove('yanx-note-readonly');
  }
  eleRef.innerHTML = content;
}

export const handleOptionSelected = (e) => {
  toggleClass(e.target.parentNode, 'hide');

  const id = e.target.id;
  const newValue = e.target.textContent + ' ';
  const titleElem = document.querySelector('#yx-date-value');
  const icon = document.querySelector('.dropdown .title .fa');

  let d = new Date(e.target.dataset.date);
  titleElem.textContent = d.getDate() + ' ' + months[d.getMonth()];

  let selectedDateContent = getNotebook(null, e.target.dataset.noteref);
  setNotebookContent(d, selectedDateContent)

  setTimeout(() => toggleClass(icon, 'rotate-90', 0));
}

// Date Function
export const initDropdownDates = () => {
  const dates = [...Array(7)].map((val, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const dateAttrValue = noteDateRef + d.toDateString().split(' ').join('-');
    const dateDisplayValue = d.getDate() + ' ' + months[d.getMonth()].substring(0, 3);
    document.querySelector('.datemenu').innerHTML += ("<div class='option' data-date='" + d + "' data-noteref='" + dateAttrValue + "'>" + dateDisplayValue + "</div>");
  })
}

