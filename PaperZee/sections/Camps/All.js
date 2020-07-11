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
import Fuse from 'fuse.js'

const fuseoptions = {
  includeScore: true,
  keys: ['n']
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
  var teams = useAPIRequest({
    endpoint: `camps/list/v1`,
    cuppazee: true
  })
  var [value, setValue] = React.useState('');
  var [search, setSearch] = React.useState('');
  var [timeoutC, setTimeoutC] = React.useState(null);

  var allMembers = [];
  for (let team of teams || []) {
    allMembers.push(...team.members.map(i => ({
      n: i,
      t: team.name,
      f: team.icon
    })));
  }

  var fuse = new Fuse(allMembers, fuseoptions)
  function onValue(val) {
    if (timeoutC) clearTimeout(timeoutC)
    setValue(val);
    setTimeoutC(setTimeout(() => {
      return setSearch(val);
    }, 500))
  }
  var list = search.length >= 3 ? fuse.search(search) : [];



  if (!teams) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        {teams?.map?.((i, index) => <View style={{ padding: 4 }}>
          <Card noPad>
            <TouchableRipple onPress={() => {
              nav.navigate('CampLeaderboard', { team: i.id })
            }}>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ padding: 8 }}>
                  <Image source={getIcon(i.icon || i.id)} style={{ width: 48, height: 48 }} />
                </View>
                <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                  <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{i.name}</Text>
                  <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="trophy" size={16} /> {t('clan:rank', { rank: index + 1 })}</Text>
                  <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="account" size={16} /> {t('clan:players', { count: i.members.length })}</Text>
                </View>
                <View style={{ alignSelf: "stretch", borderTopRightRadius: 8, borderBottomRightRadius: 8, borderLeftWidth: dark ? 2 : 0, borderLeftColor: dark ? level_colors[5 - index].bg : undefined, backgroundColor: dark ? undefined : level_colors[5 - index].bg, width: 80, alignItems: "center", justifyContent: "center" }}>
                  <Text allowFontScaling={false} style={{ color: level_colors[5 - index].fg, fontSize: 20, ...font("bold") }}>{i.total?.toLocaleString() || "????"}</Text>
                  <Text allowFontScaling={false} style={{ color: level_colors[5 - index].fg, fontSize: 16, ...font("bold") }}>{t('clan_req:Points')}</Text>
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
        {list.slice(0,10).filter(i=>i.score<0.2).map(({item:i}) => <View style={{ padding: 4 }}>
          <Card noPad>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
                <Image source={getIcon(i.f)} style={{ width: 36, height: 36, borderRadius: 18 }} />
              </View>
              <View style={{ paddingHorizontal: 8, paddingVertical: 4, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{i.n}</Text>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), opacity: 0.7, color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{i.t}</Text>
              </View>
            </View>
          </Card>
        </View>)}
        {loggedIn&&<View style={{ padding: 4, width: "100%" }}>
          <Button icon="map" mode="contained" style={{backgroundColor:theme.navigation.bg}} onPress={()=>nav.navigate('BouncerMap',{type:'munzeebirthday2020'})}>Birthday Specials Map</Button>
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