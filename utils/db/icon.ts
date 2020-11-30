


import types from './types.json';



import typekeys from './typekeys.json';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'assets/pins' or its correspond... Remove this comment to see the full error message
import pins from 'assets/pins';

export function g(icon: any) {
  if (icon.startsWith('https://munzee.global')) icon = icon.slice(49, -4);
  var x = decodeURIComponent(icon.toLowerCase()).replace(/[^a-zA-Z0-9]/g, '');
  if (x !== "munzee" && x.endsWith('munzee')) return x.replace(/munzee$/, '');
  return x;
}
export default function get(icon = "mystery", size = 64) {
  var gi = g(icon);
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  if (typekeys[gi] !== undefined && types[typekeys[gi]] && !types[typekeys[gi]].missingicon) {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return pins[types[typekeys[gi]].i] ?? {uri:`https://server.cuppazee.app/pins/${size}/${types[typekeys[gi]].i}.png`}
  } else if (icon.startsWith('https://')) {
    return {uri:icon};
  } return {uri:`https://munzee.global.ssl.fastly.net/images/pins/${icon}.png`};
}