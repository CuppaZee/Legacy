import * as React from 'react';
import { Text, View, Image, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Card from '~sections/Shared/Card';
import ActivityOverview from './ActivityOverview';
import useAPIRequest from '~sections/Shared/useAPIRequest';
import font from '~sections/Shared/font';

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
  var theme = useSelector(i=>i.themes[i.theme])
  var has_login = useSelector(i=>!!i.logins[user_id]);
  var nav = useNavigation();
  var date = new Date(Date.now() - (5 * 60 * 60000));
  var dateString = `${date.getUTCFullYear()}-${(date.getUTCMonth() + 1).toString().padStart(2, '0')}-${(date.getUTCDate()).toString().padStart(2, '0')}`
  const data = useAPIRequest(has_login?{
    endpoint: 'statzee/player/day',
    data: {day:dateString},
    user: user_id
  }:null)
  if (!data?.captures) {
    if(!has_login) {
      return (
        <Card>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <MaterialCommunityIcons name="lock" size={48} color={theme.page_content.fg} />
          </View>
        </Card>
      )
    } else if(!data) {
      return (
        <Card>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="large" color={theme.page_content.fg} />
          </View>
        </Card>
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
    <Card noPad>
      <TouchableRipple onPress={()=>nav.navigate('UserActivity',{userid:user_id})}>
        <View style={{...(theme.page_content.border?{borderBottomWidth:1,borderBottomColor:theme.page_content.border}:{}), backgroundColor:theme.navigation.bg,padding:8, borderTopLeftRadius: 8, borderTopRightRadius: 8, flexDirection:"row", alignItems: "center"}}>
          <MaterialCommunityIcons name="calendar" size={24} color={theme.navigation.fg} />
          <Text style={{paddingLeft: 4, fontFamily:font("bold"),fontSize:16,flex:1,color:theme.navigation.fg}}>Activity</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={theme.navigation.fg} />
        </View>
      </TouchableRipple>
      {data?.captures?<ActivityOverview user_id={user_id}/>??<>
        <View key="total" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
          <View><Text style={{ fontSize: 24, fontFamily: font("bold") }}>{[...data?.captures??[], ...data?.deploys??[], ...data?.captures_on??[]].reduce((a, b) => a + Number(b.points_for_creator ?? b.points), 0)} Points</Text></View>
        </View>
        <View key="captures" style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, backgroundColor: 'transparent' ?? '#aaffaa', borderRadius: 0 }}>
          <View><Text style={{ color: 'black' ?? '#004400', fontSize: 20, fontFamily: font("bold") }}>{data.captures.filter(i=>!isRenovation(i)).length} Capture{data.captures.filter(i=>!isRenovation(i)).length !== 1 ? 's' : ''} - {data.captures.filter(i=>!isRenovation(i)).reduce((a, b) => a + Number(b.points), 0)} Points</Text></View>
          <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
            {
              count(data.captures.filter(i=>!isRenovation(i)), "pin").map(cap => <View key={cap[0]} style={{ padding: 2, alignItems: "center" }}>
                <Image style={{ height: 32, width: 32 }} source={{ uri: cap[0] }} />
                <Text style={{ color: 'black' ?? '#004400' }}>{cap[1]}</Text>
              </View>)
            }
          </View>
        </View>
        <View key="deploys" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
          <View style={{ paddingLeft: 8, paddingRight: 8, backgroundColor: 'transparent' ?? '#a5fffc', borderRadius: 0 }}><Text style={{ color: 'black' ?? '#00403e', fontSize: 20, fontFamily: font("bold") }}>{data.deploys.length} Deploy{data.deploys.length !== 1 ? 's' : ''} - {data.deploys.reduce((a, b) => a + Number(b.points), 0)} Points</Text></View>
          <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
            {
              count(data.deploys, "pin").map(dep => <View key={dep[0]} style={{ padding: 2, alignItems: "center" }}>
                <Image style={{ height: 32, width: 32 }} source={{ uri: dep[0] }} />
                <Text style={{ color: 'black' ?? '#00403e' }}>{dep[1]}</Text>
              </View>)
            }
          </View>
        </View>
        <View key="capons" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
          <View style={{ paddingLeft: 8, paddingRight: 8, backgroundColor: 'transparent' ?? '#ffbcad', borderRadius: 8 }}><Text style={{ color: 'black' ?? `#401700`, fontSize: 20, fontFamily: font("bold") }}>{data.captures_on.filter(i=>!isRenovation(i)).length} Capon{data.captures_on.filter(i=>!isRenovation(i)).length !== 1 ? 's' : ''} - {data.captures_on.filter(i=>!isRenovation(i)).reduce((a, b) => a + Number(b.points_for_creator), 0)} Points</Text></View>
          <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
            {
              count(data.captures_on.filter(i=>!isRenovation(i)), "pin").map(cap => <View key={cap[0]} style={{ padding: 2, alignItems: "center" }}>
                <Image style={{ height: 32, width: 32 }} source={{ uri: cap[0] }} />
                <Text style={{ color: 'black' ?? `#401700` }}>{cap[1]}</Text>
              </View>)
            }
          </View>
        </View>
        {data.captures.filter(i=>isRenovation(i)).length>0&&<View key="renovations" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
          <View style={{ paddingLeft: 8, paddingRight: 8, backgroundColor: 'transparent' ?? '#ffbcad', borderRadius: 8 }}>
            <Text style={{ color: 'black' ?? `#401700`, fontSize: 20, fontFamily: font("bold") }}>
              {data.captures.filter(i=>isRenovation(i)).length} Renovation{data.captures.filter(i=>isRenovation(i)).length !== 1 ? 's' : ''} - {data.captures.filter(i=>isRenovation(i)).reduce((a, b) => a + Number(b.points), 0)} Points
            </Text>
          </View>
        </View>}
        {data.captures_on.filter(i=>isRenovation(i)).length>0&&<View key="renons" style={{ flexDirection: "column", width: "100%", alignItems: "center" }}>
          <View style={{ paddingLeft: 8, paddingRight: 8, backgroundColor: 'transparent' ?? '#ffbcad', borderRadius: 8 }}>
            <Text style={{ color: 'black' ?? `#401700`, fontSize: 20, fontFamily: font("bold") }}>
              {data.captures_on.filter(i=>isRenovation(i)).length} Renov-on{data.captures_on.filter(i=>isRenovation(i)).length !== 1 ? 's' : ''} - {data.captures_on.filter(i=>isRenovation(i)).reduce((a, b) => a + Number(b.points_for_creator), 0)} Points
            </Text>
          </View>
        </View>}
        <View style={{flex:1}}></View>
      </>:(data?<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <MaterialCommunityIcons name="alert" size={48} color="#d00" />
      </View>:<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
        <ActivityIndicator size="large" color="#000" />
      </View>)}
    </Card>
  );
}