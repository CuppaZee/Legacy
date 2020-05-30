module.exports = [
  {
    "name": "Knight's Armor 2019",
    "category": "knightsarmor2019",
    "year": 2019,
    "starts": "2019-09-20 05:01",
    "ends": "2019-10-06 04:59",
    "specials": [
      {
        "name": "Knight's Helmet 2019",
        "icon": "knight'shelmet2019",
        "id": 2139,
        "duration": 6,
        "lands_on": [":virtual","crossbow","catapult"]
      },
      {
        "name": "Knight's Left Gauntlet 2019",
        "icon": "knight'sleftgauntlet2019",
        "id": 2140,
        "duration": 6,
        "lands_on": [":virtual","crossbow","catapult"]
      },
      {
        "name": "Knight's Right Gauntlet 2019",
        "icon": "knight'srightgauntlet2019",
        "id": 2141,
        "duration": 6,
        "lands_on": [":virtual","crossbow","catapult"]
      },
      {
        "name": "Knight's Breastplate 2019",
        "icon": "knight'sbreastplate2019",
        "id": 2142,
        "duration": 6,
        "lands_on": ["munzee","mace","longsword","battleaxe","thehammer"]
      },
      {
        "name": "Knight's Left Boot 2019",
        "icon": "knight'sleftboot2019",
        "id": 2143,
        "duration": 6,
        "lands_on": ["munzee","mace","longsword","battleaxe","thehammer"]
      },
      {
        "name": "Knight's Right Boot 2019",
        "icon": "knight'srightboot2019",
        "id": 2144,
        "duration": 6,
        "lands_on": ["munzee","mace","longsword","battleaxe","thehammer"]
      }
    ]
  },
  {
    "name": "MH-Qlue 2019",
    "category": "mhqlue2019",
    "year": 2019,
    "starts": "2019-10-22 05:01",
    "ends": "2019-11-06 05:59",
    "specials": [
      {
        "name": "MH-Qlue",
        "icon": "mh-qlue",
        "id": 2209,
        "duration": 6,
        "lands_on": ["munzee","firemystery","icemystery","watermystery","earthmystery","mystery"],
        "scatters": {
          "radius": 700,
          "types": [2210,2211,2212],
          "min": 3,
          "max": 3
        }
      }
    ],
    "scatters": [
      {
        "name": "Suspect Card",
        "icon": "suspectcard",
        "id": 2210,
        "state": "virtual",
        "scatter": {
          "duration": 1,
          "standalone": true
        },
        "capture_types": [
          2213,
          2214,
          2215,
          2216
        ]
      },
      {
        "name": "Weapon Card",
        "icon": "weaponcard",
        "id": 2211,
        "state": "virtual",
        "scatter": {
          "duration": 1,
          "standalone": true
        },
        "capture_types": [
          2217,
          2218,
          2219,
          2220
        ]
      },
      {
        "name": "Crime Scene Card",
        "icon": "crimescenecard",
        "id": 2212,
        "state": "virtual",
        "scatter": {
          "duration": 1,
          "standalone": true
        },
        "capture_types": [
          2221,
          2222,
          2223,
          2224
        ]
      },
      {
        "name": "University Professor Corn",
        "icon": "universityprofessorcorn",
        "id": 2213,
        "state": "virtual",
        "capture_type_from": 2210
      },
      {
        "name": "Mister Zee",
        "icon": "misterzee",
        "id": 2214,
        "state": "virtual",
        "capture_type_from": 2210
      },
      {
        "name": "Mademoiselle Eventa",
        "icon": "mademoiselleeventa",
        "id": 2215,
        "state": "virtual",
        "capture_type_from": 2210
      },
      {
        "name": "General Green E",
        "icon": "generalgreene",
        "id": 2216,
        "state": "virtual",
        "capture_type_from": 2210
      },
      {
        "name": "Ban Hammer Card",
        "icon": "banhammercard",
        "id": 2217,
        "state": "virtual",
        "capture_type_from": 2211
      },
      {
        "name": "External Battery Card",
        "icon": "externalbatterycard",
        "id": 2218,
        "state": "virtual",
        "capture_type_from": 2211
      },
      {
        "name": "Unicorn Horn Card",
        "icon": "unicornhorncard",
        "id": 2219,
        "state": "virtual",
        "capture_type_from": 2211
      },
      {
        "name": "Globe Card",
        "icon": "globecard",
        "id": 2220,
        "state": "virtual",
        "capture_type_from": 2211
      },
      {
        "name": "The Production Room",
        "icon": "theproductionroom",
        "id": 2221,
        "state": "virtual",
        "capture_type_from": 2212
      },
      {
        "name": "The Videocast Studio",
        "icon": "thevideocaststudio",
        "id": 2222,
        "state": "virtual",
        "capture_type_from": 2212
      },
      {
        "name": "The Munzee Museum",
        "icon": "themunzeemuseum",
        "id": 2223,
        "state": "virtual",
        "capture_type_from": 2212
      },
      {
        "name": "The CzeeO's Office",
        "icon": "theczeeo'soffice",
        "id": 2224,
        "state": "virtual",
        "capture_type_from": 2212
      }
    ]
  },
  {
    "name": "Monster Nomads 2019",
    "category": "monsternomad2019",
    "year": 2019,
    "starts": "2019-10-24 05:01",
    "ends": "2019-11-03 04:59",
    "specials": [
      {
        "name": "Mummy Hand",
        "icon": "mummyhand",
        "id": 2228,
        "duration": 6,
        "lands_on": ["munzee","premium"]
      },
      {
        "name": "Werewolf Paw",
        "icon": "werewolfpaw",
        "id": 2229,
        "duration": 6,
        "lands_on": ["munzee","premium"]
      },
      {
        "name": "Frankenstein's Hand",
        "icon": "frankenstein'shand",
        "id": 2230,
        "duration": 6,
        "lands_on": ["munzee","premium"]
      }
    ]
  },
  {
    "name": "Origami Day 2019",
    "category": "origamiday2019",
    "year": 2019,
    "starts": "2019-11-08 21:00",
    "ends": "2019-11-18 05:59",
    "specials": [
      {
        "name": "Origami Crane",
        "icon": "origamicrane",
        "id": 2246,
        "duration": 6,
        "lands_on": [":virtual","flatrob"]
      },
      {
        "name": "Origami Lily",
        "icon": "origamilily",
        "id": 2247,
        "duration": 6,
        "lands_on": [":virtual","flatlou"]
      },
      {
        "name": "Origami Boat",
        "icon": "origamiboat",
        "id": 2248,
        "duration": 6,
        "lands_on": [":virtual","flatmatt"]
      },
      {
        "name": "Origami Butterfly",
        "icon": "origamibutterfly",
        "id": 2249,
        "duration": 6,
        "lands_on": [":virtual","flathammock"]
      }
    ]
  }
]