import { useTranslation } from 'react-i18next';
import moment from 'moment';
import 'moment-timezone';
import 'moment/locale/cs';
import 'moment/locale/da';
import 'moment/locale/de';
import 'moment/locale/en-gb';
import 'moment/locale/fi';
import 'moment/locale/fr';
import 'moment/locale/hu';
import 'moment/locale/lt';
import 'moment/locale/nl';
import 'moment/locale/pt';
import 'moment/locale/sv';

export default function useMoment() {
  var {i18n} = useTranslation();
  moment.locale(i18n.language==="cimode"?"x-pseudo":i18n.language.toLowerCase());
  return moment;
}