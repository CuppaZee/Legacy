// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, Image, ActivityIndicator, FlatList, TextInput, Linking } from 'react-native';
import { TouchableRipple, Portal, Dialog } from 'react-native-paper';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useLevelColours' o... Remove this comment to see the full error message
import useLevelColours from 'utils/hooks/useLevelColours';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
import { useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';

const statusKeys = {
  finalresults: "ended",
  resultssoon: "results",
  ongoing: "ends",
  preparing: "starts",
  comingsoon: "starts",
}

const statusTimeKeys = {
  finalresults: "end",
  resultssoon: "finalend",
  ongoing: "end",
  preparing: "start",
  comingsoon: "start",
}

const statusColor = {
  finalresults: 5,
  resultssoon: 4,
  ongoing: 3,
  preparing: 2,
  comingsoon: 1,
}

function status(i: any) {
  const now = Date.now();
  if(now < new Date(i.prestart).valueOf()) {
    return "comingsoon";
  } else if(now < new Date(i.start).valueOf()) {
    return "preparing"
  } else if(now < new Date(i.end).valueOf()) {
    return "ongoing"
  } else if(now < new Date(i.finalend).valueOf()) {
    return "resultssoon"
  } else {
    return "finalresults"
  }
}

const UserTile = React.memo(function ({
  i,
  index,
  week
}: any) {
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var [open, setOpen] = React.useState(false);
  var dark = false;
  var route = useRoute();
  var level_colors = useLevelColours();
  if (theme.dark) {
    dark = true;
  }
  const types = week?.requirements ?? []
  var user = useAPIRequest(open ? {
    endpoint: `weekly/player/v1`,
    data: {
      user_id: i.i,
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      week_id: route.params.week
    },
    cuppazee: true
  } : null)
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ padding: 4 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Card noPad>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <TouchableRipple onPress={() => {
          setOpen(!open)
        }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Image source={getIcon(`https://munzee.global.ssl.fastly.net/images/avatars/ua${i?.i?.toString?.(36)}.png`)} style={{ width: 36, height: 36, borderRadius: 18 }} />
            </View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ paddingHorizontal: 8, paddingLeft: 0, flex: 1, flexDirection: "row", alignItems: "center" }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>#{index + 1} - {i.n}</Text>
            </View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ alignSelf: "stretch", borderTopRightRadius: 8, borderBottomRightRadius: open ? 0 : 8, borderLeftWidth: dark ? 2 : 0, borderLeftColor: dark ? level_colors[Math.max(0, Math.min(Math.ceil(i.p / 50), 5))].bg : undefined, backgroundColor: dark ? undefined : level_colors[Math.max(0, Math.min(Math.ceil(i.p / 50), 5))].bg, width: 60, flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text allowFontScaling={false} style={{ color: level_colors[Math.max(0, Math.min(Math.ceil(i.p / 50), 5))].fg, fontSize: 16, ...font("bold") }}>{i.p?.toLocaleString?.() || "0"}</Text>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {week && !!i.f && status(week) === "resultssoon" && <MaterialCommunityIcons name="check-bold" color={theme.page_content.fg} style={{ marginLeft: 4 }} size={16} />}
            </View>
          </View>
        </TouchableRipple>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Portal>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Dialog
            visible={open}
            onDismiss={() => { setOpen(false) }}
            style={{ maxWidth: 390, alignSelf: "center", borderRadius: 8, backgroundColor: theme.page_content.bg }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ paddingHorizontal: 8, paddingVertical: 4 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Image source={getIcon(`https://munzee.global.ssl.fastly.net/images/avatars/ua${i?.i?.toString?.(36)}.png`)} style={{ width: 36, height: 36, borderRadius: 18 }} />
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ paddingHorizontal: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>#{index + 1} - {i.n}</Text>
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ alignSelf: "stretch", borderTopRightRadius: 8, borderBottomRightRadius: open ? 0 : 8, borderLeftWidth: dark ? 2 : 0, borderLeftColor: dark ? level_colors[Math.max(0, Math.min(Math.ceil(i.p / 50), 5))].bg : undefined, backgroundColor: dark ? undefined : level_colors[Math.max(0, Math.min(Math.ceil(i.p / 50), 5))].bg, width: 60, alignItems: "center", justifyContent: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ color: level_colors[Math.max(0, Math.min(Math.ceil(i.p / 50), 5))].fg, fontSize: 16, ...font("bold") }}>{i.p?.toLocaleString?.() || "0"}</Text>
              </View>
            </View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {types.map((x: any, xi: any) => <View key={x.id} style={{ padding: 4, width: 80, flexGrow: 1, alignItems: "center", opacity: ((user?.d || [])[xi] ?? 0) > 0 ? 1 : 0.4 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={getIcon(x.type)} />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{(user?.d || [])[xi] ?? '?'}</Text>
              </View>)}
            </View>
          </Dialog>
        </Portal>
      </Card>
    </View>
  );
})

export default function TeamLeaderboardScreen({
  route
}: any) {
  var moment = useMoment();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  const { t } = useTranslation();
  const level_colors = useLevelColours();
  var week = useAPIRequest({
    endpoint: `weekly/weeks/v1`,
    cuppazee: true
  })?.find((i: any) => i.id == route.params.week);
  const types = week?.requirements ?? []
  var data = useAPIRequest({
    endpoint: `weekly/leaderboard/v2`,
    data: {
      week_id: route.params.week
    },
    cuppazee: true
  })
  var users = data || [];
  var [value, setValue] = React.useState('');
  var [search, setSearch] = React.useState('');
  var [timeoutC, setTimeoutC] = React.useState(null);
  function onValue(val: any) {
    if (timeoutC) clearTimeout(timeoutC)
    setValue(val);
    setTimeoutC(setTimeout(() => {
      return setSearch(val);
    }, 500))
  }
  users.sort((a: any, b: any) => b.p - a.p);
  if(!week) return null;
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  if (!data) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <FlatList
      getItemLayout={(data: any, index: any) => (
        { length: 52, offset: 52 * index, index }
      )}
      contentContainerStyle={{ width: 400, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}
      data={users.filter((i: any) => (i.n || "").toString().toLowerCase().includes(search.toLowerCase()))}
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      ListHeaderComponent={<View>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ padding: 4, width: "100%" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Card noPad>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ padding: 8 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Image source={getIcon(week.icon || week.id)} style={{ width: 48, height: 48 }} />
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{t('weekly:week', { n: week.week })}</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ flexDirection: "row", alignItems: "center" }}><MaterialCommunityIcons name="information-outline" size={16} /><Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg, opacity: 0.8, textAlignVertical: "center" }}> {week.description}</Text></View>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ flexDirection: "row", alignItems: "center" }}><MaterialCommunityIcons name="calendar" size={16} /><Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8, textAlignVertical: "center" }}> {t(`weekly:${statusKeys[status(week)]}_at`, { time: moment(week[statusTimeKeys[status(week)]]).format('L LT') })}</Text></View>
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ alignSelf: "stretch", borderTopRightRadius: 8, borderBottomRightRadius: status(week) === "finalresults" ? 8 : 0, borderLeftWidth: theme.dark ? 2 : 0, borderLeftColor: theme.dark ? level_colors[statusColor[status(week)]]?.bg : undefined, backgroundColor: theme.dark ? undefined : level_colors[statusColor[status(week)]]?.bg, width: 100, alignItems: "center", justifyContent: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} numberOfLines={3} style={{ textAlign: "center", color: level_colors[statusColor[status(week)]]?.fg, fontSize: 16, ...font("bold") }}>{t(`weekly:status.${status(week)}`)}</Text>
              </View>
            </View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {types.map((x: any, xi: any) => <View key={x.id} style={{ padding: 4, width: 60, flexGrow: 1, alignItems: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={getIcon(x.type)} />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{t('weekly:points', { count: x.points })}</Text>
              </View>)}
            </View>
          </Card>
        </View>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {week.messages?.map((message: any) => <TouchableRipple onPress={message.link?()=>Linking.openURL(message.link):undefined}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ padding: 4, width: "100%" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Card noPad>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8 }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Image source={getIcon(message.icon)} style={{ width: 48, height: 48 }} />
                </View>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{message.title}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg, opacity: 0.8, textAlignVertical: "center" }}>{message.description}</Text>
                </View>
              </View>
            </Card>
          </View>
        </TouchableRipple>)}
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ padding: 4, width: "100%" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Card noPad cardStyle={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "stretch" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <TextInput
              onSubmitEditing={() => setSearch(value)}
              style={{ paddingHorizontal: 8, flex: 1, borderRadius: 8, borderBottomLeftRadius: 8, height: 40 }}
              onChangeText={onValue}
              value={value}
              returnKeyType="search"
              placeholder={t('common:search')}
            />
          </Card>
        </View>
      </View>}
      renderItem={({
        item
      }: any) => (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <UserTile i={item} week={week} index={users.findIndex((x: any) => x.p === item.p)} />
      )}
      keyExtractor={(item: any) => item.i}
      windowSize={5}
    />
  );
}