module.exports = [
  {
    "name": "Retired Unicorn",
    "icon": "retiredunicorn",
    "id": 1535,
    "state": "bouncer",
    "lands_on": ["munzee","shamrock"]
  },
  {
    "name": "Retired Leprechaun",
    "icon": "retiredleprechaun",
    "id": 1536,
    "state": "bouncer",
    "lands_on": ["munzee","shamrock"]
  },
  {
    "name": "Retired Dragon",
    "icon": "retireddragon",
    "id": 1537,
    "state": "bouncer",
    "lands_on": ["munzee","firemystery"]
  },
  {
    "name": "Retired Yeti",
    "icon": "retiredyeti",
    "id": 1538,
    "state": "bouncer",
    "lands_on": ["munzee","icemystery"]
  },
  {
    "name": "Retired Faun",
    "icon": "retiredfaun",
    "id": 1539,
    "state": "bouncer",
    "lands_on": ["munzee","earthmystery"]
  },
  {
    "name": "Retired Hydra",
    "icon": "retiredhydra",
    "id": 1540,
    "state": "bouncer",
    "lands_on": ["munzee","watermystery"]
  },
  {
    "name": "Retired Mermaid",
    "icon": "retiredmermaid",
    "id": 1541,
    "state": "bouncer",
    "lands_on": ["munzee","watermystery",(i: any) => i.category=="jewel"&&i.state=="physical"]
  },
  {
    "name": "Retired Pegasus",
    "icon": "retiredpegasus",
    "id": 1542,
    "state": "bouncer",
    "lands_on": [(i: any) => i.category=="virtual","airmystery","electricmystery"]
  },
  {
    "name": "Retired Cyclops",
    "icon": "retiredcyclops",
    "id": 1543,
    "state": "bouncer",
    "lands_on": [(i: any) => i.category=="jewel"&&i.id!=148]
  },
  {
    "name": "Retired Fairy",
    "icon": "retiredfairy",
    "id": 2051,
    "state": "bouncer",
    "lands_on": ["munzee","airmystery","mystery"]
  },
  {
    "name": "Retired Banshee",
    "icon": "retiredbanshee",
    "id": 2052,
    "state": "bouncer",
    "lands_on": ["munzee","shamrock","airmystery",(i: any) => (i.virtual_colors||[]).includes("black"),(i: any) => (i.virtual_colors||[]).includes("green")]
  },
  {
    "name": "Zombie Tuli",
    "icon": "zombietuli",
    "id": 2053,
    "state": "bouncer",
    "lands_on": ["munzee","firemystery"],
    "pouch": true,
    "duration": 6
  },
  {
    "name": "Zombie Vesi",
    "icon": "zombievesi",
    "id": 2054,
    "state": "bouncer",
    "lands_on": ["munzee","watermystery"],
    "pouch": true,
    "duration": 6
  },
  {
    "name": "Zombie Muru",
    "icon": "zombiemuru",
    "id": 2055,
    "state": "bouncer",
    "lands_on": ["munzee","earthmystery"],
    "pouch": true,
    "duration": 6
  }
]