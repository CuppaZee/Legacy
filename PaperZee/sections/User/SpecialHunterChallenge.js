import * as React from 'react';
import { Text, View, Image, ScrollView, TouchableHighlight } from 'react-native';
import { ActivityIndicator, FAB, Menu, TouchableRipple } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import types from '~sections/DB/types.json';
import useAPIRequest from '~sections/Shared/useAPIRequest';
import font from '~sections/Shared/font';

function g(a) {
  console.log(a);
  return types.find(i => f(i.icon) == f((a.pin || a.icon || a.pin_icon).slice(49, -4)))
}
function f(a) {
  return a.toString().replace(/_/g, '').replace(/munzee/g, '');
}

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
          <Image style={{ height: 36, width: 36 }} source={{ uri: i.pin }} />
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
  var date = new Date(Date.now() - (5 * 60 * 60000));
  var dateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${(date.getUTCDate()).toString().padStart(2, '0')}`
  var navigation = useNavigation();
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
    { name: "AlternaMyths", function: i => i?.bouncer?.type == "tob" },
    { name: "Nomad", function: i => i?.bouncer?.type == "nomad" },
    { name: "RetireMyths", function: i => i?.bouncer?.type == "retiremyth" || i?.bouncer?.type == "zombiepouch" },
    { name: "Original Myths", function: i => i?.myth_set == "original" },
    { name: "Classical Myths", function: i => i?.myth_set == "classical" },
    { name: "Mirror Myths", function: i => i?.myth_set == "mirror" },
    // { name: "Modern Myths", function: i => i?.myth_set == "modern" },
    { name: "Pouch Creatures", function: i => i?.bouncer?.type == "pouch" },
    { name: "Fancy Flats", function: i => i?.bouncer?.type == "flat" },
    { name: "tempPOBs", function: i => i?.bouncer?.type == "tpob" },
    { name: "Scatters", function: i => i?.scatter },
  ]
  if (!data || !data.captures) return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page_content.bg }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  )
  return <View style={{ flex: 1, backgroundColor: theme.page_content.bg }}><ScrollView style={{ flex: 1 }}>
    <View style={{ flexDirection: "column", padding: 8 }}>
      {categories.map(i => <View style={{ flexDirection: "row", alignItems: "center", minHeight: 40, flexWrap: "wrap" }}>
        <Text allowFontScaling={false} style={{ width: 120, ...font(), color: theme.activity["capon"].fg }}>
          {i.name}
        </Text>
        {data.captures.filter(x => i.function(g(x))).map(x => <SHCItem i={x} />)}
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