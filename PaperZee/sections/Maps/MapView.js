import React from "react"
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { Image, Platform } from "react-native"
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';
var Map = function Map(props) {
  return (<MapView
    initialRegion={props.markerClustering?{
      latitude: 0,
      longitude: 0,
      latitudeDelta: 25,
      longitudeDelta: 25
    }:null}
    showsUserLocation={Platform.OS==="android"}
    clusteringEnabled={!!props.markerClustering}
    initialCamera={{
      zoom: -1,
      center: {
        latitude: 0,
        longitude: 0,
      }
    }}
    minZoomLevel={-2}
    provider="google"
    customMapStyle={props.mapStyle}
    style={{ flex: 1 }}>
    {props.markers.map((i, index) => props.color ?
      <Marker key={i.id ?? `${i.color}/${i.lat}/${i.lng}`} pinColor={i.color} tracksViewChanges={!!props.tracksViewChanges} coordinate={{ latitude: i.lat, longitude: i.lng }} /> :
      <Marker key={i.id ?? `${i.icon}/${i.lat}/${i.lng}`} tracksViewChanges={!!props.tracksViewChanges} coordinate={{ latitude: i.lat, longitude: i.lng }}>
        <Image source={{ uri: i.icon }} style={{ width: 48, height: 48 }} />
      </Marker>
    )}
  </MapView>)
}

export default function NativeMap(props) {
  var mapStyle = useSelector(i => i.themes[i.theme].mapStyle)
  return (
    <Map
      markerClustering={props.markerClustering}
      mapStyle={mapStyle}
      markers={props.markers}
      tracksViewChanges={props.tracksViewChanges}
    />
  )
}