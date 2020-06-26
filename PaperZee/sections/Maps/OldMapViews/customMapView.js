import React from "react"
import MapView, { Marker } from "react-native-maps";
// import MapView from "react-native-map-clustering";
import Supercluster from "supercluster";
import { Image, Platform, Text, View } from "react-native"
import { useSelector } from 'react-redux';
import font from 'sections/Shared/font';
import * as Location from 'expo-location';
var Map = function Map(props) {
  var mapRef = React.useRef(null);
  var [data,setData] = React.useState(0);
  var GeoJSON = props.markers.map(i=>({
    type: "Feature",
    geometry: {
      coordinates: [
        i.lng,
        i.lat,
      ],
      type: "Point",
    },
    properties: {
      icon: i.icon,
      id: i.id,
    },
  }))
  var output = [];
  if(GeoJSON.length < 60) {
    output = GeoJSON;
  } else if(data && mapRef?.current) {
    var bounds = data.bounds;
    var camera = data.camera;
    const index = new Supercluster({
      radius: 60,
      maxZoom: 16,
    });
    index.load(GeoJSON);
    output = index.getClusters([bounds.southWest.longitude, bounds.southWest.latitude, bounds.northEast.longitude, bounds.northEast.latitude], Math.round(camera.zoom));
  }
  return (<MapView
    ref={mapRef}
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
    onMapReady={async ()=>{
      setData({
        bounds: await mapRef.current.getMapBoundaries(),
        camera: await mapRef.current.getCamera()
      });
    }}
    onRegionChangeComplete={async ()=>{
      setData({
        bounds: await mapRef.current.getMapBoundaries(),
        camera: await mapRef.current.getCamera()
      });
    }}
    style={{ flex: 1 }}>
    {output.map(i => i.properties?.icon ?
      <Marker key={i.properties.id ?? `${i.properties.icon}/${i.geometry.coordinates[1]}/${i.geometry.coordinates[0]}`} tracksViewChanges={!!props.tracksViewChanges} coordinate={{ latitude: i.geometry.coordinates[1], longitude: i.geometry.coordinates[0] }}>
        <Image source={{ uri: i.properties.icon }} style={{ width: 48, height: 48 }} />
      </Marker>:
      <Marker anchor={{x:0.5,y:0.5}} key={i.properties.cluster_id} tracksViewChanges={!!props.tracksViewChanges} coordinate={{ latitude: i.geometry.coordinates[1], longitude: i.geometry.coordinates[0] }}>
        <View style={{ width: 32, height: 32, backgroundColor: "#00ffff", borderRadius: 16, justifyContent: "center", alignItems: "center" }}>
          <Text allowFontScaling={false} style={{ fontSize: 16, color: "#002222", ...font("bold") }}>{i.properties.point_count_abbreviated}</Text>
        </View>
      </Marker>
      // <Marker key={i.properties.cluster_id} pinColor={"red"} tracksViewChanges={!!props.tracksViewChanges} coordinate={{ latitude: i.geometry.coordinates[1], longitude: i.geometry.coordinates[0] }} />
      // TODO Implement new design for Cluster Marker
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