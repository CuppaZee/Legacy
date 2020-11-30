
import * as React from 'react';

import { Text, View, Image, ScrollView } from 'react-native';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
import { IconButton, TouchableRipple } from 'react-native-paper';

import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types.json' or its co... Remove this comment to see the full error message
import types from 'utils/db/types.json';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/categories.json' or i... Remove this comment to see the full error message
import categories from 'utils/db/categories.json';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types' or its corresp... Remove this comment to see the full error message
import getType from 'utils/db/types';

export default function SearchScreen({
  navigation
}: any) {
  var {t} = useTranslation();
  var moment = useMoment();
  var theme = useSelector((i: any) => i.themes[i.theme])
  function hasChild(cat: any) {
    return !!categories.find((i: any) => i.parents.includes(cat.id));
  }
  var data = useAPIRequest({
    endpoint: 'bouncers/overview/v1',
    cuppazee: true
  })
  function get(i: any) {
    var x = 0;
    for(var icon of [i.icon,...(i.alt_icons || [])]) {
      x = (data||{})[`https://munzee.global.ssl.fastly.net/images/pins/${icon}.png`]||x;
    }
    return x;
  }
  return (
    <ScrollView
      contentContainerStyle={{ width: 800, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      {Object.entries(data||{}).filter(i=>!getType(i[0])).length>0&&<View style={{ padding: 4 }}>
        <Card noPad>
          <View>
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
              <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 24, color: theme.page_content.fg, paddingVertical: 4, textAlign: "center" }}>Uncategorised</Text>
              {/* <IconButton icon="map" color={theme.page_content.fg} onPress={()=>navigation.navigate("BouncerMap",{type:cdata.id})} /> */}
            </View>
            <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
              {Object.entries(data||{}).filter(i=>!getType(i[0])).map(i => <TouchableRipple>
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'id' does not exist on type '[string, unk... Remove this comment to see the full error message */}
                <View key={i.id} style={{ padding: 4, width: 80, alignItems: "center", opacity: i[1]>0?1:0.4 }}>
                  <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={getIcon(i[0])} />
                  <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="middle" style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{i[0].replace(/https:\/\/munzee.global.ssl.fastly.net\/images\/pins\/(.+)\.png/,'$1')}</Text>
                  {/* @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'. */}
                  <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{i[1].toString()}</Text>
                </View>
              </TouchableRipple>)}
            </View>
          </View>
        </Card>
      </View>}
      {[...categories.filter((i: any) => i.seasonal&&i.seasonal.starts<Date.now()&&i.seasonal.ends>Date.now()),...categories.filter((i: any) => i.parents.includes('bouncer')),...categories.filter((i: any) => i.id=="temppob_other"),...categories.filter((i: any) => i.id=="temppob_evo"),...categories.filter((i: any) => i.id=="scatter")].filter(i => !hasChild(i)).filter(i=>!i.hidden&&i.id!="bouncerhost").map(cdata=><View style={{ padding: 4 }}>
        <Card noPad>
          <View>
            <View style={{flexDirection:"row",justifyContent:"center",alignItems:"center"}}>
              <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 24, color: theme.page_content.fg, paddingVertical: 4, textAlign: "center" }}>{cdata.name}</Text>
              <IconButton icon="map" color={theme.page_content.fg} onPress={()=>navigation.navigate("BouncerMap",{type:cdata.id})} />
            </View>
            {cdata?.seasonal && <>
              {/* <Text allowFontScaling={false} style={{...font("bold"),fontSize:20,color:theme.page_content.fg,textAlign:"center"}}>{category_data.id}</Text> */}
              <Text allowFontScaling={false} style={{ ...font(), textAlign: "center", color: theme.page_content.fg }}>{moment(cdata.seasonal.starts).format('L LT')} - {moment(cdata.seasonal.ends).format('L LT')}</Text>
              <Text allowFontScaling={false} style={{ ...font(), textAlign: "center", color: theme.page_content.fg }}>{t('bouncers:duration',{duration:moment.duration(moment(cdata.seasonal.starts).diff(moment(cdata.seasonal.ends))).humanize()})}</Text>
            </>}
            <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
              {types.filter((i: any) => i.category === cdata.id).filter((i: any) => !i.hidden&&!i.capture_only).map((i: any) => <TouchableRipple onPress={()=>navigation.navigate("BouncerMap",{type:i.icon})}>
                <View key={i.id} style={{ padding: 4, width: 80, alignItems: "center", opacity: get(i)>0?1:0.4 }}>
                  <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={getIcon(i.custom_icon ?? i.icon)} />
                  <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="middle" style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{i.name}</Text>
                  <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{get(i).toString()}</Text>
                </View>
              </TouchableRipple>)}
            </View>
          </View>
        </Card>
      </View>)}
    </ScrollView>
  );
}
//api.adorable.io/avatars/100