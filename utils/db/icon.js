import types from './types.json';
import typekeys from './typekeys.json';
import pins from 'assets/pins';

function g(icon) {
  if (icon.startsWith('https://munzee.global')) icon = icon.slice(49, -4);
  var x = decodeURIComponent(icon.toLowerCase()).replace(/[^a-zA-Z0-9]/g, '');
  if (x !== "munzee" && x.endsWith('munzee')) return x.replace(/munzee$/, '')
  return x;
}
export default function get(icon = "mystery", size = 64) {
  var gi = g(icon);
  if (typekeys[gi] !== undefined && types[typekeys[gi]] && !types[typekeys[gi]].missingicon) {
    return pins[types[typekeys[gi]].i] ?? {uri:`https://server.cuppazee.app/pins/${size}/${types[typekeys[gi]].i}.png`}
  } else if (icon.startsWith('https://')) {
    return {uri:icon};
  } return {uri:`https://munzee.global.ssl.fastly.net/images/pins/${icon}.png`};
}