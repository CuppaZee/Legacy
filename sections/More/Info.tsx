
import * as React from 'react';

import {View, ScrollView, Image, Linking } from 'react-native';
import credits from './credits.json';
import { Avatar, TouchableRipple, Button, Menu, Title, Divider, Subheading, Caption, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import changelogs from '../../changelogs';

export default function SettingsScreen() {
  var { t } = useTranslation();
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
    <ScrollView contentContainerStyle={{ padding: 8 }}>
      <View style={{ alignItems: "center" }}>
        <Image style={{ width: 300, height: 90.78 }} source={{ uri: 'https://server.cuppazee.app/logo.png' }} />
        <TouchableRipple onPress={()=>setDev((i: any) => i+1)}>
          <Title>{dev<5?t('app_info:build_n', { build: Math.max(...Object.keys(changelogs).map(Number)) }):dev-4}</Title>
        </TouchableRipple>
        {dev>=5&&<Subheading>{devData}</Subheading>}
      </View>
      <Divider />
      <Title style={{ textAlign: "center" }}>{t('app_info:credits')}</Title>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {credits.filter((i: any) => i.type == "dev").map((i: any) => <TouchableRipple onPress={() => nav.navigate('UserDetails', { username: i.username })}>
          <View style={{ alignItems: "center", padding: 4, width: 160, maxWidth: "100%", flexGrow: 1 }}>
            <Avatar.Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} size={48} />
            <Subheading>{i.username}</Subheading>
            <Caption>{t('app_info:custom_titles.' + i.title)}</Caption>
          </View>
        </TouchableRipple>)}
      </View>
      <Divider />
      <Title style={{ textAlign: "center" }}>{t('app_info:translators')}</Title>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {credits.filter((i: any) => i.type == "translator").map((i: any) => <TouchableRipple onPress={() => nav.navigate('UserDetails', { username: i.username })}>
          <View style={{ alignItems: "center", padding: 4, width: 120, maxWidth: "100%", flexGrow: 1 }}>
            <Avatar.Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} size={48} />
            <Subheading>{i.username}</Subheading>
            <Caption>{t('app_info:custom_titles.' + i.title)}</Caption>
          </View>
        </TouchableRipple>)}
      </View>
      <Divider />
      <Title style={{ textAlign: "center" }}>{t('app_info:database_contributors')}</Title>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {credits.filter((i: any) => i.type == "db").map((i: any) => <TouchableRipple onPress={() => nav.navigate('UserDetails', { username: i.username })}>
          <View style={{ alignItems: "center", padding: 4, width: 100, maxWidth: "100%", flexGrow: 1 }}>
            <Avatar.Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} size={36} />
            <Caption>{i.username}</Caption>
          </View>
        </TouchableRipple>)}
      </View>
      <Divider />
      <Title style={{ textAlign: "center" }}>{t('app_info:patrons_and_supporters')}</Title>
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
            <Paragraph>{t('app_info:paypal_donate_desc')}</Paragraph>
          </View>
        </Menu>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {credits.filter((i: any) => i.type == "supporter").map((i: any) => <TouchableRipple onPress={() => nav.navigate('UserDetails', { username: i.username })}>
          <View style={{ alignItems: "center", padding: 4, width: 100, maxWidth: "100%", flexGrow: 1 }}>
            <Avatar.Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} size={36} />
            <Caption numberOfLines={1} ellipsizeMode="head">{i.username}</Caption>
          </View>
        </TouchableRipple>)}
      </View>
    </ScrollView>
  );
}