import * as React from 'react';
import { Button, Text, View, Platform } from 'react-native';
// import MapView from 'react-native-maps';
// var MapView;
import MapView from './MapView'
import { useSelector } from "react-redux"

export default function MapScreen({ navigation }) {
  var mapStyle = useSelector(i=>i.themes[i.theme].mapStyle)
  // var [MapViewLoading,setMapViewLoading] = React.useState(false);
  // React.useEffect(()=>{
  //   if(!MapView && !MapViewLoading) {
  //     (async function (){
  //       setMapViewLoading(true);
  //       MapView = (Platform.OS!=='web'?(await import('../map/native.js')):(await import('../map/web.js'))).default;
  //       setMapViewLoading(false);
  //     })();
  //   }
  // },[MapView])
  // if(MapView) {
  return (
    <>
      <MapView mapStyle={mapStyle} markers={[{lat:52,lng:-1,icon:'https://munzee.global.ssl.fastly.net/images/pins/treehouse.png'}]} style={{ flex: 1 }} />
      {/* <View style={{position:"absolute",top:0,left:0,bottom:0,right:0,alignItems:"center",justifyContent:"center"}}>
        <View style={{borderRadius:8,backgroundColor:'#ff3322',padding:8}}>
          <Text style={{fontWeight:"bold",fontSize:20,color:"white"}}>Coming Soon</Text>
        </View>
      </View> */}
    </>
  );
  // } else {
  //   return (
  //     <View style={{ flex: 1, backgroundColor: '#c6e3b6', justifyContent: 'center', alignItems: 'center' }}>
  //       <Text>Loading...</Text>
  //     </View>
  //   )
  // }
}