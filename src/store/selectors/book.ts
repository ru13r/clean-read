import { DefaultValue, selector } from 'recoil';
import { Book } from '@src/common/types/book.model';
import { getSitePresetByUrl } from '@src/site-presets';
import { bookAtom } from '@src/store/atoms/book';

export const bookSelector = selector({
  key: 'bookSelector',
  get: ({ get }) => {
    return get(bookAtom);
  },
  set: ({ set }, newValue: Book | DefaultValue) => {
    if (newValue instanceof DefaultValue) {
      set(bookAtom, newValue);
    } else {
      const { processParagraphs, processParagraph } = getSitePresetByUrl(
        newValue.url
      );
      console.log(newValue.paragraphs);
      const paragraphs = //
        processParagraphs(newValue.paragraphs) //
          .map(processParagraph);
      console.log(paragraphs);
      set(bookAtom, {
        title: newValue.title,
        paragraphs: paragraphs,
        url: newValue.url,
      });
    }
  },
});
