import { pipe } from '../functional';

const replaceQuotes: (string) => string = (x) =>
  x.replace(/"([^"]*)"/g, '«$1»');
const replaceMdash: (string) => string = (x) =>
  x //
    .replaceAll('--', '—') //
    .replaceAll(' - ', ' — ') //
    .replace(/^-/g, '—')
    .replace(/([,.?!])-/g, '$1 —'); //
const noMultipleSpaces: (string) => string = (x) => x.replace(/  +/g, ' ');

export const fixTypography: (string) => string = (s) =>
  pipe([
    //
    replaceMdash,
    replaceQuotes,
    noMultipleSpaces,
  ])(s);
