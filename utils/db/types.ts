// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './types.json'. Consider using ... Remove this comment to see the full error message
import types from './types.json';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './typekeys.json'. Consider usi... Remove this comment to see the full error message
import typekeys from './typekeys.json';

function g(icon: any) {
  if (icon.startsWith('https://munzee.global')) icon = icon.slice(49, -4);
  var x = decodeURIComponent(icon.toLowerCase()).replace(/[^a-zA-Z0-9]/g, '');
  if (x !== "munzee" && x.endsWith('munzee')) return x.replace(/munzee$/, '');
  return x;
}
export default function get(icon: any, x: any) {
  if (x && typeof x === "string" && x !== "icon") {
    if (x === "name") {
      return types.find((i: any) => [...(i.alt_names || []), i.name, i.icon].map(g).includes(g(icon)));
    }
    return types.find((i: any) => i[x] === icon);
  }
  if (x && x !== "icon") return typekeys[g(icon)]
  return types[typekeys[g(icon)]]
}

// var data = {};
// for(let type of types) {
//   data[type.cid] = type
// }
// export default data;