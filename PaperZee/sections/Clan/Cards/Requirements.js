import * as React from 'react';
import { Text, View, Image, ScrollView, FlatList, TouchableHighlight, Platform, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { List, IconButton, TouchableRipple } from 'react-native-paper';
import request from '~store/request'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Card from '~sections/Shared/Card';

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

export default function UserActivityDash({ game_id }) {
  var theme = useSelector(i=>i.themes[i.theme]);
  var selected_theme = useSelector(i=>i.theme);
  var [reward,setReward] = React.useState(false);
  var darkBG = undefined;
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
  var nav = useNavigation();
  var date = new Date(Date.now() - (5 * 60 * 60000));
  var dateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${(date.getUTCDate()).toString().padStart(2, '0')}`
  var dispatch = useDispatch();
  var { data } = useSelector(i => i.request_data[`clan/requirements/v1?game_id=${game_id}`] ?? {})
  var tick = useSelector(i => i.tick)
  useFocusEffect(
    React.useCallback(() => {
      dispatch(request.add(`clan/requirements/v1?game_id=${game_id}`))
      return () => {
        dispatch(request.remove(`clan/requirements/v1?game_id=${game_id}`))
      };
    }, [game_id])
  );
  if (!data?.data?.levels) {
    if (!data) {
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
            <Text style={{color:theme.error.fg}}>An Error Occurred</Text>
          </View>
        </Card>
      );
    }
  }
  return (
    // <View style={{ flex: 1, alignItems: "stretch", flexDirection: "column", backgroundColor: "#e9ffdc"??"#e6fcd9", borderRadius: 8 }}>
    <Card noPad>
      <View style={{ ...(darkBG?{borderBottomWidth: 2, borderBottomColor: level_colors.border}:{}), backgroundColor: theme.navigation.bg, paddingHorizontal: 8, borderTopLeftRadius: 8, borderTopRightRadius: 8, flexDirection: "row", alignItems: "center" }}>
        <View style={{flex:1,paddingVertical:8}}>
          <Text style={{ color: theme.navigation.fg, fontWeight: "bold", fontSize: 12, opacity: 0.7, lineHeight: 12 }}>{data?.data?.battle.title.slice(10)}</Text>
          <Text style={{ color: theme.navigation.fg, fontWeight: "bold", fontSize: 16, lineHeight: 16 }}>{reward?'Rewards':'Requirements'}</Text>
        </View>
        <TouchableRipple style={{borderRadius:24,padding:4}} onPress={()=>{setReward(!reward)}}>
          <MaterialCommunityIcons name="gift" size={24} color={theme.navigation.fg} />
        </TouchableRipple>
      </View>
      <View style={{flexDirection:"row"}}>
        <ScrollView horizontal={true} style={{flex:1}} contentContainerStyle={{flexDirection:"row",minWidth:'100%',paddingLeft:55}}>
          {!reward&&<>
          <View style={{flexDirection:"column",flexGrow:1,alignItems:"stretch",backgroundColor:darkBG??level_colors.ind}}>
            <View style={{height:24,padding:4}}><Text style={{textAlign:"center",fontWeight:"bold",fontSize:12,color:darkBG&&level_colors.ind}}>Individual</Text></View>
            <View style={{flexDirection:"row"}}>
              {(data?.data?.order?.individual??[]).map(i=><View key={`Individual${i}`} style={{flexGrow:1}}>
                <View style={{height:96-19,borderBottomWidth:2,borderBottomColor:level_colors.border,padding:4,alignItems:"center"}}>
                  <Image source={{uri:data?.data?.requirements?.[i]?.icon??data?.data?.requirements?.[i]?.icons?.[tick%data?.data?.requirements?.[i]?.icons?.length]}} style={{height:36,width:36}} />
                  <Text numberOfLines={1} style={{color:darkBG&&level_colors.ind,textAlign:"center",fontWeight:"bold",fontSize:12}}>{data?.data?.requirements?.[i]?.top}</Text>
                  <Text numberOfLines={1} style={{color:darkBG&&level_colors.ind,textAlign:"center",fontSize:12}}>{data?.data?.requirements?.[i]?.bottom}</Text>
                </View>
                {data?.data?.levels?.map(l=><View key={l.id} style={{marginHorizontal:-1,height:24,padding:4,alignItems:"center",backgroundColor:darkBG??level_colors[l.id]}}>
                  <Text style={{textAlign:"center",width:'100%',fontSize:12,color:darkBG&&level_colors[l.id]}}>{l.individual?.[i]?.toLocaleString()}</Text>
                </View>)}
              </View>)}
            </View>
          </View>

          <View style={{flexDirection:"column",flexGrow:1,alignItems:"stretch",backgroundColor:darkBG??level_colors.gro}}>
            <View style={{height:24,padding:4}}><Text style={{textAlign:"center",fontWeight:"bold",fontSize:12,color:darkBG&&level_colors.gro}}>Group</Text></View>
            {/* <View style={{height:19}}><Text style={{textAlign:"center",fontWeight:"bold"}}>Group</Text></View> */}
            <View style={{flexDirection:"row"}}>
              {data?.data?.order?.group?.map(i=><View style={{flexGrow:1}}>
                <View style={{height:96-19,borderBottomWidth:2,borderBottomColor:level_colors.border,padding:4,alignItems:"center"}}>
                  <Image source={{uri:data?.data?.requirements?.[i]?.icon??data?.data?.requirements?.[i]?.icons?.[tick%data?.data?.requirements?.[i]?.icons?.length]}} style={{height:36,width:36}} />
                  <Text style={{color:darkBG&&level_colors.gro,textAlign:"center",width:'100%',fontWeight:"bold",fontSize:12}}>{data?.data?.requirements?.[i]?.top}</Text>
                  <Text style={{color:darkBG&&level_colors.gro,textAlign:"center",width:'100%',fontSize:12}}>{data?.data?.requirements?.[i]?.bottom}</Text>
                </View>
                {data?.data?.levels?.map(l=><View style={{marginHorizontal:-1,height:24,padding:4,alignItems:"center",backgroundColor:darkBG??level_colors[l.id]}}>
                  <Text style={{color:darkBG&&level_colors[l.id],textAlign:"center",width:'100%',fontSize:12}}>{l.group?.[i]}</Text>
                </View>)}
              </View>)}
            </View>
          </View>
          </>}

          {reward&&<View style={{flexDirection:"column",flexGrow:1,alignItems:"stretch",backgroundColor:darkBG??level_colors.ind}}>
            <View style={{height:24,padding:4}}><Text style={{textAlign:"center",fontWeight:"bold",fontSize:12,color:darkBG&&level_colors.ind}}>Rewards</Text></View>
            <View style={{flexDirection:"row"}}>
              {(data?.data?.order?.rewards??[]).map(i=><View key={`Reward${i}`} style={{flexGrow:1}}>
                <View style={{height:60,borderBottomWidth:2,borderBottomColor:level_colors.border,padding:4,alignItems:"center"}}>
                  <Image source={{uri:data?.data?.rewards?.[i]?.logo}} style={{height:36,width:36}} />
                  <Text numberOfLines={1} style={{textAlign:"center",fontWeight:"bold",fontSize:10,color:darkBG&&level_colors.ind}}>{data?.data?.rewards?.[i]?.short_name??data?.data?.rewards?.[i]?.name.replace(/Virtual /,'V').replace(/Physical /,'P').replace(/Flat /,'').replace(/ Mystery/,'').replace(/THE /,'').replace(/ Wheel/,'W').replace(/Hammock/,'Hamm')}</Text>
                  {/* <Text numberOfLines={1} style={{textAlign:"center",fontSize:12}}>{data?.data?.rewards?.[i]?.name.split(' ').slice(1).join(' ')}</Text> */}
                  {/* <Text numberOfLines={1} style={{textAlign:"center",fontSize:12}}>{data?.data?.requirements?.[i]?.bottom}</Text> */}
                </View>
                {data?.data?.levels?.map(l=><View key={l.id} style={{marginHorizontal:-1,height:24,padding:4,alignItems:"center",backgroundColor:darkBG??level_colors[l.id]}}>
                  <Text style={{textAlign:"center",width:'100%',fontSize:12,color:darkBG&&level_colors[l.id]}}>{l.rewards?.[i]?.toLocaleString()}</Text>
                </View>)}
              </View>)}
            </View>
          </View>}
        </ScrollView>


        <View style={{width:56,position:"absolute",left:0,top:0,borderRightWidth:2,borderRightColor:level_colors.border}}>
          <View style={{height:24,backgroundColor:darkBG??level_colors.null,padding:4}}><Text style={{fontWeight:"bold",fontSize:12,color:darkBG&&level_colors.null}}>Apr 20</Text></View>
          <View style={{height:reward?60:77,backgroundColor:darkBG??level_colors.null,flexDirection:"row",alignItems:"center",padding:4,borderBottomWidth:2,borderBottomColor:level_colors.border}}>
            <Text numberOfLines={1} ellipsizeMode="head" style={{fontSize:12,color:darkBG&&level_colors.null}}>Levels</Text>
          </View>
          {(data?.data?.levels??[]).map(i=><View style={{backgroundColor:darkBG??level_colors[i.id],padding:4,height:24}} key={i.name}>
            <Text style={{fontSize:12,color:darkBG&&level_colors[i.id]}}>{i.name}</Text>
          </View>)}
        </View>
      </View>
    </Card>
    // </View>
  );
}