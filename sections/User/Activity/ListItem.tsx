
import * as React from 'react';

import { View, Image, StyleSheet } from 'react-native';
import { Paragraph, Text, TouchableRipple, useTheme, Surface } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';

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

var hostIcon = (icon: any) => {
  var host = icon.match(/\/([^\/\.]+?)_?(?:virtual|physical)?_?host\./)?.[1];
  if (!host) return null;
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return getIcon(creatures[host] ?? host);
}
function isRenovation(act: any) {
  return !!(act.pin.includes('/renovation.') && act.captured_at);
}

export default function ActivityListItem({
  act: acti,
  userdata
}: any) {
  var moment = useMoment();
  var { t } = useTranslation();
  var theme = useTheme();
  var navigation = useNavigation();
  const colors = {
    capture: {
      fg: "#004400",
      bg: "#aaffaa"
    },
    deploy: {
      fg: "#00403e",
      bg: "#a5fffc"
    },
    capon: {
      fg: "#401700",
      bg: "#ffbcad"
    }
  }
  return (
    <View style={{ padding: 4 }}>
      <Surface>
        {[acti,...(acti.subCaptures || [])].map((act,index,list)=><TouchableRipple key={act.key} onPress={() => { navigation.navigate('MunzeeDetails', { username: act.creator, code: act.code }) }}>
          <View style={styles.row}>
            {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
            <View style={{ width: 60, paddingVertical: 4, marginRight: 4, backgroundColor: theme.dark ? null : colors[act.type]?.bg, borderRightWidth: theme.dark ? 2 : 0, borderRightColor: colors[act.type]?.bg, justifyContent: "center", alignItems: "center" }}>
              {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
              <Text style={{ textAlign: "center", color: colors[act.type]?.[theme.dark?'bg':'fg'] }}>{(act.points) > 0 && '+'}{(Number(act.points)) || t('activity:none')}</Text>
              <View style={{ position: "relative" }}>
                <Image style={{ height: 32, width: 32 }} source={getIcon(act.pin)} />
                {hostIcon(act.pin) && <Image style={{ height: 24, width: 24, position: "absolute", right: -5, bottom: -4 }} source={hostIcon(act.pin)} />}
              </View>
            </View>
            <View style={{ flex: 1 }}>
              {index===0&&<Text style={{ fontWeight: "100", fontSize: 12 }} numberOfLines={1} ellipsizeMode="middle">
                {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
                {({
                  capon_reno: () => t('activity:user_renovated', { user: act.capper }),
                  capon: () => t('activity:user_captured', { user: act.capper }),
                  capture_reno: () => t('activity:you_renovated'),
                  capture: () => t('activity:you_captured'),
                  deploy: () => t('activity:you_deployed')
                })[act.type + (isRenovation(act) ? "_reno" : "")]?.() || "What"}
              </Text>}
              {!isRenovation(act) && <Text style={{ fontSize: 14 }} numberOfLines={1} ellipsizeMode="middle">{act.name}</Text>}
              {!isRenovation(act) && <Text style={{ fontWeight: "100", fontSize: 12 }} numberOfLines={1} ellipsizeMode="middle">
                {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
                {({
                  capon: () => t('activity:by_you'),
                  capture: () => act.creator === userdata?.username ? t('activity:by_you') : t('activity:by_user', { user: act.creator }),
                  deploy: () => t('activity:by_you')
                })[act.type]?.() || "What"}
              </Text>}
            </View>
            <View style={{ padding: 8 }}>
              <Paragraph allowFontScaling={false}>{moment(act.time).format('LT')}</Paragraph>
            </View>
          </View>
        </TouchableRipple>)}
      </Surface>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center"
  }
})