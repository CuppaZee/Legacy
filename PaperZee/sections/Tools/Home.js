import * as React from 'react';
import { Button, Text, View, Vibration, Platform } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useNavigation } from '@react-navigation/native';

export default function ToolsScreen({ navigation }) {
  var nav = useNavigation();
  var [push,setPush] = React.useState(null);
  async function enableNotifications() {
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
      // alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  }
  async function sendNotification() {
    var message = {
      to: push,
      sound: 'default',
      title: 'Munzee Blog Post',
      body: 'MHQ Petting Zoo Animals Have Escaped!',
      data: { data: 'goes here' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }
  React.useEffect(()=>{
    enableNotifications();
  },[])
  return (
    <View style={{ flex: 1, backgroundColor: '#c6e3b6', justifyContent: 'center', alignItems: 'center' }}>
      <Text>Tools Page</Text>
      <Button
        title="Test"
        onPress={()=>nav.navigate('UserActivity',{userid:125914})}
      />
      <Button
        disabled={!push}
        title="Push Notification Test (Android)"
        onPress={sendNotification}
      />
      {/* <View style={{position:"absolute",top:0,left:0,bottom:0,right:0,alignItems:"center",justifyContent:"center"}}>
        <View style={{borderRadius:8,backgroundColor:'#ff3322',padding:8}}>
          <Text style={{fontWeight:"bold",fontSize:20,color:"white"}}>Coming Soon</Text>
        </View>
      </View> */}
    </View>
  );
}