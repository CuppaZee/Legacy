import * as React from 'react';
import { Appbar } from 'react-native-paper';
import LoadingButton from './LoadingButton';
import { useSelector } from 'react-redux';
import { useDimensions } from '@react-native-community/hooks';
import font from '~sections/Shared/font'

export default function Header(props) {
  var theme = useSelector(i=>i.themes[i.theme]);
  var loggedIn = useSelector(i=>i.loggedIn);
  var {width} = useDimensions().window;
  return <Appbar.Header
    statusBarHeight={props.insets.top}
    style={{
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
  </Appbar.Header>
}