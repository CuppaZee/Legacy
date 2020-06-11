import * as React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { IconButton } from 'react-native-paper'
import Card from '~sections/Shared/Card';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import useAPIRequest from '~sections/Shared/useAPIRequest';
import { useDimensions } from '@react-native-community/hooks';
import font from '~sections/Shared/font';
import { useTranslation } from 'react-i18next'
import moment from 'moment';
import * as WebBrowser from 'expo-web-browser';

export default function DetailsScreen({ route }) {
  var {width} = useDimensions().window;
  var [FABOpen,setFABOpen] = React.useState(false);
  var nav = useNavigation();
  var theme = useSelector(i => i.themes[i.theme]);
  var logins = useSelector(i => i.logins);
  var munzee_id = Number(route.params.munzeeid)
  var username = route.params.username
  var code = Number(route.params.code)
  var {t} = useTranslation();
  const data = useAPIRequest({
    endpoint: 'munzee',
    data: munzee_id?{munzee_id}:{url: `/m/${username}/${code}`}
  })
  return (
    <View style={{ flex: 1 }}>

      <ScrollView
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        <View style={{ padding: 4 }}>
          <Card>
            <View style={{flexDirection:"row",alignItems:"center"}}>
              <Image style={{height:42,width:42,marginRight:8}} source={{uri:data?.pin_icon}}/>
              <View style={{flexDirection:"column",flex:1}}>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{data?.friendly_name}</Text>
                <Text allowFontScaling={false} style={{ fontSize: 12, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>By {data?.creator_username}</Text>
                <Text allowFontScaling={false} style={{ fontSize: 12, ...font(), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>Deployed: {moment(data?.deployed_at).format('L LT')}</Text>
              </View>
              <IconButton icon="open-in-new" onPress={()=>WebBrowser.openBrowserAsync(`https://www.munzee.com`+data?.url)} />
            </View>
            {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ padding: 8 }}>
                <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ width: 72, height: 72, borderRadius: 36 }} />
              </View>
              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{data?.username}</Text>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="arrow-up-bold-hexagon-outline" size={16} /> Level {data?.level}</Text>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="trophy-outline" size={16} /> Rank #{data?.rank}</Text>
              </View>
            </View> */}

            {/* {data?.clan?.id&&<TouchableRipple onPress={() => nav.navigate('Clan', { clanid: data?.clan?.id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${data?.clan?.id?.toString?.(36)}.png` }} style={{ width: 32, height: 32, borderRadius: 16, marginVertical: -4 }} />
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{data?.clan?.name}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>}
            <TouchableRipple disabled={!logins[user_id]} onPress={() => nav.navigate('UserInventory', { userid: user_id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons style={{marginHorizontal:4}} name="package" size={24} color={theme.page_content.fg} />
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:inventory')}</Text>
                <MaterialCommunityIcons name={logins[user_id] ? 'chevron-right' : 'lock'} size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => nav.navigate('UserBouncers', { userid: user_id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons style={{marginHorizontal:4}} name="star" size={24} color={theme.page_content.fg} />
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:your_bouncers')}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => nav.navigate('UserClan', { userid: user_id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons style={{marginHorizontal:4}} name="shield-half-full" size={24} color={theme.page_content.fg} />
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:clan_progress')}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => nav.navigate('UserQuest', { userid: user_id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons style={{marginHorizontal:4}} name="run" size={24} color={theme.page_content.fg} />
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:quebec_quest_progress')}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => nav.navigate('UserSHC', { userid: user_id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons style={{marginHorizontal:4}} name="star" size={24} color={theme.page_content.fg} />
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:special_hunter_challenge')}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple> */}
          </Card>
        </View>
      </ScrollView>
    </View>
  );
}