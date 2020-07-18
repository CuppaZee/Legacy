import * as React from 'react';
import { Text, View, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';
import Card from 'sections/Shared/Card';
import { useFocusEffect } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import request from 'utils/store/request';
import stringify from 'fast-json-stable-stringify';
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
import s from 'utils/store';
var { userBookmarks: userBookmarksR } = s;

export default function SearchScreen({ navigation }) {
  var {t} = useTranslation();
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
  var userBookmarks = useSelector(i => i.userBookmarks);
  function addUser(user) {
    dispatch(userBookmarksR(userBookmarks.concat([user])));
  }
  function removeUser(user) {
    dispatch(userBookmarksR(userBookmarks.filter(i=>i.user_id!=user.user_id)));
  }
  
  var reqData = {
    endpoint: 'user/find',
    data: {text:search}
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
            {search.length<3&&<Text allowFontScaling={false} style={{textAlign:"center",...font("bold"),fontSize:16,color:theme.page_content.fg}}>{t('search:user')}</Text>}
            {search.length>=3&&!users?.data?.users&&<View style={{height:100,justifyContent:"center",alignItems:"center"}}>
              <ActivityIndicator size={32} color={theme.page_content.fg} />
            </View>}
            {users?.data?.users?.length===0&&<Text allowFontScaling={false} style={{textAlign:"center",...font("bold"),fontSize:16,color:theme.page_content.fg}}>{t('search:empty')}</Text>}
            {users?.data?.users?.slice?.(0,20)?.map?.(i=><View key={i.clan_id} style={{padding: 4, flexDirection: "row", alignItems: "center"}}>
              {!userBookmarks.find(x=>x.user_id==i.user_id)&&<IconButton size={24} onPress={()=>addUser(i)} icon="bookmark-plus" color="#016930" />}
              {!!userBookmarks.find(x=>x.user_id==i.user_id)&&<IconButton size={24} onPress={()=>removeUser(i)} icon="bookmark-minus" color="#ff2222" />}
              <Image style={{height:24,width:24,marginRight:8,marginLeft:-8,borderRadius:12}} source={{uri:i.avatar??`https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(i.user_id).toString(36)}.png`}} />
              <View style={{flex:1}}>
                <Text allowFontScaling={false} style={{...font("bold"),fontSize:16,color:theme.page_content.fg}}>{i.username}</Text>
                <Text allowFontScaling={false} style={{...font("bold"),fontSize:12,color:theme.page_content.fg}}>#{i.user_id}</Text>
              </View>
              <IconButton size={24} onPress={()=>navigation.navigate('UserDetails',{ username: i.username })} icon="chevron-right" color={theme.page_content.fg} />
            </View>)}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}