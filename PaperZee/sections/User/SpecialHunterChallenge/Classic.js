import * as React from 'react';
import { Text, View, Image, ScrollView, TouchableHighlight } from 'react-native';
import { ActivityIndicator, FAB, Menu, TouchableRipple } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import types from '~db/types.json';
import useAPIRequest from '~hooks/useAPIRequest';
import font from '~sections/Shared/font';
import Card from '~sections/Shared/Card';

function g(a) {
  return types.find(i => i.cid == f((a.pin || a.icon || a.pin_icon).slice(49, -4)))
}
function f(icon) {
  return decodeURIComponent(icon).replace(/[^a-zA-Z0-9]/g, '').replace(/munzee$/, '');
}
// function f(a) {
//   return a.toString().replace(/_/g, '').replace(/munzee/g, '');
// }

function UserIcon({ user_id, size }) {
  return <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ marginLeft: -(size - 24) / 2, marginTop: -(size - 24) / 2, height: size, width: size }} />
}

function SHCItem({ i }) {
  var theme = useSelector(i => i.themes[i.theme]);
  var [open, setOpen] = React.useState(false);
  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={
      <TouchableRipple onPress={() => setOpen(true)}>
        <View key={i.icon} style={{ padding: 2, alignItems: "center" }}>
          <Image style={{ height: 32, width: 32 }} source={{ uri: i.pin }} />
        </View>
      </TouchableRipple>
    }
    style={{ marginTop: 61 }}
  >
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      <Image style={{ height: 48, width: 48 }} source={{ uri: i.pin }} />
      <Text allowFontScaling={false} style={{ fontSize: 12, ...font("bold") }}>{i.friendly_name}</Text>
      <Text allowFontScaling={false} style={{ fontSize: 12, ...font("bold") }}>by {i.username}</Text>
    </View>
  </Menu>;
}

export default function UserSHCScreen() {
  var [FABOpen, setFABOpen] = React.useState(false);
  var logins = useSelector(i => i.logins)
  var nav = useNavigation();
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var moment = useMoment();
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
  var navigation = useNavigation();
  var theme = useSelector(i => i.themes[i.theme]);
  var dark = false;
  var level_colors = {
    ind: "#ffe97f",
    bot: "#dff77e",
    gro: "#b0fc8d",
    0: "#eb0000",
    1: "#ef6500",
    2: "#fa9102",
    3: "#fcd302",
    4: "#bfe913",
    5: "#55f40b",
    null: "#e3e3e3",
    border: '#000a'
  }
  if (theme.dark) {
    dark = true;
    level_colors.border = "#fffa"
  }
  var route = useRoute();
  if (route.params.date) {
    dateString = route.params.date;
  }
  var user_id = Number(route.params.userid);
  const data = useAPIRequest({
    endpoint: 'user/activity',
    data: { day: dateString, user_id },
    cuppazee: true
  })
  var categories = [
    { icon: 'rainbowunicorn', name: "AlternaMyths", function: i => i?.bouncer?.type == "tob" },
    { icon: 'nomad', name: "Nomad", function: i => i?.bouncer?.type == "nomad" },
    { icon: 'retiredunicorn', name: "RetireMyths", function: i => i?.bouncer?.type == "retiremyth" || i?.bouncer?.type == "zombiepouch" },
    { icon: 'yeti', name: "Original Myths", function: i => i?.myth_set == "original" },
    { icon: 'cyclops', name: "Classical Myths", function: i => i?.myth_set == "classical" },
    { icon: 'mermaid', name: "Mirror Myths", function: i => i?.myth_set == "mirror" },
    { icon: 'posiedon', name: "Modern Myths", function: i => i?.myth_set == "modern" },
    { icon: 'muru', name: "Pouch Creatures", function: i => i?.bouncer?.type == "pouch" },
    { icon: 'tuxflatrob', name: "Fancy Flats", function: i => i?.bouncer?.type == "flat" },
    { icon: 'morphobutterfly', name: "tempPOBs", function: i => i?.bouncer?.type == "tpob" },
    { icon: 'scattered', name: "Scatters", function: i => i?.scatter },
  ]
  if (!data || !data.captures) return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page.bg }}>
      <ActivityIndicator size="large" color={theme.page.fg} />
    </View>
  )
  return <View style={{ flex: 1, backgroundColor: theme.page.bg }}>
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flexDirection: "row", padding: 8, flexWrap: "wrap", justifyContent: "center" }}>
        {categories.map(i => <View style={{ padding: 4, width: 400, maxWidth: "100%" }}>
          <Card noPad>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <View style={{ padding: 8 }}>
                <Image source={{ uri: `https://server.cuppazee.app/pins/128/${i?.icon}.png` }} style={{ width: 36, height: 36 }} />
              </View>
              <View style={{ paddingRight: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{data.captures.filter(x => i.function(g(x))).length}x {i?.name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                  {data.captures.filter(x => i.function(g(x))).map(x => <SHCItem i={x} />)}
                </View>
              </View>
              <View style={{ alignSelf: "stretch", borderTopRightRadius: 8, borderBottomRightRadius: 8, borderLeftWidth: dark ? 2 : 0, borderLeftColor: dark ? level_colors[data.captures.filter(x => i.function(g(x))).length > 0 ? 5 : 0] : undefined, backgroundColor: dark ? undefined : level_colors[data.captures.filter(x => i.function(g(x))).length > 0 ? 5 : 0], width: 50, alignItems: "center", justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 24, ...font("bold") }}>{data.captures.filter(x => i.function(g(x))).length > 0 ? '✔' : ''}</Text>
              </View>
            </View>
          </Card>
        </View>)}
      </View>
    </ScrollView>

    <FAB.Group
      open={FABOpen}
      icon={() => <UserIcon size={56} user_id={user_id} />}
      actions={Object.entries(logins).filter(i => i[0] != user_id).slice(0, 5).map(i => ({ icon: () => <UserIcon size={40} user_id={Number(i[0])} />, label: i[1].username, onPress: () => { nav.popToTop(); nav.replace('UserDetails', { userid: Number(i[0]) }) } }))}
      onStateChange={({ open }) => setFABOpen(open)}
    />
  </View>
}