import * as React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator, TextInput } from 'react-native';
import { TouchableRipple, Button } from 'react-native-paper';
import Card from 'sections/Shared/Card';
import { useSelector } from 'react-redux';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import useLevelColours from 'utils/hooks/useLevelColours';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';
import { useNavigation } from '@react-navigation/native';
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

function status(i) {
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
  var theme = useSelector(i => i.themes[i.theme]);
  var dark = false;
  var level_colors = useLevelColours();
  if (theme.dark) {
    dark = true;
    level_colors.border = "#fffa"
  }
  var nav = useNavigation();
  var weeks = useAPIRequest({
    endpoint: 'weekly/weeks/v1',
    cuppazee: true
  });
  if (!weeks) return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ width: 400, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        {weeks.map(i => <View style={{ padding: 4 }}>
          <Card noPad>
            <TouchableRipple onPress={(status(i) !== "ongoing" && status(i) !== "finalresults") ? null : () => {
              nav.navigate('WeeklyLeaderboard', { week: i.id })
            }}>
              <View>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ padding: 8 }}>
                    <Image source={getIcon(i.icon || i.id)} style={{ width: 48, height: 48 }} />
                  </View>
                  <View style={{ padding: 8, flex: 1, justifyContent: "center" }}>
                    <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{t('weekly:week',{n:i.week})}</Text>
                    <View style={{flexDirection: "row", alignItems: "center"}}><MaterialCommunityIcons name="information-outline" size={16} /><Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg, opacity: 0.8, textAlignVertical: "center" }}> {i.description}</Text></View>
                    <View style={{flexDirection: "row", alignItems: "center"}}><MaterialCommunityIcons name="calendar" size={16} /><Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8, textAlignVertical: "center" }}> {t(`weekly:${statusKeys[status(i)]}_at`,{time:moment(i[statusTimeKeys[status(i)]]).format('L LT')})}</Text></View>
                  </View>
                  <View style={{ alignSelf: "stretch", borderTopRightRadius: 8, borderBottomRightRadius: status(i)==="finalresults"?8:0, borderLeftWidth: dark ? 2 : 0, borderLeftColor: dark ? level_colors[statusColor[status(i)]]?.bg : undefined, backgroundColor: dark ? undefined : level_colors[statusColor[status(i)]]?.bg, width: 100, alignItems: "center", justifyContent: "center" }}>
                    <Text allowFontScaling={false} numberOfLines={3} style={{ textAlign: "center", color: level_colors[statusColor[status(i)]]?.fg, fontSize: 16, ...font("bold") }}>{t(`weekly:status.${status(i)}`)}</Text>
                  </View>
                </View>
                  {status(i)!=="finalresults"&&<View style={{ flexDirection: "row", alignItems: "center", flexWrap: "wrap" }}>
                    {i.requirements.map(x => <View key={x.id} style={{ padding: 4, width: 60, flexGrow: 1, alignItems: "center" }}>
                      <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={getIcon(x.type)} />
                      <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{t('weekly:points',{count:x.points})}</Text>
                    </View>)}
                  </View>}
              </View>
            </TouchableRipple>
          </Card>
        </View>)}
      </ScrollView>
    </View>
  );
}