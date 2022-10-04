/**
 * @description Chrome message types
 */
import { Book } from '@src/common/types/book.model';

type DOMMessageStatus = 'STATUS_READERTAB_CREATED' | 'STATUS_READERTAB_READY';
type DOMMessageData = 'DATA_BOOK' | 'DATA_TAB_ID';
type DOMMessageError = 'ERR_PRESET_NOT_FOUND';

export interface DOMMessage {
  type: DOMMessageData | DOMMessageStatus | DOMMessageError;
  payload?: number | Book;
}
