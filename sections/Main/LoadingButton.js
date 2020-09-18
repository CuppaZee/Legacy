import React from "react";
import { IconButton, ProgressBar, useTheme } from "react-native-paper"
import { useDispatch, useSelector } from "react-redux";
import r from "utils/store";

export default function () {
  var dispatch = useDispatch();
  var loading = useSelector(i => i.loading > 0);
  return (
    loading ? null : <IconButton
      onPress={() => dispatch(r.refresh())}
      icon="refresh"
    />
  )
}

export function LoadingBar() {
  var loading = useSelector(i => i.loading > 0);
  var theme = useTheme();
  return (
    loading ? <ProgressBar indeterminate={true} style={{ backgroundColor: theme.colors.background, marginTop: -4 }} color={theme.colors.text} /> : null
  )
}