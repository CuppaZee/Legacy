import * as React from 'react';
import { View, ScrollView } from 'react-native';
import ClanRequirements from './Cards/Requirements';
import ClanStats from './Cards/Stats';
import { useSelector } from 'react-redux';

export default function ClanScreen({route}) {
  var [scale,setScale] = React.useState(1);
  var theme = useSelector(i=>i.themes[i.theme]);
  var clan_id = route.params.clanid;
  return (
    <ScrollView style={{backgroundColor:theme.page.bg,flex: 1}} contentContainerStyle={{padding:4}}>
      <View style={{ padding: 4*scale }}>
        <ClanStats clan_id={clan_id} game_id={86} />
      </View>
      <View style={{ padding: 4*scale }}>
        <ClanRequirements scale={scale} zoom={true} game_id={86} />
      </View>
    </ScrollView>
  );
  return (
    <ScrollView horizontal={true} style={{backgroundColor:theme.page.bg,flex:1}}>
      <ScrollView style={{backgroundColor:"green"??theme.page.bg,flex:1}} contentContainerStyle={{backgroundColor:"red",justifyContent:"flex-start",alignItems:"flex-start"}}>
        <View style={{ padding: 4*scale, flex: 1 }}>
          <ClanStats clan_id={clan_id} game_id={86} />
        </View>
        <View style={{ padding: 4*scale, flex: 1 }}>
          <ClanRequirements scale={scale} zoom={true} game_id={86} />
        </View>
      </ScrollView>
    </ScrollView>
  );
}