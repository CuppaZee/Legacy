import * as React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import Card from '~sections/Shared/Card';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import RequirementsCard from '~sections/Clan/Cards/Requirements';
import useAPIRequest from '~sections/Shared/useAPIRequest';
import MHQ from '~sections/Shared/MHQ';
import { ClanRequirementsConverter } from '../../Clan/Data';
import font from '~sections/Shared/font';

function UserIcon({user_id,size}) { 
  return <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ marginLeft: -(size-24)/2, marginTop: -(size-24)/2, height: size, width: size }} />
}

export default function ClanScreen({ route }) {
  var selected_theme = useSelector(i=>i.theme);
  var theme = useSelector(i => i.themes[i.theme]);
  var dark = false;
  var level_colors = {
    ind: "#ffe97f",
    bot: "#dff77e",
    gro: "#b0fc8d",
    0:   "#eb0000",
    1:   "#ef6500",
    2:   "#fa9102",
    3:   "#fcd302",
    4:   "#bfe913",
    5:   "#55f40b",
    null:"#e3e3e3",
    border: '#000a'
  }
  if(selected_theme.includes('dark')) {
    dark = true;
    level_colors.border = "#fffa"
  }
  var [FABOpen,setFABOpen] = React.useState(false);
  var { t } = useTranslation();
  var nav = useNavigation();
  var logins = useSelector(i => i.logins);
  var user_id = Number(route.params.userid)
  var arr = []
  var current_date = MHQ();
  for(var i = 3;i <= current_date.date();i++) {
    arr.push(i);
  }
  var unformatted_requirements = useAPIRequest({
    endpoint: 'clan/v2/requirements',
    data: {clan_id:1349,game_id:86}
  })
  var unformatted_data = useAPIRequest(arr.map(i=>({
    endpoint: 'statzee/player/day',
    data: {day:`${current_date.year()}-${(current_date.month()+1).toString().padStart(2,'0')}-${i.toString().padStart(2,'0')}`},
    user: user_id,
    converter: "ClanProgress"
  })))
  var gotData = false;
  var data = {};
  if(!(unformatted_data.findIndex(i=>!i)+1)) {
    gotData = true;
    for(let day of unformatted_data) {
      for(let x in day) {
        data[x] = (data[x]||0) + day[x];
      }
    }
  }
  if(!gotData) {
    return <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page.bg }}>
      <ActivityIndicator size="large" color={theme.page.fg} />
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
        {gotData&&requirements?.order?.requirements?.map?.(i=><View style={{ padding: 4 }}>
          <Card noPad>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ padding: 8 }}>
                <Image source={{ uri: requirements?.requirements?.[i]?.icon }} style={{ width: 48, height: 48 }} />
              </View>
              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{requirements?.requirements?.[i]?.top} {requirements?.requirements?.[i]?.bottom}</Text>
                {/* <Text style={{ fontSize: 12, fontWeight: "500", color: theme.page_content.fg, opacity: 0.8 }}>{requirements?.requirements?.[i]?.description}</Text> */}
                <Text style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}>{data?.[i]?.toLocaleString?.()||'0'}</Text>
              </View>
              {requirements?.order?.individual?.includes?.(i)?<View style={{alignSelf:"stretch",borderTopRightRadius:8,borderBottomRightRadius:8,borderLeftWidth:dark?2:0,borderLeftColor:dark?level_colors[calculateLevel(i,data?.[i])]:undefined,backgroundColor:dark?undefined:level_colors[calculateLevel(i,data?.[i])],width:60,alignItems:"center",justifyContent:"center"}}>
                <Text style={{color:theme.page_content.fg,...font()}}>Level</Text>
                <Text style={{color:theme.page_content.fg,fontSize:24,...font("bold")}}>{calculateLevel(i,data?.[i])}</Text>
              </View>:null}
            </View>
          </Card>
        </View>)}
        {gotData&&<RequirementsCard game_id={86}/>}
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