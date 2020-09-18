import * as React from 'react';
import { View, Platform, ScrollView, ActivityIndicator } from 'react-native';
import { Text, Button, Checkbox, useTheme, Surface, Title, Subheading, Caption, Divider } from 'react-native-paper';
import { useDimensions } from '@react-native-community/hooks'
import { useSelector, useDispatch } from "react-redux";
import Card from '../Shared/Card';
import s from "utils/store";
import font from 'sections/Shared/font';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useTranslation } from 'react-i18next';
import FROM from 'from';

function UserEdit({ user_id, userData, data, setData }) {
  var { t } = useTranslation();
  return <View style={{ flexGrow: 1, width: 400, maxWidth: "100%", padding: 4 }}>
    <Surface style={{ padding: 8 }}>
      <Title>{userData.username}</Title>
      <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
        <View style={{ flex: 1 }}>
          <Text>{t('notifications:inventory')}</Text>
          <Caption>{t('notifications:inventory_desc')}</Caption>
        </View>
        <Checkbox.Android status={data.inventory ? 'checked' : 'unchecked'} onPress={() => setData({
          ...data,
          inventory: !data.inventory
        })} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
        <View style={{ flex: 1 }}>
          <Text>{t('notifications:evo_reset')}</Text>
          <Caption>{t('notifications:evo_reset_desc')}</Caption>
        </View>
        <Checkbox.Android status={data.evo_reset ? 'checked' : 'unchecked'} onPress={() => setData({
          ...data,
          evo_reset: !data.evo_reset
        })} />
      </View>
      <Divider />
      <Subheading>{t('notifications:streaksaver.title')}</Subheading>
      <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
        <View style={{ flex: 1 }}>
          <Text>{t('notifications:streaksaver.capture')}</Text>
          <Caption>{t('notifications:streaksaver.capture_desc')}</Caption>
        </View>
        <Checkbox.Android status={data.streaksaver_capture ? 'checked' : 'unchecked'} onPress={() => setData({
          ...data,
          streaksaver_capture: !data.streaksaver_capture
        })} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
        <View style={{ flex: 1 }}>
          <Text>{t('notifications:streaksaver.poi_capture')}</Text>
          <Caption>{t('notifications:streaksaver.poi_capture_desc')}</Caption>
        </View>
        <Checkbox.Android status={data.streaksaver_poi_capture ? 'checked' : 'unchecked'} onPress={() => setData({
          ...data,
          streaksaver_poi_capture: !data.streaksaver_poi_capture
        })} />
      </View>
      <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
        <View style={{ flex: 1 }}>
          <Text>{t('notifications:streaksaver.deploy')}</Text>
          <Caption>{t('notifications:streaksaver.deploy_desc')}</Caption>
        </View>
        <Checkbox.Android status={data.streaksaver_deploy ? 'checked' : 'unchecked'} onPress={() => setData({
          ...data,
          streaksaver_deploy: !data.streaksaver_deploy
        })} />
      </View>
    </Surface>
  </View>
}

export default function SettingsScreen({ navigation }) {
  var { t } = useTranslation();
  var logins = useSelector(i => i.logins);
  var theme = useTheme();
  var { width } = useDimensions().window;

  var [push, setPush] = React.useState(null);
  var [data, setData] = React.useState(false);
  React.useEffect(() => {
    registerForPushNotificationsAsync().then(token => setPush(token));
  }, [])
  async function getCurrentOptions() {
    var d = await fetch('https://server.cuppazee.app/notifications/get', {
      method: 'POST',
      body: JSON.stringify({
        token: push,
        from: FROM,
        access_token: Object.values(logins)[0].token.access_token
      })
    })
    var { data: da } = await d.json();
    setData(Object.assign({
      token: push,
      munzee_blog: false,
      users: {},
      ...(da || {})
    }));
  }
  async function saveCurrentOptions() {
    setData(false)
    var d = await fetch('https://server.cuppazee.app/notifications/signup', {
      method: 'POST',
      body: JSON.stringify({
        data: JSON.stringify(data),
        from: FROM,
        access_token: Object.values(logins)[0].token.access_token
      })
    })
    var da = await d.json();
    setData(da.data);
  }

  React.useEffect(() => {
    if (push) {
      getCurrentOptions();
    }
  }, [push]);

  if (Platform.OS === "web") return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>{t('notifications:unavailable_web')}</Text>
  </View>

  if (push === false || data === null) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <Text>{t('notifications:unavailable_generic')}</Text>
  </View>

  if (push === null || data === false) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" />
  </View>
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", padding: 4 }}
        style={{ flex: 1 }}>
        <View style={{ flexGrow: 1, width: 400, maxWidth: "100%", padding: 4 }}>
          <Surface style={{ padding: 8 }}>
            <Title>General</Title>
            <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
              <View style={{ flex: 1 }}>
                <Text>{t('notifications:munzee_blog')}</Text>
                <Caption>munzeeblog.com</Caption>
              </View>
              <Checkbox.Android status={data.munzee_blog ? 'checked' : 'unchecked'} onPress={() => setData({
                ...data,
                munzee_blog: !data.munzee_blog
              })} />
            </View>
          </Surface>
        </View>
        {Object.entries(logins).map(([user_id, userData]) => <UserEdit user_id={user_id} userData={userData} data={data.users[user_id] || {}} setData={(updateData) => {
          var userUpdate = {};
          userUpdate[user_id] = updateData;
          setData({
            ...data,
            users: {
              ...data.users,
              ...userUpdate
            }
          })
        }} />)}
      </ScrollView>
      <View style={{ padding: 4 }}>
        <Button mode="contained" icon="content-save" onPress={saveCurrentOptions}>{t('notifications:save')}</Button>
      </View>
    </View>
  );
}

async function registerForPushNotificationsAsync() {
  let token;
  if (Constants.isDevice) {
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
    token = (await Notifications.getExpoPushTokenAsync()).data;
  } else {
    alert('Must use physical device for Push Notifications');
  }

  if (Platform.OS === 'android') {
    Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  return token;
}