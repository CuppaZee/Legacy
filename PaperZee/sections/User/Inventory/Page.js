import * as React from 'react';
import { ActivityIndicator, Text, View, Image, ScrollView } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import InventoryItem from './Item'
import useAPIRequest from 'utils/hooks/useAPIRequest';
import InventoryConverter from './Data';
import { FlatList } from 'react-native-gesture-handler';
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';

function InventoryHistoryItem({ i, theme }) {
  return <TouchableRipple style={{ flexDirection: "row", justifyContent: "center" }}>
    <View key={i.icon} style={{ padding: 2, alignSelf: "center", flex: 1, maxWidth: 400, alignItems: "center", flexDirection: "row" }}>
      <Image style={{ height: 36, width: 36 }} source={{ uri: i.icon?.includes?.('NA.png') ? 'https://server.cuppazee.app/missing.png' : getIcon(i.icon) }} />
      <View style={{ flex: 1 }}>
        <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>{i.name}</Text>
        <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font() }}>{i.reason}</Text>
        <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 12, ...font() }}>{new Date(i.time).toLocaleString()}</Text>
      </View>

      {i.reason.match(/level [0-9] reward/i) && <MaterialCommunityIcons name="shield-outline" size={24} color={theme.page_content.fg} />}
      {i.reason.match(/munzee store/i) && <MaterialCommunityIcons name="cart-outline" size={24} color={theme.page_content.fg} />}
      {i.reason.match(/premium/i) && <MaterialCommunityIcons name="star-outline" size={24} color={theme.page_content.fg} />}
      {i.reason.match(/zeeops/i) && <MaterialCommunityIcons name="briefcase-outline" size={24} color={theme.page_content.fg} />}

      {i.reason.match(/giveaway/i) && <Image style={{ height: 24, width: 24 }} source={{ uri: getIcon('theunicorn_full') }} />}
      {i.reason.match(/magnetus/i) && <Image style={{ height: 24, width: 24 }} source={{ uri: getIcon('magnetus') }} />}
      {i.reason.match(/prize\s*wheel/i) && <Image style={{ height: 24, width: 24 }} source={{ uri: getIcon('prizewheel') }} />}
      {i.reason.match(/pimedus/i) && <Image style={{ height: 24, width: 24 }} source={{ uri: getIcon('pimedus') }} />}
      {i.reason.match(/space\s*coast/i) && <Image style={{ height: 24, width: 24 }} source={{ uri: getIcon('https://server.cuppazee.app/spacecoastgeostore.png') }} />}
    </View>
  </TouchableRipple>
}

var UserInventoryOverview = React.memo(function ({ data, theme }) {
  var {t} = useTranslation()
  return <View style={{ flexDirection: "row", justifyContent: "center" }}><View style={{ flex: 1, maxWidth: 800 }}>
    <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
      <View><Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold") }}>
        {t('inventory:undeployed')}
                </Text></View>
      <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
        {
          data?.undeployed?.map(i => <InventoryItem key={i.icon} i={i} />)
        }
      </View>
    </View>
    <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
      <View><Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold") }}>
        {t('inventory:credits')}
                </Text></View>
      <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
        {
          data?.credits?.map(i => <InventoryItem key={i.icon} i={i} />)
        }
      </View>
    </View>
    <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
      <View><Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold") }}>
        {t('inventory:history')}
      </Text></View>
    </View>
  </View></View>
})

export default function UserInventoryScreen() {
  var route = useRoute();
  var theme = useSelector(i => i.themes[i.theme]);
  var user_id = Number(route.params.userid);
  var data = useAPIRequest({
    endpoint: 'user/inventory',
    data: {},
    user: user_id,
    cuppazee: true,
    function: ({credits,boosters,history,undeployed})=>InventoryConverter(credits,boosters,history,undeployed)
  }) ?? {};
  // var data = InventoryConverter(credits, boosters, history, undeployed);
  if (!data?.credits?.length) return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page_content.bg }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  )
  return (
    <FlatList
      windowSize={7}
      style={{ flex: 1, backgroundColor: theme.page_content.bg }}
      ListHeaderComponent={<UserInventoryOverview data={data} theme={theme} />}
      extraData={[theme]}
      data={data?.history ?? []}
      renderItem={({ item: i }) => <InventoryHistoryItem i={i} theme={theme} />}
    />
  );
}