if (module.hot) {
  module.hot.accept();
}
import MediumEditor from 'medium-editor/dist/js/medium-editor';
import { storeKey, readNotebook, updateNotebook } from './store';
import './welcome';

const editor = new MediumEditor('.editable', {
  toolbar: {
    buttons: ['bold', 'italic', 'underline', 'strikethrough', 'quote', 'anchor', 'orderedlist', 'unorderedlist', 'pre', 'removeFormat', 'outdent', 'indent', 'h2', 'h3', 'removeFormat'],
  },
  placeholder: {
    text: 'Start writing...',
  },
  buttonLabels: 'fontawesome',
  paste: {
    cleanPastedHTML: true,
    forcePlainText: false
  }
});

editor.subscribe('editableInput', function (event, editable) {
  let content = editable.innerHTML;
  updateNotebook(storeKey, JSON.stringify(content));
});

readNotebook(storeKey, editor);
