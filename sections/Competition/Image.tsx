// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, Image } from 'react-native';
import { Menu, TouchableRipple } from 'react-native-paper';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';

export default function CompetitionImage({
  type,
  count,
  viewMode
}: any) {
  var { t } = useTranslation();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var [open, setOpen] = React.useState(false);
  if(viewMode==="list") {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 2, width: 400, maxWidth: "100%", opacity: (count ?? 1) ? 1 : 0.2 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Image style={{ height: 32, width: 32, marginHorizontal: 4 }} source={getIcon(type.icon?.includes?.('NA.png') ? 'https://server.cuppazee.app/missing.png' : type.icon)} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Text style={{flex : 1, marginHorizontal: 4, fontWeight: "bold"}}>{count !== undefined ? `${count}x ` : ""}{type.name || t('inventory:unknown_name')}</Text>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Text style={{marginHorizontal: 4}}>{(count ?? 1) * (type.health ? type.health : -type.damage)} HP</Text>
    </View>
  }
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <TouchableRipple onPress={() => setOpen(true)}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View key={type.icon} style={{ padding: 2, alignItems: "center", opacity: (count ?? 1) ? 1 : 0.2 }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Image style={{ height: 32, width: 32 }} source={getIcon(type.icon?.includes?.('NA.png') ? 'https://server.cuppazee.app/missing.png' : type.icon)} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Text allowFontScaling={false} style={{ ...font(), color: theme.page_content.fg, fontSize: 16 }}>{(count ?? (type.health ? type.health : -type.damage)) || "-"}</Text>
        </View>
      </TouchableRipple>
    }
    contentStyle={{backgroundColor:theme.page_content.bg}}
  >
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Image style={{ height: 48, width: 48 }} source={getIcon(type.icon?.includes?.('NA.png') ? 'https://server.cuppazee.app/missing.png' : type.icon)} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }}>{count !== undefined ? `${count}x ` : ""}{type.name || t('inventory:unknown_name')}</Text>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }}>{(count ?? 1) * (type.health ? type.health : -type.damage)} HP</Text>
    </View>
  </Menu>;
}