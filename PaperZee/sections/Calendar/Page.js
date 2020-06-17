import * as React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import Calendar from '~sections/Calendar/Calendar';
import Card from '~sections/Shared/Card';
import { IconButton } from 'react-native-paper';
import useMoment from '~hooks/useMoment';

export default function CalendarScreen() {
  var moment = useMoment()
  var theme = useSelector(i=>i.themes[i.theme]);
  var [month,setMonth] = React.useState(moment().month())
  var [year,setYear] = React.useState(moment().year())

  function add() {
    if(month==11) {
      setMonth(0);
      setYear(year+1);
    } else {
      setMonth(month+1)
    }
  }
  function remove() {
    if(month==0) {
      setMonth(11);
      setYear(year-1);
    } else {
      setMonth(month-1)
    }
  }

  var [type,setType] = React.useState('default');

  return (
    <View style={{backgroundColor:theme.page.bg,flex:1,padding:4,justifyContent:"center",alignItems:"center"}}>
      <View style={{width:"100%",maxWidth:400}}>
        <Card noFlex noPad={true}>
          <View style={{flexDirection:"column"}}>
            <View style={{borderTopLeftRadius:8,borderTopRightRadius:8,flexDirection:"row",alignItems:"center",backgroundColor:(theme.clanCardHeader||theme.navigation).bg}}>
              <IconButton icon={type=="default"?"format-text":"view-grid"} color={(theme.clanCardHeader||theme.navigation).fg} onPress={()=>setType(type=="default"?"alt":"default")}/>
              <IconButton icon="chevron-left" color={(theme.clanCardHeader||theme.navigation).fg} onPress={remove}/>
              <Text allowFontScaling={false} style={{flex:1,textAlign:"center",color:(theme.clanCardHeader||theme.navigation).fg}}>{moment({month,year}).format('MMMM YYYY')}</Text>
              <IconButton icon="chevron-right" color={(theme.clanCardHeader||theme.navigation).fg} onPress={add}/>
            </View>
            <Calendar month={month} year={year} theme={theme} type={type}/>
          </View>
        </Card>
      </View>
    </View>
  );
}