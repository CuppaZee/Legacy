import * as React from 'react';
import { NavigationContainer, useLinking, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
// import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Provider as ReduxProvider, useSelector, useDispatch } from 'react-redux';
import s from '~store/index';
import './lang/i18n';
import loadable from '@loadable/component';
var { store, setCurrentRoute } = s;

import {
  useFonts,
  Roboto_100Thin,
  Roboto_300Light,
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
  Roboto_900Black,
} from '@expo-google-fonts/roboto';
import { Coiny_400Regular } from '@expo-google-fonts/coiny';

import LoadingPage from './sections/Shared/LoadingPage';

// Clan Screens
const AllClansScreen = loadable(() => import('./sections/Clan/All'),{fallback: <LoadingPage/>})
const ClanDetailsScreen = loadable(() => import('./sections/Clan/Details'),{fallback: <LoadingPage/>})
const ClanRequirementsScreen = loadable(() => import('./sections/Clan/Requirements'),{fallback: <LoadingPage/>})
const ClanSearchScreen = loadable(() => import('./sections/Clan/Search'),{fallback: <LoadingPage/>})

// More Screens
const SettingsScreen = loadable(() => import('./sections/More/Settings'),{fallback: <LoadingPage/>})
const InfoScreen = loadable(() => import('./sections/More/Info'),{fallback: <LoadingPage x="page_content"/>})

// DB Screens
const DBTypeScreen = loadable(() => import('./sections/DB/Type'),{fallback: <LoadingPage x="page_content"/>})
const DBSearchScreen = loadable(() => import('./sections/DB/Search'),{fallback: <LoadingPage/>})
const DBCategoryScreen = loadable(() => import('./sections/DB/Category'),{fallback: <LoadingPage/>})

// Tools Screens
const ToolsScreen = loadable(() => import('./sections/Tools/Home'),{fallback: <LoadingPage/>})
const ScannerScreen = loadable(() => import('./sections/Tools/Scanner'),{fallback: <LoadingPage/>})
const CalendarScreen = loadable(() => import('./sections/Calendar/Page'),{fallback: <LoadingPage/>})

// Maps Screens
const MapScreen = loadable(() => import('./sections/Maps/Home'),{fallback: <LoadingPage/>})

// User Screens
const UserDetailsScreen = loadable(() => import('./sections/User/Details'),{fallback: <LoadingPage/>})
const UserActivityScreen = loadable(() => import('./sections/User/Activity/Page'),{fallback: <LoadingPage x="page_content"/>})
const UserSearchScreen = loadable(() => import('./sections/User/Search'),{fallback: <LoadingPage/>})
const UserInventoryScreen = loadable(() => import('./sections/User/Inventory/Page'),{fallback: <LoadingPage x="page_content"/>})
const UserClanScreen = loadable(() => import('./sections/User/Clan/Page'),{fallback: <LoadingPage/>})
const UserQuestScreen = loadable(() => import('./sections/User/Quest'),{fallback: <LoadingPage/>})
const UserBouncersScreen = loadable(() => import('./sections/User/Bouncers'),{fallback: <LoadingPage/>})
const UserSHCScreen = loadable(() => import('./sections/User/SpecialHunterChallenge'),{fallback: <LoadingPage/>})
const UserCapturesCategoryScreen = loadable(() => import('./sections/User/CapturesCategory'),{fallback: <LoadingPage/>})

// Navigation Sections
import DrawerContent from './sections/Main/Drawer';

import { Platform, View, Text, StatusBar } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper'

import { useDimensions } from '@react-native-community/hooks';
import * as WebBrowser from 'expo-web-browser';
import Header from './sections/Main/Header';

WebBrowser?.maybeCompleteAuthSession?.({
  skipRedirectCheck: true
});

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();
// const Stack = createSharedElementStackNavigator();

function RedirectScreen() {
  var nav = useNavigation();
  var users = useSelector(i=>Object.keys(i.logins??{}));
  if(users && users[0]) {
    nav.replace('UserDetails',{userid:Number(users[0])});
  }
  return <Text>_redirect</Text>;
}

const AuthScreen = loadable(() => import('./sections/Main/Auth'),{fallback: <LoadingPage/>})

function StackNav () {
  const loggedIn = useSelector(i=>i.loggedIn);
  return <Stack.Navigator
    screenOptions={({ navigation, route }) => ({
      gestureEnabled: Platform.OS == 'ios',
      header: (props) => <Header {...(props||{})}/>
    })}>
    {loggedIn && <>
      <Stack.Screen
        name="_redirect"
        component={RedirectScreen}
      />
      <Stack.Screen
        name="Map"
        component={MapScreen}
      />
      <Stack.Screen
        name="Tools"
        component={ToolsScreen}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
      />
      <Stack.Screen
        name="Info"
        component={InfoScreen}
      />
      <Stack.Screen
        name="Scanner"
        component={ScannerScreen}
      />
      <Stack.Screen
        name="Calendar"
        component={CalendarScreen}
      />
      <Stack.Screen
        name="AllClans"
        options={{
          title: 'All Clans',
        }}
        component={AllClansScreen}
      />
      <Stack.Screen
        name="ClanRequirements"
        options={{
          title: 'Clan Requirements'
        }}
        component={ClanRequirementsScreen}
      />
      <Stack.Screen
        name="ClanSearch"
        options={{
          title: 'Clan Search',
        }}
        component={ClanSearchScreen}
      />
      <Stack.Screen
        name="Clan"
        component={ClanDetailsScreen}
      />
      <Stack.Screen
        name="UserSearch"
        options={{
          title: 'User Search',
        }}
        component={UserSearchScreen}
      />
      <Stack.Screen
        name="UserDetails"
        options={{
          title: 'User Details',
        }}
        component={UserDetailsScreen}
      />
      <Stack.Screen
        name="UserActivity"
        options={{
          title: 'User Activity',
        }}
        component={UserActivityScreen}
      />
      <Stack.Screen
        name="UserActivityDate"
        options={{
          title: 'User Activity',
        }}
        component={UserActivityScreen}
      />
      <Stack.Screen
        name="UserInventory"
        options={{
          title: 'User Inventory',
        }}
        component={UserInventoryScreen}
      />
      <Stack.Screen
        name="UserClan"
        options={{
          title: 'User Clan Progress',
        }}
        component={UserClanScreen}
      />
      <Stack.Screen
        name="UserQuest"
        options={{
          title: 'User Quest Progress',
        }}
        component={UserQuestScreen}
      />
      <Stack.Screen
        name="UserCapturesCategory"
        options={{
          title: 'User Captures Category',
        }}
        component={UserCapturesCategoryScreen}
      />
      <Stack.Screen
        name="UserSHC"
        options={{
          title: 'User Special Hunter Challenge',
        }}
        component={UserSHCScreen}
      />
      <Stack.Screen
        name="UserSHCDate"
        options={{
          title: 'User Special Hunter Challenge',
        }}
        component={UserSHCScreen}
      />
      <Stack.Screen
        name="UserBouncers"
        options={{
          title: 'User Bouncers',
        }}
        component={UserBouncersScreen}
      />
      <Stack.Screen
        name="DBType"
        options={{
          title: 'Munzee Type',
        }}
        component={DBTypeScreen}
      />
      <Stack.Screen
        name="DBSearch"
        options={{
          title: 'Database Search',
        }}
        component={DBSearchScreen}
      />
      <Stack.Screen
        name="DBCategory"
        options={{
          title: 'Type Category',
        }}
        component={DBCategoryScreen}
      />
    </>}
    <Stack.Screen
      name="Auth"
      options={{
        title: "Authenticate",
      }}
      component={AuthScreen}
    />
  </Stack.Navigator>
}

function DrawerNav() {
  var { width } = useDimensions().window;
  var loggedIn = useSelector(i=>i.loggedIn);
  return <Drawer.Navigator
    drawerPosition="left"
    drawerStyle={{width:width>1000?260:Math.min(320,width)}}
    drawerContent={props => <DrawerContent side="left" {...props} />}
    drawerType={(width>1000&&loggedIn)?"permanent":"front"}
    edgeWidth={loggedIn?100:0}
  >
    <Drawer.Screen
      name="__primary"
      label="__primary"
      component={StackNav}
    />
  </Drawer.Navigator>
}

function App() {
  let [fontsLoaded] = useFonts(Platform.OS=="web"?{
    Coiny_400Regular,
  }:{
    Coiny_400Regular,
    Roboto_100Thin,
    Roboto_300Light,
    Roboto_400Regular,
    Roboto_500Medium,
    Roboto_700Bold,
    Roboto_900Black,
  });
  const loadingLogin = useSelector(i=>i.loadingLogin);
  const ref = React.useRef();
  const dispatch = useDispatch();

  const { getInitialState } = useLinking(ref, {
    prefixes: ['https://cuppazee.app', 'cuppazee://'],
    config: {
      __primary: {
        path: '__you_should_never_see_this_please_report_it_on_facebook_at_cuppazee_or_via_email_at_mail_at_cuppazee_dot_uk',
        screens: {
          Tools: 'tools',
          Map: 'maps',
          Scanner: 'scanner',
          Calendar: 'calendar',
          Settings: 'settings',
          Info: 'info',
          ClanSearch: 'clan/search',

          // Clan
          AllClans: 'clan/all',
          ClanRequirements: {
            path: 'clan/requirements/:gameid',
            parse: {
              gameid: Number
            }
          },
          Clan: {
            path: 'clan/:clanid',
            parse: {
              clanid: Number
            }
          },

          // User
          UserSearch: 'user/search',
          UserActivityDate: {
            path: 'user/:userid/activity/:date',
            parse: {
              userid: Number,
              date: String
            }
          },
          UserActivity: {
            path: 'user/:userid/activity',
            parse: {
              userid: Number
            }
          },
          UserInventory: {
            path: 'user/:userid/inventory',
            parse: {
              userid: Number
            }
          },
          UserClan: {
            path: 'user/:userid/clan',
            parse: {
              userid: Number
            }
          },
          UserQuest: {
            path: 'user/:userid/quest',
            parse: {
              userid: Number
            }
          },
          UserBouncers: {
            path: 'user/:userid/bouncers',
            parse: {
              userid: Number
            }
          },
          UserSHCDate: {
            path: 'user/:userid/shc/:date',
            parse: {
              userid: Number,
              date: String
            }
          },
          UserSHC: {
            path: 'user/:userid/shc',
            parse: {
              userid: Number
            }
          },
          UserCapturesCategory: {
            path: 'user/:userid/captures/:category',
            parse: {
              userid: Number
            }
          },
          UserDetails: {
            path: 'user/:userid',
            parse: {
              userid: Number
            }
          },

          DBSearch: 'db/search',
          DBType: {
            path: 'db/type/:munzee',
            parse: {
              munzee: String
            }
          },
          DBCategory: {
            path: 'db/category/:category',
            parse: {
              category: String
            }
          },

          Auth: 'auth',
          MunzeeDetails: 'munzee/:url',
        },
      }
    },
  });
  var [isReady, setIsReady] = React.useState(false);
  var [initialState, setInitialState] = React.useState();
  var theme = useSelector(i=>i.themes[i.theme])

  React.useEffect(() => {
    Promise.race([
      getInitialState(),
      new Promise(resolve =>
        setTimeout(resolve, 150)
      )
    ])
      .catch(e => {
        console.error(e);
      })
      .then(state => {
        if (state !== undefined) {
          setTimeout(()=>dispatch(setCurrentRoute(state?.routes?.[0]?.state?.routes?.slice?.()?.reverse?.()?.[0]??{})),100);
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  function handleStateChange(a,b,c) {
    dispatch(setCurrentRoute(a?.routes?.[0]?.state?.routes?.slice?.()?.reverse?.()?.[0]??{}))
  }

  if (loadingLogin||!fontsLoaded) {
    return <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
      <Text>Loading...</Text>
    </View>;
  }
  if (!isReady) {
    return null;
  }
  var navWidth = 400;
  return (
    <NavigationContainer independent={true} onStateChange={handleStateChange} initialState={initialState} ref={ref}>
      <StatusBar translucent={true} backgroundColor={theme.navigation.bg + 'cc'} barStyle="light-content" />
      <View style={{flex:1}}>
        <DrawerNav/>
        {/* <View style={{position:"absolute",bottom:-0.5*navWidth,right:-0.5*navWidth,width:navWidth,height:navWidth,borderRadius:navWidth/2,paddingBottom:navWidth/2,paddingRight:navWidth/2,backgroundColor:"white"}}><Text>Hello</Text></View> */}
      </View>
    </NavigationContainer>
  );
}
export default function () { // Setup Providers
  return <ReduxProvider store={store}>
    <PaperProvider>
      <App />
    </PaperProvider>
  </ReduxProvider>
}