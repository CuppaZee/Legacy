import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { Menu, TouchableRipple, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import getType from 'utils/db/types';
import font from 'sections/Shared/font';
import useMoment from 'utils/hooks/useMoment';
import getIcon from 'utils/db/icon';

var count = (array, t) => {
  return Object.entries(array.reduce((a, b) => {
    if(!a[b[t]]) a[b[t]] = {
      points: 0,
      total: 0
    };
    a[b[t]].points+=Number(b.points_for_creator??b.points);
    a[b[t]].total++;
    return a;
  }, {}))//.sort((a, b) => b[1].total - a[1].total)
}

var creatures = {
  'firepouchcreature': 'tuli',
  'waterpouchcreature': 'vesi',
  'earthpouchcreature': 'muru',
  'airpouchcreature': 'puffle',
  'mitmegupouchcreature': 'mitmegu',
  'unicorn': 'theunicorn',
  'fancyflatrob': 'coldflatrob',
  'fancy_flat_rob': 'coldflatrob',
  'fancyflatmatt': 'footyflatmatt',
  'fancy_flat_matt': 'footyflatmatt',
  'tempbouncer': 'expiring_specials_filter',
  'temp_bouncer': 'expiring_specials_filter',
  'funfinity': 'oniks'
}

var hostIcon = (icon) => {
  var host = icon.match(/\/([^\/\.]+?)_?(?:virtual|physical)?_?host\./)?.[1];
  if (!host) return null;
  return getIcon(creatures[host] ?? host);
}

function OverviewItem({i,total}) {
  var small = total>25;
  var theme = useSelector(i=>i.themes[i.theme]);
  var [open,setOpen] = React.useState(false);
  var nav = useNavigation();
  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={
      <TouchableRipple onPress={() => setOpen(true)}>
        <View key={i.icon} style={{ padding: 2, alignItems: "center" }}>
          <Image style={{ height: small?24:32, width: small?24:32 }} source={getIcon(i[0])} />
          <Text allowFontScaling={false} style={{ color: theme.page_content.fg,...font(), fontSize: 12 }}>{i[1].total}</Text>
          {hostIcon(i[0])&&<Image style={{ height: small?16:24, width: small?16:24, position: "absolute", right: small?-3:-5, bottom: small?18:15 }} source={hostIcon(i[0])} />}
        </View>
      </TouchableRipple>
    }
    style={{ marginTop: 61 }}
    contentStyle={{ backgroundColor: theme.page_content.bg, borderWidth: theme.page_content.border?1:0, borderColor: theme.page_content.border }}
  >
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      <View>
        <Image style={{ height: 48, width: 48 }} source={getIcon(i[0])} />
        {hostIcon(i[0])&&<Image style={{ height: 36, width: 36, position: "absolute", right: -7.5, bottom: -7.5 }} source={hostIcon(i[0])} />}
      </View>
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>{i[1].total}x {(getType(i[0])||{name:i[0].slice(49,-4)}).name}</Text>
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>{i[1].points} Points</Text>
      <Button
        mode="contained"
        style={{backgroundColor: theme.navigation.bg}}
        onPress={()=>{setOpen(false);nav.push('DBType',{munzee:i[0].slice(49,-4)})}}>
        Type Info
      </Button>
    </View>
  </Menu>
}

export default function ({user_id,date:dateInput}) {
  var {t} = useTranslation();
  var theme = useSelector(i=>i.themes[i.theme]);
  var moment = useMoment();
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
  const data = useAPIRequest({
    endpoint: 'user/activity',
    data: {day:dateInput||dateString,user_id},
    cuppazee: true
  })
  function isRenovation(act) {
    return !!(act.pin.includes('/renovation.') && act.captured_at);
  }
  if(!data||!data.captures) return null;
  return <View>
    <View key="total" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
      <View style={{alignSelf:"stretch"}}><Text allowFontScaling={false} style={{ textAlign: "center", fontSize: 24, ...font("bold"), color: theme.page_content.fg }}>
        {t('activity:point', { count: [...data.captures, ...data.deploys, ...data.captures_on].reduce((a, b) => a + Number(b.points_for_creator ?? b.points), 0) })}
      </Text></View>
    </View>
    <View key="captures" style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
      <View style={{alignSelf:"stretch"}}><Text allowFontScaling={false} style={{ textAlign: "center", color: theme.page_content.fg, fontSize: 20, ...font("bold") }}>
        {t('activity:capture', { count: data.captures.filter(i => !isRenovation(i)).length })} - {t('activity:point', { count: data.captures.filter(i => !isRenovation(i)).reduce((a, b) => a + Number(b.points), 0) })}
      </Text></View>
      <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
        {count(data.captures.filter(i => !isRenovation(i)), "pin").map(i=><OverviewItem total={count(data.captures.filter(i => !isRenovation(i)), "pin").length} i={i}/>)}
      </View>
    </View>
    <View key="deploys" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
      <View style={{alignSelf:"stretch", paddingLeft: 8, paddingRight: 8, backgroundColor: 'transparent' ?? '#a5fffc', borderRadius: 0 }}><Text allowFontScaling={false} style={{ textAlign: "center", color: theme.page_content.fg, fontSize: 20, ...font("bold") }}>
        {t('activity:deploy', { count: data.deploys.length })} - {t('activity:point', { count: data.deploys.reduce((a, b) => a + Number(b.points), 0) })}
      </Text></View>
      <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
        {count(data.deploys, "pin").map(i=><OverviewItem total={count(data.deploys, "pin").length} i={i}/>)}
      </View>
    </View>
    <View key="capons" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
      <View style={{alignSelf:"stretch", paddingLeft: 8, paddingRight: 8, borderRadius: 8 }}><Text allowFontScaling={false} style={{ textAlign: "center", color: theme.page_content.fg, fontSize: 20, ...font("bold") }}>
        {t('activity:capon', { count: data.captures_on.filter(i => !isRenovation(i)).length })} - {t('activity:point', { count: data.captures_on.filter(i => !isRenovation(i)).reduce((a, b) => a + Number(b.points_for_creator), 0) })}
      </Text></View>
      <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
        {count(data.captures_on.filter(i => !isRenovation(i)), "pin").map(i=><OverviewItem total={count(data.captures_on.filter(i => !isRenovation(i)), "pin").length} i={i}/>)}
      </View>
    </View>
    {data.captures.filter(i=>isRenovation(i)).length>0&&<View key="renovations" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
      <View style={{alignSelf:"stretch", paddingLeft: 8, paddingRight: 8, backgroundColor: 'transparent' ?? '#ffbcad', borderRadius: 8 }}>
        <Text allowFontScaling={false} style={{ textAlign: "center", color: 'black' ?? `#401700`, fontSize: 20, ...font("bold") }}>
          {t('activity:renovation', { count: data.captures.filter(i=>isRenovation(i)).length})} - {t('activity:point', { count: data.captures.filter(i=>isRenovation(i)).reduce((a, b) => a + Number(b.points), 0)})}
        </Text>
      </View>
    </View>}
    {data.captures_on.filter(i=>isRenovation(i)).length>0&&<View key="renons" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
      <View style={{alignSelf:"stretch", paddingLeft: 8, paddingRight: 8, backgroundColor: 'transparent' ?? '#ffbcad', borderRadius: 8 }}>
        <Text allowFontScaling={false} style={{ textAlign: "center", color: 'black' ?? `#401700`, fontSize: 20, ...font("bold") }}>
        {t('activity:renovon', { count: data.captures_on.filter(i=>isRenovation(i)).length})} - {t('activity:point', { count: data.captures_on.filter(i=>isRenovation(i)).reduce((a, b) => a + Number(b.points_for_creator), 0)})}
        </Text>
      </View>
    </View>}
  </View>
}