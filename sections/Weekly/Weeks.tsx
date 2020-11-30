
import * as React from 'react';

import { View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Surface, Text, TouchableRipple, useTheme } from 'react-native-paper';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';

import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useLevelColours' o... Remove this comment to see the full error message
import useLevelColours from 'utils/hooks/useLevelColours';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
import { useNavigation } from '@react-navigation/native';
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

export default function ClanScreen() {
  var moment = useMoment();
  var { t } = useTranslation();
  var theme = useTheme();
  var dark = theme.dark;
  var level_colors = useLevelColours();
  var nav = useNavigation();
  var weeks = useAPIRequest({
    endpoint: 'weekly/weeks/v1',
    cuppazee: true
  });
  if (!weeks) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    <ActivityIndicator size="large" color={theme.colors.text} />
  </View>
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ width: 450, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1 }}>
        {weeks.map((i: any) => <View style={{ padding: 4 }}>
          <Surface>
            {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
            <TouchableRipple onPress={(status(i) !== "ongoing" && status(i) !== "resultssoon" && status(i) !== "finalresults") ? null : () => {
              nav.navigate('WeeklyLeaderboard', { week: i.id })
            }}>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ padding: 8 }}>
                    <Image source={getIcon(i.icon || i.id)} style={{ width: 48, height: 48 }} />
                  </View>
                  <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                    <Text allowFontScaling={false} style={{ fontSize: 20, fontWeight: "bold" }} numberOfLines={1} ellipsizeMode={"tail"}>{t('weekly:week',{n:i.week})}</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}><MaterialCommunityIcons name="information-outline" size={16} /><Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", opacity: 0.8, textAlignVertical: "center" }}> {i.description}</Text></View>
                    <View style={{flexDirection: "row", alignItems: "center"}}><MaterialCommunityIcons name="calendar" size={16} /><Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "500", opacity: 0.8, textAlignVertical: "center" }}> {t(`weekly:${statusKeys[status(i)]}_at`,{time:moment(i[statusTimeKeys[status(i)]]).format('L LT')})}</Text></View>
                  </View>
                  <View style={{ alignSelf: "stretch", borderLeftWidth: dark ? 2 : 0, borderLeftColor: dark ? level_colors[statusColor[status(i)]]?.bg : undefined, backgroundColor: dark ? undefined : level_colors[statusColor[status(i)]]?.bg, width: 100, alignItems: "center", justifyContent: "center" }}>
                    <Text allowFontScaling={false} numberOfLines={3} style={{ textAlign: "center", color: level_colors[statusColor[status(i)]]?.fg, fontSize: 16, ...font("bold") }}>{t(`weekly:status.${status(i)}`)}</Text>
                  </View>
                </View>
                {status(i)!=="finalresults"&&<View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                  {i.requirements.map((x: any) => <View key={x.id} style={{ padding: 4, width: 60, flexGrow: 1, alignItems: "center" }}>
                    <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={getIcon(x.type)} />
                    <Text allowFontScaling={false} style={{ fontWeight: "bold", fontSize: 12 }}>{t('weekly:points',{count:x.points})}</Text>
                  </View>)}
                </View>}
              </View>
            </TouchableRipple>
          </Surface>
        </View>)}
      </ScrollView>
    </View>
  );
}