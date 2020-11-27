// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';

export default function useSearch (timeout: any) {
  var [value,setValue] = React.useState('');
  var [search,setSearch] = React.useState('');
  var [timeoutC,setTimeoutC] = React.useState(null);
  function onValue(val: any) {
    if(timeoutC) clearTimeout(timeoutC)
    setValue(val);
    setTimeoutC(setTimeout(() => {
      return setSearch(val);
    }, timeout))
  };
  return [value, search, onValue];
}