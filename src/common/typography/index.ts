import { pipe } from '../functional';

const replaceQuotes: (string) => string = (x) =>
  x.replace(/"([^"]*)"/g, '«$1»');
const replaceMdash: (string) => string = (x) =>
  x.replace('--', '—').replace(' - ', '—'); //

export const fixTypography: (string) => string = (s) =>
  pipe([
    //
    replaceMdash,
    replaceQuotes,
  ])(s);
