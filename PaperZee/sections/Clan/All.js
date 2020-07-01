import * as React from 'react';
import { View, FlatList } from 'react-native';
import ClanRequirements from './Cards/Requirements';
import ClanStats from './Cards/Stats';
import { useDimensions } from '@react-native-community/hooks'
import { useSelector, useDispatch } from 'react-redux';
import s from 'utils/store';

function Clan({ item }) {
  return ({
    clan_stats: <View style={{ padding: 4, flex: 1 }}>
      <ClanStats clan_id={item.clan_id} game_id={88} />
    </View>,
    clan_requirements: <View style={{ padding: 4, flex: 1 }}>
      <ClanRequirements game_id={88} />
    </View>,
    blankHack: <View style={{ flex: 1, padding: 4 }}></View>
  }[item.type]||null)
}

export default function AllClansScreen() {
  var theme = useSelector(i => i.themes[i.theme]);
  var { width } = useDimensions().window;
  var dash = useSelector(i => i.clanBookmarks);
  var dispatch = useDispatch();
  return (
    <FlatList
      key={width}
      style={{ backgroundColor: theme.page.bg }}
      contentContainerStyle={{ padding: 4 }}
      numColumns={width > 800 ? 2 : 1}
      data={[
        { type: "clan_requirements", key: "clanreq" },
        ...dash.map(i => {
          i.type = "clan_stats";
          i.key = i.clan_id;
          return i;
        }),
        { type: "blankHack", key: "blankHack" },
      ]}
      renderItem={({ item }) => <Clan item={item} />}
      keyExtractor={item => (item.key || "xd").toString()}
    />
  );
}