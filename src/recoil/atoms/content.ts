import { atom, selector } from 'recoil';
import { sampleParagraphs } from '@src/recoil/atoms/sample';

// typography
const replaceQuotes = (x) => x.replace(/"([^"]*)"/g, '«$1»');
const replaceMdash = (x) => x.replace('--', '―');

export const contentAtom = atom({
  key: 'contentAtom',
  default: sampleParagraphs,
});

export const contentParagraphsSelector = selector({
  key: 'contentParagraphsSelector',
  get: ({ get }) => {
    const paragraphs = get(contentAtom);
    return paragraphs.map((s) => s.trim());
  },
  set: ({ set }, newValue: Array<string>) => {
    let para = '';
    const paragraphs = newValue.reduce((acc, val) => {
      if (val.startsWith('     ')) {
        acc.push(para);
        para = val.trim();
      } else {
        val = replaceQuotes(val);
        val = replaceMdash(val);
        para = para + ' ' + val;
      }
      return acc;
    }, [] as Array<string>);
    set(contentAtom, paragraphs);
  },
});
