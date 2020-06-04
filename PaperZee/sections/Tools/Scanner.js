import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Button, Vibration, Image } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IconButton } from 'react-native-paper';
import Slider from 'react-native-slider';
import font from '~sections/Shared/font';
import useAPIRequest from '~sections/Shared/useAPIRequest';
import { useNavigation } from '@react-navigation/native';

export default function App() {
  var nav = useNavigation();
  const [scanned,setScanned] = useState(false);
  const [list,setList] = useState([]);
  const [flash,setFlash] = useState(false);
  const [zoom,setZoom] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  var data = useAPIRequest(list.map(i=>({
    endpoint: 'munzee/testscan',
    data: {barcode: i}
  })));
  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style={{ flex: 1 }}>
      {scanned&&<View>
        <Button title="Scan new Munzee" onPress={()=>setScanned(false)} />
        {list.slice().reverse().map((i,index)=>data[index]?.valid?<TouchableOpacity style={{borderBottomWidth: 1}} onPress={()=>{
            if(data[index].munzee) {
              WebBrowser.openBrowserAsync(i)
            } else {
              nav.navigate('DBType',{munzee:data[index].munzee_logo.slice(49,-4)})
            }
          }}>
          <View style={{flexDirection:"row",alignItems:"center",padding:8}}>
            <Image style={{height:48,width:48}} source={{uri:data[index].munzee_logo}} />
            <View>
              {data[index].munzee&&<Text allowFontScaling={false} style={{color:'blue',fontSize:16,...font("bold")}}>
                {data[index].munzee?`${data[index].munzee.friendly_name} by ${data[index].munzee.creator_username}`:`Type: ${data[index].munzee_type}`}
              </Text>}
              <Text allowFontScaling={false} style={{color:'blue',fontSize:data[index].munzee?12:16,...font(data[index].munzee?400:"bold")}}>
                Type: {data[index].munzee_type}
              </Text>
            </View>
          </View>
        </TouchableOpacity>:<TouchableOpacity style={{borderBottomWidth: 1}} onPress={()=>{
            if(i?.startsWith?.('http')) {
              WebBrowser.openBrowserAsync(i)
            }
          }}>
          <Text allowFontScaling={false} style={{color:i?.startsWith?.('http')?'blue':'black',textAlign:"center",fontSize:16,...font("bold"),padding:4,paddingVertical:16}}>{i}</Text>
        </TouchableOpacity>)}
      </View>}
      {!scanned&&<Camera
        style={{ flex: 1 }}
        zoom={zoom}
        type={type}
        flashMode={flash?Camera.Constants.FlashMode.torch:Camera.Constants.FlashMode.off}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={(a)=>{
          try {
            Vibration.vibrate(500);
            setScanned(true);
            setList(list.concat(a?.data));
          } catch (e) {
            console.log(e);
          }
        }}
      >
        <View
          style={{
            backgroundColor: 'transparent',
            flexDirection: 'row',
            flex: 1
          }}>
          <View style={{position:"absolute",bottom:16,left:16,right:16,zIndex:1000}}>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <IconButton
                style={{backgroundColor:"white"}}
                icon={`camera-${type === Camera.Constants.Type.back?'rear':'front'}`}
                size={32}
                color="#016930"
                onPress={()=>setType(
                  type === Camera.Constants.Type.back
                    ? Camera.Constants.Type.front
                    : Camera.Constants.Type.back
                )}
              />
              <Slider
                style={{flex:1,marginHorizontal:8}}
                color="#016930"
                value={zoom}
                onValueChange={(value) => setZoom(value)} />
              <IconButton
                disabled={type === Camera.Constants.Type.front}
                style={{backgroundColor:"white"}}
                icon="flashlight"
                size={32}
                color="#016930"
                onPress={()=>setFlash(!flash)}
              />
            </View>
          </View>
          {/* <TouchableOpacity
            style={{
              flex: 0.1,
              alignSelf: 'flex-end',
              alignItems: 'center'
            }}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
              
            }}>
            <Text allowFontScaling={false} style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity> */}
        </View>
      </Camera>}
    </View>
  );
}