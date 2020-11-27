// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { View, ScrollView } from 'react-native';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Cards/Requirements' was resolved to 'C:/... Remove this comment to see the full error message
import ClanRequirements from './Cards/Requirements';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Cards/Stats' was resolved to 'C:/Users/s... Remove this comment to see the full error message
import ClanStats from './Cards/Stats';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../More/Dropdown' was resolved to 'C:/User... Remove this comment to see the full error message
import { Dropdown, DropdownItem } from '../More/Dropdown';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/config' or its correspon... Remove this comment to see the full error message
import config from 'utils/config';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
import { useNavigation } from '@react-navigation/native';

const array: any = [];
for(let i = 79;i < 94;i++) {
  const {m,y} = config.clan.reverse_game_id_function(i);
  array.push({
    i,
    l: {month:m,year:y,date:15}
  });
}

export default function ClanScreen({
  route
}: any) {
  var [scale, setScale] = React.useState(1);
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var clan_id = route.params.clanid;
  var game_id = (route.params.year && route.params.month) ? (route.params.year*12)+(route.params.month-1)-24158 : config.clan.game_id;
  const moment = useMoment();
  const navigation = useNavigation();
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ScrollView style={{ backgroundColor: theme.page.bg, flex: 1 }} contentContainerStyle={{ padding: 4 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ padding: 4 * scale }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ClanStats clan_id={clan_id} game_id={game_id} />
      </View>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ padding: 4 * scale }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ClanRequirements scale={scale} zoom={true} game_id={game_id} />
      </View>

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ padding: 4 * scale }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Dropdown mode="outlined" dense={true} selectedValue={game_id} onValueChange={(value: any) => {
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
          {/* @ts-expect-error ts-migrate(7006) FIXME: Parameter 'i' implicitly has an 'any' type. */}
          {array.slice().reverse().map(i => <DropdownItem value={i.i} label={moment(i.l).format('MMMM YYYY')} />)}
        </Dropdown>
      </View>
    </ScrollView>
  );
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ScrollView horizontal={true} style={{ backgroundColor: theme.page.bg, flex: 1 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ScrollView style={{ backgroundColor: "green" ?? theme.page.bg, flex: 1 }} contentContainerStyle={{ backgroundColor: "red", justifyContent: "flex-start", alignItems: "flex-start" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ padding: 4 * scale, flex: 1 }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <ClanStats clan_id={clan_id} game_id={config.clan.game_id} />
        </View>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ padding: 4 * scale, flex: 1 }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <ClanRequirements scale={scale} zoom={true} game_id={config.clan.game_id} />
        </View>
      </ScrollView>
    </ScrollView>
  );
}