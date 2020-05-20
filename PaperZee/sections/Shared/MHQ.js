import moment from 'moment';
import 'moment-timezone';

export default function MHQMoment(x) {
  return moment(x).tz('America/Chicago');
}