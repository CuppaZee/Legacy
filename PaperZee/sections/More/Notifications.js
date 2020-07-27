import * as React from 'react';
import { Text, View, Platform, Image, AsyncStorage, ScrollView, ActivityIndicator } from 'react-native';
import { Button, IconButton, Switch } from 'react-native-paper';
import { useDimensions } from '@react-native-community/hooks'
import { useSelector, useDispatch } from "react-redux";
import Card from '../Shared/Card';
import s from "utils/store";
import font from 'sections/Shared/font';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
import FROM from 'from';

export default function SettingsScreen({ navigation }) {
  var {t} = useTranslation();
  var logins = useSelector(i=>i.logins);
  var themes = useSelector(i=>i.themes);
  var theme = useSelector(i=>i.themes[i.theme]);
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
        token = await Notifications.getExpoPushTokenAsync();
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
      setToken(false);
    }
  }
  async function getCurrentOptions() {
    var d = await fetch('https://server.cuppazee.app/notifications/get', {
      method: 'POST',
      body: JSON.stringify({
        token: push,
        from: FROM,
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

  if(Platform.OS==="web") return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
    <Text>{t('notifications:unavailable_web')}</Text>
  </View>

  if(push===false||data===null) return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
    <Text>{t('notifications:unavailable_generic')}</Text>
  </View>

  if(push===null||data===false) return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return (
    <View style={{ flex: 1, backgroundColor: theme.page.bg, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{flex: 1, width:width>800?"50%":"100%",padding:4}}>
        <Card noPad>
          <ScrollView contentContainerStyle={{padding:8}}>
            {/* <Text allowFontScaling={false} style={{color:theme.page_content.fg,...font()}}>Push: {push||'Disabled'}</Text> */}
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <Text allowFontScaling={false} style={{color:theme.page_content.fg,...font("bold")}}>{t('notifications:munzee_blog')}</Text>
              <Switch color={theme.page_content.fg} value={data.munzee_blog} onValueChange={(value)=>setData({
                ...data,
                munzee_blog: value
              })} />
            </View>
            <Button mode="contained" color="green" onPress={saveCurrentOptions}>{t('notifications:save')}</Button>
          </ScrollView>
        </Card>
      </View>
    </View>
  );
}