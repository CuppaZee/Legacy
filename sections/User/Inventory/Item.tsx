import * as React from 'react';
import { View, Image } from 'react-native';
import { Text, Menu, TouchableRipple, Subheading } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';

export default function InventoryItem({ i }) {
  var { t } = useTranslation();
  var [open, setOpen] = React.useState(false);
  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={
      <TouchableRipple onPress={() => setOpen(true)}>
        <View key={i.icon} style={{ padding: 2, alignItems: "center", opacity: i.amount ? 1 : 0.2 }}>
          <Image style={{ height: 36, width: 36 }} source={getIcon(i.icon?.includes?.('NA.png') ? 'https://server.cuppazee.app/missing.png' : i.icon)} />
          <Text>{i.amount}</Text>
        </View>
      </TouchableRipple>
    }
    style={{ marginTop: 61 }}
  >
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      <Image style={{ height: 48, width: 48 }} source={getIcon(i.icon?.includes?.('NA.png') ? 'https://server.cuppazee.app/missing.png' : i.icon)} />
      <Subheading>{i.amount}x {i.name || t('inventory:unknown_name')}</Subheading>
    </View>
  </Menu>;
}