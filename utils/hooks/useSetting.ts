// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector, useDispatch } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/store' or its correspond... Remove this comment to see the full error message
import s from "utils/store";
var { settings: updateSettings } = s;

export default function useSetting (setting: any, base: any) {
  const dispatch = useDispatch();
  const settings = useSelector((i: any) => i.settings);

  function setValue(newValue: any) {
    const x = {};
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    x[setting] = newValue;
    dispatch(updateSettings({...settings,...x}));
  }

  return [settings[setting] ?? base, setValue];
}
