module.exports = [
  {
    "name": "Rainbow Unicorn",
    "icon": "rainbowunicorn",
    "id": 1118,
    "state": "bouncer",
    "lands_on": ["munzee","shamrock"]
  },
  {
    "name": "Gnome Leprechaun",
    "icon": "gnomeleprechaun",
    "id": 1151,
    "state": "bouncer",
    "lands_on": ["munzee","shamrock","earthmystery"]
  },
  {
    "name": "Ice Dragon",
    "icon": "icedragon",
    "id": 1164,
    "state": "bouncer",
    "lands_on": ["munzee","firemystery","icemystery"]
  },
  {
    "name": "Sasquatch Yeti",
    "icon": "sasquatchyeti",
    "id": 1210,
    "state": "bouncer",
    "lands_on": ["munzee","icemystery","earthmystery"]
  },
  {
    "name": "Fire Pegasus",
    "icon": "firepegasus",
    "id": 1229,
    "state": "bouncer",
    "lands_on": [":virtual","airmystery","firemystery"]
  },
  {
    "name": "Fire Pegasus Physical Host",
    "icon": "firepegasusphysicalhost",
    "id": 1232,
    "state": "physical",
    "hosts": [1229]
  },
  {
    "name": "Cherub",
    "icon": "cherub",
    "id": 1237,
    "state": "bouncer",
    "lands_on": [":virtual","airmystery","earthmystery"]
  },
  {
    "name": "Cherub Virtual Host",
    "icon": "cherub_virtual_host",
    "id": 1238,
    "state": "virtual",
    "hosts": [1237]
  },
  {
    "name": "Ogre",
    "icon": "ogre",
    "id": 1268,
    "state": "bouncer",
    "lands_on": ["munzee",":jewel","mace","longsword","battleaxe","thehammer","crossbow"]
  },
  {
    "name": "Ogre Host",
    "icon": "ogrehost",
    "id": 1269,
    "state": "physical",
    "hosts": [1268]
  },
  {
    "name": "Ogre Virtual Host",
    "icon": "ogre_virtual_host",
    "id": 1270,
    "state": "virtual",
    "hosts": [1268]
  },
  {
    "name": "Chimera",
    "icon": "chimera",
    "id": 1329,
    "state": "bouncer",
    "lands_on": ["munzee",":virtual","shamrock",i=>i.elemental,":jewel",":clan"]
  },
  {
    "name": "Chimera Virtual Host",
    "icon": "chimera_virtual_host",
    "id": 1330,
    "state": "virtual",
    "hosts": [1329]
  },
  {
    "name": "Siren",
    "icon": "siren",
    "id": 1485,
    "state": "bouncer",
    "lands_on": ["munzee","watermystery","icemystery"]
  },
  {
    "name": "Fairy Godmother",
    "icon": "fairygodmother",
    "id": 1630,
    "state": "bouncer",
    "lands_on": ["munzee","mystery",":virtual","airmystery",":jewel"]
  },
  {
    "name": "Hadavale",
    "icon": "hadavale",
    "id": 1745,
    "state": "bouncer",
    "lands_on": ["icemystery","premium","shamrock","mystery",":reseller",i=>(i.evolution&&i.evolution.stage==1),"airmystery"]
  },
  {
    "name": "Hadavale Host",
    "icon": "hadavalehost",
    "id": 1746,
    "state": "physical",
    "hosts": [1745]
  },
  {
    "name": "Hadavale Virtual Host",
    "icon": "hadavale_virtual_host",
    "id": 1747,
    "state": "virtual",
    "hosts": [1745]
  },
  {
    "name": "Gorgon",
    "icon": "gorgon",
    "id": 1929,
    "state": "bouncer",
    "lands_on": ["munzee","premium","shamrock",i=>i.zodiac=="western",":jewel","virtual_gold","virtual_yellow","virtual_goldenrod","virtual_dandelion"]
  },
  {
    "name": "Mother Earth",
    "icon": "motherearth",
    "id": 2337,
    "state": "bouncer",
    "lands_on": ["munzee","shamrock",i=>i.elemental,i=>(i.virtual_colors||[]).includes('brown'),i=>(i.virtual_colors||[]).includes('green')]
  }
]