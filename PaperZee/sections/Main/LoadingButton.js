import React from "react";
import { ActivityIndicator, View } from "react-native"
import { IconButton } from "react-native-paper"
import {useDispatch,useSelector} from "react-redux";
import r from "utils/store";

export default function () {
  var dispatch = useDispatch();
  var loading = useSelector(i=>i.loading>0);
  var theme = useSelector(i=>i.themes[i.theme]);
  return (
    loading ? <View style={{width:48,justifyContent:"center"}}><ActivityIndicator size="small" color={theme.navigation.fg} /></View> : <IconButton
      onPress={() => dispatch(r.refresh())}
      color={theme.navigation.fg}
      icon="refresh"
    />
  )
}