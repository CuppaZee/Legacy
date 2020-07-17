import * as React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { TouchableRipple, Button } from 'react-native-paper';
import Card from 'sections/Shared/Card';
import { useSelector } from 'react-redux';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import useLevelColours from 'utils/hooks/useLevelColours';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';
import { useNavigation } from '@react-navigation/native';

const statusMessage = {
  finalresults: "Final results",
  resultssoon: "Final results soon",
  ongoing: "Ongoing",
  leaderboardsoon: "Leaderboard coming soon",
  comingsoon: "Not started yet",
}

const statusColor = {
  finalresults: 5,
  resultssoon: 4,
  ongoing: 3,
  leaderboardsoon: 3,
  comingsoon: 2,
}

export default function ClanScreen({ route }) {
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var loggedIn = useSelector(i => i.loggedIn);
  var dark = false;
  var level_colors = useLevelColours();
  if (theme.dark) {
    dark = true;
    level_colors.border = "#fffa"
  }
  var nav = useNavigation();
  var weeks = useAPIRequest({
    endpoint: 'camps/status/v1',
    cuppazee: true
  });
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
  var list_data = useAPIRequest(search.length >= 3 ? {
    endpoint: 'camps/search/v1',
    data: {
      search
    },
    cuppazee: true
  } : null);
  var list = (list_data || {}).list || [];
  if (!weeks) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ width: 400, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        {weeks.map((i, index) => <View style={{ padding: 4 }}>
          <Card noPad>
            <TouchableRipple onPress={(i.status === "comingsoon" || i.status === "resultssoon" || i.status === "leaderboardsoon") ? null : () => {
              nav.navigate('AllCampLeaderboard', { week: i.id })
            }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* <View style={{ padding: 8 }}>
                  <Image source={getIcon(i.icon || i.id)} style={{ width: 48, height: 48 }} />
                </View> */}
                <View style={{ padding: 8, flex: 1, justifyContent: "center" }}>
                  <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{i.title}</Text>
                  {/* <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="trophy" size={16} /> {t('clan:rank', { rank: index + 1 })}</Text> */}
                  {/* <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="account" size={16} /> {t('clan:players', { count: i.members.length })}</Text> */}
                </View>
                <View style={{ alignSelf: "stretch", borderTopRightRadius: 8, borderBottomRightRadius: 8, borderLeftWidth: dark ? 2 : 0, borderLeftColor: dark ? level_colors[statusColor[i.status]].bg : undefined, backgroundColor: dark ? undefined : level_colors[statusColor[i.status]].bg, width: 100, height: 80, alignItems: "center", justifyContent: "center" }}>
                  {/* <Text allowFontScaling={false} style={{ color: level_colors[5 - index].fg, fontSize: 20, ...font("bold") }}>{i.total?.toLocaleString() || "????"}</Text> */}
                  <Text allowFontScaling={false} numberOfLines={3} style={{ textAlign: "center", color: level_colors[statusColor[i.status]].fg, fontSize: 16, ...font("bold") }}>{statusMessage[i.status]}</Text>
                </View>
              </View>
            </TouchableRipple>
          </Card>
        </View>)}
        <View style={{ padding: 4, width: "100%" }}>
          <Card noPad cardStyle={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "stretch" }}>
            <TextInput
              onSubmitEditing={() => setSearch(value)}
              style={{ paddingHorizontal: 8, flex: 1, borderRadius: 8, borderBottomLeftRadius: 8, height: 40 }}
              onChangeText={onValue}
              value={value}
              returnKeyType="search"
              placeholder="Find your Camp - Type your Username here"
            />
          </Card>
        </View>
        {list.map(i => <View style={{ padding: 4 }}>
          <Card noPad>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
                <Image source={getIcon(i.camp_icon)} style={{ width: 36, height: 36, borderRadius: 18 }} />
              </View>
              <View style={{ paddingHorizontal: 8, paddingVertical: 4, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{i.name}</Text>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), opacity: 0.7, color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{i.camp_name}</Text>
              </View>
            </View>
          </Card>
        </View>)}
        {loggedIn && <View style={{ padding: 4, width: "100%" }}>
          <Button icon="map" mode="contained" style={{ backgroundColor: theme.navigation.bg }} onPress={() => nav.navigate('BouncerMap', { type: 'munzeebirthday2020' })}>Birthday Specials Map</Button>
        </View>}
        <View style={{ padding: 4 }}>
          <Card noPad>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
                <MaterialCommunityIcons size={32} name="clock" color={theme.page_content.fg} />
              </View>
              <View style={{ paddingHorizontal: 8, paddingVertical: 4, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>Please be patient</Text>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), opacity: 0.7, color: theme.page_content.fg }}>It may take up to 1.5 hours after you capture a special for the points to come through due to the large amount of players.</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}