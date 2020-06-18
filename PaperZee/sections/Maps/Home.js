import * as React from 'react';
import { Button, Text, View, Platform } from 'react-native';
// import MapView from 'react-native-maps';
// var MapView;
import MapView from './MapView'
import { useSelector } from "react-redux"
import font from 'sections/Shared/font';

/*
https://itnext.io/performant-custom-map-markers-for-react-native-maps-ddc8d5a1eeb0

https://blog.logrocket.com/pure-functional-components-in-react-16-6/
*/

var markers = [];
for(var i = 0;i < 1000;i++) {
  let zed = ['red','orange','yellow','green','blue','indigo','violet'][Math.floor(Math.random()*7)]
  markers.push({lat:Math.floor(Math.random()*180)-90,lng:Math.floor(Math.random()*360)-180,icon:`https://munzee.global.ssl.fastly.net/images/pins/${zed}zed.png`,color:zed})
}

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
    // [{lat:52,lng:-1,icon:'https://munzee.global.ssl.fastly.net/images/pins/treehouse.png'}]
  return (
    <>
      <MapView mapStyle={mapStyle} markers={markers} style={{ flex: 1 }} />
      {/* <View style={{position:"absolute",top:0,left:0,bottom:0,right:0,alignItems:"center",justifyContent:"center"}}>
        <View style={{borderRadius:8,backgroundColor:'#ff3322',padding:8}}>
          <Text allowFontScaling={false} style={{...font("bold"),fontSize:20,color:"white"}}>Coming Soon</Text>
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