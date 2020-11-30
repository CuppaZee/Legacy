
import * as React from 'react';

import { View, Platform, Image, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { Text, Button, TextInput, Switch, useTheme } from 'react-native-paper';



import { Dropdown, DropdownItem } from './Dropdown';
import { useDimensions } from '@react-native-community/hooks'

import { useSelector, useDispatch } from "react-redux";



import Card from '../Shared/Card';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/store' or its correspond... Remove this comment to see the full error message
import s from "utils/store";
import { useTranslation } from 'react-i18next';
var { setTheme, removeLogin, settings: settingsDispatch } = s;



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';

function forceReload() {
  try {



    // @ts-expect-error ts-migrate(2339) FIXME: Property 'navigator' does not exist on type 'Globa... Remove this comment to see the full error message
    global.navigator.serviceWorker.getRegistration().then(function (reg: any) {
      if (reg) {



        // @ts-expect-error ts-migrate(2339) FIXME: Property 'window' does not exist on type 'Global'.
        reg.unregister().then(function () { global.window.location.reload(true); });
      } else {



        // @ts-expect-error ts-migrate(2339) FIXME: Property 'window' does not exist on type 'Global'.
        global.window.location.reload(true);
      }
    });
  } catch (e) {



    // @ts-expect-error ts-migrate(2339) FIXME: Property 'window' does not exist on type 'Global'.
    global.window.location.reload(true);
  }
}

function whiteOrBlack(bgColor: any) {
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return (L > 0.179) ? '#000000' : '#ffffff';
}

export default function SettingsScreen({
  navigation
}: any) {
  var { t, i18n } = useTranslation();
  var logins = useSelector((i: any) => i.logins);
  var themes = useSelector((i: any) => i.themes);
  var theme = useTheme();
  var dispatch = useDispatch();
  var { width } = useDimensions().window;

  function setLang(lang: any) {
    i18n.changeLanguage(lang);
    AsyncStorage.setItem('LANG', lang);
  }

  function logout(user_id: any) {
    dispatch(removeLogin(user_id))
  }

  var languages = [
    { value: 'cs', label: 'Čeština', flag: "CZ" },
    { value: 'da', label: 'Dansk' },
    { value: 'de', label: 'Deutsch' },
    { value: 'en-GB', label: 'English' },
    { value: 'en', label: 'English (US)' },
    { value: 'fi', label: 'Suomi' },
    { value: 'fr', label: 'Français' },
    { value: 'hu', label: 'Magyar' },
    // {value:'lt',label:'Lietuvių Kalba'},
    { value: 'nl', label: 'Nederlands' },
    { value: 'pt', label: 'Português' },
    // {value:'sv',label:'Svenska'}
  ]

  var themeslist = Object.entries(themes).filter(i => !i[0].startsWith('_')).reverse().map(i=>({



    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    value: i[1].id,



    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
    label: t(`themes:${i[1].id}`)
  }))

  var baseSettings = useSelector((i: any) => i.settings)
  var [settings, setSettings] = React.useState({});
  function setSetting(option: any, value: any) {
    var x = {}



    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    x[option] = value;
    setSettings({ ...settings, ...x });
  }
  function saveSettings() {
    dispatch(settingsDispatch(settings));
  }
  React.useEffect(() => {
    setSettings(baseSettings);
  }, [baseSettings])



  return (



    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ justifyContent: 'center', alignItems: 'center' }}>



      <View style={{ flex: 1, width: width > 800 ? "50%" : "100%", padding: 4 }}>



        <Card noPad>



          <ScrollView contentContainerStyle={{ padding: 8 }}>



            {Object.entries(logins).map(user => <View key={user[0]} style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>



              <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(user[0]).toString(36)}.png` }} style={{ borderRadius: 16, width: 32, height: 32 }} />



              <View style={{ paddingLeft: 8, flex: 1, alignSelf: "center" }}>



                {/* @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'. */}
                <Text style={{ fontWeight: "bold", fontSize: 16 }}>{user[1].username}</Text>
              </View>



              <Button compact={true} mode="contained" color="red" onPress={() => logout(user[0])}>{t('settings:logout')}</Button>
            </View>)}



            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>



              <Button
                mode="contained"
                icon="account-plus"
                style={{ flex: 1, marginHorizontal: 4 }}
                onPress={() => navigation.navigate('Auth')}>
                {t('settings:add_user')}
              </Button>



              {Platform.OS === "web" && <Button
                mode="contained"
                icon="reload"
                style={{ flex: 1, marginHorizontal: 4 }}
                onPress={() => forceReload()}>
                {t('settings:update')}
              </Button>}
            </View>
            



            {Platform.OS === "ios" && <View style={{ flexDirection: "row", alignItems: "center", padding: 4 }}>



              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'appleMaps' does not exist on type '{}'. */}
              <Switch style={{ marginRight: 8 }} value={settings.appleMaps} onValueChange={(value: any) => setSetting("appleMaps", !settings.appleMaps)} />



              <Text style={{ flex: 1, fontWeight: "bold" }}>Apple Maps</Text>
            </View>}




            <View style={{ padding: 4 }}>



              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type 'Theme'. */}
              <Dropdown dense={true} label="Theme" mode="outlined" selectedValue={theme.id} onValueChange={(i: any) => dispatch(setTheme(i))}>



                {themeslist.map(i=><DropdownItem label={i.label} value={i.value} />)}
              </Dropdown>
            </View>




            <View style={{ padding: 4 }}>



              <Dropdown dense={true} label="Language" mode="outlined" selectedValue={i18n.language} onValueChange={setLang}>



                {languages.map(i=><DropdownItem label={i.label} value={i.value} />)}
              </Dropdown>
            </View>
            {/* <View style={{flexDirection:"row",alignItems:"center",padding:4}}>
              <Switch style={{marginRight: 8}} color={theme.page_content.fg} value={settings.activityV2Beta} onValueChange={(value)=>setSetting("activityV2Beta",!settings.activityV2Beta)} />
              <Text style={{color:theme.page_content.fg, flex: 1,...font("bold")}}>User Activity Beta</Text>
            </View> */}



            <View>
              {[
                ["clan_level_ind", "Individual"],
                ["clan_level_bot", "Both"],
                ["clan_level_gro", "Group"],
                ["clan_level_0", "No Level"],
                ["clan_level_1", "Level 1"],
                ["clan_level_2", "Level 2"],
                ["clan_level_3", "Level 3"],
                ["clan_level_4", "Level 4"],
                ["clan_level_5", "Level 5"],
                ["clan_level_null", "Empty"]
              ].map(i => <View style={{ padding: 4, flexDirection: "row", alignItems: "flex-end" }}>



                <TextInput
                  style={{ flex: 1 }}
                  dense={true}
                  mode="outlined"
                  label={i[1]}
                  placeholder={i[1]}


                  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                  value={settings[i[0]]}
                  onChangeText={(text: any) => setSetting(i[0], text)}
                />



                {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
                <View style={{ width: 42, height: 42, marginLeft: 4, borderWidth: 1, borderColor: theme.colors.text, borderRadius: 4, backgroundColor: (settings[i[0]]?.length == 7 && settings[i[0]]?.startsWith('#')) ? settings[i[0]] : "#000000" }} />
              </View>)}
            </View>



            <Button
              mode="contained"
              icon="content-save"
              style={{ marginHorizontal: 4 }}
              onPress={saveSettings}>
              {t('settings:save')}
            </Button>
          </ScrollView>
        </Card>
      </View>
    </ScrollView>
  );
}