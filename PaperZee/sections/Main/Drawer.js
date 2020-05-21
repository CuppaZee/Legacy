import * as React from 'react'
import { Text, View, Image, Platform, Linking } from 'react-native';
import {
  DrawerContentScrollView,
  // DrawerItem
} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import { TouchableRipple } from 'react-native-paper'
import font from '~sections/Shared/font';

function DrawerItem(props) {

  return <TouchableRipple onPress={props.onPress} style={props.side=="right"?{
    marginLeft:8,borderTopLeftRadius:8,borderBottomLeftRadius:8,opacity:props.style?.opacity??1
  }:{
    marginRight:8,borderTopRightRadius:8,borderBottomRightRadius:8,opacity:props.style?.opacity??1
  }}>
    <View style={props.side=="right"?{
      borderTopLeftRadius:8,borderBottomLeftRadius:8,backgroundColor:props.focused?props.activeBackgroundColor:"transparent",padding:4,paddingRight:16,flexDirection:"row",alignItems:"center"
    }:{
      borderTopRightRadius:8,borderBottomRightRadius:8,backgroundColor:props.focused?props.activeBackgroundColor:"transparent",padding:4,paddingLeft:16,flexDirection:"row",alignItems:"center"
    }}>
      <props.icon color={props.focused?props.activeTintColor:props.inactiveTintColor}/>
      {!props.mini&&<>
        <View style={{width:4}}></View>
        {typeof props.label=="string"?<Text style={{color:props.focused?props.activeTintColor:props.inactiveTintColor,fontSize:14,...font("500")}}>{props.label}</Text>:<props.label color={props.focused?props.activeTintColor:props.inactiveTintColor}/>}
      </>}
    </View>
  </TouchableRipple>
  /*<DrawerItem
        key={i.title}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
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
  var mini = props.mini;
  var {t} = useTranslation();
  var theme = useSelector(i=>i.themes[i.theme]);
  var clanBookmarks = useSelector(i=>i.clanBookmarks);
  var users = useSelector(i=>Object.entries(i.logins));
  var route = useSelector(i=>i.route);
  var nav = props.navigation;
  var [showMoreClan,setShowMoreClan] = React.useState(false);
  var pages = [
    {title:t(`common:maps`),icon:"map",page:"Map"},
    {title:t(`common:scanner`),icon:"qrcode",page:"Scanner",hide:Platform.OS==="web"},
    // {title:t(`common:tools`),icon:"wrench",page:"Tools"},
  ].filter(i=>!i.hide)
  var more = [
    {title:t(`common:settings`),icon:"settings",page:"Settings"},
    {title:t(`common:app_info`),icon:"information",page:"Info"},
    // {title:t(`common:credits`),icon:"heart",page:"Credits",disabled:true},
    // {title:t(`common:donate`),icon:"coin",page:"Donate",disabled:true},
    {title:`GitHub`,icon:"github-circle",page:"https://github.com/CuppaZee/CuppaZee",link:true}
  ].filter(i=>!i.hide)
  return (
    <DrawerContentScrollView style={{backgroundColor: theme.navigation.bg,...(theme.page_content.border?{borderRightWidth:1,borderRightColor:"white"}:{})}} {...props}>
    <View style={{paddingTop: 8, paddingBottom: 4, paddingLeft: 16}}>
      <Text style={{fontSize:16,...font("bold"),color:"#fffa"}}>Remember this is a{Platform.OS=="android"?'n Early Access':' Beta'} build</Text>
      <Text style={{fontSize:12,...font("bold"),color:"#fffa"}}>Feedback is welcome via Messenger or Email</Text>
    </View>
    {Platform.OS=="web"&&globalThis?.navigator?.userAgent?.match?.(/Android/)&&<View style={{paddingTop: 8, paddingBottom: 4, paddingLeft: 16}}>
      <Text style={{fontSize:16,...font("bold"),color:"#fffa"}}>CuppaZee Beta is now on Google Play</Text>
      <Text style={{fontSize:12,...font("bold"),color:"#fffa"}}>Download it now!</Text>
    </View>}
      <View style={{paddingTop: 8, paddingBottom: 4, paddingLeft: 16}}>
        <Text style={{fontSize:16,...font("bold"),color:"#fffa"}}>Users</Text>
      </View>
      {users?.map?.(i=><DrawerItem
        side={props.side}
        mini={mini}
        key={`user_${i[0]}`}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0}}
        icon={({ focused, color, size }) => <Image style={{height: 32, width: 32, borderRadius: 16}} source={{uri:`https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(i[0]||0).toString(36)}.png`}} />}
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
      <DrawerItem
        side={props.side}
        mini={mini}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0}}
        focused={route.name=="UserSearch"}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name="magnify" color={color} size={24} style={{margin: 4}} />}
        label="Search"
        onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: "UserSearch"} },
            ],
          })
        }
      />
      <View style={{paddingTop: 8, paddingBottom: 4, paddingLeft: 16}}>
        <Text style={{fontSize:16,...font("bold"),color:"#fffa"}}>Clans</Text>
      </View>
      <DrawerItem
        side={props.side}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0}}
        focused={route.name=="ClanRequirements"&&route.params.gameid==87}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name="star" color={color} size={24} style={{margin: 4}} />}
        label="June 2020 Requirements"
        onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: "ClanRequirements",params:{gameid:87}} },
            ],
          })
        }
      />
      {clanBookmarks?.slice?.(0,showMoreClan?Infinity:clanBookmarks.length>6?5:6)?.map?.(i=><DrawerItem
        side={props.side}
        mini={mini}
        key={`clan_${i.clan_id}`}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0}}
        focused={route.name=="Clan"&&route.params?.clanid==Number(i.clan_id)}
        icon={({ focused, color, size }) => <Image style={{height: 32, width: 32, borderRadius: 16}} source={{uri:i.logo??`https://munzee.global.ssl.fastly.net/images/clan_logos/${(i.clan_id||0).toString(36)}.png`}} />}
        label={i.name}
        onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: "Clan", params: {clanid: Number(i.clan_id)}} },
            ],
          })
        }
      />)}
      {clanBookmarks.length>6&&<DrawerItem
        side={props.side}
        mini={mini}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0}}
        focused={false}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name={showMoreClan?"chevron-up":"chevron-down"} color={color} size={24} style={{margin: 4}} />}
        label={showMoreClan?"Show Less":"Show More"}
        onPress={()=>setShowMoreClan(!showMoreClan)}
      />}
      <DrawerItem
        side={props.side}
        mini={mini}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0}}
        focused={route.name=="ClanSearch"}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name="magnify" color={color} size={24} style={{margin: 4}} />}
        label="Search"
        onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: "ClanSearch"} },
            ],
          })
        }
      />
      {clanBookmarks.length>0&&<DrawerItem
        side={props.side}
        mini={mini}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0}}
        focused={route.name=="AllClans"}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name="format-list-bulleted" color={color} size={24} style={{margin: 4}} />}
        label={({ focused, color }) => <View style={{justifyContent:"center"}}>
          <Text style={{ color, ...font(500), lineHeight: 14 }}>All Clans</Text>
          <Text style={{ color, ...font(400), lineHeight: 10, fontSize: 10 }}>Experimental</Text>
        </View>}
        onPress={() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: "AllClans"} },
            ],
          })
        }
      />}
      <View style={{paddingTop: 8, paddingBottom: 4, paddingLeft: 16}}>
        <Text style={{fontSize:16,...font("bold"),color:"#fffa"}}>{t('common:tools')}</Text>
      </View>
      {pages.map?.(i=><DrawerItem
        side={props.side}
        mini={mini}
        key={i.title}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
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
      />)}
      <View style={{paddingTop: 8, paddingBottom: 4, paddingLeft: 16}}>
        <Text style={{fontSize:16,...font("bold"),color:"#fffa"}}>{t('common:more')}</Text>
      </View>
      {more.map?.(i=><DrawerItem
        side={props.side}
        mini={mini}
        key={i.title}
        activeBackgroundColor={theme.navigation.fg}
        activeTintColor={theme.navigation.bg}
        inactiveTintColor={theme.navigation.fg}
        style={{marginVertical:0,opacity: i.disabled?0.6:1}}
        focused={route.name==i.page}
        icon={({ focused, color, size }) => <MaterialCommunityIcons name={i.icon} color={color} size={24} style={{margin: 4}} />}
        label={i.title}
        onPress={i.disabled?null:(i.link?()=>Linking.openURL(i.page):() => nav.reset({
            index: 1,
            routes: [
              { name: '__primary', params: {screen: i.page} },
            ],
          }))
        }
      />)}
      {/* <View style={{paddingTop: 8, paddingLeft: 16, paddingBottom: 8}}>
        <Text style={{fontSize:12,...font("bold"),opacity: 0.7,color:theme.navigation.fg}}>{t('common:build_info',{count:22})}</Text>
      </View> */}
    </DrawerContentScrollView>
  );
}