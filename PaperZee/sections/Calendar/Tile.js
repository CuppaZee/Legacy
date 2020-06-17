import * as React from 'react';
import { View, Text, ImageBackground, ActivityIndicator } from 'react-native';
import font from '~sections/Shared/font';
import { useTranslation } from 'react-i18next';

function u(a) {
  return {uri:`https://server.cuppazee.app/Cal/${a||"_"}.png`}
}

export default function Tile({data,date,type,theme,header,extraText}) {
  var {t} = useTranslation();
  var types = [
    {label:"R",type:"flatrob",color:"rgb(0, 148, 68)"},
    {label:"M",type:"flatmatt",color:"rgb(237, 32, 36)"},
    {label:"L",type:"flatlou",color:"rgb(235, 0, 139)"},
    {label:"H",type:"flathammock",color:"rgb(35, 117, 245)"},
  ]
  // {label:"QRewZee",type:"qrewzee",color:"rgb(235, 105, 42)"},
  if(type=="alt") {
    return <View style={{flex:1,backgroundColor:theme.page_content.bg,borderWidth:1,borderColor:'#d3d3d3',height:60,justifyContent:"center",alignItems:"center",paddingBottom:2}}>
      <View style={{flexDirection:"row"}}>
        <Text allowFontScaling={false} style={{color:theme.page_content.fg,...font("bold"),fontSize:12,textAlignVertical:"center"}}>{(date||1).toString()}</Text>
      </View>
      <View style={{flexDirection:"row"}}>
        {types.map(i=>data.includes(i.label)?<Text allowFontScaling={false} style={{color:i.color,...font("bold"),fontSize:12,textAlignVertical:"center",letterSpacing:1}}>{i.label}</Text>:null)}
      </View>
      <View style={{flexDirection:"row"}}>
        <Text allowFontScaling={false} style={{color:data.includes('Z')?"rgb(235, 105, 42)":"rgb(150, 150, 150)",...font("bold"),fontSize:10,textAlignVertical:"center"}}>{data.includes('Z')?"QRewZee":t('calendar:off')}</Text>
      </View>
    </View>
  }
  return <View style={{flex:1,backgroundColor:"black",borderWidth:1,borderColor:'#d3d3d3',height:header?56:40}}>
    <ImageBackground source={u(data.includes('R')?'R':null)} style={{flex:1}}>
      <ImageBackground source={u(data.includes('M')?'M':null)} style={{flex:1}}>
        <ImageBackground source={u(data.includes('L')?'L':null)} style={{flex:1}}>
          <ImageBackground source={u(data.includes('H')?'H':null)} style={{flex:1}}>
            <ImageBackground source={u(data.includes('Z')?'QRewZeeOn':'QRewZeeOff')} style={{flex:1}}>
              <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                {extraText&&<Text allowFontScaling={false} style={{color:"white",...font("bold"),fontSize:16,textAlignVertical:"center"}}>{extraText}</Text>}
                <Text allowFontScaling={false} style={{color:"white",...font("bold"),fontSize:16,textAlignVertical:"center"}}>{(date||"1").toString()}</Text>
              </View>
            </ImageBackground>
          </ImageBackground>
        </ImageBackground>
      </ImageBackground>
    </ImageBackground>
  </View>
}