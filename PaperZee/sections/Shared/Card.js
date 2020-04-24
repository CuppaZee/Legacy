import * as React from 'react';
import { View } from 'react-native';
import { TouchableRipple, Surface } from 'react-native-paper';
import { useSelector } from 'react-redux';

// const x = false;

export default function (props) {
  var theme = useSelector(i=>i.themes[i.theme]);
  var x = false;
  if (x) return (
    <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" style={{ borderRadius: 8 }} onPress={props.onPress}>
      <View style={{ padding: props.noPad === undefined ? 8 : 0, borderWidth: 0, borderColor: "black", borderRadius: 8, backgroundColor: theme.page_content.bg }}>
        {props.children}
      </View>
    </TouchableRipple>
  )
  return (
    // height: '100%', 
    <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" style={{ flex: 1, borderRadius: 8 }} onPress={props.onPress}>
      <Surface style={{ ...(theme.page_content.border?{borderWidth:1,borderColor:theme.page_content.border}:{}), flex: 1, elevation: theme.page_content.border?0:4, padding: props.noPad === undefined ? 8 : 0, borderRadius: 8, backgroundColor: theme.page_content.bg, ...(props.cardStyle||{}) }}>
        {props.children}
      </Surface>
    </TouchableRipple>
  )
}