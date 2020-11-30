import { MaterialCommunityIcons } from '@expo/vector-icons';

import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { View, ActivityIndicator, Text } from 'react-native';

import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';

export default function (props: any) {
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var {t} = useTranslation();
  if(props.error) return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme[props.x??'page'].bg }}>
      <MaterialCommunityIcons name="alert" size={48} color={theme.page_content.fg} />
      <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), textAlign: "center", color: theme[props.x??'page'].fg }}>{t('error:page_load')}</Text>
    </View>
  )
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme[props.x??'page'].bg }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  )
}