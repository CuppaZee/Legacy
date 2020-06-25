import * as React from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import Card from 'sections/Shared/Card';
import { useSelector } from 'react-redux';
import useAPIRequest from 'utils/hooks/useAPIRequest'
import font from 'sections/Shared/font';
import useMoment from 'utils/hooks/useMoment';
import MapView from 'sections/Maps/MapView';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';
import UserFAB from './FAB';

export default function ClanScreen({ route }) {
  var {t} = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var username = route.params.username;
  var [location,setLocation] = React.useState({
    lat: 0,
    lng: 0
  })
  var [storedLocation,setStoredLocation] = React.useState({
    lat: 0,
    lng: 0
  })
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: i=>i?.user_id
  })
  var bouncers = useAPIRequest(location.lat!==0||location.lng!==0?{
    endpoint: `map/blast/v1`,
    cuppazee: true,
    data: {
      user_id,
      ...location
    }
  }:null)
  // if(!bouncers) return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
  //   <ActivityIndicator size="large" color={theme.page.fg} />
  // </View>
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        <View style={{ padding: 4, height: 400, width: "100%" }}>
          <Card noPad>
            <MapView center={storedLocation} onRegionChange={({latitude,longitude})=> {
              if(storedLocation.lat !== latitude || storedLocation.lng !== longitude) setStoredLocation({
                lat: latitude,
                lng: longitude
              })
            }} tracksViewChanges={true} markers={[{
              ...storedLocation,
              icon: getIcon("blastcapture")
            }]} style={{ flex: 1 }} />
          </Card>
        </View>
        <Text>{JSON.stringify(storedLocation)}</Text>
        {/* {bouncers?.map?.(i => <View style={{ padding: 4, width: 400, flexGrow: 1, maxWidth: "100%" }}>
          <Card noPad cardStyle={{ opacity: i.bouncer ? 1 : 0.4 }}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ padding: 8 }}>
                <Image source={{ uri: getIcon(i.pin_icon) }} style={{ width: 48, height: 48 }} />
              </View>
              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{i.friendly_name}</Text>
                {i.bouncer ? <>
                  <Text allowFontScaling={false} style={{ fontSize: 14, ...font(400), color: theme.page_content.fg, opacity: 1 }}>At <Text allowFontScaling={false} style={font(700)}>{i.bouncer.friendly_name}</Text> by <Text allowFontScaling={false} style={font(700)}>{i.bouncer.full_url.match(/\/m\/([^/]+)\/[0-9]+/)[1]}</Text></Text>
                  <Text allowFontScaling={false} style={{ fontSize: 14, ...font(400), color: theme.page_content.fg, opacity: 0.8 }}>{i.location.formatted} [{i.timezone.map(i=>moment().tz(i).format('LT')).join(' / ')}]</Text>
                  <Text allowFontScaling={false} style={{ fontSize: 12, ...font(400), color: theme.page_content.fg, opacity: 0.8 }}>{t('your_bouncers:capture',{count:i.number_of_captures})} - {t('your_bouncers:last_captured',{time:moment(i.last_captured_at).format('L LTS')})}</Text>
                </> : <>
                    <Text allowFontScaling={false} style={{ fontSize: 14, ...font(500), color: theme.page_content.fg, opacity: 1 }}>{t('your_bouncers:in_limbo')}</Text>
                  </>}
              </View>
            </View>
          </Card>
        </View>)} */}
      </ScrollView>
      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}