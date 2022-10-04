import React from 'react';
import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { bookSelector } from '@src/recoil/atoms/content';

import '@pages/readertab/Readertab.sass';
import { DOMMessage } from '@src/common/types/message.model';

const getContent = async (tab) => {
  const content = await chrome.tabs.sendMessage(tab, {
    type: 'STATUS_READERTAB_READY',
  } as DOMMessage);
  return content.payload;
};

const Readertab = () => {
  const [book, setBook] = useRecoilState(bookSelector);
  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: DOMMessage) => {
      if (message.type === 'DATA_TAB_ID') {
        getContent(message.payload) //
          .then((book) => setBook(() => book));
      }
    });
  });
  return (
    <main
      className={
        'container mx-auto bg-reader-background text-reader-text font-serif text-xl'
      }
    >
      <div className="px-6 max-w-[55ch] leading-6 antialiased border-solid border-2 border-neutral-500">
        <h1 className="text-3xl py-4 font-bold">{book.title}</h1>
        {book.paragraphs.map((p, i) => (
          <p key={i} className="py-2 indent-8">
            {p}
          </p>
        ))}
      </div>
    </main>
  );
};

export default Readertab;
