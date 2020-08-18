import * as React from 'react';
import { Text, View, ScrollView, Image, Linking } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import credits from './credits.json';
import { TouchableRipple, Button, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
import changelogs from '../../changelogs';

export default function SettingsScreen() {
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var nav = useNavigation();
  var [open,setOpen] = React.useState(false);
  var [dev,setDev] = React.useState(0);
  var [devData,setDevData] = React.useState("N/A");

  React.useEffect(()=>{
    (async function(){
      switch(dev-5) {
        case 0:
          nav.navigate('Tools');
      }
    })()
  },[dev]);

  return (
    <ScrollView style={{ backgroundColor: theme.page_content.bg }} contentContainerStyle={{ padding: 8 }}>
      <View style={{ alignItems: "center" }}>
        <Image style={{ width: 300, height: 90.78 }} source={{ uri: 'https://server.cuppazee.app/logo.png' }} />
        <TouchableRipple onPress={()=>setDev(i=>i+1)}>
          <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold") }}>{dev<5?t('app_info:build_n', { build: Math.max(...Object.keys(changelogs).map(Number)) }):dev-4}</Text>
        </TouchableRipple>
        {dev>=5&&<Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold") }}>{devData}</Text>}
      </View>
      <View style={{ height: 1, backgroundColor: theme.page_content.fg, opacity: 0.5, margin: 8 }}></View>
      <View style={{ alignItems: "center" }}>
        <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 24, ...font("bold") }}>{t('app_info:credits')}</Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {credits.filter(i => i.type == "dev").map(i => <TouchableRipple onPress={() => nav.navigate('UserDetails', { username: i.username })}>
          <View style={{ alignItems: "center", padding: 4, width: 160 }}>
            <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} style={{ backgroundColor: "white", height: 48, width: 48, borderRadius: 24 }} />
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold") }}>{i.username}</Text>
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font() }}>{t('app_info:custom_titles.' + i.title)}</Text>
          </View>
        </TouchableRipple>)}
      </View>
      <View style={{ height: 1, backgroundColor: theme.page_content.fg, opacity: 0.5, margin: 8 }}></View>
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold"), textAlign: "center" }}>{t('app_info:translators')}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {credits.filter(i => i.type == "translator").map(i => <TouchableRipple onPress={() => nav.navigate('UserDetails', { username: i.username })}>
          <View style={{ alignItems: "center", padding: 4, width: 120 }}>
            <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} style={{ backgroundColor: "white", height: 48, width: 48, borderRadius: 24 }} />
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>{i.username}</Text>
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 12, ...font() }}>{t('app_info:custom_titles.' + i.title)}</Text>
          </View>
        </TouchableRipple>)}
      </View>
      <View style={{ height: 1, backgroundColor: theme.page_content.fg, opacity: 0.5, margin: 8 }}></View>
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold"), textAlign: "center" }}>{t('app_info:database_contributors')}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {credits.filter(i => i.type == "db").map(i => <TouchableRipple onPress={() => nav.navigate('UserDetails', { username: i.username })}>
          <View style={{ alignItems: "center", padding: 4, width: 100 }}>
            <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} style={{ backgroundColor: "white", height: 32, width: 32, borderRadius: 16 }} />
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>{i.username}</Text>
          </View>
        </TouchableRipple>)}
      </View>
      <View style={{ height: 1, backgroundColor: theme.page_content.fg, opacity: 0.5, margin: 8 }}></View>
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold"), textAlign: "center" }}>{t('app_info:patrons_and_supporters')}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        <Button style={{ marginHorizontal: 4 }} color="#F96854" mode="contained" onPress={() => Linking.openURL('https://patreon.com/CuppaZee')} icon="patreon">{t('app_info:patreon_donate')}</Button>
        <Button style={{ marginHorizontal: 4 }} color="#29abe0" mode="contained" onPress={() => Linking.openURL('https://ko-fi.com/sohcah')} icon="coffee">{t('app_info:kofi_donate')}</Button>
        <Menu
          visible={open}
          onDismiss={() => setOpen(false)}
          anchor={
            <Button style={{ marginHorizontal: 4 }} color="#009CDE" mode="contained" onPress={() => setOpen(true)} icon="paypal">{t('app_info:paypal_donate')}</Button>
          }
        >
          <View style={{paddingHorizontal:8}}>
            <Text>{t('app_info:paypal_donate_desc')}</Text>
          </View>
        </Menu>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {credits.filter(i => i.type == "supporter").map(i => <TouchableRipple onPress={() => nav.navigate('UserDetails', { username: i.username })}>
          <View style={{ alignItems: "center", padding: 4, width: 100 }}>
            <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} style={{ backgroundColor: "white", height: 36, width: 36, borderRadius: 18 }} />
            <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode='head' style={{ color: theme.page_content.fg, fontSize: 12, ...font("bold") }}>{i.username}</Text>
          </View>
        </TouchableRipple>)}
      </View>
    </ScrollView>
  );
}