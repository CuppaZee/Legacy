import * as React from 'react'
import { Text, View, Image, Platform } from 'react-native';
import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

export default function CustomDrawerContent(props) {
  var {t} = useTranslation();
  var theme = useSelector(i=>i.themes[i.theme]);
  var dash = useSelector(i=>i.dash);
  var users = useSelector(i=>Object.entries(i.logins));
  var route = useSelector(i=>i.route);
  var nav = props.navigation;
  
  var allclans = [
    [1349, "The Cup of Coffee Clan"],
    [457, "The Cup of Tea Clan"],
    [1441, "The Cup of Cocoa Clan"],
    [1902, "The Cup of Hot Chocolate Clan"],
    [1870, "The Cup of Horlicks Clan"],
    [-1, "CuppaClans Shadow Crew"],
    [1493, "Bushrangers Pistol"],
    [1605, "Bushrangers Gin"],
    [-2, "Bushrangers Shadow"],
    [251, "ALLSTARS"],
    [1695, "ALLSTARS II"],
    [1793, "Hjælp, jeg er en fisk!"],
    [1551, "Cockers"],
    [19, "Maryland Munzee Militia (HC)"]
  ];
  var pages = [
    {title:t(`common:search`),icon:"magnify",page:"Search"},
    {title:t(`common:maps`),icon:"map",page:"Map"},
    {title:t(`common:tools`),icon:"wrench",page:"Tools"},
    {title:t(`common:scanner`),icon:"qrcode",page:"Scanner",hide:Platform.OS==="web"}
  ].filter(i=>!i.hide)
  var more = [
    {title:t(`common:the_quest`),icon:"run",page:"LaQuest",disabled:true},
    {title:t(`common:settings`),icon:"settings",page:"Settings"},
    {title:t(`common:credits`),icon:"heart",page:"Credits",disabled:true},
    {title:t(`common:app_info`),icon:"information",page:"App Info",disabled:true},
    {title:t(`common:donate`),icon:"coin",page:"Donate",disabled:true}
  ].filter(i=>!i.hide)
  return (
    <DrawerContentScrollView style={{backgroundColor: theme.navigation.bg}} {...props}>
      {/* <View style={{paddingTop: 8, paddingLeft: 18}}>
        <Text style={{fontSize:16,fontWeight:"bold",color:theme.navigation.fg}}>The menu design is likely to change. Feel free to send feedback.</Text>
      </View> */}
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
        focused={route.name=="UserActivity"&&route.params?.userid==Number(i[0])}
        onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: "UserActivity", params: {userid: Number(i[0])}} },
            ],
          })
        }
      />)}
      <View style={{paddingTop: 8, paddingBottom: 4, paddingLeft: 18}}>
        <Text style={{fontSize:16,fontWeight:"bold",color:"#fffa"}}>Clans</Text>
      </View>
      {dash?.map?.(i=><DrawerItem
        key={`clan_${i.clan_id}`}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0}}
        focused={route.name=="Clan"&&route.params?.clanid==Number(i.clan_id)}
        icon={({ focused, color, size }) => <Image style={{height: 32, width: 32, marginRight: -28, borderRadius: 16}} source={{uri:`https://munzee.global.ssl.fastly.net/images/clan_logos/${(i.clan_id||0).toString(36)}.png`}} />}
        label={(allclans.find(x=>x[0]==i.clan_id)||[0,i.clan_id||"?"])[1].toString()}
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
      />
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
        onPress={i.disabled?null:() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: i.page} },
            ],
          })
        }
      />)}
      <View style={{paddingTop: 8, paddingLeft: 18, paddingBottom: 8}}>
        <Text style={{fontSize:12,fontWeight:"bold",opacity: 0.7,color:theme.navigation.fg}}>{t('common:build_info',{count:4})}</Text>
      </View>
      {/* <DrawerItemList activeBackgroundColor="#016930" activeTintColor="#ffffff" itemStyle={{marginVertical:0}} {...props} /> */}
    </DrawerContentScrollView>
  );
}