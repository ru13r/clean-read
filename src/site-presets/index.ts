/**
 * @description Presets for all processed sites
 */
import { Preset } from '@src/common/types/preset.model';
import { fixTypography } from '../common/typography';

const removeTagsExceptH2 = (x) => x.replace(/(<\/?(h2)[^>]*>)|<[^>]+>/gi, '$1');

const libruGroupParagraphs = (paragraphs) => {
  let para = '';
  return paragraphs
    .reduce((acc: string[], val: string) => {
      if (
        val.startsWith('     --') ||
        val.startsWith('     ') ||
        val.startsWith('<')
      ) {
        para = removeTagsExceptH2(para);
        acc.push(para);
        para = val.trim();
      } else {
        para = para + ' ' + val;
      }
      return acc;
    }, [])
    .slice(0, -2); // last paragraphs are removed as they contain meta info
};

const presets: Array<Preset> = [
  {
    domain: 'lib.ru',
    urlPattern: 'http://lib.ru/*.txt',
    selectors: {
      title: 'pre>pre>ul>h2',
      main: 'pre>pre',
    },
    parsers: {
      title: (elem) => elem.innerHTML,
      main: (elem) => elem.innerHTML.split('\n'),
    },
    processParagraphs: libruGroupParagraphs,
    processParagraph: fixTypography,
  },
];

/** Accepts URL and returns the preset domain (name) or null */
const findPresetName: (string) => string | undefined = (url) =>
  presets //
    .map((preset) => preset.domain) //
    .find((domain) => url.includes(domain));

/** Returns an array of available match patterns */
export const getMatches: () => Array<string> = () =>
  presets.map((preset) => preset.urlPattern);

/** Accepts URL and returns a Preset object for site parsing or undefined*/
export const getSitePresetByUrl: (string) => Preset = (url) =>
  presets.find((preset) => preset.domain === findPresetName(url));

/** Accepts URL and returns true if there exists a parsing preset in the extension */
export const presetExists: (string) => boolean = (url) =>
  presets //
    .map((preset) => preset.domain) //
    .some((domain) => url.includes(domain));
