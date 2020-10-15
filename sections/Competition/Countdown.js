import * as React from 'react';
import { Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import useMoment from 'utils/hooks/useMoment';

export default function Countdown ({ time }) {
  const moment = useMoment();
  const [now, setNow] = React.useState(moment());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment())
    }, 200)
    return () => clearInterval(interval);
  })
  const dur = moment.duration(moment(time).diff(now))
  const theme = useSelector(i => i.themes[i.theme])
  if (dur.valueOf() < 0) return null;
  return <View style={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap", padding: 4 }}>
    <View style={{ padding: 4 }}>
      <View style={{ backgroundColor: theme.page.bg, height: 64, width: 64, borderRadius: 8, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.page.fg, fontWeight: "bold", fontSize: 24 }}>{dur.days()}</Text>
        <Text style={{ color: theme.page.fg, fontSize: 12 }}>Days</Text>
      </View>
    </View>
    <View style={{ padding: 4 }}>
      <View style={{ backgroundColor: theme.page.bg, height: 64, width: 64, borderRadius: 8, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.page.fg, fontWeight: "bold", fontSize: 24 }}>{dur.hours()}</Text>
        <Text style={{ color: theme.page.fg, fontSize: 12 }}>Hours</Text>
      </View>
    </View>
    <View style={{ padding: 4 }}>
      <View style={{ backgroundColor: theme.page.bg, height: 64, width: 64, borderRadius: 8, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.page.fg, fontWeight: "bold", fontSize: 24 }}>{dur.minutes()}</Text>
        <Text style={{ color: theme.page.fg, fontSize: 12 }}>Minutes</Text>
      </View>
    </View>
    <View style={{ padding: 4 }}>
      <View style={{ backgroundColor: theme.page.bg, height: 64, width: 64, borderRadius: 8, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.page.fg, fontWeight: "bold", fontSize: 24 }}>{dur.seconds()}</Text>
        <Text style={{ color: theme.page.fg, fontSize: 12 }}>Seconds</Text>
      </View>
    </View>
  </View>
}