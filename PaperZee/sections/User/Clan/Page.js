import * as React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator, TouchableHighlightComponent } from 'react-native';
import { Button } from 'react-native-paper';
import Card from '~sections/Shared/Card';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import RequirementsCard from '~sections/Clan/Cards/Requirements';
import useAPIRequest from '~hooks/useAPIRequest';
import useLevelColours from '~hooks/useLevelColours';
import { ClanRequirementsConverter } from '../../Clan/Data';
import font from '~sections/Shared/font';
import { FlatList } from 'react-native-gesture-handler';

function UserIcon({user_id,size}) { 
  return <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ marginLeft: -(size-24)/2, marginTop: -(size-24)/2, height: size, width: size }} />
}

export default function ClanScreen({ route }) {
  var selected_theme = useSelector(i=>i.theme);
  var theme = useSelector(i => i.themes[i.theme]);
  var dark = theme.dark;
  var [cookies,setCookies] = React.useState(0);
  var level_colors = useLevelColours()
  var [FABOpen,setFABOpen] = React.useState(false);
  var { t } = useTranslation();
  var nav = useNavigation();
  var logins = useSelector(i => i.logins);
  var user_id = Number(route.params.userid)
  var unformatted_requirements = useAPIRequest({
    endpoint: 'clan/v2/requirements',
    data: {clan_id:1349,game_id:87}
  })
  var data = useAPIRequest({
    endpoint: 'user/clanprogress',
    data: {user_id},
    cuppazee: true
  })
  if(!data) {
    return <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: theme.page.bg }}>
      <ActivityIndicator size="large" color={theme.page.fg} />
      {/* <Text allowFontScaling={false} style={{color:theme.page.fg,textAlign:"center",marginTop:4,fontSize:18}}>All of our elves are working hard on this</Text>
      <Text allowFontScaling={false} style={{color:theme.page.fg,textAlign:"center",marginTop:4,fontSize:14}}>This may still take a few moments, please be patient</Text>
      <Button
        style={{marginTop:4}}
        color={theme.page.fg}
        mode="contained"
        onPress={()=>setCookies(cookies+1)}
      >Feed the elves a cookie</Button>
      <Text allowFontScaling={false} style={{color:theme.page.fg,textAlign:"center",marginTop:4,fontSize:20}}>🍪 {cookies} Cookies Fed</Text> */}
    </View>
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
                  <Image source={{ uri: requirements?.requirements?.[i]?.icon }} style={{ width: 48, height: 48 }} />
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
          <RequirementsCard game_id={87}/>
        </View>
      </ScrollView>
      {/* <Portal> */}
        <FAB.Group
          open={FABOpen}
          icon={()=><UserIcon size={56} user_id={user_id}/>}
          actions={Object.entries(logins).filter(i=>i[0]!=user_id).slice(0,5).map(i=>({ icon: ()=><UserIcon size={40} user_id={Number(i[0])}/>, label: i[1].username, onPress: () => nav.replace('UserDetails',{userid:Number(i[0])}) }))}
          onStateChange={({open})=>setFABOpen(open)}
        />
      {/* </Portal> */}
    </View>
  );
}