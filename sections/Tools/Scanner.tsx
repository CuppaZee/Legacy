
import React, { useState, useEffect } from 'react';

import { Text, View, TouchableOpacity, Button, Vibration, Image, Platform } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Camera } from 'expo-camera';
import * as Permissions from 'expo-permissions';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { IconButton } from 'react-native-paper';
import Slider from './Slider';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';

export default function App() {
  var {t} = useTranslation();
  var nav = useNavigation();
  const [scanned,setScanned] = useState(false);
  const [list,setList] = useState([]);
  const [flash,setFlash] = useState(false);
  const [zoom,setZoom] = useState(0);
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  useEffect(() => {
    (async () => {
      const { status } = await Permissions.askAsync(Permissions.CAMERA)
      // const { status } = await Camera.requestPermissionsAsync();


      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'boolean' is not assignable to pa... Remove this comment to see the full error message
      setHasPermission(status === 'granted');
    })();
  }, []);

  var data = useAPIRequest(list.map((i: any) => ({
    endpoint: 'munzee/testscan',
    data: {barcode: i}
  })));
  if (hasPermission === null) {



    return <Text>waiting</Text>;
  }
  if (hasPermission === false) {



    return <Text>No access to camera</Text>;
  }
  return (



    <View style={{ flex: 1 }}>



      {scanned&&<View>



        <Button title={t('scanner:scan_new')} onPress={()=>setScanned(false)} />



        <Text>{JSON.stringify(data)}</Text>



        {list.slice().reverse().map((i: any,index: any)=>data[index]?.valid?<TouchableOpacity style={{borderBottomWidth: 1}} onPress={()=>{
            if(data[index].munzee) {
              WebBrowser.openBrowserAsync(i)
            } else {
              nav.navigate('DBType',{munzee:data[index].munzee_logo.slice(49,-4)})
            }
          }}>



          <View style={{flexDirection:"row",alignItems:"center",padding:8}}>



            <Image style={{height:48,width:48}} source={getIcon(data[index].munzee_logo)} />



            <View>



              {data[index].munzee&&<Text allowFontScaling={false} style={{color:'blue',fontSize:16,...font("bold")}}>
                {t('scanner:munzee',{name:data[index].munzee.friendly_name,username:data[index].munzee.creator_username})}
              </Text>}



              <Text allowFontScaling={false} style={{color:'blue',fontSize:data[index].munzee?12:16,...font(data[index].munzee?400:"bold")}}>
                {t('scanner:type',{type:data[index].munzee_type})}
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
        focusDepth={1}
        flashMode={flash?Camera.Constants.FlashMode.torch:Camera.Constants.FlashMode.off}
        barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
        }}
        onBarCodeScanned={(a: any) => {
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



              {Platform.OS !== "web" && <Slider
                style={{flex:1,marginHorizontal:8}}
                color="#016930"
                value={zoom}
                onValueChange={(value: any) => setZoom(value)} />}



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