
import * as React from 'react';

import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';

import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
import UserFAB from './FAB';

export default function ClanScreen({
  route
}: any) {
  var {t} = useTranslation();
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
  var tasks = [
    {id:1,name:"Mystery Caps/Deps",req:8,icon:"https://i.ibb.co/YdRQ3Sf/Split-Mystery.png"},
    {id:2,name:"Evo Caps/Deps",req:10,icon:"https://munzee.global.ssl.fastly.net/images/pins/evolution.png"},
    // {id:3,name:"Weapon Caps/Deps",req:5,icon:"https://munzee.global.ssl.fastly.net/images/pins/mace.png"},
    // {id:4,name:"Jewel Caps/Deps",req:3,icon:"https://munzee.global.ssl.fastly.net/images/pins/diamond.png"},
    // {id:5,name:"Capture /m/XeresDan/1707",req:1,icon:"https://munzee.global.ssl.fastly.net/images/pins/social.png"}
    // {id:6,name:"Flat Friend Deps",req:3,icon:"https://munzee.global.ssl.fastly.net/images/pins/flatrob.png"},
    {id:9,name:"Flat Friend Caps/Deps",req:10,icon:"https://munzee.global.ssl.fastly.net/images/pins/flatrob.png"},
    {id:7,name:"Destination Caps/Deps",req:15,icon:"https://munzee.global.ssl.fastly.net/images/pins/1starmotel.png"},
    // {id:8,name:"Bouncer Caps",req:5,icon:"https://munzee.global.ssl.fastly.net/images/pins/expiring_specials_filter.png"},
    {id:10,name:"Capture \"/m/GPSmAQ/1\"",req:1,icon:"https://munzee.global.ssl.fastly.net/images/pins/social.png"},
  ]
  var username = route.params.username;
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: (i: any) => i?.user_id
  })
  var data = useAPIRequest({
    endpoint: `user/quest/v1`,
    data: {
      user_id,
      game_id: 3
    },
    cuppazee: true
  })
  if(!data) return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page.bg}}>
    <ActivityIndicator size="large" color={theme.page.fg} />
  </View>
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        {!data&&<Text allowFontScaling={false} style={{color:theme.page.fg,...font()}}>Loading...</Text>}
        {tasks?.map?.(i=><View style={{ padding: 4 }}>
          <Card noPad>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <View style={{ padding: 8 }}>
                <Image source={getIcon(i?.icon)} style={{ width: 48, height: 48 }} />
              </View>
              <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
                <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{t(`quest:task_${i.id}`)}</Text>
                {/* <Text allowFontScaling={false} style={{fontSize:16,opacity:0.8}}><MaterialCommunityIcons name="sword-cross" size={16}/> The Cup of Coffee Clan</Text> */}
                <Text allowFontScaling={false} style={{ fontSize: 16,...font(500), color: theme.page_content.fg, opacity: 0.8 }}>{data?.[i.id]?.toLocaleString?.()}/{i.req}</Text>
              </View>
              <View style={{alignSelf:"stretch",borderTopRightRadius:8,borderBottomRightRadius:8,borderLeftWidth:dark?2:0,borderLeftColor:dark?level_colors[data?.[i.id]>=i.req?5:0]:undefined,backgroundColor:dark?undefined:level_colors[data?.[i.id]>=i.req?5:0],width:60,alignItems:"center",justifyContent:"center"}}>
                {/* <Text allowFontScaling={false} style={{color:theme.page_content.fg}}>Level</Text> */}
                <Text allowFontScaling={false} style={{color:theme.page_content.fg,fontSize:24,...font("bold")}}>{data?.[i.id]>=i.req?'✔':''}</Text>
              </View>
            </View>
          </Card>
        </View>)}
      </ScrollView>
      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}