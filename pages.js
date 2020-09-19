export default [
  {
    name: "MunzeeDetails",
    import: () => import("/sections/Munzee/Details"),
    path: {
      path: "munzee/:username/:code",
      parse: {
        username: String,
        code: Number
      }
    }
  },
  {
    name: "ClanSearch",
    import: () => import("/sections/Clan/Search"),
    path: "clan/search"
  },
  {
    name: "AllClans",
    import: () => import("/sections/Clan/All"),
    path: {
      path: "clan/all"
    }
  },
  {
    name: "ClanRequirements",
    import: () => import("/sections/Clan/Requirements"),
    path: {
      path: "clan/requirements/:year/:month",
      parse: {
        year: Number,
        month: Number,
      }
    }
  },
  {
    name: "Clan",
    import: () => import("/sections/Clan/Details"),
    path: {
      path: "clan/:clanid",
      parse: {
        clanid: Number
      }
    }
  },

  {
    name: "Settings",
    import: () => import('sections/More/Settings'),
    path: "more/settings"
  },
  {
    name: "Notifications",
    import: () => import('sections/More/Notifications'),
    path: "more/notifications"
  },
  {
    name: "Bookmarks",
    import: () => import('sections/More/Bookmarks'),
    path: "more/bookmarks"
  },
  {
    name: "Info",
    import: () => import('sections/More/Info'),
    path: "more/info"
  },
  
  {
    name: "DBType",
    import: () => import('sections/DB/Type'),
    path: {
      path: "db/type/:munzee",
      parse: {
        munzee: String
      }
    }
  },
  {
    name: "DBCategory",
    import: () => import('sections/DB/Category'),
    path: {
      path: "db/category/:category",
      parse: {
        category: String
      }
    }
  },
  {
    name: "DBSearch",
    import: () => import('sections/DB/Search'),
    path: "db/search"
  },

  
  {
    name: "Scanner",
    import: () => import('sections/Tools/Scanner'),
    path: "tools/scanner"
  },
  {
    name: "Calendar",
    import: () => import('sections/Calendar/Page'),
    path: "tools/calendar"
  },
  {
    name: "EvoPlanner",
    import: () => import('sections/Tools/EvoPlanner'),
    path: "tools/evoplanner"
  },
  {
    name: "Bouncers",
    import: () => import('sections/Tools/Bouncers'),
    path: "tools/bouncers"
  },
  {
    name: "BouncerMap",
    import: () => import('sections/Tools/BouncerMap'),
    path: "tools/bouncers/:type"
  },

  
  {
    name: "UserSearch",
    import: () => import('sections/User/Search'),
    path: "user/search"
  },
  {
    name: "AllUsers",
    import: () => import('sections/User/All'),
    path: "user/all"
  },
  {
    name: "UserDetails",
    import: () => import('sections/User/Details'),
    path: {
      path: "user/:username",
      parse: {
        username: String
      },
      exact: true
    }
  },
  {
    name: "UserActivity",
    import: () => import('sections/User/Activity/Page'),
    path: {
      path: "user/:username/activity/:date?",
      parse: {
        username: String,
        date: String,
      }
    }
  },
  {
    name: "UserUniversal",
    import: () => import('sections/User/Universal'),
    path: {
      path: "user/:username/universal",
      parse: {
        username: String,
      }
    }
  },
  {
    name: "UserInventory",
    import: () => import('sections/User/Inventory/Page'),
    path: {
      path: "user/:username/inventory",
      parse: {
        username: String,
      }
    }
  },
  {
    name: "UserClan",
    import: () => import('sections/User/Clan/Page'),
    path: {
      path: "user/:username/clan",
      parse: {
        username: String,
      }
    }
  },
  {
    name: "UserQuest",
    import: () => import('sections/User/Quest'),
    path: {
      path: "user/:username/quest",
      parse: {
        username: String,
      }
    }
  },
  {
    name: "UserBouncers",
    import: () => import('sections/User/Bouncers'),
    path: {
      path: "user/:username/bouncers",
      parse: {
        username: String,
      }
    }
  },
  {
    name: "UserQRew",
    import: () => import('sections/User/QRew'),
    path: {
      path: "user/:username/qrew",
      parse: {
        username: String,
      }
    }
  },
  {
    name: "UserBlast",
    import: () => import('sections/User/Blast/Blast'),
    path: {
      path: "user/:username/blast/:lat/:lon/:size",
      parse: {
        username: String,
        lat: Number,
        lon: Number,
        size: Number
      }
    }
  },
  {
    name: "UserBlastMap",
    import: () => import('sections/User/Blast/Map'),
    path: {
      path: "user/:username/blast",
      parse: {
        username: String,
      }
    }
  },
  {
    name: "UserPOTMSept2020",
    import: () => import('sections/User/POTMSept2020'),
    path: {
      path: "user/:username/potm/sept2020",
      parse: {
        username: String,
      }
    }
  },
  {
    name: "UserCapturesCategory",
    import: () => import('sections/User/CapturesCategory'),
    path: {
      path: "user/:username/captures/:category",
      parse: {
        username: String,
        category: String,
      }
    }
  },
  {
    name: "UserSHCLite",
    import: () => import('sections/User/Challenges/SHCLite'),
    path: {
      path: "user/:username/shc/lite/:date?",
      parse: {
        username: String,
        date: String,
      }
    }
  },
  {
    name: "UserSHCPro",
    import: () => import('sections/User/Challenges/SHCPro'),
    path: {
      path: "user/:username/shc/pro/:date?",
      parse: {
        username: String,
        date: String,
      }
    }
  },
  {
    name: "UserPOI",
    import: () => import('sections/User/Challenges/POI'),
    path: {
      path: "user/:username/poi/:date?",
      parse: {
        username: String,
        date: String,
      }
    }
  },
  {
    name: "UserColour",
    import: () => import('sections/User/Challenges/Colour'),
    path: {
      path: "user/:username/colour/:date?",
      parse: {
        username: String,
        date: String,
      }
    }
  },
  {
    name: "WeeklyLeaderboard",
    import: () => import("/sections/Weekly/Leaderboard.js"),
    path: {
      path: "weekly/:week",
      parse: {
        week: String
      }
    }
  },
  {
    name: "WeeklyWeeks",
    import: () => import("sections/Weekly/Weeks"),
    path: "weekly"
  }
]