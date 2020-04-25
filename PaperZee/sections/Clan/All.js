import * as React from 'react';
import { Text, View, FlatList } from 'react-native';
import ClanRequirements from './Cards/Requirements';
import ClanStats from './Cards/Stats';
import { useDimensions } from '@react-native-community/hooks'
import { useSelector, useDispatch } from 'react-redux';
import s from '~store';
var { clanBookmarks: dashR } = s;

function Clan({ item }) {
  return ({
    clan_stats: <View style={{ padding: 4, flex: 1 }}>
      <ClanStats clan_id={item.clan_id} game_id={85} />
    </View>,
    clan_requirements: <View style={{ padding: 4, flex: 1 }}>
      <ClanRequirements game_id={85} />
    </View>,
    blankHack: <View style={{ flex: 1, padding: 4 }}></View>
  }[item.type]||null)
}

export default function AllClansScreen() {
  var theme = useSelector(i => i.themes[i.theme]);
  var { width } = useDimensions().window;
  var dash = useSelector(i => i.clanBookmarks);
  var dispatch = useDispatch();
  return (
    <FlatList
      key={width}
      style={{ backgroundColor: theme.page.bg }}
      contentContainerStyle={{ padding: 4 }}
      numColumns={width > 800 ? 2 : 1}
      data={[
        { type: "clan_requirements", key: "clanreq" },
        ...dash.map(i => {
          i.type = "clan_stats";
          i.key = i.clan_id;
          return i;
        }),
        // {type:"edit",key:"edit",edit:edit},
        { type: "blankHack", key: "blankHack" },
      ]}
      renderItem={({ item }) => <Clan item={item} />}
      keyExtractor={item => (item.key || "xd").toString()}
    />
    // <ScrollView style={{flex: 1, backgroundColor: '#b3dc9c'??'#c6e3b6'??'#e6fcd9'}} contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", padding: 4 }}>
    //     {users.map(user=><View key={user} style={{padding:4,width:width>800?"50%":"100%"}}>
    //       <UserActivityDash user_id={user} />
    //     </View>)}
    //     {/* <View style={{padding:4,width:width>800?"50%":"100%"}}> */}
    //       {/* <TouchableHighlight onPress={()=>nav.navigate('UserActivity',{userid:user})}> */}
    //         {/* <ClanGroupDash group="cuppaclans" /> */}
    //       {/* </TouchableHighlight> */}
    //     {/* </View> */}
    //     {/* <View style={{padding:4,width:width>800?"50%":"100%"}}> */}
    //       {/* <TouchableHighlight onPress={()=>nav.navigate('UserActivity',{userid:user})}> */}
    //         {/* <ClanGroupDash group="bushrangers" /> */}
    //       {/* </TouchableHighlight> */}
    //     {/* </View> */}
    //     <View style={{padding:4,width:width>800?"50%":"100%"}}>
    //       <ClanRequirements game_id={85} />
    //     </View>
    //     {!edit?<>
    //       {dash.map(i=>({
    //         clan_stats:<View style={{padding:4,width:width>800?"50%":"100%"}}>
    //           <ClanStats clan_id={i.clan_id} game_id={85} />
    //         </View>
    //       }[i.type]))}
    //       {/* <View style={{padding:4,width:width>800?"50%":"100%"}}>
    //         <ClanStats clan_id={457} game_id={85} />
    //       </View>
    //       <View style={{padding:4,width:width>800?"50%":"100%"}}>
    //         <ClanStats clan_id={1441} game_id={85} />
    //       </View>
    //       <View style={{padding:4,width:width>800?"50%":"100%"}}>
    //         <ClanStats clan_id={1870} game_id={85} />
    //       </View>
    //       <View style={{padding:4,width:width>800?"50%":"100%"}}>
    //         <ClanStats clan_id={1902} game_id={85} />
    //       </View>
    //       <View style={{padding:4,width:width>800?"50%":"100%"}}>
    //         <ClanStats clan_id={-1} game_id={85} />
    //       </View> */}
    //     </>:<>
    //       <View style={{width:"100%",height:20}}></View>
    //       {dash.filter(i=>i.type=="clan_stats").map(i=><View style={{padding:4,width:width>800?"50%":"100%"}}>
    //         <Card onPress={()=>remove(i.clan_id)}>
    //           <Text style={{fontSize:20,fontWeight:"bold"}}>Remove "{(allclans.find(x=>x[0]==i.clan_id)||[])[1]||`ID #${i.clan_id}`}"</Text>
    //         </Card>
    //       </View>)}
    //       <View style={{width:"100%",height:20}}></View>
    //       {/* {allclans.filter(x=>!dash.find(i=>i.clan_id==x[0])).map(i=><View style={{padding:4,width:width>800?"50%":"100%"}}>
    //         <Card onPress={()=>add(i[0])}>
    //           <Text style={{fontSize:20,fontWeight:"bold"}}>Add "{i[1]}"</Text>
    //         </Card>
    //       </View>)} */}

    //       <View style={{padding:4,width:width>800?"50%":"100%"}}>
    //         <Card>
    //           <Text style={{fontSize:20,fontWeight:"bold"}}>Clans can now be added from the Search page.</Text>
    //         </Card>
    //       </View>
    //       <View style={{width:"100%",height:20}}></View>
    //     </>}
    //     <View style={{padding:4,width:width>800?"50%":"100%"}}>
    //       <Card onPress={()=>setEdit(!edit)}>
    //         <Text style={{fontSize:20,fontWeight:"bold"}}>{edit?'Finish Editing':'Edit'} Clan List</Text>
    //       </Card>
    //     </View>
    // </ScrollView>
  );
}