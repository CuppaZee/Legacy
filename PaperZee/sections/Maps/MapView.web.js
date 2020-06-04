import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { useSelector } from 'react-redux';
var Map = withScriptjs(withGoogleMap(function Map(props) {
  return (
    <GoogleMap
      defaultZoom={0}
      defaultCenter={{ lat: 0, lng: 0 }}
      options={{
        styles: props.mapStyles,
        streetViewControl:false,
        zoomControl:true,
        scaleControl:true,
        clickableIcons:false,
        controlSize:32,
        gestureHandling:"greedy",
        mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain','styled_map']
        }
      }}
    >
      { props.markers.map((i, index)=><Marker key={index} icon={{url:i.icon,scaledSize:{height:48,width:48}}} position={{ lat: i.lat, lng: i.lng }} />)}
    </GoogleMap>
  )
}))

export default function WebMap(props) {
  var mapStyle = useSelector(i=>i.themes[i.theme].mapStyle)
  return (
    <Map
      mapStyles={mapStyle}
      markers={props.markers}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDenr1Ki2iRgz3vmXa70xhyRTmok2wwycE&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  )
}