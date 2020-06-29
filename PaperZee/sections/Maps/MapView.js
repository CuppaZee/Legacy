import React from "react";
import { Marker } from "react-native-maps";
import MapView from "react-native-map-clustering";
import { useSelector } from "react-redux";
import { View, Image } from "react-native";
import { FAB, Snackbar } from "react-native-paper";
import getIcon from "utils/db/icon";
import * as Location from "expo-location";

export default function Map(props) {
  const theme = useSelector(i => i.themes[i.theme]);
  const mapRef = React.useRef(null);
  const [locError, setLocError] = React.useState(false);
  async function getLocation() {
    var { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
      setLocError(true);
      return;
    }
    try {
      var loc = await Location.getCurrentPositionAsync({})
      mapRef.current.animateToRegion({
        latitude: loc.coords.latitude,
        longitude: loc.coords.longitude,
        latitudeDelta: 0.5,
        longitudeDelta: 0.5,
      });
    } catch (e) {
      setLocError(true);
    }
  }
  return <View style={{ flex: 1 }}>
    <MapView
      ref={mapRef}
      initialRegion={{
        latitude: 0,
        longitude: 0,
        latitudeDelta: 90,
        longitudeDelta: 90
      }}
      clusteringEnabled={props.markers?.length>60}
      provider="google"
      customMapStyle={theme.mapStyle}
      style={{ flex: 1 }}
    >
      {props.markers?.map(i => <Marker
        key={i.id}
        tracksViewChanges={!!props.tracksViewChanges}
        coordinate={{ latitude: i.lat, longitude: i.lng }}>
          <Image
            source={getIcon(i.icon)}
            style={{ width: 48, height: 48 }}/>
        </Marker>
      )}
    </MapView>
    <FAB
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
    </Snackbar>
  </View>
}