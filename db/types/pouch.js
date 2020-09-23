module.exports = [
  {
    "name": "Tuli",
    "icon": "tuli",
    "id": 1240,
    "state": "bouncer",
    "base": "tuli",
    "stage": 1,
    "lands_on": ["treehouse","munzee","firemystery"],
    "set": "season_1",
    "points": "bouncer_pc_1"
  },
  {
    "name": "Tulimber",
    "icon": "tulimber",
    "id": 1241,
    "state": "bouncer",
    "base": "tuli",
    "stage": 2,
    "lands_on": ["munzee","firemystery"],
    "set": "season_1",
    "points": "bouncer_pc_2"
  },
  {
    "name": "Tuliferno",
    "icon": "tuliferno",
    "id": 1242,
    "state": "bouncer",
    "base": "tuli",
    "stage": 3,
    "lands_on": ["munzee","firemystery"],
    "set": "season_1",
    "points": "bouncer_pc_3"
  },
  {
    "name": "Vesi",
    "icon": "vesi",
    "id": 1370,
    "state": "bouncer",
    "base": "vesi",
    "stage": 1,
    "lands_on": ["treehouse","munzee","watermystery"],
    "set": "season_1",
    "points": "bouncer_pc_1"
  },
  {
    "name": "Vesial",
    "icon": "vesial",
    "id": 1371,
    "state": "bouncer",
    "base": "vesi",
    "stage": 2,
    "lands_on": ["munzee","watermystery"],
    "set": "season_1",
    "points": "bouncer_pc_2"
  },
  {
    "name": "Vesisaur",
    "icon": "vesisaur",
    "id": 1372,
    "state": "bouncer",
    "base": "vesi",
    "stage": 3,
    "lands_on": ["munzee","watermystery"],
    "set": "season_1",
    "points": "bouncer_pc_3"
  },
  {
    "name": "Water Pouch Creature Host",
    "icon": "waterpouchcreaturehost",
    "id": 1373,
    "state": "physical",
    "hosts": [1370,1371,1372]
  },
  {
    "name": "Muru",
    "icon": "muru",
    "id": 1638,
    "state": "bouncer",
    "base": "muru",
    "stage": 1,
    "lands_on": ["treehouse","munzee","earthmystery"],
    "set": "season_1",
    "points": "bouncer_pc_1"
  },
  {
    "name": "Muruchi",
    "icon": "muruchi",
    "id": 1639,
    "state": "bouncer",
    "base": "muru",
    "stage": 2,
    "lands_on": ["munzee","earthmystery"],
    "set": "season_1",
    "points": "bouncer_pc_2"
  },
  {
    "name": "Murutain",
    "icon": "murutain",
    "id": 1640,
    "state": "bouncer",
    "base": "muru",
    "stage": 3,
    "lands_on": ["munzee","earthmystery"],
    "set": "season_1",
    "points": "bouncer_pc_3"
  },
  {
    "name": "Earth Pouch Creature Host",
    "icon": "earthpouchcreaturehost",
    "id": 1641,
    "state": "physical",
    "hosts": [1638,1639,1640]
  },
  {
    "name": "Mitmegu",
    "icon": "mitmegu",
    "id": 1752,
    "state": "bouncer",
    "base": "mitmegu",
    "lands_on": ["treehouse","munzee","shamrock","scatter","premium","rockpaperscissors","watermystery","earthmystery","firemystery"],
    "set": "season_1",
    "points": {
      "capture": 200,
      "deploy": 250,
      "capon": 100
    }
  },
  {
    "name": "Jootmegu",
    "icon": "jootmegu",
    "id": 1753,
    "state": "bouncer",
    "base": "mitmegu",
    "lands_on": ["watermystery"],
    "set": "season_1",
    "points": "gen_megu"
  },
  {
    "name": "Rohimegu",
    "icon": "rohimegu",
    "id": 1754,
    "state": "bouncer",
    "base": "mitmegu",
    "lands_on": ["earthmystery"],
    "set": "season_1",
    "points": "gen_megu"
  },
  {
    "name": "Lokemegu",
    "icon": "lokemegu",
    "id": 1755,
    "state": "bouncer",
    "base": "mitmegu",
    "lands_on": ["firemystery"],
    "set": "season_1",
    "points": "gen_megu"
  },
  {
    "name": "Mitmegu Pouch Creature Host",
    "icon": "mitmegupouchcreaturehost",
    "id": 1756,
    "state": "physical",
    "hosts": [1752,1753,1754,1755]
  },
  {
    "name": "Gleaming Muru",
    "icon": "gleamingmuru",
    "id": 1850,
    "state": "bouncer",
    "base": "muru",
    "gleaming": true,
    "extra": {
      "capture_only": true
    },
    "stage": 1,
    "lands_on": ["treehouse","munzee","earthmystery"],
    "set": "season_1",
    "points": "bouncer_gpc_1"
  },
  {
    "name": "Gleaming Muruchi",
    "icon": "gleamingmuruchi",
    "id": 1851,
    "state": "bouncer",
    "base": "muru",
    "gleaming": true,
    "extra": {
      "capture_only": true
    },
    "stage": 2,
    "lands_on": ["munzee","earthmystery"],
    "set": "season_1",
    "points": "bouncer_gpc_2"
  },
  {
    "name": "Gleaming Murutain",
    "icon": "gleamingmurutain",
    "id": 1852,
    "state": "bouncer",
    "base": "muru",
    "gleaming": true,
    "extra": {
      "capture_only": true
    },
    "stage": 3,
    "lands_on": ["munzee","earthmystery"],
    "set": "season_1",
    "points": "bouncer_gpc_3"
  },
  {
    "name": "Gleaming Tuli",
    "icon": "gleamingtuli",
    "id": 1853,
    "state": "bouncer",
    "base": "tuli",
    "gleaming": true,
    "extra": {
      "capture_only": true
    },
    "stage": 1,
    "lands_on": ["treehouse","munzee","firemystery"],
    "set": "season_1",
    "points": "bouncer_gpc_1"
  },
  {
    "name": "Gleaming Tulimber",
    "icon": "gleamingtulimber",
    "id": 1854,
    "state": "bouncer",
    "base": "tuli",
    "gleaming": true,
    "extra": {
      "capture_only": true
    },
    "stage": 2,
    "lands_on": ["munzee","firemystery"],
    "set": "season_1",
    "points": "bouncer_gpc_2"
  },
  {
    "name": "Gleaming Tuliferno",
    "icon": "gleamingtuliferno",
    "id": 1855,
    "state": "bouncer",
    "base": "tuli",
    "gleaming": true,
    "extra": {
      "capture_only": true
    },
    "stage": 3,
    "lands_on": ["munzee","firemystery"],
    "set": "season_1",
    "points": "bouncer_gpc_3"
  },
  {
    "name": "Gleaming Vesi",
    "icon": "gleamingvesi",
    "id": 1856,
    "state": "bouncer",
    "base": "vesi",
    "gleaming": true,
    "extra": {
      "capture_only": true
    },
    "stage": 1,
    "lands_on": ["treehouse","munzee","watermystery"],
    "set": "season_1",
    "points": "bouncer_gpc_1"
  },
  {
    "name": "Gleaming Vesial",
    "icon": "gleamingvesial",
    "id": 1857,
    "state": "bouncer",
    "base": "vesi",
    "gleaming": true,
    "extra": {
      "capture_only": true
    },
    "stage": 2,
    "lands_on": ["munzee","watermystery"],
    "set": "season_1",
    "points": "bouncer_gpc_2"
  },
  {
    "name": "Gleaming Vesisaur",
    "icon": "gleamingvesisaur",
    "id": 1858,
    "state": "bouncer",
    "base": "vesi",
    "gleaming": true,
    "extra": {
      "capture_only": true
    },
    "stage": 3,
    "lands_on": ["munzee","watermystery"],
    "set": "season_1",
    "points": "bouncer_gpc_3"
  },
  {
    "name": "Pimedus",
    "icon": "pimedus",
    "id": 1919,
    "state": "bouncer",
    "lands_on": ["skyland","treehouse","munzee",":reseller",i=>i.zodiac=="chinese","virtual_sapphire","briefcase","thehammer","crossbow","catapult"],
    "set": "season_1"
  },
  {
    "name": "Pimedus Host",
    "icon": "pimedushost",
    "id": 1920,
    "state": "physical",
    "hosts": [1919]
  },
  {
    "name": "Pimedus Virtual Host",
    "icon": "pimedus_virtual_host",
    "id": 1921,
    "state": "virtual",
    "hosts": [1919]
  },
  {
    "name": "Puffle",
    "icon": "puffle",
    "id": 2240,
    "state": "bouncer",
    "base": "puffle",
    "stage": 1,
    "lands_on": ["skyland",":virtual","airmystery"],
    "set": "season_2",
    "points": "bouncer_pc_1"
  },
  {
    "name": "Pufrain",
    "icon": "pufrain",
    "id": 2241,
    "state": "bouncer",
    "base": "puffle",
    "stage": 2,
    "lands_on": [":virtual","airmystery"],
    "set": "season_2",
    "points": "bouncer_pc_2"
  },
  {
    "name": "Puflawn",
    "icon": "puflawn",
    "id": 2242,
    "state": "bouncer",
    "base": "puffle",
    "stage": 3,
    "lands_on": [":virtual","airmystery"],
    "set": "season_2",
    "points": "bouncer_pc_3"
  },
  {
    "name": "Air Pouch Creature Host",
    "icon": "airpouchcreaturehost",
    "id": 2243,
    "state": "virtual",
    "hosts": [2240,2241,2242]
  },
  {
    "name": "Magnetus",
    "icon": "magnetus",
    "id": 2306,
    "state": "bouncer",
    "lands_on": ["skyland","treehouse","munzee","airmystery",i=>(i.virtual_colors||[]).includes("blue"),i=>(i.virtual_colors||[]).includes("red"),"watermystery","joystickvirtual","joystick","virtual_yellow","virtual_goldenrod","virtual_dandelion"],
    "set": "season_2"
  },
  {
    "name": "Topaas",
    "icon": "topaas",
    "id": 2366,
    "state": "bouncer",
    "funfinity": true,
    "lands_on": ["treehouse","munzee","earthmystery","topaz","treehouse"],
    "set": "funfinity",
    "points": "funfinity"
  },
  {
    "name": "Ametust",
    "icon": "ametust",
    "id": 2367,
    "state": "bouncer",
    "funfinity": true,
    "lands_on": ["skyland",":virtual","earthmystery","virtual_amethyst","treehouse"],
    "set": "funfinity",
    "points": "funfinity"
  },
  {
    "name": "Oniks",
    "icon": "oniks",
    "id": 2368,
    "state": "bouncer",
    "funfinity": true,
    "lands_on": ["skyland",":virtual","earthmystery","virtual_onyx","treehouse"],
    "set": "funfinity",
    "points": "funfinity"
  },
  {
    "name": "Elekter",
    "icon": "elekter",
    "id": 2407,
    "state": "bouncer",
    "base": "elekter",
    "stage": 1,
    "lands_on": ["skyland",":virtual","electricmystery"],
    "set": "season_2",
    "points": "ouncer_pc_1"
  },
  {
    "name": "Elekjoud",
    "icon": "elekjoud",
    "id": 2408,
    "state": "bouncer",
    "base": "elekter",
    "stage": 2,
    "lands_on": [":virtual","electricmystery"],
    "set": "season_2",
    "points": "ouncer_pc_2"
  },
  {
    "name": "Elektrivool",
    "icon": "elektrivool",
    "id": 2409,
    "state": "bouncer",
    "base": "elekter",
    "stage": 3,
    "lands_on": [":virtual","electricmystery"],
    "set": "season_2",
    "points": "ouncer_pc_3"
  },
  {
    "name": "Teemant",
    "icon": "teemant",
    "id": 2369,
    "state": "bouncer",
    "funfinity": true,
    "lands_on": ["treehouse","munzee","earthmystery","diamond"],
    "set": "funfinity",
    "points": "funfinity"
  },
  {
    "name": "Smaragd",
    "icon": "smaragd",
    "id": 2370,
    "state": "bouncer",
    "funfinity": true,
    "lands_on": ["skyland",i=>(i.virtual_colors||[]).includes("green"),"airmystery","virtual_emerald"],
    "set": "funfinity",
    "points": "funfinity"
  },
  {
    "name": "Akvamariin",
    "icon": "akvamariin",
    "id": "null_akvamariin",
    "state": "bouncer",
    "funfinity": true,
    "lands_on": ["treehouse","munzee","earthmystery","aquamarine"],
    "set": "funfinity",
    "points": "funfinity"
  },
  {
    "name": "Rubiin",
    "icon": "rubiin",
    "id": "null_rubiin",
    "state": "bouncer",
    "funfinity": true,
    "lands_on": ["treehouse","munzee","firemystery","ruby"],
    "set": "funfinity",
    "points": "funfinity"
  },
  {
    "name": "Safiir",
    "icon": "safiir",
    "id": "null_safiir",
    "state": "bouncer",
    "funfinity": true,
    "lands_on": ["skyland",":virtual","airmystery","virtual_sapphire"],
    "set": "funfinity",
    "points": "funfinity"
  }
]
