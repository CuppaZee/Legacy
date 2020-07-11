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
    name: "ClanSearch",
    import: () => import("/sections/Clan/Search"),
    path: "clan/search"
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
    name: "UserBlast",
    import: () => import('sections/User/Blast'),
    path: {
      path: "user/:username/blast",
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
    import: () => import('sections/User/SpecialHunterChallenge/Lite'),
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
    import: () => import('sections/User/SpecialHunterChallenge/Pro'),
    path: {
      path: "user/:username/shc/pro/:date?",
      parse: {
        username: String,
        date: String,
      }
    }
  },
  {
    name: "AllCampLeaderboard",
    import: () => import("/sections/Camps/All.js"),
    path: "camps/all",
    nologin: true
  },
  {
    name: "CampLeaderboard",
    import: () => import("/sections/Camps/Camp.js"),
    path: {
      path: "camps/:team",
      parse: {
        team: String
      }
    },
    nologin: true
  }
]
/*

// User Screens
const AllUsersScreen = loadable(() => import('sections/User/All'), { fallback: <LoadingPage /> })
const UserDetailsScreen = loadable(() => import('sections/User/Details'), { fallback: <LoadingPage /> })
const UserActivityScreen = loadable(() => import('sections/User/Activity/Page'), { fallback: <LoadingPage x="page_content" /> })
const UserActivityScreen = loadable(() => import('sections/User/Activity/Page'), { fallback: <LoadingPage x="page_content" /> })
const UserSearchScreen = loadable(() => import('sections/User/Search'), { fallback: <LoadingPage /> })
const UserInventoryScreen = loadable(() => import('sections/User/Inventory/Page'), { fallback: <LoadingPage /> })
const UserClanScreen = loadable(() => import('sections/User/Clan/Page'), { fallback: <LoadingPage /> })
const UserQuestScreen = loadable(() => import('sections/User/Quest'), { fallback: <LoadingPage /> })
const UserBouncersScreen = loadable(() => import('sections/User/Bouncers'), { fallback: <LoadingPage /> })
const UserSHCScreen = loadable(() => import('sections/User/SpecialHunterChallenge/Classic'), { fallback: <LoadingPage /> })
const UserSHCLiteScreen = loadable(() => import('sections/User/SpecialHunterChallenge/Lite'), { fallback: <LoadingPage /> })
const UserSHCProScreen = loadable(() => import('sections/User/SpecialHunterChallenge/Pro'), { fallback: <LoadingPage /> })
const UserCapturesCategoryScreen = loadable(() => import('sections/User/CapturesCategory'), { fallback: <LoadingPage /> })
const UserBlastScreen = loadable(() => import('sections/User/Blast'), { fallback: <LoadingPage /> })



const MunzeeDetailsScreen = loadable(() => import('sections/Munzee/Details'), { fallback: <LoadingPage /> })

// Clan Screens
const AllClansScreen = loadable(() => import('sections/Clan/All'), { fallback: <LoadingPage /> })
const ClanDetailsScreen = loadable(() => import('sections/Clan/Details'), { fallback: <LoadingPage /> })
const ClanRequirementsScreen = loadable(() => import('sections/Clan/Requirements'), { fallback: <LoadingPage /> })
const ClanSearchScreen = loadable(() => import('sections/Clan/Search'), { fallback: <LoadingPage /> })

// More Screens
const SettingsScreen = loadable(() => import('sections/More/Settings'), { fallback: <LoadingPage /> })
const NotificationsScreen = loadable(() => import('sections/More/Notifications'), { fallback: <LoadingPage /> })
const InfoScreen = loadable(() => import('sections/More/Info'), { fallback: <LoadingPage x="page_content" /> })

// DB Screens
const DBTypeScreen = loadable(() => import('sections/DB/Type'), { fallback: <LoadingPage x="page_content" /> })
const DBSearchScreen = loadable(() => import('sections/DB/Search'), { fallback: <LoadingPage /> })
const DBCategoryScreen = loadable(() => import('sections/DB/Category'), { fallback: <LoadingPage /> })

// Tools Screens
const ToolsScreen = loadable(() => import('sections/Tools/Home'), { fallback: <LoadingPage /> })
const ScannerScreen = loadable(() => import('sections/Tools/Scanner'), { fallback: <LoadingPage /> })
const CalendarScreen = loadable(() => import('sections/Calendar/Page'), { fallback: <LoadingPage /> })
const BouncersScreen = loadable(() => import('sections/Tools/Bouncers'), { fallback: <LoadingPage /> })
const BouncerMapScreen = loadable(() => import('sections/Tools/BouncerMap'), { fallback: <LoadingPage /> })

// Maps Screens
const MapScreen = loadable(() => import('sections/Maps/Home'), { fallback: <LoadingPage /> })*/