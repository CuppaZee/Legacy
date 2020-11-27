import * as React from 'react';
import {
  NavigationContainer, useLinking, useNavigation, useRoute,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
} from '@react-navigation/native';
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

import * as Sentry from './sentry';
import privateConfig from './private.config';
if (!__DEV__) Sentry.init({
  dsn: privateConfig.sentry_dsn,
  enableInExpoDevelopment: false,
  debug: true,
});

import pages from './pages';
var pageScreens = {};
var screens = pages.map(page => ({
  nologin: page.nologin,
  name: page.name,
  screen: loadable(async () => {
    try {
      return await page.import();
    } catch (e) {
      return () => <LoadingPage error={true} x={page.background} />
    }
  }, { fallback: <LoadingPage x={page.background} /> })
}));
for (var page of pages) {
  pageScreens[page.name] = page.path;
}

// Navigation Sections
import DrawerContent from './sections/Main/Drawer';

import { Platform, View, StatusBar, ActivityIndicator, ScrollView, Image, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider as PaperProvider, Text, Button, DefaultTheme, DarkTheme, useTheme, Avatar, Subheading, Title, Paragraph, Headline } from 'react-native-paper';

import { useDimensions } from '@react-native-community/hooks';
import * as WebBrowser from 'expo-web-browser';
import * as Notifications from 'expo-notifications';
import Header from './sections/Main/Header';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
import useSetting from './utils/hooks/useSetting';

WebBrowser?.maybeCompleteAuthSession?.({
  skipRedirectCheck: true
});

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
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
      // gestureEnabled: Platform.OS == 'ios',
      // animationEnabled: false,
      // headerShown: true,
      header: (props) => <Header {...(props || {})} />,
      // headerStyle: {
      //   height: 80, // Specify the height of your custom header
      // }

    })}
  >
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
    drawerStyle={{ width: null }}
    drawerContent={props => <DrawerContent side="left" {...props} />}
    drawerType={(width > 1000 && loggedIn) ? "permanent" : "front"}
    edgeWidth={loggedIn ? 100 : 0}
  >
    <Drawer.Screen
      name="__primary"
      label="__primary"
      options={{
        title: "CuppaZee",
      }}
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
  var theme = useTheme();

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
  if (!fontsLoaded) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background }}>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>;
  }
  if (loadingLogin) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background }}>
      <Title style={{ marginBottom: 20 }}>{t('common:logging_in')}</Title>
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>;
  }
  if (version != Math.max(...Object.keys(changelogs).map(Number))) {
    var arr = Object.keys(changelogs).map(Number).filter(i => i > version).slice(-10).sort((a, b) => a - b);
    var logs = arr.map(i => [i, changelogs[i]])
    return <SafeAreaView style={{ backgroundColor: theme.colors.background, height: "100%" }}>
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 8, justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
        {logs.map(([build, log]) => <View style={{ maxWidth: "100%" }}>
          <View style={{ alignItems: "center" }}>
            <Headline>{t('changelog:build_n', { n: build })}</Headline>
          </View>
          {log?.map(i => <View style={{ flexDirection: "row", alignItems: "center", width: 400, maxWidth: "100%" }}>
            {i.image && <Image source={getIcon(i.image)} style={{ height: 48, width: 48 }} />}
            {i.icon && <Avatar.Icon icon={i.icon} size={48} />}
            <View style={{ padding: 8, flex: 1 }}>
              <Title>{i.title}</Title>
              <Paragraph>{i.description}</Paragraph>
            </View>
          </View>) ?? <Text allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 20, marginBottom: 20 }}>{t('changelog:no_changelog')}</Text>}
          {build == Math.max(...Object.keys(changelogs).map(Number)) && <Button mode="contained" onPress={() => {
            dispatch(cuppazeeVersion(Math.max(...Object.keys(changelogs).map(Number))))
          }}>{logs.some(i => i[1].some(x => x.privacy)) ? t('changelog:continue_and_agree') : t('changelog:continue')}</Button>}
        </View>)}
      </ScrollView>
    </SafeAreaView>;
  }
  if (!isReady) {
    return null;
  }
  var navWidth = 400;
  return (
    <NavigationContainer theme={theme.nav} independent={true} onStateChange={handleStateChange} initialState={initialState} ref={ref}>
      <StatusBar translucent={true} backgroundColor={theme.nav.colors.background + 'cc'} barStyle="light-content" />
      <DrawerNav />
    </NavigationContainer>
  );
}

function ThemeWrapper() {
  const paperTheme = useSelector(i => i.themes[i.selectedTheme]);
  return <PaperProvider theme={paperTheme}>
    <App />
  </PaperProvider>
}

export default function () { // Setup Providers
  React.useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      const link = response.notification.request.content.data?.body?.link;
      if (link) Linking.openURL(link);
    });
    return () => subscription.remove();
  }, []);
  return <SafeAreaProvider>
    <ReduxProvider store={store}>
      <ThemeWrapper />
    </ReduxProvider>
  </SafeAreaProvider>
}