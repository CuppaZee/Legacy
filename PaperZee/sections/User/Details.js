import * as React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator, Linking } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '~sections/Shared/Card';
import { useSelector } from 'react-redux';
import { TouchableRipple, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ActivityCard from './Activity/Card';
import useAPIRequest from '~sections/Shared/useAPIRequest';
import { useDimensions } from '@react-native-community/hooks';
import font from '~sections/Shared/font';
import categories from '~sections/DB/categories.json';
import { useTranslation } from 'react-i18next'
import moment from 'moment';

const useComponentSize = () => {
  const [size, setSize] = React.useState(null);

  const onLayout = React.useCallback(event => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};

function UserIcon({ user_id, size }) {
  return <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ marginLeft: -(size - 24) / 2, marginTop: -(size - 24) / 2, height: size, width: size }} />
}

export default function DetailsScreen({ route }) {
  var { width } = useDimensions().window;
  var [FABOpen, setFABOpen] = React.useState(false);
  var nav = useNavigation();
  var theme = useSelector(i => i.themes[i.theme]);
  var logins = useSelector(i => i.logins);
  var user_id = Number(route.params.userid)
  var { t } = useTranslation();
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
  var [size, onLayout] = useComponentSize();
  var maxWidth = size?.width > 750 ? "50%" : "100%"
  const [data] = useAPIRequest([
    {
      endpoint: 'user',
      data: { user_id }
    },
    {
      endpoint: 'user/activity',
      data: { day: dateString, user_id },
      cuppazee: true
    }
  ])
  if (!data || !size?.width) return <View onLayout={onLayout} style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return (
    <View style={{ flex: 1 }} onLayout={onLayout}>
      <ScrollView
        contentContainerStyle={{ alignItems: "stretch", flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        <View style={{ padding: 4, width: size?.width > 750 ? 1000 : 500, maxWidth: "100%" }}>
          <ActivityCard user_id={user_id} />
        </View>
        <View style={{ padding: 4, width: 500, maxWidth }}>
          <Card noPad>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ padding: 8 }}>
                <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ width: 72, height: 72, borderRadius: 36 }} />
              </View>
              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{data?.username}</Text>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="arrow-up-bold-hexagon-outline" size={16} /> Level {data?.level}</Text>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="trophy-outline" size={16} /> Rank #{data?.rank}</Text>
              </View>
            </View>
            <TouchableRipple disabled={!logins[user_id]} onPress={() => nav.navigate('UserInventory', { userid: user_id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="package" size={24} color={theme.page_content.fg} />
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:inventory')}</Text>
                <MaterialCommunityIcons name={logins[user_id] ? 'chevron-right' : 'lock'} size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => nav.navigate('UserBouncers', { userid: user_id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="star" size={24} color={theme.page_content.fg} />
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:your_bouncers')}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => nav.navigate('UserQuest', { userid: user_id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="run" size={24} color={theme.page_content.fg} />
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:quebec_quest_progress')}</Text>
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
                <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{data?.clan?.name??"You're not in a Clan"}</Text>
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="shield-half-full" size={16} /> {data?.clan?'Your Clan':'View your Progress Below'}</Text>
                {/* <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="trophy-outline" size={16} /> Rank #{JSON.stringify(data?.clan)}</Text> */}
              </View>
            </View>
            {data?.clan?<TouchableRipple onPress={() => nav.navigate('Clan', { clanid: data?.clan?.id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="finance" size={24} color={theme.page_content.fg} />
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>Clan Stats</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>:<>
              <TouchableRipple onPress={() => nav.navigate('UserClan', { userid: user_id })}>
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="shield-half-full" size={24} color={theme.page_content.fg} />
                  <View style={{flex:1}}>
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>Clan Progress</Text>
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font(), fontSize: 12, color: theme.page_content.fg }}>See what level you can reach!</Text>
                  </View>
                  <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
                </View>
              </TouchableRipple>
              <TouchableRipple onPress={() => Linking.openURL('https://www.facebook.com/groups/MunzeeClanWarInformation/')}>
                <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                  <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="facebook-box" size={24} color={theme.page_content.fg} />
                  <View style={{flex:1}}>
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>Clan War Info FB Group</Text>
                    <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font(), fontSize: 12, color: theme.page_content.fg }}>A great place to find a clan or ask questions!</Text>
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
            <View style={{ padding: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, flexDirection: "row", alignItems: "center", backgroundColor: (theme.clanCardHeader || theme.navigation).bg }}>
              <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="check" size={24} color={(theme.clanCardHeader || theme.navigation).fg} />
              <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: (theme.clanCardHeader || theme.navigation).fg }}>{t('user:captured_types')}</Text>
            </View>
            {categories.filter(i => i.parents.includes('root')).map(i => <TouchableRipple onPress={() => nav.navigate('UserCapturesCategory', { userid: user_id, category: i.id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <Image style={{ height: 32, width: 32, marginVertical: -4 }} source={{ uri: `https://munzee.global.ssl.fastly.net/images/pins/${i.icon}.png` }} />
                {/* <MaterialCommunityIcons name="star" size={24} color={theme.page_content.fg} /> */}
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{i.name}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>)}
          </Card>
        </View>
        <View style={{ padding: 4, width: 500, maxWidth }}>
          <Card noPad>
            <View style={{ padding: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, flexDirection: "row", alignItems: "center", backgroundColor: (theme.clanCardHeader || theme.navigation).bg }}>
              <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="trophy-outline" size={24} color={(theme.clanCardHeader || theme.navigation).fg} />
              <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: (theme.clanCardHeader || theme.navigation).fg }}>Challenges</Text>
            </View>
            <TouchableRipple onPress={() => nav.navigate('UserSHCLite', { userid: user_id, date: dateString })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="star-half" size={24} color={theme.page_content.fg} />
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>Special Hunter Lite</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => nav.navigate('UserSHCPro', { userid: user_id, date: dateString })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="star" size={24} color={theme.page_content.fg} />
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>Special Hunter Pro</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>
          </Card>
        </View>
        {/* <View style={{ padding: 4, width: 500, maxWidth }}>
          <Card noPad>
            <View style={{ padding: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, flexDirection: "row", alignItems: "center", backgroundColor: (theme.clanCardHeader || theme.navigation).bg }}>
              <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="more-vertical" size={24} color={(theme.clanCardHeader || theme.navigation).fg} />
              <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: (theme.clanCardHeader || theme.navigation).fg }}>More</Text>
            </View>
            <TouchableRipple onPress={() => nav.navigate('UserSHCLite', { userid: user_id, date: dateString })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="star-half" size={24} color={theme.page_content.fg} />
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>ZeeQRew Checker</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => nav.navigate('UserQuest', { userid: user_id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons style={{ marginHorizontal: 4 }} name="run" size={24} color={theme.page_content.fg} />
                <Text allowFontScaling={false} style={{ paddingLeft: 4, ...font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{t('user:quebec_quest_progress')}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>
          </Card>
        </View> */}
      </ScrollView>
      <FAB.Group
        open={FABOpen}
        icon={() => <UserIcon size={56} user_id={user_id} />}
        actions={[
          ...Object.entries(logins).filter(i => i[0] != user_id).slice(0, 5).map(i => ({ icon: () => <UserIcon size={40} user_id={Number(i[0])} />, label: i[1].username, onPress: () => nav.replace('UserDetails', { userid: Number(i[0]) }) })),
          // ...(width<=1000?[{ icon: "menu", onPress: () => nav.toggleDrawer()}]:[])
        ]}
        onStateChange={({ open }) => setFABOpen(open)}
      />
    </View>
  );
}