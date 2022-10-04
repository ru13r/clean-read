import refreshOnUpdate from 'virtual:reload-on-update-in-view';
import { DOMMessage } from '@src/common/types/message.model';
import { Book } from '@src/common/types/book.model';
import { Preset } from '@src/common/types/preset.model';
import { getSitePreset, presetExists } from '@src/config/presets';
import { pipe } from '@src/common/functional';

refreshOnUpdate('pages/content/parser');

const getData: (Preset) => Book = (preset: Preset) => {
  const select = (selector) => document.querySelector(selector);
  const process = (processor) => (element) => processor(element);
  const getEntity = (name) =>
    pipe([
      //
      process(preset.processors[name]), //
    ])(select(preset.selectors[name]));
  return {
    title: getEntity('title'),
    paragraphs: getEntity('content'),
  };
};

chrome.runtime.onMessage.addListener((message: DOMMessage, _, response) => {
  if (message.type === 'STATUS_READERTAB_READY') {
    const url = document.URL;
    // Test if preset exists for URL
    if (presetExists(url)) {
      // yes - parse the page and send content to ReaderTab
      const preset = getSitePreset(url);
      const data = getData(preset);
      // TODO wait until content is fully loaded, then send message to create tab
      response({
        type: 'DATA_BOOK',
        payload: data,
      } as DOMMessage);
    } else {
      // no - send the error
      response({
        type: 'ERR_PRESET_NOT_FOUND',
      } as DOMMessage);
    }
  }
});
