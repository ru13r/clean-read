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
    <div className="container mx-auto bg-reader-background">
      <header className="font-sans">
        <h1 className="text-3xl font-bold">{book.title}</h1>
        <h6 className="text-sm pt-1 pb-4">
          Parsed from: <a href={book.url}>{book.url}</a>
        </h6>
      </header>
      <main className="font-serif text-xl pb-4">
        <div className="px-4 max-w-[55ch] leading-6 antialiased">
          {book.paragraphs.map((para, index) => {
            const reg = /<h[1-6]>(.*)<\/h[1-6]>/gi;
            const match = para.match(reg);
            if (match) {
              return (
                <h2 key={index} className="indent-8 pt-4 pb-2 font-bold">
                  {match[0].replace(reg, '$1')}
                </h2>
              );
            } else {
              return (
                <p key={index} className="indent-8">
                  {para}
                </p>
              );
            }
          })}
        </div>
      </main>
    </div>
  );
};

export default Readertab;
