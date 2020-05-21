import * as React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import Card from '~sections/Shared/Card';
import { useSelector, useDispatch } from 'react-redux';
import { FAB } from 'react-native-paper';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import useAPIRequest from '~sections/Shared/useAPIRequest'
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
  var tasks = [
    {id:1,name:"Mystery Caps/Deps",req:5,icon:"https://i.ibb.co/YdRQ3Sf/Split-Mystery.png"},
    {id:2,name:"Evo Caps/Deps",req:5,icon:"https://munzee.global.ssl.fastly.net/images/pins/evolution.png"},
    {id:3,name:"Weapon Caps/Deps",req:5,icon:"https://munzee.global.ssl.fastly.net/images/pins/mace.png"},
    {id:4,name:"Jewel Caps/Deps",req:3,icon:"https://munzee.global.ssl.fastly.net/images/pins/diamond.png"},
    {id:5,name:"Capture /m/XeresDan/1707",req:1,icon:"https://munzee.global.ssl.fastly.net/images/pins/social.png"}
  ]
  var [FABOpen,setFABOpen] = React.useState(false);
  var dispatch = useDispatch();
  var nav = useNavigation();
  var logins = useSelector(i => i.logins);
  var user_id = Number(route.params.userid)
  var data = useAPIRequest({
    endpoint: `user/quest/v1?user_id=${user_id}`,
    flameZee: true
  })
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        {!data?.output&&<Text style={{color:theme.page.fg,fontFamily:font()}}>Loading...</Text>}
        {tasks?.map?.(i=><View style={{ padding: 4 }}>
          <Card noPad>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ padding: 8 }}>
                <Image source={{ uri: i?.icon }} style={{ width: 48, height: 48 }} />
              </View>
              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text style={{ fontSize: 20, fontFamily: font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{i?.name}</Text>
                {/* <Text style={{fontSize:16,opacity:0.8}}><MaterialCommunityIcons name="sword-cross" size={16}/> The Cup of Coffee Clan</Text> */}
                <Text style={{ fontSize: 16,fontFamily:font(500), color: theme.page_content.fg, opacity: 0.8 }}>{data?.output?.[i.id]?.toLocaleString?.()}/{i.req}</Text>
              </View>
              <View style={{alignSelf:"stretch",borderTopRightRadius:8,borderBottomRightRadius:8,borderLeftWidth:dark?2:0,borderLeftColor:dark?level_colors[data?.output?.[i.id]>=i.req?5:0]:undefined,backgroundColor:dark?undefined:level_colors[data?.output?.[i.id]>=i.req?5:0],width:60,alignItems:"center",justifyContent:"center"}}>
                {/* <Text style={{color:theme.page_content.fg}}>Level</Text> */}
                <Text style={{color:theme.page_content.fg,fontSize:24,fontFamily:font("bold")}}>{data?.output?.[i.id]>=i.req?'✔':''}</Text>
              </View>
            </View>
          </Card>
        </View>)}
      </ScrollView>
      <FAB.Group
        open={FABOpen}
        icon={()=><UserIcon size={56} user_id={user_id}/>}
        actions={Object.entries(logins).filter(i=>i[0]!=user_id).slice(0,5).map(i=>({ icon: ()=><UserIcon size={40} user_id={Number(i[0])}/>, label: i[1].username, onPress: () => nav.replace('UserDetails',{userid:Number(i[0])}) }))}
        onStateChange={({open})=>setFABOpen(open)}
      />
    </View>
  );
}