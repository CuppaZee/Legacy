import * as React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';
import Card from 'sections/Shared/Card';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import RequirementsCard from 'sections/Clan/Cards/Requirements';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import useLevelColours from 'utils/hooks/useLevelColours';
import { ClanRequirementsConverter } from '../../Clan/Data';
import font from 'sections/Shared/font';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import getIcon from 'utils/db/icon';
import UserFAB from '../FAB';

export default function ClanScreen({ route }) {
  var theme = useSelector(i => i.themes[i.theme]);
  var dark = theme.dark;
  var level_colors = useLevelColours()
  var { t } = useTranslation();
  var username = route.params.username;
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: i=>i?.user_id
  })
  var unformatted_requirements = useAPIRequest({
    endpoint: 'clan/v2/requirements',
    data: {clan_id:1349,game_id:88}
  })
  var data = useAPIRequest(user_id?{
    endpoint: 'user/clanprogress',
    data: {user_id},
    cuppazee: true
  }:null)
  if (!data) {
    if(data===undefined) {
      return <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg}}>
        <ActivityIndicator size="large" color={theme.page_content.fg} />
      </View>
    } else {
      return <View style={{flex: 1, justifyContent: "center", alignItems: "center", backgroundColor:'#ffaaaa'}}>
        <MaterialCommunityIcons name="alert" size={48} color="#d00" />
      </View>;
    }
  }
  var requirements = ClanRequirementsConverter(unformatted_requirements);
  function calculateLevel(requirement,value) {
    if(!requirements) return 0;
    let level = 0;
    for(var lev of requirements?.levels||[]) {
      if(value >= (lev?.individual?.[requirement]||0)) {
        level++;
      }
    }
    return level;
  }
  return (
    <View style={{ flex: 1 }}>

      <ScrollView
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        <FlatList
          style={{flexGrow:0}}
          data={requirements?.order?.requirements}
          extraData={data}
          renderItem={({item:i})=><View style={{ padding: 4 }}>
            <Card noPad>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <View style={{ padding: 8 }}>
                  <Image source={getIcon(requirements?.requirements?.[i]?.icon)} style={{ width: 48, height: 48 }} />
                </View>
                <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                  <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{requirements?.requirements?.[i]?.top} {requirements?.requirements?.[i]?.bottom}</Text>
                  {/* <Text allowFontScaling={false} style={{ fontSize: 12, fontWeight: "500", color: theme.page_content.fg, opacity: 0.8 }}>{requirements?.requirements?.[i]?.description}</Text> */}
                  <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}>{data?.[i]?.toLocaleString?.()||'0'}</Text>
                </View>
                {requirements?.order?.individual?.includes?.(i)?<View style={{alignSelf:"stretch",borderTopRightRadius:8,borderBottomRightRadius:8,borderLeftWidth:dark?2:0,borderLeftColor:dark?level_colors[calculateLevel(i,data?.[i])].fg:undefined,backgroundColor:dark?undefined:level_colors[calculateLevel(i,data?.[i])].bg,width:60,alignItems:"center",justifyContent:"center"}}>
                  <Text allowFontScaling={false} style={{color:dark?theme.page_content.fg:level_colors[calculateLevel(i,data?.[i])].fg,...font()}}>{t('clan:level',{count:1})}</Text>
                  <Text allowFontScaling={false} style={{color:dark?theme.page_content.fg:level_colors[calculateLevel(i,data?.[i])].fg,fontSize:24,...font("bold")}}>{calculateLevel(i,data?.[i])}</Text>
                </View>:null}
              </View>
            </Card>
          </View>}
        />
        <View style={{padding:4,flex:1}}>
          <RequirementsCard game_id={88}/>
        </View>
      </ScrollView>
      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}