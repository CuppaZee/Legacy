import Clan from '~sections/DB/clan.js';
export default function ClanProgressConverter(data) {
  var output = {};
  var {captures=[],deploys=[],captures_on=[]} = data??{};
  for(var task in Clan) {
    var task_data = Clan[task];
    output[task_data.task_id] = task_data.function({cap:captures,dep:deploys,con:captures_on});
  }
  return output;
}