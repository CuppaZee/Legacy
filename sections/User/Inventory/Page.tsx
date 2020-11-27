import * as React from 'react';
import { ActivityIndicator, View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import InventoryItem from './Item'
import useAPIRequest from 'utils/hooks/useAPIRequest';
import useSetting from 'utils/hooks/useSetting';
import InventoryConverter from './Data';
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
import categories from 'utils/db/categories.json';
import { Dropdown, DropdownItem } from 'sections/More/Dropdown';

import ListItem from './ListItem';
import UserFAB from '../FAB';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Headline, Surface, Title, Subheading, useTheme } from 'react-native-paper';

const modes = [
  {
    label: "Category",
    value: "category"
  },
  {
    label: "State",
    value: "state"
  },
  {
    label: "Type",
    value: "type"
  }
]

export default function () {
  const [mode, setMode] = useSetting('inventory_group_by','category');
  const [zeros, setZeros] = useSetting('inventory_include_zeros','all');
  var { t } = useTranslation()
  var route = useRoute();
  var theme = useTheme();
  var username = route.params.username;
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: i => i?.user_id
  })
  var {data, status} = useAPIRequest(user_id ? {
    endpoint: 'user/inventory',
    data: {},
    user: user_id,
    cuppazee: true,
    function: (x) => InventoryConverter(x?.credits, x?.boosters, x?.history, x?.undeployed, mode, zeros),
    extraData: [mode, zeros]
  } : null, 1);
  if (status) {
    if(status === "loading") {
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.text} />
      </View>
    } else {
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <MaterialCommunityIcons name="alert" color={theme.colors.text} size={48} />
        <Subheading>{t('error:' + status)}</Subheading>
      </View>
    }
  } else if (data === null) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <MaterialCommunityIcons name="alert" color={theme.colors.text} size={48} />
      <Subheading>{t('error:missing_data.locked')}</Subheading>
    </View>
  }
  return <View style={{ flex: 1 }}>
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 4, paddingBottom: 92 }}>
      <View style={{flexDirection:"row",flexWrap:"wrap"}}>
        <View style={{flexGrow: 1, width: 400, maxWidth: "100%", padding: 4}}>
          <Dropdown dense={true} mode="outlined" selectedValue={mode} onValueChange={setMode}>
            {modes.map(i=><DropdownItem label={`Group by ${i.label}`} value={i.value} />)}
          </Dropdown>
        </View>
        <View style={{flexGrow: 1, width: 400, maxWidth: "100%", padding: 4}}>
          <Dropdown enabled={mode!=="type"} dense={true} mode="outlined" selectedValue={zeros} onValueChange={setZeros}>
            <DropdownItem label={`Include Zeros: Yes`} value="all" />
            <DropdownItem label={`Include Zeros: No`} value="none" />
          </Dropdown>
        </View>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {Object.entries(data?.types || {}).sort(mode === "category" ? (a, b) => (categories.find(i => i.id == b[0])?.priority || 0) - (categories.find(i => i.id == a[0])?.priority || 0) : (a, b) => b[1].length - a[1].length).map(([label, list]) => <View style={{ padding: 4, width: 400, flexGrow: 1, maxWidth: "100%" }}>
          <Surface>
            <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
              <Title>
                {categories.find(i => i.id == label)?.name ?? label}
              </Title>
              <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
                {
                  list?.map(i => <InventoryItem key={`${i.icon}|${i.c ? "c" : (i.b ? "b" : (i.u ? "u" : "z"))}`} i={i} />)
                }
              </View>
            </View>
          </Surface>
        </View>)}
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        <Headline>
          {t('inventory:history')}
        </Headline>
      </View>
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {data?.historyBatches.map(i => <ListItem i={i} />)}
      </View>
    </ScrollView>
    <UserFAB username={username} user_id={user_id} />
  </View>
}