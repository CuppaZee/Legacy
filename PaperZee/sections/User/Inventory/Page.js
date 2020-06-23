import * as React from 'react';
import { ActivityIndicator, Text, View, Image, ScrollView } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import InventoryItem from './Item'
import useAPIRequest from 'utils/hooks/useAPIRequest';
import useMoment from 'utils/hooks/useMoment';
import InventoryConverter from './Data';
import font from 'sections/Shared/font';
import Card from 'sections/Shared/Card';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';
import categories from 'utils/db/categories.json';

export default function () {
  var moment = useMoment();
  var { t } = useTranslation()
  var route = useRoute();
  var theme = useSelector(i => i.themes[i.theme]);
  var user_id = Number(route.params.userid);
  var data = useAPIRequest({
    endpoint: 'user/inventory',
    data: {},
    user: user_id,
    cuppazee: true,
    function: ({ credits, boosters, history, undeployed }) => InventoryConverter(credits, boosters, history, undeployed)
  }) ?? {};
  if (!data?.credits?.length) return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page.bg }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  )
  return <ScrollView style={{flex:1,backgroundColor:theme.page.bg}}>
    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
      {Object.entries(data?.types || {}).sort((a, b) => b[1].length - a[1].length).map(([label, list]) => <View style={{ padding: 4, width: 400, maxWidth: "100%" }}>
        <Card noPad>
          <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
            <View>
              <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold") }}>
                {categories.find(i => i.id == label)?.name ?? label}
              </Text>
            </View>
            <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
              {
                list?.map(i => <InventoryItem key={i.icon} i={i} />)
              }
            </View>
          </View>
        </Card>
      </View>)}
    </View>
    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 24, ...font("bold"), marginLeft: 4 }}>
        {t('inventory:history')}
      </Text>
    </View>
    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
      {data?.historyBatches.map(i => <View style={{ padding: 4, width: 400, maxWidth: "100%" }}>
        <Card noPad>
          <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
            <View style={{flexDirection:"row",justifyContent:"center", alignItems: "center"}}>
              {i.clan && <MaterialCommunityIcons name="shield-outline" size={24} color={theme.page_content.fg} />}
              {i.title.match(/freeze tag store/i) && <MaterialCommunityIcons name="cart-outline" size={24} color={theme.page_content.fg} />}
              {i.title.match(/premium/i) && <MaterialCommunityIcons name="star-outline" size={24} color={theme.page_content.fg} />}
              {i.title.match(/zeeops/i) && <MaterialCommunityIcons name="briefcase-outline" size={24} color={theme.page_content.fg} />}

              {i.title.match(/giveaway/i) && <Image style={{ height: 24, width: 24 }} source={{ uri: getIcon('theunicorn_full') }} />}
              {i.title.match(/magnetus/i) && <Image style={{ height: 24, width: 24 }} source={{ uri: getIcon('magnetus') }} />}
              {i.title.match(/prize\s*wheel/i) && <Image style={{ height: 24, width: 24 }} source={{ uri: getIcon('prizewheel') }} />}
              {i.title.match(/pimedus/i) && <Image style={{ height: 24, width: 24 }} source={{ uri: getIcon('pimedus') }} />}
              {i.title.match(/space\s*coast/i) && <Image style={{ height: 24, width: 24 }} source={{ uri: getIcon('https://server.cuppazee.app/spacecoastgeostore.png') }} />}
              <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold"), marginLeft: 4 }}>
                {i.short_title||i.title}
              </Text>
            </View>
            <View style={{flexDirection:"row",justifyContent:"center", alignItems: "center"}}>
              <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, fontWeight: "bold", marginLeft: 4 }}>
                {moment(i.time).format('L LT')}
              </Text>
            </View>
            {i.short_title&&<View style={{flexDirection:"row",justifyContent:"center", alignItems: "center"}}>
              <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, marginLeft: 4 }}>
                {i.title}
              </Text>
            </View>}
            <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
              {
                i.items?.map(i => <InventoryItem key={i.icon} theme={theme} i={i} />)
              }
            </View>
          </View>
        </Card>
      </View>)}
    </View>
  </ScrollView>
}