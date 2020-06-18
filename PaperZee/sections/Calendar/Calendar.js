import * as React from 'react';
import { View, Text, Image } from 'react-native';
import Tile from './Tile';
import CalData from 'utils/db/Calendar.json';
import useMoment from 'utils/hooks/useMoment';
import { useTranslation } from 'react-i18next';

export default function Calendar({style,month,year,theme,type="default"}) {
  const {t} = useTranslation();
  const moment = useMoment();
  const now = moment();
  const monthStart = moment({date:1,month:month??now.month(),year:year??now.year()}).day();
  const monthEnd = moment({date:1,month:month??now.month(),year:year??now.year()}).add(1,"month").subtract(1,'day').date();

  var grid = []
  var finishedGrid = false;
  for(var i = -1;!finishedGrid;i++) {
    let row = [];
    for(var j = 1;j <= 7;j++) {
      if((7*i)+j<monthStart) row.push(null)
      else if((7*i)+j-monthStart>=monthEnd) row.push(null)
      else row.push((7*i)+j-monthStart+1)
    }
    if(row.find(i=>i)) grid.push(row);
    if((7*i)+8-monthStart>=monthEnd) finishedGrid = true;
  }

  var types = [
    {label:"Rob",type:"flatrob",color:"rgb(0, 148, 68)"},
    {label:"Matt",type:"flatmatt",color:"rgb(237, 32, 36)"},
    {label:"Lou",type:"flatlou",color:"rgb(235, 0, 139)"},
    {label:"Hammock",type:"flathammock",color:"rgb(35, 117, 245)"},
    {label:"QRewZee",type:"qrewzee",color:"rgb(235, 105, 42)"},
  ]

  return <View style={style}>
    {type=="default"&&<View style={{flexDirection:"row"}}>
      {types.map(i=><View style={{flex:1,borderWidth:1,borderColor:'#d3d3d3',backgroundColor:i.color,justifyContent:"center",alignItems:"center",height:60}}>
        <Image source={{uri: `https://munzee.global.ssl.fastly.net/images/pins/${i.type}.png`}} style={{height:32,width:32}}/>
        <Text allowFontScaling={false} style={{fontSize:12,color:"white"}}>{i.label}</Text>
      </View>)}
    </View>}
    <View style={{flexDirection:"row"}}>
      {[
        t("calendar:days.monday"),
        t("calendar:days.tuesday"),
        t("calendar:days.wednesday"),
        t("calendar:days.thursday"),
        t("calendar:days.friday"),
        t("calendar:days.saturday"),
        t("calendar:days.sunday")
      ].map(i=><View style={{flex:1,borderWidth:1,borderColor:'#d3d3d3',justifyContent:"center",alignItems:"center",height:40}}>
        <Text allowFontScaling={false} style={{fontSize:16,color:theme.page_content.fg}}>{i}</Text>
      </View>)}
    </View>
    {grid.map(row=><View style={{flexDirection:"row"}}>
      {row.map(day=>day?<Tile theme={theme} type={type} data={CalData?.[year??now.year()]?.[month??now.month()]?.[day-1]??''} date={day}/>:<View style={{flex:1,borderWidth:1,borderColor:'#d3d3d3'}}/>)}
    </View>)}
  </View>
}