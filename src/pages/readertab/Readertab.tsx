import React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { contentParagraphsSelector } from '@src/recoil/atoms/content';

import '@pages/readertab/Readertab.sass';
import { DOMMessage } from '@src/typings/messages';

const getContent = async (tab) => {
  const content = await chrome.tabs.sendMessage(tab, {
    type: 'READERTAB_READY',
  } as DOMMessage);
  return content.payload;
};

const Readertab = () => {
  const [paragraphs, setParagraphs] = useRecoilState(contentParagraphsSelector);
  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: DOMMessage) => {
      if (message.type === 'TAB_ID') {
        getContent(message.payload).then((data) => setParagraphs(() => data));
      }
    });
  });
  return (
    <main
      className={
        'container mx-auto bg-reader-background text-reader-text font-serif text-2xl'
      }
    >
      <div className="px-4 max-w-[55ch] leading-7 antialiased border-solid border-2 border-black">
        <h1 className="text-3xl py-4 font-bold">Title</h1>
        {paragraphs.map((p, i) => (
          <p key={i} className="py-2">
            {p}
          </p>
        ))}
      </div>
    </main>
  );
};

export default Readertab;
