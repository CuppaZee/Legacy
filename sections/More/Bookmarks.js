import * as React from 'react';
import { Text, View, TextInput, Image, ScrollView } from 'react-native';
import Card from 'sections/Shared/Card';
import { useSelector, useDispatch } from 'react-redux';
import font from 'sections/Shared/font';
import Fuse from 'fuse.js'
import types from 'utils/db/types.json';
import categories from 'utils/db/categories.json';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButton, TouchableRipple } from 'react-native-paper';
import s from 'utils/store';
var { clanBookmarks: clanBookmarksR, userBookmarks: userBookmarksR } = s;

const options = {
  includeScore: true,
  keys: ['name', 'id', 'category']
}
const fuse = new Fuse([...types.filter(i => !i.hidden), ...categories.filter(i => !i.hidden)], options)

export default function SearchScreen({ navigation }) {
  var { t } = useTranslation()
  var theme = useSelector(i => i.themes[i.theme])
  const dispatch = useDispatch();
  var input = React.useRef();
  var clanBookmarks = useSelector(i => i.clanBookmarks);
  function moveClan(index, direction) {
    const clanB = clanBookmarks.slice()
    const clan = clanB.splice(index, 1);
    clanB.splice(index + (direction === "up" ? -1 : 1), 0, clan[0]);
    dispatch(clanBookmarksR(clanB))
  }
  function removeClan(index) {
    const clanB = clanBookmarks.slice()
    const clan = clanB.splice(index, 1);
    dispatch(clanBookmarksR(clanB))
  }
  var userBookmarks = useSelector(i => i.userBookmarks);
  function moveUser(index, direction) {
    const userB = userBookmarks.slice()
    const user = userB.splice(index, 1);
    userB.splice(index + (direction === "up" ? -1 : 1), 0, user[0]);
    dispatch(userBookmarksR(userB))
  }
  function removeUser(index) {
    const userB = userBookmarks.slice()
    const user = userB.splice(index, 1);
    dispatch(userBookmarksR(userB))
  }
  return (
    <ScrollView
      contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      <View style={{ padding: 4 }}>
        <Card noPad>
          <View style={{ padding: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: (theme.clan_header || theme.navigation).bg, flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons style={{ marginHorizontal: 6 }} name="shield-half-full" size={24} color={(theme.clan_header || theme.navigation).fg} />
            <View style={{ flex: 1, paddingLeft: 4 }}>
              <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: (theme.clan_header || theme.navigation).fg }}>Clans</Text>
            </View>
          </View>
          {
            clanBookmarks.map((i, index) => <View style={{ padding: 8, paddingVertical: 4, flexDirection: "row", alignItems: "center" }}>
              <IconButton style={{ margin: 0 }} onPress={() => removeClan(index)} size={24} icon="close" color="#ff2222" />
              <Image style={{ height: 32, width: 32, marginRight: 4, borderRadius: 16 }} source={{ uri: i.logo ?? `https://munzee.global.ssl.fastly.net/images/clan_logos/${(i.clan_id || 0).toString(36)}.png` }} />
              <View style={{ flex: 1 }}>
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{i.name}</Text>
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>#{i.tagline}</Text>
              </View>
              <IconButton style={{ margin: 0 }} disabled={index === 0} onPress={() => moveClan(index, 'up')} size={24} icon="chevron-up" color={theme.page_content.fg} />
              <IconButton style={{ margin: 0 }} disabled={index === clanBookmarks.length - 1} onPress={() => moveClan(index, 'down')} size={24} icon="chevron-down" color={theme.page_content.fg} />
              {/* <IconButton onPressIn={()=>{}} onPressOut={()=>{}} size={24} icon="drag" color={theme.page_content.fg} /> */}
            </View>)
          }
          <TouchableRipple onPress={() => navigation.navigate('ClanSearch')}>
            <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons style={{ marginHorizontal: 6 }} size={24} name="plus" color={theme.page_content.fg} />
              <View style={{ flex: 1 }}>
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>Add Clan</Text>
              </View>
            </View>
          </TouchableRipple>
        </Card>
      </View>
      <View style={{ padding: 4 }}>
        <Card noPad>
          <View style={{ padding: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: (theme.clan_header || theme.navigation).bg, flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons style={{ marginHorizontal: 6 }} name="account" size={24} color={(theme.clan_header || theme.navigation).fg} />
            <View style={{ flex: 1, paddingLeft: 4 }}>
              <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: (theme.clan_header || theme.navigation).fg }}>Users</Text>
            </View>
          </View>
          {
            userBookmarks.map((i, index) => <View style={{ padding: 8, paddingVertical: 4, flexDirection: "row", alignItems: "center" }}>
              <IconButton style={{ margin: 0 }} onPress={() => removeUser(index)} size={24} icon="close" color="#ff2222" />
              <Image style={{ height: 32, width: 32, marginRight: 4, borderRadius: 16 }} source={{ uri: i.logo ?? `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(i.user_id || 0).toString(36)}.png` }} />
              <View style={{ flex: 1 }}>
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{i.username}</Text>
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{i.user_id}</Text>
              </View>
              <IconButton style={{ margin: 0 }} disabled={index === 0} onPress={() => moveUser(index, 'up')} size={24} icon="chevron-up" color={theme.page_content.fg} />
              <IconButton style={{ margin: 0 }} disabled={index === userBookmarks.length - 1} onPress={() => moveUser(index, 'down')} size={24} icon="chevron-down" color={theme.page_content.fg} />
              {/* <IconButton onPressIn={()=>{}} onPressOut={()=>{}} size={24} icon="drag" color={theme.page_content.fg} /> */}
            </View>)
          }
          <TouchableRipple onPress={() => navigation.navigate('UserSearch')}>
            <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
              <MaterialCommunityIcons style={{ marginHorizontal: 6 }} size={24} name="plus" color={theme.page_content.fg} />
              <View style={{ flex: 1 }}>
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>Add User</Text>
              </View>
            </View>
          </TouchableRipple>
        </Card>
      </View>
    </ScrollView>
  );
}