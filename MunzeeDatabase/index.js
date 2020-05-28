var fs = require('fs');

const colors = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  fg: {
    Black: "\x1b[30m",
    Red: "\x1b[31m",
    Green: "\x1b[32m",
    Yellow: "\x1b[33m",
    Blue: "\x1b[34m",
    Magenta: "\x1b[35m",
    Cyan: "\x1b[36m",
    White: "\x1b[37m",
    Crimson: "\x1b[38m"
  },
  bg: {
    Black: "\x1b[40m",
    Red: "\x1b[41m",
    Green: "\x1b[42m",
    Yellow: "\x1b[43m",
    Blue: "\x1b[44m",
    Magenta: "\x1b[45m",
    Cyan: "\x1b[46m",
    White: "\x1b[47m",
    Crimson: "\x1b[48m"
  }
};

var munzees = [];
var categories = [];

console.log(`${colors.bg.Green}${colors.fg.Black} Generating Types... ${colors.Reset}`)

categories.push({
  name: "Bouncers",
  id: "bouncer",
  icon: "expiring_specials_filter"
})
categories.push({
  name: "Bouncer Hosts",
  id: "bouncerhost",
  icon: "munzee",
  parent: "bouncer"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Destinations${colors.Reset} from ${colors.fg.Green}./types/destination.json${colors.Reset}`)
munzees = munzees.concat(require('./types/destination.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  destination: {
    type: i.type,
    temporary: i.temp,
    max_rooms: i.rooms,
    room_of: i.room_of
  },

  can_swap: i.state == "physical" || undefined,

  capture_radius: (i.state == "virtual" && i.type != "room") ? 500 : undefined,

  state: i.state,
  category: "destination",

  completion: "complete",
  from_file: "./types/destination.json"
})))
categories.push({
  name: "Destinations",
  id: "destination",
  icon: "destination"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Custom Events${colors.Reset} from ${colors.fg.Green}./types/event.json${colors.Reset}`)
munzees = munzees.concat(require('./types/event.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  event: "custom",

  state: "physical",
  category: "event",

  completion: "complete",
  from_file: "./types/event.json"
})))
categories.push({
  name: "Events - DO NOT CLICK",
  id: "event",
  icon: "event"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Evolutions${colors.Reset} from ${colors.fg.Green}./types/evolution.json${colors.Reset}`)
munzees = munzees.concat(require('./types/evolution.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  evolution: {
    stage: i.stage,
    set: i.set,
    base: i.base
  },

  state: i.state,
  category: "evolution_"+i.set,

  completion: "complete",
  from_file: "./types/evolution.json"
})))
categories.push({
  name: "Evolutions",
  id: "evolution",
  icon: "evolution"
})
categories.push({
  name: "Farm Evolutions",
  id: "evolution_farm",
  icon: "tomato",
  parent: "evolution"
})
categories.push({
  name: "Education Evolutions",
  id: "evolution_education",
  icon: "shark",
  parent: "evolution"
})
categories.push({
  name: "Nature Evolutions",
  id: "evolution_nature",
  icon: "rose",
  parent: "evolution"
})
categories.push({
  name: "Reseller Evolutions",
  id: "evolution_reseller",
  icon: "treasurechest",
  parent: "evolution"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Fancy Flats${colors.Reset} from ${colors.fg.Green}./types/fancyflat.json${colors.Reset}`)
munzees = munzees.concat(require('./types/fancyflat.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  ...(i.hosts ? {
    host: {
      type: "flat",
      hosts: i.hosts
    },

    state: i.state,
    category: "bouncerhost"
  } : {
      bouncer: {
        type: "flat",
        duration: 12,
        lands_on: [
          i.flat_type,
          x => (x.virtual_colors || []).includes(i.color),
          ...(i.lands_on || [])
        ]
      },

      state: "bouncer",
      category: "fancyflat"
    }),

  completion: "complete",
  from_file: "./types/fancyflat.json"
})))
categories.push({
  name: "Fancy Flats",
  id: "fancyflat",
  icon: "tuxflatrob",
  parent: "bouncer"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Flats${colors.Reset} from ${colors.fg.Green}./types/flat.json${colors.Reset}`)
munzees = munzees.concat(require('./types/flat.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  flat: true,
  unique: i.unique,

  state: "virtual",
  category: "flat",

  completion: "complete",
  from_file: "./types/flat.json"
})))
categories.push({
  name: "Flats",
  id: "flat",
  icon: "flatrob"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Gaming${colors.Reset} from ${colors.fg.Green}./types/gaming.json${colors.Reset}`)
munzees = munzees.concat(require('./types/gaming.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  gaming: true,

  state: i.state,
  category: "gaming",

  completion: "complete",
  from_file: "./types/gaming.json"
})))
categories.push({
  name: "Gaming",
  id: "gaming",
  icon: "joystickfull"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Jewels${colors.Reset} from ${colors.fg.Green}./types/jewel.json${colors.Reset}`)
munzees = munzees.concat(require('./types/jewel.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  jewel: true,

  state: i.state,
  category: "jewel",

  completion: "complete",
  from_file: "./types/jewel.json"
})))
categories.push({
  name: "Jewels",
  id: "jewel",
  icon: "diamond"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Virtuals${colors.Reset} from ${colors.fg.Green}./types/virtual.json${colors.Reset}`)
munzees = munzees.concat(require('./types/virtual.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  virtual_colors: i.virtual_colors,
  ...(i.extra || {}),
  state: i.state,
  category: "virtual",

  completion: "complete",
  from_file: "./types/virtual.json"
})))
categories.push({
  name: "Virtuals",
  id: "virtual",
  icon: "virtual"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Misc${colors.Reset} from ${colors.fg.Green}./types/misc.json${colors.Reset}`)
munzees = munzees.concat(require('./types/misc.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  ...(i.extra || {}),
  state: i.state,
  category: "misc",

  completion: "complete",
  from_file: "./types/misc.json"
})))
categories.push({
  name: "Misc.",
  id: "misc",
  icon: "munzee"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Mysteries${colors.Reset} from ${colors.fg.Green}./types/mystery.json${colors.Reset}`)
munzees = munzees.concat(require('./types/mystery.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  elemental: i.elemental,

  state: i.state,
  category: "mystery",

  completion: "complete",
  from_file: "./types/mystery.json"
})))
categories.push({
  name: "Mysteries",
  id: "mystery",
  icon: "mystery"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Mythologicals${colors.Reset} from ${colors.fg.Green}./types/myth.js${colors.Reset}`)
munzees = munzees.concat(require('./types/myth').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  ...(i.hosts ? {
    host: {
      type: "myth",
      hosts: i.hosts
    },

    state: i.state,
    category: "bouncerhost"
  } : {
      bouncer: {
        type: "myth",
        base: i.base,
        duration: i.duration || 12,
        lands_on: i.lands_on
      },
      myth_set: i.type,

      state: "bouncer",
      category: "myth"
    }),

  completion: "complete",
  from_file: "./types/myth.js"
})))
categories.push({
  name: "Mythologicals",
  id: "myth",
  icon: "theunicorn_full",
  parent: "bouncer"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}POIs${colors.Reset} from ${colors.fg.Green}./types/poi.json${colors.Reset}`)
munzees = munzees.concat(require('./types/poi.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  poi: true,

  state: "virtual",
  category: "poi",

  completion: "complete",
  from_file: "./types/poi.json"
})))
categories.push({
  name: "Places of Interest",
  id: "poi",
  icon: "poi_filter"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Resellers${colors.Reset} from ${colors.fg.Green}./types/reseller.json${colors.Reset}`)
munzees = munzees.concat(require('./types/reseller.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  reseller: true,

  state: "physical",
  category: "reseller",

  completion: "complete",
  from_file: "./types/reseller.json"
})))
categories.push({
  name: "Resellers",
  id: "reseller",
  icon: "reseller"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Weapons${colors.Reset} from ${colors.fg.Green}./types/weapon.json${colors.Reset}`)
munzees = munzees.concat(require('./types/weapon.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  weapon: i.weapon,

  state: "physical",
  category: i.weapon,

  completion: "complete",
  from_file: "./types/weapon.json"
})))
categories.push({
  name: "Clan Weapons",
  id: "clan",
  icon: "mace"
})
categories.push({
  name: "Zeecret Weapons",
  id: "zeecret",
  icon: "briefcase"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Zodiacs${colors.Reset} from ${colors.fg.Green}./types/zodiac.json${colors.Reset}`)
munzees = munzees.concat(require('./types/zodiac.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  zodiac: i.zodiac,

  state: "physical",
  category: `${i.zodiac}_zodiac`,

  completion: "complete",
  from_file: "./types/zodiac.json"
})))
categories.push({
  name: "Zodiacs",
  id: "zodiac",
  icon: "zodiac"
})
categories.push({
  name: "Western Zodiacs",
  id: "western_zodiac",
  icon: "zodiac",
  parent: "zodiac"
})
categories.push({
  name: "Chinese Zodiacs",
  id: "chinese_zodiac",
  icon: "chinese_zodiac",
  parent: "zodiac"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Tourisms${colors.Reset} from ${colors.fg.Green}./types/tourism.json${colors.Reset}`)
munzees = munzees.concat(require('./types/tourism.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  tourism: true,

  state: "virtual",
  category: "tourism",

  completion: "complete",
  from_file: "./types/tourism.json"
})))
categories.push({
  name: "Tourism",
  id: "tourism",
  icon: "tourism_filter"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Cards${colors.Reset} from ${colors.fg.Green}./types/cards.json${colors.Reset}`)
munzees = munzees.concat(require('./types/cards.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  card: i.open?"open":"limited",
  temporary: 7,

  state: "virtual",
  category: "card",

  completion: "complete",
  from_file: "./types/cards.json"
})))
categories.push({
  name: "Greetings Cards",
  id: "card",
  icon: "envelope"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Nomads${colors.Reset} from ${colors.fg.Green}./types/nomad.js${colors.Reset}`)
munzees = munzees.concat(require('./types/nomad').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  bouncer: {
    type: "nomad",
    duration: i.duration || 12,
    lands_on: i.lands_on
  },

  state: "bouncer",
  category: "nomad",

  completion: "complete",
  from_file: "./types/nomad.js"
})))
categories.push({
  name: "Nomads",
  id: "nomad",
  icon: "nomad",
  parent: "bouncer"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Pouch Creatures${colors.Reset} from ${colors.fg.Green}./types/pouch.js${colors.Reset}`)
munzees = munzees.concat(require('./types/pouch').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  ...(i.hosts ? {
    host: {
      type: "pouch",
      hosts: i.hosts
    },

    state: i.state,
    category: "bouncerhost"
  } : {
      gleaming: i.gleaming,
      funfinity: i.funfinity,
      bouncer: {
        type: "pouch",
        base: i.base,
        stage: i.stage,
        duration: i.duration || 6,
        lands_on: i.lands_on
      },

      state: "bouncer",
      category: "pouch"
    }),

  completion: "complete",
  from_file: "./types/pouch.js"
})))
categories.push({
  name: "Pouch Creatures",
  id: "pouch",
  icon: "oniks",
  parent: "bouncer"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}RetireMyths${colors.Reset} from ${colors.fg.Green}./types/retiremyth.js${colors.Reset}`)
munzees = munzees.concat(require('./types/retiremyth').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  bouncer: {
    type: i.pouch ? "zombiepouch" : "retiremyth",
    base: i.base,
    duration: i.duration || 12,
    lands_on: i.lands_on
  },

  state: "bouncer",
  category: i.pouch ? "zombiepouch" : "retiremyth",

  completion: "complete",
  from_file: "./types/retiremyth.js"
})))
categories.push({
  name: "Zombie Pouch Creatures",
  id: "zombiepouch",
  icon: "zombiemuru",
  parent: "bouncer"
})
categories.push({
  name: "RetireMyths",
  id: "retiremyth",
  icon: "retiredpegasus",
  parent: "bouncer"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Temp POBs${colors.Reset} from ${colors.fg.Green}./types/temppob.js${colors.Reset}`)
munzees = munzees.concat(require('./types/temppob').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  ...(i.hosts ? {
    host: {
      type: "temppob",
      hosts: i.hosts
    },

    state: i.state,
    category: "bouncerhost"
  } : {
      bouncer: {
        type: "temppob",
        base: i.base,
        duration: i.duration || 12,
        lands_on: i.lands_on
      },

      state: "bouncer",
      category: "temppob"
    }),
  ...(i.extra || {}),

  completion: "complete",
  from_file: "./types/temppob.js"
})))
categories.push({
  name: "TempPOBs",
  id: "temppob",
  icon: "butterfly",
  parent: "bouncer"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}TOBs${colors.Reset} from ${colors.fg.Green}./types/tob.js${colors.Reset}`)
munzees = munzees.concat(require('./types/tob').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  ...(i.hosts ? {
    host: {
      type: "tob",
      hosts: i.hosts
    },

    state: i.state,
    category: "bouncerhost"
  } : {
      bouncer: {
        type: "tob",
        base: i.base,
        duration: i.duration || 12,
        lands_on: i.lands_on
      },

      state: "bouncer",
      category: "tob"
    }),

  completion: "complete",
  from_file: "./types/tob.js"
})))
categories.push({
  name: "TOBs",
  id: "tob",
  icon: "firepegasus",
  parent: "bouncer"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Scatters${colors.Reset} from ${colors.fg.Green}./types/scatter.json${colors.Reset}`)
munzees = munzees.concat(require('./types/scatter.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  scatter: i.scatter,
  ...(i.extra || {}),

  state: i.state,
  category: i.category || "scatter",

  completion: "complete",
  from_file: "./types/scatter.json"
})))
categories.push({
  name: "Scatters",
  id: "scatter",
  icon: "scattered"
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Seasonals${colors.Reset} from ${colors.fg.Green}./types/seasonals/*.js${colors.Reset}`)
categories = categories.concat(require('./types/seasonals').map(c=>{
  munzees = munzees.concat((c.scatters||[]).map(i => ({
    name: i.name,
    icon: i.icon,
    id: i.id,

    scatter: i.scatter,
    capture_types: i.capture_types,
    capture_type_from: i.capture_type_from,
    ...(i.extra || {}),

    state: i.state,
    category: c.category,

    completion: "complete",
    from_file: "./types/seasonals/*.js"
  })))
  munzees = munzees.concat((c.specials||[]).map(i => ({
    name: i.name,
    icon: i.icon,
    id: i.id,

    bouncer: {
      type: "seasonal",
      duration: i.duration,
      lands_on: i.lands_on
    },
    capture_types: i.capture_types,
    capture_type_from: i.capture_type_from,
    ...(i.extra || {}),

    state: "bouncer",
    category: c.category,

    completion: "complete",
    from_file: "./types/seasonals/*.js"
  })))
  return {
    name: c.name,
    id: c.category,
    icon: c.icon||c.specials[0].icon,
    parent: "seasonal_"+c.year,
    seasonal: {
      year: c.year,
      starts: new Date(c.starts).valueOf(),
      ends: new Date(c.ends).valueOf()
    }
  }
}));
categories.push({
  name: "2020 Seasonal Specials",
  id: "seasonal_2020",
  icon: categories.find(i=>i.parent=="seasonal_2020").icon,
  parent: "seasonal"
})
categories.push({
  name: "2019 Seasonal Specials",
  id: "seasonal_2019",
  icon: categories.find(i=>i.parent=="seasonal_2019").icon,
  parent: "seasonal"
})
categories.push({
  name: "Seasonal Specials",
  id: "seasonal",
  icon: "expiring_specials_filter"
})

console.log(`${colors.bg.Green}${colors.fg.Black} Types Generated - Checking... ${colors.Reset}`)

for (var munzee of munzees) {
  if (munzee.bouncer && munzee.bouncer.lands_on) {
    let lands_on = [];
    let index = 0;
    for (let host of munzee.bouncer.lands_on) {
      if (typeof host === "string") {
        if (host.startsWith(':')) {
          lands_on = lands_on.concat((munzees.filter(x => x.category == host.slice(1)) || []).map(i => i.id));
          if (munzees.filter(x => x.category == host.slice(1)).length === 0) {
            console.log(`${colors.bg.Red}  ${colors.Reset} No Munzees for ${colors.fg.Yellow}lands_on${colors.Reset}[${colors.fg.Yellow}${index}${colors.Reset}] for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
          }
        } else {
          lands_on.push((munzees.find(i => i.icon === host && i.redirect === undefined) || {}).id)
          if (!munzees.find(i => i.icon === host && i.redirect === undefined)) {
            console.log(`${colors.bg.Red}  ${colors.Reset} No Munzee for ${colors.fg.Yellow}bouncer${colors.Reset}.${colors.fg.Yellow}lands_on${colors.Reset}[${colors.fg.Yellow}${index}${colors.Reset}] for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
          }
        }
      } else if (typeof host === "function") {
        lands_on = lands_on.concat((munzees.filter(host) || []).map(i => i.id));
        if (munzees.filter(host).length === 0) {
          console.log(`${colors.bg.Red}  ${colors.Reset} No Munzees for ${colors.fg.Yellow}bouncer${colors.Reset}.${colors.fg.Yellow}lands_on${colors.Reset}[${colors.fg.Yellow}${index}${colors.Reset}] for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
        }
      }
      index++;
    }
    munzee.bouncer.lands_on = lands_on.filter(i => i !== undefined && i !== null);
  }

  if (munzee.bouncer) {
    if (!munzee.bouncer.lands_on) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}bouncer${colors.Reset}.${colors.fg.Yellow}lands_on${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
    if (!munzee.bouncer.type) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}bouncer${colors.Reset}.${colors.fg.Yellow}type${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
  }

  if (munzee.host) {
    if (!munzee.host.hosts) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}host${colors.Reset}.${colors.fg.Yellow}hosts${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
    if (!munzee.host.type) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}host${colors.Reset}.${colors.fg.Yellow}type${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
  }

  if (munzee.evolution) {
    if (!munzee.evolution.stage) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}evolution${colors.Reset}.${colors.fg.Yellow}stage${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
    if (!munzee.evolution.set) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}evolution${colors.Reset}.${colors.fg.Yellow}set${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
    if (!munzee.evolution.base) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}evolution${colors.Reset}.${colors.fg.Yellow}base${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
  }

  if (munzee.destination) {
    if (!munzee.destination.type) {
      console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}destination${colors.Reset}.${colors.fg.Yellow}type${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
    }
  }
  if (munzee.id===undefined) {
    console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}id${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
  }
  if (!munzee.category || !categories.find(i=>i.id==munzee.category)) {
    console.log(`${colors.bg.Red}  ${colors.Reset} Invalid ${colors.fg.Yellow}category${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
  }

  delete munzee.from_file;
}
for (var munzee of munzees) {
  munzee.can_host = munzees.filter(i => i.bouncer && (i.bouncer.lands_on || []).includes(munzee.id)).map(i => i.id);
  if (munzee.can_host.length == 0) munzee.can_host = undefined;
}

munzees.sort((a, b) => (a.id||0) - (b.id||0));

console.log(`${colors.bg.Green}${colors.fg.Black} Types Checked - Writing Types to Files... ${colors.Reset}`)

fs.writeFileSync('types.json', JSON.stringify(munzees, null, 2))
fs.writeFileSync('types.min.json', JSON.stringify(munzees))
fs.writeFileSync('../PaperZee/sections/DB/types.json', JSON.stringify(munzees))
fs.writeFileSync('../FlameZee/functions/util/db/types.json', JSON.stringify(munzees))

console.log(`${colors.bg.Green}${colors.fg.Black} Types Written to Files - Writing Categories to JSON... ${colors.Reset}`)

fs.writeFileSync('categories.json', JSON.stringify(categories, null, 2))
fs.writeFileSync('categories.min.json', JSON.stringify(categories))
fs.writeFileSync('../PaperZee/sections/DB/categories.json', JSON.stringify(categories))
fs.writeFileSync('../FlameZee/functions/util/db/categories.json', JSON.stringify(categories))

console.log(`${colors.bg.Green}${colors.fg.Black} Categories Written to Files ${colors.Reset}`)

console.log(`${colors.bg.Cyan}${colors.fg.Black} Current Progress: ${munzees.length} / ${munzees.length+require('./types/NA.json').length} - ${Math.round((munzees.length)/(munzees.length+require('./types/NA.json').length)*10000)/100}% ${colors.Reset}`)
console.log(`${colors.bg.Yellow}${colors.fg.Black} Remaining of N/A: ${require('./types/NA.json').length} ${colors.Reset}`)