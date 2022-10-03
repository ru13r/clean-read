import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { DOMMessage } from '@src/typings/messages';

refreshOnUpdate('pages/content/reader');

chrome.runtime.onMessage.addListener((message, _, response) => {
  if (message.type === 'READERTAB_READY') {
    const element = document.querySelector('pre>pre');
    const content = element.innerHTML.split('\n');
    response({
      type: 'PAGE_CONTENT',
      payload: content,
    } as DOMMessage);
  }
});
