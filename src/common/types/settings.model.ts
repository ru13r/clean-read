/**
 * @description Settings internal model types
 */

/** A single setting object */
export type Setting = {
  id: SettingId;
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
};

export type SettingId = 'fontSize' | 'lineHeight' | 'maxWidth';

export type Settings = Array<Setting>;
