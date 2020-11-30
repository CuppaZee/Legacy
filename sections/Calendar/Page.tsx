
import * as React from 'react';

import { View, StyleSheet, ScrollView } from 'react-native';

import { useSelector } from 'react-redux';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Calendar/Calendar' or... Remove this comment to see the full error message
import Calendar from 'sections/Calendar/Calendar';
import { IconButton, Surface, Text } from 'react-native-paper';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';

export default function CalendarScreen() {
  var moment = useMoment()
  var theme = useSelector((i: any) => i.themes[i.theme]);
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



    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>



      <View style={styles.cardWrapper}>



        <Surface style={styles.card}>



          <View style={{borderTopLeftRadius:4,borderTopRightRadius:4,flexDirection:"row",alignItems:"center"}}>



            <IconButton icon={type=="default"?"format-text":"view-grid"} onPress={()=>setType(type=="default"?"alt":"default")}/>



            <IconButton icon="chevron-left" onPress={remove}/>



            <Text allowFontScaling={false} style={{flex:1,textAlign:"center"}}>{moment({month,year}).format('MMMM YYYY')}</Text>



            <IconButton icon="chevron-right" onPress={add}/>
          </View>



          <Calendar month={month} year={year} type={type}/>
        </Surface>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
  },
  pageContent: {
    flex: 1,
    padding: 4,
    justifyContent: "center",
    alignItems: "center"
  },
  cardWrapper: {
    width: "100%",
    maxWidth: 400,
  },
  card: {
    borderRadius: 4,
    flexDirection: "column",
  }
})