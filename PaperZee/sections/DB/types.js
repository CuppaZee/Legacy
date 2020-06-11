import types from './types.json';

var data = {};
for(let type of types) {
  data[type.cid] = type
}
export default data;