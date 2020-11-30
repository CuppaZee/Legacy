
import * as React from 'react';

import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';

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



  if(!bouncers) return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>



    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return (



    <View style={{ flex: 1 }}>



      <ScrollView
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>



        {!bouncers && <Text allowFontScaling={false} style={{ color: theme.page.fg, ...font() }}>Loading...</Text>}



        {bouncers && <View style={{ padding: 4, height: 400, width: "100%" }}>



          <Card noPad>



            <MapView markers={bouncers.filter((i: any) => i.bouncer).map((i: any) => ({
              lat: Number(i.bouncer.latitude),
              lng: Number(i.bouncer.longitude),
              icon: i.pin_icon
            }))} style={{ flex: 1 }} />
          </Card>
        </View>}



        {bouncers?.map?.((i: any) => <View style={{ padding: 4, width: 400, flexGrow: 1, maxWidth: "100%" }}>



          <Card noPad cardStyle={{ opacity: i.bouncer ? 1 : 0.4 }}>



            <View style={{ flexDirection: "row", alignItems: "center" }}>



              <View style={{ padding: 8 }}>



                <Image source={getIcon(i.pin_icon)} style={{ width: 48, height: 48 }} />
              </View>



              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>



                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{i.friendly_name}</Text>
                {/* <Text allowFontScaling={false} style={{fontSize:16,opacity:0.8}}><MaterialCommunityIcons name="sword-cross" size={16}/> The Cup of Coffee Clan</Text> */}



                {i.bouncer ? <>



                  <Text allowFontScaling={false} style={{ fontSize: 14, ...font(400), color: theme.page_content.fg, opacity: 1 }}>At <Text allowFontScaling={false} style={font(700)}>{i.bouncer.friendly_name}</Text> by <Text allowFontScaling={false} style={font(700)}>{i.bouncer.full_url.match(/\/m\/([^/]+)\/[0-9]+/)[1]}</Text></Text>



                  <Text allowFontScaling={false} style={{ fontSize: 14, ...font(400), color: theme.page_content.fg, opacity: 0.8 }}>{i.location.formatted} [{i.timezone.map((i: any) => moment().tz(i).format('LT')).join(' / ')}]</Text>



                  <Text allowFontScaling={false} style={{ fontSize: 12, ...font(400), color: theme.page_content.fg, opacity: 0.8 }}>{t('your_bouncers:capture',{count:i.number_of_captures})}{i.number_of_captures>0 && ` - ${t('your_bouncers:last_captured',{time:moment(i.last_captured_at).format('L LTS')})}`}</Text>



                </> : <>



                  <Text allowFontScaling={false} style={{ fontSize: 14, ...font(500), color: theme.page_content.fg, opacity: 1 }}>{t('your_bouncers:in_limbo')}</Text>



                  <Text allowFontScaling={false} style={{ fontSize: 12, ...font(400), color: theme.page_content.fg, opacity: 0.8 }}>{t('your_bouncers:capture',{count:i.number_of_captures})}{i.number_of_captures>0 && ` - ${t('your_bouncers:last_captured',{time:moment(i.last_captured_at).format('L LTS')})}`}</Text>
                </>}
              </View>
            </View>
          </Card>
        </View>)}
      </ScrollView>



      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}