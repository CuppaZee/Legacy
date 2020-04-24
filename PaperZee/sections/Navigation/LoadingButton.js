import React from "react";
import { ActivityIndicator, View } from "react-native"
import { IconButton } from "react-native-paper"
import {useDispatch,useSelector} from "react-redux";
import r from "~store/index";

export default function () {
  var dispatch = useDispatch();
  var loading = useSelector(i=>i.loading>0);
  return (
    loading ? <View style={{width:48,justifyContent:"center"}}><ActivityIndicator size="small" color="#ffffff" /></View> : <IconButton
      onPress={() => dispatch(r.refresh())}
      color="#fff"
      icon="refresh"
    />
  )
}