import * as React from 'react'
import { Text, View, Image, Platform, Linking } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItem
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';

export default function CustomDrawerContent(props) {
  var {t} = useTranslation();
  var theme = useSelector(i=>i.themes[i.theme]);
  var clanBookmarks = useSelector(i=>i.clanBookmarks);
  var users = useSelector(i=>Object.entries(i.logins));
  var route = useSelector(i=>i.route);
  var nav = props.navigation;
  var pages = [
    {title:t(`common:search`),icon:"magnify",page:"Search",hide:true},
    {title:t(`common:maps`),icon:"map",page:"Map"},
    {title:t(`common:tools`),icon:"wrench",page:"Tools"},
    {title:t(`common:scanner`),icon:"qrcode",page:"Scanner",hide:Platform.OS==="web"}
  ].filter(i=>!i.hide)
  var more = [
    {title:t(`common:the_quest`),icon:"run",page:"LaQuest",disabled:true},
    {title:t(`common:settings`),icon:"settings",page:"Settings"},
  ].filter(i=>!i.hide)
  var about = [
    {title:t(`common:credits`),icon:"heart",page:"Credits",disabled:true},
    {title:t(`common:app_info`),icon:"information",page:"App Info",disabled:true},
    {title:t(`common:donate`),icon:"coin",page:"Donate",disabled:true},
    {title:`GitHub`,icon:"github-circle",page:"https://github.com/CuppaZee/CuppaZee",link:true}
  ].filter(i=>!i.hide)
  return (
    <DrawerContentScrollView style={{backgroundColor: theme.navigation.bg}} {...props}>
      {pages.map?.(i=><DrawerItem
        key={i.title}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0}}
        focused={route.name==i.page}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name={i.icon} color={color} size={24} style={{marginRight: -24, marginLeft: 4, marginVertical: 4}} />}
        label={i.title}
        onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: i.page} },
            ],
          })
        }
      />)}
      <View style={{paddingTop: 8, paddingBottom: 4, paddingLeft: 18}}>
        <Text style={{fontSize:16,fontWeight:"bold",color:"#fffa"}}>Users</Text>
      </View>
      {users?.map?.(i=><DrawerItem
        key={`user_${i[0]}`}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0}}
        icon={({ focused, color, size }) => <Image style={{height: 32, width: 32, marginRight: -28, borderRadius: 16}} source={{uri:`https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(i[0]||0).toString(36)}.png`}} />}
        label={i[1].username||""}
        focused={route.name?.startsWith?.('User')&&route.params?.userid==Number(i[0])}
        onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: "UserDetails", params: {userid: Number(i[0])}} },
            ],
          })
        }
      />)}
      <View style={{paddingTop: 8, paddingBottom: 4, paddingLeft: 18}}>
        <Text style={{fontSize:16,fontWeight:"bold",color:"#fffa"}}>Clans</Text>
      </View>
      {clanBookmarks?.map?.(i=><DrawerItem
        key={`clan_${i.clan_id}`}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0}}
        focused={route.name=="Clan"&&route.params?.clanid==Number(i.clan_id)}
        icon={({ focused, color, size }) => <Image style={{height: 32, width: 32, marginRight: -28, borderRadius: 16}} source={{uri:i.logo??`https://munzee.global.ssl.fastly.net/images/clan_logos/${(i.clan_id||0).toString(36)}.png`}} />}
        label={i.name}
        onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: "Clan", params: {clanid: Number(i.clan_id)}} },
            ],
          })
        }
      />)}
      <DrawerItem
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0}}
        focused={route.name=="ClanSearch"}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name="magnify" color={color} size={24} style={{marginRight: -24, marginLeft: 4, marginVertical: 4}} />}
        label="Search"
        onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: "ClanSearch"} },
            ],
          })
        }
      />
      {/* <DrawerItem
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0}}
        focused={route.name=="AllClans"}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name="shield-half-full" color={color} size={24} style={{marginRight: -24, marginLeft: 4, marginVertical: 4}} />}
        label={({ focused, color }) => <View style={{justifyContent:"center"}}>
          <Text style={{ color, fontWeight: "500", lineHeight: 14 }}>All Clans</Text>
          <Text style={{ color, fontWeight: "400", lineHeight: 10, fontSize: 10 }}>Experimental</Text>
        </View>}
        onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: "AllClans"} },
            ],
          })
        }
      /> */}
      <View style={{paddingTop: 8, paddingBottom: 4, paddingLeft: 18}}>
        <Text style={{fontSize:16,fontWeight:"bold",color:"#fffa"}}>{t('common:more')}</Text>
      </View>
      {more.map?.(i=><DrawerItem
        key={i.title}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0,opacity: i.disabled?0.6:1}}
        focused={route.name==i.page}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name={i.icon} color={color} size={24} style={{marginRight: -24, marginLeft: 4, marginVertical: 4}} />}
        label={i.title}
        onPress={i.disabled?null:(i.link?()=>Linking.openURL(i.page):() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: i.page} },
            ],
          }))
        }
      />)}
      <View style={{paddingTop: 8, paddingBottom: 4, paddingLeft: 18}}>
        <Text style={{fontSize:16,fontWeight:"bold",color:"#fffa"}}>About</Text>
      </View>
      {about.map?.(i=><DrawerItem
        key={i.title}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0,opacity: i.disabled?0.6:1}}
        focused={route.name==i.page}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name={i.icon} color={color} size={24} style={{marginRight: -24, marginLeft: 4, marginVertical: 4}} />}
        label={i.title}
        onPress={i.disabled?null:(i.link?()=>Linking.openURL(i.page):() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: i.page} },
            ],
          }))
        }
      />)}
      <View style={{paddingTop: 8, paddingLeft: 18, paddingBottom: 8}}>
        <Text style={{fontSize:12,fontWeight:"bold",opacity: 0.7,color:theme.navigation.fg}}>{t('common:build_info',{count:6})}</Text>
      </View>
    </DrawerContentScrollView>
  );
}