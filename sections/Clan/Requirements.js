import * as React from 'react';
import { View, ScrollView } from 'react-native';
import ClanRequirements from './Cards/Requirements';
import { useSelector } from 'react-redux';
import { Dropdown, DropdownItem } from 'sections/More/Dropdown';
import useMoment from 'utils/hooks/useMoment';

export default function ClanScreen({ route, navigation }) {
  var moment = useMoment();
  var theme = useSelector(i => i.themes[i.theme]);
  var game_id = (route.params.year * 12) + (route.params.month - 1) - 24158;
  var months = [];
  for (var date = moment(); date.valueOf() > 1569906000000; date.add(-1, 'month')) {
    months.push(date.format('MMMM YYYY'));
  }
  return (
    <ScrollView style={{ backgroundColor: theme.page.bg, flex: 1 }} contentContainerStyle={{ padding: 4 }}>
      <View style={{ padding: 4 }}>
        <Dropdown dense={true} mode="outlined" selectedValue={moment({month:route.params.month-1,year:route.params.year}).format('MMMM YYYY')} onValueChange={(value) => {
          var date = moment(value);
          navigation.setParams({ month: date.month() + 1, year: date.year() })
        }}>
          {months.map(i => <DropdownItem label={i} value={i} />)}
        </Dropdown>
      </View>
      <View style={{ padding: 4 }}>
        <ClanRequirements game_id={game_id} />
      </View>
      <View style={{ padding: 4 }}>
        <ClanRequirements list={true} game_id={game_id} />
      </View>
    </ScrollView>
  );
}