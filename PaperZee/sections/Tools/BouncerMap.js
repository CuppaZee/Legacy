import * as React from 'react';
import MapView from '~sections/Maps/MapView'
import { useSelector } from "react-redux";
import useAPIRequest from '~sections/Shared/useAPIRequest'
import types from '~sections/DB/types.json';

export default function MapScreen({ route }) {
  var mapStyle = useSelector(i=>i.themes[i.theme].mapStyle)
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
    icon: `https://server.cuppazee.app/pins/64/${data.list[i[2]]}.png`,
    id: i[3]
  })):[]
  return <MapView markerClustering={true} mapStyle={mapStyle} markers={markers} style={{ flex: 1 }} />;
}