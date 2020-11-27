// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, Image, ScrollView } from 'react-native';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
import { IconButton } from 'react-native-paper';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module 'utils/db/types.json'. Consider... Remove this comment to see the full error message
import types from 'utils/db/types.json';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types' or its corresp... Remove this comment to see the full error message
import getType from 'utils/db/types';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module 'utils/db/categories.json'. Con... Remove this comment to see the full error message
import categories from 'utils/db/categories.json';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';

function g(icon: any) {
  return decodeURIComponent(icon).replace(/[^a-zA-Z0-9]/g,'').replace(/munzee$/,'');
}

export default function SearchScreen({
  navigation,
  route
}: any) {
  var {t} = useTranslation();
  var moment = useMoment();
  var category = route.params.category;
  var theme = useSelector((i: any) => i.themes[i.theme])
  var category_data = categories.find((i: any) => i.id == category);
  var parent_datas = categories.filter((i: any) => category_data.parents.includes(i.id));
  var username = route.params.username;
  function hasChild(cat: any) {
    return !!categories.find((i: any) => i.parents.includes(cat.id));
  }
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: (i: any) => i?.user_id
  })
  var data = useAPIRequest(user_id?{
    endpoint: 'user/specials',
    data: {user_id}
  }:null)
  var data_improved = (data??[]).map((i: any) => ({
    logo: i.logo,
    name: i.name,
    count: Number(i.count),
    x: getType(i.logo,1)
  }))
  function get(x: any) {
    return data_improved.find((i: any) => i.x===x)?.count||0;
  }
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ScrollView
      contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ padding: 4 }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Card noPad>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 24, color: theme.page_content.fg, padding: 4, textAlign: "center" }}>{category_data.name}</Text>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {category_data?.seasonal && <>
              {/* <Text allowFontScaling={false} style={{...font("bold"),fontSize:20,color:theme.page_content.fg,textAlign:"center"}}>{category_data.id}</Text> */}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text allowFontScaling={false} style={{ ...font(), textAlign: "center", color: theme.page_content.fg }}>{moment(category_data.seasonal.starts).format('L LT')} - {moment(category_data.seasonal.ends).format('L LT')}</Text>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text allowFontScaling={false} style={{ ...font(), textAlign: "center", color: theme.page_content.fg }}>{t('bouncers:duration',{duration:moment.duration(moment(category_data.seasonal.starts).diff(moment(category_data.seasonal.ends))).humanize()})}</Text>
            </>}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {parent_datas.map((parent_data: any) => parent_data.id !== "root" ? null : <View style={{ padding: 4, flexDirection: "row", alignItems: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <IconButton size={24} onPress={() => navigation.push('UserDetails', { username: username })} icon="chevron-left" color={theme.page_content.fg} />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Image style={{ borderRadius: 16, height: 32, width: 32, marginHorizontal: 8 }} source={{ uri: parent_data.custom_icon ?? `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id || 0).toString(36)}.png` }} />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ flex: 1 }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{t('screens:UserDetails')}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{t(`db:go_back`)}</Text>
                </View>
              </View>)}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {categories.filter((i: any) => i.parents.includes(category)).filter((i: any) => hasChild(i)).filter((i: any) => !i.hidden).map((i: any) => <View key={i.id} style={{ padding: 4, flexDirection: "row", alignItems: "center" }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={getIcon(i.custom_icon ?? i.icon)} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ flex: 1 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{i.name}</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{i.category ? `#${i.id}` : t(`db:category`)}</Text>
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <IconButton size={24} onPress={() => navigation.push('UserCapturesCategory', { username: username, category: i.id })} icon="chevron-right" color={theme.page_content.fg} />
            </View>)}
          </View>
        </Card>
      </View>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {categories.filter((i: any) => i.parents.includes(category)).filter((i: any) => !hasChild(i)).filter((i: any) => !i.hidden).map((cdata: any) => <View style={{ padding: 4 }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Card noPad>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 24, color: theme.page_content.fg, padding: 4, textAlign: "center" }}>{cdata.name}</Text>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {cdata?.seasonal && <>
              {/* <Text allowFontScaling={false} style={{...font("bold"),fontSize:20,color:theme.page_content.fg,textAlign:"center"}}>{category_data.id}</Text> */}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text allowFontScaling={false} style={{ ...font(), textAlign: "center", color: theme.page_content.fg }}>{moment(cdata.seasonal.starts).format('L LT')} - {moment(cdata.seasonal.ends).format('L LT')}</Text>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text allowFontScaling={false} style={{ ...font(), textAlign: "center", color: theme.page_content.fg }}>{t('bouncers:duration',{duration:moment.duration(moment(cdata.seasonal.starts).diff(moment(cdata.seasonal.ends))).humanize()})}</Text>
            </>}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {types.filter((i: any) => i.category === cdata.id).filter((i: any) => !i.hidden&&!i.capture_types).map((i: any) => <View key={i.id} style={{ padding: 4, width: 80, alignItems: "center", opacity: get(i.x)>0?1:0.4 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={getIcon(i.custom_icon ?? i.icon)} />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="middle" style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{i.name}</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{get(i.x).toString()}</Text>
              </View>)}
            </View>
          </View>
        </Card>
      </View>)}
    </ScrollView>
  );
}
//api.adorable.io/avatars/100