// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { View, ActivityIndicator, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableRipple, Surface, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';

// @ts-expect-error ts-migrate(6142) FIXME: Module './Overview' was resolved to 'C:/Users/sams... Remove this comment to see the full error message
import ActivityOverview from './Overview';

export default function UserActivityDash({
  user_id,
  username,
  displayUsername
}: any) {
  var { t } = useTranslation();
  var theme = useSelector((i: any) => i.themes[i.theme])
  var nav = useNavigation();
  var moment = useMoment();
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
  const { data, status } = useAPIRequest({
    endpoint: 'user/activity',
    data: { day: dateString, user_id },
    cuppazee: true
  }, true)
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Surface>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <TouchableRipple onPress={displayUsername ? () => nav.navigate('UserDetails', { username: username }) : () => nav.navigate('UserActivity', { username: username })}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ ...(theme.page_content.border ? { borderBottomWidth: 1, borderBottomColor: theme.page_content.border } : {}), backgroundColor: (theme.clanCardHeader || theme.navigation).bg, padding: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, flexDirection: "row", alignItems: "center" }}>
          {displayUsername ?
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <Image style={{ height: 32, width: 32, borderRadius: 16 }} source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(user_id).toString(36)}.png` }} /> :
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="format-list-bulleted" size={24} color={(theme.clanCardHeader || theme.navigation).fg} />}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: (theme.clanCardHeader || theme.navigation).fg }}>{displayUsername ? username : t('user:activity')}</Text>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <MaterialCommunityIcons name="chevron-right" size={24} color={(theme.clanCardHeader || theme.navigation).fg} />
        </View>
      </TouchableRipple>
      {!status ?
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <View style={{ paddingBottom: 4 }}><ActivityOverview username={username} user_id={user_id} /></View> :
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        (status === "loading" ? <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 8 }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <ActivityIndicator size="large" color={theme.page_content.fg} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        </View> : <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <MaterialCommunityIcons name="alert" color={theme.page.fg} size={48} />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), textAlign: "center", color: theme.page_content.fg }}>{t('error:' + status)}</Text>
          </View>)}
    </Surface>
  );
}