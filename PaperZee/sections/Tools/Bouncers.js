import * as React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import Card from 'sections/Shared/Card';
import { IconButton, TouchableRipple } from 'react-native-paper';
import { useSelector } from 'react-redux';
import font from 'sections/Shared/font';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import types from 'utils/db/types.json';
import categories from 'utils/db/categories.json';
import useMoment from 'utils/hooks/useMoment';
import { useTranslation } from 'react-i18next';

function g(icon) {
  return decodeURIComponent(icon).replace(/[^a-zA-Z0-9]/g,'').replace(/munzee$/,'');
}

export default function SearchScreen({ navigation }) {
  var {t} = useTranslation();
  var moment = useMoment();
  var theme = useSelector(i => i.themes[i.theme])
  function hasChild(cat) {
    return !!categories.find(i => i.parents.includes(cat.id));
  }
  var data = useAPIRequest({
    endpoint: 'bouncers/overview/v1',
    cuppazee: true
  })
  function get(i) {
    var x = 0;
    for(var icon of [i.icon,...i.alt_icons||[]]) {
      x = (data||{})[`https://munzee.global.ssl.fastly.net/images/pins/${icon}.png`]||x;
    }
    return x;
  }
  return (
    <ScrollView
      contentContainerStyle={{ width: 800, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      {[...categories.filter(i=>i.seasonal&&i.seasonal.starts<Date.now()&&i.seasonal.ends>Date.now()),...categories.filter(i => i.parents.includes('bouncer'))].filter(i => !hasChild(i)).filter(i=>!i.hidden).map(cdata=><View style={{ padding: 4 }}>
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
              {types.filter(i => i.category === cdata.id).filter(i=>!i.hidden&&!i.capture_only).map(i => <TouchableRipple onPress={()=>navigation.navigate("BouncerMap",{type:i.icon})}>
                <View key={i.id} style={{ padding: 4, width: 80, alignItems: "center", opacity: get(i)>0?1:0.4 }}>
                  <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={{ uri: i.custom_icon ?? `https://server.cuppazee.app/pins/64/${encodeURIComponent(i.icon)}.png` }} />
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