import React from "react"
import MapView, { Marker } from "react-native-maps"
import { Image } from "react-native"
import { useSelector } from 'react-redux';
var Map = function Map(props) {
  return (
    <MapView
      provider="google"
      customMapStyle={props.mapStyle}
      style={{flex:1}}>
      {props.markers.map((i,index) => i.color?
      <Marker key={index} coordinate={{latitude: i.lat, longitude: i.lng}} pinColor={i.color} />:
      <Marker key={index} coordinate={{latitude: i.lat, longitude: i.lng}}>
        <Image source={{uri:i.icon}} style={{ width: 48, height: 48 }} />
      </Marker>
      )}
    </MapView>
  )
}

export default function NativeMap(props) {
  var mapStyle = useSelector(i=>i.themes[i.theme].mapStyle)
  return (
    <Map
      mapStyle={mapStyle}
      markers={props.markers}
    />
  )
}