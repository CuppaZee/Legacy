
import * as React from 'react';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Maps/MapView' or its ... Remove this comment to see the full error message
import MapView from 'sections/Maps/MapView'

import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types.json' or its co... Remove this comment to see the full error message
import types from 'utils/db/types.json';

import { View, ActivityIndicator } from 'react-native';

export default function MapScreen({
  route
}: any) {
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var list = [].concat(...types.filter((i: any) => i.icon===route.params.type||i.category===route.params.type||(i.alt_icons&&i.alt_icons.includes(route.params.type))).map((i: any) => [i.icon,...(i.alt_icons || [])]))
  var data = useAPIRequest({
    endpoint: 'bouncers/list/v1',
    data: {
      list: list.join(',')
    },
    cuppazee: true
  })
  var markers = data?data.data.map((i: any) => ({
    lat: i[0],
    lng: i[1],
    icon: data.list[i[2]],
    id: i[3]
  })):[]
  if(markers.length===0) {
    return <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page_content.bg }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  }
  return <MapView markers={markers} />;
}