// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { View, StyleSheet, ScrollView } from 'react-native';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ScrollView style={styles.page} contentContainerStyle={styles.pageContent}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={styles.cardWrapper}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Surface style={styles.card}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{borderTopLeftRadius:4,borderTopRightRadius:4,flexDirection:"row",alignItems:"center"}}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <IconButton icon={type=="default"?"format-text":"view-grid"} onPress={()=>setType(type=="default"?"alt":"default")}/>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <IconButton icon="chevron-left" onPress={remove}/>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} style={{flex:1,textAlign:"center"}}>{moment({month,year}).format('MMMM YYYY')}</Text>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <IconButton icon="chevron-right" onPress={add}/>
          </View>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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