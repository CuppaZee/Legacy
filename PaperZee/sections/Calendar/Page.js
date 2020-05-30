import * as React from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import moment from 'moment';
import Calendar from '~sections/Calendar/Calendar';
import Card from '~sections/Shared/Card';
import { IconButton } from 'react-native-paper';

export default function CalendarScreen() {
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
      <View style={{maxWidth:400,width:"100%"}}>
        <Card noPad>
          <View style={{borderTopLeftRadius:8,borderTopRightRadius:8,flexDirection:"row",alignItems:"center",backgroundColor:(theme.clanCardHeader||theme.navigation).bg}}>
            <IconButton icon={type=="default"?"format-text":"view-grid"} color={(theme.clanCardHeader||theme.navigation).fg} onPress={()=>setType(type=="default"?"alt":"default")}/>
            <IconButton icon="chevron-left" color={(theme.clanCardHeader||theme.navigation).fg} onPress={remove}/>
            <Text style={{flex:1,textAlign:"center",color:(theme.clanCardHeader||theme.navigation).fg}}>{moment({month,year}).format('MMMM YYYY')}</Text>
            <IconButton icon="chevron-right" color={(theme.clanCardHeader||theme.navigation).fg} onPress={add}/>
          </View>
          <Calendar month={month} year={year} theme={theme} type={type}/>
        </Card>
      </View>
    </View>
  );
}