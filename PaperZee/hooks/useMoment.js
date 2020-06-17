import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment-timezone';

export default function useMoment() {
  var {i18n} = useTranslation();
  moment.locale(i18n.language==="cimode"?"x-pseudo":i18n.language);
  return moment;
}