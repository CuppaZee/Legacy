// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
// @ts-expect-error ts-migrate(6142) FIXME: Module './FAB' was resolved to 'C:/Users/samst/Des... Remove this comment to see the full error message
import UserFAB from './FAB';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function ClanScreen({
  route
}: any) {
  var {t} = useTranslation();
  var moment = useMoment();
  var theme = useSelector((i: any) => i.themes[i.theme]);
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
  var {data,status} = useAPIRequest(user_id?{
    endpoint: `user/qrew/v1`,
    data: {
      username,
      user_id
    },
    cuppazee: true
  }:null,true)
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  if(status === "loading") return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <ActivityIndicator size="large" color={theme.page.fg} />
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Text>{JSON.stringify(status)}</Text>
  </View>
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  if(status) return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <MaterialCommunityIcons name="alert" color={theme.page.fg} size={48} />
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{t('error:'+status)}</Text>
  </View>
  var tasksLS = [
    {amount:!!user_data?.premium,name:t('qrew:premium'),qrew:true,zeeqrew:true,req:1,icon:"star"},
    {amount:data.cap.reduce((a: any,b: any)=>a+b.amount,0),name:t('qrew:captures'),qrew:true,req:1000,icon:"check"},
    {amount:data.dep.reduce((a: any,b: any)=>a+b.amount,0),name:t('qrew:deploys'),qrew:true,req:100,icon:"account"},
    {amount:data.cap.filter((i: any) => i.state=="physical").reduce((a: any,b: any)=>a+b.amount,0),zeeqrew:true,name:t('qrew:physical_captures'),req:500,icon:"checkbox-marked"},
    {amount:data.dep.filter((i: any) => i.state=="physical").reduce((a: any,b: any)=>a+b.amount,0),zeeqrew:true,name:t('qrew:physical_deploys'),req:250,icon:"account-box"},
    {amount:user_data?.points,name:t('qrew:total_points'),zeeqrew:true,req:100000,icon:"arrow-up-bold-box"},
    {amount:data.recent_cap?moment(data.recent_cap).format('L'):false,notext:t(`qrew:no_capture`,{from:moment(data.earliest).tz('America/Chicago').format('L'),to:moment(data.next_check).add(-1,'second').tz('America/Chicago').format('L')}),name:t('qrew:recent_capture'),qrew:true,zeeqrew:true,req:1,icon:"calendar-check"},
    {amount:data.recent_dep?moment(data.recent_dep).format('L'):false,notext:t(`qrew:no_deploy`,{from:moment(data.earliest).tz('America/Chicago').format('L'),to:moment(data.next_check).add(-1,'second').tz('America/Chicago').format('L')}),name:t('qrew:recent_deploy'),qrew:true,zeeqrew:true,req:1,icon:"calendar-account"},
  ]
  var tasks = [
    {amount:tasksLS.filter(i=>i.qrew&&(i.amount>=i.req||(i.amount&&i.req===1))).length,name:"QRew",pd:true,req:tasksLS.filter(i=>i.qrew).length,icon:"hammer",m:true},
    ...tasksLS.filter(i=>i.qrew),
    {amount:tasksLS.filter(i=>i.zeeqrew&&(i.amount>=i.req||(i.amount&&i.req===1))).length,name:"ZeeQRew",pd:true,req:tasksLS.filter(i=>i.zeeqrew).length,icon:"wrench",m:true},
    ...tasksLS.filter(i=>i.zeeqrew),
  ]
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ScrollView
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ padding: 4, paddingTop: 4 }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Card noPad>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ padding: 8 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <MaterialCommunityIcons name="clock" size={32} color={theme.page_content.fg} />
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{t('qrew:check_time')}</Text>
                {/* <Text allowFontScaling={false} style={{fontSize:16,opacity:0.8}}><MaterialCommunityIcons name="sword-cross" size={16}/> The Cup of Coffee Clan</Text> */}
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ fontSize: 16,...font(500), color: theme.page_content.fg, opacity: 0.8 }}>{moment(data.next_check).format('L')} - {moment(data.next_check).fromNow()}</Text>
              </View>
            </View>
          </Card>
        </View>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {tasks?.map?.(i=><View style={{ padding: 4, paddingTop: i.pd?16:4 }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Card noPad>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ padding: 8 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <MaterialCommunityIcons name={i.icon} size={i.m?48:32} color={theme.page_content.fg} />
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ fontSize: i.m?20:16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{i.name}</Text>
                {/* <Text allowFontScaling={false} style={{fontSize:16,opacity:0.8}}><MaterialCommunityIcons name="sword-cross" size={16}/> The Cup of Coffee Clan</Text> */}
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ fontSize: 16,...font(500), color: theme.page_content.fg, opacity: 0.8 }}>{i.req!==1?`${i.amount?.toLocaleString?.()}/${i.req.toLocaleString?.()}`:(i.amount===true?'Yes':(i.amount===false?(i.notext??'No'):i.amount))}</Text>
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{alignSelf:"stretch",borderTopRightRadius:8,borderBottomRightRadius:8,borderLeftWidth:dark?2:0,borderLeftColor:dark?level_colors[(i.amount>=i.req||(i.amount&&i.req===1))?5:0]:undefined,backgroundColor:dark?undefined:level_colors[(i.amount>=i.req||(i.amount&&i.req===1))?5:0],width:60,alignItems:"center",justifyContent:"center"}}>
                {/* <Text allowFontScaling={false} style={{color:theme.page_content.fg}}>Level</Text> */}
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{color:theme.page_content.fg,fontSize:24,...font("bold")}}>{(i.amount>=i.req||(i.amount&&i.req===1))?'✔':''}</Text>
              </View>
            </View>
          </Card>
        </View>)}
      </ScrollView>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}