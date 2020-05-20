// TODO: Add Rewards input - Needs new Request system first
import Clan from '~sections/DB/clan';
export function ClanRequirementsConverter(req,rewards) {
  var output = {};
  var individual = {};
  var group = {};
  output.battle = {
    game_id: Number(req?.battle?.game_id),
    start: new Date(req?.battle?.start * 1000),
    end: new Date(req?.battle?.end * 1000),
    reveal_at: new Date(req?.battle?.reveal_at * 1000),
    lb_total_task_id: Number(req?.battle?.lb_total_task_id),
    title: rewards?.battle?.title?.slice?.(10)??""
  }
  output.levels = [];
  output.requirements = {};
  for (let level in req?.data?.levels) {
    let level_d = req?.data?.levels?.[level];
    let level_data = {
      individual: {},
      group: {},
      rewards: rewards?.levels?.[Number(level)-1]??{},
      name: `Level ${level}`,
      id: Number(level)
    }
    for (let requirement of [...level_d.individual.map(i => { i.individual = true; return i; }), ...level_d.group]) {
      if (!output.requirements[requirement.task_id]) {
        var rd = Clan[requirement.task_id]||{};
        output.requirements[requirement.task_id] = {
          task_id: rd.task_id??requirement.task_id,
          top: rd.top??requirement.name.split(' ')[0],
          bottom: rd.bottom??requirement.name.split(' ').slice(1).join(' ').replace('Cap/Deploys', 'Activity'),
          description: requirement.description,
          icon: rd.icon??requirement.logo
        }
      }
      if (requirement.individual) {
        individual[requirement.task_id] = 1;
      } else {
        group[requirement.task_id] = 1;
      }
      level_data[requirement.individual ? "individual" : "group"][requirement.task_id] = requirement.amount;
    }
    output.levels.push(level_data);
  }
  var reqls = Object.keys(output.requirements).map(Number).sort((a, b) => a - b);
  output.order = {
    individual: reqls.filter(i => individual[i]).sort((a, b) => group[a] ? (group[b] ? 0 : 1) : -1),
    group: reqls.filter(i => group[i]).sort((a, b) => individual[a] ? (individual[b] ? 0 : -1) : 1),
    requirements: [
      ...reqls.filter(i => individual[i]).sort((a, b) => group[a] ? (group[b] ? 0 : 1) : -1),
      ...reqls.filter(i => group[i] && !individual[i])
    ],
    rewards: rewards?.order
  }
  output.rewards = rewards?.rewards??{};
  return output;
}

/* TODO: ClanStatsConverter function, similar to ClanRequirementsConverter function
Takes in /clan/v2/requirements API data (eg. https://hastebin.com/gevugaleku.json)
Responds with data similar to https://server.cuppazee.app/clan/details/v1?game_id=86&clan_id=1349
*/