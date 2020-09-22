import * as React from 'react'
import { View, Platform, Linking, Image } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import getIcon from 'utils/db/icon';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Text, TouchableRipple, Avatar, Menu, Divider, Button, Surface, useTheme, Provider as PaperProvider, TextInput } from 'react-native-paper'
import useSearch from 'utils/hooks/useSearch';
import { useDimensions } from '@react-native-community/hooks';
import { useAPIRequestWithoutNav } from 'utils/hooks/useAPIRequest';


import Fuse from 'fuse.js'
import types from 'utils/db/types.json';
import categories from 'utils/db/categories.json';
import useSetting from '../../utils/hooks/useSetting';

const options = {
  includeScore: true,
  keys: ['name', 'id', 'category']
}
const fuse = new Fuse([...types.filter(i => !i.hidden), ...categories.filter(i => !i.hidden)], options)

function DrawerItem(props) {
  const SurfaceOrView = props.focused ? Surface : View;
  const theme = useTheme();
  return <TouchableRipple onPress={props.onPress} style={{
    marginRight: props.mini ? 4 : 8, borderRadius: props.mini ? 48 : 4, opacity: 1 ?? props.style?.opacity ?? (props.focused ? 1 : 1),
    marginLeft: (props.mini ? 4 : 8) + ((props.indent || 0) * 4)
  }}>
    <SurfaceOrView style={{
      padding: 4, borderRadius: props.mini ? 48 : 4, elevation: props.focused ? 8 : 0, flexDirection: "row", alignItems: "center", justifyContent: props.mini ? "center" : "flex-start"
    }}>
      {props.image ? (props.noAvatar ? <Image style={{ height: 32, width: 32 }} source={props.image} /> : <Avatar.Image size={32} source={props.image} />) : <Avatar.Icon size={32} icon={props.icon} />}
      {!props.mini && <>
        <View style={{ width: 4 }}></View>
        {typeof props.label == "string" ? <View>
          <Text numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false} style={{ fontSize: 14, fontWeight: "500" }}>{props.label}</Text>
          {props.subtitle && <Text numberOfLines={1} ellipsizeMode="tail" allowFontScaling={false} style={{ fontSize: 12, fontWeight: "500", opacity: 0.8 }}>{props.subtitle}</Text>}
        </View> : <props.label color={theme.colors.text} />}
      </>}
      {props.right && <props.right />}
    </SurfaceOrView>
  </TouchableRipple>
}

function SearchView({ query, ...props }) {
  var { t } = useTranslation();
  var route = useSelector(i => i.route);
  var nav = props.navigation;
  var userMini = props.mini;
  const list = fuse.search(query);
  // const { data, status } = useAPIRequestWithoutNav({
  //   endpoint: 'user',
  //   data: { username: userDrawer.username }
  // }, true);
  var userItemProps = {
    side: props.side,
    mini: userMini
  }
  const theme = useTheme();
  return <View style={{ flex: 1, borderLeftWidth: 1, borderLeftColor: theme.colors.disabled }}>
    {list.slice(0, 20).map?.(({item:i}) => <DrawerItem
      key={i.name??"Hello"}
      {...userItemProps}
      style={{ marginVertical: 0 }}
      noAvatar={i.icon ? true : false}
      focused={(route.name == "DBType" && route.params?.munzee === i.id) || (route.name == "DBCategory" && route.params?.category === i.id)}
      image={getIcon(i.icon)}
      label={i.name??"Hello"}
      subtitle={i.category ? "Munzee Type" : (i.icon ? "Category" : (i.user_id ? "User" : "Clan"))}
      onPress={() => nav.reset({
        index: 1,
        routes: [
          { name: '__primary', params: i.category ? { screen: "DBType", params: { munzee: i.icon } } : { screen: "DBCategory", params: { category: i.id } } },
        ],
      })
      }
    />)}
  </View>;
}

function UserDrawerContent({ userDrawer, setUserDrawer, ...props }) {
  var { t } = useTranslation();
  var route = useSelector(i => i.route);
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
  ].filter(i => !i.hide)
  var userItemProps = {
    side: props.side,
    mini: userMini
  }
  const theme = useTheme();
  return (<View style={{ flex: 1, borderLeftWidth: 1, borderLeftColor: theme.colors.disabled }}>
    <DrawerItem
      {...userItemProps}
      style={{ marginVertical: 0, opacity: 1 }}
      icon="chevron-left"
      label="Back"
      onPress={() => {
        setUserDrawer(false)
      }}
    />
    <DrawerItem
      {...userItemProps}
      style={{ marginVertical: 0, opacity: 1 }}
      image={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(user_id).toString(36)}.png` }}
      label={userDrawer.username}
    />
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
      })
      }
    />)}
    {data?.clan && <>
      <Divider style={{ marginVertical: 4 }} />
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
    <Divider style={{ marginVertical: 4 }} />
    {categories.filter(i => i.parents.includes('root') && !i.hidden).map?.(p => <DrawerItem
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
    <Divider style={{ marginVertical: 4 }} />
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

export default function CustomDrawerContent(props) {
  var { width } = useDimensions().window;
  var [helpOpen, setHelpOpen] = React.useState(false);
  var [donateOpen, setDonateOpen] = React.useState(false);
  var [paypalOpen, setPaypalOpen] = React.useState(false);
  var [miniProp, setMini] = useSetting('mini_drawer', false);
  var { t } = useTranslation();
  var clanBookmarks = useSelector(i => i.clanBookmarks);
  var userBookmarks = useSelector(i => i.userBookmarks);
  var route = useSelector(i => i.route);
  var nav = props.navigation;
  var [showMoreClan, setShowMoreClan] = React.useState(false);
  var [showMoreUser, setShowMoreUser] = React.useState(false);
  var [userDrawerOpen, setUserDrawer] = React.useState(true);
  var userDrawer = (route.params?.username && userDrawerOpen) ? { username: route.params?.username } : false;
  var mini = userDrawer || miniProp;
  var userMini = miniProp;
  var [search, query, setSearch] = useSearch(300);

  React.useEffect(() => setUserDrawer(true), [route.params?.username]);
  React.useEffect(() => props.updateUserDrawer(userDrawer), [userDrawer?.username]);

  var top = [
    { title: t(`common:weekly_challenge`), icon: "calendar", page: "WeeklyWeeks" },
  ].filter(i => !i.hide)
  var pages = [
    { title: t(`common:bouncers`), icon: "map-marker", page: "Bouncers" },
    { title: t(`common:munzee_types`), icon: "database", page: "DBSearch" },
    { title: t(`common:calendar`), icon: "calendar", page: "Calendar" },
    { title: t(`common:evo_planner`), icon: "dna", page: "EvoPlanner" },
    { title: t(`common:scanner`), icon: "qrcode", page: "Scanner", hide: Platform.OS === "web" },
    { title: "Bookmark Manager", icon: "bookmark", page: "Bookmarks" },
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
  const theme = useTheme().drawer;
  return (
    <PaperProvider theme={theme}>
      <Surface style={{ flex: 1, elevation: 0 }}>
        <DrawerContentScrollView showsVerticalScrollIndicator={!mini} {...props}>
          {!userMini && <View style={{ paddingVertical: 4, paddingHorizontal: 8 }}>
            <TextInput value={search} mode="outlined" dense={true} left={<TextInput.Icon icon="magnify" />} onChangeText={(val) => setSearch(val)} label="Search" returnKeyLabel="Search" returnKeyType="search" />
          </View>}
          {query.length > 3 ? <SearchView query={query} {...props} /> : <View style={{ flexDirection: "row", flexGrow: 1 }}>
            {(!userDrawer || width >= 320) && <View style={userDrawer ? { width: 48 } : { flex: 1 }}>
              {!mini && <View style={{ paddingTop: 8, paddingBottom: 4, paddingLeft: 16 }}>
                <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", opacity: 0.8 }}>Remember this is a Beta build</Text>
                <Text allowFontScaling={false} style={{ fontSize: 12, fontWeight: "bold", opacity: 0.8 }}>Feedback is welcome in the CuppaZee Supporters group</Text>
              </View>}
              {!mini && Platform.OS === "web" && globalThis?.navigator?.userAgent?.match?.(/Android/) && <View style={{ paddingTop: 8, paddingBottom: 4, paddingLeft: 8 }}>
                <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", opacity: 0.8 }}>The CuppaZee App is now on Google Play</Text>
                <Text allowFontScaling={false} style={{ fontSize: 12, fontWeight: "bold", opacity: 0.8 }}>Download it now!</Text>
              </View>}
              {!mini && Platform.OS === "web" && globalThis?.navigator?.userAgent?.match?.(/iPhone|iPad|iPod/) && <View style={{ paddingTop: 8, paddingBottom: 4, paddingLeft: 8 }}>
                <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", opacity: 0.8 }}>The CuppaZee App is now on the App Store</Text>
                <Text allowFontScaling={false} style={{ fontSize: 12, fontWeight: "bold", opacity: 0.8 }}>Download it now!</Text>
              </View>}
              {top.map?.(i => <DrawerItem
                key={i.title}
                {...itemProps}
                style={{ marginVertical: 0, opacity: i.disabled ? 0.6 : 1 }}
                focused={route.name == i.page}
                icon={i.icon}
                label={i.title}
                onPress={i.disabled ? null : (i.link ? () => Linking.openURL(i.page) : () => nav.reset({
                  index: 1,
                  routes: [
                    { name: '__primary', params: { screen: i.page } },
                  ],
                }))
                }
              />)}
              <Divider style={{ marginVertical: 4 }} />
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
              {userBookmarks?.slice?.(0, showMoreUser ? Infinity : userBookmarks.length > 6 ? 5 : 6)?.filter?.(i => i)?.map?.((i, index) => <>
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
              {userBookmarks.length > 6 && <DrawerItem
                {...itemProps}
                style={{ marginVertical: 0 }}
                focused={false}
                icon={showMoreUser ? "chevron-up" : "chevron-down"}
                label={showMoreUser ? t(`common:show_less`) : t(`common:show_more`)}
                onPress={() => setShowMoreUser(!showMoreUser)}
              />}
              <Divider style={{ marginVertical: 4 }} />
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
              {clanBookmarks?.slice?.(0, showMoreClan ? Infinity : clanBookmarks.length > 6 ? 5 : 6)?.filter?.(i => i)?.map?.(i => <DrawerItem
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
              {clanBookmarks.length > 6 && <DrawerItem
                {...itemProps}
                style={{ marginVertical: 0 }}
                focused={false}
                icon={showMoreClan ? "chevron-up" : "chevron-down"}
                label={showMoreClan ? t(`common:show_less`) : t(`common:show_more`)}
                onPress={() => setShowMoreClan(!showMoreClan)}
              />}
              <Divider style={{ marginVertical: 4 }} />
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
              <Divider style={{ marginVertical: 4 }} />
              {more.map?.(i => <DrawerItem
                key={i.title}
                {...itemProps}
                style={{ marginVertical: 0, opacity: i.disabled ? 0.6 : 1 }}
                focused={route.name == i.page}
                icon={i.icon}
                label={i.title}
                onPress={i.disabled ? null : (i.link ? () => Linking.openURL(i.page) : () => nav.reset({
                  index: 1,
                  routes: [
                    { name: '__primary', params: { screen: i.page } },
                  ],
                }))
                }
              />)}
              <Menu
                visible={donateOpen}
                onDismiss={() => setDonateOpen(false)}
                anchor={
                  <DrawerItem
                    {...itemProps}
                    style={{ marginVertical: 0 }}
                    icon="coin"
                    label={t('common:donate')}
                    onPress={() => setDonateOpen(true)}
                  />
                }
              >
                <View style={{ paddingHorizontal: 4, alignItems: "stretch" }}>
                  <Button style={{ marginHorizontal: 4 }} color="#F96854" mode="contained" onPress={() => Linking.openURL('https://patreon.com/CuppaZee')} icon="patreon">{t('app_info:patreon_donate')}</Button>
                  <Button style={{ marginHorizontal: 4, marginTop: 4 }} color="#29abe0" mode="contained" onPress={() => Linking.openURL('https://ko-fi.com/sohcah')} icon="coffee">{t('app_info:kofi_donate')}</Button>
                  <Menu
                    visible={paypalOpen}
                    onDismiss={() => setPaypalOpen(false)}
                    anchor={
                      <Button style={{ marginHorizontal: 4, marginTop: 4 }} color="#009CDE" mode="contained" onPress={() => setPaypalOpen(true)} icon="paypal">{t('app_info:paypal_donate')}</Button>
                    }
                  >
                    <View style={{ paddingHorizontal: 8 }}>
                      <Text>{t('app_info:paypal_donate_desc')}</Text>
                    </View>
                  </Menu>
                </View>
              </Menu>
              <Menu
                visible={helpOpen}
                onDismiss={() => setHelpOpen(false)}
                anchor={
                  <DrawerItem
                    {...itemProps}
                    style={{ marginVertical: 0 }}
                    icon="help-circle"
                    label={t('common:help')}
                    onPress={() => setHelpOpen(true)}
                  />
                }
              >
                <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
                  <View style={{ flexDirection: "row" }}>
                    <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold" }}>{t('common:contact.facebook')} </Text>
                    <TouchableRipple onPress={() => Linking.openURL('https://m.me/CuppaZee')}><Text allowFontScaling={false} style={{ color: theme.colors.text == "#000000" ? 'blue' : 'lightblue', fontSize: 16, fontWeight: "bold" }}>@CuppaZee</Text></TouchableRipple>
                  </View>
                  <Text allowFontScaling={false} style={{ fontSize: 16 }}>{t('common:contact.email')}</Text>
                </View>
              </Menu>
            </View>}
            {userDrawer && <UserDrawerContent userDrawer={userDrawer} setUserDrawer={setUserDrawer} {...props} />}
          </View>}
        </DrawerContentScrollView>
        {width > 1000 && <>
          <Divider />
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