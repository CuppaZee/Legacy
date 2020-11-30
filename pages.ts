export default [
  {
    name: "MunzeeDetails",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '/sections/Munzee/Details' or i... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '/sections/Clan/Search' or its ... Remove this comment to see the full error message
    import: () => import("/sections/Clan/Search"),
    path: "clan/search"
  },
  {
    name: "AllClans",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '/sections/Clan/All' or its cor... Remove this comment to see the full error message
    import: () => import("/sections/Clan/All"),
    path: {
      path: "clan/all"
    }
  },
  {
    name: "ClanRequirements",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '/sections/Clan/Requirements' o... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '/sections/Clan/Details' or its... Remove this comment to see the full error message
    import: () => import("/sections/Clan/Details"),
    path: {
      path: "clan/:clanid/:year?/:month?",
      parse: {
        clanid: Number,
        year: Number,
        month: Number,
      }
    }
  },

  {
    name: "Settings",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/More/Settings' or its... Remove this comment to see the full error message
    import: () => import('sections/More/Settings'),
    path: "more/settings"
  },
  {
    name: "Notifications",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/More/Notifications' o... Remove this comment to see the full error message
    import: () => import('sections/More/Notifications'),
    path: "more/notifications"
  },
  {
    name: "Bookmarks",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/More/Bookmarks' or it... Remove this comment to see the full error message
    import: () => import('sections/More/Bookmarks'),
    path: "more/bookmarks"
  },
  {
    name: "Info",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/More/Info' or its cor... Remove this comment to see the full error message
    import: () => import('sections/More/Info'),
    path: "more/info"
  },
  
  {
    name: "DBType",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/DB/Type' or its corre... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/DB/Category' or its c... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/DB/Search' or its cor... Remove this comment to see the full error message
    import: () => import('sections/DB/Search'),
    path: "db/search"
  },

  
  {
    name: "Scanner",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Tools/Scanner' or its... Remove this comment to see the full error message
    import: () => import('sections/Tools/Scanner'),
    path: "tools/scanner"
  },
  {
    name: "Calendar",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Calendar/Page' or its... Remove this comment to see the full error message
    import: () => import('sections/Calendar/Page'),
    path: "tools/calendar"
  },
  {
    name: "EvoPlanner",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Tools/EvoPlanner' or ... Remove this comment to see the full error message
    import: () => import('sections/Tools/EvoPlanner'),
    path: "tools/evoplanner"
  },
  {
    name: "Bouncers",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Tools/Bouncers' or it... Remove this comment to see the full error message
    import: () => import('sections/Tools/Bouncers'),
    path: "tools/bouncers"
  },
  {
    name: "BouncerMap",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Tools/BouncerMap' or ... Remove this comment to see the full error message
    import: () => import('sections/Tools/BouncerMap'),
    path: "tools/bouncers/:type"
  },

  
  {
    name: "UserSearch",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/Search' or its c... Remove this comment to see the full error message
    import: () => import('sections/User/Search'),
    path: "user/search"
  },
  {
    name: "AllUsers",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/All' or its corr... Remove this comment to see the full error message
    import: () => import('sections/User/All'),
    path: "user/all"
  },
  {
    name: "UserDetails",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/Details' or its ... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/Activity/Page' o... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/Universal' or it... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/Inventory/Page' ... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/Clan/Page' or it... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/Quest' or its co... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/Bouncers' or its... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/QRew' or its cor... Remove this comment to see the full error message
    import: () => import('sections/User/QRew'),
    path: {
      path: "user/:username/qrew",
      parse: {
        username: String,
      }
    }
  },
  {
    name: "UserZeeOps",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/ZeeOps' or its c... Remove this comment to see the full error message
    import: () => import('sections/User/ZeeOps'),
    path: {
      path: "user/:username/zeeops",
      parse: {
        username: String,
      }
    }
  },
  {
    name: "UserBlast",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/Blast/Blast' or ... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/Blast/Map' or it... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/POTMSept2020' or... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/CapturesCategory... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/Challenges/SHCLi... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/Challenges/SHCPr... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/Challenges/POI' ... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/User/Challenges/Colou... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '/sections/Weekly/Leaderboard.j... Remove this comment to see the full error message
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



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Weekly/Weeks' or its ... Remove this comment to see the full error message
    import: () => import("sections/Weekly/Weeks"),
    path: "weekly"
  },

  
  {
    name: "CompetitionOptIn",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '/sections/Competition/Search' ... Remove this comment to see the full error message
    import: () => import("/sections/Competition/Search"),
    path: "zeecret/optin",
    nologin: true
  },
  {
    name: "CompetitionAuth",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '/sections/Competition/Auth' or... Remove this comment to see the full error message
    import: () => import("/sections/Competition/Auth"),
    path: "zeecret/optin/:username",
    nologin: true
  },
  {
    name: "CompetitionRoundStats",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '/sections/Competition/Stats' o... Remove this comment to see the full error message
    import: () => import("/sections/Competition/Stats"),
    path: "zeecret/stats/:round",
    nologin: true
  },
  {
    name: "CompetitionHome",



    // @ts-expect-error ts-migrate(2307) FIXME: Cannot find module '/sections/Competition/Home' or... Remove this comment to see the full error message
    import: () => import("/sections/Competition/Home"),
    path: "zeecret",
    nologin: true
  },
]
