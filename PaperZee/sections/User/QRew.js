import * as React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import Card from 'sections/Shared/Card';
import { useSelector } from 'react-redux';
import useAPIRequest from 'utils/hooks/useAPIRequest'
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';
import useMoment from 'utils/hooks/useMoment';
import UserFAB from './FAB';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ClanScreen({ route }) {
  var {t} = useTranslation();
  var moment = useMoment();
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
  if(theme.dark) {
    dark = true;
    level_colors.border = "#fffa"
  }
  var username = route.params.username;
  const user_data = useAPIRequest({
    endpoint: 'user',
    data: { username }
  })
  const user_id = user_data?.user_id;
  var data = useAPIRequest(user_id?{
    endpoint: `user/qrew/v1`,
    data: {
      username,
      user_id
    },
    cuppazee: true
  }:null)
  if(!data) return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  var tasksLS = [
    {amount:!!user_data?.premium,name:"Premium",qrew:true,zeeqrew:true,req:1,icon:"star"},
    {amount:data.cap.reduce((a,b)=>a+b.amount,0),name:"Captures",qrew:true,req:1000,icon:"check"},
    {amount:data.dep.reduce((a,b)=>a+b.amount,0),name:"Deploys",qrew:true,req:100,icon:"account"},
    {amount:data.cap.filter(i=>i.state=="physical").reduce((a,b)=>a+b.amount,0),zeeqrew:true,name:"Physical Captures",req:500,icon:"checkbox-marked"},
    {amount:data.dep.filter(i=>i.state=="physical").reduce((a,b)=>a+b.amount,0),zeeqrew:true,name:"Physical Deploys",req:250,icon:"account-box"},
    {amount:user_data?.points,name:"Total Points",zeeqrew:true,req:100000,icon:"arrow-up-bold-box"},
    {amount:data.recent_cap?moment(data.recent_cap).format('L'):false,name:"Recent Capture",qrew:true,zeeqrew:true,req:1,icon:"calendar-check"},
    {amount:data.recent_dep?moment(data.recent_dep).format('L'):false,name:"Recent Deploy",qrew:true,zeeqrew:true,req:1,icon:"calendar-account"},
  ]
  var tasks = [
    {amount:tasksLS.filter(i=>i.qrew&&(i.amount>=i.req||(i.amount&&i.req===1))).length,name:"QRew",req:tasksLS.filter(i=>i.qrew).length,icon:"hammer",m:true},
    ...tasksLS.filter(i=>i.qrew),
    {amount:tasksLS.filter(i=>i.zeeqrew&&(i.amount>=i.req||(i.amount&&i.req===1))).length,name:"ZeeQRew",pd:true,req:tasksLS.filter(i=>i.zeeqrew).length,icon:"wrench",m:true},
    ...tasksLS.filter(i=>i.zeeqrew),
  ]
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        <Text>{JSON.stringify(data.types)}</Text>
        {tasks?.map?.(i=><View style={{ padding: 4, paddingTop: i.pd?16:4 }}>
          <Card noPad>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ padding: 8 }}>
                <MaterialCommunityIcons name={i.icon} size={i.m?48:32} color={theme.page_content.fg} />
              </View>
              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ fontSize: i.m?20:16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{i.name}</Text>
                {/* <Text allowFontScaling={false} style={{fontSize:16,opacity:0.8}}><MaterialCommunityIcons name="sword-cross" size={16}/> The Cup of Coffee Clan</Text> */}
                <Text allowFontScaling={false} style={{ fontSize: 16,...font(500), color: theme.page_content.fg, opacity: 0.8 }}>{i.req!==1?`${i.amount?.toLocaleString?.()}/${i.req.toLocaleString?.()}`:(i.amount===true?'Yes':(i.amount===false?'No':i.amount))}</Text>
              </View>
              <View style={{alignSelf:"stretch",borderTopRightRadius:8,borderBottomRightRadius:8,borderLeftWidth:dark?2:0,borderLeftColor:dark?level_colors[(i.amount>=i.req||(i.amount&&i.req===1))?5:0]:undefined,backgroundColor:dark?undefined:level_colors[(i.amount>=i.req||(i.amount&&i.req===1))?5:0],width:60,alignItems:"center",justifyContent:"center"}}>
                {/* <Text allowFontScaling={false} style={{color:theme.page_content.fg}}>Level</Text> */}
                <Text allowFontScaling={false} style={{color:theme.page_content.fg,fontSize:24,...font("bold")}}>{(i.amount>=i.req||(i.amount&&i.req===1))?'✔':''}</Text>
              </View>
            </View>
          </Card>
        </View>)}
      </ScrollView>
      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}