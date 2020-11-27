// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
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
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Provider as ReduxProvider, useSelector, useDispatch } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/store' or its correspond... Remove this comment to see the full error message
import s from 'utils/store';
import 'utils/lang/i18n';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module '@loa... Remove this comment to see the full error message
import loadable from '@loadable/component';
import changelogs from './changelogs';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
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

// @ts-expect-error ts-migrate(6142) FIXME: Module './sections/Shared/LoadingPage' was resolve... Remove this comment to see the full error message
import LoadingPage from './sections/Shared/LoadingPage';
import font from './sections/Shared/font';

import * as Sentry from './sentry';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './private.config' or its corre... Remove this comment to see the full error message
import privateConfig from './private.config';
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name '__DEV__'.
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
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return () => <LoadingPage error={true} x={page.background} />
    }
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  }, { fallback: <LoadingPage x={page.background} /> })
}));
for (var page of pages) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  pageScreens[page.name] = page.path;
}

// Navigation Sections
// @ts-expect-error ts-migrate(6142) FIXME: Module './sections/Main/Drawer' was resolved to 'C... Remove this comment to see the full error message
import DrawerContent from './sections/Main/Drawer';

// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Platform, View, StatusBar, ActivityIndicator, ScrollView, Image, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Provider as PaperProvider, Text, Button, DefaultTheme, DarkTheme, useTheme, Avatar, Subheading, Title, Paragraph, Headline } from 'react-native-paper';

import { useDimensions } from '@react-native-community/hooks';
import * as WebBrowser from 'expo-web-browser';
import * as Notifications from 'expo-notifications';
// @ts-expect-error ts-migrate(6142) FIXME: Module './sections/Main/Header' was resolved to 'C... Remove this comment to see the full error message
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
  var users = useSelector((i: any) => i.userBookmarks);
  if (users && users[0]) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'replace' does not exist on type 'Navigat... Remove this comment to see the full error message
    nav.replace('UserDetails', { username: users[0].username });
  }
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <Text>_redirect</Text>;
}

// @ts-expect-error ts-migrate(6142) FIXME: Module './sections/Main/Auth' was resolved to 'C:/... Remove this comment to see the full error message
const AuthScreen = loadable(() => import('./sections/Main/Auth'), { fallback: <LoadingPage /> })

function StackNav() {
  const loggedIn = useSelector((i: any) => i.loggedIn);
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Stack.Navigator
      screenOptions={({
        navigation,
        route
      }: any) => ({
        // gestureEnabled: Platform.OS == 'ios',
        // animationEnabled: false,
        // headerShown: true,
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        header: (props: any) => <Header {...(props || {})} />,
        // headerStyle: {
        //   height: 80, // Specify the height of your custom header
        // }

      })}
    >
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {loggedIn && <>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Stack.Screen
          name="_redirect"
          component={RedirectScreen}
        />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {screens.filter(i => !i.nologin).map(screen => <Stack.Screen
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ key: string; name: string; component: any;... Remove this comment to see the full error message
          key={screen.name}
          name={screen.name}
          component={screen.screen}
        />)}
      </>}
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Stack.Screen
        name="Auth"
        options={{
          title: "Authenticate",
        }}
        component={AuthScreen}
      />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {screens.filter(i => i.nologin).map(screen => <Stack.Screen
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ key: string; name: string; component: any;... Remove this comment to see the full error message
        key={screen.name}
        name={screen.name}
        component={screen.screen}
      />)}
    </Stack.Navigator>
  );
}

function DrawerNav() {
  var { width } = useDimensions().window;
  var loggedIn = useSelector((i: any) => i.loggedIn);
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Drawer.Navigator
      drawerPosition="left"
      drawerStyle={{ width: null }}
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      drawerContent={(props: any) => <DrawerContent side="left" {...props} />}
      drawerType={(width > 1000 && loggedIn) ? "permanent" : "front"}
      edgeWidth={loggedIn ? 100 : 0}
    >
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Drawer.Screen
        name="__primary"
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: "__primary"; label: string; options:... Remove this comment to see the full error message
        label="__primary"
        options={{
          title: "CuppaZee",
        }}
        component={StackNav}
      />
    </Drawer.Navigator>
  );
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
  const loadingLogin = useSelector((i: any) => i.loadingLogin || i.version < 0);
  const version = useSelector((i: any) => i.version);
  const ref = React.useRef();
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const { getInitialState } = useLinking(ref, {
    prefixes: ['https://cuppazee.app', 'cuppazee://'],
    config: {
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ __primary: { screens: { Auth: string; }; }... Remove this comment to see the full error message
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
          // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
          setTimeout(() => dispatch(setCurrentRoute(state?.routes?.[0]?.state?.routes?.slice?.()?.reverse?.()?.[0] ?? {})), 100);
          setInitialState(state);
        }

        setIsReady(true);
      });
  }, [getInitialState]);

  function handleStateChange(a: any) {
    dispatch(setCurrentRoute(a?.routes?.[0]?.state?.routes?.slice?.()?.reverse?.()?.[0] ?? {}))
  }
  if (!fontsLoaded) {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>;
  }
  if (loadingLogin) {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.colors.background }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Title style={{ marginBottom: 20 }}>{t('common:logging_in')}</Title>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ActivityIndicator size="large" color={theme.colors.primary} />
    </View>;
  }
  if (version != Math.max(...Object.keys(changelogs).map(Number))) {
    var arr = Object.keys(changelogs).map(Number).filter(i => i > version).slice(-10).sort((a, b) => a - b);
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    var logs = arr.map(i => [i, changelogs[i]])
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <SafeAreaView style={{ backgroundColor: theme.colors.background, height: "100%" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ padding: 8, justifyContent: "center", alignItems: "center", flexGrow: 1 }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {logs.map(([build, log]) => <View style={{ maxWidth: "100%" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ alignItems: "center" }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Headline>{t('changelog:build_n', { n: build })}</Headline>
            </View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {log?.map((i: any) => <View style={{ flexDirection: "row", alignItems: "center", width: 400, maxWidth: "100%" }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {i.image && <Image source={getIcon(i.image)} style={{ height: 48, width: 48 }} />}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {i.icon && <Avatar.Icon icon={i.icon} size={48} />}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ padding: 8, flex: 1 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Title>{i.title}</Title>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Paragraph>{i.description}</Paragraph>
              </View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            </View>) ?? <Text allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 20, marginBottom: 20 }}>{t('changelog:no_changelog')}</Text>}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {build == Math.max(...Object.keys(changelogs).map(Number)) && <Button mode="contained" onPress={() => {
              dispatch(cuppazeeVersion(Math.max(...Object.keys(changelogs).map(Number))))
            }}>{logs.some(i => i[1].some((x: any) => x.privacy)) ? t('changelog:continue_and_agree') : t('changelog:continue')}</Button>}
          </View>)}
        </ScrollView>
      </SafeAreaView>
    );
  }
  if (!isReady) {
    return null;
  }
  var navWidth = 400;
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <NavigationContainer theme={theme.nav} independent={true} onStateChange={handleStateChange} initialState={initialState} ref={ref}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <StatusBar translucent={true} backgroundColor={theme.nav.colors.background + 'cc'} barStyle="light-content" />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DrawerNav />
    </NavigationContainer>
  );
}

function ThemeWrapper() {
  const paperTheme = useSelector((i: any) => i.themes[i.selectedTheme]);
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <PaperProvider theme={paperTheme}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <App />
  </PaperProvider>
}

export default function () { // Setup Providers
  React.useEffect(() => {
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
      const link = response.notification.request.content.data?.body?.link;
      if (link) Linking.openURL(link);
    });
    return () => subscription.remove();
  }, []);
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <SafeAreaProvider>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <ReduxProvider store={store}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ThemeWrapper />
    </ReduxProvider>
  </SafeAreaProvider>
}