import V1 from './V1/Overview';
import V2 from './V2/Overview';
import * as React from 'react';
import { useSelector } from 'react-redux';

export default function (props) {
  var v2 = useSelector(i=>i.settings.activityV2Beta);
  if(v2) return <V2 {...props} />
  return <V1 {...props} />
}