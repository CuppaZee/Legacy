import React from "react"
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import MarkerClusterer from "react-google-maps/lib/components/addons/MarkerClusterer"
import { useSelector } from 'react-redux';
var Map = withScriptjs(withGoogleMap(function Map(props) {
  if (props.markerClustering) return (
    <GoogleMap
      defaultZoom={2}
      defaultCenter={{ lat: 0, lng: 0 }}
      options={{
        styles: props.mapStyles,
        streetViewControl: false,
        zoomControl: true,
        scaleControl: true,
        clickableIcons: false,
        controlSize: 32,
        gestureHandling: "greedy",
        mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
        }
      }}
    >
      <MarkerClusterer
        // onClick={props.onMarkerClustererClick}
        averageCenter
        enableRetinaIcons
        gridSize={60}
      >
        {props.markers.map((i, index) => <Marker key={i.id??`${i.icon}/${i.lat}/${i.lng}`} icon={{ url: i.icon, scaledSize: { height: 48, width: 48 } }} position={{ lat: i.lat, lng: i.lng }} />)}
      </MarkerClusterer>
    </GoogleMap>
  )
  return (
    <GoogleMap
      defaultZoom={0}
      defaultCenter={{ lat: 0, lng: 0 }}
      options={{
        styles: props.mapStyles,
        streetViewControl: false,
        zoomControl: true,
        scaleControl: true,
        clickableIcons: false,
        controlSize: 32,
        gestureHandling: "greedy",
        mapTypeControlOptions: {
          mapTypeIds: ['roadmap', 'satellite', 'hybrid', 'terrain', 'styled_map']
        }
      }}
    >
      {props.markers.map((i, index) => <Marker key={index} icon={{ url: i.icon, scaledSize: { height: 48, width: 48 } }} position={{ lat: i.lat, lng: i.lng }} />)}
    </GoogleMap>
  )
}))

export default function WebMap(props) {
  var mapStyle = useSelector(i => i.themes[i.theme].mapStyle)
  return (
    <Map
      markerClustering={props.markerClustering}
      mapStyles={mapStyle}
      markers={props.markers}
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDenr1Ki2iRgz3vmXa70xhyRTmok2wwycE&v=3.exp&libraries=geometry,drawing,places"
      loadingElement={<div style={{ height: `100%` }} />}
      containerElement={<div style={{ height: `100%` }} />}
      mapElement={<div style={{ height: `100%` }} />}
    />
  )
}