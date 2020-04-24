import * as React from 'react';
import { Text, View, Image, ScrollView, FlatList, TouchableHighlight, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { List, TouchableRipple } from 'react-native-paper';
import request from '../../store/request'
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/Card';

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

var creatures = {
  'firepouchcreature': 'tuli',
  'waterpouchcreature': 'vesi',
  'earthpouchcreature': 'muru',
  'airpouchcreature': 'puffle',
  'mitmegupouchcreature': 'mitmegu',
  'unicorn': 'theunicorn',
  'fancyflatrob': 'coldflatrob',
  'fancy_flat_rob': 'coldflatrob',
  'fancyflatmatt': 'footyflatmatt',
  'fancy_flat_matt': 'footyflatmatt',
  'tempbouncer': 'expiring_specials_filter',
  'temp_bouncer': 'expiring_specials_filter'
}

var hostIcon = (icon) => {
  var host = icon.match(/\/([^\/\.]+?)_?(?:virtual|physical)?_?host\./)?.[1];
  if (!host) return null;
  return `https://munzee.global.ssl.fastly.net/images/pins/${creatures[host] ?? host}.png`;
}

export default function UserActivityDash({user_id}) {
  var nav = useNavigation();
  var date = new Date(Date.now() - (5 * 60 * 60000));
  var dateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${(date.getUTCDate()).toString().padStart(2, '0')}`
  var dispatch = useDispatch();
  var {username} = useSelector(i => i.logins[user_id]);
  var { data } = useSelector(i => i.request_data[`user/activity?user_id=${user_id}&day=${dateString}`]) ?? {}
  // var { data: userdata } = useSelector(i => i.request_data[`user/details?user_id=${user_id}`] ?? {})
  useFocusEffect(
    React.useCallback(() => {
      dispatch(request.add(`user/activity?user_id=${user_id}&day=${dateString}`))
      // dispatch(request.add(`user/details?user_id=${user_id}`))
      return () => {
        dispatch(request.remove(`user/activity?user_id=${user_id}&day=${dateString}`))
        // dispatch(request.remove(`user/details?user_id=${user_id}`))
      };
    }, [user_id])
  );
  if (!data?.data?.captures) {
    if(!data) {
      return (
        <Card>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        </Card>
        // <View style={{ flexDirection: "column", flex: 1, width: "100%", alignContent: "center", backgroundColor: '#e6fcd9' }}>
        // </View>
      )
    } else {
      return (
        <Card cardStyle={{backgroundColor:'#ffaaaa'}}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <MaterialCommunityIcons name="alert" size={48} color="#d00" />
          </View>
        </Card>
      );
    }
  }
  function isRenovation(act) {
    return !!(act.pin.includes('/renovation.') && act.captured_at);
  }
  return (
    // <View style={{ flex: 1, alignItems: "stretch", flexDirection: "column", backgroundColor: "#e9ffdc"??"#e6fcd9", borderRadius: 8 }}>
    <Card noPad>
      <View style={{backgroundColor:"#016930",padding:8, borderTopLeftRadius: 8, borderTopRightRadius: 8, flexDirection:"row", alignItems: "center"}}>
        {/* <MaterialCommunityIcons name="account" size={24} color="#fff" /> */}
        <Image style={{height:32,width:32,borderRadius:32}} source={{uri:`https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(user_id).toString(36)}.png`}} />
        <Text style={{paddingLeft: 4, fontWeight:"bold",color:"#fff",fontSize:16,flex:1}}>{username??user_id}</Text>
        <MaterialCommunityIcons name="chevron-right" size={24} color="#fff7" />
        {/* <Text style={{color:"white",fontWeight:"bold",fontSize:20}}>{userdata?.data?.username??user_id}</Text> */}
      </View>
      {data?.data?.captures?<>
        <View key="total" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
          <View><Text style={{ fontSize: 24, fontWeight: "bold" }}>{[...data?.data?.captures??[], ...data?.data?.deploys??[], ...data?.data?.captures_on??[]].reduce((a, b) => a + Number(b.points_for_creator ?? b.points), 0)} Points</Text></View>
        </View>
        <View key="captures" style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, backgroundColor: 'transparent' ?? '#aaffaa', borderRadius: 0 }}>
          <View><Text style={{ color: 'black' ?? '#004400', fontSize: 20, fontWeight: "bold" }}>{data.data.captures.filter(i=>!isRenovation(i)).length} Capture{data.data.captures.filter(i=>!isRenovation(i)).length !== 1 ? 's' : ''} - {data.data.captures.filter(i=>!isRenovation(i)).reduce((a, b) => a + Number(b.points), 0)} Points</Text></View>
          <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
            {
              count(data.data.captures.filter(i=>!isRenovation(i)), "pin").map(cap => <View key={cap[0]} style={{ padding: 2, alignItems: "center" }}>
                <Image style={{ height: 32, width: 32 }} source={{ uri: cap[0] }} />
                <Text style={{ color: 'black' ?? '#004400' }}>{cap[1]}</Text>
              </View>)
            }
          </View>
        </View>
        <View key="deploys" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
          <View style={{ paddingLeft: 8, paddingRight: 8, backgroundColor: 'transparent' ?? '#a5fffc', borderRadius: 0 }}><Text style={{ color: 'black' ?? '#00403e', fontSize: 20, fontWeight: "bold" }}>{data.data.deploys.length} Deploy{data.data.deploys.length !== 1 ? 's' : ''} - {data.data.deploys.reduce((a, b) => a + Number(b.points), 0)} Points</Text></View>
          <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
            {
              count(data.data.deploys, "pin").map(dep => <View key={dep[0]} style={{ padding: 2, alignItems: "center" }}>
                <Image style={{ height: 32, width: 32 }} source={{ uri: dep[0] }} />
                <Text style={{ color: 'black' ?? '#00403e' }}>{dep[1]}</Text>
              </View>)
            }
          </View>
        </View>
        <View key="capons" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
          <View style={{ paddingLeft: 8, paddingRight: 8, backgroundColor: 'transparent' ?? '#ffbcad', borderRadius: 8 }}><Text style={{ color: 'black' ?? `#401700`, fontSize: 20, fontWeight: "bold" }}>{data.data.captures_on.filter(i=>!isRenovation(i)).length} Capon{data.data.captures_on.filter(i=>!isRenovation(i)).length !== 1 ? 's' : ''} - {data.data.captures_on.filter(i=>!isRenovation(i)).reduce((a, b) => a + Number(b.points_for_creator), 0)} Points</Text></View>
          <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
            {
              count(data.data.captures_on.filter(i=>!isRenovation(i)), "pin").map(cap => <View key={cap[0]} style={{ padding: 2, alignItems: "center" }}>
                <Image style={{ height: 32, width: 32 }} source={{ uri: cap[0] }} />
                <Text style={{ color: 'black' ?? `#401700` }}>{cap[1]}</Text>
              </View>)
            }
          </View>
        </View>
        {data.data.captures.filter(i=>isRenovation(i)).length>0&&<View key="renovations" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
          <View style={{ paddingLeft: 8, paddingRight: 8, backgroundColor: 'transparent' ?? '#ffbcad', borderRadius: 8 }}>
            <Text style={{ color: 'black' ?? `#401700`, fontSize: 20, fontWeight: "bold" }}>
              {data.data.captures.filter(i=>isRenovation(i)).length} Renovation{data.data.captures.filter(i=>isRenovation(i)).length !== 1 ? 's' : ''} - {data.data.captures.filter(i=>isRenovation(i)).reduce((a, b) => a + Number(b.points), 0)} Points
            </Text>
          </View>
        </View>}
        {data.data.captures_on.filter(i=>isRenovation(i)).length>0&&<View key="renons" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
          <View style={{ paddingLeft: 8, paddingRight: 8, backgroundColor: 'transparent' ?? '#ffbcad', borderRadius: 8 }}>
            <Text style={{ color: 'black' ?? `#401700`, fontSize: 20, fontWeight: "bold" }}>
              {data.data.captures_on.filter(i=>isRenovation(i)).length} Renov-on{data.data.captures_on.filter(i=>isRenovation(i)).length !== 1 ? 's' : ''} - {data.data.captures_on.filter(i=>isRenovation(i)).reduce((a, b) => a + Number(b.points_for_creator), 0)} Points
            </Text>
          </View>
        </View>}
        <View style={{flex:1,borderBottomColor:'#01693077',borderBottomWidth:1}}></View>
      </>:(data?<View style={{flex: 1, borderBottomColor:'#01693077',borderBottomWidth:1, justifyContent: "center", alignItems: "center"}}>
        <MaterialCommunityIcons name="alert" size={48} color="#d00" />
      </View>:<View style={{flex: 1, borderBottomColor:'#01693077',borderBottomWidth:1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" color="#000" />
      </View>)}
      <TouchableRipple onPress={()=>nav.navigate('UserActivity',{userid:user_id})}>
        <View style={{padding:8, flexDirection: "row",alignItems:"center"}}>
          <MaterialCommunityIcons name="calendar" size={24} color="#000" />
          <Text style={{paddingLeft: 4, fontWeight:"bold",fontSize:16,flex:1}}>Activity</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color="#000" />
        </View>
      </TouchableRipple>
      <TouchableRipple disabled={true} style={{opacity:0.7}} onPress={()=>nav.navigate('UserActivity',{userid:user_id})}>
        <View style={{padding:8, flexDirection: "row",alignItems:"center"}}>
          <MaterialCommunityIcons name="package" size={24} color="#000" />
          <Text style={{paddingLeft: 4, fontWeight:"bold",fontSize:16,flex:1}}>Inventory</Text>
          {/* <MaterialCommunityIcons name="blocked" size={24} color="#000" /> */}
        </View>
      </TouchableRipple>
      <TouchableRipple disabled={true} style={{opacity:0.7}} onPress={()=>nav.navigate('UserActivity',{userid:user_id})}>
        <View style={{padding:8, flexDirection: "row",alignItems:"center"}}>
          <MaterialCommunityIcons name="star" size={24} color="#000" />
          <Text style={{paddingLeft: 4, fontWeight:"bold",fontSize:16,flex:1}}>Challenges</Text>
          {/* <MaterialCommunityIcons name="blocked" size={24} color="#000" /> */}
        </View>
      </TouchableRipple>
      {/* <View style={{padding:8, flexDirection: "row",alignItems:"center"}}>
        <Text style={{fontWeight:"bold",fontSize:20,flex:1}}>Activity</Text>
      </View> */}
    </Card>
    // </View>
  );
}