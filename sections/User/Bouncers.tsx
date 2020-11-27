// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
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
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Maps/MapView' or its ... Remove this comment to see the full error message
import MapView from 'sections/Maps/MapView';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
// @ts-expect-error ts-migrate(6142) FIXME: Module './FAB' was resolved to 'C:/Users/samst/Des... Remove this comment to see the full error message
import UserFAB from './FAB';

export default function ClanScreen({
  route
}: any) {
  var {t} = useTranslation();
  var moment = useMoment();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var username = route.params.username;
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: (i: any) => i?.user_id
  })
  var bouncers = useAPIRequest(user_id?{
    endpoint: `user/bouncers/v1`,
    data: {
      user_id
    },
    cuppazee: true
  }:null)
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  if(!bouncers) return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ScrollView
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {!bouncers && <Text allowFontScaling={false} style={{ color: theme.page.fg, ...font() }}>Loading...</Text>}
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {bouncers && <View style={{ padding: 4, height: 400, width: "100%" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Card noPad>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <MapView markers={bouncers.filter((i: any) => i.bouncer).map((i: any) => ({
              lat: Number(i.bouncer.latitude),
              lng: Number(i.bouncer.longitude),
              icon: i.pin_icon
            }))} style={{ flex: 1 }} />
          </Card>
        </View>}
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {bouncers?.map?.((i: any) => <View style={{ padding: 4, width: 400, flexGrow: 1, maxWidth: "100%" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Card noPad cardStyle={{ opacity: i.bouncer ? 1 : 0.4 }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ padding: 8 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Image source={getIcon(i.pin_icon)} style={{ width: 48, height: 48 }} />
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{i.friendly_name}</Text>
                {/* <Text allowFontScaling={false} style={{fontSize:16,opacity:0.8}}><MaterialCommunityIcons name="sword-cross" size={16}/> The Cup of Coffee Clan</Text> */}
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {i.bouncer ? <>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ fontSize: 14, ...font(400), color: theme.page_content.fg, opacity: 1 }}>At <Text allowFontScaling={false} style={font(700)}>{i.bouncer.friendly_name}</Text> by <Text allowFontScaling={false} style={font(700)}>{i.bouncer.full_url.match(/\/m\/([^/]+)\/[0-9]+/)[1]}</Text></Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ fontSize: 14, ...font(400), color: theme.page_content.fg, opacity: 0.8 }}>{i.location.formatted} [{i.timezone.map((i: any) => moment().tz(i).format('LT')).join(' / ')}]</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ fontSize: 12, ...font(400), color: theme.page_content.fg, opacity: 0.8 }}>{t('your_bouncers:capture',{count:i.number_of_captures})}{i.number_of_captures>0 && ` - ${t('your_bouncers:last_captured',{time:moment(i.last_captured_at).format('L LTS')})}`}</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                </> : <>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ fontSize: 14, ...font(500), color: theme.page_content.fg, opacity: 1 }}>{t('your_bouncers:in_limbo')}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ fontSize: 12, ...font(400), color: theme.page_content.fg, opacity: 0.8 }}>{t('your_bouncers:capture',{count:i.number_of_captures})}{i.number_of_captures>0 && ` - ${t('your_bouncers:last_captured',{time:moment(i.last_captured_at).format('L LTS')})}`}</Text>
                </>}
              </View>
            </View>
          </Card>
        </View>)}
      </ScrollView>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}