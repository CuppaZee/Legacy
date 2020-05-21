import * as React from 'react';
import { Text, View, TextInput, Image, ScrollView } from 'react-native';
import Card from '~sections/Shared/Card';
import { useFocusEffect } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import request from '~store/request';
import stringify from 'fast-json-stable-stringify';
import font from '~sections/Shared/font';

export default function SearchScreen({ navigation }) {
  var theme = useSelector(i=>i.themes[i.theme])
  var input = React.useRef();
  var [value,setValue] = React.useState('');
  var [search,setSearch] = React.useState('');
  var [timeoutC,setTimeoutC] = React.useState(null);
  function onValue(val) {
    if(timeoutC) clearTimeout(timeoutC)
    setValue(val);
    setTimeoutC(setTimeout(() => {
      return setSearch(val);
    }, 500))
  }
  var dispatch = useDispatch();
  
  var reqData = {
    endpoint: 'user/find',
    data: {text:'%'+search}
  }
  var users = useSelector(i => i.request_data[stringify(reqData)] ?? {})
  useFocusEffect(
    React.useCallback(() => {
      if(search.length>=3) dispatch(request.add(reqData))
      return () => {
        if(search.length>=3) dispatch(request.remove(reqData))
      };
    }, [search])
  );
  return (
    <ScrollView
      contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      <View style={{padding:4,width:"100%"}}>
        <Card noPad cardStyle={{flexDirection: "row", backgroundColor: "#fff", alignItems:"stretch"}}>
          <TextInput
            onSubmitEditing={()=>setSearch(value)}
            ref={input}
            style={{ paddingHorizontal: 8, flex: 1, borderRadius: 8, borderBottomLeftRadius: 8, height: 40 }}
            onChangeText={onValue}
            value={value}
            returnKeyType="search"
          />
          {/* <IconButton onPress={()=>setSearch(value)} style={{backgroundColor: theme.navigation.bg}} icon="magnify" color={theme.navigation.fg} /> */}
        </Card>
      </View>
      <View style={{padding:4}}>
        <Card noPad>
          <View>
            {search.length<3&&<Text style={{textAlign:"center",...font("bold"),fontSize:16,color:theme.page_content.fg}}>Search for a User</Text>}
            {search.length>=3&&!users?.data?.users&&<Text style={{textAlign:"center",...font("bold"),fontSize:16,color:theme.page_content.fg}}>Loading...</Text>}
            {users?.data?.users?.length===0&&<Text style={{textAlign:"center",...font("bold"),fontSize:16,color:theme.page_content.fg}}>No Results :{"("}</Text>}
            {users?.data?.users?.slice?.(0,20)?.map?.(i=><View key={i.clan_id} style={{padding: 4, flexDirection: "row", alignItems: "center"}}>
              <Image style={{height:24,width:24,marginHorizontal:8,borderRadius:8}} source={{uri:i.avatar??`https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(i.user_id).toString(36)}.png`}} />
              <View style={{flex:1}}>
                <Text style={{...font("bold"),fontSize:16,color:theme.page_content.fg}}>{i.username}</Text>
                <Text style={{...font("bold"),fontSize:12,color:theme.page_content.fg}}>#{i.user_id}</Text>
              </View>
              <IconButton size={24} onPress={()=>navigation.navigate('UserDetails',{userid:i.user_id})} icon="chevron-right" color={theme.page_content.fg} />
            </View>)}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}