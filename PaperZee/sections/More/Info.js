import * as React from 'react';
import { Text, View, ScrollView, Image, Linking } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import credits from './credits.json';
import { TouchableRipple, Button, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import font from '~sections/Shared/font';
import { useTranslation } from 'react-i18next';

export default function SettingsScreen() {
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var nav = useNavigation();
  var [open,setOpen] = React.useState(false);

  return (
    <ScrollView style={{ backgroundColor: theme.page_content.bg }} contentContainerStyle={{ padding: 8 }}>
      <View style={{ alignItems: "center" }}>
        <Image style={{ width: 300, height: 90.78 }} source={{ uri: 'https://server.cuppazee.app/logo.png' }} />
        <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold") }}>{t('app_info:build_n', { build: 81 })}</Text>
      </View>
      <View style={{ height: 1, backgroundColor: theme.page_content.fg, opacity: 0.5, margin: 8 }}></View>
      <View style={{ alignItems: "center" }}>
        <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 24, ...font("bold") }}>{t('app_info:credits')}</Text>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {credits.filter(i => i.type == "dev").map(i => <TouchableRipple onPress={() => nav.navigate('UserDetails', { userid: i.user_id })}>
          <View style={{ alignItems: "center", padding: 4, width: 160 }}>
            <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} style={{ backgroundColor: "white", height: 48, width: 48, borderRadius: 24 }} />
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold") }}>{i.username}</Text>
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font() }}>{t('app_info:' + i.title)}</Text>
          </View>
        </TouchableRipple>)}
      </View>
      <View style={{ height: 1, backgroundColor: theme.page_content.fg, opacity: 0.5, margin: 8 }}></View>
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold"), textAlign: "center" }}>{t('app_info:translators')}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {credits.filter(i => i.type == "translator").map(i => <TouchableRipple onPress={() => nav.navigate('UserDetails', { userid: i.user_id })}>
          <View style={{ alignItems: "center", padding: 4, width: 120 }}>
            <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} style={{ backgroundColor: "white", height: 48, width: 48, borderRadius: 24 }} />
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>{i.username}</Text>
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 12, ...font() }}>{i.title}</Text>
          </View>
        </TouchableRipple>)}
      </View>
      <View style={{ height: 1, backgroundColor: theme.page_content.fg, opacity: 0.5, margin: 8 }}></View>
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold"), textAlign: "center" }}>{t('app_info:database_contributors')}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {credits.filter(i => i.type == "db").map(i => <TouchableRipple onPress={() => nav.navigate('UserDetails', { userid: i.user_id })}>
          <View style={{ alignItems: "center", padding: 4, width: 100 }}>
            <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} style={{ backgroundColor: "white", height: 32, width: 32, borderRadius: 16 }} />
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>{i.username}</Text>
          </View>
        </TouchableRipple>)}
      </View>
      <View style={{ height: 1, backgroundColor: theme.page_content.fg, opacity: 0.5, margin: 8 }}></View>
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold"), textAlign: "center" }}>{t('app_info:patrons_and_supporters')}</Text>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        <Button style={{ marginHorizontal: 4 }} color="#F96854" mode="contained" onPress={() => Linking.openURL('https://patreon.com/CuppaZee')} icon="patreon">Monthly via Patreon</Button>
        <Menu
          visible={open}
          onDismiss={() => setOpen(false)}
          anchor={
            <Button style={{ marginHorizontal: 4 }} color="#009CDE" mode="contained" onPress={() => setOpen(true)} icon="paypal">One-Time via PayPal</Button>
          }
        >
          <View style={{paddingHorizontal:8}}>
            <Text>PayPal donations can be sent to donate@cuppazee.app</Text>
          </View>
        </Menu>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {credits.filter(i => i.type == "supporter").map(i => <TouchableRipple onPress={() => nav.navigate('UserDetails', { userid: i.user_id })}>
          <View style={{ alignItems: "center", padding: 4, width: 100 }}>
            <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} style={{ backgroundColor: "white", height: 36, width: 36, borderRadius: 18 }} />
            <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode='head' style={{ color: theme.page_content.fg, fontSize: 12, ...font("bold") }}>{i.username}</Text>
          </View>
        </TouchableRipple>)}
      </View>
    </ScrollView>
  );
}