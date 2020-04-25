import * as React from 'react';
import { Text, View, Image, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { ActivityIndicator, Menu, TouchableRipple } from 'react-native-paper';
import request from '~store/request'
import { useNavigation, useFocusEffect, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import InventoryItem from './InventoryItem'

export default function UserInventoryScreen() {
  var [open,setOpen] = React.useState(false);
  var {t} = useTranslation();
  var theme = useSelector(i=>i.themes[i.theme]);
  var date = new Date(Date.now() - (5 * 60 * 60000));
  var dateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${(date.getUTCDate()).toString().padStart(2, '0')}`
  var navigation = useNavigation();
  var route = useRoute();
  var user_id = Number(route.params.userid);
  var cryptoken = useSelector(i=>i.logins[user_id]?.code);
  var dispatch = useDispatch();
  var users = useSelector(i => Object.keys(i.logins));
  var { data } = useSelector(i => i.request_data[`user/inventory?user_id=${user_id}&cryptoken=${cryptoken}`] ?? {})
  useFocusEffect(
    React.useCallback(() => {
      if(cryptoken) dispatch(request.add(`user/inventory?user_id=${user_id}&cryptoken=${cryptoken}`))
      return () => {
        if(cryptoken) dispatch(request.remove(`user/inventory?user_id=${user_id}&cryptoken=${cryptoken}`))
      };
    }, [user_id,cryptoken])
  );
  if (!cryptoken) return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page_content.bg }}>
      <Text>You need to authenticate as this user to access this data</Text>
    </View>
  )
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
      contentContainerStyle={{ width: 800, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page_content.bg }}>
      <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
        <View><Text style={{ color: theme.page_content.fg, fontSize: 20, fontWeight: "bold" }}>
          Undeployed
        </Text></View>
        <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
        {
            data?.data?.undeployed?.map(i =><InventoryItem key={i.icon} i={i}/>)
          }
        </View>
      </View>
      <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
        <View><Text style={{ color: theme.page_content.fg, fontSize: 20, fontWeight: "bold" }}>
          Credits
        </Text></View>
        <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
          {
            data?.data?.credits?.map(i =><InventoryItem key={i.icon} i={i}/>)
          }
        </View>
      </View>
      <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
        <View><Text style={{ color: theme.page_content.fg, fontSize: 20, fontWeight: "bold" }}>
          History
        </Text></View>
        {/* TODO: Switch to FlatList for performance */}
        <View style={{ flexWrap: "wrap", flexDirection: "column", alignItems: "stretch" }}>
          {
            (data?.data?.history)?.map(i =>(
            <TouchableRipple key={`history/${i.icon}/${i.time}`}>
              <View key={i.icon} style={{ padding: 2, alignItems: "center", flexDirection: "row" }}>
                <Image style={{ height: 36, width: 36 }} source={{ uri: i.icon.includes('what.png')?'https://flame.cuppazee.uk/missing.png':i.icon }} />
                <View>
                  <Text style={{ color: theme.page_content.fg, fontSize: 16, fontWeight: "bold" }}>{i.name}</Text>
                  <Text style={{ color: theme.page_content.fg, fontSize: 16 }}>{i.reason}</Text>
                  <Text style={{ color: theme.page_content.fg, fontSize: 12 }}>{new Date(i.time).toLocaleString()}</Text>
                </View>
              </View>
            </TouchableRipple>))
          }
        </View>
      </View>
    </ScrollView>
  );
}