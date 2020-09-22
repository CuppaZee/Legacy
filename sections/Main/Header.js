import * as React from 'react';
import { Appbar, Text, useTheme, Provider as PaperProvider } from 'react-native-paper';
import { View } from 'react-native';
import LoadingButton, { LoadingBar } from './LoadingButton';
import { useSelector } from 'react-redux';
import { useDimensions } from '@react-native-community/hooks';
import font from 'sections/Shared/font'
import useMoment from 'utils/hooks/useMoment';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import { useTranslation } from 'react-i18next';
import categories from 'utils/db/categories.json'
import getType from 'utils/db/types'

function MHQTime({theme}) {
  var moment = useMoment();
  var [now, setNow] = React.useState(moment().tz('America/Chicago'));
  var { width } = useDimensions().window;
  React.useEffect(() => {
    var x = setInterval(() => {
      setNow(moment().tz('America/Chicago'))
    }, 100)
    return () => clearInterval(x);
  }, [])
  return <View style={{ alignSelf: "stretch", justifyContent: "center", alignItems: "center", paddingHorizontal: 8 }}>
    <Text theme={theme} allowFontScaling={false} style={{ fontSize: 14, ...font("bold") }}>{now.format('DD/MM')}</Text>
    <Text theme={theme} allowFontScaling={false} style={{ fontSize: 16, ...font("bold") }}>{now.format(width > 600 ? 'HH:mm:ss' : 'HH:mm')}</Text>
  </View>
}

const teamNames = {
  "cap-a-lot": "Camp Cap-A-Lot",
  "qrantine": "Camp QRantine",
  "freez": "Camp FrEEZ",
  "kennezee": "Camp KenneZee",
}
const weekNames = {
  overall: "Overall",
  week1: "Week 1",
  week2: "Week 2",
  week3: "Week 3",
  week4: "Week 4",
}

export default function Header(props) {
  var { t } = useTranslation();
  var moment = useMoment();
  var theme = useTheme();
  var loggedIn = useSelector(i => i.loggedIn);
  var { width } = useDimensions().window;
  let params = props.scene?.route?.params || {};
  let name = props.scene?.route?.name;
  let title;
  let subtitle;
  let clanData;
  if (name === 'AllCampWeeks') {
    title = "Camps Leaderboard";
  } else if (name === 'AllCampLeaderboard') {
    title = weekNames[params.week] + " Leaderboard";
  } else if (name === 'CampLeaderboard') {
    title = teamNames[params.team];
  } else if (name === 'DBType') {
    title = getType(params.munzee)?.name ?? params.munzee;
    subtitle = 'screens:' + name;
  } else if (name === 'DBCategory') {
    title = categories.find(i => i.id == params.category)?.name;
    subtitle = 'screens:' + name;
  } else if (name.includes('Search')) {
    title = 'screens:' + name;
  } else if (name.startsWith('UserCapturesCategory')) {
    title = params.username;
    subtitle = 'screens:' + name;
    params.category_name = categories.find(i => i.id == params.category)?.name
  } else if (name.startsWith('User')) {
    title = params.username;
    subtitle = 'screens:' + name;
  } else if (name.startsWith('ClanRequirements')) {
    title = moment({ year: params.year, month: params.month - 1 }).format('MMMM YYYY');
    subtitle = 'screens:' + name;
  } else if (name.startsWith('Clan')) {
    title = params.clanid;
    subtitle = 'screens:' + name;
    clanData = "clan";
  } else {
    title = 'screens:' + name;
  }
  var clanName = useAPIRequest({
    clan: {
      endpoint: 'clan/v2',
      data: { clan_id: Number(title) },
      function: i => i?.details?.name
    }
  }[clanData] || null);
  if (clanName) title = clanName;
  React.useEffect(()=>{
    props.navigation.setOptions({
      title: subtitle ? `${t(title, params)} - ${t(subtitle, params)} - CuppaZee` : `${t(title, params)} - CuppaZee`
    })
  }, [title,subtitle]);
  return <View>
      <Appbar.Header theme={theme.drawer}>
        {width <= 1000 && loggedIn && <Appbar.Action theme={theme.drawer} icon="menu" onPress={() => props.navigation.toggleDrawer()} />}
        {!(props.route?.name == "Home" || props.navigation.dangerouslyGetState().index < 1) && <Appbar.BackAction theme={theme.drawer}
          onPress={() => props.navigation.pop()}
        />}
        <Appbar.Content theme={theme.drawer}
          title={t(title, params)}
          subtitle={subtitle ? t(subtitle, params) : null}
        />
        <LoadingButton theme={theme.drawer} />
        <MHQTime theme={theme.drawer} />
        {/* <TouchableRipple onPress={()=>nav.navigate('Calendar')} style={{width:width>600?80:60,height:"100%"}}>
      <Tile header={true} theme={theme} date={now.format(width>600?'HH:mm:ss':'HH:mm')} extraText={now.format('DD/MM')} data={CalData?.[now.year()]?.[now.month()]?.[now.date()-1]??''} />
    </TouchableRipple> */}

        {/* <Appbar.Action icon={()=><Image style={{height:36,width:36,marginTop:-6,marginLeft:-6}} source={{uri:'https://munzee.global.ssl.fastly.net/images/avatars/ua2p5m.png'}} />} onPress={()=>{}} /> */}
      </Appbar.Header>
      <LoadingBar theme={theme.drawer} />
  </View>
  {/* </PaperProvider> */}
}