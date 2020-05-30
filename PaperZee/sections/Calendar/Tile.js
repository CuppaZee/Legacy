import * as React from 'react';
import { View, Text, ImageBackground } from 'react-native';
import font from '~sections/Shared/font';

function u(a) {
  return {uri:`https://server.cuppazee.app/Calendar/${a||"_"}.png`}
}

export default function Tile({data,date,type,theme}) {
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
        <Text style={{color:theme.page_content.fg,...font(),fontSize:12,fontWeight:"bold",textAlignVertical:"center"}}>{(date||1).toString()}</Text>
      </View>
      <View style={{flexDirection:"row"}}>
        {types.map(i=>data.includes(i.label)?<Text style={{color:i.color,...font(),fontSize:12,fontWeight:"bold",textAlignVertical:"center",letterSpacing:1}}>{i.label}</Text>:null)}
      </View>
      <View style={{flexDirection:"row"}}>
        <Text style={{color:data.includes('Z')?"rgb(235, 105, 42)":"rgb(200, 200, 200)",...font(),fontSize:10,fontWeight:"bold",textAlignVertical:"center"}}>{data.includes('Z')?"QRewZee":"Off"}</Text>
      </View>
    </View>
  }
  return <View style={{flex:1,backgroundColor:"black",borderWidth:1,borderColor:'#d3d3d3',height:40}}>
    <ImageBackground source={u(data.includes('R')?'R':null)} style={{flex:1}}>
      <ImageBackground source={u(data.includes('M')?'M':null)} style={{flex:1}}>
        <ImageBackground source={u(data.includes('L')?'L':null)} style={{flex:1}}>
          <ImageBackground source={u(data.includes('H')?'H':null)} style={{flex:1}}>
            <ImageBackground source={u(data.includes('Z')?'QRewZeeOn':'QRewZeeOff')} style={{flex:1}}>
              <View style={{flex:1,justifyContent:"center",alignItems:"center",paddingBottom:2}}>
                <Text style={{color:"white",...font(),fontSize:16,lineHeight:0,fontWeight:"bold",textAlignVertical:"center"}}>{(date||"1").toString()}</Text>
              </View>
            </ImageBackground>
          </ImageBackground>
        </ImageBackground>
      </ImageBackground>
    </ImageBackground>
  </View>
}