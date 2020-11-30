
import React from 'react'
import { GoogleMap, LoadScript, Marker, MarkerClusterer, StandaloneSearchBox, Circle } from '@react-google-maps/api';

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
    <MarkerClusterer
      averageCenter
      enableRetinaIcons
      gridSize={60}
      >
      {(clusterer: any) => props.markers.map((i: any, index: any) => <Marker clusterer={clusterer} key={index} icon={{ url: getIcon(i.icon)?.uri||getIcon(i.icon), scaledSize: { height: 48, width: 48 } }} position={{ lat: i.lat, lng: i.lng }} />)}
    </MarkerClusterer>
  );
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


      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
      map.panTo({
        lat: loc.coords.latitude,
        lng: loc.coords.longitude
      });


      // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
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
        onLoad={(m: any) => setMap(m)}
        onCenterChanged={()=>{
          if(map) {


            // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
            if(center.lat!==map.center.lat()||center.lng!==map.center.lng()) setCenter({


              // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
              lat: map.center.lat(),


              // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
              lng: map.center.lng()
            })
            props.onRegionChange?.({


              // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
              latitude: map.center.lat(),


              // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
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


          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
          onPress={()=>map.setZoom(map.getZoom()-1)}
        />
        <FAB
          style={{position: "absolute", bottom: 70, right: 8, backgroundColor: theme.navigation.bg}}
          color={theme.navigation.fg}
          small
          icon={"plus"}


          // @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'.
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