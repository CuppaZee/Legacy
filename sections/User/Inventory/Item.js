import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { Menu, TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';

export default function InventoryItem({ i }) {
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var [open, setOpen] = React.useState(false);
  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={
      <TouchableRipple onPress={() => setOpen(true)}>
        <View key={i.icon} style={{ padding: 2, alignItems: "center", opacity: i.amount ? 1 : 0.2 }}>
          <Image style={{ height: 36, width: 36 }} source={getIcon(i.icon?.includes?.('NA.png') ? 'https://server.cuppazee.app/missing.png' : i.icon)} />
          <Text allowFontScaling={false} style={{ ...font(), color: theme.page_content.fg, fontSize: 16 }}>{i.amount}</Text>
        </View>
      </TouchableRipple>
    }
    style={{ marginTop: 61 }}
    contentStyle={{backgroundColor:theme.page_content.bg}}
  >
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      <Image style={{ height: 48, width: 48 }} source={getIcon(i.icon?.includes?.('NA.png') ? 'https://server.cuppazee.app/missing.png' : i.icon)} />
      <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }}>{i.amount}x {i.name || t('inventory:unknown_name')}</Text>
    </View>
  </Menu>;
}