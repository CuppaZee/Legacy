import * as React from 'react';
import { Appbar, TouchableRipple } from 'react-native-paper';
import { Image, View } from 'react-native';
import LoadingButton from './LoadingButton';
import { useSelector } from 'react-redux';
import { useDimensions } from '@react-native-community/hooks';
import font from '~sections/Shared/font'
import Tile from '~sections/Calendar/Tile';
import CalData from '~sections/DB/Calendar.json'
import moment from 'moment';
import 'moment-timezone';
import { useNavigation } from '@react-navigation/native';

export default function Header(props) {
  var nav = useNavigation();
  var theme = useSelector(i=>i.themes[i.theme]);
  var loggedIn = useSelector(i=>i.loggedIn);
  var {width} = useDimensions().window;
  var [now,setNow] = React.useState(moment(0));
  React.useEffect(()=>{
    var x = setInterval(()=>{
      setNow(moment().tz('America/Chicago'))
    },100)
    return ()=>clearInterval(x);
  },[])
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
      title={props?.scene?.descriptor?.options?.title??props.scene?.route?.name}
    />
    <LoadingButton />
    <TouchableRipple onPress={()=>nav.navigate('Calendar')} style={{width:width>600?80:60}}>
      <Tile header={true} theme={theme} date={now.format(width>600?'HH:mm:ss':'HH:mm')} extraText={now.format('DD/MM')} data={CalData?.[now.year()]?.[now.month()]?.[now.date()-1]??''} />
    </TouchableRipple>
    
    {/* <Appbar.Action icon={()=><Image style={{height:36,width:36,marginTop:-6,marginLeft:-6}} source={{uri:'https://munzee.global.ssl.fastly.net/images/avatars/ua2p5m.png'}} />} onPress={()=>{}} /> */}
  </Appbar.Header>
}