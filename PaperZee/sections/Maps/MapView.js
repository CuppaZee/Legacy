import React from "react"
import NormalMapView, { Marker } from "react-native-maps";
import ClusterMapView from "react-native-map-clustering";
import { Image } from "react-native"
import { useSelector } from 'react-redux';
var Map = function Map(props) {
  var MapView = props.markerClustering?ClusterMapView:NormalMapView;
  return (
    <MapView
      initialRegion={{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 12,
        longitudeDelta: 12
      }}
      provider="google"
      customMapStyle={props.mapStyle}
      style={{flex:1}}>
      {props.markers.map((i,index) => i.color?
      <Marker key={i.id??`${i.color}/${i.lat}/${i.lng}`} tracksViewChanges={false} coordinate={{latitude: i.lat, longitude: i.lng}} pinColor={i.color} />:
      <Marker key={i.id??`${i.icon}/${i.lat}/${i.lng}`} tracksViewChanges={false} coordinate={{latitude: i.lat, longitude: i.lng}}>
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
      markerClustering={props.markerClustering}
      mapStyle={mapStyle}
      markers={props.markers}
    />
  )
}