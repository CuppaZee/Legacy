module.exports = [
  {
    "name": "Nomad",
    "icon": "nomad",
    "id": 296,
    "state": "bouncer",
    "lands_on": ["munzee"]
  },
  {
    "name": "Nomad Virtual",
    "icon": "nomadvirtual",
    "id": 297,
    "state": "bouncer",
    "lands_on": [":virtual"]
  },
  {
    "name": "Nomad Mystery",
    "icon": "nomadmystery",
    "id": 521,
    "state": "bouncer",
    "lands_on": ["mystery"]
  },
  {
    "name": "Jewel Thief Nomad",
    "icon": "jewelthiefnomad",
    "id": 822,
    "state": "bouncer",
    "lands_on": [i=>(i.category=="jewel"&&i.state=="physical")]
  },
  {
    "name": "Bellhop Nomad",
    "icon": "bellhopnomad",
    "id": 823,
    "state": "bouncer",
    "lands_on": [i=>(i.category=="destination"&&i.destination&&i.destination.type=="destination"&&i.state=="physical")]
  },
  {
    "name": "Pirate Nomad",
    "icon": "piratenomad",
    "id": 824,
    "state": "bouncer",
    "lands_on": [":reseller"]
  },
  {
    "name": "Warrior Nomad",
    "icon": "warriornomad",
    "id": 999,
    "state": "bouncer",
    "lands_on": [i=>(i.category=="clan"&&i.state=="physical")]
  },
  {
    "name": "Traveler Nomad",
    "icon": "travelernomad",
    "id": 1580,
    "state": "bouncer",
    "lands_on": [":poi"]
  },
  {
    "name": "Seasonal Nomad",
    "icon": "seasonalnomad",
    "id": 1637,
    "state": "bouncer",
    "lands_on": [i=>i.seasonal]
  },
  {
    "name": "Virtual Flat Nomad",
    "icon": "virtualflatnomad",
    "id": 1691,
    "state": "bouncer",
    "lands_on": [i=>i.category=="flat"&&!i.unique]
  },
  {
    "name": "Coupe Champion Nomad",
    "icon": "coupechampionnomad",
    "id": 2074,
    "state": "bouncer",
    "lands_on": ["munzee"]
  },
  {
    "name": "Coupe Champions #1",
    "icon": "coupechampions#1",
    "id": 2075,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #2",
    "icon": "coupechampions#2",
    "id": 2076,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #3",
    "icon": "coupechampions#3",
    "id": 2077,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #4",
    "icon": "coupechampions#4",
    "id": 2078,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #5",
    "icon": "coupechampions#5",
    "id": 2079,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #6",
    "icon": "coupechampions#6",
    "id": 2080,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #7",
    "icon": "coupechampions#7",
    "id": 2081,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #8",
    "icon": "coupechampions#8",
    "id": 2082,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #9",
    "icon": "coupechampions#9",
    "id": 2083,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #10",
    "icon": "coupechampions#10",
    "id": 2084,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #11",
    "icon": "coupechampions#11",
    "id": 2085,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #12",
    "icon": "coupechampions#12",
    "id": 2086,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #13",
    "icon": "coupechampions#13",
    "id": 2087,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #14",
    "icon": "coupechampions#14",
    "id": 2088,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #15",
    "icon": "coupechampions#15",
    "id": 2089,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #16",
    "icon": "coupechampions#16",
    "id": 2090,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #17",
    "icon": "coupechampions#17",
    "id": 2091,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #18",
    "icon": "coupechampions#18",
    "id": 2092,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #19",
    "icon": "coupechampions#19",
    "id": 2093,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #20",
    "icon": "coupechampions#20",
    "id": 2094,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #21",
    "icon": "coupechampions#21",
    "id": 2095,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #22",
    "icon": "coupechampions#22",
    "id": 2096,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  },
  {
    "name": "Coupe Champions #23",
    "icon": "coupechampions#23",
    "id": 2097,
    "state": "bouncer",
    "lands_on": ["munzee"],
    "extra": {
      "capture_only": true
    }
  }
]