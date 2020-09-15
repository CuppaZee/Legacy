import React from "react";
import { IconButton, ProgressBar } from "react-native-paper"
import {useDispatch,useSelector} from "react-redux";
import r from "utils/store";

export default function () {
  var dispatch = useDispatch();
  var loading = useSelector(i=>i.loading>0);
  var theme = useSelector(i=>i.themes[i.theme]);
  return (
    loading ? null : <IconButton
      onPress={() => dispatch(r.refresh())}
      color={theme.navigation.fg}
      icon="refresh"
    />
  )
}

export function LoadingBar () {
  var dispatch = useDispatch();
  var loading = useSelector(i=>i.loading>0);
  var theme = useSelector(i=>i.themes[i.theme]);
  return (
    loading ? <ProgressBar indeterminate={true} style={{ backgroundColor: theme.navigation.bg, marginTop: -4 }} color={theme.navigation.fg} /> : null
  )
}