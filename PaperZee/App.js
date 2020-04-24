import * as React from 'react';
import { NavigationContainer, useLinking, useNavigation } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider as ReduxProvider, useSelector, useDispatch } from 'react-redux';
import s from '~store/index';
import './lang/i18n';
var { store, login, setCurrentRoute } = s;

// Clan Screens
import AllClansScreen from './sections/Clan/All';
import ClanDetailsScreen from './sections/Clan/Details';
import ClanSearchScreen from './sections/Clan/Search';

// Scanner Screens
import ScannerScreen from './sections/Scanner/Home';

// Settings Screens
import SettingsScreen from './sections/Settings/Home';

// Tools Screens
import ToolsScreen from './sections/Tools/Home';

// Maps Screens
import MapScreen from './sections/Maps/Home';

// User Screens
import UserActivityScreen from './sections/User/Activity';

// Navigation Sections
import DrawerContent from './sections/Navigation/Drawer';

import { Platform, View, Text, StatusBar } from 'react-native';
import { IconButton, ActivityIndicator, Provider as PaperProvider } from 'react-native-paper'
import LoadingButton from './sections/Navigation/LoadingButton';
import WebView from 'react-native-webview';
import { Linking } from 'expo';

import { useDimensions } from '@react-native-community/hooks';

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();

function RedirectScreen() {
  var nav = useNavigation();
  var users = useSelector(i=>Object.keys(i.logins??{}));
  if(users && users[0]) {
    nav.replace('UserActivity',{userid:Number(users[0])});
  }
  return <Text>_redirect</Text>;
}

function AuthScreen() {
  var [auth,setAuth] = React.useState(false);
  var loggedIn = useSelector(i=>i.loggedIn);
  var dispatch = useDispatch();
  var nav = useNavigation();
  if(auth&&loggedIn) nav.replace('Home');
  function handleNavChange({url}) {
    if(url.includes('authsuccess')) {
      var x = {};
      var auth = url.match(/authsuccess\/([a-z0-9]+)\/([0-9]+)\/([^]+)/).slice(1,4);
      x[auth[1]] = {
        username: auth[2],
        code: auth[0]
      }
      setAuth(true);
      dispatch(login(x));
    }
  }
  if(Platform.OS=="web") {
    Linking.openURL('https://flame.cuppazee.uk/auth');
    return null;
  }
  if(auth) return <View style={{flex:1,alignContent:"center"}}><ActivityIndicator size="large" color="#000" /></View>
  return <WebView
    source={{ uri: 'https://flame.cuppazee.uk/auth' }}
    textZoom={200}
    style={{flex:1}}
    onNavigationStateChange={handleNavChange}
  />
}
function AuthSuccessScreen(props) {
  var [auth,setAuth] = React.useState(false);
  var loggedIn = useSelector(i=>i.loggedIn);
  var dispatch = useDispatch();
  var nav = useNavigation();
  if(auth&&loggedIn) nav.replace('_redirect');
  React.useEffect(()=>{
    if(!props.route?.params?.code) {
      nav.replace('_redirect');
    } else {
      var authx = props.route?.params
      var x = {};
      x[authx.id] = {
        username: authx.name,
        code: authx.code
      }
      console.log('AUTHED',authx)
      setAuth(true);
      dispatch(login(x));
      console.log('AUTHED')
    }
  },[])
  if(auth) return <View style={{flex:1,alignContent:"center"}}><ActivityIndicator size="large" color="#000" /></View>
  return <Text>...</Text>
}

function StackNav () {
  var { width } = useDimensions().window;
  const loggedIn = useSelector(i=>i.loggedIn);
  const theme = useSelector(i=>i.themes[i.theme]);
  return <Stack.Navigator
    screenOptions={({ navigation, route }) => ({
      gestureEnabled: Platform.OS == 'ios',
      headerStyle: {
        backgroundColor: theme.navigation.bg
      },
      headerLeft: () => (
        width<=1000?<View style={{flexDirection:"row"}}>
          {width<=1000&&<IconButton
            onPress={() => navigation.toggleDrawer()}
            color="#fff"
            icon="home"
          />}
          {/* {(route.name == "Home" || !loggedIn || !navigation.canGoBack()) ? null : <IconButton
            onPress={() => navigation.goBack()}
            color="#fff"
            icon="arrow-left"
          />} */}
        </View>:null
      ),
      headerRight: () => {
        return loggedIn && (
          <View style={{ flexDirection: "row" }}>
            {(route.name == "Home" || !loggedIn || navigation.dangerouslyGetState().index<1) ? null : <IconButton
              onPress={() => navigation.pop()}
              color="#fff"
              icon="arrow-left"
            />}
            <LoadingButton />
          </View>
        )
      },
      headerTintColor: '#fff',
    })}>
    {loggedIn && <>
      <Stack.Screen
        name="_redirect"
        component={RedirectScreen}
      />
      <Stack.Screen
        name="Search"
        component={ClanSearchScreen}
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
        name="Scanner"
        component={ScannerScreen}
      />
      <Stack.Screen
        name="AllClans"
        options={{
          title: 'All Clans',
        }}
        component={AllClansScreen}
      />
      <Stack.Screen
        name="Clan"
        component={ClanDetailsScreen}
      />
      <Stack.Screen
        name="UserActivity"
        options={{
          title: 'User Activity',
        }}
        component={UserActivityScreen}
      />
    </>}
    <Stack.Screen
      name="Auth"
      options={{
        title: "Authenticate",
      }}
      component={AuthScreen}
    />
    <Stack.Screen
      name="AuthSuccess"
      label="Auth Success"
      component={AuthSuccessScreen}
    />
  </Stack.Navigator>
}

function DrawerNav() {
  var { width } = useDimensions().window;
  return <Drawer.Navigator
    drawerStyle={{width:width>500?240:width}}
    drawerContent={props => <DrawerContent {...props} />}
    drawerType={width>1000?"permanent":"back"}
    edgeWidth={100}
    openByDefault={true}
  >
    <Drawer.Screen
      name="__primary"
      label="__primary"
      component={StackNav}
    />
  </Drawer.Navigator>
}

function App() {
  const loadingLogin = useSelector(i=>i.loadingLogin);
  const ref = React.useRef();
  const dispatch = useDispatch();

  const { getInitialState } = useLinking(ref, {
    prefixes: ['https://paper.cuppazee.uk', 'cuppazee://'],
    config: {
      __primary: {
        path: '__you_should_never_see_this_please_report_it_on_facebook_at_cuppazee_or_via_email_at_mail_at_cuppazee_dot_uk',
        screens: {
          Tools: 'tools',
          Search: 'search',
          Map: 'maps',
          Scanner: 'scanner',
          Settings: 'settings',
          AllClans: 'clans/list',
          Clan: {
            path: 'clan/:clanid',
            parse: {
              clanid: Number
            }
          },
          UserActivity: {
            path: 'user/:userid/activity',
            parse: {
              userid: Number
            }
          },
          AuthSuccess: 'authsuccess/:code/:id/:name',
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
          console.log('Initial Route',state?.routes?.[0]?.state?.routes?.slice?.()?.reverse?.()?.[0]);
          setTimeout(()=>dispatch(setCurrentRoute(state?.routes?.[0]?.state?.routes?.slice?.()?.reverse?.()?.[0]??{})),100);
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  function handleStateChange(a,b,c) {
    dispatch(setCurrentRoute(a?.routes?.[0]?.state?.routes?.slice?.()?.reverse?.()?.[0]??{}))
  }

  if (loadingLogin) {
    return <Text>Loading...</Text>;
  }
  if (!isReady) {
    return null;
  }
  return (
    <NavigationContainer independent={true} onStateChange={handleStateChange} initialState={initialState} ref={ref}>
      <StatusBar translucent={true} backgroundColor={theme.navigation.bg + 'cc'} barStyle="light-content" />
      <DrawerNav/>
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