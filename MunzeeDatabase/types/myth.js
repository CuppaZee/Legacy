module.exports = [
  {
    "name": "The Unicorn",
    "icon": "theunicorn",
    "id": 505,
    "state": "bouncer",
    "type": "original",
    "lands_on": ["treehouse","munzee","shamrock"]
  },
  {
    "name": "Unicorn Host",
    "icon": "unicornhost",
    "id": 506,
    "state": "physical",
    "hosts": [505]
  },
  {
    "name": "Leprechaun",
    "icon": "leprechaun",
    "id": 508,
    "state": "bouncer",
    "type": "original",
    "lands_on": ["treehouse","munzee","shamrock"]
  },
  {
    "name": "Leprechaun Host",
    "icon": "leprechaunhost",
    "id": 509,
    "state": "physical",
    "hosts": [508,1646,1647]
  },
  {
    "name": "Dragon",
    "icon": "dragon",
    "id": 573,
    "state": "bouncer",
    "type": "original",
    "lands_on": ["treehouse","munzee","firemystery"]
  },
  {
    "name": "Dragon Host",
    "icon": "dragonhost",
    "id": 574,
    "state": "physical",
    "hosts": [573,1874,1875]
  },
  {
    "name": "Yeti",
    "icon": "yeti",
    "id": 725,
    "state": "bouncer",
    "type": "original",
    "lands_on": ["treehouse","munzee","icemystery"]
  },
  {
    "name": "Yeti Host",
    "icon": "yetihost",
    "id": 726,
    "state": "physical",
    "hosts": [725]
  },
  {
    "name": "Faun",
    "icon": "faun",
    "id": 853,
    "state": "bouncer",
    "type": "classical",
    "lands_on": ["treehouse","munzee","earthmystery"]
  },
  {
    "name": "Faun Host",
    "icon": "faunhost",
    "id": 854,
    "state": "physical",
    "hosts": [853.1997,1998]
  },
  {
    "name": "Hydra",
    "icon": "hydra",
    "id": 953,
    "state": "bouncer",
    "type": "classical",
    "lands_on": ["treehouse","munzee","watermystery"]
  },
  {
    "name": "Hydra Host",
    "icon": "hydrahost",
    "id": 954,
    "state": "physical",
    "hosts": [953,2252,2253]
  },
  {
    "name": "Pegasus",
    "icon": "pegasus",
    "id": 1100,
    "state": "bouncer",
    "type": "classical",
    "lands_on": ["skyland",i=>i.category=="virtual","airmystery","electricmystery"]
  },
  {
    "name": "Pegasus Host",
    "icon": "pegasushost",
    "id": 1101,
    "state": "virtual",
    "hosts": [1100,1995,1996]
  },
  {
    "name": "Cyclops",
    "icon": "cyclops",
    "id": 1168,
    "state": "bouncer",
    "type": "classical",
    "lands_on": ["skyland","treehouse",i=>(i.category=="jewel"&&i.id!=148)]
  },
  {
    "name": "Cyclops Host",
    "icon": "cyclopshost",
    "id": 1169,
    "state": "physical",
    "hosts": [1168]
  },
  {
    "name": "Cyclops Virtual Host",
    "icon": "cyclops_virtual_host",
    "id": 1170,
    "state": "virtual",
    "hosts": [1168]
  },
  {
    "name": "Mermaid",
    "icon": "mermaid",
    "id": 1378,
    "state": "bouncer",
    "type": "mirror",
    "lands_on": ["treehouse","munzee","watermystery",i=>(i.category=="jewel"&&i.state=="physical")]
  },
  {
    "name": "Mermaid Host",
    "icon": "mermaidhost",
    "id": 1379,
    "state": "physical",
    "hosts": [1378,1648,1649]
  },
  {
    "name": "Fairy",
    "icon": "fairy",
    "id": 1544,
    "state": "bouncer",
    "type": "mirror",
    "lands_on": ["skyland","treehouse","munzee","airmystery","mystery"]
  },
  {
    "name": "Fairy Host",
    "icon": "fairyhost",
    "id": 1545,
    "state": "physical",
    "hosts": [1544]
  },
  {
    "name": "Fairy Virtual Host",
    "icon": "fairy_virtual_host",
    "id": 1546,
    "state": "virtual",
    "hosts": [1544]
  },
  {
    "name": "Dryad Fairy",
    "icon": "dryadfairy",
    "id": 1602,
    "state": "bouncer",
    "type": "mirror",
    "lands_on": ["skyland","treehouse","munzee","airmystery","earthmystery"]
  },
  {
    "name": "Wildfire Fairy",
    "icon": "wildfirefairy",
    "id": 1603,
    "state": "bouncer",
    "type": "mirror",
    "lands_on": ["skyland","treehouse","munzee","airmystery","firemystery"]
  },
  {
    "name": "Battle Unicorn",
    "icon": "battleunicorn",
    "id": 1604,
    "state": "bouncer",
    "type": "original",
    "lands_on": ["treehouse","munzee","mace","longsword","battleaxe","thehammer"]
  },
  {
    "name": "Hippocamp Unicorn",
    "icon": "hippocampunicorn",
    "id": 1605,
    "state": "bouncer",
    "type": "original",
    "lands_on": ["treehouse","munzee","watermystery","icemystery"]
  },
  {
    "name": "Dwarf Leprechaun",
    "icon": "dwarfleprechaun",
    "id": 1646,
    "state": "bouncer",
    "type": "original",
    "lands_on": ["skyland","treehouse","munzee",i=>i.category=="clan"]
  },
  {
    "name": "Goblin Leprechaun",
    "icon": "goblinleprechaun",
    "id": 1647,
    "state": "bouncer",
    "type": "original",
    "lands_on": ["skyland","treehouse","munzee",i=>(i.category=="jewel"&&i.id!=148)]
  },
  {
    "name": "Hot Spring Mermaid",
    "icon": "hotspringmermaid",
    "id": 1648,
    "state": "bouncer",
    "type": "mirror",
    "lands_on": ["treehouse","munzee","watermystery","firemystery"]
  },
  {
    "name": "Melusine Mermaid",
    "icon": "melusinemermaid",
    "id": 1649,
    "state": "bouncer",
    "type": "mirror",
    "lands_on": ["skyland","treehouse","munzee","watermystery","airmystery"]
  },
  {
    "name": "Mermaid Virtual Host",
    "icon": "mermaid_virtual_host",
    "id": 1650,
    "state": "virtual",
    "hosts": [1649]
  },
  {
    "name": "Leprechaun Virtual Host",
    "icon": "leprechaun_virtual_host",
    "id": 1651,
    "state": "virtual",
    "hosts": [1646,1647]
  },
  {
    "name": "Banshee",
    "icon": "banshee",
    "id": 1827,
    "state": "bouncer",
    "type": "mirror",
    "lands_on": ["skyland","treehouse","munzee","shamrock","airmystery",i=>(i.virtual_colors||[]).includes("black"),i=>(i.virtual_colors||[]).includes("green")]
  },
  {
    "name": "Banshee Host",
    "icon": "bansheehost",
    "id": 1828,
    "state": "physical",
    "hosts": [1827,2254,2255]
  },
  {
    "name": "Banshee Virtual Host",
    "icon": "banshee_virtual_host",
    "id": 1829,
    "state": "virtual",
    "hosts": [1827,2254,2255]
  },
  {
    "name": "Chinese Dragon",
    "icon": "chinesedragon",
    "id": 1874,
    "state": "bouncer",
    "type": "original",
    "lands_on": ["skyland","treehouse","munzee","firemystery","airmystery",i=>i.zodiac=="chinese"]
  },
  {
    "name": "Wyvern Dragon",
    "icon": "wyverndragon",
    "id": 1875,
    "state": "bouncer",
    "type": "original",
    "lands_on": ["skyland","treehouse","munzee","airmystery","virtual_amethyst",i=>(i.evolution&&i.evolution.base=="coin")]
  },
  {
    "name": "Lycanthrope Yeti",
    "icon": "lycanthropeyeti",
    "id": 1876,
    "state": "bouncer",
    "type": "original",
    "lands_on": ["treehouse","munzee","earthmystery","firemystery",i=>i.zodiac=="western"]
  },
  {
    "name": "Reptoid Yeti",
    "icon": "reptoidyeti",
    "id": 1877,
    "state": "bouncer",
    "type": "original",
    "lands_on": ["treehouse","munzee","earthmystery","watermystery"]
  },
  {
    "name": "Dragon Virtual Host",
    "icon": "dragon_virtual_host",
    "id": 1878,
    "state": "virtual",
    "hosts": [1874,1875]
  },
  {
    "name": "Griffin Pegasus",
    "icon": "griffinpegasus",
    "id": 1995,
    "state": "bouncer",
    "type": "classical",
    "lands_on": ["skyland","treehouse","munzee",i=>i.category=="jewel","airmystery",i=>(i.evolution&&i.evolution.base=="lioncub")]
  },
  {
    "name": "Alicorn Pegasus",
    "icon": "alicornpegasus",
    "id": 1996,
    "state": "bouncer",
    "type": "classical",
    "lands_on": ["skyland","treehouse",i=>i.category=="virtual","airmystery","shamrock"]
  },
  {
    "name": "Centaur Faun",
    "icon": "centaurfaun",
    "id": 1997,
    "state": "bouncer",
    "type": "classical",
    "lands_on": ["skyland","treehouse","munzee","earthmystery",i=>i.category=="clan"]
  },
  {
    "name": "Krampus Faun",
    "icon": "krampusfaun",
    "id": 1998,
    "state": "bouncer",
    "type": "classical",
    "lands_on": ["skyland","treehouse","munzee","earthmystery","icemystery",i=>(i.evolution&&i.evolution.base=="farmer")]
  },
  {
    "name": "Pegasus Physical Host",
    "icon": "pegasusphysicalhost",
    "id": 1999,
    "state": "physical",
    "hosts": [1995,1996]
  },
  {
    "name": "Faun Virtual Host",
    "icon": "faunvirtualhost",
    "id": 2000,
    "state": "virtual",
    "hosts": [1997,1998]
  },
  {
    "name": "Nymph",
    "icon": "nymph",
    "id": 2118,
    "state": "bouncer",
    "type": "mirror",
    "lands_on": ["skyland","treehouse","munzee","earthmystery",i=>(i.virtual_colors||[]).includes("brown"),i=>(i.virtual_colors||[]).includes("green")]
  },
  {
    "name": "Nymph Host",
    "icon": "nymphhost",
    "id": 2119,
    "state": "physical",
    "hosts": [2118]
  },
  {
    "name": "Nymph Virtual Host",
    "icon": "nymph_virtual_host",
    "id": 2120,
    "state": "virtual",
    "hosts": [2118]
  },
  {
    "name": "Cerberus Hydra",
    "icon": "cerberushydra",
    "id": 2252,
    "state": "bouncer",
    "type": "classical",
    "lands_on": ["skyland","treehouse","munzee","watermystery","firemystery"]
  },
  {
    "name": "Cthulhu Hydra",
    "icon": "cthulhuhydra",
    "id": 2253,
    "state": "bouncer",
    "type": "classical",
    "lands_on": ["skyland","treehouse","munzee","watermystery","airmystery"]
  },
  {
    "name": "Harpy Banshee",
    "icon": "harpybanshee",
    "id": 2254,
    "state": "bouncer",
    "type": "mirror",
    "lands_on": ["skyland","treehouse","munzee","shamrock","airmystery",i=>i.category=="jewel"]
  },
  {
    "name": "Witch Banshee",
    "icon": "witchbanshee",
    "id": 2255,
    "state": "bouncer",
    "type": "mirror",
    "lands_on": ["skyland","treehouse","munzee","airmystery","firemystery",i=>(i.evolution&&["tomatoseed","cornseed","goldencarrotseed","carrotseed","peasseed","farmer","tulipseed","roseseed","lilyseed","carnationseed"].includes(i.evolution.base))]
  },
  {
    "name": "Minotaur Cyclops",
    "icon": "minotaurcyclops",
    "id": 2477,
    "state": "bouncer",
    "type": "classical",
    "lands_on": ["treehouse","munzee",i=>i.category=="jewel",i=>i.weapon=="clan","rockpaperscissors"]
  },
  {
    "name": "Balor Cyclops",
    "icon": "balorcyclops",
    "id": 2478,
    "state": "bouncer",
    "type": "classical",
    "lands_on": ["treehouse","munzee","shamrock","electricmystery"]
  },
  {
    "name": "Vampire Nymph",
    "icon": "vampirenymph",
    "id": 2479,
    "state": "bouncer",
    "type": "mirror",
    "lands_on": ["treehouse","skyland","munzee","earthmystery",i=>(i.virtual_colors||[]).includes("red"),i=>(i.virtual_colors||[]).includes("green"),"tomato",i=>(i.evolution&&i.evolution.base=="farmer")]
  },
  {
    "name": "Elf Nymph",
    "icon": "elfnymph",
    "id": 2480,
    "state": "bouncer",
    "type": "mirror",
    "lands_on": ["treehouse","munzee","earthmystery",i=>i.weapon=="clan",i=>(i.virtual_colors||[]).includes("green"),"virtual"]
  }
]