import * as React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import Card from 'sections/Shared/Card';
import { useSelector } from 'react-redux';
import useAPIRequest from 'utils/hooks/useAPIRequest'
import useLevelColours from 'utils/hooks/useLevelColours'
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';
import UserFAB from './FAB';
import { Menu, TouchableRipple, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import getType from 'utils/db/types';

var count = (array, t) => {
  return Object.entries(array.reduce((a, b) => {
    if (!a[b[t]]) a[b[t]] = {
      points: 0,
      total: 0
    };
    a[b[t]].points += Number(b.points_for_creator ?? b.points);
    a[b[t]].total++;
    return a;
  }, {}))
}

function OverviewItem({ i, total }) {
  var small = total > 25;
  var theme = useSelector(i => i.themes[i.theme]);
  var [open, setOpen] = React.useState(false);
  var nav = useNavigation();
  var { t } = useTranslation();
  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={
      <TouchableRipple onPress={() => setOpen(true)}>
        <View key={i.icon} style={{ padding: 2, alignItems: "center" }}>
          <Image style={{ height: small ? 24 : 32, width: small ? 24 : 32 }} source={getIcon(i[0])} />
          <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 12 }}>{i[1].total}</Text>
        </View>
      </TouchableRipple>
    }
    style={{ marginTop: 61 }}
    contentStyle={{ backgroundColor: theme.page_content.bg, borderWidth: theme.page_content.border ? 1 : 0, borderColor: theme.page_content.border }}
  >
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      <View>
        <Image style={{ height: 48, width: 48 }} source={getIcon(i[0])} />
      </View>
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>{i[1].total}x {(getType(i[0]) || { name: i[0].slice(49, -4) }).name}</Text>
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>{t('activity:point', { count: i[1].points })}</Text>
      <Button
        mode="contained"
        style={{ backgroundColor: theme.navigation.bg }}
        onPress={() => { setOpen(false); nav.push('DBType', { munzee: i[0].slice(49, -4) }) }}>
        {t('db:type_info')}
      </Button>
    </View>
  </Menu>
}

export default function ClanScreen({ route }) {
  var theme = useSelector(i => i.themes[i.theme]);
  var dark = false;
  var level_colors = useLevelColours();
  var username = route.params.username;
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: i=>i?.user_id
  })
  var data = useAPIRequest(user_id?{
    endpoint: `user/potm/sept2020/v1`,
    data: {
      user_id
    },
    cuppazee: true
  }:null)
  if(!data) return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        <View style={{ padding: 4 }}>
          <Card noPad>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ padding: 8, flex: 1, justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>POTM Sept 2020 - Scatters</Text>
                <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                  {count(data,"pin").map((i,_,array) => <OverviewItem i={i} total={array.length} />)}
                </View>
              </View>
              <View style={{alignSelf:"stretch",borderTopRightRadius:8,borderBottomRightRadius:8,borderLeftWidth:dark?2:0,borderLeftColor:dark?level_colors[Math.min(5,Math.floor(data.length/5))].fg:undefined,backgroundColor:dark?undefined:level_colors[Math.min(5,Math.floor(data.length/5))].bg,width:80,minHeight:80,alignItems:"center",justifyContent:"center"}}>
                <Text allowFontScaling={false} style={{color:level_colors[Math.min(5,Math.floor(data.length/5))].fg,fontSize:24,...font("bold")}}>{data.length}</Text>
                <Text allowFontScaling={false} style={{color:level_colors[Math.min(5,Math.floor(data.length/5))].fg,fontSize:16,...font()}}>/100</Text>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}