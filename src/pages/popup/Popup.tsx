import React, { useEffect, useState } from 'react';
import '@pages/popup/Popup.sass';
import '../../common/types/message.model';
import { DOMMessage } from '@src/common/types/message.model';
import { presetExists } from '@src/config/presets';

/** Internal URL of extension Reader Tab */
const readerUrl = chrome.runtime.getURL('src/pages/readertab/index.html');

const getContentTab = async () => {
  return await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
};

// TODO wait until content is fully loaded and background script loaded, then create tab
// possibly use onUpdate event
const executePopup = async () => {
  const [contentTab] = await getContentTab();
  if (presetExists(contentTab.url)) {
    createReaderTab(contentTab.id);
    return 'Happy reading.';
  } else {
    return 'No preset exists, try another site.';
  }
};

const createReaderTab = async (id) => {
  const tab = await chrome.tabs.create({
    url: readerUrl,
    active: false,
  });
  chrome.tabs.onUpdated.addListener((tab, info) => {
    if (info.status === 'complete') {
      chrome.tabs.sendMessage(tab, {
        type: 'DATA_TAB_ID',
        payload: id,
      } as DOMMessage);
    }
  });
  return tab;
};

const Popup = () => {
  // TODO make message a component with props
  const [message, setMessage] = useState(' ');
  useEffect(() => {
    executePopup() //
      .then((msg) => setMessage(msg));
  }, []);
  return (
    <div className="App">
      <div className="text-reader-text font-serif text-xl">{message}</div>
    </div>
  );
};

export default Popup;
