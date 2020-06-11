module.exports = [
  {
    "name": "Butterfly",
    "icon": "butterfly",
    "id": 1830,
    "state": "bouncer",
    "lands_on": ["skyland","farmer","farmerandwife","family","pottedplant","garden","field","peasplant","carrotplant","goldencarrotplant","tomatoplant","cornstalk",i=>(i.evolution&&["tulipseed","roseseed","carnationseed","lilyseed"].includes(i.evolution.base)&&i.evolution.stage>=3),i=>i.seasonal,"trail","munzee","virtual_rainbow"],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "butterflyegg"
      }
    }
  },
  {
    "name": "Morpho Butterfly",
    "icon": "morphobutterfly",
    "id": 1840,
    "state": "bouncer",
    "lands_on": ["skyland","farmer","farmerandwife","family","pottedplant","garden","field","peasplant","carrotplant","goldencarrotplant","tomatoplant","cornstalk",i=>(i.evolution&&["tulipseed","roseseed","carnationseed","lilyseed"].includes(i.evolution.base)&&i.evolution.stage>=3),i=>i.seasonal,"trail","munzee","virtual_rainbow"],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "butterflyegg"
      }
    }
  },
  {
    "name": "Monarch Butterfly",
    "icon": "monarchbutterfly",
    "id": 1841,
    "state": "bouncer",
    "lands_on": ["skyland","farmer","farmerandwife","family","pottedplant","garden","field","peasplant","carrotplant","goldencarrotplant","tomatoplant","cornstalk",i=>(i.evolution&&["tulipseed","roseseed","carnationseed","lilyseed"].includes(i.evolution.base)&&i.evolution.stage>=3),i=>i.seasonal,"trail","munzee","virtual_rainbow"],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "butterflyegg"
      }
    }
  },
  {
    "name": "Lime Butterfly",
    "icon": "limebutterfly",
    "id": 1842,
    "state": "bouncer",
    "lands_on": ["skyland","farmer","farmerandwife","family","pottedplant","garden","field","peasplant","carrotplant","goldencarrotplant","tomatoplant","cornstalk",i=>(i.evolution&&["tulipseed","roseseed","carnationseed","lilyseed"].includes(i.evolution.base)&&i.evolution.stage>=3),i=>i.seasonal,"trail","munzee","virtual_rainbow"],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "butterflyegg"
      }
    }
  },
  {
    "name": "Butterfly Host",
    "icon": "butterflyhost",
    "id": 1843,
    "state": "physical",
    "hosts": [1840,1841,1842]
  },
  {
    "name": "Butterfly Virtual Host",
    "icon": "butterfly_virtual_host",
    "id": 1844,
    "state": "virtual",
    "hosts": [1840,1841,1842]
  },
  {
    "name": "Frog",
    "icon": "frog",
    "id": 2067,
    "state": "bouncer",
    "lands_on": ["musclecar",i=>(i.evolution&&["seaweed","canoe","safaritruck"].includes(i.evolution.base)&&i.evolution.stage>=3),"earthmystery","watermystery","trail","munzee",i=>(i.virtual_colors||[]).includes("green")],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "frogegg"
      }
    }
  },
  {
    "name": "Tree Frog",
    "icon": "treefrog",
    "id": 2110,
    "state": "bouncer",
    "lands_on": ["skyland","musclecar",i=>(i.evolution&&["seaweed","canoe","safaritruck"].includes(i.evolution.base)&&i.evolution.stage>=3),"earthmystery","watermystery","trail","munzee",i=>(i.virtual_colors||[]).includes("green")],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "frogegg"
      }
    }
  },
  {
    "name": "Poison Dart Frog",
    "icon": "poisondartfrog",
    "id": 2111,
    "state": "bouncer",
    "lands_on": ["skyland","musclecar",i=>(i.evolution&&["seaweed","canoe","safaritruck"].includes(i.evolution.base)&&i.evolution.stage>=3),"earthmystery","watermystery","trail","munzee",i=>(i.virtual_colors||[]).includes("green")],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "frogegg"
      }
    }
  },
  {
    "name": "Tomato Frog",
    "icon": "tomatofrog",
    "id": 2112,
    "state": "bouncer",
    "lands_on": ["skyland","musclecar",i=>(i.evolution&&["seaweed","canoe","safaritruck"].includes(i.evolution.base)&&i.evolution.stage>=3),"earthmystery","watermystery","trail","munzee",i=>(i.virtual_colors||[]).includes("green")],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "frogegg"
      }
    }
  },
  {
    "name": "Frog Host",
    "icon": "froghost",
    "id": 2113,
    "state": "physical",
    "hosts": [2110,2111,2112]
  },
  {
    "name": "Frog Virtual Host",
    "icon": "frog_virtual_host",
    "id": 2114,
    "state": "virtual",
    "hosts": [2110,2111,2112]
  },
  {
    "name": "Hedgehog",
    "icon": "hedgehog",
    "id": 2427,
    "state": "bouncer",
    "lands_on": ["skyland","treehouse","earthmystery","icemystery","flatlou",i=>(i.category=="virtual"&&!['virtual','virtual_black','virtual_timberwolf','virtual_gray','virtual_silver'].includes(i.icon))],
    "extra": {
      "baby_animal": true
    }
  },
  {
    "name": "Polar Bear",
    "icon": "polarbear",
    "id": 2428,
    "state": "bouncer",
    "lands_on": ["skyland","treehouse","earthmystery","icemystery","flatlou",i=>(i.category=="virtual"&&!['virtual','virtual_black','virtual_timberwolf','virtual_gray','virtual_silver'].includes(i.icon))],
    "extra": {
      "baby_animal": true
    }
  },
  {
    "name": "Owlet",
    "icon": "owlet",
    "id": 2429,
    "state": "bouncer",
    "lands_on": ["skyland","treehouse","virtual","airmystery","electricmystery","flathammock"],
    "extra": {
      "baby_animal": true
    }
  },
  {
    "name": "Trojan Unicorn",
    "icon": "trojanunicorn",
    "id": "null_trojanunicorn",
    "state": "bouncer",
    "lands_on": ["mace","longsword","battleaxe","thehammer","crossbow","catapult"]
  }
]
