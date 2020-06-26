import React from "react"
import MapView, { Marker } from "react-native-maps";
import { View, Image, Platform } from "react-native"
import { FAB, Snackbar } from "react-native-paper"
import { useSelector } from 'react-redux';
import * as Location from 'expo-location';
var Map = function Map(props) {
  var theme = props.theme;
  return (<MapView
    // mapRef={props.mapRef}
    initialRegion={props.markerClustering ? {
      latitude: 0,
      longitude: 0,
      latitudeDelta: 25,
      longitudeDelta: 25
    } : null}
    showsUserLocation={Platform.OS === "android"}
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
    customMapStyle={theme.mapStyle}
    style={{ flex: 1 }}>
    {props.markers.map((i, index) => true ?
      <Marker key={i.id ?? `${i.color}/${i.lat}/${i.lng}`} pinColor={"red"} tracksViewChanges={!!props.tracksViewChanges} coordinate={{ latitude: i.lat, longitude: i.lng }} /> :
      <Marker key={i.id ?? `${i.icon}/${i.lat}/${i.lng}`} tracksViewChanges={!!props.tracksViewChanges} coordinate={{ latitude: i.lat, longitude: i.lng }}>
        <Image source={{ uri: i.icon }} style={{ width: 48, height: 48 }} />
      </Marker>
    )}
  </MapView>)
}

export default function NativeMap(props) {
  var mapRef = null;
  var theme = useSelector(i => i.themes[i.theme])
  // var [locError, setLocError] = React.useState(false);
  // async function getLocation() {
  //   var { status } = await Location.requestPermissionsAsync();
  //   if (status !== "granted") {
  //     setLocError(true);
  //     return;
  //   }
  //   try {
  //     var loc = await Location.getCurrentPositionAsync({})
  //     mapRef.animateToRegion({
  //       latitude: loc.coords.latitude,
  //       longitude: loc.coords.longitude,
  //       latitudeDelta: 1,
  //       longitudeDelta: 1,
  //     });
  //   } catch (e) {
  //     setLocError(true);
  //   }
  // }
  console.log('RERENDER')
  return (<View style={{ flex: 1 }}>
    <Map
      // mapRef={map=>{
      //   mapRef = map;
      // }}
      markerClustering={props.markerClustering}
      theme={theme}
      markers={props.markers}
      tracksViewChanges={props.tracksViewChanges}
    />
    {/* <FAB
      style={{ position: "absolute", top: 8, left: 8, backgroundColor: theme.navigation.bg }}
      color={theme.navigation.fg}
      small
      icon={true ? "crosshairs-gps" : "crosshairs"}
      onPress={getLocation}
    />
    <Snackbar
      visible={locError}
      onDismiss={() => setLocError(false)}
      duration={2000}
    >
      {typeof locError == "string" ? locError : "Failed retreiving location"}
    </Snackbar> */}
  </View>)
}