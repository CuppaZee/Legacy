import types from './types.json';
import typekeys from './typekeys.json';

function g(icon) {
  if(icon.startsWith('https://')) icon = icon.slice(49,-4);
  var x = decodeURIComponent(icon).replace(/[^a-zA-Z0-9]/g,'');
  if(x!=="munzee"&&x.endsWith('munzee')) return x.replace(/munzee$/,'')
  return x;
}
export default function get (icon,x) {
  if(x) return typekeys[g(icon)]
  return types[typekeys[g(icon)]]
}

// var data = {};
// for(let type of types) {
//   data[type.cid] = type
// }
// export default data;