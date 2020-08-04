if (module.hot) {
  module.hot.accept();
}

import { date, today, message, noteConfig, noteDateRef, SetContent } from './config';
import './date-selection';
import MediumEditor from 'medium-editor/dist/js/medium-editor';

import { readNotebook, updateNotebook } from './store';
import './quotes';

const editor = new MediumEditor('.editable', noteConfig);

editor.subscribe('editableInput', function (event, editable) {
  let content = editable.innerHTML;
  updateNotebook(JSON.stringify(content));
});


// Rock n Roll
SetContent('yx-message', message);
SetContent('yx-date-value', today);

const defKey = noteDateRef + date.toDateString().split(' ').join('-')
readNotebook(defKey, editor);
