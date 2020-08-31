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
import UserFAB from '../FAB';
import { Menu, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';

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

const useComponentSize = () => {
  const [size, setSize] = React.useState(null);

  const onLayout = React.useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};

function SortSelector({ mode, setMode }) {
  const [size, onLayout] = useComponentSize();
  const theme = useSelector(i => i.themes[i.theme]);
  const [modePicker, setModePicker] = React.useState(false);
  return <View style={{ padding: 4 }}>
    <Menu
      visible={modePicker}
      onDismiss={() => setModePicker(false)}
      position="bottom"
      anchor={
        <Button
          onLayout={onLayout}
          mode="contained"
          style={theme.page_content.border ? { borderColor: "white", borderWidth: 1 } : {}}
          labelStyle={{ flexDirection: "row", justifyContent: "flex-start", alignItems: "center", flex: 1, alignSelf: "flex-start" }}
          color={theme.page_content.bg}
          onPress={() => setModePicker(true)}
        >
          <Text allowFontScaling={false} style={{ fontSize: 14, textTransform: "none", color: theme.page_content.fg, ...font("500"), flex: 1, textAlign: "left" }}>Group by {modes.find(i => i.value === mode)?.label || mode}</Text>
          <MaterialCommunityIcons color={theme.page_content.fg} name="chevron-down" size={16} />
        </Button>
      }
      contentStyle={{ backgroundColor: theme.page_content.bg, padding: 0, marginTop: 41, width: size?.width }}
    >
      {modes.map((i, index) => <Menu.Item
        key={index}
        style={{ padding: 4, paddingVertical: 0, fontSize: 14, backgroundColor: theme.page_content.bg }}
        onPress={() => { setMode(i.value); setModePicker(false) }}
        title={<Text allowFontScaling={false} style={{ fontSize: 14, ...font(), color: theme.page_content.fg }}>{i.label}</Text>}
      />)}
    </Menu>
  </View>
}

export default function () {
  const [mode, setMode] = React.useState('category');
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
    function: ({ credits, boosters, history, undeployed }) => InventoryConverter(credits, boosters, history, undeployed, mode),
    extraData: [mode]
  } : null) ?? {};
  if (!data?.credits?.length) return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page.bg }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  )
  return <View style={{ flex: 1 }}>
    <ScrollView style={{ flex: 1, backgroundColor: theme.page.bg }} contentContainerStyle={{ padding: 4, paddingBottom: 92 }}>
      <SortSelector mode={mode} setMode={setMode} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {Object.entries(data?.types || {}).sort(mode === "category" ? (a, b) => (categories.find(i => i.id == b[0])?.priority || 0) - (categories.find(i => i.id == a[0])?.priority || 0) : (a, b) => b[1].length - a[1].length).map(([label, list]) => <View style={{ padding: 4, width: 400, flexGrow: 1, maxWidth: "100%" }}>
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
    <UserFAB username={username} user_id={user_id} />
  </View>
}