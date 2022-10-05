/**
 * @description Presets for all processed sites
 */

/** Available domains */
export type Domains = 'lib.ru';

/**  Interface representing Preset for a single site */
export interface Preset {
  /** Site domain name */
  domain: Domains;
  /** Pattern to match URL in manifest */
  urlPattern: string;
  /** DOM Selectors for searching elements */
  selectors: {
    /** Title selector */
    title: string;
    /** Content selector */
    main: string;
  };
  /** DOM Parsers to extract values */
  parsers: {
    /** Title processor */
    title: (HTMLElement) => string;
    /** Content processor */
    main: (HTMLElement) => string[];
  };
  /** content processors */
  /** processor function, accepts paragraphs array string[]
   * and returns processed paragraphs array string[] (filter, grouping, etc.)  */
  processParagraphs: (paragraphs: string[]) => string[];
  /** processor function applied to each paragraph (trim, typography, etc.) */
  processParagraph: (string) => string;
}
