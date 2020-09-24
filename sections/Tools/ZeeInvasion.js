import * as React from 'react';
import MapView from 'sections/Maps/MapView'
import { useSelector } from 'react-redux';
import useAPIRequest from 'utils/hooks/useAPIRequest'
import { View, ActivityIndicator } from 'react-native';

export default function ZeeInvasionMapScreen() {
  var theme = useSelector(i=>i.themes[i.theme]);
  var data = useAPIRequest({
    endpoint: 'map/zee_invasion/v1',
    cuppazee: true
  })
  var markers = data?data.map(i=>({
    lat: Number(i.latitude),
    lng: Number(i.longitude),
    icon: i.pin_icon,
    id: i.munzee_id,
  })):[]
  if(markers.length===0) {
    return <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page_content.bg }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  }
  return <MapView markers={markers} />;
}