import * as React from 'react';
import MapView from 'sections/Maps/MapView'
import { useSelector } from 'react-redux';
import useAPIRequest from 'utils/hooks/useAPIRequest'
import types from 'utils/db/types.json';
import getIcon from 'utils/db/icon';
import { View, ActivityIndicator } from 'react-native';

export default function MapScreen({ route }) {
  var theme = useSelector(i=>i.themes[i.theme]);
  var list = [].concat(...types.filter(i=>i.icon===route.params.type||i.category===route.params.type||(i.alt_icons&&i.alt_icons.includes(route.params.type))).map(i=>[i.icon,...i.alt_icons||[]]))
  var data = useAPIRequest({
    endpoint: 'bouncers/list/v1',
    data: {
      list: list.join(',')
    },
    cuppazee: true
  })
  var markers = data?data.data.map(i=>({
    lat: i[0],
    lng: i[1],
    icon: getIcon(data.list[i[2]]),
    id: i[3]
  })):[]
  if(markers.length===0) {
    return <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page_content.bg }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  }
  return <MapView markers={markers} />;
}