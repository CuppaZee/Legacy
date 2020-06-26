import React from "react"
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { View, Image, Platform } from "react-native"
import { FAB, Snackbar } from 'react-native-paper';
import * as Location from 'expo-location';
import { useSelector } from 'react-redux';
import getIcon from 'utils/db/icon';

function Map(props) {
  // var mapStyle = useSelector(i => i.themes[i.theme].mapStyle)
  // var mapRef = React.useRef(null);
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
  //     setLocError(JSON.stringify(loc));
  //     mapRef.current.animateToRegion({
  //       latitude: loc.coords.latitude,
  //       longitude: loc.coords.longitude,
  //       latitudeDelta: 10,
  //       longitudeDelta: 10,
  //     });
  //   } catch (e) {
  //     setLocError(true);
  //   }
  // }
  return (<View style={{ flex: 1 }}>
    <MapView
      initialRegion={props.markerClustering?{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 25,
        longitudeDelta: 25
      }:null}
      onRegionChange={props.onRegionChange}
      showsUserLocation={true}
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
      // ref={mapRef}
      // onRegionChange={props.onRegionChange}
      // showsUserLocation={true}
      // clusteringEnabled={!!props.markerClustering}
      // initialRegion={{
      //   latitude: 0,
      //   longitude: 0,
      //   latitudeDelta: 50,
      //   longitudeDelta: 50
      // }}
      // minZoomLevel={-2}
      // provider="google"
      // customMapStyle={theme.mapStyle}
      style={{ flex: 1 }}>
      {props.markers.map((i, index) => <Marker key={i.id ?? `${i.icon}/${i.lat}/${i.lng}`} tracksViewChanges={!!props.tracksViewChanges} coordinate={{ latitude: i.lat, longitude: i.lng }}>
          <Image source={{ uri: getIcon(i.icon) }} style={{ width: 48, height: 48 }} />
        </Marker>
      )}
    </MapView>
    {/* <FAB
      style={{ position: "absolute", top: 8, left: 8, backgroundColor: theme.navigation.bg }}
      color={theme.navigation.fg}
      small
      icon={true ? "crosshairs-gps" : "crosshairs"}
      onPress={getLocation}
    />
    <Snackbar
      visible={locError}
      onDismiss={()=>setLocError(false)}
      duration={2000}
    >
      {typeof locError == "string" ? locError : "Failed retreiving location"}
    </Snackbar> */}
  </View>)
}

export default Map;