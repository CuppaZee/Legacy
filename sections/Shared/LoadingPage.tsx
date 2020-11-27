import { MaterialCommunityIcons } from '@expo/vector-icons';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { View, ActivityIndicator, Text } from 'react-native';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';

export default function (props: any) {
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var {t} = useTranslation();
  if(props.error) return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme[props.x??'page'].bg }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <MaterialCommunityIcons name="alert" size={48} color={theme.page_content.fg} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), textAlign: "center", color: theme[props.x??'page'].fg }}>{t('error:page_load')}</Text>
    </View>
  )
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme[props.x??'page'].bg }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  )
}