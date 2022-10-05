import { atom } from 'recoil';
import { sampleBook } from '@src/store/atoms/sample-book';
import { Book } from '@src/common/types/book.model';

export const bookAtom = atom<Book>({
  key: 'contentAtom',
  default: sampleBook as Book,
});
