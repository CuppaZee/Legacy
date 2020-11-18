import * as React from 'react';
import { View, ScrollView } from 'react-native';
import ClanRequirements from './Cards/Requirements';
import ClanStats from './Cards/Stats';
import { useSelector } from 'react-redux';
import { Dropdown, DropdownItem } from '../More/Dropdown';
import config from 'utils/config';
import useMoment from 'utils/hooks/useMoment';
import { useNavigation } from '@react-navigation/native';

const array = [];
for(let i = 79;i < 94;i++) {
  const {m,y} = config.clan.reverse_game_id_function(i);
  array.push({
    i,
    l: {month:m,year:y,date:15}
  });
}

export default function ClanScreen({ route }) {
  var [scale, setScale] = React.useState(1);
  var theme = useSelector(i => i.themes[i.theme]);
  var clan_id = route.params.clanid;
  var game_id = (route.params.year && route.params.month) ? (route.params.year*12)+(route.params.month-1)-24158 : config.clan.game_id;
  const moment = useMoment();
  const navigation = useNavigation();
  return (
    <ScrollView style={{ backgroundColor: theme.page.bg, flex: 1 }} contentContainerStyle={{ padding: 4 }}>
      <View style={{ padding: 4 * scale }}>
        <ClanStats clan_id={clan_id} game_id={game_id} />
      </View>
      <View style={{ padding: 4 * scale }}>
        <ClanRequirements scale={scale} zoom={true} game_id={game_id} />
      </View>

      <View style={{ padding: 4 * scale }}>
        <Dropdown mode="outlined" dense={true} selectedValue={game_id} onValueChange={(value) => {
          if(value === config.clan.game_id) {
            navigation.setParams({
              year: undefined,
              month: undefined,
            })
          } else {
            const reverse = config.clan.reverse_game_id_function(value);
            navigation.setParams({
              year: reverse.y,
              month: reverse.m + 1,
            })
          }
        }}>
          {array.slice().reverse().map(i => <DropdownItem value={i.i} label={moment(i.l).format('MMMM YYYY')} />)}
        </Dropdown>
      </View>
    </ScrollView>
  );
  return (
    <ScrollView horizontal={true} style={{ backgroundColor: theme.page.bg, flex: 1 }}>
      <ScrollView style={{ backgroundColor: "green" ?? theme.page.bg, flex: 1 }} contentContainerStyle={{ backgroundColor: "red", justifyContent: "flex-start", alignItems: "flex-start" }}>
        <View style={{ padding: 4 * scale, flex: 1 }}>
          <ClanStats clan_id={clan_id} game_id={config.clan.game_id} />
        </View>
        <View style={{ padding: 4 * scale, flex: 1 }}>
          <ClanRequirements scale={scale} zoom={true} game_id={config.clan.game_id} />
        </View>
      </ScrollView>
    </ScrollView>
  );
}