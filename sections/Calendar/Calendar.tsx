// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { View, Image } from 'react-native';
import { Text } from 'react-native-paper';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Tile' was resolved to 'C:/Users/samst/De... Remove this comment to see the full error message
import OldTile, {NewTile} from './Tile';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module 'utils/db/Calendar.json'. Consi... Remove this comment to see the full error message
import CalData from 'utils/db/Calendar.json';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';

export default function Calendar({
  style,
  month,
  year,
  type="default"
}: any) {
  const {t} = useTranslation();
  const moment = useMoment();
  const now = moment();
  const monthStart = moment({date:1,month:month??now.month(),year:year??now.year()}).day();
  const monthEnd = moment({date:1,month:month??now.month(),year:year??now.year()}).add(1,"month").subtract(1,'day').date();
  const newDesign = (month > 5 && year === 2020) || year > 2020;
  const Tile = newDesign?NewTile:OldTile

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

  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <View style={style}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    {type=="default"&&!newDesign&&<View style={{flexDirection:"row"}}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {types.map(i=><View style={{flex:1,borderWidth:1,borderColor:'#d3d3d3',backgroundColor:i.color,justifyContent:"center",alignItems:"center",height:60}}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Image source={getIcon(i.type)} style={{height:32,width:32}}/>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text allowFontScaling={false} style={{fontSize:12,color:"white"}}>{i.label}</Text>
      </View>)}
    </View>}
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <View style={{flexDirection:"row"}}>
      {[
        t("calendar:days.monday"),
        t("calendar:days.tuesday"),
        t("calendar:days.wednesday"),
        t("calendar:days.thursday"),
        t("calendar:days.friday"),
        t("calendar:days.saturday"),
        t("calendar:days.sunday")
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      ].map(i=><View style={{flex:1,borderWidth:1,borderColor:'#d3d3d3',justifyContent:"center",alignItems:"center",height:40}}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text allowFontScaling={false} style={{fontSize:16}}>{i}</Text>
      </View>)}
    </View>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    {grid.map(row=><View style={{flexDirection:"row"}}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {row.map(day=>day?<Tile type={type} data={CalData?.[year??now.year()]?.[month??now.month()]?.[day-1]??''} date={day}/>:<View style={{flex:1,borderWidth:1,borderColor:'#d3d3d3'}}/>)}
    </View>)}
  </View>
}