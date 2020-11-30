
import React from "react";
import { IconButton, ProgressBar, useTheme } from "react-native-paper"

import { useDispatch, useSelector } from "react-redux";



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/store' or its correspond... Remove this comment to see the full error message
import r from "utils/store";

export default function () {
  var dispatch = useDispatch();
  var loading = useSelector((i: any) => i.loading > 0);
  return (



    loading ? null : <IconButton
      color="white"
      onPress={() => dispatch(r.refresh())}
      icon="refresh"
    />
  )
}

export function LoadingBar() {
  var loading = useSelector((i: any) => i.loading > 0);
  var theme = useTheme();
  return (



    loading ? <ProgressBar indeterminate={true} style={{ backgroundColor: theme.colors.primary, marginTop: -4 }} color="white" /> : null
  )
}