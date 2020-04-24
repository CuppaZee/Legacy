import * as React from 'react';
import { Button, Text, View, Platform, Image } from 'react-native';
import { useDimensions } from '@react-native-community/hooks'
import { useSelector, useDispatch } from "react-redux";
import Card from '../Shared/Card';
import s from "~store";
var { setTheme } = s;

function forceReload() {
  try {
    global.navigator.serviceWorker.getRegistration().then(function(reg) {
      if (reg) {
        reg.unregister().then(function() { global.window.location.reload(true); });
      } else {
        global.window.location.reload(true);
      }
    });
  } catch(e) {
    global.window.location.reload(true);
  }
}

export default function SettingsScreen({ navigation }) {
  var logins = useSelector(i=>i.logins);
  var themes = useSelector(i=>i.themes);
  var theme = useSelector(i=>i.themes[i.theme]);
  var dispatch = useDispatch();
  var {width,height} = useDimensions().window;
  return (
    <View style={{ flex: 1, backgroundColor: theme.page.bg, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{flex: 1, width:width>800?"50%":"100%",padding:4}}>
        <Card>
          {Object.entries(logins).map(user=><View key={user[0]} style={{padding:8,flexDirection:"row"}}>
            <Image source={{uri:`https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(user[0]).toString(36)}.png`}} style={{borderRadius:24,width:48,height:48}} />
            <View style={{paddingLeft:8,flexGrow:1,alignSelf:"center"}}>
              <Text style={{fontWeight:"bold",fontSize:16,color:theme.page_content.fg}}>{user[1].username}</Text>
            </View>
          </View>)}
          <Button
            title="Add User"
            onPress={() => navigation.navigate('Auth')}
          />
          
          <Text style={{color:theme.page_content.fg}}><Text style={{fontWeight:"bold"}}>Supporters: </Text>Code input is not yet necessary as I've decided to release User Activity to everyone. Code input will be added when I add another feature</Text>
          {Platform.OS==="web"&&<Button
            title="Force Update"
            onPress={() => forceReload()}
          />}
          
          <View style={{flexDirection:"row",flexWrap:"wrap"}}>
            <Button
              style={{flex:1}}
              color={themes.hcontrast.navigation.bg}
              title="High Contrast Mode"
              onPress={() => dispatch(setTheme("hcontrast"))}
            />
            <Button
              style={{flex:1}}
              color={themes.light.navigation.bg}
              title="Light Mode"
              onPress={() => dispatch(setTheme("light"))}
            />
            <Button
              style={{flex:1}}
              color={themes.dark.page_content.bg}
              title="Dark Mode"
              onPress={() => dispatch(setTheme("dark"))}
            />
            <Button
              style={{flex:1}}
              color={themes.xdark.page_content.bg}
              title="AMOLED Dark Mode"
              onPress={() => dispatch(setTheme("xdark"))}
            />
          </View>
        </Card>
      </View>
      {/* <Text>{data.loading}</Text>
      <Text>{JSON.stringify(data.requests)}</Text>
      <Text>{JSON.stringify(data.logins)}</Text>
      <Text>{JSON.stringify(data.loadingLogin)}</Text>
      <Text>{JSON.stringify(Object.keys(data))}</Text> */}
    </View>
  );
}