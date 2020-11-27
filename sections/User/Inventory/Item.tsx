// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { View, Image } from 'react-native';
import { Text, Menu, TouchableRipple, Subheading } from 'react-native-paper';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';

export default function InventoryItem({
  i
}: any) {
  var { t } = useTranslation();
  var [open, setOpen] = React.useState(false);
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <TouchableRipple onPress={() => setOpen(true)}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View key={i.icon} style={{ padding: 2, alignItems: "center", opacity: i.amount ? 1 : 0.2 }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Image style={{ height: 36, width: 36 }} source={getIcon(i.icon?.includes?.('NA.png') ? 'https://server.cuppazee.app/missing.png' : i.icon)} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Text>{i.amount}</Text>
        </View>
      </TouchableRipple>
    }
    style={{ marginTop: 61 }}
  >
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Image style={{ height: 48, width: 48 }} source={getIcon(i.icon?.includes?.('NA.png') ? 'https://server.cuppazee.app/missing.png' : i.icon)} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Subheading>{i.amount}x {i.name || t('inventory:unknown_name')}</Subheading>
    </View>
  </Menu>;
}