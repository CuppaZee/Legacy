import * as React from 'react';
import { Text, View, Image, ScrollView, FlatList, TouchableHighlight } from 'react-native';
import { ActivityIndicator, Menu, TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';
import font from '~sections/Shared/font';

export default function InventoryItem({i}) {
  var theme = useSelector(i=>i.themes[i.theme]);
  var [open,setOpen] = React.useState(false);
  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={
      <TouchableRipple onPress={() => setOpen(true)}>
        <View key={i.icon} style={{ padding: 2, alignItems: "center", opacity: i.amount ? 1 : 0.2 }}>
          <Image style={{ height: 36, width: 36 }} source={{ uri: i.icon }} />
          <Text style={{ fontFamily: font(), color: theme.page_content.fg, fontSize: 16 }}>{i.amount}</Text>
        </View>
      </TouchableRipple>
    }
    style={{ marginTop: 61 }}
  >
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      <Image style={{ height: 48, width: 48 }} source={{ uri: i.icon }} />
      <Text style={{ fontSize: 16, fontFamily: font("bold") }}>{i.amount}x {i.name || "Unknown Name"}</Text>
    </View>
  </Menu>;
}