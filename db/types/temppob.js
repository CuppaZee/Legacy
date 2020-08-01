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
    },
    "hidden": true
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
    },
    "hidden": true
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
  },
  {
    "name": "Turtle",
    "icon": "turtle",
    "id": "null_turtle",
    "state": "bouncer",
    "lands_on": ["treehouse","skyland",i=>(i.evolution&&["seaweed","canoe","safaritruck"].includes(i.evolution.base)),"earthmystery","watermystery","munzee",i=>(i.virtual_colors||[]).includes("green")],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "turtleegg"
      }
    },
    "hidden": true
  },
  {
    "name": "Sea Turtle",
    "icon": "seaturtle",
    "id": "null_seaturtle",
    "state": "bouncer",
    "lands_on": ["treehouse","skyland",i=>(i.evolution&&["seaweed","canoe","safaritruck"].includes(i.evolution.base)),"earthmystery","watermystery","munzee",i=>(i.virtual_colors||[]).includes("green")],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "turtleegg"
      }
    }
  },
  {
    "name": "Snapping Turtle",
    "icon": "snappingturtle",
    "id": "null_snappingturtle",
    "state": "bouncer",
    "lands_on": ["treehouse","skyland",i=>(i.evolution&&["seaweed","canoe","safaritruck"].includes(i.evolution.base)),"earthmystery","watermystery","munzee",i=>(i.virtual_colors||[]).includes("green")],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "turtleegg"
      }
    }
  },
  {
    "name": "Taekwondo Tortoise",
    "icon": "taekwondotortoise",
    "id": "null_taekwondotortoise",
    "state": "bouncer",
    "lands_on": ["treehouse","skyland",i=>(i.evolution&&["seaweed","canoe","safaritruck"].includes(i.evolution.base)),"earthmystery","watermystery","munzee",i=>(i.virtual_colors||[]).includes("green")],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "turtleegg"
      }
    }
  },
  {
    "name": "Jellyfish",
    "icon": "jellyfish",
    "id": "null_jellyfish",
    "state": "bouncer",
    "lands_on": ["treehouse","skyland",i=>(i.evolution&&["seaweed","canoe","safaritruck"].includes(i.evolution.base)),"earthmystery","watermystery","munzee",i=>(i.virtual_colors||[]).includes("green")],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "planulalarva"
      }
    },
    "hidden": true
  },
  {
    "name": "Box Jellyfish",
    "icon": "boxjellyfish",
    "id": "null_boxjellyfish",
    "state": "bouncer",
    "lands_on": ["treehouse","skyland",i=>(i.evolution&&["seaweed","canoe","safaritruck"].includes(i.evolution.base)),"earthmystery","watermystery","munzee",i=>(i.virtual_colors||[]).includes("green")],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "planulalarva"
      }
    }
  },
  {
    "name": "Golden Jellyfish",
    "icon": "goldenjellyfish",
    "id": "null_goldenjellyfish",
    "state": "bouncer",
    "lands_on": ["treehouse","skyland",i=>(i.evolution&&["seaweed","canoe","safaritruck"].includes(i.evolution.base)),"earthmystery","watermystery","munzee",i=>(i.virtual_colors||[]).includes("green")],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "planulalarva"
      }
    }
  },
  {
    "name": "PB & Jellyfish",
    "icon": "pb&jellyfish",
    "id": "null_pb&jellyfish",
    "state": "bouncer",
    "lands_on": ["treehouse","skyland",i=>(i.evolution&&["seaweed","canoe","safaritruck"].includes(i.evolution.base)),"earthmystery","watermystery","munzee",i=>(i.virtual_colors||[]).includes("green")],
    "extra": {
      "evolution": {
        "set": "nature",
        "stage": 5,
        "base": "planulalarva"
      }
    }
  },
  {
    "name": "Baby Fox",
    "icon": "babyfox",
    "id": 2561,
    "state": "bouncer",
    "lands_on": ["skyland",":virtual","airmystery","poicampground"],
    "extra": {
      "baby_animal": true,
      "alt_icons": [
        "undefined"
      ]
    }
  },
  {
    "name": "Baby Moose",
    "icon": "babymoose",
    "id": "null_babymoose",
    "state": "bouncer",
    "lands_on": ["treehouse","munzee","earthmystery","watermystery"],
    "extra": {
      "baby_animal": true
    }
  },
  {
    "name": "Baby Squirrel",
    "icon": "babysquirrel",
    "id": "null_babysquirrel",
    "state": "bouncer",
    "lands_on": ["treehouse","munzee","earthmystery","watermystery","skyland",":virtual","airmystery","poicampground"],
    "extra": {
      "baby_animal": true
    }
  }
]
