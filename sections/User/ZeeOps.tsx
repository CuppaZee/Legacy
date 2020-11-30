
import * as React from 'react';

import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { ProgressBar } from 'react-native-paper';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';

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



import UserFAB from './FAB';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useLevelColours' o... Remove this comment to see the full error message
import useLevelColours from 'utils/hooks/useLevelColours';
import { MaterialCommunityIcons } from '@expo/vector-icons';



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



    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>



      <ActivityIndicator size="large" color={theme.page.fg} />
    </View>
  } else if (status) {



    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>



      <MaterialCommunityIcons name="alert" color={theme.page.fg} size={48} />



      <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{t('error:' + status)}</Text>
    </View>
  } else if (data === null) {



    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>



    <MaterialCommunityIcons name="alert" color={theme.page.fg} size={48} />



    <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), textAlign: "center", color: theme.page_content.fg }}>{t('error:missing_data.locked')}</Text>
  </View>
  }
  return (



    <View style={{ flex: 1 }}>



      <ScrollView
        contentContainerStyle={{ width: "100%", maxWidth: 800, flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 4, paddingBottom: 92, alignSelf: "center" }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>



        <View style={{ padding: 4, width: "100%" }}>



          <Card noPad>



            <View style={{ height: 32, backgroundColor: levelColours[Math.floor((data.missions.filter((i: any) => i.completedDate).length / 7) * 5)].fg === "#ffffff" ? "black" : "white", borderRadius: 8 }}>



              <ProgressBar progress={data.missions.filter((i: any) => i.completedDate).length / 7} style={{ height: 32, borderRadius: 8 }} color={levelColours[Math.floor((data.missions.filter((i: any) => i.completedDate).length / 7) * 5)].bg} />



              <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}>



                <Text style={{ fontWeight: "bold", fontSize: 16, lineHeight: 0, color: levelColours[Math.floor((data.missions.filter((i: any) => i.completedDate).length / 7) * 5)].fg }}>{data.missions.filter((i: any) => i.completedDate).length} / 7 Days</Text>
              </View>
            </View>
          </Card>
        </View>



        {data.missions.map?.((i: any, index: any) => <View style={{ padding: 4, width: 350, flexGrow: 1, maxWidth: "100%" }}>



          <Card noPad>



            {data.currentMission > i.id || (data.currentMission === i.id && moment.tz(data.start_time,'America/Chicago').valueOf() <= Date.now()) ? <View style={{ flex: 1 }}>



              <View style={{ flexDirection: "row", alignItems: "center" }}>



                <View style={{ padding: 8 }}>



                  <Image source={getIcon(`https://munzee.global.ssl.fastly.net/images/pins/${i.rewards[0]?.imageUrl}`)} style={{ width: 48, height: 48 }} />



                  <Text style={{ color: theme.page_content.fg, position: "absolute", bottom: 0, right: 4, fontSize: 16, fontWeight: "bold" }}>x{i.rewards[0]?.amount}</Text>
                </View>



                <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>



                  <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }}>{i.description}</Text>



                  <Text allowFontScaling={false} style={{ fontSize: 16, color: theme.page_content.fg }}>Reward: {i.reward_description.replace(/[\r\n]/g,' ')}</Text>
                  {
                    i.completedDate ? 



                    <Text allowFontScaling={false} style={{ fontSize: 12, color: theme.page_content.fg }}>Completed: {moment(i.completedDate).format('L')}</Text> :



                    <Text allowFontScaling={false} style={{ fontSize: 12, color: theme.page_content.fg }}>Incomplete</Text>
                  }
                </View>
              </View>



              <View style={{ flex: 1}} />



              <View style={{ height: 24, backgroundColor: levelColours[Math.floor((i.completedDate ? 1 : (i.progress / i.goal)) * 5)].fg === "#ffffff" ? "black" : "white", borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }}>



                <ProgressBar progress={i.completedDate ? 1 : (i.progress / i.goal)} style={{ height: 24, borderBottomLeftRadius: 8, borderBottomRightRadius: 8 }} color={levelColours[Math.floor((i.completedDate ? 1 : (i.progress / i.goal)) * 5)].bg} />



                <View style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, justifyContent: "center", alignItems: "center" }}>



                  <Text style={{ fontWeight: "bold", fontSize: 16, lineHeight: 0, color: levelColours[Math.floor((i.completedDate ? 1 : (i.progress / i.goal)) * 5)].fg }}>{i.completedDate ? <MaterialCommunityIcons name="check-bold" size={16} color={levelColours[Math.floor((i.completedDate ? 1 : (i.progress / i.goal)) * 5)].fg} /> : `${i.progress} / ${i.goal}`}</Text>
                </View>
              </View>



            </View> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 8 }}>



              <MaterialCommunityIcons name="lock-question" size={32} color={theme.page_content.fg} />



              <Text style={{ fontWeight: "bold", color: theme.page_content.fg, fontSize: 16 }}>Day {index + 1}</Text>



              <Countdown days={false} time={moment.tz(data.start_time,'America/Chicago').format()} />
            </View>}
          </Card>
        </View>)}
      </ScrollView>



      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}