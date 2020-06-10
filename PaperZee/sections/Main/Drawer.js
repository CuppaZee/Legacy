import * as React from 'react'
import { Text, View, Image, Platform, Linking } from 'react-native';
import {
  DrawerContentScrollView,
  // DrawerItem
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { TouchableRipple, IconButton, Menu } from 'react-native-paper'
import font from '~sections/Shared/font';

function DrawerItem(props) {

  return <TouchableRipple onPress={props.onPress} style={props.side == "right" ? {
    marginLeft: 8, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, opacity: props.style?.opacity ?? (props.focused ? 1 : 0.9)
  } : {
      marginRight: 8, borderTopRightRadius: 8, borderBottomRightRadius: 8, opacity: props.style?.opacity ?? (props.focused ? 1 : 0.9)
    }}>
    <View style={props.side == "right" ? {
      borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: props.focused ? props.activeBackgroundColor : "transparent", padding: 4, paddingRight: 16, flexDirection: "row", alignItems: "center"
    } : {
        borderTopRightRadius: 8, borderBottomRightRadius: 8, backgroundColor: props.focused ? props.activeBackgroundColor : "transparent", padding: 4, paddingLeft: 16, flexDirection: "row", alignItems: "center"
      }}>
      <props.icon color={props.focused ? props.activeTintColor : props.inactiveTintColor} />
      {!props.mini && <>
        <View style={{ width: 4 }}></View>
        {typeof props.label == "string" ? <Text allowFontScaling={false} style={{ color: props.focused ? props.activeTintColor : props.inactiveTintColor, fontSize: 14, ...font("500") }}>{props.label}</Text> : <props.label color={props.focused ? props.activeTintColor : props.inactiveTintColor} />}
      </>}
    </View>
  </TouchableRipple>
  /*<DrawerItem
        key={i.title}
        {...itemProps}
        style={{marginVertical:0}}
        focused={route.name==i.page}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name={i.icon} color={color} size={24} style={{margin: 4}} />}
        label={i.title}
        onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: i.page} },
            ],
          })
        }
      /> */
}

export default function CustomDrawerContent(props) {
  var [helpOpen, setHelpOpen] = React.useState(false);
  var mini = props.mini;
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var clanBookmarks = useSelector(i => i.clanBookmarks);
  var users = useSelector(i => Object.entries(i.logins));
  var route = useSelector(i => i.route);
  var nav = props.navigation;
  var [showMoreClan, setShowMoreClan] = React.useState(false);
  var pages = [
    // { title: t(`common:maps`), icon: "map", page: "Map" },
    { title: "Bouncers", icon: "map-marker", page: "Bouncers" },
    { title: t(`common:munzee_types`), icon: "database", page: "DBSearch" },
    { title: t(`common:calendar`), icon: "calendar", page: "Calendar" },
    { title: t(`common:scanner`), icon: "qrcode", page: "Scanner", hide: Platform.OS === "web" },
    // {title:t(`common:tools`),icon:"wrench",page:"Tools"},
  ].filter(i => !i.hide)
  var more = [
    { title: t(`common:settings`), icon: "settings", page: "Settings" },
    { title: t(`common:app_info`), icon: "information", page: "Info" },
    { title: `GitHub`, icon: "github-circle", page: "https://github.com/CuppaZee/CuppaZee", link: true }
  ].filter(i => !i.hide)
  var itemProps = {
    side: props.side,
    mini: mini,
    activeBackgroundColor: theme.navigation_selected?.bg ?? theme.navigation.fg,
    activeTintColor: theme.navigation_selected?.fg ?? theme.navigation.bg,
    inactiveTintColor: theme.navigation.fg
  }
  return (
    <DrawerContentScrollView style={{ backgroundColor: theme.navigation.bg, ...(theme.page_content.border ? { borderRightWidth: 1, borderRightColor: "white" } : {}) }} {...props}>
      {/* <View style={{ paddingTop: 8, paddingBottom: 4, paddingLeft: 16 }}>
        <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.navigation.fg, opacity: 0.8 }}>Remember this is a{Platform.OS == "android" ? 'n Early Access' : ' Beta'} build</Text>
        <Text allowFontScaling={false} style={{ fontSize: 12, ...font("bold"), color: theme.navigation.fg, opacity: 0.8 }}>Feedback is welcome via Messenger or Email</Text>
      </View> */}
      {Platform.OS == "web" && globalThis?.navigator?.userAgent?.match?.(/Android/) && <View style={{ paddingTop: 8, paddingBottom: 4, paddingLeft: 16 }}>
        <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.navigation.fg, opacity: 0.8 }}>The CuppaZee App is now on Google Play</Text>
        <Text allowFontScaling={false} style={{ fontSize: 12, ...font("bold"), color: theme.navigation.fg, opacity: 0.8 }}>Download it now!</Text>
      </View>}
      {Platform.OS == "web" && globalThis?.navigator?.userAgent?.match?.(/iPhone|iPad|iPod/) && <View style={{ paddingTop: 8, paddingBottom: 4, paddingLeft: 16 }}>
        <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.navigation.fg, opacity: 0.8 }}>The CuppaZee App is now on the App Store</Text>
        <Text allowFontScaling={false} style={{ fontSize: 12, ...font("bold"), color: theme.navigation.fg, opacity: 0.8 }}>Download it now!</Text>
      </View>}
      <View style={{ paddingTop: 8, paddingBottom: 4, paddingLeft: 16 }}>
        <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.navigation.fg, opacity: 0.8 }}>{t(`common:users`)}</Text>
      </View>
      {users?.map?.(i => <DrawerItem
        key={`user_${i[0]}`}
        {...itemProps}
        style={{ marginVertical: 0 }}
        icon={({ focused, color, size }) => <Image style={{ height: 32, width: 32, borderRadius: 16 }} source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(i[0] || 0).toString(36)}.png` }} />}
        label={i[1].username || ""}
        focused={route.name?.startsWith?.('User') && route.params?.userid == Number(i[0])}
        onPress={() => nav.reset({
          index: 1,
          routes: [
            { name: '__primary', params: { screen: "UserDetails", params: { userid: Number(i[0]) } } },
          ],
        })
        }
      />)}
      <DrawerItem
        {...itemProps}
        style={{ marginVertical: 0 }}
        focused={route.name == "UserSearch"}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name="magnify" color={color} size={24} style={{ margin: 4 }} />}
        label={t(`common:find_user`)}
        onPress={() => nav.reset({
          index: 1,
          routes: [
            { name: '__primary', params: { screen: "UserSearch" } },
          ],
        })
        }
      />
      <View style={{ paddingTop: 8, paddingLeft: 16 }}>
        <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.navigation.fg, opacity: 0.8 }}>Clans</Text>
      </View>
      <View style={{ padding: 4, paddingLeft: 8, paddingRight: 16, flexDirection: "row", justifyContent: "space-between" }}>
        {/* <IconButton
          icon="shield-half-full"
          color={itemProps.inactiveTintColor}
          onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: { screen: "AllClans" } },
            ],
          })}
        /> */}
        <IconButton
          style={{
            backgroundColor: route.name == "AllClans" ? itemProps.activeBackgroundColor : null
          }}
          icon="format-list-bulleted"
          color={itemProps.inactiveTintColor}
          onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: { screen: "AllClans" } },
            ],
          })}
        />
        <IconButton
          style={{
            backgroundColor: route.name == "ClanSearch" ? itemProps.activeBackgroundColor : null
          }}
          icon="magnify"
          color={itemProps.inactiveTintColor}
          onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: { screen: "ClanSearch" } },
            ],
          })}
        />
        <IconButton
          disabled={true}
          style={{
            backgroundColor: route.name == "ClanRequirements" && route.params.gameid < 87 ? itemProps.activeBackgroundColor : null
          }}
          icon="history"
          color={itemProps.inactiveTintColor}
          onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: { screen: "ClanRequirements", params: { gameid: 87 } } },
            ],
          })
          }
        />
        <IconButton
          style={{
            backgroundColor: route.name == "ClanRequirements" && route.params.gameid == 88 ? itemProps.activeBackgroundColor : null
          }}
          icon="new-box"
          color={itemProps.inactiveTintColor}
          onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: { screen: "ClanRequirements", params: { gameid: 88 } } },
            ],
          })
          }
        />
      </View>
      {clanBookmarks?.slice?.(0, showMoreClan ? Infinity : clanBookmarks.length > 6 ? 5 : 6)?.map?.(i => <DrawerItem
        key={`clan_${i.clan_id}`}
        {...itemProps}
        style={{ marginVertical: 0 }}
        focused={route.name == "Clan" && route.params?.clanid == Number(i.clan_id)}
        icon={({ focused, color, size }) => <Image style={{ height: 32, width: 32, borderRadius: 16 }} source={{ uri: i.logo ?? `https://munzee.global.ssl.fastly.net/images/clan_logos/${(i.clan_id || 0).toString(36)}.png` }} />}
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
        icon={({ focused, color, size }) => <MaterialCommunityIcons name={showMoreClan ? "chevron-up" : "chevron-down"} color={color} size={24} style={{ margin: 4 }} />}
        label={showMoreClan ? "Show Less" : "Show More"}
        onPress={() => setShowMoreClan(!showMoreClan)}
      />}
      <View style={{ paddingTop: 8, paddingBottom: 4, paddingLeft: 16 }}>
        <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.navigation.fg, opacity: 0.8 }}>{t('common:tools')}</Text>
      </View>
      {pages.map?.(i => <DrawerItem
        key={i.title}
        {...itemProps}
        style={{ marginVertical: 0 }}
        focused={route.name == i.page}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name={i.icon} color={color} size={24} style={{ margin: 4 }} />}
        label={i.title}
        onPress={() => nav.reset({
          index: 1,
          routes: [
            { name: '__primary', params: { screen: i.page } },
          ],
        })
        }
      />)}
      <View style={{ paddingTop: 8, paddingBottom: 4, paddingLeft: 16 }}>
        <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.navigation.fg, opacity: 0.8 }}>{t('common:more')}</Text>
      </View>
      {more.map?.(i => <DrawerItem
        key={i.title}
        {...itemProps}
        style={{ marginVertical: 0, opacity: i.disabled ? 0.6 : 1 }}
        focused={route.name == i.page}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name={i.icon} color={color} size={24} style={{ margin: 4 }} />}
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
        visible={helpOpen}
        onDismiss={() => setHelpOpen(false)}
        anchor={
          <DrawerItem
            {...itemProps}
            style={{ marginVertical: 0 }}
            icon={({ focused, color, size }) => <MaterialCommunityIcons name="help-circle" color={color} size={24} style={{ margin: 4 }} />}
            label="Help"
            onPress={() => setHelpOpen(true)}
          />
        }
        contentStyle={{ backgroundColor: theme.page_content.bg, borderWidth: theme.page_content.border ? 1 : 0, borderColor: theme.page_content.border }}
      >
        <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
          <View style={{ flexDirection: "row" }}>
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>You can contact us via Facebook </Text>
            <TouchableRipple onPress={() => Linking.openURL('https://m.me/CuppaZee')}><Text allowFontScaling={false} style={{ color: theme.page_content.fg == "#000000" ? 'blue' : 'lightblue', fontSize: 16, ...font("bold") }}>@CuppaZee</Text></TouchableRipple>
          </View>
          <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16 }}>or email us at support@cuppazee.app</Text>
        </View>
      </Menu>
    </DrawerContentScrollView>
  );
}