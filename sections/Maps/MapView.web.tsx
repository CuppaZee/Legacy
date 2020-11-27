// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from 'react'
import { GoogleMap, LoadScript, Marker, MarkerClusterer, StandaloneSearchBox, Circle } from '@react-google-maps/api';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
import { FAB, Snackbar } from 'react-native-paper';
import * as Location from 'expo-location';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';

const key = "AIzaSyADGInCzWshKaZUKmZxMed5BKJ4qdN2UTE"
const version = "beta&map_ids=1e47783ba0e84c45,f5056005d4606f72";
const libraries = ["places"];

function MarkerRenderer(props: any) {
  if(props.markers?.length>60) return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
      >
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {(clusterer: any) => props.markers.map((i: any, index: any) => <Marker clusterer={clusterer} key={index} icon={{ url: getIcon(i.icon)?.uri||getIcon(i.icon), scaledSize: { height: 48, width: 48 } }} position={{ lat: i.lat, lng: i.lng }} />)}
    </MarkerClusterer>
  );
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return props.markers.map((i: any, index: any) => <Marker key={index} icon={{ url: getIcon(i.icon)?.uri||getIcon(i.icon), scaledSize: { height: 48, width: 48 } }} position={{ lat: i.lat, lng: i.lng }} />);
}

function WebMap(props: any) {
  var theme = useSelector((i: any) => i.themes[i.theme])
  var [center,setCenter] = React.useState({lat:0,lng:0});
  var [map,setMap] = React.useState(null)
  var [locError, setLocError] = React.useState(false);
  async function getLocation() {
    try {
      var loc = await Location.getCurrentPositionAsync({})
      map.panTo({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude
      });
      map.setZoom(10);
    } catch(e) {
      setLocError(true);
    }
  }
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <LoadScript
      googleMapsApiKey={key}
      version={version}
      libraries={libraries}
    >
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <GoogleMap
        zoom={1}
        center={props.center||center}
        options={{
          streetViewControl: false,
          zoomControl: false,
          scaleControl: true,
          rotateControl: false,
          clickableIcons: false,
          mapTypeControl: false,
          fullscreenControl: false,
          controlSize: 32,
          gestureHandling: "greedy",
          mapTypeControlOptions: {
            mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
          },
          mapId: theme.dark?'1e47783ba0e84c45':'f5056005d4606f72'
        }}
        mapContainerStyle={{flex: 1}}
        onLoad={(m: any) => setMap(m)}
        onCenterChanged={()=>{
          if(map) {
            if(center.lat!==map.center.lat()||center.lng!==map.center.lng()) setCenter({
              lat: map.center.lat(),
              lng: map.center.lng()
            })
            props.onRegionChange?.({
              latitude: map.center.lat(),
              longitude: map.center.lng()
            })
          }
        }}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <FAB
          style={{position: "absolute", top: 8, left: 8, backgroundColor: theme.navigation.bg}}
          color={theme.navigation.fg}
          small
          icon={true?"crosshairs-gps":"crosshairs"}
          onPress={getLocation}
        />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <FAB
          style={{position: "absolute", bottom: 22, right: 8, backgroundColor: theme.navigation.bg}}
          color={theme.navigation.fg}
          small
          icon={"minus"}
          onPress={()=>map.setZoom(map.getZoom()-1)}
        />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <FAB
          style={{position: "absolute", bottom: 70, right: 8, backgroundColor: theme.navigation.bg}}
          color={theme.navigation.fg}
          small
          icon={"plus"}
          onPress={()=>map.setZoom(map.getZoom()+1)}
        />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Snackbar
          visible={locError}
          onDismiss={()=>setLocError(false)}
          duration={2000}
        >
          Couldn't retrieve location
        </Snackbar>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <MarkerRenderer {...props} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {props.circles?.map((i: any) => <Circle
          radius={i.radius}
          center={{ lat: i.lat, lng: i.lng }}
          options={{
            fillColor: i.fill,
            fillOpacity: 1,
            strokeColor: i.stroke,
            strokeOpacity: 1,
          }}
        />)}
      </GoogleMap>
    </LoadScript>
  );
}

export default React.memo(WebMap)