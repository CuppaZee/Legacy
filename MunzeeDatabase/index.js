var fs = require('fs');
var points = require('./points');

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
  name: "Root",
  id: "root",
  icon: "munzee",
  parents: [],
  priority: Infinity
})
categories.push({
  name: "Bouncers",
  id: "bouncer",
  icon: "expiring_specials_filter",
  parents: ["root"],
  priority: 5
})
categories.push({
  name: "Others",
  id: "other",
  icon: "munzee",
  parents: ["root"],
  priority: 0
})
categories.push({
  name: "Bouncer Hosts",
  id: "bouncerhost",
  icon: "munzee",
  parents: ["bouncer"],
  priority: -1
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Destinations${colors.Reset} from ${colors.fg.Green}./types/destination.json${colors.Reset}`)
munzees = munzees.concat(require('./types/destination.json').map(i => ({
  name: i.name,
  icon: i.icon,
  alt_icons: i.type == "bouncer" ? [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(x => `${i.icon}${x}`) : undefined,
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

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/destination.json"
})))
categories.push({
  name: "Destinations",
  id: "destination",
  icon: "destination",
  parents: ["other"]
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Custom Events${colors.Reset} from ${colors.fg.Green}./types/event.json${colors.Reset}`)
munzees = munzees.concat(require('./types/event.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  event: "custom",

  state: "physical",
  category: "event",

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/event.json"
})))
categories.push({
  name: "Events - DO NOT CLICK",
  id: "event",
  icon: "event",
  parents: ["root"],
  priority: -10,
  hidden: true
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
  category: "evolution_" + i.set,

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/evolution.json"
})))
categories.push({
  name: "Evolutions",
  id: "evolution",
  icon: "evolution",
  parents: ["other"]
})
categories.push({
  name: "Farm Evolutions",
  id: "evolution_farm",
  icon: "tomato",
  parents: ["evolution"]
})
categories.push({
  name: "Education Evolutions",
  id: "evolution_education",
  icon: "shark",
  parents: ["evolution"]
})
categories.push({
  name: "Nature Evolutions",
  id: "evolution_nature",
  icon: "rose",
  parents: ["evolution"]
})
categories.push({
  name: "Reseller Evolutions",
  id: "evolution_reseller",
  icon: "treasurechest",
  parents: ["evolution"]
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

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/fancyflat.json"
})))
categories.push({
  name: "Fancy Flats",
  id: "fancyflat",
  icon: "tuxflatrob",
  parents: ["bouncer"]
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

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/flat.json"
})))
categories.push({
  name: "Flats",
  id: "flat",
  icon: "flatrob",
  parents: ["other"]
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Gaming${colors.Reset} from ${colors.fg.Green}./types/gaming.json${colors.Reset}`)
munzees = munzees.concat(require('./types/gaming.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  gaming: true,

  state: i.state,
  category: "gaming",

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/gaming.json"
})))
categories.push({
  name: "Gaming",
  id: "gaming",
  icon: "joystickfull",
  parents: ["other"]
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Jewels${colors.Reset} from ${colors.fg.Green}./types/jewel.json${colors.Reset}`)
munzees = munzees.concat(require('./types/jewel.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  jewel: true,

  state: i.state,
  category: "jewel",

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/jewel.json"
})))
categories.push({
  name: "Jewels",
  id: "jewel",
  icon: "diamond",
  parents: ["other"]
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

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/virtual.json"
})))
categories.push({
  name: "Virtuals",
  id: "virtual",
  icon: "virtual",
  parents: ["other"]
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Misc${colors.Reset} from ${colors.fg.Green}./types/misc.json${colors.Reset}`)
munzees = munzees.concat(require('./types/misc.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  ...(i.extra || {}),
  state: i.state,
  category: "misc",

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/misc.json"
})))
categories.push({
  name: "Misc.",
  id: "misc",
  icon: "munzee",
  parents: ["other"]
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Mysteries${colors.Reset} from ${colors.fg.Green}./types/mystery.json${colors.Reset}`)
munzees = munzees.concat(require('./types/mystery.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  elemental: i.elemental,

  state: i.state,
  category: "mystery",

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/mystery.json"
})))
categories.push({
  name: "Mysteries",
  id: "mystery",
  icon: "mystery",
  parents: ["other"]
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
      category: "myth_" + i.type
    }),
  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/myth.js"
})))
categories.push({
  name: "Original Myths",
  id: "myth_original",
  icon: "theunicorn",
  parents: ["bouncer"]
})
categories.push({
  name: "Classical Myths",
  id: "myth_classical",
  icon: "pegasus",
  parents: ["bouncer"]
})
categories.push({
  name: "Mirror Myths",
  id: "myth_mirror",
  icon: "mermaid",
  parents: ["bouncer"]
})
categories.push({
  name: "Modern Myths",
  id: "myth_modern",
  icon: "poseidon",
  parents: ["bouncer"]
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}POIs${colors.Reset} from ${colors.fg.Green}./types/poi.json${colors.Reset}`)
munzees = munzees.concat(require('./types/poi.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  poi: true,

  state: "virtual",
  category: "poi",

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/poi.json"
})))
categories.push({
  name: "Places of Interest",
  id: "poi",
  icon: "poi_filter",
  parents: ["other"]
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Resellers${colors.Reset} from ${colors.fg.Green}./types/reseller.json${colors.Reset}`)
munzees = munzees.concat(require('./types/reseller.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  reseller: true,

  state: "physical",
  category: "reseller",

  points: "reseller",
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/reseller.json"
})))
categories.push({
  name: "Resellers",
  id: "reseller",
  icon: "reseller",
  parents: ["other"]
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Weapons${colors.Reset} from ${colors.fg.Green}./types/weapon.json${colors.Reset}`)
munzees = munzees.concat(require('./types/weapon.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  weapon: i.weapon,

  state: i.state,
  category: i.weapon,

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/weapon.json"
})))
categories.push({
  name: "Clan Weapons",
  id: "clan",
  icon: "mace",
  parents: ["other"]
})
categories.push({
  name: "Zeecret Weapons",
  id: "zeecret",
  icon: "briefcase",
  parents: ["other"]
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Zodiacs${colors.Reset} from ${colors.fg.Green}./types/zodiac.json${colors.Reset}`)
munzees = munzees.concat(require('./types/zodiac.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  zodiac: i.zodiac,

  state: "physical",
  category: `${i.zodiac}_zodiac`,

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/zodiac.json"
})))
categories.push({
  name: "Zodiacs",
  id: "zodiac",
  icon: "zodiac",
  parents: ["other"]
})
categories.push({
  name: "Western Zodiacs",
  id: "western_zodiac",
  icon: "zodiac",
  parents: ["zodiac"]
})
categories.push({
  name: "Chinese Zodiacs",
  id: "chinese_zodiac",
  icon: "chinese_zodiac",
  parents: ["zodiac"]
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Tourisms${colors.Reset} from ${colors.fg.Green}./types/tourism.json${colors.Reset}`)
munzees = munzees.concat(require('./types/tourism.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  tourism: true,

  state: "virtual",
  category: "tourism",

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/tourism.json"
})))
categories.push({
  name: "Tourism",
  id: "tourism",
  icon: "tourism_filter",
  parents: ["other"]
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Cards${colors.Reset} from ${colors.fg.Green}./types/cards.json${colors.Reset}`)
munzees = munzees.concat(require('./types/cards.json').map(i => ({
  name: i.name,
  icon: i.icon,
  id: i.id,

  card: i.open ? "open" : "limited",
  temporary: 7,

  state: "virtual",
  category: "card",

  points: i.open ? "card_open" : "card_limited",
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/cards.json"
})))
categories.push({
  name: "Greetings Cards",
  id: "card",
  icon: "envelope",
  parents: ["other"],
  priority: 10
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

  ...(i.extra || {}),

  state: "bouncer",
  category: "nomad",

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/nomad.js"
})))
categories.push({
  name: "Nomads",
  id: "nomad",
  icon: "nomad",
  parents: ["bouncer"]
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
      category: "pouch_" + i.set
    }),
  ...(i.extra || {}),

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/pouch.js"
})))
categories.push({
  name: "Season 1 Creatures",
  id: "pouch_season_1",
  icon: "muru",
  parents: ["bouncer"]
})
categories.push({
  name: "Season 2 Creatures",
  id: "pouch_season_2",
  icon: "elekter",
  parents: ["bouncer"]
})
categories.push({
  name: "Funfinity Creatures",
  id: "pouch_funfinity",
  icon: "smaragd",
  parents: ["bouncer"]
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

  points: i.points,
  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/retiremyth.js"
})))
categories.push({
  name: "Zombie Pouch Creatures",
  id: "zombiepouch",
  icon: "zombiemuru",
  parents: ["bouncer"]
})
categories.push({
  name: "RetireMyths",
  id: "retiremyth",
  icon: "retiredpegasus",
  parents: ["bouncer"]
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
  points: i.points,

  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/temppob.js"
})))
categories.push({
  name: "TempPOBs",
  id: "temppob",
  icon: "butterfly",
  parents: ["bouncer"],
  priority: 1
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
  points: i.points,
  hidden: i.hidden,
  from_file: "./types/tob.js"
})))
categories.push({
  name: "TOBs",
  id: "tob",
  icon: "firepegasus",
  parents: ["bouncer"]
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
  points: i.points,

  completion: "complete",
  hidden: i.hidden,
  from_file: "./types/scatter.json"
})))
categories.push({
  name: "Scatters",
  id: "scatter",
  icon: "scattered",
  parents: ["other"]
})

console.log(`${colors.bg.Cyan}  ${colors.Reset} Generating ${colors.fg.Cyan}Seasonals${colors.Reset} from ${colors.fg.Green}./types/seasonals/*.js${colors.Reset}`)
categories = categories.concat(require('./types/seasonals').map(c => {
  munzees = munzees.concat((c.scatters || []).map(i => ({
    name: i.name,
    icon: i.icon,
    id: i.id,

    scatter: i.scatter,
    capture_types: i.capture_types,
    capture_type_from: i.capture_type_from,
    ...(i.extra || {}),

    state: i.state,
    category: c.category,
    points: i.points,

    completion: "complete",
    from_file: "./types/seasonals/*.js"
  })))
  munzees = munzees.concat((c.specials || []).map(i => ({
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
    points: i.points,

    completion: "complete",
    from_file: "./types/seasonals/*.js"
  })))
  return {
    name: c.name,
    id: c.category,
    icon: c.icon || c.specials[0].icon,
    parents: ["seasonal_" + c.year],
    seasonal: {
      year: c.year,
      starts: new Date(c.starts).valueOf(),
      ends: new Date(c.ends).valueOf()
    }
  }
}));
var priority = 10;
for(var year of [2020,2019,2018,2017,2016,2015]) {
  categories.push({
    name: year+" Seasonal Specials",
    id: "seasonal_"+year,
    icon: categories.slice().sort((a, b) => (b.seasonal || {}).starts - (a.seasonal || {}).starts).find(i => i.parents.includes("seasonal_"+year)).icon,
    parents: priority==10?["seasonal", "root"]:["seasonal"],
    priority: priority
  })
  priority--;
}
categories.push({
  name: "Seasonal Specials",
  id: "seasonal",
  icon: "bouncing_specials_filter",
  parents: ["root", "bouncer"],
  priority: 7
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
  if (munzee.scatter && munzee.scatter.lands_on) {
    let lands_on = [];
    let index = 0;
    for (let host of munzee.scatter.lands_on) {
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
    munzee.scatter.lands_on = lands_on.filter(i => i !== undefined && i !== null);
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
  if (munzee.id === undefined) {
    console.log(`${colors.bg.Red}  ${colors.Reset} Missing ${colors.fg.Yellow}id${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
  }
  if (!munzee.category || !categories.find(i => i.id == munzee.category)) {
    console.log(`${colors.bg.Red}  ${colors.Reset} Invalid ${colors.fg.Yellow}category${colors.Reset} for ${colors.fg.Cyan}${munzee.name}${colors.Reset} from ${colors.fg.Green}${munzee.from_file}${colors.Reset}`)
  }
  if (munzee.points && typeof munzee.points == "string") {
    munzee.points = points[munzee.points];
  }

  delete munzee.from_file;
}
for (var munzee of munzees) {
  munzee.can_host = munzees.filter(i => i.bouncer && (i.bouncer.lands_on || []).includes(munzee.id)).map(i => i.id);
  if (munzee.can_host.length == 0) munzee.can_host = undefined;
  // munzee.cid = munzee.icon.replace(/[^a-zA-Z0-9]/g, '').replace(/munzee$/, '');
}

munzees.sort((a, b) => (a.id || 0) - (b.id || 0));

categories.sort((a, b) => (b.priority || 0) - (a.priority || 0));

var typekeys = {};

function g(icon) {
  if(icon.startsWith('https://munzee.global')) icon = icon.slice(49,-4);
  var x = decodeURIComponent(icon).replace(/[^a-zA-Z0-9]/g,'');
  if(x!=="munzee"&&x.endsWith('munzee')) return x.replace(/munzee$/,'')
  return x;
}

for (var munzee_index in munzees) {
  var munzee = munzees[munzee_index];
  munzee.cids = []
  munzees[munzee_index].x = Number(munzee_index);
  munzees[munzee_index].i = g(munzee.icon);
  for (var icon of [munzee.icon, ...munzee.alt_icons || []]) {
    typekeys[g(icon)] = Number(munzee_index);
  }
}

console.log(`${colors.bg.Green}${colors.fg.Black} Types Checked - Writing Types to Files... ${colors.Reset}`)

fs.writeFileSync('output/types.json', JSON.stringify(munzees, null, 2))
fs.writeFileSync('output/types.min.json', JSON.stringify(munzees))
fs.writeFileSync('../PaperZee/utils/db/types.json', JSON.stringify(munzees))
fs.writeFileSync('../FlameZee/functions/util/db/types.json', JSON.stringify(munzees))

console.log(`${colors.bg.Green}${colors.fg.Black} Types Written to Files - Writing Type Keys to Files... ${colors.Reset}`)

fs.writeFileSync('output/typekeys.json', JSON.stringify(typekeys, null, 2))
fs.writeFileSync('output/typekeys.min.json', JSON.stringify(typekeys))
fs.writeFileSync('../PaperZee/utils/db/typekeys.json', JSON.stringify(typekeys))
fs.writeFileSync('../FlameZee/functions/util/db/typekeys.json', JSON.stringify(typekeys))

console.log(`${colors.bg.Green}${colors.fg.Black} Type Keys Written to Files - Writing Categories to JSON... ${colors.Reset}`)

fs.writeFileSync('output/categories.json', JSON.stringify(categories, null, 2))
fs.writeFileSync('output/categories.min.json', JSON.stringify(categories))
fs.writeFileSync('../PaperZee/utils/db/categories.json', JSON.stringify(categories))
fs.writeFileSync('../FlameZee/functions/util/db/categories.json', JSON.stringify(categories))

console.log(`${colors.bg.Green}${colors.fg.Black} Categories Written to Files ${colors.Reset}`)

console.log(`${colors.bg.Cyan}${colors.fg.Black} Current Progress: ${munzees.length} / ${munzees.length + require('./types/NA.json').length} - ${Math.round((munzees.length) / (munzees.length + require('./types/NA.json').length) * 10000) / 100}% ${colors.Reset}`)
console.log(`${colors.bg.Yellow}${colors.fg.Black} Remaining of N/A: ${require('./types/NA.json').length} ${colors.Reset}`)