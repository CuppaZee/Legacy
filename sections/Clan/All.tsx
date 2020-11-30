
import * as React from 'react';

import { View, FlatList } from 'react-native';



import ClanRequirements from './Cards/Requirements';



import ClanStats from './Cards/Stats';
import { useDimensions } from '@react-native-community/hooks'

import { useSelector } from 'react-redux';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/config' or its correspon... Remove this comment to see the full error message
import config from 'utils/config';

function Clan({
  item
}: any) {



  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return ({



    clan_stats: <View style={{ padding: 4, flex: 1 }}>



      <ClanStats clan_id={item.clan_id} game_id={config.clan.game_id} />
    </View>,



    clan_requirements: <View style={{ padding: 4, flex: 1 }}>



      <ClanRequirements game_id={config.clan.game_id} />
    </View>,



    blankHack: <View style={{ flex: 1, padding: 4 }}></View>
  }[item.type]||null)
}

export default function AllClansScreen() {
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var { width } = useDimensions().window;
  var dash = useSelector((i: any) => i.clanBookmarks);
  return (



    <FlatList
      key={width}
      style={{ backgroundColor: theme.page.bg }}
      contentContainerStyle={{ padding: 4 }}
      numColumns={width > 800 ? 2 : 1}
      data={[
        { type: "clan_requirements", key: "clanreq" },
        ...dash.map((i: any) => {
          i.type = "clan_stats";
          i.key = i.clan_id;
          return i;
        }),
        { type: "blankHack", key: "blankHack" },
      ]}
      renderItem={({
        item
      }: any) => <Clan item={item} />}
      keyExtractor={(item: any) => (item.key || "xd").toString()}
    />
  );
}