import * as React from 'react';
import { NavigationContainer, useLinking, useNavigation, useRoute } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import { enableScreens } from 'react-native-screens';
enableScreens();
// import { createSharedElementStackNavigator } from 'react-navigation-shared-element';
import { Provider as ReduxProvider, useSelector, useDispatch } from 'react-redux';
import s from 'utils/store';
import 'utils/lang/i18n';
import loadable from '@loadable/component';
import changelogs from './changelogs';
import getIcon from 'utils/db/icon';
var { store, setCurrentRoute, cuppazeeVersion } = s;

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
import font from './sections/Shared/font';

import pages from './pages';
var pageScreens = {};
var screens = pages.map(page => ({
  nologin: page.nologin,
  name: page.name,
  screen: loadable(page.import, { fallback: <LoadingPage x={page.background} /> })
}));
for (var page of pages) {
  pageScreens[page.name] = page.path;
}

// Navigation Sections
import DrawerContent from './sections/Main/Drawer';

import { Platform, View, Text, StatusBar, ActivityIndicator, ScrollView, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider as PaperProvider, Button, Appbar } from 'react-native-paper'

import { useDimensions } from '@react-native-community/hooks';
import * as WebBrowser from 'expo-web-browser';
import Header from './sections/Main/Header';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

WebBrowser?.maybeCompleteAuthSession?.({
  skipRedirectCheck: true
});

const Drawer = createDrawerNavigator();

const Stack = createStackNavigator();
// const Stack = createSharedElementStackNavigator();

function RedirectScreen() {
  var nav = useNavigation();
  var users = useSelector(i => i.userBookmarks);
  if (users && users[0]) {
    nav.replace('UserDetails', { username: users[0].username });
  }
  return <Text>_redirect</Text>;
}

const AuthScreen = loadable(() => import('./sections/Main/Auth'), { fallback: <LoadingPage /> })

function StackNav() {
  const loggedIn = useSelector(i => i.loggedIn);
  return <Stack.Navigator
    screenOptions={({ navigation, route }) => ({
      gestureEnabled: Platform.OS == 'ios',
      // animationEnabled: false,
      header: (props) => <Header {...(props || {})} />,

    })}>
    {loggedIn && <>
      <Stack.Screen
        name="_redirect"
        component={RedirectScreen}
      />
      {screens.filter(i => !i.nologin).map(screen => <Stack.Screen
        key={screen.name}
        name={screen.name}
        component={screen.screen}
      />)}
    </>}
    <Stack.Screen
      name="Auth"
      options={{
        title: "Authenticate",
      }}
      component={AuthScreen}
    />
    {screens.filter(i => i.nologin).map(screen => <Stack.Screen
      key={screen.name}
      name={screen.name}
      component={screen.screen}
    />)}
  </Stack.Navigator>
}

function DrawerNav() {
  var { width } = useDimensions().window;
  var loggedIn = useSelector(i => i.loggedIn);
  return <Drawer.Navigator
    drawerPosition="left"
    drawerStyle={{ width: width > 1000 ? 256 : Math.min(320, width) }}
    drawerContent={props => <DrawerContent side="left" {...props} />}
    drawerType={(width > 1000 && loggedIn) ? "permanent" : "front"}
    edgeWidth={loggedIn ? 100 : 0}
  >
    <Drawer.Screen
      name="__primary"
      label="__primary"
      component={StackNav}
    />
  </Drawer.Navigator>
}

function App() {
  let [fontsLoaded] = useFonts(Platform.OS == "web" ? {
    // Coiny_400Regular,
  } : {
      Coiny_400Regular,
      Roboto_100Thin,
      Roboto_300Light,
      Roboto_400Regular,
      Roboto_500Medium,
      Roboto_700Bold,
      Roboto_900Black,
    });
  const loadingLogin = useSelector(i => i.loadingLogin || i.version < 0);
  const version = useSelector(i => i.version);
  const ref = React.useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { getInitialState } = useLinking(ref, {
    prefixes: ['https://cuppazee.app', 'cuppazee://'],
    config: {
      __primary: {
        screens: {
          ...pageScreens,
          Auth: 'auth',
        },
      }
    },
  });
  var [isReady, setIsReady] = React.useState(false);
  var [initialState, setInitialState] = React.useState();
  var theme = useSelector(i => i.themes[i.theme])

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
          setTimeout(() => dispatch(setCurrentRoute(state?.routes?.[0]?.state?.routes?.slice?.()?.reverse?.()?.[0] ?? {})), 100);
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  function handleStateChange(a) {
    dispatch(setCurrentRoute(a?.routes?.[0]?.state?.routes?.slice?.()?.reverse?.()?.[0] ?? {}))
  }

  if (!theme || !theme.page || !theme.page.bg) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: 'white' }}>
      <ActivityIndicator size="large" color="orange" />
    </View>;
  }
  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
      <ActivityIndicator size="large" color={theme.page.fg} />
    </View>;
  }
  if (loadingLogin) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
      <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 20, color: theme.page.fg, marginBottom: 20 }}>{t('common:logging_in')}</Text>
      <ActivityIndicator size="large" color={theme.page.fg} />
    </View>;
  }
  if (version != Math.max(...Object.keys(changelogs).map(Number))) {
    var arr = Object.keys(changelogs).map(Number).filter(i => i > version).slice(-10).sort((a, b) => a - b);
    var logs = arr.map(i => [i, changelogs[i]])
    return <SafeAreaView style={{ backgroundColor: theme.navigation.bg, height: "100%" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 8, justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
        {logs.map(([build, log]) => <View style={{ maxWidth: "100%" }}>
          <View style={{ alignItems: "center" }}>
            <Text allowFontScaling={false} style={{ color: theme.navigation.fg, fontSize: 32, ...font("bold") }}>{t('changelog:build_n', { n: build })}</Text>
          </View>
          {log?.map(i => <View style={{ flexDirection: "row", alignItems: "center", width: 400, maxWidth: "100%" }}>
            {i.image && <Image source={getIcon(i.image)} style={{ height: 48, width: 48 }} />}
            {i.icon && <View style={{ height: 48, width: 48, backgroundColor: theme.page_content.bg, borderRadius: 24, justifyContent: "center", alignItems: "center" }}>
              <MaterialCommunityIcons size={32} color={theme.page_content.fg} name={i.icon} />
            </View>}
            <View style={{ padding: 8, flex: 1 }}>
              <Text allowFontScaling={false} style={{ color: theme.navigation.fg, fontSize: 20, ...font("bold") }}>{i.title}</Text>
              <Text allowFontScaling={false} style={{ color: theme.navigation.fg, fontSize: 16, ...font() }}>{i.description}</Text>
            </View>
          </View>) ?? <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 20, color: theme.page.fg, marginBottom: 20 }}>{t('changelog:no_changelog')}</Text>}
          {build == Math.max(...Object.keys(changelogs).map(Number)) && <Button mode="contained" style={{ borderWidth: theme.page_content.border ? 2 : 0, borderColor: theme.page_content.border }} color={theme.page_content.bg} onPress={() => {
            dispatch(cuppazeeVersion(Math.max(...Object.keys(changelogs).map(Number))))
          }}>{t('changelog:continue')}</Button>}
        </View>)}
      </ScrollView>
    </SafeAreaView>;
  }
  if (!isReady) {
    return null;
  }
  var navWidth = 400;
  return (
    <NavigationContainer independent={true} onStateChange={handleStateChange} initialState={initialState} ref={ref}>
      <StatusBar translucent={true} backgroundColor={theme.navigation.bg + 'cc'} barStyle="light-content" />
      <View style={{ flex: 1 }}>
        <DrawerNav />
        {/* <View style={{position:"absolute",bottom:-0.5*navWidth,right:-0.5*navWidth,width:navWidth,height:navWidth,borderRadius:navWidth/2,paddingBottom:navWidth/2,paddingRight:navWidth/2,backgroundColor:"white"}}><Text>Hello</Text></View> */}
      </View>
    </NavigationContainer>
  );
}
export default function () { // Setup Providers
  return <SafeAreaProvider>
    <ReduxProvider store={store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </ReduxProvider>
  </SafeAreaProvider>
}