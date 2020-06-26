import React from "react";
import { ActivityIndicator, View, Platform, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as AuthSession from 'expo-auth-session';
import { useNavigation } from '@react-navigation/native';
import s from 'utils/store';
import Oconfig from 'sections/Shared/Config';
import { useTranslation } from "react-i18next";
var config = {
  redirect_uri: 'https://server.cuppazee.app/auth/auth/v1',
  client_id: '91714935879f433364bff187bda66183'
}
const {login,userBookmarks: userBookmarksR} = s;

export default function AuthScreen () {
  var {t} = useTranslation();
  var dispatch = useDispatch();
  var theme = useSelector(i=>i.themes[i.theme]);
  var hasLogin = useSelector(i=>Object.keys(i.logins).length>0);
  var userBookmarks = useSelector(i => i.userBookmarks);
  function addUser(user) {
    if(!userBookmarks.find(i=>i.user_id==user.user_id)) dispatch(userBookmarksR(userBookmarks.concat([user])));
  }
  var [loading,setLoading] = React.useState(false);
  var [redirect,setRedirect] = React.useState(false);
  const navigation = useNavigation();
  const discovery = {
    authorizationEndpoint: 'https://api.munzee.com/oauth',
    tokenEndpoint: 'https://api.munzee.com/oauth/login',
  };

  const [request, response, promptAsync] = AuthSession.useAuthRequest(
    {
      clientId: config.client_id,
      scopes: ['read'],
      redirectUri: config.redirect_uri,
      state: JSON.stringify({
        redirect: Oconfig.redirect_uri,
        platform: Platform.OS
      })
    },
    discovery
  );

  React.useEffect(() => {
    if (response) {
      (async function() {
        if(!response.params || !response.params.teaken) return setLoading(false);
        var x = {};
        x[response.params.user_id] = {
          username: response.params.username,
          teaken: response.params.teaken
        }
        var y = await fetch(`https://server.cuppazee.app/auth/get/v2?teaken=${encodeURIComponent(response.params.teaken)}&user_id=${encodeURIComponent(response.params.user_id)}`)
        x[response.params.user_id].token = (await y.json()).data;
        dispatch(login(x));
        addUser({
          user_id: response.params.user_id,
          username: response.params.username
        });
        setLoading(false);
        setRedirect(response.params.username);
      })()
    }
  }, [response]);
  if(redirect) setTimeout(()=>navigation.replace('UserDetails',{username:redirect}),500)
  return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page_content.bg}}>{
    loading ? <ActivityIndicator size="large" color={theme.page_content.fg} /> : <>
    <Text allowFontScaling={false} style={{color:theme.page_content.fg,fontSize:24}}>{hasLogin?t('auth:add'):t('auth:welcome')}</Text>
      <Text allowFontScaling={false} style={{color:theme.page_content.fg,fontSize:16}}>{t('auth:tap')}</Text>
      <IconButton
        size={32}
        onPress={() => {
          setLoading(true);
          promptAsync({
            useProxy: Oconfig.useProxy,
            redirectUri: config.redirect_uri
          });
        }}
        color={theme.page_content.fg}
        icon="login-variant"
      />
    </>
  }</View>
}