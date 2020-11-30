// import Clan from 'utils/db/clan';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/config' or its correspon... Remove this comment to see the full error message
import config from 'utils/config';
var Clan = {
  1: {
    task_id: 1,
    top: "Days of",
    bottom: "Activity",
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
    total: "min",
    meta: {
      activity: ["capture", "deploy"],
      days: true,
      exclude: (i: any) => ["personalmunzee", "premiumpersonal", "social"].includes(i.icon) || i.category === "universal",
    }
  },
  2: {
    task_id: 2,
    top: "Total",
    bottom: "Captures",
    icon: "captured",
    meta: {
      activity: ["capture"]
    }
  },
  3: {
    task_id: 3,
    top: "Total",
    bottom: "Points",
    icon: "https://i.ibb.co/K5ZmXqc/Total-1.png",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true
    },
    hidden: ["u89"]
  },
  6: {
    task_id: 6,
    top: "Total",
    bottom: "Deploys",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    meta: {
      activity: ["deploy"],
      points: true,
      exclude: (i: any) => ["personalmunzee", "premiumpersonal"].includes(i.icon),
    }
  },
  7: {
    task_id: 7,
    top: "Dest.",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/hotel.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/1starmotel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtualresort.png"
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i: any) => i.destination,
      exclude: (i: any) => i.icon === "skyland",
    }
  },
  10: {
    task_id: 10,
    top: "Deploy",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/owned.png",
    meta: {
      activity: ["deploy"],
      points: true,
      exclude: (i: any) => ["personalmunzee", "premiumpersonal"].includes(i.icon),
    }
  },
  12: {
    task_id: 12,
    top: "Evo",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
      "https://munzee.global.ssl.fastly.net/images/pins/evolution_filter_physical.png"
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i: any) => i.evolution
    }
  },
  13: {
    task_id: 13,
    top: "Places",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/poi_filter.png",
    meta: {
      activity: ["capture"],
      types: (i: any) => i.category == "poi"
    }
  },
  14: {
    task_id: 14,
    top: "Jewel",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/aquamarine.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/diamond.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtualonyx.png"
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: (i: any) => i.category == "jewel"
    }
  },
  17: {
    task_id: 17,
    top: "Evo",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/evolution.png",
      "https://munzee.global.ssl.fastly.net/images/pins/evolution_filter_physical.png"
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: (i: any) => i.evolution
    }
  },
  19: {
    task_id: 19,
    top: "Jewel",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/diamond.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/aquamarine.png",
      "https://munzee.global.ssl.fastly.net/images/pins/virtual_citrine.png"
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i: any) => i.category == "jewel"
    }
  },
  20: {
    task_id: 20,
    top: "Weapon",
    bottom: "Deploys",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
      "https://munzee.global.ssl.fastly.net/images/pins/catapult.png"
    ],
    meta: {
      activity: ["deploy"],
      types: (i: any) => i.weapon == "clan"
    }
  },
  23: {
    task_id: 23,
    top: "Weapon",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
      "https://munzee.global.ssl.fastly.net/images/pins/catapult.png"
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i: any) => i.weapon == "clan"
    }
  },
  24: {
    task_id: 24,
    top: "Bouncer",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/expiring_specials_filter.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/expiring_specials_filter.png",
      "https://munzee.global.ssl.fastly.net/images/pins/theunicorn.png",
      "https://munzee.global.ssl.fastly.net/images/pins/nomad.png",
      "https://munzee.global.ssl.fastly.net/images/pins/muru.png"
    ],
    meta: {
      activity: ["capture"],
      types: (i: any) => i.bouncer
    }
  },
  25: {
    task_id: 25,
    top: "Mystery",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mystery.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mystery.png",
      "https://munzee.global.ssl.fastly.net/images/pins/airmystery.png"
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: (i: any) => i.category === "mystery"
    }
  },
  26: {
    task_id: 26,
    top: "Weapon",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/mace.png",
      "https://munzee.global.ssl.fastly.net/images/pins/crossbow.png"
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: (i: any) => i.weapon == "clan"
    }
  },
  27: {
    task_id: 27,
    top: "Zodiac",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/zodiac.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/zodiac.png",
      "https://munzee.global.ssl.fastly.net/images/pins/scorpio.png"
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: (i: any) => i.zodiac
    }
  },
  28: {
    task_id: 28,
    top: "Flat",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/flatrob.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/flatrob.png",
      "https://munzee.global.ssl.fastly.net/images/pins/flatlou.png"
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i: any) => i.category == "flat" && !i.unique
    }
  },
  29: {
    task_id: 29,
    top: "Elemental",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/earthmystery.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/icemystery.png",
      "https://munzee.global.ssl.fastly.net/images/pins/earthmystery.png"
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i: any) => i.elemental && (!i.scatter || ['fire','waterdroplet','frozengreenie','charge'].includes(i.icon))
    }
  },
  30: {
    task_id: 30,
    top: "Reseller",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/reseller.png",
    meta: {
      activity: ["capture", "deploy"],
      types: (i: any) => i.reseller
    }
  },
  31: {
    task_id: 31,
    top: "Gaming",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
      "https://munzee.global.ssl.fastly.net/images/pins/prizewheel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png"
    ],
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i: any) => i.gaming
    }
  },
  32: {
    task_id: 32,
    top: "Gaming",
    bottom: "Activity",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/joystickvirtual.png",
      "https://munzee.global.ssl.fastly.net/images/pins/prizewheel.png",
      "https://munzee.global.ssl.fastly.net/images/pins/urbanfit.png"
    ],
    meta: {
      activity: ["capture", "deploy"],
      types: (i: any) => i.gaming
    }
  },
  33: {
    task_id: 33,
    top: "Renovate",
    bottom: "Motel",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/destination.png",
    icons: [
      "https://munzee.global.ssl.fastly.net/images/pins/destination.png",
      "https://munzee.global.ssl.fastly.net/images/pins/2starmotel.png"
    ],
    meta: {
      activity: ["capture"],
      types: (i: any) => i.icon == "renovation"
    }
  },
  34: {
    task_id: 34,
    top: "Mystery",
    bottom: "Points",
    icon: "https://i.ibb.co/YdRQ3Sf/Split-Mystery.png",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i: any) => i.category == "mystery"
    }
  },
  35: {
    task_id: 35,
    top: "QRewZee",
    bottom: "Captures",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/qrewzee.png",
    meta: {
      activity: ["capture"],
      types: (i: any) => i.icon == "qrewzee"
    }
  },
  36: {
    task_id: 36,
    top: "Card",
    bottom: "Points",
    icon: "https://munzee.global.ssl.fastly.net/images/pins/envelope.png",
    meta: {
      activity: ["capture", "deploy", "capon"],
      points: true,
      types: (i: any) => i.category == "card"
    }
  }
}
export function ClanRequirementsConverter(req: any, rewards: any) {
  var output = {};
  var individual = {};
  var group = {};



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'battle' does not exist on type '{}'.
  output.battle = {
    game_id: Number(req?.battle?.game_id),
    start: new Date(req?.battle?.start * 1000),
    end: new Date(req?.battle?.end * 1000),
    reveal_at: new Date(req?.battle?.reveal_at * 1000),
    lb_total_task_id: Number(req?.battle?.lb_total_task_id),
    title: rewards?.battle?.title || "Some Month"
  }



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'.
  output.levels = [];



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'requirements' does not exist on type '{}... Remove this comment to see the full error message
  output.requirements = {};
  for (let level of Object.keys(req?.data?.levels ?? {}).slice(0, 5)) {
    let level_d = req?.data?.levels?.[level];
    let level_data = {
      individual: {},
      group: {},
      rewards: rewards?.levels?.[Number(level) - 1] ?? {},
      name: `Level ${level}`,
      level: level,
      id: Number(level)
    }
    for (let requirement of [...level_d.individual.map((i: any) => { i.individual = true; return i; }), ...level_d.group]) {



      // @ts-expect-error ts-migrate(2339) FIXME: Property 'requirements' does not exist on type '{}... Remove this comment to see the full error message
      if (!output.requirements[requirement.task_id]) {



        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        var rd = Clan[requirement.task_id] || {};



        // @ts-expect-error ts-migrate(2339) FIXME: Property 'requirements' does not exist on type '{}... Remove this comment to see the full error message
        output.requirements[requirement.task_id] = {
          task_id: rd.task_id ?? requirement.task_id,
          top: rd.top ?? requirement.name.split(' ')[0],
          bottom: rd.bottom ?? requirement.name.split(' ').slice(1).join(' ').replace('Cap/Deploys', 'Activity'),
          description: requirement.description,
          icon: `https://server.cuppazee.app/requirements/${requirement.task_id}.png?cache=${Math.floor(Date.now() / 3600000)}` ?? rd.icon ?? requirement.logo,
          meta: rd.meta
        }
      }



      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (requirement.individual && !Clan[requirement.task_id]?.hidden?.includes(`u${req?.battle?.game_id}`)) {



        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        individual[requirement.task_id] = 1;



        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        level_data["individual"][requirement.task_id] = requirement.amount;
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      } else if (!requirement.individual && !Clan[requirement.task_id]?.hidden?.includes(`g${req?.battle?.game_id}`)) {



        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        group[requirement.task_id] = 1;



        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        level_data["group"][requirement.task_id] = requirement.amount;
      }
    }



    // @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'.
    output.levels.push(level_data);
  }



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'requirements' does not exist on type '{}... Remove this comment to see the full error message
  var reqls = Object.keys(output.requirements).map(Number);
  reqls.sort((a, b) => a - b);



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'.
  output.order = {
    individual: [



      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...reqls.filter(i => individual[i] && !group[i]),



      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...reqls.filter(i => individual[i] && group[i]),
    ],
    group: [



      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...reqls.filter(i => group[i] && !individual[i]),



      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...reqls.filter(i => group[i] && individual[i]),
    ],
    requirements: [



      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...reqls.filter(i => individual[i] && !group[i]),



      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...reqls.filter(i => individual[i] && group[i]),



      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      ...reqls.filter(i => group[i] && !individual[i])
    ],
    rewards: rewards?.order
  }



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'rewards' does not exist on type '{}'.
  output.rewards = rewards?.rewards ?? {};
  return output;
}

export function ClanStatsConverter(clan: any, stats: any, shadow: any, game_id: any) {
  if (!stats || !clan || (clan.shadow && !shadow)) {
    return;
  }
  var data = {
    details: {
      clan_id: clan?.details?.clan_id,
      name: shadow?.details?.name ?? clan?.details?.name,
      simple_name: clan?.details?.simple_name,
      tagline: clan?.details?.tagline,
      creator: clan?.details?.creator_user_id,
      logo: clan?.details?.logo,
      privacy: clan?.details?.privacy,
      goal: clan?.details?.goal,
      rank: clan?.result?.rank,
      shadow: shadow?.details
    },
    members: game_id === config.clan.game_id ? [
      ...(shadow?.members || []).filter((i: any) => !(clan?.users || []).find((x: any) => x.user_id == i)).map((i: any) => {
        return {
          username: shadow?.usernames?.[i],
          user_id: Number(i),
          ghost: true,
          leader: false
        }
      }),
      ...(clan?.users || []).map((i: any) => {
        return {
          username: i.username,
          user_id: Number(i.user_id),
          ghost: false,
          leader: i.is_admin == "1"
        }
      }),
    ] : [],
    requirements: {}
  }
  for (var requirement of [...stats?.data?.levels?.[5]?.individual, ...stats?.data?.levels?.[5]?.group]) {
    if(game_id !== config.clan.game_id) {
      for(let user of Object.keys(requirement.data)) {
        if(!data.members.find(i=>i.user_id === Number(user))) {
          data.members.push({
            user_id: Number(user),
            username: clan.users.find((i: any) => i.user_id.toString()===user)?.username || `#${user}`,
            no: clan.users.find((i: any) => i.user_id.toString()===user) ? false : true,
            ghost: false,
            leader: false,
          })
        }
      };
    }



    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    data.requirements[requirement.task_id] = {
      users: {
        ...(shadow?.data?.[requirement.task_id] || {}),
        ...(clan.shadow ? {} : requirement.data)
      },
      total: Object.values({
        ...(shadow?.data?.[requirement.task_id] || {}),
        ...(clan.shadow ? {} : requirement.data)
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      }).reduce(Clan[requirement.task_id]?.total == "min" ? (a, b) => Math.min(a, b) : (a, b) => a + b, Clan[requirement.task_id]?.total == "min" ? Infinity : 0),
      task_id: requirement.task_id
    }
  }
  return data;
}
export function dateFromGameID(game_id: any) {
  var gid = game_id + 24158;
  var year = Math.floor(gid / 12);
  var month = gid % 12;
  return { year, month };
}