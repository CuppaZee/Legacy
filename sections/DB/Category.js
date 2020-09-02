import * as React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import Card from 'sections/Shared/Card';
import { IconButton, TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';
import font from 'sections/Shared/font';
import types from 'utils/db/types.json';
import categories from 'utils/db/categories.json';
import useMoment from 'utils/hooks/useMoment';
import { useTranslation } from 'react-i18next'
import getIcon from 'utils/db/icon';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SearchScreen({ navigation, route }) {
  var { t } = useTranslation();
  var moment = useMoment();
  var category = route.params.category;
  var theme = useSelector(i => i.themes[i.theme])
  var category_data = categories.find(i => i.id == category);
  var parent_datas = categories.filter(i => category_data.parents.includes(i.id));
  return (
    <ScrollView
      contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      <View style={{ padding: 4 }}>
        <Card noPad>
          <View>
            {parent_datas.map(parent_data => parent_data.id !== "root" ? <View style={{ padding: 4, flexDirection: "row", alignItems: "center" }}>
              <IconButton size={24} onPress={() => navigation.push('DBCategory', { category: parent_data.id })} icon="chevron-left" color={theme.page_content.fg} />
              <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={getIcon(parent_data.custom_icon ?? parent_data.icon)} />
              <View style={{ flex: 1 }}>
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{parent_data.name}</Text>
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{t(`db:go_back`)}</Text>
              </View>
            </View> : <View style={{ padding: 4, flexDirection: "row", alignItems: "center" }}>
                <IconButton size={24} onPress={() => navigation.push('DBSearch')} icon="chevron-left" color={theme.page_content.fg} />
                {/* <Image style={{height:32,width:32,marginHorizontal:8}} source={{uri:parent_data.custom_icon??`https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(parent_data.icon)}.png`}} /> */}
                <View style={{ flex: 1 }}>
                  <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{t('screens:DBSearch')}</Text>
                  <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{t(`db:go_back`)}</Text>
                </View>
              </View>)}
            <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 24, color: theme.page_content.fg, padding: 4, textAlign: "center" }}>{category_data.name}</Text>
            {category_data?.seasonal && <>
              {/* <Text allowFontScaling={false} style={{...font("bold"),fontSize:20,color:theme.page_content.fg,textAlign:"center"}}>{category_data.id}</Text> */}
              <Text allowFontScaling={false} style={{ ...font(), textAlign: "center", color: theme.page_content.fg }}>{moment(category_data.seasonal.starts).format('L LT')} - {moment(category_data.seasonal.ends).format('L LT')}</Text>
              <Text allowFontScaling={false} style={{ ...font(), textAlign: "center", color: theme.page_content.fg }}>{t('bouncers:duration', { duration: moment.duration(moment(category_data.seasonal.starts).diff(moment(category_data.seasonal.ends))).humanize() })}</Text>
            </>}
            {[...types.filter(i => i.category === category), ...categories.filter(i => i.parents.includes(category))].filter(i => !i.hidden).map(i => <TouchableRipple key={i.id} onPress={i.category ? () => navigation.navigate('DBType', { munzee: i.icon }) : () => navigation.navigate('DBCategory', { category: i.id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <Image style={{ height: 32, width: 32, marginHorizontal: 4 }} source={getIcon(i.custom_icon ?? i.icon)} />
                <View style={{ flex: 1 }}>
                  <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{i.name}</Text>
                  <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{i.category ? `#${i.id}` : t(`db:category`)}</Text>
                </View>
                <MaterialCommunityIcons size={24} name="chevron-right" color={theme.page_content.fg} />
              </View>
            </TouchableRipple>)}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}