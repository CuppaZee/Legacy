import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Button, Vibration } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IconButton } from 'react-native-paper';
import Slider from 'react-native-slider';

export default function App() {
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
        {list.slice().reverse().map(i=><TouchableOpacity style={{borderBottomWidth: 1}} onPress={()=>{
            if(i?.startsWith?.('http')) {
              WebBrowser.openBrowserAsync(i)
            }
          }}>
          <Text style={{color:i?.startsWith?.('http')?'blue':'black',textAlign:"center",fontSize:16,fontWeight:"bold",padding:4,paddingVertical:16}}>{i}</Text>
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
            <Text style={{ fontSize: 18, marginBottom: 10, color: 'white' }}> Flip </Text>
          </TouchableOpacity> */}
        </View>
      </Camera>}
    </View>
  );
}