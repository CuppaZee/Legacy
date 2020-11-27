// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { View, Platform, Linking, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text, TouchableRipple, Avatar, Menu, Divider, Button, Surface, useTheme, Provider as PaperProvider, TextInput } from 'react-native-paper'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useSearch' or its ... Remove this comment to see the full error message
import useSearch from 'utils/hooks/useSearch';
import { useDimensions } from '@react-native-community/hooks';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import { useAPIRequestWithoutNav } from 'utils/hooks/useAPIRequest';


import Fuse from 'fuse.js'
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module 'utils/db/types.json'. Consider... Remove this comment to see the full error message
import types from 'utils/db/types.json';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module 'utils/db/categories.json'. Con... Remove this comment to see the full error message
import categories from 'utils/db/categories.json';
import useSetting from '../../utils/hooks/useSetting';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const options = {
  includeScore: true,
  keys: ['name', 'id', 'category', 'user_id', 'username']
}

function DrawerItem(props: any) {
  const SurfaceOrView = props.focused ? Surface : View;
  const theme = useTheme();
  const [isHovered, setIsHovered] = React.useState(false);
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <View
    onMouseEnter={() => setIsHovered(true)}
    onMouseLeave={() => setIsHovered(false)}
    style={props.onPress ? { transitionDuration: '150ms', opacity: isHovered ? 0.5 : 1, cursor: "pointer" } : {}}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <TouchableRipple onPress={props.onPress} style={{
      marginRight: props.mini ? 4 : 8, borderRadius: props.mini ? 48 : 4, opacity: 1 ?? props.style?.opacity ?? (props.focused ? 1 : 1),
      marginLeft: (props.mini ? 4 : 8) + ((props.indent || 0) * 4)
    }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <SurfaceOrView style={{
        padding: 4, borderRadius: props.mini ? 48 : 4, elevation: props.focused ? 8 : 0, flexDirection: "row", alignItems: "center", justifyContent: props.mini ? "center" : "flex-start"
      }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {props.image ? (props.noAvatar ? <Image style={{ height: 32, width: 32 }} source={props.image} /> : <Avatar.Image size={32} source={props.image} />) : <Avatar.Icon size={32} icon={props.icon} />}
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {!props.mini && <>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ width: 4 }}></View>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {typeof props.label == "string" ? <View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false} style={{ fontSize: 14, fontWeight: "500" }}>{props.label}</Text>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {props.subtitle && <Text numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false} style={{ fontSize: 12, fontWeight: "500", opacity: 0.8 }}>{props.subtitle}</Text>}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          </View> : <props.label color={theme.colors.text} />}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ flex: 1}} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {props.rightImage ? (props.noAvatar ? <Image style={{ height: 32, width: 32 }} source={props.rightImage} /> : <Avatar.Image size={32} source={props.rightImage} />) : (props.rightIcon && <Avatar.Icon size={32} icon={props.rightIcon} />)}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {props.right && <props.right />}
        </>}
      </SurfaceOrView>
    </TouchableRipple>
  </View>
}

function SearchItem ({
  i,
  userItemProps,
  ...props
}: any) {
  var { t } = useTranslation();
  var route = useSelector((i: any) => i.route);
  var nav = props.navigation;
  if(i.user_id) {
    // User
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <DrawerItem
      key={i.username}
      {...userItemProps}
      style={{ marginVertical: 0 }}
      focused={route.name?.startsWith('User') && route.params?.username?.toLowerCase() === i.username.toLowerCase()}
      image={{uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(i.user_id).toString(36)}.png`}}
      label={i.username}
      subtitle="User"
      onPress={() => nav.reset({
        index: 1,
        routes: [
          { name: '__primary', params: { screen: "UserActivity", params: { username: i.username } } },
        ],
      })
      }
    />
  }
  if(i.clan_id) {
    // Clan
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <DrawerItem
      key={i.name}
      {...userItemProps}
      style={{ marginVertical: 0 }}
      focused={route.name === "ClanDetails" && route.params?.clanid === i.clan_id}
      image={{uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${Number(i.clan_id).toString(36)}.png`}}
      label={i.name}
      subtitle="Clan"
      onPress={() => nav.reset({
        index: 1,
        routes: [
          { name: '__primary', params: { screen: "ClanDetails", params: { clanid: i.clan_id } } },
        ],
      })
      }
    />
  }
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <DrawerItem
    key={i.name??"Hello"}
    {...userItemProps}
    style={{ marginVertical: 0 }}
    noAvatar={i.icon ? true : false}
    focused={(route.name == "DBType" && route.params?.munzee === i.id) || (route.name == "DBCategory" && route.params?.category === i.id)}
    image={i.user_id ? {uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(i.user_id).toString(36)}.png`} : getIcon(i.icon)}
    label={i.name??i.username??"Hello"}
    subtitle={i.category ? "Munzee Type" : (i.icon ? "Category" : (i.user_id ? "User" : "Clan"))}
    onPress={() => nav.reset({
      index: 1,
      routes: [
        { name: '__primary', params: i.category ? { screen: "DBType", params: { munzee: i.icon } } : { screen: "DBCategory", params: { category: i.id } } },
      ],
    })
    }
  />
}

function SearchView({
  query,
  ...props
}: any) {
  var userMini = props.mini;
  const { data: users } = useAPIRequestWithoutNav({
    endpoint: 'user/find',
    data: { text: query }
  }, true);
  const { data: clans } = useAPIRequestWithoutNav({
    endpoint: 'clan/list',
    data: { query, format: "list" },
    cuppazee: true
  }, true);
  const fuse = new Fuse([...types.filter((i: any) => !i.hidden), ...categories.filter((i: any) => !i.hidden), ...(users?.users||[]), ...(clans||[])], options)
  const list = fuse.search(query);
  var userItemProps = {
    side: props.side,
    mini: userMini
  }
  const theme = useTheme();
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <View style={{ flex: 1, borderLeftWidth: 1, borderLeftColor: theme.colors.disabled }}>
    {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
    {list.slice(0, 20).filter(i=>i.score < 0.7).map?.(({item:i}) => <SearchItem i={i} userItemProps={userItemProps} navigation={props.navigation} />)}
  </View>;
}

function UserDrawerContent({
  userDrawer,
  setUserDrawer,
  ...props
}: any) {
  var { t } = useTranslation();
  var route = useSelector((i: any) => i.route);
  var nav = props.navigation;
  var userMini = props.mini;
  const { data, status } = useAPIRequestWithoutNav({
    endpoint: 'user',
    data: { username: userDrawer.username }
  }, true);
  let user_id = data?.user_id
  var userPages = [
    { title: t(`user:activity`), icon: "calendar", page: "UserActivity" },
    { title: t(`user:inventory`), icon: "package", page: "UserInventory" },
    { title: t(`user:zeeops`), icon: "briefcase", page: "UserZeeOps", new: true },
    { title: t(`user:your_bouncers`), icon: "star", page: "UserBouncers" },
    { title: t(`user:blast_checker`), icon: "bomb", page: "UserBlastMap" },
    { title: t(`user:qrew_checker`), icon: "hammer", page: "UserQRew" },
    { title: t(`user:universal_capper`), icon: "earth", page: "UserUniversal" },
    { title: t(`user:clan_progress`), icon: "shield-half-full", page: "UserClan", hide: status === "loading" || data?.clan },
  ].filter(i => !i.hide)
  var userChallenges = [
    { title: t(`user:sh_lite`), icon: "star-half", page: "UserSHCLite" },
    { title: t(`user:sh_pro`), icon: "star", page: "UserSHCPro" },
    { title: t(`user:poi_challenge`), icon: "map-marker-check", page: "UserPOI" },
    { title: t(`user:colour_challenge`), icon: "palette", page: "UserColour" },
    { title: t(`user:quebec_quest_progress`), icon: "run", page: "UserQuest" },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hide' does not exist on type '{ title: s... Remove this comment to see the full error message
  ].filter(i => !i.hide)
  var userItemProps = {
    side: props.side,
    mini: userMini
  }
  const theme = useTheme();
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1, borderLeftWidth: 1, borderLeftColor: theme.colors.disabled }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DrawerItem
        {...userItemProps}
        style={{ marginVertical: 0, opacity: 1 }}
        icon="chevron-left"
        label="Back"
        onPress={() => {
          setUserDrawer(false)
        }}
      />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <DrawerItem
        {...userItemProps}
        style={{ marginVertical: 0, opacity: 1 }}
        image={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(user_id).toString(36)}.png` }}
        label={userDrawer.username}
      />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {userPages.map?.(p => <DrawerItem
        key={p.title}
        {...userItemProps}
        style={{ marginVertical: 0 }}
        focused={route.name == p.page && route.params.username == userDrawer.username}
        icon={p.icon}
        label={p.title}
        onPress={() => nav.reset({
          index: 1,
          routes: [
            { name: '__primary', params: { screen: p.page, params: { username: userDrawer.username } } },
          ],
        })}
        rightIcon={p.new ? "star" : null}
      />)}
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {data?.clan && <>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Divider style={{ marginVertical: 4 }} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <DrawerItem
          {...userItemProps}
          style={{ marginVertical: 0 }}
          focused={route.name == "Clan" && route.params.clanid == data.clan.id}
          image={{ uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${Number(data.clan.id).toString(36)}.png` }}
          label={data.clan.name}
          onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: { screen: "Clan", params: { clanid: data.clan.id } } },
            ],
          })
          }
        />
      </>}
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Divider style={{ marginVertical: 4 }} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {categories.filter((i: any) => i.parents.includes('root') && !i.hidden).map?.((p: any) => <DrawerItem
        key={p.name}
        {...userItemProps}
        style={{ marginVertical: 0 }}
        noAvatar={true}
        focused={route.name == "UserCapturesCategory" && route.params.category === p.id && route.params.username == userDrawer.username}
        image={getIcon(p.icon)}
        label={p.name}
        onPress={() => nav.reset({
          index: 1,
          routes: [
            { name: '__primary', params: { screen: "UserCapturesCategory", params: { username: userDrawer.username, category: p.id } } },
          ],
        })
        }
      />)}
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Divider style={{ marginVertical: 4 }} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {userChallenges.map?.(p => <DrawerItem
        key={p.title}
        {...userItemProps}
        style={{ marginVertical: 0 }}
        focused={route.name == p.page && route.params.username == userDrawer.username}
        icon={p.icon}
        label={p.title}
        onPress={() => nav.reset({
          index: 1,
          routes: [
            { name: '__primary', params: { screen: p.page, params: { username: userDrawer.username } } },
          ],
        })
        }
      />)}
    </View>
  );
}

export default function CustomDrawerContent(props: any) {
  var { width } = useDimensions().window;
  var [helpOpen, setHelpOpen] = React.useState(false);
  var [donateOpen, setDonateOpen] = React.useState(false);
  var [paypalOpen, setPaypalOpen] = React.useState(false);
  var [miniProp, setMini] = useSetting('mini_drawer', false);
  var { t } = useTranslation();
  var clanBookmarks = useSelector((i: any) => i.clanBookmarks);
  var userBookmarks = useSelector((i: any) => i.userBookmarks);
  var route = useSelector((i: any) => i.route);
  var nav = props.navigation;
  var [showMoreClan, setShowMoreClan] = React.useState(false);
  var [showMoreUser, setShowMoreUser] = React.useState(false);
  var [userDrawerOpen, setUserDrawer] = React.useState(true);
  var userDrawer = (route.params?.username && userDrawerOpen) ? { username: route.params?.username } : false;
  var mini = userDrawer || (width > 1000 ? miniProp : false);
  var w = width > 1000 ? (miniProp ? (userDrawer ? 96 : 48) : 280) : Math.min(320, width);
  var userMini = (width > 1000 ? miniProp : false);
  var [search, query, setSearch] = useSearch(300);

  React.useEffect(() => setUserDrawer(true), [route.params?.username]);

  var top = [
    // { title: "Camps Leaderboard", icon: "flag", page: "AllCampWeeks" },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hide' does not exist on type 'never'.
  ].filter(i => !i.hide)
  var pages = [
    { title: t(`common:bouncers`), icon: "map-marker", page: "Bouncers" },
    { title: t(`common:munzee_types`), icon: "database", page: "DBSearch" },
    { title: t(`common:calendar`), icon: "calendar", page: "Calendar" },
    { title: t(`common:evo_planner`), icon: "dna", page: "EvoPlanner" },
    { title: t(`common:test_scan`), icon: "qrcode", page: "Scanner" },
    { title: t(`common:weekly_challenge`), icon: "calendar", page: "WeeklyWeeks" },
    { title: "Zeecret Agents Competition", icon: "briefcase", page: "CompetitionHome" },
    { title: "Bookmark Manager", icon:"bookmark", page:"Bookmarks" },
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'hide' does not exist on type '{ title: s... Remove this comment to see the full error message
  ].filter(i => !i.hide)
  var more = [
    { title: t(`common:notifications`), icon: "bell", page: "Notifications", hide: Platform.OS === "web" },
    { title: t(`common:settings`), icon: "settings", page: "Settings" },
    { title: t(`common:app_info`), icon: "information", page: "Info" },
    { title: `GitHub`, icon: "github-circle", page: "https://github.com/CuppaZee/CuppaZee", link: true }
  ].filter(i => !i.hide)
  var itemProps = {
    side: props.side,
    mini: mini
  }
  var userItemProps = {
    side: props.side,
    mini: userMini
  }
  const theme = useTheme();
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <PaperProvider theme={theme}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Surface style={{ backgroundColor: theme.colors.background, flex: 1, elevation: 0, width: w }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <DrawerContentScrollView showsVerticalScrollIndicator={!mini} {...props}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {!userMini && <View style={{ paddingVertical: 4, paddingHorizontal: 8 }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <TextInput value={search} mode="outlined" dense={true} left={<TextInput.Icon icon="magnify" />} onChangeText={(val: any) => setSearch(val)} label="Search" returnKeyLabel="Search" returnKeyType="search" />
          </View>}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {!userMini && <Surface style={{ backgroundColor: "#aa0000", elevation: 4, margin: 4, padding: 4, flexDirection: "row", alignItems: "center" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <MaterialCommunityIcons color="#ffffff" name="alert" size={24} style={{margin: 4}} />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", color: "#ffffff" }}>PRIVATE BETA BUILD</Text>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text allowFontScaling={false} style={{ fontSize: 12, fontWeight: "bold", color: "#ffffff" }}>Do NOT share screenshots</Text>
            </View>
          </Surface>}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {query.length > 1 ? <SearchView query={query} {...props} /> : <View style={{ flexDirection: "row", flexGrow: 1 }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {(!userDrawer || width >= 320) && <View style={userDrawer ? { width: 48 } : { flex: 1 }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {!mini && Platform.OS === "web" && globalThis?.navigator?.userAgent?.match?.(/Android/) && <View style={{ paddingTop: 8, paddingBottom: 4, paddingLeft: 8 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", opacity: 0.8 }}>The CuppaZee App is now on Google Play</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ fontSize: 12, fontWeight: "bold", opacity: 0.8 }}>Download it now!</Text>
              </View>}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {!mini && Platform.OS === "web" && globalThis?.navigator?.userAgent?.match?.(/iPhone|iPad|iPod/) && <View style={{ paddingTop: 8, paddingBottom: 4, paddingLeft: 8 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", opacity: 0.8 }}>The CuppaZee App is now on the App Store</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ fontSize: 12, fontWeight: "bold", opacity: 0.8 }}>Download it now!</Text>
              </View>}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {top.map?.(i => <DrawerItem
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type 'never'.
                key={i.title}
                {...itemProps}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type 'never'... Remove this comment to see the full error message
                style={{ marginVertical: 0, opacity: i.disabled ? 0.6 : 1 }}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'page' does not exist on type 'never'.
                focused={route.name == i.page}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type 'never'.
                icon={i.icon}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'title' does not exist on type 'never'.
                label={i.title}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type 'never'... Remove this comment to see the full error message
                onPress={i.disabled ? null : (i.link ? () => Linking.openURL(i.page) : () => nav.reset({
                  index: 1,
                  routes: [
                    // @ts-expect-error ts-migrate(2339) FIXME: Property 'page' does not exist on type 'never'.
                    { name: '__primary', params: { screen: i.page } },
                  ],
                }))
                }
              />)}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Divider style={{ marginVertical: 4 }} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <DrawerItem
                {...itemProps}
                icon="format-list-bulleted"
                label="All Users"
                focused={route.name == "AllUsers"}
                onPress={() => nav.reset({
                  index: 1,
                  routes: [
                    { name: '__primary', params: { screen: "AllUsers" } },
                  ],
                })}
              />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {userBookmarks?.slice?.(0, showMoreUser ? Infinity : userBookmarks.length > 6 ? 5 : 6)?.filter?.((i: any) => i)?.map?.((i: any, index: any) => <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <DrawerItem
                  key={`user_${i.user_id}`}
                  {...itemProps}
                  style={{ marginVertical: 0 }}
                  focused={route.name?.startsWith?.('User') && route.params?.username === i.username}
                  image={{ uri: i.logo ?? `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(i.user_id || 0).toString(36)}.png` }}
                  label={i.username}
                  onPress={() => {
                    if (!(route.name === 'UserDetails' && route.params?.username === i.username)) nav.reset({
                      index: 1,
                      routes: [
                        { name: '__primary', params: { screen: "UserDetails", params: { username: i.username } } },
                      ],
                    })
                    nav.openDrawer();
                    setUserDrawer(true);
                  }}
                />
              </>)}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {userBookmarks.length > 6 && <DrawerItem
                {...itemProps}
                style={{ marginVertical: 0 }}
                focused={false}
                icon={showMoreUser ? "chevron-up" : "chevron-down"}
                label={showMoreUser ? t(`common:show_less`) : t(`common:show_more`)}
                onPress={() => setShowMoreUser(!showMoreUser)}
              />}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Divider style={{ marginVertical: 4 }} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <DrawerItem
                {...itemProps}
                icon="format-list-bulleted"
                label="All Clans"
                focused={route.name == "AllClans"}
                onPress={() => nav.reset({
                  index: 1,
                  routes: [
                    { name: '__primary', params: { screen: "AllClans" } },
                  ],
                })}
              />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <DrawerItem
                {...itemProps}
                icon="playlist-check"
                label="Clan Requirements"
                focused={route.name == "ClanRequirements"}
                onPress={() => nav.reset({
                  index: 1,
                  routes: [
                    { name: '__primary', params: { screen: "ClanRequirements", params: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 } } },
                  ],
                })}
              />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {clanBookmarks?.slice?.(0, showMoreClan ? Infinity : clanBookmarks.length > 6 ? 5 : 6)?.filter?.((i: any) => i)?.map?.((i: any) => <DrawerItem
                key={`clan_${i.clan_id}`}
                {...itemProps}
                style={{ marginVertical: 0 }}
                focused={route.name == "Clan" && route.params?.clanid == Number(i.clan_id)}
                image={{ uri: i.logo ?? `https://munzee.global.ssl.fastly.net/images/clan_logos/${(i.clan_id || 0).toString(36)}.png` }}
                label={i.name}
                onPress={() => nav.reset({
                  index: 1,
                  routes: [
                    { name: '__primary', params: { screen: "Clan", params: { clanid: Number(i.clan_id) } } },
                  ],
                })
                }
              />)}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {clanBookmarks.length > 6 && <DrawerItem
                {...itemProps}
                style={{ marginVertical: 0 }}
                focused={false}
                icon={showMoreClan ? "chevron-up" : "chevron-down"}
                label={showMoreClan ? t(`common:show_less`) : t(`common:show_more`)}
                onPress={() => setShowMoreClan(!showMoreClan)}
              />}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Divider style={{ marginVertical: 4 }} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {pages.map?.(i => <DrawerItem
                key={i.title}
                {...itemProps}
                style={{ marginVertical: 0 }}
                focused={route.name == i.page}
                icon={i.icon}
                label={i.title}
                onPress={() => nav.reset({
                  index: 1,
                  routes: [
                    { name: '__primary', params: { screen: i.page } },
                  ],
                })
                }
              />)}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Divider style={{ marginVertical: 4 }} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {more.map?.(i => <DrawerItem
                key={i.title}
                {...itemProps}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type '{ titl... Remove this comment to see the full error message
                style={{ marginVertical: 0, opacity: i.disabled ? 0.6 : 1 }}
                focused={route.name == i.page}
                icon={i.icon}
                label={i.title}
                // @ts-expect-error ts-migrate(2339) FIXME: Property 'disabled' does not exist on type '{ titl... Remove this comment to see the full error message
                onPress={i.disabled ? null : (i.link ? () => Linking.openURL(i.page) : () => nav.reset({
                  index: 1,
                  routes: [
                    { name: '__primary', params: { screen: i.page } },
                  ],
                }))
                }
              />)}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Menu
                visible={donateOpen}
                onDismiss={() => setDonateOpen(false)}
                anchor={
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <DrawerItem
                    {...itemProps}
                    style={{ marginVertical: 0 }}
                    icon="coin"
                    label={t('common:donate')}
                    onPress={() => setDonateOpen(true)}
                  />
                }
              >
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ paddingHorizontal: 4, alignItems: "stretch" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Button style={{ marginHorizontal: 4 }} color="#F96854" mode="contained" onPress={() => Linking.openURL('https://patreon.com/CuppaZee')} icon="patreon">{t('app_info:patreon_donate')}</Button>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Button style={{ marginHorizontal: 4, marginTop: 4 }} color="#29abe0" mode="contained" onPress={() => Linking.openURL('https://ko-fi.com/sohcah')} icon="coffee">{t('app_info:kofi_donate')}</Button>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Menu
                    visible={paypalOpen}
                    onDismiss={() => setPaypalOpen(false)}
                    anchor={
                      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                      <Button style={{ marginHorizontal: 4, marginTop: 4 }} color="#009CDE" mode="contained" onPress={() => setPaypalOpen(true)} icon="paypal">{t('app_info:paypal_donate')}</Button>
                    }
                  >
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={{ paddingHorizontal: 8 }}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text>{t('app_info:paypal_donate_desc')}</Text>
                    </View>
                  </Menu>
                </View>
              </Menu>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Menu
                visible={helpOpen}
                onDismiss={() => setHelpOpen(false)}
                anchor={
                  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                  <DrawerItem
                    {...itemProps}
                    style={{ marginVertical: 0 }}
                    icon="help-circle"
                    label={t('common:help')}
                    onPress={() => setHelpOpen(true)}
                  />
                }
              >
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ flexDirection: "row" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold" }}>{t('common:contact.facebook')} </Text>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <TouchableRipple onPress={() => Linking.openURL('https://m.me/CuppaZee')}><Text allowFontScaling={false} style={{ color: theme.colors.text == "#000000" ? 'blue' : 'lightblue', fontSize: 16, fontWeight: "bold" }}>@CuppaZee</Text></TouchableRipple>
                  </View>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ fontSize: 16 }}>{t('common:contact.email')}</Text>
                </View>
              </Menu>
            </View>}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {userDrawer && <UserDrawerContent userDrawer={userDrawer} setUserDrawer={setUserDrawer} mini={miniProp} {...props} />}
          </View>}
        </DrawerContentScrollView>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {width > 1000 && <>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Divider />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <DrawerItem
            {...userItemProps}
            style={{ marginVertical: 0, opacity: 1 }}
            icon={userMini ? "chevron-right" : "chevron-left"}
            label="Shrink"
            onPress={() => {
              setMini(!userMini)
            }}
          />
        </>}
      </Surface>
    </PaperProvider>
  );
}
