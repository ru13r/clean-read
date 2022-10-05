import packageJson from '../package.json';
import { ManifestType } from '@src/manifest-type';
import { getMatches } from './site-presets';

const manifest: ManifestType = {
  manifest_version: 3,
  name: packageJson.name,
  version: packageJson.version,
  description: packageJson.description,
  options_page: 'src/pages/options/index.html',
  permissions: ['tabs'],
  background: {
    service_worker: 'src/pages/background/index.js',
  },
  action: {
    default_popup: 'src/pages/popup/index.html',
    default_icon: 'icon-34.png',
  },
  icons: {
    '128': 'icon-128.png',
  },
  content_scripts: [
    {
      /** get URL matches from the site-presets file */
      matches: getMatches(),
      js: ['src/pages/content/index.js'],
    },
  ],
  web_accessible_resources: [
    {
      resources: [
        'assets/js/*.js',
        'assets/css/*.css',
        'icon-128.png',
        'icon-34.png',
      ],
      matches: ['*://*/*'],
    },
  ],
};

export default manifest;
