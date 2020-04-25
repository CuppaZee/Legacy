import * as React from 'react';
import { Text, View, Image, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { List, ActivityIndicator } from 'react-native-paper';
import request from '~store/request'
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useCardAnimation } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

var countup = (t) => (a, b) => {
  a[b[t]] = (a[b[t]] || 0) + 1;
  return a;
}

var count = (array, t) => {
  return Object.entries(array.reduce((a, b) => {
    a[b[t]] = (a[b[t]] || 0) + 1;
    return a;
  }, {})).sort((a, b) => b[1] - a[1])
}

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
  'temp_bouncer': 'expiring_specials_filter'
}

var hostIcon = (icon) => {
  var host = icon.match(/\/([^\/\.]+?)_?(?:virtual|physical)?_?host\./)?.[1];
  if (!host) return null;
  return `https://munzee.global.ssl.fastly.net/images/pins/${creatures[host] ?? host}.png`;
}

export default function ({user_id}) {
  var {t} = useTranslation();
  var theme = useSelector(i=>i.themes[i.theme]);
  var date = new Date(Date.now() - (5 * 60 * 60000));
  var dateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${(date.getUTCDate()).toString().padStart(2, '0')}`
  var navigation = useNavigation();
  var route = useRoute();
  // var user_id = Number(route.params.userid);
  var dispatch = useDispatch();
  var users = useSelector(i => Object.keys(i.logins));
  var { data } = useSelector(i => i.request_data[`user/activity?user_id=${user_id}&day=${dateString}`] ?? {})
  var { data: userdata } = useSelector(i => i.request_data[`user/details?user_id=${user_id}`] ?? {})
  useFocusEffect(
    React.useCallback(() => {
      dispatch(request.add(`user/activity?user_id=${user_id}&day=${dateString}`))
      dispatch(request.add(`user/details?user_id=${user_id}`))
      return () => {
        dispatch(request.remove(`user/activity?user_id=${user_id}&day=${dateString}`))
        dispatch(request.remove(`user/details?user_id=${user_id}`))
      };
    }, [])
  );
  function isRenovation(act) {
    return !!(act.pin.includes('/renovation.') && act.captured_at);
  }
  return <View>
    <View key="total" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
      <View><Text style={{ fontSize: 24, fontWeight: "bold", color: theme.page_content.fg }}>
        {t('activity:point', { count: [...data.data.captures, ...data.data.deploys, ...data.data.captures_on].reduce((a, b) => a + Number(b.points_for_creator ?? b.points), 0) })}
      </Text></View>
    </View>
    <View key="captures" style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
      <View><Text style={{ color: theme.page_content.fg, fontSize: 20, fontWeight: "bold" }}>
        {t('activity:capture', { count: data.data.captures.filter(i => !isRenovation(i)).length })} - {t('activity:point', { count: data.data.captures.filter(i => !isRenovation(i)).reduce((a, b) => a + Number(b.points), 0) })}
      </Text></View>
      <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
        {
          count(data.data.captures.filter(i => !isRenovation(i)), "pin").map(cap => <View key={cap[0]} style={{ padding: 2, alignItems: "center" }}>
            <Image style={{ height: 32, width: 32 }} source={{ uri: cap[0] }} />
            <Text style={{ color: theme.page_content.fg }}>{cap[1]}</Text>
          </View>)
        }
      </View>
    </View>
    <View key="deploys" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
      <View style={{ paddingLeft: 8, paddingRight: 8, backgroundColor: 'transparent' ?? '#a5fffc', borderRadius: 0 }}><Text style={{ color: theme.page_content.fg, fontSize: 20, fontWeight: "bold" }}>
        {t('activity:deploy', { count: data.data.deploys.length })} - {t('activity:point', { count: data.data.deploys.reduce((a, b) => a + Number(b.points), 0) })}
      </Text></View>
      <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
        {
          count(data.data.deploys, "pin").map(dep => <View key={dep[0]} style={{ padding: 2, alignItems: "center" }}>
            <Image style={{ height: 32, width: 32 }} source={{ uri: dep[0] }} />
            <Text style={{ color: theme.page_content.fg }}>{dep[1]}</Text>
          </View>)
        }
      </View>
    </View>
    <View key="capons" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
      <View style={{ paddingLeft: 8, paddingRight: 8, borderRadius: 8 }}><Text style={{ color: theme.page_content.fg, fontSize: 20, fontWeight: "bold" }}>
        {t('activity:capon', { count: data.data.captures_on.filter(i => !isRenovation(i)).length })} - {t('activity:point', { count: data.data.captures_on.filter(i => !isRenovation(i)).reduce((a, b) => a + Number(b.points_for_creator), 0) })}
      </Text></View>
      <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
        {
          count(data.data.captures_on.filter(i => !isRenovation(i)), "pin").map(cap => <View key={cap[0]} style={{ padding: 2, alignItems: "center" }}>
            <Image style={{ height: 32, width: 32 }} source={{ uri: cap[0] }} />
            <Text style={{ color: theme.page_content.fg }}>{cap[1]}</Text>
          </View>)
        }
      </View>
    </View>
  </View>
}