/**
 * @description Book internal model types
 */

export interface Book {
  title: string;
  paragraphs: string[];
  /** URL from which the book was parsed,
   *  required to select appropriate preset in various parts of extension (e. g. store) */
  url: string;
}
