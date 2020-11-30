
import React from "react";
import { Marker, Circle } from "react-native-maps";
import MapView from "react-native-map-clustering";

import { useSelector } from "react-redux";

import { View, Image } from "react-native";
import { FAB, Snackbar } from "react-native-paper";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from "utils/db/icon";
import * as Location from "expo-location";

const MapMarker = React.memo(function (props: any) {
  const [tracksViewChanges, setTracksViewChanges] = React.useState(true);
  return <Marker
    tracksViewChanges={tracksViewChanges}
    coordinate={{ latitude: props.lat, longitude: props.lng }}
  >
    <Image
      onLoad={()=>setTracksViewChanges(false)}
      fadeDuration={0}
      source={getIcon(props.icon)}
      style={{ width: 48, height: 48 }}/>
  </Marker>
})

export default function Map(props: any) {
  const theme = useSelector((i: any) => i.themes[i.theme]);
  const appleMaps = useSelector((i: any) => i.settings.appleMaps);
  const center = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 90,
    longitudeDelta: 90
  }
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


      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
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
  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        initialRegion={center}
        region={props.region}
        clusteringEnabled={props.markers?.length>60}
        provider={appleMaps?null:"google"}
        customMapStyle={theme.mapStyle}
        style={{ flex: 1 }}
        onRegionChangeComplete={(region: any) => {
          props.onRegionChange?.({
            latitude: region.latitude,
            longitude: region.longitude,
            latitudeDelta: region.latitudeDelta,
            longitudeDelta: region.longitudeDelta
          })
        }}
      >
        {(props.circles||[]).map((i: any) => <Circle
          key={i.id}
          center={{ latitude: i.lat, longitude: i.lng }}
          radius={i.radius}
          fillColor={i.fill}
          strokeColor={i.stroke}
        />)}
        {props.markers?.map((i: any) => <MapMarker key={i.id} {...i} />)}
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
  );
}