import { atom } from 'recoil';
import { Settings } from '@src/common/types/settings.model';

export const settingsAtom = atom<Settings>({
  key: 'settingsAtom',
  default: [
    {
      id: 'fontSize',
      label: 'Font Size',
      value: 16,
      min: 12,
      max: 24,
      step: 2,
    },
    {
      id: 'lineHeight',
      label: 'Line Height',
      value: 1.3,
      min: 1,
      max: 2,
      step: 0.1,
    },
    {
      id: 'maxWidth',
      label: 'Max Width (chars)',
      value: 55,
      min: 45,
      max: 70,
      step: 1,
    },
  ],
});

export const showSettingsAtom = atom<boolean>({
  key: 'showSettingsAtom',
  default: false,
});
