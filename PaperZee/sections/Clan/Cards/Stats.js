import * as React from 'react';
import { Text, View, Image, ScrollView, Picker, FlatList, TouchableHighlight, Platform, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableRipple, Menu } from 'react-native-paper';
import request from '~store/request'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Card from '~sections/Shared/Card';
import s from '~store';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {ClanRequirementsConverter,ClanStatsConverter} from '../Data';
import useAPIRequest from '~sections/Shared/useAPIRequest';
import font from '~sections/Shared/font';
var { levelSelect: levelSelectX } = s

var countup = (t) => (a, b) => {
  a[b[t]] = (a[b[t]] || 0) + 1;
  return a;
}

var count = (array, t) => {
  return Object.entries(array.reduce((a, b) => {
    a[b[t]] = (a[b[t]] || 0) + 1;
    return a;
  }, {})).sort((a, b) => b[1] - a[1])
}

function MainScrollView ({scroll,children,s}) {
  if(scroll) return <ScrollView horizontal={true} style={{flex:1}} contentContainerStyle={{flexDirection:"row",minWidth:'100%',paddingLeft:100*s}}>
    {children}
  </ScrollView>
  return <View style={{flex:1,flexDirection:"row",minWidth:'100%',paddingLeft:100*s}}>
    {children}
  </View>
}

export default function UserActivityDash({ game_id, clan_id, scale: s }) {
  var scroll = false;
  if(s === undefined) {
    scroll = true;
    s = 1;
  }
  var theme = useSelector(i=>i.themes[i.theme]);
  var selected_theme = useSelector(i=>i.theme);
  var darkBG = undefined;
  //else {
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
    darkBG = theme.page_content.bg;
    level_colors.border = "#fffa"
  }
  // }

  var [levelTable,setLevelTable] = React.useState(false);
  var nav = useNavigation();
  var date = new Date(Date.now() - (5 * 60 * 60000));
  var dateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${(date.getUTCDate()).toString().padStart(2, '0')}`
  var dispatch = useDispatch();
  // var { data } = useSelector(i => i.request_data[`clan/requirements/v1?game_id=${game_id}`] ?? {})
  // var { data: clan_data } = useSelector(i => i.request_data[`clan/details/v1?game_id=${game_id}&clan_id=${clan_id}`] ?? {})
  // var clan = clan_data;
  var tick = useSelector(i => i.tick)
  var ls = useSelector(i => i.clanLevelSelect[clan_id]??4);
  var levelSelect = Number(ls.toString().slice(0,1));
  var share = !!ls.toString().slice(1,2);
  var [userLevelSelect,setUserLevelSelect] = React.useState(false);
  var [clanLevelSelect,setClanLevelSelect] = React.useState(false);
  function setLevelSelect(val) {
    var x = {};
    x[clan_id] = val;
    return dispatch(levelSelectX(x));
  }
  var [showGhost,setShowGhost] = React.useState(true);
  
  // useFocusEffect(
  //   React.useCallback(() => {
  //     dispatch(request.add(`clan/requirements/v1?game_id=${game_id}`))
  //     dispatch(request.add(`clan/details/v1?game_id=${game_id}&clan_id=${clan_id}`))
  //     return () => {
  //       dispatch(request.remove(`clan/requirements/v1?game_id=${game_id}`))
  //       dispatch(request.remove(`clan/details/v1?game_id=${game_id}&clan_id=${clan_id}`))
  //     };
  //   }, [game_id, clan_id])
  // );
  const shadow_clans = [
    -1,
    457,
    1349,
    1441,
    1870,
    1902,
    2042
  ]
  var [unformatted_clan,unformatted_stats,unformatted_shadow] = useAPIRequest([
    Number(clan_id)>=0?{
      endpoint: 'clan/v2',
      data: {clan_id}
    }:null,
    Number(clan_id)>=0?{
      endpoint: 'clan/v2/requirements',
      data: {clan_id,game_id}
    }:{
      endpoint: 'clan/v2/requirements',
      data: {clan_id:1349,game_id}
    },
    shadow_clans.includes(Number(clan_id))?{
      endpoint: `clan/shadow/v1`,
      data: {clan_id,game_id},
      cuppazee: true
    }:null
  ])
  var data = ClanRequirementsConverter(unformatted_stats);
  var clan_data = ClanStatsConverter(Number(clan_id)<0?{shadow:true}:unformatted_clan,unformatted_stats,showGhost?unformatted_shadow:{});
  var clan = clan_data;

  var members = clan?.members??[];
  var [ascending,setAscending] = React.useState(false);
  var [sortReq,setSortReq] = React.useState(3);
  members.sort((a,b) => {
    return clan?.requirements?.[sortReq]?.users?.[(ascending?a:b).user_id] - clan?.requirements?.[sortReq]?.users?.[(ascending?b:a).user_id];
  })

  function calculateLevel(user,value,requirement) {
    var x = false;
    var lvl = 0;
    for(var level of data?.levels) {
      if(level[user?"individual":"group"][requirement]) x = true;
      if(level[user?"individual":"group"][requirement] <= value || !level[user?"individual":"group"][requirement]) lvl = (lvl||0) + 1;
    }
    if(levelTable && x) {
      if(levelSelect+1 > lvl) {
        return 0;
      } else {
        return levelSelect+1;
      }
    }
    return x?lvl:null;
  }

  function num(x="noauth",y) {
    return Number(x)<1?(y?"-":"-"):Number(x).toLocaleString();
  }

  function calculateLevelT(user) {
    if(user) {
      var lev = Infinity;
      for(var requirement of data?.order?.individual) {
        var lvl = 0;
        var x = false;
        for(var level of data?.levels) {
          if(level.individual[requirement]) x = true;
          if(level.individual[requirement] <= clan?.requirements?.[requirement]?.users?.[user] || !level.individual[requirement]) lvl = (lvl||0) + 1;
        }
        if(x) lev = Math.min(lev,(lvl||0));
      
      }
      if(levelTable) {
        if(levelSelect+1 > lev) {
          return 0;
        } else {
          return levelSelect+1;
        }
      }
      return lev;
    } else {
      var lev = Infinity;
      for(var user of clan?.members) {
        lev = Math.min(lev,calculateLevelT(user.user_id));
      }
      for(var requirement of data?.order?.group) {
        var lvl = 0;
        var x = false;
        for(var level of data?.levels) {
          if(level.group[requirement]) x = true;
          if(level.group[requirement] <= clan?.requirements?.[requirement]?.total || !level.group[requirement]) lvl = (lvl||0) + 1;
        }
        if(x) lev = Math.min(lev,(lvl||0));
      }
      if(levelTable) {
        if(levelSelect+1 > lev) {
          return 0;
        } else {
          return levelSelect+1;
        }
      }
      return lev;
    }
  }
  if (!data?.levels || !clan?.details || !clan?.members) {
    if (!data || !clan) {
      return (
        <Card>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="large" color={theme.page_content.fg} />
          </View>
        </Card>
      )
    } else {
      return (
        <Card cardStyle={{backgroundColor:theme.error.bg}}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <Text style={{color:theme.error.fg,...font()}}>An Error Occurred</Text>
          </View>
        </Card>
      );
    }
  }
  return (
    // <View style={{ flex: 1, alignItems: "stretch", flexDirection: "column", backgroundColor: "#e9ffdc"??"#e6fcd9", borderRadius: 8 }}>
    <Card noPad>
      <View style={{ ...(darkBG?{borderBottomWidth: 2*s, borderBottomColor: level_colors.border}:{}), backgroundColor: (theme.clanCardHeader||theme.navigation).bg, paddingHorizontal: 8*s, borderTopLeftRadius: 8*s, borderTopRightRadius: 8*s, flexDirection: "row", alignItems: "center" }}>
        <View style={{flex:1,paddingVertical:8*s}}>
    <Text style={{ color: (theme.clanCardHeader||theme.navigation).fg, ...font("bold"), fontSize: 12*s, opacity: 0.7, lineHeight: 12*s }}>{clan?.details?.goal??'Shadow Clan'}{clan?.details?.goal&&' Goal'} - {levelTable?'Subtract View':'Total View'}{!showGhost&&" - Hiding Shadow Members"}</Text>
          <Text style={{ color: (theme.clanCardHeader||theme.navigation).fg, ...font("bold"), fontSize: 16*s, lineHeight: 16*s }}>{clan?.details?.name}</Text>
        </View>
        {shadow_clans.includes(Number(clan_id))&&Number(clan_id)>=0&&<TouchableRipple style={{borderRadius:24*s,padding:4*s}} onPress={()=>{setShowGhost(!showGhost)}}>
          <MaterialCommunityIcons name="ghost" size={24*s} color={(theme.clanCardHeader||theme.navigation).fg} />
        </TouchableRipple>}
        <TouchableRipple style={{borderRadius:24*s,padding:4*s}} onPress={()=>{setLevelTable(!levelTable)}}>
          <MaterialCommunityIcons name="plus-minus" size={24*s} color={(theme.clanCardHeader||theme.navigation).fg} />
        </TouchableRipple>
      </View>
        {/* <View style={{flex:1,paddingVertical:8}}>
          <Text style={{ color: "white", ...font("bold"), fontSize: 12, opacity: 0.7, lineHeight: 12 }}>{clan?.details?.goal??'Shadow Clan'}</Text>
          <Text style={{ color: "white", ...font("bold"), fontSize: 16, lineHeight: 16 }}>{clan?.details?.name}</Text>
        </View>
      </View> */}
      <View style={{flexDirection:"row"}}>
        <MainScrollView scroll={scroll} s={s}>
          <View style={{flexDirection:"column",flexGrow:1,alignItems:"stretch",backgroundColor:level_colors.null}}>
            <View style={{flexDirection:"row",marginRight:1}}>
              {(data?.order?.requirements??[]).map(i=><View style={{flexGrow:1}}>
                <TouchableRipple onPress={()=>{
                  if(sortReq!==i) {
                    setSortReq(i);
                    setAscending(false);
                  } else {
                    setAscending(!ascending);
                  }
                }}>
                  <View style={{height:(96-19)*s,padding:4*s,alignItems:"center",backgroundColor:darkBG??level_colors[data?.order.individual.includes(i)?(data?.order.group.includes(i)?'bot':'ind'):'gro']}}>
                    <Image source={{uri:data?.requirements?.[i]?.icon??data?.requirements?.[i]?.icons?.[tick%data?.requirements?.[i]?.icons?.length]}} style={{height:36*s,width:36*s}} />
                    <View style={{flexDirection:"row",alignItems:"baseline"}}>
                      <Text numberOfLines={1} style={{color:darkBG&&level_colors[data?.order.individual.includes(i)?(data?.order.group.includes(i)?'bot':'ind'):'gro'],textAlign:"center",...font("bold"),fontSize:12*s}}>{data?.requirements?.[i]?.top}</Text>
                      <MaterialCommunityIcons color={darkBG&&level_colors[data?.order.individual.includes(i)?(data?.order.group.includes(i)?'bot':'ind'):'gro']} name={sortReq===i?(ascending?'menu-up':'menu-down'):'menu-swap'} size={12*s}/>
                    </View>
                    <Text numberOfLines={1} style={{color:darkBG&&level_colors[data?.order.individual.includes(i)?(data?.order.group.includes(i)?'bot':'ind'):'gro'],textAlign:"center",...font(),fontSize:12*s}}>{data?.requirements?.[i]?.bottom}</Text>
                  </View>
                </TouchableRipple>
                <View style={{borderBottomWidth:2*s,borderBottomColor:level_colors.border,marginHorizontal:-1*s,height:24*s,padding:4*s,alignItems:"center",backgroundColor:darkBG??level_colors[levelSelect+1]}}>
                  {
                    share?
                    <Text style={{textAlign:"center",...font(),width:'100%',fontSize:12*s,color:darkBG&&level_colors[levelSelect+1]}}>{num(Math.max(data?.levels?.[levelSelect]?.individual?.[i]||0,Math.ceil((data?.levels?.[levelSelect]?.group?.[i]||0)/(clan?.members?.length||100)),0),true)}</Text>
                    :<Text style={{textAlign:"center",...font(),width:'100%',fontSize:12*s,color:darkBG&&level_colors[levelSelect+1]}}>{num(data?.levels?.[levelSelect]?.individual?.[i]||0,true)}</Text>
                  }
                </View>
                {members?.map(u=><View style={{marginHorizontal:-1*s,height:24*s,padding:4*s,alignItems:"center",backgroundColor:darkBG??level_colors[calculateLevel(true,clan.requirements?.[i]?.users?.[u.user_id],i)]}}>
                  <Text style={{flexDirection:"row",textAlign:"center",width:'100%',...font(),fontSize:12*s,color:darkBG&&level_colors[calculateLevel(true,clan.requirements?.[i]?.users?.[u.user_id],i)]}}>
                    {levelTable?num((data?.levels?.[levelSelect]?.individual?.[i]||0) - clan.requirements?.[i]?.users?.[u.user_id]):num(clan.requirements?.[i]?.users?.[u.user_id])}
                    {/* <Text style={{paddingLeft:2,fontSize:12,lineHeight:6,textAlignVertical:'top',color:theme.page_content.fg}}>{calculateLevel(true,clan.requirements?.[i]?.users?.[u.user_id],i)}</Text> */}
                  </Text>
                </View>)}
                <View style={{borderTopWidth:2*s,borderTopColor:level_colors.border,marginHorizontal:-1*s,height:24*s,padding:4*s,alignItems:"center",backgroundColor:darkBG??level_colors[calculateLevel(false,clan.requirements?.[i]?.total,i)]}}>
                  <Text style={{textAlign:"center",width:'100%',...font(),fontSize:12*s,color:darkBG&&level_colors[calculateLevel(false,clan.requirements?.[i]?.total,i)]}}>
                    {levelTable?num((data?.levels?.[levelSelect]?.group?.[i]||0) - clan.requirements?.[i]?.total):num(clan.requirements?.[i]?.total)}
                  </Text>
                </View>
                <View style={{marginHorizontal:-1*s,height:24*s,padding:4*s,alignItems:"center",backgroundColor:darkBG??level_colors[levelSelect+1]}}>
                  <Text style={{textAlign:"center",width:'100%',...font(),fontSize:12*s,color:darkBG&&level_colors[levelSelect+1]}}>{num(data?.levels?.[levelSelect]?.group?.[i]||0,true)}</Text>
                </View>
              </View>)}
            </View>
          </View>
        </MainScrollView>


        <View style={{width:101*s,position:"absolute",left:0,top:0,borderRightWidth:2*s,borderRightColor:level_colors.border}}>
          {/* height:Platform.OS=="web"?76:77, */}
          <View style={{height:(96-19)*s,backgroundColor:darkBG??level_colors.null,flexDirection:"row",alignItems:"center",padding:4*s}}><Text style={{fontSize:12*s,...font(),color:darkBG&&level_colors.null}}>Players ({clan?.members?.length})</Text></View>
          <View style={{borderBottomWidth:2*s,borderBottomColor:level_colors.border,height:24*s,justifyContent:"center",backgroundColor:darkBG??level_colors[levelSelect+1]}}>
            <Menu
              visible={userLevelSelect}
              onDismiss={()=>setUserLevelSelect(false)}
              position="bottom"
              anchor={
                <TouchableRipple style={{height:24*s,justifyContent:"center",paddingHorizontal:4*s}} onPress={()=>setUserLevelSelect(true)}>
                  <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Text style={{fontSize:12*s,flex:1,color:darkBG&&level_colors[levelSelect+1],...font()}}>{data?.levels?.[levelSelect]?.name} {(ls||"")?.endsWith?.('s')?'Share':'Indiv'}</Text>
                    <MaterialCommunityIcons color={darkBG&&level_colors[levelSelect+1]} name="chevron-down" size={12} />
                  </View>
                </TouchableRipple>
              }
              contentContainerStyle={{padding:0}}
            >
              {data?.levels?.map((i,index)=><Menu.Item
                key={index}
                style={{padding:4*s,paddingVertical:0,backgroundColor:level_colors[index+1]}}
                onPress={() => {setLevelSelect(index);setUserLevelSelect(false)}}
                title={<Text style={{fontSize:12*s,...font()}}>{i.name + " Indiv"}</Text>}
              />)}
              {data?.levels?.map((i,index)=><Menu.Item
                key={index+'s'}
                style={{padding:4*s,paddingVertical:0,backgroundColor:level_colors[index+1]}}
                onPress={() => {setLevelSelect(index+'s');setUserLevelSelect(false)}}
                title={<Text style={{fontSize:12*s,...font()}}>{i.name + " Share"}</Text>}
              />)}
            </Menu>
          </View>
          {members?.map(i=><TouchableWithoutFeedback onPress={()=>nav.navigate('UserDetails',{userid:i.user_id})}>
            <View style={{backgroundColor:darkBG??level_colors[calculateLevelT(i.user_id)],padding:4*s,height:24*s,flexDirection:"row",alignItems:"center",justifyContent:"flex-start"}} key={i.name}>
              {(i.leader||i.ghost)&&<MaterialCommunityIcons name={i.ghost?'ghost':'hammer'} color={darkBG&&level_colors[calculateLevelT(i.user_id)]} size={12*s} />}
              <Text numberOfLines={1} ellipsizeMode="tail" style={{fontSize:12*s,...font(),flexShrink:1,color:darkBG&&level_colors[calculateLevelT(i.user_id)]}}>{i.username}</Text>
            </View>
          </TouchableWithoutFeedback>)}
          <View style={{justifyContent:"center",borderTopWidth:2*s,borderTopColor:level_colors.border,backgroundColor:darkBG??level_colors[calculateLevelT(false)],padding:4*s,height:24*s}}>
            <Text style={{fontSize:12*s,...font(),color:darkBG&&level_colors[calculateLevelT(false)]}}>Group Total</Text>
          </View>
          <View style={{justifyContent:"center",height:24*s,backgroundColor:darkBG??level_colors[levelSelect+1]}}>
            <Menu
              visible={clanLevelSelect}
              onDismiss={()=>setClanLevelSelect(false)}
              position="bottom"
              anchor={
                <TouchableRipple style={{height:24*s,justifyContent:"center",paddingHorizontal:4*s}} onPress={()=>setClanLevelSelect(true)}>
                  <View style={{flexDirection:"row",alignItems:"center"}}>
                    <Text style={{fontSize:12*s,flex:1,color:darkBG&&level_colors[levelSelect+1],...font()}}>{data?.levels?.[levelSelect]?.name} Group</Text>
                    <MaterialCommunityIcons color={darkBG&&level_colors[levelSelect+1]} name="chevron-down" size={12*s} />
                  </View>
                </TouchableRipple>
              }
              contentContainerStyle={{padding:0}}
            >
              {data?.levels?.map((i,index)=><Menu.Item
                key={index}
                style={{padding:4*s,paddingVertical:0,fontSize: 12*s,backgroundColor:level_colors[index+1]}}
                onPress={() => {setLevelSelect(index+((ls||"")?.endsWith?.('s')?'s':''));setClanLevelSelect(false)}}
                title={<Text style={{fontSize:12*s,...font()}}>{i.name}</Text>}
              />)}
            </Menu>
          </View>
        </View>
      </View>
    </Card>
    // </View>
  );
}