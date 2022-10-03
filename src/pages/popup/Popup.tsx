import React, { useEffect } from 'react';
import '@pages/popup/Popup.sass';
import '../../typings/messages';
import { DOMMessage } from '@src/typings/messages';

const getContentTab = async () => {
  return await chrome.tabs.query({
    active: true,
    currentWindow: true,
  });
};

const createReaderTab = async () => {
  const readerUrl = chrome.runtime.getURL('src/pages/readertab/index.html');
  const [contentTab] = await getContentTab();
  const tab = await chrome.tabs.create({
    url: readerUrl,
    active: false,
  });
  chrome.tabs.onUpdated.addListener((tab, info) => {
    if (info.status === 'complete') {
      chrome.tabs.sendMessage(tab, {
        type: 'TAB_ID',
        payload: contentTab.id,
      } as DOMMessage);
    }
  });
  return tab;
};

const Popup = () => {
  useEffect(() => {
    createReaderTab();
  });

  return (
    <div className="App">
      <h1>HELLO</h1>
      <p>See the tab</p>
    </div>
  );
};

export default Popup;
