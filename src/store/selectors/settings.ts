import { selectorFamily } from 'recoil';
import { settingsAtom } from '@src/store/atoms/settings';
import { SettingId } from '@src/common/types/settings.model';

export const settingsSelector = selectorFamily({
  key: 'settingsSelector',
  get:
    (id: SettingId) =>
    ({ get }) => {
      return get(settingsAtom).find((setting) => setting.id === id).value;
    },
});
