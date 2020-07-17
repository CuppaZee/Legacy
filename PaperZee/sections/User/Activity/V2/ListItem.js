import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

import font from 'sections/Shared/font';
import Card from 'sections/Shared/Card';

import getIcon from 'utils/db/icon';

var creatures = {
  'firepouchcreature': 'tuli',
  'waterpouchcreature': 'vesi',
  'earthpouchcreature': 'muru',
  'airpouchcreature': 'puffle',
  'mitmegupouchcreature': 'mitmegu',
  'unicorn': 'theunicorn',
  'fancyflatrob': 'coldflatrob',
  'fancy_flat_rob': 'coldflatrob',
  'fancyflatmatt': 'footyflatmatt',
  'fancy_flat_matt': 'footyflatmatt',
  'tempbouncer': 'expiring_specials_filter',
  'temp_bouncer': 'expiring_specials_filter',
  'funfinity': 'oniks'
}

var hostIcon = (icon) => {
  var host = icon.match(/\/([^\/\.]+?)_?(?:virtual|physical)?_?host\./)?.[1];
  if (!host) return null;
  return getIcon(creatures[host] ?? host);
}
function isRenovation(act) {
  return !!(act.pin.includes('/renovation.') && act.captured_at);
}

export default function ActivityListItem({ act, userdata }) {
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var navigation = useNavigation();
  return <View style={{ padding: 4 }}>
    <Card noPad>
      <TouchableRipple onPress={() => { navigation.navigate('MunzeeDetails', { username: act.activity === "capture" ? act.username : userdata?.username, code: act.code }) }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 60, paddingVertical: 4, marginRight: 4, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: theme.dark ? null : theme.activity[act.activity].bg, borderRightWidth: theme.dark ? 2 : 0, borderRightColor: theme.activity[act.activity].fg, position: "relative", alignContent: 'center', alignItems: "center", flexGrow: 0 }}>
            <View style={{ justifyContent: 'center', flexDirection: "row", flexWrap: "wrap", flexGrow: 0 }}>
              <View style={{ paddingHorizontal: 8, borderRadius: 9.5 }}>
                <Text allowFontScaling={false} style={{ alignSelf: "stretch", textAlign: "center", color: theme.activity[act.activity].fg, ...font("bold") }}>{(act.points_for_creator ?? act.points) > 0 && '+'}{(Number(act.points_for_creator ?? act.points)) || t('activity:none')}</Text>
              </View>
            </View>
            <View style={{ position: 'relative' }}>
              <Image style={{ height: 32, width: 32 }} source={getIcon(act.pin)} />
              {hostIcon(act.pin) && <Image style={{ height: 24, width: 24, position: "absolute", right: -5, bottom: -4 }} source={hostIcon(act.pin)} />}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="middle" style={{ color: theme.page_content.fg, ...font() }}>
              {({
                capon_reno: () => t('activity:user_renovated', { user: act.username }),
                capon: () => act.username === userdata?.username ? t('activity:you_captured') : t('activity:user_captured', { user: act.username }),
                capture_reno: () => t('activity:you_renovated'),
                capture: () => t('activity:you_captured'),
                deploy: () => t('activity:you_deployed')
              })[act.activity + (isRenovation(act) ? "_reno" : "")]?.() || "What"}
            </Text>
            {!isRenovation(act) && <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="middle" style={{ color: theme.page_content.fg, ...font("bold") }}>{act.friendly_name}</Text>}
            {!isRenovation(act) && <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="middle" style={{ color: theme.page_content.fg, opacity: 0.8, ...font() }}>
              {({
                capon: () => t('activity:by_you'),
                capture: () => act.username === userdata?.username ? t('activity:by_you') : t('activity:by_user', { user: act.username }),
                deploy: () => t('activity:by_you')
              })[act.activity]?.() || "What"}
            </Text>}
          </View>
          <View style={{ padding: 8, flexGrow: 0, paddingLeft: 16, alignContent: 'center', position: "relative", alignItems: "flex-end" }}>
            <Text allowFontScaling={false} style={{ alignSelf: "stretch", textAlign: "right", color: theme.page_content.fg, ...font("bold") }}>{new Date(act.captured_at ?? act.deployed_at).getHours().toString().padStart(2, "0")}:{new Date(act.captured_at ?? act.deployed_at).getMinutes().toString().padStart(2, "0")}</Text>
          </View>
        </View>
      </TouchableRipple>
    </Card>
  </View>
}