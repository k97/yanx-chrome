if (module.hot) {
  module.hot.accept();
}

import { date, today, message, noteConfig, noteDateRef, SetContent } from './config';
import { initDropdownDates, handleOptionSelected, toggleMenuDisplay } from './date-dropdown';
import MediumEditor from 'medium-editor/dist/js/medium-editor';

import { initNotebook, updateNotebook } from './store';
import { initQuote } from './quotes';
import './modal';

const editor = new MediumEditor('.editable', noteConfig);

editor.subscribe('editableInput', function (event, editable) {
  let content = editable.innerHTML;
  updateNotebook(JSON.stringify(content));
});


// Rock n Roll
SetContent('yx-message', message);
SetContent('yx-date-value', today);

const defKey = noteDateRef + date.toDateString().split(' ').join('-')
initNotebook(defKey, editor);
initQuote();

initDropdownDates();
//get elements
const dateTitle = document.querySelector('.dropdown .title');
const dropdownDates = document.querySelectorAll('.dropdown .option');

//bind listeners to these elements
dateTitle.addEventListener('click', toggleMenuDisplay);
dropdownDates.forEach(option => option.addEventListener('click', handleOptionSelected));