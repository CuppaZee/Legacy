// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useLevelColours' o... Remove this comment to see the full error message
import useLevelColours from 'utils/hooks/useLevelColours'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
// @ts-expect-error ts-migrate(6142) FIXME: Module './FAB' was resolved to 'C:/Users/samst/Des... Remove this comment to see the full error message
import UserFAB from './FAB';
import { Menu, TouchableRipple, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types' or its corresp... Remove this comment to see the full error message
import getType from 'utils/db/types';

var count = (array: any, t: any) => {
  return Object.entries(array.reduce((a: any, b: any) => {
    if (!a[b[t]]) a[b[t]] = {
      points: 0,
      total: 0
    };
    a[b[t]].points += Number(b.points_for_creator ?? b.points);
    a[b[t]].total++;
    return a;
  }, {}));
}

function OverviewItem({
  i,
  total
}: any) {
  var small = total > 25;
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var [open, setOpen] = React.useState(false);
  var nav = useNavigation();
  var { t } = useTranslation();
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <TouchableRipple onPress={() => setOpen(true)}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View key={i.icon} style={{ padding: 2, alignItems: "center" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Image style={{ height: small ? 24 : 32, width: small ? 24 : 32 }} source={getIcon(i[0])} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 12 }}>{i[1].total}</Text>
        </View>
      </TouchableRipple>
    }
    style={{ marginTop: 61 }}
    contentStyle={{ backgroundColor: theme.page_content.bg, borderWidth: theme.page_content.border ? 1 : 0, borderColor: theme.page_content.border }}
  >
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Image style={{ height: 48, width: 48 }} source={getIcon(i[0])} />
      </View>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>{i[1].total}x {(getType(i[0]) || { name: i[0].slice(49, -4) }).name}</Text>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>{t('activity:point', { count: i[1].points })}</Text>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Button
        mode="contained"
        style={{ backgroundColor: theme.navigation.bg }}
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'push' does not exist on type 'Navigation... Remove this comment to see the full error message
        onPress={() => { setOpen(false); nav.push('DBType', { munzee: i[0].slice(49, -4) }) }}>
        {t('db:type_info')}
      </Button>
    </View>
  </Menu>
}

export default function ClanScreen({
  route
}: any) {
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var dark = false;
  var level_colors = useLevelColours();
  var username = route.params.username;
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: (i: any) => i?.user_id
  })
  var data = useAPIRequest(user_id?{
    endpoint: `user/potm/sept2020/v1`,
    data: {
      user_id
    },
    cuppazee: true
  }:null)
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  if(!data) return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ScrollView
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ padding: 4 }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Card noPad>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ padding: 8, flex: 1, justifyContent: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>POTM Sept 2020 - Scatters</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  {count(data,"pin").map((i,_,array) => <OverviewItem i={i} total={array.length} />)}
                </View>
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{alignSelf:"stretch",borderTopRightRadius:8,borderBottomRightRadius:8,borderLeftWidth:dark?2:0,borderLeftColor:dark?level_colors[Math.min(5,Math.floor(data.length/5))].fg:undefined,backgroundColor:dark?undefined:level_colors[Math.min(5,Math.floor(data.length/5))].bg,width:80,minHeight:80,alignItems:"center",justifyContent:"center"}}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{color:level_colors[Math.min(5,Math.floor(data.length/5))].fg,fontSize:24,...font("bold")}}>{data.length}</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{color:level_colors[Math.min(5,Math.floor(data.length/5))].fg,fontSize:16,...font()}}>/100</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}