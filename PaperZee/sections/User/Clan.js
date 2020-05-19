import * as React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Card from '~sections/Shared/Card';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { TouchableRipple, FAB, Portal } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import request from '~store/request'
import ActivityCard from './ActivityCard';
import RequirementsCard from '~sections/Clan/Cards/Requirements';

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
    // border:"#016930",
    // border:"white",
    // border: '#fff9', // < Changed from 7 to 9.. what do you think Sam?
    border: '#000a'
  }
  if(selected_theme.includes('dark')) {
    dark = true;
    level_colors.border = "#fffa"
  }
  var [FABOpen,setFABOpen] = React.useState(false);
  var dispatch = useDispatch();
  var { t } = useTranslation();
  var nav = useNavigation();
  var logins = useSelector(i => i.logins);
  var user_id = Number(route.params.userid)
  var { data: requirements } = useSelector(i => i.request_data[`clan/requirements/v1?game_id=${86}`] ?? {})
  var { data } = useSelector(i => i.request_data[`user/clan?user_id=${user_id}`] ?? {})
  useFocusEffect(
    React.useCallback(() => {
      dispatch(request.add(`user/clan?user_id=${user_id}`))
      dispatch(request.add(`clan/requirements/v1?game_id=${86}`))
      return () => {
        dispatch(request.remove(`user/clan?user_id=${user_id}`))
        dispatch(request.remove(`clan/requirements/v1?game_id=${86}`))
      };
    }, [])
  );
  function calculateLevel(requirement,value) {
    if(!requirements) return 0;
    let level = 0;
    for(var lev of requirements?.data?.levels||[]) {
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
        {/* <Text style={{color:"green"}}>{JSON.stringify(requirements)}</Text> */}
        {requirements?.data?.order?.requirements?.map?.(i=><View style={{ padding: 4 }}>
          <Card noPad>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ padding: 8 }}>
                <Image source={{ uri: requirements?.data?.requirements?.[i]?.icon }} style={{ width: 48, height: 48 }} />
              </View>
              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text style={{ fontSize: 20, fontWeight: "bold", color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{requirements?.data?.requirements?.[i]?.top} {requirements?.data?.requirements?.[i]?.bottom}</Text>
                {/* <Text style={{fontSize:16,opacity:0.8}}><MaterialCommunityIcons name="sword-cross" size={16}/> The Cup of Coffee Clan</Text> */}
                <Text style={{ fontSize: 16, fontWeight: "500", color: theme.page_content.fg, opacity: 0.8 }}>{data?.data?.[i]?.toLocaleString?.()}</Text>
              </View>
              {requirements?.data?.order?.individual?.includes?.(i)?<View style={{alignSelf:"stretch",borderTopRightRadius:8,borderBottomRightRadius:8,borderLeftWidth:dark?2:0,borderLeftColor:dark?level_colors[calculateLevel(i,data?.data?.[i])]:undefined,backgroundColor:dark?undefined:level_colors[calculateLevel(i,data?.data?.[i])],width:60,alignItems:"center",justifyContent:"center"}}>
                <Text style={{color:theme.page_content.fg}}>Level</Text>
                <Text style={{color:theme.page_content.fg,fontSize:24,fontWeight:"bold"}}>{calculateLevel(i,data?.data?.[i])}</Text>
              </View>:null}
            </View>
          </Card>
        </View>)}
        <RequirementsCard game_id={86}/>
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