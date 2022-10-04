/**
 * @description Presets for all processed sites
 */
import { Preset } from '@src/common/types/preset.model';

const presets: Array<Preset> = [
  {
    domain: 'lib.ru',
    urlPattern: 'http://lib.ru/*.txt',
    selectors: {
      title: 'pre>pre>ul>h2',
      content: 'pre>pre',
    },
    processors: {
      title: (elem) => elem.innerHTML,
      content: (elem) => elem.innerHTML.split('\n'),
    },
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
export const getSitePreset: (string) => Preset = (url) =>
  presets.find((preset) => preset.domain === findPresetName(url));

/** Accepts URL and returns true if there exists a parsing preset in the extension */
export const presetExists: (string) => boolean = (url) =>
  presets //
    .map((preset) => preset.domain) //
    .some((domain) => url.includes(domain));
