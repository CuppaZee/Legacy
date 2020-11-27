// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, Image, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Activity/Card' was resolved to 'C:/Users... Remove this comment to see the full error message
import ActivityCard from './Activity/Card';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module 'utils/db/categories.json'. Con... Remove this comment to see the full error message
import categories from 'utils/db/categories.json';
import { useTranslation } from 'react-i18next'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
// @ts-expect-error ts-migrate(6142) FIXME: Module './FAB' was resolved to 'C:/Users/samst/Des... Remove this comment to see the full error message
import UserFAB from './FAB';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Competition/useZeecre... Remove this comment to see the full error message
import useZeecretTeam from 'sections/Competition/useZeecretTeam';

const useComponentSize = () => {
  const [size, setSize] = React.useState(null);

  const onLayout = React.useCallback((event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};

export default function DetailsScreen({
  route
}: any) {
  var moment = useMoment();
  var nav = useNavigation();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var logins = useSelector((i: any) => i.logins);
  var username = route.params.username
  var { t } = useTranslation();
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
  var [size, onLayout] = useComponentSize();
  var maxWidth = size?.width > 750 ? "50%" : "100%"
  const {data,status} = useAPIRequest({
    endpoint: 'user',
    data: { username }
  }, true);
  const {data:zeecretTeam} = useZeecretTeam(data?.username);
  let user_id = data?.user_id
  useAPIRequest(user_id ? {
    endpoint: 'user/activity',
    data: { day: dateString, user_id },
    cuppazee: true
  } : [null])
  const [menu, setMenu] = React.useState(null);
  if (status || !size?.width) {
    if(status === "loading" || !size?.width) {
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return <View onLayout={onLayout} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ActivityIndicator size="large" color={theme.page.fg} />
      </View>
    } else {
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return <View onLayout={onLayout} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <MaterialCommunityIcons name="alert" color={theme.page.fg} size={48} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), textAlign: "center", color: theme.page_content.fg }}>{t('error:' + status)}</Text>
    </View>
    }
  } else if (data === null) {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <View onLayout={onLayout} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <MaterialCommunityIcons name="alert" color={theme.page.fg} size={48} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), textAlign: "center", color: theme.page_content.fg }}>{t('error:missing_data.user')}</Text>
    </View>
  }
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1 }} onLayout={onLayout}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ScrollView
        contentContainerStyle={{ padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ alignItems: "stretch", alignSelf: "center", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: 1200 }}>
          {/* {zeecretTeam && zeecretTeam.endsWith('_false') && <View style={{ padding: 4, width: size?.width > 750 ? 1000 : 500, maxWidth: "100%" }}>
            <Card noPad>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons name="alert" color={theme.page_content.fg} size={24} style={{ margin: 4 }} />
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8, flex: 1, margin: 4 }}>Sorry! A small bug in the Zeecret Agents Competition opt-in system caused some people's API Tokens to be invalidated.</Text>
              </View>
              <TouchableRipple onPress={() => nav.navigate('CompetitionAuth', { username: username })}>
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="check-bold" size={24} color={theme.page_content.fg} />
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>Log In Again</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple>
            </Card>
          </View>} */}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ padding: 4, width: size?.width > 750 ? 1000 : 500, maxWidth: "100%" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ActivityCard username={username} user_id={user_id} />
          </View>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ padding: 4, width: 500, maxWidth }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Card noPad>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8 }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ width: 72, height: 72, borderRadius: 36 }} />
                </View>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{data?.username}</Text>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    {!!data?.premium && <MaterialCommunityIcons color={theme.page_content.fg} name="star" size={20} />}
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    {data?.titles.includes('QRew') && <MaterialCommunityIcons color={theme.page_content.fg} name="hammer" size={20} />}
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    {data?.titles.includes('ZeeQRew') && <MaterialCommunityIcons color={theme.page_content.fg} name="wrench" size={20} />}
                  </View>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons color={theme.page_content.fg} name="arrow-up-bold-hexagon-outline" size={16} style={{marginRight: 4}} />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}>{t('user:level_n', { level: data?.level })} - {t('user:points',{count:data?.points,n:data?.points.toLocaleString()})}</Text>
                  </View>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons color={theme.page_content.fg} name="trophy-outline" size={16} style={{marginRight: 4}} />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}>{t('user:rank_n', { rank: data?.rank })}</Text>
                  </View>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  {data?.titles?.length > 0 && <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons color={theme.page_content.fg} name="format-list-bulleted" size={16} style={{marginRight: 4}} />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}>{data?.titles.join(', ')}</Text>
                  </View>}
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  {zeecretTeam && <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons color={theme.page_content.fg} name="briefcase-outline" size={16} style={{marginRight: 4}} />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}>Team {zeecretTeam.slice(0,4).toUpperCase()}</Text>
                  </View>}
                </View>
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <TouchableRipple disabled={!logins[user_id]} onPress={() => nav.navigate('UserInventory', { username: username })}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="package" size={24} color={theme.page_content.fg} />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:inventory')}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons name={logins[user_id] ? 'chevron-right' : 'lock'} size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <TouchableRipple disabled={!logins[user_id]} onPress={() => nav.navigate('UserZeeOps', { username: username })}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="briefcase" size={24} color={theme.page_content.fg} />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>ZeeOps</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons name={logins[user_id] ? 'chevron-right' : 'lock'} size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <TouchableRipple onPress={() => nav.navigate('UserBouncers', { username: username })}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="star" size={24} color={theme.page_content.fg} />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:your_bouncers')}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <TouchableRipple onPress={() => nav.navigate('UserBlastMap', { username: username })}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="bomb" size={24} color={theme.page_content.fg} />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:blast_checker')}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <TouchableRipple onPress={() => nav.navigate('UserQRew', { username: username })}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="hammer" size={24} color={theme.page_content.fg} />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:qrew_checker')}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <TouchableRipple disabled={!logins[user_id]} onPress={() => nav.navigate('UserUniversal', { username: username })}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="earth" size={24} color={theme.page_content.fg} />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>Universal/Social Capper</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons name={logins[user_id] ? 'chevron-right' : 'lock'} size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple>
              {/* <TouchableRipple onPress={() => nav.navigate('CompetitionHome')}>
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="briefcase" size={24} color={theme.page_content.fg} />
                  <View style={{ flex: 1 }}>
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{zeecretTeam ? `Team ${zeecretTeam?.slice(0,4).toUpperCase()}` : 'Not Joined Yet'}</Text>
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, fontSize: 12, color: theme.page_content.fg }}>Zeecret Agents Competition</Text>
                  </View>
                  <View style={{ backgroundColor: theme.navigation.bg, padding: 4, borderRadius: 4 }}>
                    <Text style={{ color: theme.navigation.fg, fontSize: 16, fontWeight: "500" }}>NEW</Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple> */}
            </Card>
          </View>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ padding: 4, width: 500, maxWidth }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Card noPad>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8 }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${data?.clan?.id?.toString?.(36)}.png` }} style={{ width: 48, height: 48, borderRadius: 24 }} />
                </View>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{data?.clan?.name ?? t("user:no_clan")}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="shield-half-full" size={16} /> {data?.clan ? t('user:your_clan') : t('user:no_clan_desc')}</Text>
                  {/* <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="trophy-outline" size={16} /> Rank #{JSON.stringify(data?.clan)}</Text> */}
                </View>
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {data?.clan ? <TouchableRipple onPress={() => nav.navigate('Clan', { clanid: data?.clan?.id })}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="finance" size={24} color={theme.page_content.fg} />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:clan_stats')}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              </TouchableRipple> : <>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <TouchableRipple onPress={() => nav.navigate('UserClan', { username: username })}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="shield-half-full" size={24} color={theme.page_content.fg} />
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <View style={{ flex: 1 }}>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{t('user:clan_progress')}</Text>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font(), fontSize: 12, color: theme.page_content.fg }}>{t('user:clan_progress_desc')}</Text>
                      </View>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                    </View>
                  </TouchableRipple>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <TouchableRipple onPress={() => Linking.openURL('https://www.facebook.com/groups/MunzeeClanWarInformation/')}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="facebook-box" size={24} color={theme.page_content.fg} />
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <View style={{ flex: 1 }}>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{t('user:clan_info')}</Text>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font(), fontSize: 12, color: theme.page_content.fg }}>{t('user:clan_info_desc')}</Text>
                      </View>
                      {/*  */}
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                    </View>
                  </TouchableRipple>
                </>}
            </Card>
          </View>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ padding: 4, width: 500, maxWidth }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Card noPad>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <TouchableRipple onPress={() => setMenu(menu === "captures" ? null : "captures")}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ borderRadius: (size?.width > 750 || menu === "captures") ? 0 : 8, ...(theme.page_content.border ? { borderBottomWidth: 1, borderBottomColor: theme.page_content.border } : {}), padding: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, flexDirection: "row", alignItems: "center", backgroundColor: (theme.clanCardHeader || theme.navigation).bg }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="check" size={24} color={(theme.clanCardHeader || theme.navigation).fg} />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: (theme.clanCardHeader || theme.navigation).fg }}>{t('user:captured_types')}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  {size?.width <= 750 && <MaterialCommunityIcons name={menu === "captures" ? "chevron-up" : "chevron-down"} size={24} color={(theme.clanCardHeader || theme.navigation).fg} />}
                </View>
              </TouchableRipple>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {(size?.width > 750 || menu === "captures") && categories.filter((i: any) => i.parents.includes('root') && !i.hidden).map((i: any) => <TouchableRipple key={i.id} onPress={() => nav.navigate('UserCapturesCategory', { username: username, category: i.id })}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Image style={{ height: 32, width: 32, marginVertical: -4 }} source={getIcon(i.icon)} />
                  {/* <MaterialCommunityIcons name="star" size={24} color={theme.page_content.fg} /> */}
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{i.name}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple>)}
            </Card>
          </View>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ padding: 4, width: 500, maxWidth }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Card noPad>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <TouchableRipple onPress={() => setMenu(menu === "challenge" ? null : "challenge")}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ borderRadius: (size?.width > 750 || menu === "challenge") ? 0 : 8, ...(theme.page_content.border ? { borderBottomWidth: 1, borderBottomColor: theme.page_content.border } : {}), padding: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, flexDirection: "row", alignItems: "center", backgroundColor: (theme.clanCardHeader || theme.navigation).bg }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="trophy-outline" size={24} color={(theme.clanCardHeader || theme.navigation).fg} />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: (theme.clanCardHeader || theme.navigation).fg }}>{t('user:challenges')}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  {size?.width <= 750 && <MaterialCommunityIcons name={menu === "challenge" ? "chevron-up" : "chevron-down"} size={24} color={(theme.clanCardHeader || theme.navigation).fg} />}
                </View>
              </TouchableRipple>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {(size?.width > 750 || menu === "challenge") && <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <TouchableRipple onPress={() => nav.navigate('UserSHCLite', { username: username })}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="star-half" size={24} color={theme.page_content.fg} />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:sh_lite')}</Text>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                  </View>
                </TouchableRipple>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <TouchableRipple onPress={() => nav.navigate('UserSHCPro', { username: username })}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="star" size={24} color={theme.page_content.fg} />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:sh_pro')}</Text>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                  </View>
                </TouchableRipple>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <TouchableRipple onPress={() => nav.navigate('UserPOI', { username: username })}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="map-marker-check" size={24} color={theme.page_content.fg} />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:poi_challenge')}</Text>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                  </View>
                </TouchableRipple>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <TouchableRipple onPress={() => nav.navigate('UserColour', { username: username })}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="palette" size={24} color={theme.page_content.fg} />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:colour_challenge')}</Text>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                  </View>
                </TouchableRipple>
                {/* <TouchableRipple onPress={() => nav.navigate('UserQuest', { username: username })}> */}
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="run" size={24} color={theme.page_content.fg} />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:quebec_quest_progress')}</Text>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                  </View>
                {/* </TouchableRipple> */}
              </>}
            </Card>
          </View>
        </View>
      </ScrollView>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}
