
import * as React from 'react';

import { Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';

import { useSelector } from 'react-redux';
import { Button, Menu, TouchableRipple } from 'react-native-paper';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest'



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Maps/MapView' or its ... Remove this comment to see the full error message
import MapView from 'sections/Maps/MapView';
import { useTranslation } from 'react-i18next';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types' or its corresp... Remove this comment to see the full error message
import getType from 'utils/db/types';



import UserFAB from '../FAB';
import { useNavigation } from '@react-navigation/native';

export default function ClanScreen({
  route
}: any) {
  var { t } = useTranslation();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var username = route.params.username;
  var [storedLocation, setStoredLocation] = React.useState({
    lat: 0,
    lng: 0
  })
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: (i: any) => i?.user_id
  })
  const nav = useNavigation();
  return (



    <View style={{ flex: 1 }}>



      <ScrollView
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>



        <View style={{ padding: 4, height: 400, width: "100%" }}>



          <Card noPad>



            <MapView
              center={storedLocation}
              onRegionChange={({
                latitude,
                longitude
              }: any) => {
                if (storedLocation.lat !== latitude || storedLocation.lng !== longitude) setStoredLocation({
                  lat: latitude,
                  lng: longitude
                })
              }}
              markers={[{
                ...storedLocation,
                icon: "blastcapture"
              }]}
              circles={[{
                ...storedLocation,
                fill: theme.navigation.bg + '33',
                stroke: theme.navigation.bg,
                radius: 1609.344
              }]}
              style={{ flex: 1 }}
            />
          </Card>
        </View>



        <View style={{ flexDirection: "row", width: "100%" }}>



          <View style={{ padding: 4, flex: 1 }}>



            <Button
              mode="contained"


              // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
              backgroundColor={theme.navigation.fg}
              style={theme.page_content.border ? { borderColor: "white", borderWidth: 1 } : {}}
              color={theme.navigation.bg}
              onPress={() => nav.navigate('UserBlast', {
                username,
                size: 50,
                lat: storedLocation.lat,
                lon: storedLocation.lng
              })}>
              {t('blast_checker:types.mini')}
            </Button>
          </View>



          <View style={{ padding: 4, flex: 1 }}>



            <Button
              mode="contained"


              // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
              backgroundColor={theme.navigation.fg}
              style={theme.page_content.border ? { borderColor: "white", borderWidth: 1 } : {}}
              color={theme.navigation.bg}
              onPress={() => nav.navigate('UserBlast', {
                username,
                size: 100,
                lat: storedLocation.lat,
                lon: storedLocation.lng
              })}>
              {t('blast_checker:types.normal')}
            </Button>
          </View>



          <View style={{ padding: 4, flex: 1 }}>



            <Button
              mode="contained"


              // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
              backgroundColor={theme.navigation.fg}
              style={theme.page_content.border ? { borderColor: "white", borderWidth: 1 } : {}}
              color={theme.navigation.bg}
              onPress={() => nav.navigate('UserBlast', {
                username,
                size: 500,
                lat: storedLocation.lat,
                lon: storedLocation.lng
              })}>
              {t('blast_checker:types.mega')}
            </Button>
          </View>
        </View>
      </ScrollView>



      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}