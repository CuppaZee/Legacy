
import * as React from 'react';

import { Text, View, Image, ScrollView, TouchableHighlight } from 'react-native';
import { ActivityIndicator, FAB, Menu, TouchableRipple, IconButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types' or its corresp... Remove this comment to see the full error message
import getType from 'utils/db/types';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/DatePicker' or... Remove this comment to see the full error message
import DatePicker from 'sections/Shared/DatePicker';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
import UserFAB from '../FAB';

function g(a: any) {
  return getType(a.pin || a.icon || a.pin_icon);
}

function SHCItem({
  i,
  m
}: any) {
  var {t} = useTranslation();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var [open, setOpen] = React.useState(false);
  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={
      <TouchableRipple onPress={() => setOpen(true)}>
        <View key={i.icon} style={{ padding: 2, alignItems: "center", position: "relative" }}>
          <Image style={{ height: 32, width: 32 }} source={getIcon(i.pin)} />
          {m && <Image style={{ height: 20, width: 20, position: "absolute", bottom: 0, right: -4 }} source={getIcon(m.pin)} />}
        </View>
      </TouchableRipple>
    }
    style={{ marginTop: 61 }}
  >
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      <Image style={{ height: 48, width: 48 }} source={getIcon(i.pin)} />
      <Text allowFontScaling={false} style={{ fontSize: 12, ...font("bold") }}>{i.friendly_name}</Text>
      <Text allowFontScaling={false} style={{ fontSize: 12, ...font("bold") }}>{t('activity:by_user',{user:i.username})}</Text>
    </View>
  </Menu>;
}

function DateSwitcher({
  dateString
}: any) {
  var moment = useMoment();
  const nav = useNavigation();
  const theme = useSelector((i: any) => i.themes[i.theme]);
  const [datePickerOpen,setDatePickerOpen] = React.useState(false);
  return (
    <View style={{ padding: 4, width: 400, maxWidth: "100%", alignSelf: "center" }}>
      <Card cardStyle={{ backgroundColor: (theme.clanCardHeader || theme.navigation).bg }} noPad>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Menu
            visible={datePickerOpen}
            onDismiss={() => setDatePickerOpen(false)}
            anchor={
              <IconButton icon="calendar" color={(theme.clanCardHeader || theme.navigation).fg} onPress={() => setDatePickerOpen(true)} />
            }
            contentStyle={{ padding: 0, backgroundColor: theme.page_content.bg, borderWidth: theme.page_content.border ? 1 : 0, borderColor: theme.page_content.border, width: 300 }}
          >
            <DatePicker noWrap value={moment({
              year: Number(dateString.split('-')[0]),
              month: Number(dateString.split('-')[1]) - 1,
              date: Number(dateString.split('-')[2]),
            })} onChange={(date: any) => {
              nav.setParams({
                date: `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
              })
            }} />
          </Menu>

          <Text allowFontScaling={false} style={{ flex: 1, ...font("bold"), fontSize: 16, color: (theme.clanCardHeader || theme.navigation).fg }}>{moment({
            year: Number(dateString.split('-')[0]),
            month: Number(dateString.split('-')[1]) - 1,
            date: Number(dateString.split('-')[2]),
          }).format('L')}</Text>
        </View>
      </Card>
    </View>
  );
}

export default function UserSHCScreen() {
  var moment = useMoment();
  var { t } = useTranslation();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var dark = false;
  var level_colors = {
    ind: "#ffe97f",
    bot: "#dff77e",
    gro: "#b0fc8d",
    0: "#eb0000",
    1: "#ef6500",
    2: "#fa9102",
    3: "#fcd302",
    4: "#bfe913",
    5: "#55f40b",
    null: "#e3e3e3",
    border: '#000a'
  }
  if (theme.dark) {
    dark = true;
    level_colors.border = "#fffa"
  }
  var route = useRoute();
  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  if (route.params.date) {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    dateString = route.params.date;
  }
  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  var username = route.params.username;
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: (i: any) => i?.user_id
  })
  var categories = [
    { icon: 'rainbowunicorn', name: t('shc:lite.tob'), function: (i: any) => i?.bouncer?.type == "tob" },
    { icon: 'nomad', name: t('shc:lite.nomad'), function: (i: any) => i?.bouncer?.type == "nomad" || i?.bouncer?.type == "retiremyth" || i?.bouncer?.type == "zombiepouch" },
    { icon: 'yeti', name: t('shc:lite.myth_1'), function: (i: any) => i?.myth_set == "original" || i?.myth_set == "classical" },
    { icon: 'mermaid', name: t('shc:lite.myth_2'), function: (i: any) => i?.myth_set == "mirror" || i?.myth_set == "modern" },
    { icon: 'tuli', name: t('shc:lite.pc_1'), function: (i: any) => i?.category == "pouch_season_1" },
    { icon: 'oniks', name: t('shc:lite.pc_2'), function: (i: any) => i?.category == "pouch_season_2" || i?.category == "pouch_funfinity" },
    { icon: 'tuxflatrob', name: t('shc:lite.flat'), function: (i: any) => i?.bouncer?.type == "flat" },
    { icon: 'morphobutterfly', name: t('shc:lite.temp'), function: (i: any) => i?.bouncer?.type == "temppob" },
    { icon: 'scattered', name: t('shc:lite.scatter'), function: (i: any) => i?.scatter },
  ]
  const category_data = useAPIRequest(user_id?{
    endpoint: 'user/activity',
    data: { day: dateString, user_id },
    cuppazee: true,
    function: (data: any) => {
      if(!data) return data;
      if(!data.captures) return null;
      var destinations = data.captures.filter((z: any) => g(z)?.destination?.type == "bouncer")
      var category_data = {};
      for (let category of categories) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        category_data[category.name] = [];
      }
      for (let x of data.captures) {
        var y = g(x);
        if(!y?.bouncer && !y?.scatter) continue;
        for (let category of categories) {
          if(category.function(y)) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            category_data[category.name].push({
              i: x,
              m: destinations.find((z: any) => z.captured_at == x.captured_at)
            })
            break;
          };
        }
      }
      return category_data;
    }
  }:null)
  if (!category_data) {
    if(category_data===undefined) {
      return <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg}}>
        <ActivityIndicator size="large" color={theme.page_content.fg} />
      </View>
    } else {
      return <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:'#ffaaaa'}}>
        <MaterialCommunityIcons name="alert" size={48} color="#d00" />
      </View>;
    }
  }
  return (
    <View style={{ flex: 1, backgroundColor: theme.page.bg }}>
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 8 }}>
        <DateSwitcher dateString={dateString} />
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          {categories.map(i => <View style={{ padding: 4, width: 400, flexGrow: 1, maxWidth: "100%" }}>
            <Card noPad>
              <View style={{ flexDirection: "row", alignItems: "center", flex: 1 }}>
                <View style={{ padding: 8 }}>
                  <Image source={getIcon(i?.icon,128)} style={{ width: 36, height: 36 }} />
                </View>
                <View style={{ paddingRight: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                  <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{category_data[i.name].length}x {i?.name}</Text>
                  <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                    {category_data[i.name].map((x: any) => <SHCItem i={x.i} m={x.m} />)}
                  </View>
                </View>
                <View style={{ alignSelf: "stretch", borderTopRightRadius: 8, borderBottomRightRadius: 8, borderLeftWidth: dark ? 2 : 0, borderLeftColor: dark ? level_colors[category_data[i.name].length > 0 ? 5 : 0] : undefined, backgroundColor: dark ? undefined : level_colors[category_data[i.name].length > 0 ? 5 : 0], width: 50, alignItems: "center", justifyContent: "center" }}>
                  <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 24, ...font("bold") }}>{category_data[i.name].length > 0 ? '✔' : ''}</Text>
                </View>
              </View>
            </Card>
          </View>)}
        </View>
      </ScrollView>

      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}