import React from 'react'
import { GoogleMap, LoadScript, Marker, MarkerClusterer, StandaloneSearchBox } from '@react-google-maps/api';
import { useSelector } from 'react-redux';
import { FAB, Snackbar } from 'react-native-paper';
import * as Location from 'expo-location';

const key = "AIzaSyADGInCzWshKaZUKmZxMed5BKJ4qdN2UTE"
const version = "beta&map_ids=1e47783ba0e84c45,f5056005d4606f72";
const libraries = ["places"];

function MarkerRenderer(props) {
  if(props.markerClustering) return <MarkerClusterer
    averageCenter
    enableRetinaIcons
    gridSize={60}
    >
    {clusterer=>props.markers.map((i, index) => <Marker clusterer={clusterer} key={index} icon={{ url: i.icon, scaledSize: { height: 48, width: 48 } }} position={{ lat: i.lat, lng: i.lng }} />)}
  </MarkerClusterer>
  return props.markers.map((i, index) => <Marker key={index} icon={{ url: i.icon, scaledSize: { height: 48, width: 48 } }} position={{ lat: i.lat, lng: i.lng }} />)
}

function WebMap(props) {
  var theme = useSelector(i => i.themes[i.theme])
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
    <LoadScript
      googleMapsApiKey={key}
      version={version}
      libraries={libraries}
    >
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
        onLoad={(m)=>setMap(m)}
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
        <FAB
          style={{position: "absolute", top: 8, left: 8, backgroundColor: theme.navigation.bg}}
          color={theme.navigation.fg}
          small
          icon={true?"crosshairs-gps":"crosshairs"}
          onPress={getLocation}
        />
        <FAB
          style={{position: "absolute", bottom: 22, right: 8, backgroundColor: theme.navigation.bg}}
          color={theme.navigation.fg}
          small
          icon={"minus"}
          onPress={()=>map.setZoom(map.getZoom()-1)}
        />
        <FAB
          style={{position: "absolute", bottom: 70, right: 8, backgroundColor: theme.navigation.bg}}
          color={theme.navigation.fg}
          small
          icon={"plus"}
          onPress={()=>map.setZoom(map.getZoom()+1)}
        />
        <Snackbar
          visible={locError}
          onDismiss={()=>setLocError(false)}
          duration={2000}
        >
          Couldn't retrieve location
        </Snackbar>
        <MarkerRenderer {...props} />
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(WebMap)