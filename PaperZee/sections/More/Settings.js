import * as React from 'react';
import { Text, View, Platform, Image, AsyncStorage, ScrollView } from 'react-native';
import { Button, IconButton, TextInput, Menu } from 'react-native-paper';
import { useDimensions } from '@react-native-community/hooks'
import { useSelector, useDispatch } from "react-redux";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Card from '../Shared/Card';
import s from "utils/store";
import { useTranslation } from 'react-i18next';
var { setTheme, removeLogin, settings: settingsDispatch } = s;
import font from 'sections/Shared/font';

function forceReload() {
  try {
    global.navigator.serviceWorker.getRegistration().then(function (reg) {
      if (reg) {
        reg.unregister().then(function () { global.window.location.reload(true); });
      } else {
        global.window.location.reload(true);
      }
    });
  } catch (e) {
    global.window.location.reload(true);
  }
}

function whiteOrBlack(bgColor) {
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

export default function SettingsScreen({ navigation }) {
  var { t, i18n } = useTranslation();
  var logins = useSelector(i => i.logins);
  var themes = useSelector(i => i.themes);
  var theme = useSelector(i => i.themes[i.theme]);
  var [themeDropdown, setThemeDropdown] = React.useState(false);
  var [langDropdown, setLangDropdown] = React.useState(false);
  var dispatch = useDispatch();
  var { width, height } = useDimensions().window;

  function setLang(lang) {
    i18n.changeLanguage(lang);
    AsyncStorage.setItem('LANG', lang);
  }

  function logout(user_id) {
    dispatch(removeLogin(user_id))
  }

  var languages = [
    { code: 'cs', name: 'Čeština', flag: "CZ" },
    { code: 'da', name: 'Dansk' },
    { code: 'de', name: 'Deutsch' },
    { code: 'en-GB', name: 'English (UK)' },
    { code: 'en-US', name: 'English (US)' },
    { code: 'fi', name: 'Suomi' },
    // {code:'fr',name:'Français'},
    { code: 'hu', name: 'Magyar' },
    // {code:'lt',name:'Lietuvių Kalba'},
    { code: 'nl', name: 'Nederlands' },
    { code: 'pt', name: 'Português' },
    // {code:'sv',name:'Svenska'}
  ]

  var baseSettings = useSelector(i => i.settings)
  var [settings, setSettings] = React.useState({});
  function setSetting(option, value) {
    var x = {}
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
    <View style={{ flex: 1, backgroundColor: theme.page.bg, justifyContent: 'center', alignItems: 'center' }}>
      <View style={{ flex: 1, width: width > 800 ? "50%" : "100%", padding: 4 }}>
        <Card noPad>
          <ScrollView contentContainerStyle={{ padding: 8 }}>
            {Object.entries(logins).map(user => <View key={user[0]} style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
              <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(user[0]).toString(36)}.png` }} style={{ borderRadius: 16, width: 32, height: 32 }} />
              <View style={{ paddingLeft: 8, flex: 1, alignSelf: "center" }}>
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{user[1].username}</Text>
              </View>
              <Button compact={true} mode="contained" color="red" onPress={() => logout(user[0])}>{t('settings:logout')}</Button>
            </View>)}
            <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
              <Button
                mode="contained"
                icon="account-plus"
                backgroundColor={theme.navigation.fg}
                style={theme.page_content.border ? { margin: 4, flex: 1, borderColor: "white", borderWidth: 1 } : { margin: 4, flex: 1 }}
                color={theme.navigation.bg}
                onPress={() => navigation.navigate('Auth')}>
                {t('settings:add_user')}
              </Button>
              {Platform.OS === "web" && <Button
                mode="contained"
                icon="reload"
                backgroundColor={theme.navigation.fg}
                style={theme.page_content.border ? { margin: 4, flex: 1, borderColor: "white", borderWidth: 1 } : { margin: 4, flex: 1 }}
                color={theme.navigation.bg}
                onPress={() => forceReload()}>
                {t('settings:update')}
              </Button>}
            </View>

            <View style={{ padding: 4 }}>
              <Menu
                visible={themeDropdown}
                onDismiss={() => setThemeDropdown(false)}
                position="bottom"
                anchor={
                  <Button
                    mode="contained"
                    icon="brush"
                    style={theme.page_content.border ? { borderColor: "white", borderWidth: 1 } : {}}
                    labelStyle={{ flexDirection: "row" }}
                    color={theme.navigation.bg}
                    onPress={() => setThemeDropdown(true)}
                  >
                    <Text allowFontScaling={false} style={{ fontSize: 14, color: theme.navigation.fg, ...font(), flex: 1, textAlign: "left" }}>{t('settings:theme',{name: t(`themes:${theme.id}`)})}</Text>
                    <MaterialCommunityIcons color={theme.navigation.fg} name="chevron-down" size={16} />
                  </Button>
                }
                contentStyle={{ backgroundColor: theme.page_content.bg, padding: 0 }}
              >
                {Object.entries(themes).filter(i => !i[0].startsWith('_')).reverse().map((i, index) => <Menu.Item
                  key={index}
                  style={{ padding: 4, paddingVertical: 0, fontSize: 14, backgroundColor: i[1].navigation.bg }}
                  onPress={() => { dispatch(setTheme(i[0])); setThemeDropdown(false) }}
                  title={<Text allowFontScaling={false} style={{ fontSize: 14, ...font(), color: i[1].navigation.fg }}>{t(`themes:${i[1].id}`)}</Text>}
                />)}
              </Menu>
            </View>

            <View style={{ padding: 4 }}>
              <Menu
                visible={langDropdown}
                onDismiss={() => setLangDropdown(false)}
                position="bottom"
                anchor={
                  <Button
                    mode="contained"
                    icon="translate"
                    style={theme.page_content.border ? { borderColor: "white", borderWidth: 1 } : {}}
                    labelStyle={{ flexDirection: "row" }}
                    color={theme.navigation.bg}
                    onPress={() => setLangDropdown(true)}
                  >
                    <Text allowFontScaling={false} style={{ fontSize: 14, color: theme.navigation.fg, ...font(), flex: 1, textAlign: "left" }}>{t('settings:language',{name:languages.find(i => i.code == i18n.language)?.name ?? i18n.language})}</Text>
                    <MaterialCommunityIcons color={theme.navigation.fg} name="chevron-down" size={16} />
                  </Button>
                }
                contentStyle={{ backgroundColor: theme.page_content.bg, padding: 0 }}
              >
                {languages.map((i, index) => <Menu.Item
                  key={index}
                  style={{ padding: 4, paddingVertical: 0, fontSize: 14, backgroundColor: theme.page_content.bg }}
                  onPress={() => { setLang(i.code); setLangDropdown(false) }}
                  title={<Text allowFontScaling={false} style={{ fontSize: 14, ...font(), color: theme.page_content.fg }}>{i.name}</Text>}
                />)}
              </Menu>
            </View>
            <View>
              {[
                ["clan_level_ind", "Individual"],
                ["clan_level_bot", "Both"],
                ["clan_level_gro", "Group"],
                ["clan_level_0",   "No Level"],
                ["clan_level_1",   "Level 1"],
                ["clan_level_2",   "Level 2"],
                ["clan_level_3",   "Level 3"],
                ["clan_level_4",   "Level 4"],
                ["clan_level_5",   "Level 5"],
                ["clan_level_null","Empty"]
              ].map(i => <View style={{ padding: 4 }}>
                <TextInput
                  dense={true}
                  mode="outlined"
                  theme={{
                    dark: theme.dark,
                    colors: {
                      primary: whiteOrBlack(settings[i[0]]||"")??theme.page_content.fg,
                      background: (settings[i[0]]?.length == 7 && settings[i[0]]?.startsWith('#')) ? settings[i[0]] : theme.page_content.bg,
                      placeholder: whiteOrBlack(settings[i[0]]||"")??theme.page_content.fg,
                      text: whiteOrBlack(settings[i[0]]||"")??theme.page_content.fg
                    }
                  }}
                  label={i[1]}
                  value={settings[i[0]]}
                  onChangeText={text => setSetting(i[0], text)}
                />
              </View>)}
            </View>
            <Button
              mode="contained"
              icon="content-save"
              backgroundColor={theme.navigation.fg}
              style={theme.page_content.border ? { margin: 4, borderColor: "white", borderWidth: 1 } : { margin: 4 }}
              color={theme.navigation.bg}
              onPress={saveSettings}>
              {t('settings:save')}
            </Button>
          </ScrollView>
        </Card>
      </View>
    </View>
  );
}