
import * as React from 'react';

import { Text, View } from 'react-native';

import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';

export default function Countdown ({
  time,
  days,
  hours,
  minutes,
  seconds
}: any) {
  const moment = useMoment();
  const [now, setNow] = React.useState(moment());
  React.useEffect(() => {
    const interval = setInterval(() => {
      setNow(moment())
    }, 200)
    return () => clearInterval(interval);
  })
  const dur = moment.duration(moment(time).diff(now))
  const theme = useSelector((i: any) => i.themes[i.theme])
  if (dur.valueOf() < 0) return null;
  return <View style={{ flexDirection: "row", justifyContent: "center", flexWrap: "wrap", padding: 4 }}>
    {(days ?? true) && <View style={{ padding: 4 }}>
      <View style={{ backgroundColor: theme.page.bg, height: 64, width: 64, borderRadius: 8, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.page.fg, fontWeight: "bold", fontSize: 24 }}>{dur.days()}</Text>
        <Text style={{ color: theme.page.fg, fontSize: 12 }}>Days</Text>
      </View>
    </View>}
    {(hours ?? true) && <View style={{ padding: 4 }}>
      <View style={{ backgroundColor: theme.page.bg, height: 64, width: 64, borderRadius: 8, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.page.fg, fontWeight: "bold", fontSize: 24 }}>{dur.hours()}</Text>
        <Text style={{ color: theme.page.fg, fontSize: 12 }}>Hours</Text>
      </View>
    </View>}
    {(minutes ?? true) && <View style={{ padding: 4 }}>
      <View style={{ backgroundColor: theme.page.bg, height: 64, width: 64, borderRadius: 8, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.page.fg, fontWeight: "bold", fontSize: 24 }}>{dur.minutes()}</Text>
        <Text style={{ color: theme.page.fg, fontSize: 12 }}>Minutes</Text>
      </View>
    </View>}
    {(seconds ?? true) && <View style={{ padding: 4 }}>
      <View style={{ backgroundColor: theme.page.bg, height: 64, width: 64, borderRadius: 8, justifyContent: "center", alignItems: "center" }}>
        <Text style={{ color: theme.page.fg, fontWeight: "bold", fontSize: 24 }}>{dur.seconds()}</Text>
        <Text style={{ color: theme.page.fg, fontSize: 12 }}>Seconds</Text>
      </View>
    </View>}
  </View>
}