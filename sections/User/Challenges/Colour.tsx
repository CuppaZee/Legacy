// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, Image, ScrollView, TouchableHighlight } from 'react-native';
import { ActivityIndicator, FAB, Menu, TouchableRipple, IconButton } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types' or its corresp... Remove this comment to see the full error message
import getType from 'utils/db/types';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module 'utils/db/types.json'. Consider... Remove this comment to see the full error message
import types from 'utils/db/types.json';
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
// @ts-expect-error ts-migrate(6142) FIXME: Module '../FAB' was resolved to 'C:/Users/samst/De... Remove this comment to see the full error message
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
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <TouchableRipple onPress={() => setOpen(true)}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View key={i.icon} style={{ padding: 2, alignItems: "center", position: "relative" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Image style={{ height: 32, width: 32 }} source={getIcon(i.pin)} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {m && <Image style={{ height: 20, width: 20, position: "absolute", bottom: 0, right: -4 }} source={getIcon(m.pin)} />}
        </View>
      </TouchableRipple>
    }
    style={{ marginTop: 61 }}
  >
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Image style={{ height: 48, width: 48 }} source={getIcon(i.pin)} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Text allowFontScaling={false} style={{ fontSize: 12, ...font("bold") }}>{i.friendly_name}</Text>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ padding: 4, width: 400, maxWidth: "100%", alignSelf: "center" }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Card cardStyle={{ backgroundColor: (theme.clanCardHeader || theme.navigation).bg }} noPad>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Menu
            visible={datePickerOpen}
            onDismiss={() => setDatePickerOpen(false)}
            anchor={
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <IconButton icon="calendar" color={(theme.clanCardHeader || theme.navigation).fg} onPress={() => setDatePickerOpen(true)} />
            }
            contentStyle={{ padding: 0, backgroundColor: theme.page_content.bg, borderWidth: theme.page_content.border ? 1 : 0, borderColor: theme.page_content.border, width: 300 }}
          >
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
  var categories = types.filter((i: any) => i.category==="virtual"&&!i.credit).map((i: any) => ({
    icon: i.icon,
    name: i.name.replace('Virtual ',''),
    function: (c: any) => c.icon === i.icon
  }))
  const category_data = useAPIRequest(user_id?{
    endpoint: 'user/activity',
    data: { day: dateString, user_id },
    cuppazee: true,
    function: (data: any) => {
      if(!data) return data;
      if(!data.captures) return null;
      var category_data = {};
      for (let category of categories) {
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        category_data[category.name] = [];
      }
      for (let x of data.captures) {
        var y = g(x);
        if(y?.category!=="virtual") continue;
        for (let category of categories) {
          if(category.icon===y?.icon) {
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            category_data[category.name].push({
              i: x
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
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg}}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ActivityIndicator size="large" color={theme.page_content.fg} />
      </View>
    } else {
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:'#ffaaaa'}}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <MaterialCommunityIcons name="alert" size={48} color="#d00" />
      </View>;
    }
  }
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1, backgroundColor: theme.page.bg }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 8 }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <DateSwitcher dateString={dateString} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {categories.map((i: any) => <View style={{ padding: 4, width: 100, flexGrow: 1, maxWidth: "100%" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Card noPad>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ alignItems: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ paddingTop: 8 }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Image source={getIcon(i?.icon,128)} style={{ width: 36, height: 36 }} />
                </View>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ fontSize: 12, marginBottom: 4, ...font("bold"), textAlign: "center", color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{i?.name}</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ height: 24, alignSelf: "stretch", borderBottomLeftRadius: 8, borderBottomRightRadius: 8, borderTopWidth: dark ? 2 : 0, borderTopColor: dark ? level_colors[category_data[i.name].length > 0 ? 5 : 0] : undefined, backgroundColor: dark ? undefined : level_colors[category_data[i.name].length > 0 ? 5 : 0], alignItems: "center", justifyContent: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>{category_data[i.name].length||''}</Text>
                </View>
              </View>
            </Card>
          </View>)}
        </View>
      </ScrollView>

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}