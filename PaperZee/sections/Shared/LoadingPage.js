import * as React from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

export default function (props) {
  var theme = useSelector(i=>i.themes[i.theme]);
  return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme[props.x??'page'].bg }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  )
}