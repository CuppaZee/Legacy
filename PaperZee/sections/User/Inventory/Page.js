import * as React from 'react';
import { ActivityIndicator, Text, View, Image, ScrollView } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import InventoryItem from './Item'
import useAPIRequest from '~sections/Shared/useAPIRequest';
import InventoryConverter from './Data';
import { FlatList } from 'react-native-gesture-handler';
import font from '~sections/Shared/font';

export default function UserInventoryScreen() {
  var route = useRoute();
  var theme = useSelector(i => i.themes[i.theme]);
  var user_id = Number(route.params.userid);
  var [credits, boosters, history, undeployed] = useAPIRequest([
    {
      endpoint: 'user/credits',
      data: {},
      user: user_id
    },
    {
      endpoint: 'user/boosters/credits',
      data: {},
      user: user_id
    },
    {
      endpoint: 'user/credits/history',
      data: {},
      user: user_id
    },
    {
      endpoint: 'user/undeploys',
      data: {},
      user: user_id,
      pagination: "undeployed"
    }
  ]);
  var data = InventoryConverter(credits, boosters, history, undeployed);
  if (!data) return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page_content.bg }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  )
  return (
    <ScrollView
      contentContainerStyle={{ width: 800, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page_content.bg }}>
      <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
        <View><Text style={{ color: theme.page_content.fg, fontSize: 20, fontFamily: font("bold") }}>
          Undeployed
        </Text></View>
        <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
          {
            data?.undeployed?.map(i => <InventoryItem key={i.icon} i={i} />)
          }
          {
            data?.undeployed?.length==0&&<ActivityIndicator size="large" color={theme.page_content.fg} />
          }
        </View>
      </View>
      <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
        <View><Text style={{ color: theme.page_content.fg, fontSize: 20, fontFamily: font("bold") }}>
          Credits
        </Text></View>
        <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
          {
            data?.credits?.map(i => <InventoryItem key={i.icon} i={i} />)
          }
          {
            data?.credits?.length==0&&<ActivityIndicator size="large" color={theme.page_content.fg} />
          }
        </View>
      </View>
      <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
        <View><Text style={{ color: theme.page_content.fg, fontSize: 20, fontFamily: font("bold") }}>
          History
        </Text></View>
        <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
          {
            data?.history?.length==0&&<ActivityIndicator size="large" color={theme.page_content.fg} />
          }
        </View>
        <View style={{ flexWrap: "wrap", flexDirection: "column", alignItems: "stretch" }}>
          <FlatList
            data={data?.history??[]}
            renderItem={({item:i}) => <TouchableRipple key={`history/${i.icon}/${i.time}`}>
              <View key={i.icon} style={{ padding: 2, alignItems: "center", flexDirection: "row" }}>
                <Image style={{ height: 36, width: 36 }} source={{ uri: i.icon?.includes?.('NA.png') ? 'https://server.cuppazee.app/missing.png' : i.icon }} />
                <View>
                  <Text style={{ color: theme.page_content.fg, fontSize: 16, fontFamily: font("bold") }}>{i.name}</Text>
                  <Text style={{ color: theme.page_content.fg, fontSize: 16, fontFamily: font() }}>{i.reason}</Text>
                  <Text style={{ color: theme.page_content.fg, fontSize: 12, fontFamily: font() }}>{new Date(i.time).toLocaleString()}</Text>
                </View>
              </View>
            </TouchableRipple>}
          />
        </View>
      </View>
    </ScrollView>
  );
}