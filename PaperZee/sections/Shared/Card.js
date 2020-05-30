import * as React from 'react';
import { TouchableRipple, Surface } from 'react-native-paper';
import { useSelector } from 'react-redux';

export default function (props) {
  var theme = useSelector(i=>i.themes[i.theme]);
  return (
    <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" style={{ flex: props.noFlex===undefined?1:null, borderRadius: 8 }} onPress={props.onPress}>
      <Surface style={{ ...(theme.page_content.border?{borderWidth:1,borderColor:theme.page_content.border}:{}), flex: props.noFlex===undefined?1:null, elevation: theme.page_content.border?0:4, padding: props.noPad === undefined ? 8 : 0, borderRadius: 8, backgroundColor: theme.page_content.bg, ...(props.cardStyle||{}) }}>
        {props.children}
      </Surface>
    </TouchableRipple>
  )
}