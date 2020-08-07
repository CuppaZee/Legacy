import * as React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from 'sections/Shared/Card';
import { useSelector } from 'react-redux';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ActivityCard from './Activity/Card';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import font from 'sections/Shared/font';
import categories from 'utils/db/categories.json';
import { useTranslation } from 'react-i18next'
import useMoment from 'utils/hooks/useMoment';
import getIcon from 'utils/db/icon';
import UserFAB from './FAB';

const useComponentSize = () => {
  const [size, setSize] = React.useState(null);

  const onLayout = React.useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};

export default function DetailsScreen({ route }) {
  var moment = useMoment();
  var nav = useNavigation();
  var theme = useSelector(i => i.themes[i.theme]);
  var logins = useSelector(i => i.logins);
  var username = route.params.username
  var { t } = useTranslation();
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
  var [size, onLayout] = useComponentSize();
  var maxWidth = size?.width > 750 ? "50%" : "100%"
  const data = useAPIRequest({
    endpoint: 'user',
    data: { username }
  })
  let user_id = data?.user_id
  useAPIRequest(user_id?{
    endpoint: 'user/activity',
    data: { day: dateString, user_id },
    cuppazee: true
  }:[null])
  const [menu,setMenu] = React.useState(null);
  if (!data || !size?.width) return <View onLayout={onLayout} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      <ScrollView
      contentContainerStyle={{padding:4,paddingBottom:92}}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        <View style={{ alignItems: "stretch", alignSelf: "center", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", width: "100%", maxWidth: 1200 }}>
          <View style={{ padding: 4, width: size?.width > 750 ? 1000 : 500, maxWidth: "100%" }}>
            <ActivityCard username={username} user_id={user_id} />
          </View>
          <View style={{ padding: 4, width: 500, maxWidth }}>
            <Card noPad>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ padding: 8 }}>
                  <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ width: 72, height: 72, borderRadius: 36 }} />
                </View>
                <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                  <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{data?.username}</Text>
                  <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="arrow-up-bold-hexagon-outline" size={16} /> {t('user:level_n',{level:data?.level})}</Text>
                  <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="trophy-outline" size={16} /> {t('user:rank_n',{rank:data?.rank})}</Text>
                </View>
              </View>
              <TouchableRipple disabled={!logins[user_id]} onPress={() => nav.navigate('UserInventory', { username: username })}>
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="package" size={24} color={theme.page_content.fg} />
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:inventory')}</Text>
                  <MaterialCommunityIcons name={logins[user_id] ? 'chevron-right' : 'lock'} size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => nav.navigate('UserBouncers', { username: username })}>
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="star" size={24} color={theme.page_content.fg} />
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:your_bouncers')}</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => nav.navigate('UserBlastMap', { username: username })}>
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="bomb" size={24} color={theme.page_content.fg} />
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>Blast Checker</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => nav.navigate('UserQRew', { username: username })}>
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="hammer" size={24} color={theme.page_content.fg} />
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>QRew Checker</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple>
            </Card>
          </View>
          <View style={{ padding: 4, width: 500, maxWidth }}>
            <Card noPad>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ padding: 8 }}>
                  <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${data?.clan?.id?.toString?.(36)}.png` }} style={{ width: 48, height: 48, borderRadius: 24 }} />
                </View>
                <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                  <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{data?.clan?.name ?? t("user:no_clan")}</Text>
                  <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="shield-half-full" size={16} /> {data?.clan ? t('user:your_clan') : t('user:no_clan_desc')}</Text>
                  {/* <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="trophy-outline" size={16} /> Rank #{JSON.stringify(data?.clan)}</Text> */}
                </View>
              </View>
              {data?.clan ? <TouchableRipple onPress={() => nav.navigate('Clan', { clanid: data?.clan?.id })}>
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="finance" size={24} color={theme.page_content.fg} />
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:clan_stats')}</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple> : <>
                  <TouchableRipple onPress={() => nav.navigate('UserClan', { username: username })}>
                    <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                      <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="shield-half-full" size={24} color={theme.page_content.fg} />
                      <View style={{ flex: 1 }}>
                        <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{t('user:clan_progress')}</Text>
                        <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font(), fontSize: 12, color: theme.page_content.fg }}>{t('user:clan_progress_desc')}</Text>
                      </View>
                      <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                    </View>
                  </TouchableRipple>
                  <TouchableRipple onPress={() => Linking.openURL('https://www.facebook.com/groups/MunzeeClanWarInformation/')}>
                    <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                      <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="facebook-box" size={24} color={theme.page_content.fg} />
                      <View style={{ flex: 1 }}>
                        <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{t('user:clan_info')}</Text>
                        <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font(), fontSize: 12, color: theme.page_content.fg }}>{t('user:clan_info_desc')}</Text>
                      </View>
                      {/*  */}
                      <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                    </View>
                  </TouchableRipple>
                </>}
            </Card>
          </View>
          <View style={{ padding: 4, width: 500, maxWidth }}>
            <Card noPad>
              <TouchableRipple onPress={() => setMenu(menu==="challenge"?null:"challenge")}>
                <View style={{ ...(theme.page_content.border ? { borderBottomWidth: 1, borderBottomColor: theme.page_content.border } : {}), padding: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, flexDirection: "row", alignItems: "center", backgroundColor: (theme.clanCardHeader || theme.navigation).bg }}>
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="check" size={24} color={(theme.clanCardHeader || theme.navigation).fg} />
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: (theme.clanCardHeader || theme.navigation).fg }}>{t('user:captured_types')}</Text>
                </View>
              </TouchableRipple>
              {categories.filter(i => i.parents.includes('root') && !i.hidden).map(i => <TouchableRipple key={i.id} onPress={() => nav.navigate('UserCapturesCategory', { username: username, category: i.id })}>
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  <Image style={{ height: 32, width: 32, marginVertical: -4 }} source={getIcon(i.icon)} />
                  {/* <MaterialCommunityIcons name="star" size={24} color={theme.page_content.fg} /> */}
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{i.name}</Text>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple>)}
            </Card>
          </View>
          <View style={{ padding: 4, width: 500, maxWidth }}>
            <Card noPad>
              <TouchableRipple onPress={() => setMenu(menu==="challenge"?null:"challenge")}>
                <View style={{ borderRadius: (size?.width > 750 || menu==="challenge") ? 0 : 8, ...(theme.page_content.border ? { borderBottomWidth: 1, borderBottomColor: theme.page_content.border } : {}), padding: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, flexDirection: "row", alignItems: "center", backgroundColor: (theme.clanCardHeader || theme.navigation).bg }}>
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="trophy-outline" size={24} color={(theme.clanCardHeader || theme.navigation).fg} />
                  <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: (theme.clanCardHeader || theme.navigation).fg }}>{t('user:challenges')}</Text>
                  {size?.width <= 750 && <MaterialCommunityIcons name={menu==="challenge"?"chevron-up":"chevron-down"} size={24} color={(theme.clanCardHeader || theme.navigation).fg} />}
                </View>
              </TouchableRipple>
              {(size?.width > 750 || menu==="challenge") &&<>
                <TouchableRipple onPress={() => nav.navigate('UserSHCLite', { username: username })}>
                  <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="star-half" size={24} color={theme.page_content.fg} />
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:sh_lite')}</Text>
                    <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => nav.navigate('UserSHCPro', { username: username })}>
                  <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="star" size={24} color={theme.page_content.fg} />
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:sh_pro')}</Text>
                    <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => nav.navigate('UserPOI', { username: username })}>
                  <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="map-marker-check" size={24} color={theme.page_content.fg} />
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>POI Challenge</Text>
                    <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => nav.navigate('UserColour', { username: username })}>
                  <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="palette" size={24} color={theme.page_content.fg} />
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>Colour Challenge</Text>
                    <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                  </View>
                </TouchableRipple>
                <TouchableRipple onPress={() => nav.navigate('UserQuest', { username: username })}>
                  <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                    <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="run" size={24} color={theme.page_content.fg} />
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:quebec_quest_progress')}</Text>
                    <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                  </View>
                </TouchableRipple>
              </>}
            </Card>
          </View>
        </View>
      </ScrollView>
      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}