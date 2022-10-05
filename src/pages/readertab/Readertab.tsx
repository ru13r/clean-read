import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { DOMMessage } from '@src/common/types/message.model';
import { Book } from '@src/common/types/book.model';
import { bookSelector } from '@src/store/selectors/book';
import '@pages/readertab/Readertab.sass';

const getContent = async (tab) => {
  const content = await chrome.tabs.sendMessage(tab, {
    type: 'STATUS_READERTAB_READY',
  } as DOMMessage);
  return content.payload;
};

const Readertab = () => {
  const [book, setBook] = useRecoilState<Book>(bookSelector);
  useEffect(() => {
    chrome.runtime.onMessage.addListener((message: DOMMessage) => {
      if (message.type === 'PARSE_TAB_ID') {
        (async () => {
          const book = await getContent(message.payload);
          document.title = book.title;
          setBook(() => book);
        })();
      }
    });
  }, []);

  return (
    <main
      className={
        'container mx-auto bg-reader-background text-reader-text font-serif text-xl'
      }
    >
      <div className="px-6 max-w-[55ch] leading-6 antialiased border-solid border-2 border-neutral-500">
        <h1 className="text-3xl py-4 font-bold">{book.title}</h1>
        <h2>
          Parsed from: <a href={book.url}>{book.url}</a>
        </h2>
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
