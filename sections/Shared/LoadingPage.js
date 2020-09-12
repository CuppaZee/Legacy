import { MaterialCommunityIcons } from '@expo/vector-icons';
import * as React from 'react';
import { useTranslation } from 'react-i18next';
import { View, ActivityIndicator, Text } from 'react-native';
import { useSelector } from 'react-redux';
import font from 'sections/Shared/font';

export default function (props) {
  var theme = useSelector(i=>i.themes[i.theme]);
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