import * as React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '~sections/Shared/Card';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import request from '~store/request'
import ActivityCard from './ActivityCard';

export default function DetailsScreen({route}) {
  var dispatch = useDispatch();
  var {t} = useTranslation();
  var nav = useNavigation();
  var theme = useSelector(i=>i.themes[i.theme]);
  var user_id = Number(route.params.userid)
  var { data } = useSelector(i => i.request_data[`user/details?user_id=${user_id}`] ?? {})
  useFocusEffect(
    React.useCallback(() => {
      dispatch(request.add(`user/details?user_id=${user_id}`))
      return () => {
        dispatch(request.remove(`user/details?user_id=${user_id}`))
      };
    }, [])
  );
  return (
    <ScrollView
      contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      <View style={{ padding: 4 }}>
        <Card noPad>
          <View style={{flexDirection:"row",alignItems:"center"}}>
            <View style={{ padding: 8 }}>
              <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ width: 72, height: 72, borderRadius: 36 }} />
            </View>
            <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
              <Text style={{ fontSize: 20, fontWeight:"bold", color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{data?.data?.username}</Text>
              {/* <Text style={{fontSize:16,opacity:0.8}}><MaterialCommunityIcons name="sword-cross" size={16}/> The Cup of Coffee Clan</Text> */}
              <Text style={{ fontSize: 16, fontWeight: "500", color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="arrow-up-bold-hexagon-outline" size={16} /> Level {data?.data?.level}</Text>
              <Text style={{ fontSize: 16, fontWeight: "500", color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="trophy-outline" size={16} /> Rank #{data?.data?.rank}</Text>
            </View>
          </View>
          {/* <TouchableRipple onPress={()=>{}}>
            <View style={{flexDirection:"row", alignItems:"center",paddingVertical:8}}>
              <View style={{ paddingLeft: 8 }}>
                <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${data?.data?.clan?.id?.toString?.(36)}.png` }} style={{ width: 32, height: 32, borderRadius: 16 }} />
              </View>
              <View style={{paddingLeft: 8, flex: 1, justifyContent: "center" }}>
                <Text style={{ fontSize: 20, color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{data?.data?.clan?.name}</Text>
              </View>
              <MaterialCommunityIcons size={24} name="chevron-right" />
            </View>
          </TouchableRipple> */}
          
          <TouchableRipple onPress={()=>nav.navigate('Clan',{clanid:data?.data?.clan?.id})}>
            <View style={{padding:8, flexDirection: "row",alignItems:"center"}}>
              {/* <MaterialCommunityIcons name="star" size={24} color="#000" /> */}
              <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${data?.data?.clan?.id?.toString?.(36)}.png` }} style={{ width: 24, height: 24, borderRadius: 12 }} />
              <Text style={{paddingLeft: 4, fontWeight:"bold",fontSize:16,flex:1,color: theme.page_content.fg}}>{data?.data?.clan?.name}</Text>
              <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
            </View>
          </TouchableRipple>
        </Card>
      </View>
      <View style={{padding:4}}>
        <ActivityCard user_id={user_id}/>
      </View>
    </ScrollView>
  );
}