import React from "react";
import { ActivityIndicator, View, Platform, Text } from "react-native";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import * as AuthSession from 'expo-auth-session';
import { useNavigation } from '@react-navigation/native';
import s from '~store';
import Oconfig from '~sections/Shared/Config';
var config = {
  redirect_uri: 'https://server.cuppazee.app/auth/auth/v1',
  client_id: '91714935879f433364bff187bda66183'
}
const {login} = s;

export default function AuthScreen () {
  var dispatch = useDispatch();
  var theme = useSelector(i=>i.themes[i.theme]);
  var hasLogin = useSelector(i=>Object.keys(i.logins).length>0);
  var [loading,setLoading] = React.useState(false);
  var [redirect,setRedirect] = React.useState(false);
  const navigation = useNavigation();
  
  // const discovery = {
  //   // authorizationEndpoint: 'https://server.cuppazee.app/auth/auth',
  //   // tokenEndpoint: 'https://api.munzee.com/oauth/login',
  // };
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
        var y = await fetch(`https://server.cuppazee.app/auth/get?teaken=${encodeURIComponent(response.params.teaken)}&user_id=${encodeURIComponent(response.params.user_id)}`)
        x[response.params.user_id].token = (await y.json()).data;
        dispatch(login(x));
        setLoading(false);
        setRedirect(response.params.user_id);
      })()
      // if(!response.params || !response.params.code) return setLoading(false);
      // var formData = new FormData();
      // formData.append('client_id', config.client_id)
      // formData.append('client_secret', '')
      // formData.append('grant_type', 'authorization_code')
      // formData.append('code', response.params.code)
      // formData.append('redirect_uri', config.redirect_uri)
      // fetch(discovery.tokenEndpoint, {
      //   method: 'POST',
      //   body: formData
      // }).then(async i=>{
      //   var {token,user_id} = (await i.json()).data;
      //   var {access_token} = token;
      //   var reqformData = new FormData();
      //   reqformData.append('data',JSON.stringify({user_id,access_token}))
      //   reqformData.append('access_token',access_token)
      //   var d = await fetch(`https://api.munzee.com/user`, {
      //     method: 'POST',
      //     body: reqformData
      //   })
      //   var {data: {username}} = await d.json();
      //   var x = {};
      //   x[user_id] = {
      //     username,
      //     token
      //   }
      //   fetch(`https://server.cuppazee.app/authlog?platform=${Platform.OS}&user=${username}`)
      //   dispatch(login(x));
      //   setLoading(false);
      //   setRedirect(user_id);
      // });
    }
  }, [response]);
  if(redirect) setTimeout(()=>navigation.replace('UserDetails',{userid:redirect}),500)
  return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page_content.bg}}>{
    loading ? <ActivityIndicator size="large" color={theme.page_content.fg} /> : <>
    <Text allowFontScaling={false} style={{color:theme.page_content.fg,fontSize:24}}>{hasLogin?'Add a new User':'Welcome to CuppaZee'}</Text>
      <Text allowFontScaling={false} style={{color:theme.page_content.fg,fontSize:16}}>Tap below to log in</Text>
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