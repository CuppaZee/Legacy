import * as React from 'react';
import {View,Text,ScrollView} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import moment from 'moment';
import {useSelector} from 'react-redux'
import Card from '~sections/Shared/Card';
import font from '~sections/Shared/font';

const thList = [null,"st","nd","rd","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","th","st","nd","rd","th","th","th","th","th","th","th","st"]
const yearList = [2011,2012,2013,2014,2015,2016,2017,2018,2019,2020]
const monthList = [0,1,2,3,4,5,6,7,8,9,10,11]
const months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

function Wrapper({noWrap,children,t}) {
  const theme = useSelector(i=>i.themes[t||i.theme]);
  if(noWrap===undefined) {
    return <Card cardStyle={{width:300,backgroundColor:theme.page_content.bg,alignItems:"stretch"}}>
      {children}
    </Card>
  }
  return <View style={{padding:8,width:300,backgroundColor:theme.page_content.bg,alignItems:"stretch"}}>
    {children}
  </View>
}

export default function ({t,noWrap,onChange,value}) {
  const theme = useSelector(i=>i.themes[t||i.theme]);
  const [select,setSelect] = React.useState("date");
  const [date,setDate] = React.useState(value.date());
  const [month,setMonth] = React.useState(value.month());
  const [year,setYear] = React.useState(value.year());
  const [firstLoad,setFirstLoad] = React.useState(true);

  React.useEffect(()=>{
    if(firstLoad) {
      setFirstLoad(false);
    } else {
      onChange(moment({date,month,year}))
    }
  },[date,month,year]);

  const monthStart = moment({date:1,month,year}).day();
  const monthEnd = moment({date:1,month,year}).add(1,"month").subtract(1,'day').date();

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

  return (
    <Wrapper t={t} noWrap={noWrap}>
      <TouchableRipple onPress={()=>setSelect(select=="year"?"date":"year")}>
        <Text allowFontScaling={false} style={{...font("bold"),lineHeight:12,opacity:0.8,color:theme.page_content.fg}}>{year}</Text>
      </TouchableRipple>
      <TouchableRipple onPress={()=>setSelect(select=="month"?"date":"month")}>
        <Text allowFontScaling={false} style={{fontSize:20,...font("bold"),color:theme.page_content.fg}}>{date}{thList[date]} {months[month]||"lol"}</Text>
      </TouchableRipple>
      {select=="date"&&<View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
        {["Mon","Tue","Wed","Thu","Fri","Sat","Sun"].map(i=><View style={{marginTop:8,width:36,justifyContent:"center",alignItems:"center"}}>
          <Text allowFontScaling={false} style={{color:theme.page_content.fg,opacity:0.8,...font("bold"),fontSize:12}}>{i}</Text>
        </View>)}
      </View>}
      {select=="date"&&grid.map(row=><View style={{flexDirection:"row",justifyContent:"space-evenly"}}>
        {row.map(i=><TouchableRipple style={{borderRadius:18}} onPress={i?()=>setDate(i):null}>
          <View style={{borderColor:theme.page_content.border,borderWidth:theme.page_content.border&&i==date?2:0,height:36,width:36,borderRadius:18,backgroundColor:i==date?theme.navigation.bg:null,justifyContent:"center",alignItems:"center"}}>
            <Text allowFontScaling={false} style={{color:i==date?theme.navigation.fg:theme.page_content.fg,...font(i==date?"bold":null),fontSize:i==date?16:14}}>{i}</Text>
          </View>
        </TouchableRipple>)}
      </View>)}
      {select=="year"&&<ScrollView style={{maxHeight:200}} contentContainerStyle={{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly"}}>
        {yearList.map(i=><TouchableRipple style={{borderRadius:8}} onPress={()=>{setYear(i);setSelect("date")}}>
          <View style={{borderColor:theme.page_content.border,borderWidth:theme.page_content.border&&i==year?2:0,height:36,minWidth:85,flexGrow:1,borderRadius:8,backgroundColor:i==year?theme.navigation.bg:null,justifyContent:"center",alignItems:"center"}}>
            <Text allowFontScaling={false} style={{color:i==year?theme.navigation.fg:theme.page_content.fg,...font(i==year?"bold":null),fontSize:i==year?16:14}}>{i}</Text>
          </View>
        </TouchableRipple>)}
      </ScrollView>}
      {select=="month"&&<ScrollView style={{maxHeight:200}} contentContainerStyle={{flexDirection:"row",flexWrap:"wrap",justifyContent:"space-evenly"}}>
        {monthList.map(i=><TouchableRipple style={{borderRadius:8}} onPress={()=>{setMonth(i);setSelect("date")}}>
          <View style={{borderColor:theme.page_content.border,borderWidth:theme.page_content.border&&i==month?2:0,height:36,minWidth:85,flexGrow:1,borderRadius:8,backgroundColor:i==month?theme.navigation.bg:null,justifyContent:"center",alignItems:"center"}}>
            <Text allowFontScaling={false} style={{color:i==month?theme.navigation.fg:theme.page_content.fg,...font(i==month?"bold":null),fontSize:i==month?16:14}}>{months[i]}</Text>
          </View>
        </TouchableRipple>)}
      </ScrollView>}
    </Wrapper>
  );
}