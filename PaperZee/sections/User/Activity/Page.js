import * as React from 'react';
import { Text, View, Image, FlatList, TouchableHighlight } from 'react-native';
import { ActivityIndicator, FAB, IconButton, Menu } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ActivityOverview from './Overview'
import useAPIRequest from '~hooks/useAPIRequest';
import font from '~sections/Shared/font';
import Card from '~sections/Shared/Card';
import DatePicker from '~sections/Shared/DatePicker';
import useMoment from '~hooks/useMoment';

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
  return `https://munzee.global.ssl.fastly.net/images/pins/${creatures[host] ?? host}.png`;
}
function isRenovation(act) {
  return !!(act.pin.includes('/renovation.') && act.captured_at);
}

function ActivityListItem({ act, userdata }) {
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var navigation = useNavigation();
  return <View style={{ flexDirection: "row", paddingTop: 8, alignItems: "center" }}>
    <View style={{ padding: 4, paddingLeft: 8, position: "relative", alignContent: 'center', alignItems: "center", flexGrow: 0 }}>
      <View style={{ width: 60, justifyContent: 'center', flexDirection: "row", flexWrap: "wrap", flexGrow: 0 }}>
        <View style={{ paddingLeft: 8, paddingRight: 8, backgroundColor: act.points_for_creator ? theme.activity.capon.bg : (act.captured_at ? theme.activity.capture.bg : theme.activity.deploy.bg), borderRadius: 9.5 }}>
          <Text allowFontScaling={false} style={{ alignSelf: "stretch", textAlign: "center", color: act.points_for_creator ? theme.activity.capon.fg : (act.captured_at ? theme.activity.capture.fg : theme.activity.deploy.fg), ...font("bold") }}>{(act.points_for_creator ?? act.points) > 0 && '+'}{(Number(act.points_for_creator ?? act.points)) || t('activity:none')}</Text>
        </View>
      </View>
      <View style={{ position: 'relative' }}>
        <Image style={{ height: 32, width: 32 }} source={{ uri: act.pin }} />
        {hostIcon(act.pin) && <Image style={{ height: 24, width: 24, position: "absolute", right: -5, bottom: -8 }} source={{ uri: hostIcon(act.pin) }} />}
      </View>
    </View>
    <TouchableHighlight style={{ paddingLeft: 8, paddingRight: 8, flexGrow: 1, flexShrink: 1 }} onPress={() => { navigation.navigate('MunzeeDetails', { username: (!act.points_for_creator && act.captured_at) ? act.username : userdata?.username, code: act.code }) }} underlayColor="white">
      <View>
        <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font() }}>{act.points_for_creator ? (isRenovation(act) ? t('activity:user_renovated',{user:act.username}) : t('activity:user_captured', { user: act.username })) : (act.captured_at ? (isRenovation(act) ? t('activity:you_renovated') : t('activity:you_captured')) : t('activity:you_deployed'))}</Text>
        {!isRenovation(act) && <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font("bold") }}>{act.friendly_name}</Text>}
        {!isRenovation(act) && <Text allowFontScaling={false} style={{ color: theme.page_content.fg, opacity: 0.8, ...font() }}>{act.points_for_creator ? t('activity:by_you') : (act.captured_at ? t('activity:by_user', { user: act.username }) : t('activity:by_you'))}</Text>}
      </View>
    </TouchableHighlight>
    <View style={{ padding: 8, flexGrow: 0, paddingLeft: 16, alignContent: 'center', position: "relative", alignItems: "flex-end" }}>
      <Text allowFontScaling={false} style={{ alignSelf: "stretch", textAlign: "right", color: theme.page_content.fg, ...font("bold") }}>{new Date(act.captured_at ?? act.deployed_at).getHours().toString().padStart(2, "0")}:{new Date(act.captured_at ?? act.deployed_at).getMinutes().toString().padStart(2, "0")}</Text>
      {/* <Image style={{ height: 32, width: 32 }} source={{ uri: act.pin }}/>
            {hostIcon(act.pin)&&<Image style={{ height: 24, width: 24, position: "absolute", right: 5, bottom: 5 }} source={{ uri: hostIcon(act.pin) }}/>} */}
    </View>
  </View>
}

function DateSwitcher({ dateString }) {
  var moment = useMoment();
  const nav = useNavigation();
  const theme = useSelector(i => i.themes[i.theme]);
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  return <View style={{ padding: 4 }}>
    <Card cardStyle={{ backgroundColor: (theme.clanCardHeader || theme.navigation).bg }} noPad>
      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <Menu
          visible={datePickerOpen}
          onDismiss={() => setDatePickerOpen(false)}
          anchor={
            <IconButton icon="calendar" color={(theme.clanCardHeader || theme.navigation).fg} onPress={() => setDatePickerOpen(true)} />
          }
          contentStyle={{ padding: 0, backgroundColor: theme.page_content.bg, borderWidth: theme.page_content.border ? 1 : 0, borderColor: theme.page_content.border }}
        >
          <DatePicker noWrap value={moment({
            year: Number(dateString.split('-')[0]),
            month: Number(dateString.split('-')[1]) - 1,
            date: Number(dateString.split('-')[2]),
          })} onChange={(date) => {
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
}

function UserIcon({ user_id, size }) {
  return <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ marginLeft: -(size - 24) / 2, marginTop: -(size - 24) / 2, height: size, width: size }} />
}

export default function UserActivityScreen() {
  var moment = useMoment();
  var [FABOpen, setFABOpen] = React.useState(false);
  var logins = useSelector(i => i.logins)
  var nav = useNavigation();
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
  // `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${(date.getUTCDate()).toString().padStart(2, '0')}`
  var navigation = useNavigation();
  var route = useRoute();
  if (route.params.date) {
    dateString = route.params.date;
  }
  var user_id = Number(route.params.userid);
  const [data, userdata] = useAPIRequest([
    {
      endpoint: 'user/activity',
      data: { day: dateString, user_id },
      cuppazee: true
    },
    {
      endpoint: 'user',
      data: { user_id }
    }
  ])
  if (!data || !data.captures) return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page_content.bg }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  )
  return <View style={{ flex: 1 }}>
    <FlatList
      contentContainerStyle={{ width: 500, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", paddingBottom: 88 }}
      style={{ flex: 1, backgroundColor: theme.page_content.bg }}
      extraData={[userdata?.username]}
      data={[
        <DateSwitcher dateString={dateString} />,
        <ActivityOverview date={dateString} user_id={user_id} />,
        ...data.captures,
        ...data.deploys,
        ...data.captures_on
      ].filter(i => i !== 1234).sort((a, b) => new Date(b.captured_at ?? b.deployed_at) - new Date(a.captured_at ?? a.deployed_at))}
      renderItem={({ item: act }) => !act.pin ? act : <ActivityListItem act={act} userdata={userdata} />}
      keyExtractor={(item, index) => index.toString() ?? item.id ?? item.capture_id ?? item.captured_at ?? item.deployed_at}
    />
    <FAB.Group
      open={FABOpen}
      icon={() => <UserIcon size={56} user_id={user_id} />}
      actions={Object.entries(logins).filter(i => i[0] != user_id).slice(0, 5).map(i => ({ icon: () => <UserIcon size={40} user_id={Number(i[0])} />, label: i[1].username, onPress: () => { nav.popToTop(); nav.replace('UserDetails', { userid: Number(i[0]) }) } }))}
      onStateChange={({ open }) => setFABOpen(open)}
    />
  </View>
}