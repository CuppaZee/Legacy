
import * as React from 'react';

export default function useSearch (timeout: any) {
  var [value,setValue] = React.useState('');
  var [search,setSearch] = React.useState('');
  var [timeoutC,setTimeoutC] = React.useState(null);
  function onValue(val: any) {


    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    if(timeoutC) clearTimeout(timeoutC)
    setValue(val);


    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
    setTimeoutC(setTimeout(() => {
      return setSearch(val);
    }, timeout))
  };
  return [value, search, onValue];
}