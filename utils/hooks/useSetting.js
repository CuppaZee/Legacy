import { useSelector, useDispatch } from 'react-redux';
import s from "utils/store";
var { settings: updateSettings } = s;

export default function useSetting (setting, base) {
  const dispatch = useDispatch();
  const settings = useSelector(i => i.settings);

  function setValue(newValue) {
    const x = {};
    x[setting] = newValue;
    dispatch(updateSettings({...settings,...x}));
  }

  return [settings[setting] ?? base, setValue];
}
