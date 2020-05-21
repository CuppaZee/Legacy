import * as React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '~sections/Shared/Card';
import { useSelector } from 'react-redux';
import { TouchableRipple, FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import ActivityCard from './ActivityCard';
import useAPIRequest from '~sections/Shared/useAPIRequest';
import { useDimensions } from '@react-native-community/hooks';
import font from '~sections/Shared/font';

function UserIcon({user_id,size}) { 
  return <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ marginLeft: -(size-24)/2, marginTop: -(size-24)/2, height: size, width: size }} />
}

export default function DetailsScreen({ route }) {
  var {width} = useDimensions().window;
  var [FABOpen,setFABOpen] = React.useState(false);
  var nav = useNavigation();
  var theme = useSelector(i => i.themes[i.theme]);
  var logins = useSelector(i => i.logins);
  var user_id = Number(route.params.userid)
  const data = useAPIRequest({
    endpoint: 'user',
    data: {user_id}
  })
  return (
    <View style={{ flex: 1 }}>

      <ScrollView
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        <View style={{ padding: 4 }}>
          <ActivityCard user_id={user_id} />
        </View>
        <View style={{ padding: 4 }}>
          <Card noPad>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ padding: 8 }}>
                <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ width: 72, height: 72, borderRadius: 36 }} />
              </View>
              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text style={{ fontSize: 20, fontFamily: font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{data?.username}</Text>
                <Text style={{ fontSize: 16, fontFamily: font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="arrow-up-bold-hexagon-outline" size={16} /> Level {data?.level}</Text>
                <Text style={{ fontSize: 16, fontFamily: font(500), color: theme.page_content.fg, opacity: 0.8 }}><MaterialCommunityIcons name="trophy-outline" size={16} /> Rank #{data?.rank}</Text>
              </View>
            </View>

            {data?.clan?.id&&<TouchableRipple onPress={() => nav.navigate('Clan', { clanid: data?.clan?.id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/clan_logos/${data?.clan?.id?.toString?.(36)}.png` }} style={{ width: 24, height: 24, borderRadius: 12 }} />
                <Text style={{ paddingLeft: 4, fontFamily: font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>{data?.clan?.name}</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>}
            <TouchableRipple disabled={!logins[user_id]} onPress={() => nav.navigate('UserInventory', { userid: user_id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons name="package" size={24} color={theme.page_content.fg} />
                <Text style={{ paddingLeft: 4, fontFamily: font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>Inventory</Text>
                <MaterialCommunityIcons name={logins[user_id] ? 'chevron-right' : 'lock'} size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => nav.navigate('UserClan', { userid: user_id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons name="star" size={24} color={theme.page_content.fg} />
                <Text style={{ paddingLeft: 4, fontFamily: font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>Clan Progress</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>
            <TouchableRipple onPress={() => nav.navigate('UserQuest', { userid: user_id })}>
              <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                <MaterialCommunityIcons name="run" size={24} color={theme.page_content.fg} />
                <Text style={{ paddingLeft: 4, fontFamily: font("bold"), fontSize: 16, flex: 1, color: theme.page_content.fg }}>Quebec Quest Progress</Text>
                <MaterialCommunityIcons name="chevron-right" size={24} color={theme.page_content.fg} />
              </View>
            </TouchableRipple>
          </Card>
        </View>
      </ScrollView>
      <FAB.Group
        open={FABOpen}
        icon={()=><UserIcon size={56} user_id={user_id}/>}
        actions={[
          ...Object.entries(logins).filter(i=>i[0]!=user_id).slice(0,5).map(i=>({ icon: ()=><UserIcon size={40} user_id={Number(i[0])}/>, label: i[1].username, onPress: () => nav.replace('UserDetails',{userid:Number(i[0])}) })),
          // ...(width<=1000?[{ icon: "menu", onPress: () => nav.toggleDrawer()}]:[])
        ]}
        onStateChange={({open})=>setFABOpen(open)}
      />
    </View>
  );
}