import * as React from 'react';
import { View, ScrollView } from 'react-native';
import ClanRequirements from './Cards/Requirements';
import { useSelector } from 'react-redux';

export default function ClanScreen({route}) {
  var theme = useSelector(i=>i.themes[i.theme]);
  var game_id = route.params.gameid;
  return (
    <ScrollView style={{backgroundColor:theme.page.bg,flex: 1}} contentContainerStyle={{padding:4}}>
      <View style={{ padding: 4 }}>
        <ClanRequirements game_id={game_id} />
      </View>
    </ScrollView>
  );
}