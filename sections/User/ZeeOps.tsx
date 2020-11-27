// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { ProgressBar } from 'react-native-paper';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
// @ts-expect-error ts-migrate(6142) FIXME: Module './FAB' was resolved to 'C:/Users/samst/Des... Remove this comment to see the full error message
import UserFAB from './FAB';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useLevelColours' o... Remove this comment to see the full error message
import useLevelColours from 'utils/hooks/useLevelColours';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../Competition/Countdown' was resolved to ... Remove this comment to see the full error message
import Countdown from '../Competition/Countdown';

export default function ZeeOpsScreen({
  route
}: any) {
  var { t } = useTranslation();
  var moment = useMoment();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var username = route.params.username;
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: (i: any) => i?.user_id
  })
  const levelColours = useLevelColours(false);
  var { data, status } = useAPIRequest(user_id ? {
    endpoint: `ops/zeeops/status`,
    data: {
      user_id
    },
    user: user_id
  } : null, true)
  if (status === "loading") {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ActivityIndicator size="large" color={theme.page.fg} />
    </View>
  } else if (status) {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <MaterialCommunityIcons name="alert" color={theme.page.fg} size={48} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{t('error:' + status)}</Text>
    </View>
  } else if (data === null) {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <MaterialCommunityIcons name="alert" color={theme.page.fg} size={48} />
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), textAlign: "center", color: theme.page_content.fg }}>{t('error:missing_data.locked')}</Text>
  </View>
  }
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ScrollView
        contentContainerStyle={{ width: "100%", maxWidth: 800, flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 4, paddingBottom: 92, alignSelf: "center" }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ padding: 4, width: "100%" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Card noPad>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ height: 32, backgroundColor: levelColours[Math.floor((data.missions.filter((i: any) => i.completedDate).length / 7) * 5)].fg === "#ffffff" ? "black" : "white", borderRadius: 8 }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <ProgressBar progress={data.missions.filter((i: any) => i.completedDate).length / 7} style={{ height: 32, borderRadius: 8 }} color={levelColours[Math.floor((data.missions.filter((i: any) => i.completedDate).length / 7) * 5)].bg} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ fontWeight: "bold", fontSize: 16, lineHeight: 0, color: levelColours[Math.floor((data.missions.filter((i: any) => i.completedDate).length / 7) * 5)].fg }}>{data.missions.filter((i: any) => i.completedDate).length} / 7 Days</Text>
              </View>
            </View>
          </Card>
        </View>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {data.missions.map?.((i: any, index: any) => <View style={{ padding: 4, width: 350, flexGrow: 1, maxWidth: "100%" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Card noPad>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {data.currentMission > i.id || (data.currentMission === i.id && moment.tz(data.start_time,'America/Chicago').valueOf() <= Date.now()) ? <View style={{ flex: 1 }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8 }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Image source={getIcon(`https://munzee.global.ssl.fastly.net/images/pins/${i.rewards[0]?.imageUrl}`)} style={{ width: 48, height: 48 }} />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text style={{ color: theme.page_content.fg, position: "absolute", bottom: 0, right: 4, fontSize: 16, fontWeight: "bold" }}>x{i.rewards[0]?.amount}</Text>
                </View>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }}>{i.description}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ fontSize: 16, color: theme.page_content.fg }}>Reward: {i.reward_description.replace(/[\r\n]/g,' ')}</Text>
                  {
                    i.completedDate ? 
                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Text allowFontScaling={false} style={{ fontSize: 12, color: theme.page_content.fg }}>Completed: {moment(i.completedDate).format('L')}</Text> :
                    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
                    <Text allowFontScaling={false} style={{ fontSize: 12, color: theme.page_content.fg }}>Incomplete</Text>
                  }
                </View>
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ flex: 1}} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ height: 24, backgroundColor: levelColours[Math.floor((i.completedDate ? 1 : (i.progress / i.goal)) * 5)].fg === "#ffffff" ? "black" : "white", borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <ProgressBar progress={i.completedDate ? 1 : (i.progress / i.goal)} style={{ height: 24, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} color={levelColours[Math.floor((i.completedDate ? 1 : (i.progress / i.goal)) * 5)].bg} />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text style={{ fontWeight: "bold", fontSize: 16, lineHeight: 0, color: levelColours[Math.floor((i.completedDate ? 1 : (i.progress / i.goal)) * 5)].fg }}>{i.completedDate ? <MaterialCommunityIcons name="check-bold" size={16} color={levelColours[Math.floor((i.completedDate ? 1 : (i.progress / i.goal)) * 5)].fg} /> : `${i.progress} / ${i.goal}`}</Text>
                </View>
              </View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            </View> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 8 }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <MaterialCommunityIcons name="lock-question" size={32} color={theme.page_content.fg} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text style={{ fontWeight: "bold", color: theme.page_content.fg, fontSize: 16 }}>Day {index + 1}</Text>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Countdown days={false} time={moment.tz(data.start_time,'America/Chicago').format()} />
            </View>}
          </Card>
        </View>)}
      </ScrollView>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}