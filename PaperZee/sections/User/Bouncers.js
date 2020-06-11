import * as React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import Card from '~sections/Shared/Card';
import { useSelector, useDispatch } from 'react-redux';
import { FAB } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import useAPIRequest from '~sections/Shared/useAPIRequest'
import font from '~sections/Shared/font';
import moment from 'moment';
import MapView from '~sections/Maps/MapView';

function UserIcon({ user_id, size }) {
  return <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ marginLeft: -(size - 24) / 2, marginTop: -(size - 24) / 2, height: size, width: size }} />
}

export default function ClanScreen({ route }) {
  var selected_theme = useSelector(i => i.theme);
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
  var [FABOpen, setFABOpen] = React.useState(false);
  var nav = useNavigation();
  var logins = useSelector(i => i.logins);
  var user_id = Number(route.params.userid);
  var bouncers = useAPIRequest({
    endpoint: `user/bouncers/v1`,
    data: {
      user_id
    },
    cuppazee: true
  })
  if(!bouncers) return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        {!bouncers && <Text allowFontScaling={false} style={{ color: theme.page.fg, ...font() }}>Loading...</Text>}
        {bouncers && <View style={{ padding: 4, height: 400 }}>
          <Card noPad>
            <MapView tracksViewChanges={true} markers={bouncers.filter(i => i.bouncer).map(i => ({
              lat: Number(i.bouncer.latitude),
              lng: Number(i.bouncer.longitude),
              icon: i.pin_icon.replace('https://munzee.global.ssl.fastly.net/images/pins','https://server.cuppazee.app/pins/64')
            }))} style={{ flex: 1 }} />
          </Card>
        </View>}
        {bouncers?.map?.(i => <View style={{ padding: 4 }}>
          <Card noPad cardStyle={{ opacity: i.bouncer ? 1 : 0.4 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ padding: 8 }}>
                <Image source={{ uri: i.pin_icon }} style={{ width: 48, height: 48 }} />
              </View>
              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{i.friendly_name}</Text>
                {/* <Text allowFontScaling={false} style={{fontSize:16,opacity:0.8}}><MaterialCommunityIcons name="sword-cross" size={16}/> The Cup of Coffee Clan</Text> */}
                {i.bouncer ? <>
                  <Text allowFontScaling={false} style={{ fontSize: 14, ...font(400), color: theme.page_content.fg, opacity: 1 }}>At <Text allowFontScaling={false} style={font(700)}>{i.bouncer.friendly_name}</Text> by <Text allowFontScaling={false} style={font(700)}>{i.bouncer.full_url.match(/\/m\/([^/]+)\/[0-9]+/)[1]}</Text></Text>
                  <Text allowFontScaling={false} style={{ fontSize: 14, ...font(400), color: theme.page_content.fg, opacity: 0.8 }}>{i.location.formatted}</Text>
                  <Text allowFontScaling={false} style={{ fontSize: 12, ...font(400), color: theme.page_content.fg, opacity: 0.8 }}>{i.number_of_captures} Captures - Last Captured: {moment(i.last_captured_at).format('L LTS')}</Text>
                </> : <>
                    <Text allowFontScaling={false} style={{ fontSize: 14, ...font(500), color: theme.page_content.fg, opacity: 1 }}>Taking a Rest</Text>
                  </>}
              </View>
            </View>
          </Card>
        </View>)}
      </ScrollView>
      <FAB.Group
        open={FABOpen}
        icon={() => <UserIcon size={56} user_id={user_id} />}
        actions={Object.entries(logins).filter(i => i[0] != user_id).slice(0, 5).map(i => ({ icon: () => <UserIcon size={40} user_id={Number(i[0])} />, label: i[1].username, onPress: () => nav.replace('UserDetails', { userid: Number(i[0]) }) }))}
        onStateChange={({ open }) => setFABOpen(open)}
      />
    </View>
  );
}