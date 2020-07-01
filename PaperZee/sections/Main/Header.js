import * as React from 'react';
import { Appbar, TouchableRipple } from 'react-native-paper';
import { View, Text } from 'react-native';
import LoadingButton from './LoadingButton';
import { useSelector } from 'react-redux';
import { useDimensions } from '@react-native-community/hooks';
import font from 'sections/Shared/font'
import Tile from 'sections/Calendar/Tile';
import CalData from 'utils/db/Calendar.json'
import useMoment from 'utils/hooks/useMoment';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import { useTranslation } from 'react-i18next';
import categories from 'utils/db/categories.json'
import getType from 'utils/db/types'

function MHQTime() {
  var moment = useMoment();
  var theme = useSelector(i=>i.themes[i.theme]);
  var [now,setNow] = React.useState(moment().tz('America/Chicago'));
  var {width} = useDimensions().window;
  React.useEffect(()=>{
    var x = setInterval(()=>{
      setNow(moment().tz('America/Chicago'))
    },100)
    return ()=>clearInterval(x);
  },[])
  return <View style={{alignSelf:"stretch",justifyContent:"center",alignItems:"center",paddingHorizontal:8}}>
    <Text allowFontScaling={false} style={{color:theme.navigation.fg,fontSize:14,...font("bold")}}>{now.format('DD/MM')}</Text>
    <Text allowFontScaling={false} style={{color:theme.navigation.fg,fontSize:16,...font("bold")}}>{now.format(width>600?'HH:mm:ss':'HH:mm')}</Text>
  </View>
}

export default function Header(props) {
  var {t} = useTranslation();
  var moment = useMoment();
  var theme = useSelector(i=>i.themes[i.theme]);
  var loggedIn = useSelector(i=>i.loggedIn);
  var {width} = useDimensions().window;
  let params = props.scene?.route?.params || {};
  let name = props.scene?.route?.name;
  let title;
  let subtitle;
  let clanData;
  if(name === 'DBType') {
    title = getType(params.munzee)?.name??params.munzee;
    subtitle = 'screens:'+name;
  } else if(name === 'DBCategory') {
    title = categories.find(i=>i.id==params.category)?.name;
    subtitle = 'screens:'+name;
  } else if(name.includes('Search')) {
    title = 'screens:'+name;
  } else if(name.startsWith('UserCapturesCategory')) {
    title = params.username;
    subtitle = 'screens:'+name;
    params.category_name = categories.find(i=>i.id==params.category)?.name
  } else if(name.startsWith('User')) {
    title = params.username;
    subtitle = 'screens:'+name;
  } else if(name.startsWith('ClanRequirements')) {
    title = params.gameid;
    subtitle = 'screens:'+name;
    clanData = "requirements"
  } else if(name.startsWith('Clan')) {
    title = params.clanid;
    subtitle = 'screens:'+name;
    clanData = "clan";
  } else {
    title = 'screens:'+name;
  }
  var clanName = useAPIRequest({
    clan: {
      endpoint: 'clan/v2',
      data: {clan_id:Number(title)},
      function: i=>i?.details?.name
    },
    requirements: {
      endpoint: 'clan/rewards/v1',
      cuppazee: true,
      data: {clan_id:1349,game_id:title},
      function: i=>moment(i?.battle.title.slice(10)).format('MMMM YYYY')
    }
  }[clanData]||null);
  if(clanName) title = clanName;
  return <Appbar.Header
    statusBarHeight={0}
    style={{
      marginTop: props.insets.top,
      backgroundColor: theme.navigation.bg,
      paddingLeft: props.insets.left,
      paddingRight: props.insets.right,
    }}
  >
    {width<=1000&&loggedIn&&<Appbar.Action icon="menu" onPress={()=>props.navigation.toggleDrawer()} />}
    {!(props.route?.name == "Home" || !loggedIn || props.navigation.dangerouslyGetState().index<1)&&<Appbar.BackAction
      onPress={()=>props.navigation.pop()}
    />}
    <Appbar.Content
      titleStyle={{...font()}}
      subtitleStyle={{...font()}}
      title={t(title,params)}
      subtitle={subtitle?t(subtitle,params):null}
    />
    <LoadingButton />
    <MHQTime />
    {/* <TouchableRipple onPress={()=>nav.navigate('Calendar')} style={{width:width>600?80:60,height:"100%"}}>
      <Tile header={true} theme={theme} date={now.format(width>600?'HH:mm:ss':'HH:mm')} extraText={now.format('DD/MM')} data={CalData?.[now.year()]?.[now.month()]?.[now.date()-1]??''} />
    </TouchableRipple> */}
    
    {/* <Appbar.Action icon={()=><Image style={{height:36,width:36,marginTop:-6,marginLeft:-6}} source={{uri:'https://munzee.global.ssl.fastly.net/images/avatars/ua2p5m.png'}} />} onPress={()=>{}} /> */}
  </Appbar.Header>
}