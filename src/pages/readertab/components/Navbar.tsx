import React from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';

import './Navbar.sass';
import { Settings, Setting, SettingId } from '@src/common/types/settings.model';
import { settingsAtom, showSettingsAtom } from '@src/store/atoms/settings';

const SettingsControls = () => {
  const [settings, setSettings] = useRecoilState<Settings>(settingsAtom);
  const onChange = (id: SettingId) => (value: number) => {
    const updatedSetting = settings.find((s) => s.id === id);
    updatedSetting.value = value;
    setSettings((settings) =>
      settings.map((s) => (s.id === id ? updatedSetting : s))
    );
  };
  return (
    <div className="w-full">
      {settings.map((setting) => (
        <Range {...setting} key={setting.id} onChange={onChange(setting.id)} />
      ))}
    </div>
  );
};

type RangeProps = Setting & { onChange: (value: number) => void };
const Range = ({ id, label, min, max, value, step, onChange }: RangeProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(+e.target.value);
  };
  return (
    <div>
      <div>
        <label htmlFor={id}>
          {label}: {value}
        </label>
      </div>
      <div className="flex flex-row">
        <span className="w-8 px-1">{min}</span>
        <div>
          <input
            type="range"
            className="form-range"
            min={min}
            max={max}
            value={value}
            step={step}
            onChange={handleChange}
          />
        </div>
        <span className="w-8 px-1">{max}</span>
      </div>
    </div>
  );
};

interface OptionProps {
  visible: boolean;
}
const Options = ({ visible }: OptionProps) => {
  const visibleClass = visible ? 'visible' : 'invisible';
  const setSettings = useSetRecoilState(showSettingsAtom);
  return (
    <div
      className={`p-2 bg-reader-background fixed border border-2 ${visibleClass}`}
    >
      <div className="font-bold">Options</div>
      <SettingsControls />
      <button onClick={() => setSettings(false)}>Close</button>
    </div>
  );
};

const Navbar = () => {
  const [showSettings, toggleShowSettings] = useRecoilState(showSettingsAtom);
  const toggleSettings = () => {
    toggleShowSettings(!showSettings);
  };
  return (
    <nav className="w-full py-2">
      <button onClick={toggleSettings}>Options</button> | <button>Save</button>
      <Options visible={showSettings} />
    </nav>
  );
};
export default Navbar;
