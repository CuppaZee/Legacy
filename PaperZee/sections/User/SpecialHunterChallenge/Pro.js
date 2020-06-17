import * as React from 'react';
import { Text, View, Image, ScrollView, TouchableHighlight } from 'react-native';
import { ActivityIndicator, FAB, Menu, TouchableRipple, IconButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import getType from '~sections/DB/types';
import useAPIRequest from '~hooks/useAPIRequest';
import font from '~sections/Shared/font';
import Card from '~sections/Shared/Card';
import DatePicker from '~sections/Shared/DatePicker';
import useMoment from '~hooks/useMoment';

function g(a) {
  return getType(a.pin || a.icon || a.pin_icon);
}

function s(icon, size = 64) {
  return icon.replace('https://munzee.global.ssl.fastly.net/images/pins/', `https://server.cuppazee.app/pins/${size}/`)
}
// function f(a) {
//   return a.toString().replace(/_/g, '').replace(/munzee/g, '');
// }

function UserIcon({ user_id, size }) {
  return <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ marginLeft: -(size - 24) / 2, marginTop: -(size - 24) / 2, height: size, width: size }} />
}

function SHCItem({ i, m }) {
  var {t} = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var [open, setOpen] = React.useState(false);
  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={
      <TouchableRipple onPress={() => setOpen(true)}>
        <View key={i.icon} style={{ padding: 2, alignItems: "center", position: "relative" }}>
          <Image style={{ height: 32, width: 32 }} source={{ uri: s(i.pin) }} />
          {m && <Image style={{ height: 20, width: 20, position: "absolute", bottom: 0, right: -4 }} source={{ uri: s(m.pin) }} />}
        </View>
      </TouchableRipple>
    }
    style={{ marginTop: 61 }}
  >
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      <Image style={{ height: 48, width: 48 }} source={{ uri: i.pin }} />
      <Text allowFontScaling={false} style={{ fontSize: 12, ...font("bold") }}>{i.friendly_name}</Text>
      <Text allowFontScaling={false} style={{ fontSize: 12, ...font("bold") }}>{t('activity:by_user',{user:i.username})}</Text>
    </View>
  </Menu>;
}

function DateSwitcher({ dateString }) {
  var moment = useMoment();
  const nav = useNavigation();
  const theme = useSelector(i=>i.themes[i.theme]);
  const [datePickerOpen,setDatePickerOpen] = React.useState(false);
  return <View style={{ padding: 4, width: 400, maxWidth: "100%", alignSelf: "center" }}>
    <Card cardStyle={{ backgroundColor: (theme.clanCardHeader || theme.navigation).bg }} noPad>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Menu
          visible={datePickerOpen}
          onDismiss={() => setDatePickerOpen(false)}
          anchor={
            <IconButton icon="calendar" color={(theme.clanCardHeader || theme.navigation).fg} onPress={() => setDatePickerOpen(true)} />
          }
          contentStyle={{ padding: 0, backgroundColor: theme.page_content.bg, borderWidth: theme.page_content.border ? 1 : 0, borderColor: theme.page_content.border }}
        >
          <DatePicker noWrap value={moment({
            year: Number(dateString.split('-')[0]),
            month: Number(dateString.split('-')[1]) - 1,
            date: Number(dateString.split('-')[2]),
          })} onChange={(date) => {
            nav.setParams({
              date: `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
            })
          }} />
        </Menu>

        <Text allowFontScaling={false} style={{ flex: 1, ...font("bold"), fontSize: 16, color: (theme.clanCardHeader || theme.navigation).fg }}>{moment({
          year: Number(dateString.split('-')[0]),
          month: Number(dateString.split('-')[1]) - 1,
          date: Number(dateString.split('-')[2]),
        }).format('L')}</Text>
      </View>
    </Card>
  </View>
}

export default function UserSHCScreen() {
  var moment = useMoment();
  var [FABOpen, setFABOpen] = React.useState(false);
  var [datePickerOpen, setDatePickerOpen] = React.useState(false);
  var logins = useSelector(i => i.logins)
  var nav = useNavigation();
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
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
    { icon: 'rainbowunicorn', name: t('shc:pro.tob'), function: i => i?.bouncer?.type == "tob" },
    { icon: 'nomad', name: t('shc:pro.nomad'), function: i => i?.bouncer?.type == "nomad" },
    { icon: 'retiredunicorn', name: t('shc:pro.retire'), function: i => i?.bouncer?.type == "retiremyth" || i?.bouncer?.type == "zombiepouch" },
    { icon: 'yeti', name: t('shc:pro.myth_1'), function: i => i?.myth_set == "original" },
    { icon: 'cyclops', name: t('shc:pro.myth_2'), function: i => i?.myth_set == "classical" },
    { icon: 'mermaid', name: t('shc:pro.myth_3'), function: i => i?.myth_set == "mirror" },
    { icon: 'poseidon', name: t('shc:pro.myth_4'), function: i => i?.myth_set == "modern" },
    { icon: 'tuli', name: t('shc:pro.pc_1'), function: i => i?.category == "pouch_season_1" },
    { icon: 'magnetus', name: t('shc:pro.pc_2'), function: i => i?.category == "pouch_season_2" },
    { icon: 'oniks', name: t('shc:pro.pc_fun'), function: i => i?.category == "pouch_funfinity" },
    { icon: 'tuxflatrob', name: t('shc:pro.flat'), function: i => i?.bouncer?.type == "flat" },
    { icon: 'morphobutterfly', name: t('shc:pro.temp'), function: i => i?.bouncer?.type == "temppob" },
    { icon: 'scattered', name: t('shc:pro.pscatter'), function: i => i?.scatter && i.state == "physical" },
    { icon: 'feather', name: t('shc:pro.vscatter'), function: i => i?.scatter && i.state == "virtual" },
  ]
  if (!data || !data.captures) return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page.bg }}>
      <ActivityIndicator size="large" color={theme.page.fg} />
    </View>
  )
  var destinations = data.captures.filter(z => g(z)?.destination?.type == "bouncer")
  var category_data = {};
  for (let category of categories) {
    category_data[category.name] = [];
  }
  for (let x of data.captures) {
    var y = g(x);
    if(!y?.bouncer && !y?.scatter) continue;
    for (let category of categories) {
      if(category.function(y)) {
        category_data[category.name].push({
          i: x,
          m: destinations.find(z => z.captured_at == x.captured_at)
        })
      };
    }
  }
  return <View style={{ flex: 1, backgroundColor: theme.page.bg }}>
    <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 8 }}>
      <DateSwitcher dateString={dateString} />
      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
        {categories.map(i => <View style={{ padding: 4, width: 400, maxWidth: "100%" }}>
          <Card noPad>
            <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
              <View style={{ padding: 8 }}>
                <Image source={{ uri: `https://server.cuppazee.app/pins/128/${i?.icon}.png` }} style={{ width: 36, height: 36 }} />
              </View>
              <View style={{ paddingRight: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{category_data[i.name].length}x {i?.name}</Text>
                <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                  {category_data[i.name].map(x => <SHCItem i={x.i} m={x.m} />)}
                </View>
              </View>
              <View style={{ alignSelf: "stretch", borderTopRightRadius: 8, borderBottomRightRadius: 8, borderLeftWidth: dark ? 2 : 0, borderLeftColor: dark ? level_colors[data.captures.filter(x => i.function(g(x))).length > 0 ? 5 : 0] : undefined, backgroundColor: dark ? undefined : level_colors[category_data[i.name].length > 0 ? 5 : 0], width: 50, alignItems: "center", justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 24, ...font("bold") }}>{category_data[i.name].length > 0 ? '✔' : ''}</Text>
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