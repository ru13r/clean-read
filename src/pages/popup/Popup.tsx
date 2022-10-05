import React, { useEffect, useState } from 'react';
import { PopupState } from '@src/common/types/popupState.model';
import { DOMMessage } from '@src/common/types/message.model';
import { presetExists } from '@src/config/presets';
import '@pages/popup/Popup.sass';

/** Internal URL of extension Reader Tab */
const readerUrl = chrome.runtime.getURL('src/pages/readertab/index.html');

const createReaderTab = async () => {
  return await chrome.tabs.create({
    url: readerUrl,
    active: false,
  });
};

interface StateMessageProps {
  state: PopupState;
}

const StateMessage = (props: StateMessageProps) => {
  let msg;
  switch (props.state) {
    case 'PARSE_TAB_LOADING':
      msg = 'Wait until the page has finished loading...';
      break;
    case 'PARSE_TAB_LOADED':
      msg = 'Happy Reading!';
      break;
    case 'NO_PRESET':
      msg = 'No preset exists. Try another site.';
      break;
    default:
      msg = 'Loading...';
  }
  return <div className="text-reader-text font-serif text-xl">{msg}</div>;
};

const Popup = () => {
  const [state, setState] = useState<PopupState>('LOADING');

  useEffect(() => {
    // get the tab on which the extension was activated
    setState('LOADING');
    (async () => {
      const [parseTab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });
      if (presetExists(parseTab.url)) {
        let readerTab;
        // if parseTab has finished loading - create readerTab immediately
        if (parseTab.status === 'complete') {
          readerTab = await createReaderTab();
        } else {
          // otherwise wait until parseTab has a 'complete' status, then create readerTab
          setState('PARSE_TAB_LOADING');
          chrome.tabs.onUpdated.addListener((tab, info) => {
            if (info.status === 'complete' && tab === parseTab.id) {
              (async () => {
                readerTab = await createReaderTab();
              })();
            }
          });
        }
        // wait until readerTab is complete and then send message
        chrome.tabs.onUpdated.addListener((tab, info) => {
          if (info.status === 'complete' && tab === readerTab.id) {
            chrome.tabs.sendMessage(tab, {
              type: 'PARSE_TAB_ID',
              payload: parseTab.id,
            } as DOMMessage);
            setState('PARSE_TAB_LOADED');
            chrome.tabs.update(readerTab.id, { active: true });
          }
        });
      } else {
        setState('NO_PRESET');
      }
    })();
  }, []);

  return (
    <div className="App">
      <div className="text-reader-text font-serif text-xl">
        <StateMessage state={state} />
      </div>
    </div>
  );
};

export default Popup;
