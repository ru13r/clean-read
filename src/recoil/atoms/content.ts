import { atom, selector, DefaultValue } from 'recoil';
import { sampleBook } from '@src/recoil/atoms/sample';
import { Book } from '@src/common/types/book.model';
import { pipe } from '@src/common/functional';

// TODO move to presets, remove from atoms logic
// typography
const replaceQuotes: (string) => string = (x) =>
  x.replace(/"([^"]*)"/g, '«$1»');
const replaceMdash: (string) => string = (x) => x.replace('--', '―'); //

const fixTypography: (string) => string = (s) =>
  pipe([
    //
    replaceMdash,
    replaceQuotes,
  ])(s);

export const bookAtom = atom<Book>({
  key: 'contentAtom',
  default: sampleBook as Book,
});

export const bookSelector = selector<Book>({
  key: 'bookSelector',
  get: ({ get }) => {
    return get(bookAtom);
  },
  set: ({ set }, newValue) => {
    if (newValue instanceof DefaultValue) {
      set(bookAtom, newValue);
    } else {
      let para = '';
      const paragraphs = newValue.paragraphs.reduce((acc, val) => {
        if (val.startsWith('     ')) {
          acc.push(para);
          para = val.trim();
        } else {
          para = para + ' ' + fixTypography(val);
        }
        return acc;
      }, []);
      set(bookAtom, { title: newValue.title, paragraphs: paragraphs });
    }
  },
});
