import { months, storeKey, noteDateRef, date } from './config';
import { initNotebook, setNotebook } from './store';

// Date Function
function initLastSevenDays() {
  const dates = [...Array(7)].map((val, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);

    let dateAttrValue = noteDateRef + d.toDateString().split(' ').join('-');
    let dateDisplayValue = d.getDate() + ' ' + months[d.getMonth()].substring(0, 3);
    document.querySelector('.datemenu').innerHTML += ("<div class='option' data-date='" + d + "' data-noteref='" + dateAttrValue + "'>" + dateDisplayValue + "</div>");
    // clearStorage(d, i);
    return d;
  })
  return dates;
}
initLastSevenDays();

function toggleClass(elem, className) {
  if (elem.className.indexOf(className) !== -1) {
    elem.className = elem.className.replace(className, '');
  }
  else {
    elem.className = elem.className.replace(/\s+/g, ' ') + ' ' + className;
  }

  return elem;
}

function toggleDisplay(elem) {
  const curDisplayStyle = elem.style.display;

  if (curDisplayStyle === 'none' || curDisplayStyle === '') {
    elem.style.display = 'block';
  }
  else {
    elem.style.display = 'none';
  }

}

function toggleMenuDisplay(e) {
  const dropdown = e.currentTarget.parentNode;
  const menu = dropdown.querySelector('.datemenu');
  const icon = dropdown.querySelector('.fa-angle-right');

  toggleClass(menu, 'hide');
  toggleClass(icon, 'rotate-90');
}

function setNotebookContent(dateObj, content) {
  let eleRef = document.getElementById('yx-body');
  eleRef.contentEditable = false;
  if (dateObj.toString() == date.toString()) {
    eleRef.contentEditable = true;
  }
  eleRef.innerHTML = content;
}

function handleOptionSelected(e) {
  toggleClass(e.target.parentNode, 'hide');

  const id = e.target.id;
  const newValue = e.target.textContent + ' ';
  const titleElem = document.querySelector('#yx-date-value');
  const icon = document.querySelector('.dropdown .title .fa');

  let d = new Date(e.target.dataset.date);
  titleElem.textContent = d.getDate() + ' ' + months[d.getMonth()];

  let selectedDateContent = initNotebook(null, e.target.dataset.noteref);
  setNotebookContent(d, selectedDateContent)

  setTimeout(() => toggleClass(icon, 'rotate-90', 0));
}
//get elements
const dateTitle = document.querySelector('.dropdown .title');
const dropdownDates = document.querySelectorAll('.dropdown .option');

//bind listeners to these elements
dateTitle.addEventListener('click', toggleMenuDisplay);
dropdownDates.forEach(option => option.addEventListener('click', handleOptionSelected));
