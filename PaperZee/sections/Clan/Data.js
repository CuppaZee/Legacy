import Clan from '~sections/DB/clan';
export function ClanRequirementsConverter(req, rewards) {
  var output = {};
  var individual = {};
  var group = {};
  output.battle = {
    game_id: Number(req?.battle?.game_id),
    start: new Date(req?.battle?.start * 1000),
    end: new Date(req?.battle?.end * 1000),
    reveal_at: new Date(req?.battle?.reveal_at * 1000),
    lb_total_task_id: Number(req?.battle?.lb_total_task_id),
    title: rewards?.battle?.title || "Some Month"
  }
  output.levels = [];
  output.requirements = {};
  for (let level in req?.data?.levels) {
    let level_d = req?.data?.levels?.[level];
    let level_data = {
      individual: {},
      group: {},
      rewards: rewards?.levels?.[Number(level) - 1] ?? {},
      name: `Level ${level}`,
      id: Number(level)
    }
    for (let requirement of [...level_d.individual.map(i => { i.individual = true; return i; }), ...level_d.group]) {
      if (!output.requirements[requirement.task_id]) {
        var rd = Clan[requirement.task_id] || {};
        output.requirements[requirement.task_id] = {
          task_id: rd.task_id ?? requirement.task_id,
          top: rd.top ?? requirement.name.split(' ')[0],
          bottom: rd.bottom ?? requirement.name.split(' ').slice(1).join(' ').replace('Cap/Deploys', 'Activity'),
          description: requirement.description,
          icon: rd.icon ?? requirement.logo
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
  output.rewards = rewards?.rewards ?? {};
  return output;
}

export function ClanStatsConverter(clan, stats, shadow) {
  if(!stats||!clan||(clan.shadow&&!shadow)) {
    return;
  }
  var data = {
    details: {
      clan_id: clan?.details?.clan_id,
      name: shadow?.details?.name??clan?.details?.name,
      simple_name: clan?.details?.simple_name,
      tagline: clan?.details?.tagline,
      creator: clan?.details?.creator_user_id,
      logo: clan?.details?.logo,
      privacy: clan?.details?.privacy,
      goal: clan?.details?.goal
    },
    members: [
      ...(shadow?.members||[]).map(i=>{
        return {
          username: shadow?.usernames?.[i],
          user_id: Number(i),
          ghost: true,
          leader: false
        }
      }),
      ...(clan?.users||[]).map(i=>{
        return {
          username: i.username,
          user_id: Number(i.user_id),
          ghost: false,
          leader: i.is_admin=="1"
        }
      }),
    ],
    requirements: {}
  }
  for(var requirement of [...stats?.data?.levels?.[5]?.individual,...stats?.data?.levels?.[5]?.group]) {
    data.requirements[requirement.task_id] = {
      users: {
        ...(shadow?.data?.[requirement.task_id]||{}),
        ...(clan.shadow?{}:requirement.data)
      },
      total: Object.values({
        ...(shadow?.data?.[requirement.task_id]||{}),
        ...(clan.shadow?{}:requirement.data)
      }).reduce(Clan[requirement.task_id].total=="min"?(a,b)=>Math.min(a,b):(a,b)=>a+b,Clan[requirement.task_id].total=="min"?Infinity:0),
      task_id: requirement.task_id
    }
  }
  return data;
}