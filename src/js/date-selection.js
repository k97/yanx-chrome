import { months, storeKey } from './config';

// Clear Storage
function clearStorage(d, index) {
  let sKey = storeKey+ ' - ' + d.toDateString();
  localStorage.forEach()
}


// Date Function
function initLastSevenDays() {
  const dates = [...Array(7)].map((val, i) => {
    const d = new Date();
    d.setDate(d.getDate() - i);
    document.querySelector('.datemenu').innerHTML += ("<div class='option' data-date='" + d + "'>" + d.getDate() + ' ' + months[d.getMonth()].substring(0, 3) + "</div>");
    // clearStorage(d, i);
    return d;
  })
  return dates;
}

export const sevenDays = initLastSevenDays();

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

function handleOptionSelected(e) {
  toggleClass(e.target.parentNode, 'hide');

  const id = e.target.id;
  const newValue = e.target.textContent + ' ';
  const titleElem = document.querySelector('#yx-date-value');
  const icon = document.querySelector('.dropdown .title .fa');

  let d = new Date(e.target.dataset.date);
  titleElem.textContent = d.getDate() + ' ' + months[d.getMonth()];


  //trigger custom event
  document.querySelector('#yx-date-value').dispatchEvent(new Event('change'));
  //setTimeout is used so transition is properly shown
  setTimeout(() => toggleClass(icon, 'rotate-90', 0));
}

function handleTitleChange(e) {
  const result = document.getElementById('result');
  result.innerHTML = 'The result is: ' + e.target.textContent;
}

//get elements
const dropdownTitle = document.querySelector('.dropdown .title');
const dropdownOptions = document.querySelectorAll('.dropdown .option');

//bind listeners to these elements
dropdownTitle.addEventListener('click', toggleMenuDisplay);

dropdownOptions.forEach(option => option.addEventListener('click', handleOptionSelected));

document.querySelector('.dropdown .title').addEventListener('change', handleTitleChange);