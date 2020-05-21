import * as React from 'react';
import { Button, Text, View, Platform, Image, AsyncStorage, ScrollView } from 'react-native';
import { Button as MaterialButton } from 'react-native-paper';
import { useDimensions } from '@react-native-community/hooks'
import { useSelector, useDispatch } from "react-redux";
import Card from '../Shared/Card';
import s from "~store";
import { useTranslation } from 'react-i18next';
import Flag from 'react-native-flags';
var { setTheme } = s;
import font from '~sections/Shared/font';

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
  var {t,i18n} = useTranslation();
  var logins = useSelector(i=>i.logins);
  var themes = useSelector(i=>i.themes);
  var selected_theme = useSelector(i=>i.theme);
  var theme = useSelector(i=>i.themes[i.theme]);
  var dispatch = useDispatch();
  var {width,height} = useDimensions().window;

  function setLang(lang) {
    i18n.changeLanguage(lang);
    AsyncStorage.setItem('LANG',lang);
  }

  var languages = [
    {code:'cs',name:'Čeština',flag:"CZ"},
    // {code:'de',name:'Deutsch'},
    {code:'en-GB',name:'English (UK)'},
    {code:'fi',name:'Suomen Kieli'},
    {code:'fr',name:'Français'},
    {code:'hu',name:'Magyar Nyelv'},
    {code:'lt',name:'Lietuvių Kalba'},
    {code:'nl',name:'Nederlands'},
    {code:'pt',name:'Português'},
    // {code:'sv',name:'Svenska'}
  ]

  return (
    <View style={{ flex: 1, backgroundColor: theme.page.bg, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{flex: 1, width:width>800?"50%":"100%",padding:4}}>
        <Card noPad>
          <ScrollView contentContainerStyle={{padding:8}}>
            {Object.entries(logins).map(user=><View key={user[0]} style={{padding:8,flexDirection:"row"}}>
              <Image source={{uri:`https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(user[0]).toString(36)}.png`}} style={{borderRadius:24,width:48,height:48}} />
              <View style={{paddingLeft:8,flexGrow:1,alignSelf:"center"}}>
                <Text style={{fontFamily:font("bold"),fontSize:16,color:theme.page_content.fg}}>{user[1].username}</Text>
              </View>
            </View>)}
            <MaterialButton
              mode="contained"
              backgroundColor={theme.navigation.fg}
              style={theme.page_content.border?{borderColor:"white",borderWidth:1}:{}}
              color={theme.navigation.bg}
              onPress={() => navigation.navigate('Auth')}>
              Add User
            </MaterialButton>
            {Platform.OS==="web"&&<MaterialButton
              mode="contained"
              backgroundColor={theme.navigation.fg}
              style={theme.page_content.border?{borderColor:"white",borderWidth:1}:{}}
              color={theme.navigation.bg}
              onPress={() => forceReload()}>
              Force Update
            </MaterialButton>}
            
            {/* TODO: Theme Dropdown instead of Buttons - See /sections/Clan/Cards/Stats, lines 285-305 for Example Dropdown */}
            <Text style={{color:theme.page_content.fg,fontFamily:font()}}>Current Theme: {selected_theme}</Text>
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

            {/* TODO: Language Dropdown instead of Buttons - See /sections/Clan/Cards/Stats, lines 285-305 for Example Dropdown */}
            <Text style={{color:theme.page_content.fg,fontFamily:font()}}>Current Language: {i18n.language}</Text>
            <View style={{flexDirection:"row",flexWrap:"wrap",paddingTop:4}}>
              {languages.map(i=><View style={{padding:4}}>
                <MaterialButton
                  mode="contained"
                  backgroundColor={theme.navigation.fg}
                  style={theme.page_content.border?{borderColor:"white",borderWidth:1}:{}}
                  color={theme.navigation.bg}
                  onPress={() => setLang(i.code)}
                  icon={()=><Flag size={24} code={i.flag||i.code.slice(-2).toUpperCase()} type="flat"/>}
                >{i.name}</MaterialButton>
              </View>)}
            </View>
          </ScrollView>
        </Card>
      </View>
    </View>
  );
}