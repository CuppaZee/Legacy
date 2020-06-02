import * as React from 'react';
import { View, Text, ImageBackground, ActivityIndicator } from 'react-native';
import font from '~sections/Shared/font';

function u(a) {
  return a?{uri:`https://server.cuppazee.app/Cal/${a||"_"}.png`}:null
}

export default function Tile({data,date,type,theme,header,extraText}) {
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
        <Text style={{color:theme.page_content.fg,...font("bold"),fontSize:12,textAlignVertical:"center"}}>{(date||1).toString()}</Text>
      </View>
      <View style={{flexDirection:"row"}}>
        {types.map(i=>data.includes(i.label)?<Text style={{color:i.color,...font("bold"),fontSize:12,textAlignVertical:"center",letterSpacing:1}}>{i.label}</Text>:null)}
      </View>
      <View style={{flexDirection:"row"}}>
        <Text style={{color:data.includes('Z')?"rgb(235, 105, 42)":"rgb(200, 200, 200)",...font("bold"),fontSize:10,textAlignVertical:"center"}}>{data.includes('Z')?"QRewZee":"Off"}</Text>
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
                {extraText&&<Text style={{color:"white",...font("bold"),fontSize:16,textAlignVertical:"center"}}>{extraText}</Text>}
                <Text style={{color:"white",...font("bold"),fontSize:16,textAlignVertical:"center"}}>{(date||"1").toString()}</Text>
              </View>
            </ImageBackground>
          </ImageBackground>
        </ImageBackground>
      </ImageBackground>
    </ImageBackground>
  </View>
}