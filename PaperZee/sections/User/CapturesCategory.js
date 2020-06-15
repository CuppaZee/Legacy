import * as React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import Card from '~sections/Shared/Card';
import { IconButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import font from '~sections/Shared/font';
import useAPIRequest from '~sections/Shared/useAPIRequest';
import types from '~sections/DB/types.json';
import getType from '~sections/DB/types';
import categories from '~sections/DB/categories.json';
import moment from 'moment';

function g(icon) {
  return decodeURIComponent(icon).replace(/[^a-zA-Z0-9]/g,'').replace(/munzee$/,'');
}

export default function SearchScreen({ navigation, route }) {
  var category = route.params.category;
  var theme = useSelector(i => i.themes[i.theme])
  var category_data = categories.find(i => i.id == category);
  var parent_datas = categories.filter(i => category_data.parents.includes(i.id));
  var user_id = route.params.userid;
  function hasChild(cat) {
    return !!categories.find(i => i.parents.includes(cat.id));
  }
  var data = useAPIRequest({
    endpoint: 'user/specials',
    data: {user_id}
  })
  var data_improved = (data??[]).map(i=>({
    logo: i.logo,
    name: i.name,
    count: Number(i.count),
    x: getType(i.logo,1)
  }))
  function get(x) {
    return data_improved.find(i=>i.x===x)?.count||0;
  }
  return (
    <ScrollView
      contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      <View style={{ padding: 4 }}>
        <Card noPad>
          <View>
            <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 24, color: theme.page_content.fg, padding: 4, textAlign: "center" }}>{category_data.name}</Text>
            {category_data?.seasonal && <>
              {/* <Text allowFontScaling={false} style={{...font("bold"),fontSize:20,color:theme.page_content.fg,textAlign:"center"}}>{category_data.id}</Text> */}
              <Text allowFontScaling={false} style={{ ...font(), textAlign: "center", color: theme.page_content.fg }}>{moment(category_data.seasonal.starts).format('L LT')} - {moment(category_data.seasonal.ends).format('L LT')}</Text>
              <Text allowFontScaling={false} style={{ ...font(), textAlign: "center", color: theme.page_content.fg }}>Duration: {moment.duration(moment(category_data.seasonal.starts).diff(moment(category_data.seasonal.ends))).humanize()}</Text>
            </>}
            {parent_datas.map(parent_data => parent_data.id !== "root" ? null
            /*<View style={{ padding: 4, flexDirection: "row", alignItems: "center" }}>
              <IconButton size={24} onPress={() => navigation.push('UserCapturesCategory', { userid: user_id, category: parent_data.id })} icon="chevron-left" color={theme.page_content.fg} />
              <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={{ uri: parent_data.custom_icon ?? `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(parent_data.icon)}.png` }} />
              <View style={{ flex: 1 }}>
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{parent_data.name}</Text>
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{`Go Back`}</Text>
              </View>
            </View> */
            : <View style={{ padding: 4, flexDirection: "row", alignItems: "center" }}>
                <IconButton size={24} onPress={() => navigation.push('UserDetails', { userid: user_id })} icon="chevron-left" color={theme.page_content.fg} />
                <Image style={{ borderRadius: 16, height: 32, width: 32, marginHorizontal: 8 }} source={{ uri: parent_data.custom_icon ?? `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id || 0).toString(36)}.png` }} />
                {/* <Image style={{height:32,width:32,marginHorizontal:8}} source={{uri:parent_data.custom_icon??`https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(parent_data.icon)}.png`}} /> */}
                <View style={{ flex: 1 }}>
                  <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>User Details</Text>
                  <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{`Go Back`}</Text>
                </View>
              </View>)}
            {categories.filter(i => i.parents.includes(category)).filter(i => hasChild(i)).filter(i=>!i.hidden).map(i => <View key={i.id} style={{ padding: 4, flexDirection: "row", alignItems: "center" }}>
              <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={{ uri: i.custom_icon ?? `https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(i.icon)}.png` }} />
              <View style={{ flex: 1 }}>
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{i.name}</Text>
                <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{i.category ? `#${i.id}` : `Category`}</Text>
              </View>
              <IconButton size={24} onPress={() => navigation.push('UserCapturesCategory', { userid: user_id, category: i.id })} icon="chevron-right" color={theme.page_content.fg} />
            </View>)}
          </View>
        </Card>
      </View>
      {categories.filter(i => i.parents.includes(category)).filter(i => !hasChild(i)).filter(i=>!i.hidden).map(cdata=><View style={{ padding: 4 }}>
        <Card noPad>
          <View>
            <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 24, color: theme.page_content.fg, padding: 4, textAlign: "center" }}>{cdata.name}</Text>
            {cdata?.seasonal && <>
              {/* <Text allowFontScaling={false} style={{...font("bold"),fontSize:20,color:theme.page_content.fg,textAlign:"center"}}>{category_data.id}</Text> */}
              <Text allowFontScaling={false} style={{ ...font(), textAlign: "center", color: theme.page_content.fg }}>{moment(cdata.seasonal.starts).format('L LT')} - {moment(cdata.seasonal.ends).format('L LT')}</Text>
              <Text allowFontScaling={false} style={{ ...font(), textAlign: "center", color: theme.page_content.fg }}>Duration: {moment.duration(moment(cdata.seasonal.starts).diff(moment(cdata.seasonal.ends))).humanize()}</Text>
            </>}
            <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
              {types.filter(i => i.category === cdata.id).filter(i=>!i.hidden&&!i.capture_types).map(i => <View key={i.id} style={{ padding: 4, width: 80, alignItems: "center", opacity: get(i.x)>0?1:0.4 }}>
                <Image style={{ height: 32, width: 32, marginHorizontal: 8 }} source={{ uri: i.custom_icon ?? `https://server.cuppazee.app/pins/64/${encodeURIComponent(i.icon)}.png` }} />
                <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="middle" style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{i.name}</Text>
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