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
  /** DOM Selectors */
  selectors: {
    /** Title selector */
    title: string;
    /** Content selector */
    content: string;
  };
  processors: {
    /** Title processor */
    title: (HTMLElement) => string;
    /** Content processor */
    content: (HTMLElement) => string[];
  };
}
