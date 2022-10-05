import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { DOMMessage } from '@src/common/types/message.model';
import { Book } from '@src/common/types/book.model';
import { Preset } from '@src/common/types/preset.model';
import { getSitePresetByUrl, presetExists } from '@src/site-presets';

refreshOnUpdate('pages/content/parser');

const url = document.URL;

const getBook: (Preset) => Book = (preset: Preset) => {
  const select = (selector) => document.querySelector(selector);
  const process = (processor) => (element) => processor(element);
  const getData = (name) =>
    process(preset.parsers[name])(select(preset.selectors[name]));
  return {
    title: getData('title'),
    paragraphs: getData('main'),
    url: url,
  };
};

chrome.runtime.onMessage.addListener((message: DOMMessage, _, response) => {
  if (message.type === 'STATUS_READERTAB_READY') {
    // Test if preset exists for URL
    if (presetExists(url)) {
      // yes - parse the page and send content to ReaderTab
      const preset = getSitePresetByUrl(url);
      const book = getBook(preset);
      response({
        type: 'DATA_BOOK',
        payload: book,
      } as DOMMessage);
    } else {
      // no - send the error
      response({
        type: 'ERR_PRESET_NOT_FOUND',
      } as DOMMessage);
    }
  }
});
