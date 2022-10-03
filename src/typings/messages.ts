// The user clicks the extension popup button

export type DOMMessageActions = 'POPUP_CLICKED';
export type DOMMessageStatuses = 'READERTAB_CREATED' | 'READERTAB_READY';
export type DOMMessageContents = 'PAGE_CONTENT' | 'TAB_ID';

export interface DOMMessage {
  type: DOMMessageActions | DOMMessageContents | DOMMessageStatuses;
  payload?: number | Array<string>;
}

export interface DOMMessageElement extends DOMMessage {
  type: DOMMessageContents;
  payload: Array<string>;
}
