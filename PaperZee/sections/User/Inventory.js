import * as React from 'react';
import { Text, View, Image, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import request from '~store/request'
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ActivityOverview from './ActivityOverview'

export default function UserInventoryScreen() {
  var {t} = useTranslation();
  var theme = useSelector(i=>i.themes[i.theme]);
  var date = new Date(Date.now() - (5 * 60 * 60000));
  var dateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${(date.getUTCDate()).toString().padStart(2, '0')}`
  var navigation = useNavigation();
  var route = useRoute();
  var user_id = Number(route.params.userid);
  var cryptoken = useSelector(i=>i.logins[user_id].code);
  var dispatch = useDispatch();
  var users = useSelector(i => Object.keys(i.logins));
  var { data } = useSelector(i => i.request_data[`user/inventory?user_id=${user_id}&cryptoken=${cryptoken}`] ?? {})
  useFocusEffect(
    React.useCallback(() => {
      dispatch(request.add(`user/inventory?user_id=${user_id}&cryptoken=${cryptoken}`))
      return () => {
        dispatch(request.remove(`user/inventory?user_id=${user_id}&cryptoken=${cryptoken}`))
      };
    }, [])
  );
  if (!data) return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page_content.bg }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  )
  function isRenovation(act) {
    return !!(act.pin.includes('/renovation.') && act.captured_at);
  }
  return (
    <ScrollView
      contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page_content.bg }}>
      <View key="captures" style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
        <View><Text style={{ color: theme.page_content.fg, fontSize: 20, fontWeight: "bold" }}>
          Undeployed
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
    </ScrollView>
  );
}