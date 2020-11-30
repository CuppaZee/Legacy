
import * as React from 'react';

import { View, Text, ScrollView } from 'react-native';
import { TouchableRipple, IconButton } from 'react-native-paper';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';

import { useSelector } from 'react-redux'



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';

const thList = [null, "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "th", "st", "nd", "rd", "th", "th", "th", "th", "th", "th", "th", "st"]
const yearList = [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020]
const monthList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function Wrapper({
  noWrap,
  children,
  t
}: any) {
  const theme = useSelector((i: any) => i.themes[t || i.theme]);
  if (noWrap === undefined) {



    return <Card cardStyle={{ backgroundColor: theme.page_content.bg, minWidth: 300, flex: 1, alignItems: "stretch" }}>
      {children}
    </Card>
  }



  return <View style={{ padding: 8, minWidth: 300, flex: 1, backgroundColor: theme.page_content.bg, alignItems: "stretch" }}>
    {children}
  </View>
}

export default function ({
  t,
  noWrap,
  onChange,
  onSelect,
  value
}: any) {
  const moment = useMoment();
  const theme = useSelector((i: any) => i.themes[t || i.theme]);
  const [select, setSelect] = React.useState("date");
  const [date, setDate] = React.useState(value.date());
  const [month, setMonth] = React.useState(value.month());
  const [year, setYear] = React.useState(value.year());
  const [firstLoad, setFirstLoad] = React.useState(true);
  const [shownMonth, setShownMonth] = React.useState(value.month());
  const [shownYear, setShownYear] = React.useState(value.year());

  React.useEffect(() => {
    if (firstLoad) {
      setFirstLoad(false);
    } else {
      onChange(moment({ date, month, year }))
    }
  }, [date, month, year]);

  const monthStart = moment({ date: 1, month: shownMonth, year: shownYear }).day();
  const monthEnd = moment({ date: 1, month: shownMonth, year: shownYear }).add(1, "month").subtract(1, 'day').date();

  var grid = []
  var finishedGrid = false;
  for (var i = -1; !finishedGrid; i++) {
    let row = [];
    for (var j = 1; j <= 7; j++) {
      if ((7 * i) + j < monthStart) row.push(null)
      else if ((7 * i) + j - monthStart >= monthEnd) row.push(null)
      else row.push((7 * i) + j - monthStart + 1)
    }
    if (row.find(i => i)) grid.push(row);
    if ((7 * i) + 8 - monthStart >= monthEnd) finishedGrid = true;
  }

  return (



    <Wrapper t={t} noWrap={noWrap}>



      <TouchableRipple onPress={() => setSelect(select == "month" ? "date" : "month")}>



        <Text allowFontScaling={false} style={{ fontSize: 20, lineHeight: 20, ...font("bold"), color: theme.page_content.fg }}>{value.format('Do MMMM YYYY')}</Text>
      </TouchableRipple>



      <View style={{ flexDirection: "row", width: 400, maxWidth: "100%", alignSelf: "center" }}>



        <View style={{ flex: 6, height: 32, alignItems: "center", flexDirection: "row" }}>



          <IconButton size={16} icon="chevron-left" onPress={()=>{
            if(shownMonth==0) {
              setShownMonth(11);
              setShownYear(shownYear-1);
            } else {
              setShownMonth(shownMonth-1)
            }
          }} />



          <TouchableRipple style={{ flex: 1, alignSelf: "stretch", justifyContent: "center" }} onPress={() => setSelect(select == "month" ? "date" : "month")}>



            <Text allowFontScaling={false} style={{ ...font("bold"), textAlign: "center", opacity: 0.8, color: theme.page_content.fg }}>{moment({ month: shownMonth }).format('MMMM')}</Text>
          </TouchableRipple>



          <IconButton size={16} icon="chevron-right" onPress={()=>{
            if(shownMonth==11) {
              setShownMonth(0);
              setShownYear(shownYear+1);
            } else {
              setShownMonth(shownMonth+1)
            }
          }} />
        </View>



        <View style={{ flex: 4, height: 32, alignItems: "center", flexDirection: "row" }}>



          <IconButton size={16} icon="chevron-left" onPress={()=>setShownYear(shownYear-1)} />



          <TouchableRipple style={{ flex: 1, alignSelf: "stretch", justifyContent: "center" }} onPress={() => setSelect(select == "year" ? "date" : "year")}>



            <Text allowFontScaling={false} style={{ ...font("bold"), textAlign: "center", opacity: 0.8, color: theme.page_content.fg }}>{shownYear}</Text>
          </TouchableRipple>



          <IconButton size={16} icon="chevron-right" onPress={()=>setShownYear(shownYear+1)} />
        </View>
      </View>



      {select == "date" && <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>



        {["06", "07", "08", "09", "10", "11", "12"].map(i => <View style={{ marginTop: 8, width: 36,flexGrow:1, justifyContent: "center", alignItems: "center" }}>



          <Text allowFontScaling={false} style={{ color: theme.page_content.fg, opacity: 0.8, ...font("bold"), fontSize: 12 }}>{moment('2020-07-' + i).format('ddd')}</Text>
        </View>)}
      </View>}



      {select == "date" && grid.map(row => <View style={{ flexDirection: "row", justifyContent: "space-evenly" }}>



        {row.map(i => <View style={{width:"14%",flexGrow:1,alignItems:"center"}}>



          {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
          <TouchableRipple style={{ borderRadius: 18 }} onPress={i ? () => { setDate(i); setYear(shownYear); setMonth(shownMonth) } : null}>



            <View style={{ borderColor: theme.page_content.border, borderWidth: theme.page_content.border && (i == date && month == shownMonth && year == shownYear) ? 2 : 0, height: 36, width: 36, borderRadius: 18, backgroundColor: (i == date && month == shownMonth && year == shownYear) ? theme.navigation.bg : null, justifyContent: "center", alignItems: "center" }}>



              <Text allowFontScaling={false} style={{ color: (i == date && month == shownMonth && year == shownYear) ? theme.navigation.fg : theme.page_content.fg, ...font((i == date && month == shownMonth && year == shownYear) ? "bold" : null), fontSize: (i == date && month == shownMonth && year == shownYear) ? 16 : 14 }}>{i}</Text>
            </View>
          </TouchableRipple>
        </View>)}
      </View>)}



      {select == "year" && <ScrollView style={{ maxHeight: 200 }} contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>



        {yearList.map(i => <TouchableRipple style={{ borderRadius: 8 }} onPress={() => { setShownYear(i); setSelect("date") }}>



          <View style={{ borderColor: theme.page_content.border, borderWidth: theme.page_content.border && i == shownYear ? 2 : 0, height: 36, minWidth: 85, flexGrow: 1, borderRadius: 8, backgroundColor: i == shownYear ? theme.navigation.bg : null, justifyContent: "center", alignItems: "center" }}>



            <Text allowFontScaling={false} style={{ color: i == shownYear ? theme.navigation.fg : theme.page_content.fg, ...font(i == shownYear ? "bold" : null), fontSize: i == shownYear ? 16 : 14 }}>{i}</Text>
          </View>
        </TouchableRipple>)}
      </ScrollView>}



      {select == "month" && <ScrollView style={{ maxHeight: 200 }} contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-evenly" }}>



        {monthList.map(i => <TouchableRipple style={{ borderRadius: 8 }} onPress={() => { setShownMonth(i); setSelect("date") }}>



          <View style={{ borderColor: theme.page_content.border, borderWidth: theme.page_content.border && i == shownMonth ? 2 : 0, height: 36, minWidth: 85, flexGrow: 1, borderRadius: 8, backgroundColor: i == shownMonth ? theme.navigation.bg : null, justifyContent: "center", alignItems: "center" }}>



            <Text allowFontScaling={false} style={{ color: i == shownMonth ? theme.navigation.fg : theme.page_content.fg, ...font(i == shownMonth ? "bold" : null), fontSize: i == shownMonth ? 16 : 14 }}>{moment({ month: i }).format('MMMM')}</Text>
          </View>
        </TouchableRipple>)}
      </ScrollView>}
    </Wrapper>
  );
}