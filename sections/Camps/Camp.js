import * as React from 'react';
import { Text, View, Image, ActivityIndicator, FlatList, TextInput } from 'react-native';
import { TouchableRipple, Portal, Dialog } from 'react-native-paper';
import Card from 'sections/Shared/Card';
import { useSelector } from 'react-redux';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import useLevelColours from 'utils/hooks/useLevelColours';
import font from 'sections/Shared/font';
import getIcon from 'utils/db/icon';
import { useRoute } from '@react-navigation/native';

const types = [
  { icon: "redwaterballoon", id: 0, name: "Red Balloon" },
  { icon: "greenwaterballoon", id: 1, name: "Green Balloon" },
  { icon: "bluewaterballoon", id: 2, name: "Blue Balloon" },
  { icon: "yellowwaterballoon", id: 3, name: "Yellow Balloon" },
  { icon: "campcap-a-lotflag", id: 4, name: "Cap-A-Lot Flag" },
  { icon: "campqrantineflag", id: 5, name: "QRantine Flag" },
  { icon: "campfreezflag", id: 6, name: "FrEEZ Flag" },
  { icon: "campkennezeeflag", id: 7, name: "KenneZee Flag" },
]

const UserTile = React.memo(function ({ i, index }) {
  var theme = useSelector(i => i.themes[i.theme]);
  var [open, setOpen] = React.useState(false);
  var dark = false;
  var route = useRoute();
  var level_colors = useLevelColours();
  if (theme.dark) {
    dark = true;
  }
  var caps = useAPIRequest(open ? {
    endpoint: `camps/player/v1`,
    data: {
      user_id: i.i,
      week: route.params.week
    },
    cuppazee: true
  } : null)
  return <View style={{ padding: 4 }}>
    <Card noPad>
      <TouchableRipple onPress={() => {
        setOpen(!open)
      }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
            <Image source={getIcon(`https://munzee.global.ssl.fastly.net/images/avatars/ua${i?.i?.toString?.(36)}.png`)} style={{ width: 36, height: 36, borderRadius: 18 }} />
          </View>
          <View style={{ paddingHorizontal: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
            <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>#{index + 1} - {i.n}</Text>
          </View>
          <View style={{ alignSelf: "stretch", borderTopRightRadius: 8, borderBottomRightRadius: open ? 0 : 8, borderLeftWidth: dark ? 2 : 0, borderLeftColor: dark ? level_colors[Math.max(0, Math.min(Math.ceil(i.p / 50), 5))].bg : undefined, backgroundColor: dark ? undefined : level_colors[Math.max(0, Math.min(Math.ceil(i.p / 50), 5))].bg, width: 60, alignItems: "center", justifyContent: "center" }}>
            <Text allowFontScaling={false} style={{ color: level_colors[Math.max(0, Math.min(Math.ceil(i.p / 50), 5))].fg, fontSize: 16, ...font("bold") }}>{i.p?.toLocaleString?.() || "0"}</Text>
          </View>
        </View>
      </TouchableRipple>
      <Portal>
        <Dialog
          visible={open}
          onDismiss={() => { setOpen(false) }}
          style={{ maxWidth: 390, alignSelf: "center", borderRadius: 8, backgroundColor: theme.page_content.bg }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
              <Image source={getIcon(`https://munzee.global.ssl.fastly.net/images/avatars/ua${i?.i?.toString?.(36)}.png`)} style={{ width: 36, height: 36, borderRadius: 18 }} />
            </View>
            <View style={{ paddingHorizontal: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
              <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>#{index + 1} - {i.n}</Text>
            </View>
            <View style={{ alignSelf: "stretch", borderTopRightRadius: 8, borderBottomRightRadius: open ? 0 : 8, borderLeftWidth: dark ? 2 : 0, borderLeftColor: dark ? level_colors[Math.max(0, Math.min(Math.ceil(i.p / 50), 5))].bg : undefined, backgroundColor: dark ? undefined : level_colors[Math.max(0, Math.min(Math.ceil(i.p / 50), 5))].bg, width: 60, alignItems: "center", justifyContent: "center" }}>
              <Text allowFontScaling={false} style={{ color: level_colors[Math.max(0, Math.min(Math.ceil(i.p / 50), 5))].fg, fontSize: 16, ...font("bold") }}>{i.p?.toLocaleString?.() || "0"}</Text>
            </View>
          </View>
          <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
            {types.map(x => <View key={x.id} style={{ padding: 4, width: 80, flexGrow: 1, alignItems: "center", opacity: (caps || [])[x.id] ?? 0 > 0 ? 1 : 0.4 }}>
              <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={getIcon(x.icon)} />
              <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="middle" style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{x.name}</Text>
              <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{(caps || [])[x.id] ?? '?'}</Text>
            </View>)}
          </View>
        </Dialog>
      </Portal>
    </Card>
  </View>
})

export default function TeamLeaderboardScreen({ route }) {
  var theme = useSelector(i => i.themes[i.theme]);
  var team = route.params.team;
  var team_data = useAPIRequest({
    endpoint: `camps/team/v1`,
    data: {
      team,
      week: route.params.week
    },
    cuppazee: true
  })
  var users = team_data?.members || [];
  var [value, setValue] = React.useState('');
  var [search, setSearch] = React.useState('');
  var [timeoutC, setTimeoutC] = React.useState(null);
  function onValue(val) {
    if (timeoutC) clearTimeout(timeoutC)
    setValue(val);
    setTimeoutC(setTimeout(() => {
      return setSearch(val);
    }, 500))
  }
  users.sort((a, b) => b.p - a.p);
  if (!team_data) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return <FlatList
    getItemLayout={(data, index) => (
      { length: 52, offset: 52 * index, index }
    )}
    contentContainerStyle={{ width: 400, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
    style={{ flex: 1, backgroundColor: theme.page.bg }}
    data={users.filter(i => (i.n||"").toString().toLowerCase().includes(search.toLowerCase()))}
    ListHeaderComponent={<View style={{ padding: 4, width: "100%" }}>
      <Card noPad cardStyle={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "stretch" }}>
        <TextInput
          onSubmitEditing={() => setSearch(value)}
          style={{ paddingHorizontal: 8, flex: 1, borderRadius: 8, borderBottomLeftRadius: 8, height: 40 }}
          onChangeText={onValue}
          value={value}
          returnKeyType="search"
          placeholder="Search"
        />
      </Card>
    </View>}
    renderItem={({ item }) => (
      <UserTile i={item} index={users.findIndex(x => x.p === item.p)} />
    )}
    keyExtractor={item => item.i}
    windowSize={5}
  />
}