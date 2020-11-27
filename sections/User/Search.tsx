// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
import { useFocusEffect } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector, useDispatch } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/store/request' or its co... Remove this comment to see the full error message
import request from 'utils/store/request';
import stringify from 'fast-json-stable-stringify';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/store' or its correspond... Remove this comment to see the full error message
import s from 'utils/store';
var { userBookmarks: userBookmarksR } = s;

export default function SearchScreen({
  navigation
}: any) {
  var {t} = useTranslation();
  var theme = useSelector((i: any) => i.themes[i.theme])
  var input = React.useRef();
  var [value,setValue] = React.useState('');
  var [search,setSearch] = React.useState('');
  var [timeoutC,setTimeoutC] = React.useState(null);
  function onValue(val: any) {
    if(timeoutC) clearTimeout(timeoutC)
    setValue(val);
    setTimeoutC(setTimeout(() => {
      return setSearch(val);
    }, 500))
  }
  var dispatch = useDispatch();
  var userBookmarks = useSelector((i: any) => i.userBookmarks);
  function addUser(user: any) {
    dispatch(userBookmarksR(userBookmarks.concat([user])));
  }
  function removeUser(user: any) {
    dispatch(userBookmarksR(userBookmarks.filter((i: any) => i.user_id!=user.user_id)));
  }
  
  var reqData = {
    endpoint: 'user/find',
    data: {text:search}
  }
  var users = useSelector((i: any) => i.request_data[stringify(reqData)] ?? {})
  useFocusEffect(
    React.useCallback(() => {
      if(search.length>=3) dispatch(request.add(reqData))
      return () => {
        if(search.length>=3) dispatch(request.remove(reqData))
      };
    }, [search])
  );
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ScrollView
      contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{padding:4,width:"100%"}}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Card noPad cardStyle={{flexDirection: "row", backgroundColor: "#fff", alignItems:"stretch"}}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{padding:4}}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Card noPad>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {search.length<3&&<Text allowFontScaling={false} style={{textAlign:"center",...font("bold"),fontSize:16,color:theme.page_content.fg}}>{t('search:user')}</Text>}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {search.length>=3&&!users?.data?.users&&<View style={{height:100,justifyContent:"center",alignItems:"center"}}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <ActivityIndicator size={32} color={theme.page_content.fg} />
            </View>}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {users?.data?.users?.length===0&&<Text allowFontScaling={false} style={{textAlign:"center",...font("bold"),fontSize:16,color:theme.page_content.fg}}>{t('search:empty')}</Text>}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {users?.data?.users?.slice?.(0,20)?.map?.((i: any) => <View key={i.clan_id} style={{padding: 4, flexDirection: "row", alignItems: "center"}}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {!userBookmarks.find((x: any) => x.user_id==i.user_id)&&<IconButton size={24} onPress={()=>addUser(i)} icon="bookmark-plus" color="#016930" />}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {!!userBookmarks.find((x: any) => x.user_id==i.user_id)&&<IconButton size={24} onPress={()=>removeUser(i)} icon="bookmark-minus" color="#ff2222" />}
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Image style={{height:24,width:24,marginRight:8,marginLeft:-8,borderRadius:12}} source={{uri:i.avatar??`https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(i.user_id).toString(36)}.png`}} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{flex:1}}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{...font("bold"),fontSize:16,color:theme.page_content.fg}}>{i.username}</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{...font("bold"),fontSize:12,color:theme.page_content.fg}}>#{i.user_id}</Text>
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <IconButton size={24} onPress={()=>navigation.navigate('UserDetails',{ username: i.username })} icon="chevron-right" color={theme.page_content.fg} />
            </View>)}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}