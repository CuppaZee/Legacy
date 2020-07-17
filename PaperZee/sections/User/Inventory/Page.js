import * as React from 'react';
import { ActivityIndicator, Text, View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import InventoryItem from './Item'
import useAPIRequest from 'utils/hooks/useAPIRequest';
import InventoryConverter from './Data';
import font from 'sections/Shared/font';
import Card from 'sections/Shared/Card';
import { useTranslation } from 'react-i18next';
import categories from 'utils/db/categories.json';

import ListItem from './ListItem';

export default function () {
  var { t } = useTranslation()
  var route = useRoute();
  var theme = useSelector(i => i.themes[i.theme]);
  var username = route.params.username;
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: i => i?.user_id
  })
  var data = useAPIRequest(user_id ? {
    endpoint: 'user/inventory',
    data: {},
    user: user_id,
    cuppazee: true,
    function: ({ credits, boosters, history, undeployed }) => InventoryConverter(credits, boosters, history, undeployed)
  } : null) ?? {};
  if (!data?.credits?.length) return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page.bg }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  )
  return <ScrollView style={{ flex: 1, backgroundColor: theme.page.bg }} contentContainerStyle={{ padding: 4 }}>
    <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
      {Object.entries(data?.types || {}).sort((a, b) => b[1].length - a[1].length).map(([label, list]) => <View style={{ padding: 4, width: 400, flexGrow: 1, maxWidth: "100%" }}>
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
      {data?.historyBatches.map(i => <ListItem i={i} />)}
    </View>
  </ScrollView>
}