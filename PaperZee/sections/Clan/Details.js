import * as React from 'react';
import { View, ScrollView } from 'react-native';
import ClanRequirements from './Cards/Requirements';
import ClanStats from './Cards/Stats';
import { useSelector } from 'react-redux';

export default function ClanScreen({route}) {
  var theme = useSelector(i=>i.themes[i.theme]);
  var clan_id = route.params.clanid;
  return (
    <ScrollView style={{backgroundColor:theme.page.bg,flex: 1}} contentContainerStyle={{padding:4}}>
      <View style={{ padding: 4 }}>
        <ClanStats clan_id={clan_id} game_id={85} />
      </View>
      <View style={{ padding: 4 }}>
        <ClanRequirements game_id={85} />
      </View>
    </ScrollView>
  );
}