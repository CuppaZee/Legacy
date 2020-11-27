import moment from 'moment';
import 'moment-timezone';

export default function MHQMoment(x: any) {
  return moment(x).tz('America/Chicago');
}