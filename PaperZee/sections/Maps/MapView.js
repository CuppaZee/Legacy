import React from "react"
import MapView, { Marker } from "react-native-maps"
import { Image } from "react-native"
var Map = function Map(props) {
  return (
    <MapView
      customMapStyle={props.mapStyle}
      style={{flex:1}}>
      {props.markers.map((i,index) => <Marker key={index} coordinate={{latitude: i.lat, longitude: i.lng}}>
        <Image source={{uri:i.icon}} style={{ width: 48, height: 48 }} />
      </Marker>)}
    </MapView>
  )
}

export default function NativeMap(props) {
  return (
    <Map
      mapStyle={props.mapStyle}
      markers={props.markers}
    />
  )
}