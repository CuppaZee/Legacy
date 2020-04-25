import * as React from 'react';
import { Button, Text, View, TextInput, Image, ScrollView } from 'react-native';
import Card from '~sections/Shared/Card';
import { useFocusEffect } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useDimensions } from '@react-native-community/hooks'
import request from '~store/request';
import s from '~store';
var { clanBookmarks: clanBookmarksR } = s;

export default function SearchScreen({ navigation }) {
  var theme = useSelector(i=>i.themes[i.theme])
  var input = React.useRef();
  var {width} = useDimensions().window;
  var [value,setValue] = React.useState('');
  var [search,setSearch] = React.useState('');
  var { data: users } = useSelector(i => i.request_data[`user/search/v1?format=list&query=${encodeURIComponent(search)}`] ?? {});
  var clanBookmarks = useSelector(i => i.clanBookmarks);
  var dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      // console.log(input);
      // setTimeout(()=>input.current.focus(),100)
    }, [])
  );
  function addClan(clan) {
    // dispatch(clanBookmarksR(clanBookmarks.concat([clan])));
  }
  function removeClan(clan) {
    // dispatch(clanBookmarksR(clanBookmarks.filter(i=>i.clan_id!=clan.clan_id)));
  }
  useFocusEffect(
    React.useCallback(() => {
      if(search) {
        dispatch(request.add(`user/search/v1?format=list&query=${encodeURIComponent(search)}`))
        return () => {
          dispatch(request.remove(`user/search/v1?format=list&query=${encodeURIComponent(search)}`))
        };
      } else {
        return ()=>{};
      }
    }, [search])
  );
  return (
    <ScrollView
      contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
    {/* <ScrollView style={{flex: 1, backgroundColor: '#b3dc9c'??'#c6e3b6'??'#e6fcd9'}} contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", padding: 4 }}> */}
    {/* <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", backgroundColor: '#b3dc9c'??'#c6e3b6', padding: 4 }}> */}
      {/* <View style={{position:"absolute",top:0,left:0,bottom:0,right:0,alignItems:"center",justifyContent:"center"}}>
        <View style={{borderRadius:8,backgroundColor:'#ff3322',padding:8}}>
          <Text style={{fontWeight:"bold",fontSize:20,color:"white"}}>Coming Soon</Text>
        </View>
      </View> */}
      <View style={{padding:4,width:"100%"}}>
        <Card noPad cardStyle={{flexDirection: "row", backgroundColor: "#fff", alignItems:"stretch"}}>
          <TextInput
            onSubmitEditing={()=>setSearch(value)}
            ref={input}
            style={{ paddingLeft: 8, flex: 1, borderRadius: 8, borderBottomLeftRadius: 8 }}
            onChangeText={text => setValue(text)}
            value={value}
            returnKeyType="search"
          />
          <IconButton onPress={()=>setSearch(value)} style={{backgroundColor: theme.navigation.bg}} icon="magnify" color={theme.navigation.fg} />
        </Card>
      </View>
      <View style={{padding:4}}>
        <Card noPad>
          <View>
            {!search&&<Text style={{textAlign:"center",fontWeight:"bold",fontSize:16,color:theme.page_content.fg}}>Search for a User</Text>}
            {!!search&&!users?.data?.users&&<Text style={{textAlign:"center",fontWeight:"bold",fontSize:16,color:theme.page_content.fg}}>Loading...</Text>}
            {users?.data?.users?.slice?.(0,20)?.map?.(i=><View key={i.clan_id} style={{padding: 4, flexDirection: "row", alignItems: "center"}}>
              {/* {!clanBookmarks.find(x=>x.clan_id==i.clan_id)&&<IconButton size={24} onPress={()=>addClan(i)} icon="bookmark-plus" color="#016930" />}
              {!!clanBookmarks.find(x=>x.clan_id==i.clan_id)&&<IconButton size={24} onPress={()=>removeClan(i)} icon="bookmark-minus" color="#ff2222" />} */}
              {/* ,marginLeft:-8 */}
              <Image style={{height:24,width:24,marginRight:8,borderRadius:8}} source={{uri:i.avatar??`https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(i.user_id).toString(36)}.png`}} />
              <View style={{flex:1}}>
                <Text style={{fontWeight:"bold",fontSize:16,color:theme.page_content.fg}}>{i.username}</Text>
                <Text style={{fontWeight:"bold",fontSize:12,color:theme.page_content.fg}}>#{i.user_id}</Text>
              </View>
              <IconButton size={24} onPress={()=>navigation.navigate('UserDetails',{userid:i.user_id})} icon="chevron-right" color={theme.page_content.fg} />
            </View>)}
          </View>
        </Card>
      </View>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
    </ScrollView>
  );
}