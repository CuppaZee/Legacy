// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, Platform, Image, ScrollView, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Button, IconButton, Switch } from 'react-native-paper';
import { useDimensions } from '@react-native-community/hooks'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector, useDispatch } from "react-redux";
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Shared/Card' was resolved to 'C:/Users/... Remove this comment to see the full error message
import Card from '../Shared/Card';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/store' or its correspond... Remove this comment to see the full error message
import s from "utils/store";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'from' or its corresponding typ... Remove this comment to see the full error message
import FROM from 'from';

export default function SettingsScreen({
  navigation
}: any) {
  var {t} = useTranslation();
  var logins = useSelector((i: any) => i.logins);
  var themes = useSelector((i: any) => i.themes);
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var dispatch = useDispatch();
  var {width,height} = useDimensions().window;

  var [push,setPush] = React.useState(null);
  var [data,setData] = React.useState(false);
  async function enableNotifications() {
    try {
      if (Constants.isDevice && Platform.OS !== "web") {
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          alert('Failed to get push token for push notification!');
          return;
        }
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'token'.
        token = await Notifications.getExpoPushTokenAsync();
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'token'.
        setPush(token);
      } else {
        setPush(false);
      }

      if (Platform.OS === 'android') {
        Notifications.createChannelAndroidAsync('default', {
          name: 'default',
          sound: true,
          priority: 'max',
          vibrate: [0, 250, 250, 250],
        });
      }
    } catch(e) {
      setPush(false);
    }
  }
  async function getCurrentOptions() {
    var d = await fetch('https://server.cuppazee.app/notifications/get', {
      method: 'POST',
      body: JSON.stringify({
        token: push,
        from: FROM,
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'token'.
        access_token: token
      })
    })
    var {data:da} = await d.json();
    setData(Object.assign({
      token: push,
      munzee_blog: false,
      ...(da||{})
    }));
  }
  async function saveCurrentOptions() {
    setData(false)
    var d = await fetch('https://server.cuppazee.app/notifications/signup', {
      method: 'POST',
      body: JSON.stringify({
        data: JSON.stringify(data),
        from: FROM,
        // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'token'.
        access_token: token
      })
    })
    var da = await d.json();
    console.log(da);
    setData(da.data);
  }
  React.useEffect(()=>{
    enableNotifications()
  },[]);
  React.useEffect(()=>{
    if(push) {
      getCurrentOptions();
    }
  },[push]);

  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  if(Platform.OS==="web") return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Text>{t('notifications:unavailable_web')}</Text>
  </View>

  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  if(push===false||data===null) return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Text>{t('notifications:unavailable_generic')}</Text>
  </View>

  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  if(push===null||data===false) return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1, backgroundColor: theme.page.bg, justifyContent: 'center', alignItems: 'center' }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{flex: 1, width:width>800?"50%":"100%",padding:4}}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Card noPad>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <ScrollView contentContainerStyle={{padding:8}}>
            {/* <Text allowFontScaling={false} style={{color:theme.page_content.fg,...font()}}>Push: {push||'Disabled'}</Text> */}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{flexDirection:"row",alignItems:"center"}}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text allowFontScaling={false} style={{color:theme.page_content.fg,...font("bold")}}>{t('notifications:munzee_blog')}</Text>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Switch color={theme.page_content.fg} value={data.munzee_blog} onValueChange={(value: any) => setData({
                ...data,
                munzee_blog: value
              })} />
            </View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Button mode="contained" color="green" onPress={saveCurrentOptions}>{t('notifications:save')}</Button>
          </ScrollView>
        </Card>
      </View>
    </View>
  );
}