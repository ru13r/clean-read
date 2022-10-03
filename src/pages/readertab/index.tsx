import React from 'react';
import { createRoot } from 'react-dom/client';
import { RecoilRoot } from 'recoil';
import refreshOnUpdate from 'virtual:reload-on-update-in-view';
refreshOnUpdate('pages/readertab');

import Readertab from '@pages/readertab/Readertab';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find AppContainer');
  }
  const root = createRoot(appContainer);
  root.render(
    <RecoilRoot>
      <Readertab />
    </RecoilRoot>
  );
}

init();
