// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import {View, ScrollView, Image, Linking } from 'react-native';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './credits.json'. Consider usin... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ScrollView contentContainerStyle={{ padding: 8 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ alignItems: "center" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Image style={{ width: 300, height: 90.78 }} source={{ uri: 'https://server.cuppazee.app/logo.png' }} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <TouchableRipple onPress={()=>setDev((i: any) => i+1)}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Title>{dev<5?t('app_info:build_n', { build: Math.max(...Object.keys(changelogs).map(Number)) }):dev-4}</Title>
        </TouchableRipple>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {dev>=5&&<Subheading>{devData}</Subheading>}
      </View>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Divider />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Title style={{ textAlign: "center" }}>{t('app_info:credits')}</Title>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {credits.filter((i: any) => i.type == "dev").map((i: any) => <TouchableRipple onPress={() => nav.navigate('UserDetails', { username: i.username })}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ alignItems: "center", padding: 4, width: 160, maxWidth: "100%", flexGrow: 1 }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Avatar.Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} size={48} />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Subheading>{i.username}</Subheading>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Caption>{t('app_info:custom_titles.' + i.title)}</Caption>
          </View>
        </TouchableRipple>)}
      </View>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Divider />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Title style={{ textAlign: "center" }}>{t('app_info:translators')}</Title>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {credits.filter((i: any) => i.type == "translator").map((i: any) => <TouchableRipple onPress={() => nav.navigate('UserDetails', { username: i.username })}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ alignItems: "center", padding: 4, width: 120, maxWidth: "100%", flexGrow: 1 }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Avatar.Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} size={48} />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Subheading>{i.username}</Subheading>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Caption>{t('app_info:custom_titles.' + i.title)}</Caption>
          </View>
        </TouchableRipple>)}
      </View>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Divider />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Title style={{ textAlign: "center" }}>{t('app_info:database_contributors')}</Title>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {credits.filter((i: any) => i.type == "db").map((i: any) => <TouchableRipple onPress={() => nav.navigate('UserDetails', { username: i.username })}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ alignItems: "center", padding: 4, width: 100, maxWidth: "100%", flexGrow: 1 }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Avatar.Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} size={36} />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Caption>{i.username}</Caption>
          </View>
        </TouchableRipple>)}
      </View>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Divider />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Title style={{ textAlign: "center" }}>{t('app_info:patrons_and_supporters')}</Title>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button style={{ marginHorizontal: 4 }} color="#F96854" mode="contained" onPress={() => Linking.openURL('https://patreon.com/CuppaZee')} icon="patreon">{t('app_info:patreon_donate')}</Button>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button style={{ marginHorizontal: 4 }} color="#29abe0" mode="contained" onPress={() => Linking.openURL('https://ko-fi.com/sohcah')} icon="coffee">{t('app_info:kofi_donate')}</Button>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Menu
          visible={open}
          onDismiss={() => setOpen(false)}
          anchor={
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Button style={{ marginHorizontal: 4 }} color="#009CDE" mode="contained" onPress={() => setOpen(true)} icon="paypal">{t('app_info:paypal_donate')}</Button>
          }
        >
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{paddingHorizontal:8}}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Paragraph>{t('app_info:paypal_donate_desc')}</Paragraph>
          </View>
        </Menu>
      </View>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {credits.filter((i: any) => i.type == "supporter").map((i: any) => <TouchableRipple onPress={() => nav.navigate('UserDetails', { username: i.username })}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ alignItems: "center", padding: 4, width: 100, maxWidth: "100%", flexGrow: 1 }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Avatar.Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png` }} size={36} />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Caption numberOfLines={1} ellipsizeMode="head">{i.username}</Caption>
          </View>
        </TouchableRipple>)}
      </View>
    </ScrollView>
  );
}