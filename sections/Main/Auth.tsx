
import React from "react";

import { ActivityIndicator, View, Platform, Text } from "react-native";
import { IconButton, Button } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";
import * as AuthSession from 'expo-auth-session';
import { useNavigation } from '@react-navigation/native';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/store' or its correspond... Remove this comment to see the full error message
import s from 'utils/store';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Config' or its... Remove this comment to see the full error message
import Oconfig from 'sections/Shared/Config';
import { useTranslation } from "react-i18next";



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'from' or its corresponding typ... Remove this comment to see the full error message
import FROM from 'from';
var config_main = {
  redirect_uri: 'https://server.cuppazee.app/auth/auth/v1',
  client_id: '91714935879f433364bff187bda66183'
}
var config_team = {
  client_id: "c983d59354542f8d15e11924ed61bae6",
  redirect_uri: "https://server.cuppazee.app/auth/auth/team/v1"
}
var config_universal = {
  client_id: "64f148f57d1d7c62e44a90e5f3661432",
  redirect_uri: "https://server.cuppazee.app/auth/auth/universal/v1"
}
var config = config_main;
const {login,userBookmarks: userBookmarksR} = s;

export default function AuthScreen () {
  var {t} = useTranslation();
  var dispatch = useDispatch();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var hasLogin = useSelector((i: any) => Object.keys(i.logins).length>0);
  var userBookmarks = useSelector((i: any) => i.userBookmarks);
  function addUser(user: any) {
    if(!userBookmarks.find((i: any) => i.user_id==user.user_id)) dispatch(userBookmarksR(userBookmarks.concat([user])));
  }
  var [loading,setLoading] = React.useState(false);
  var [redirect,setRedirect] = React.useState(false);
  var [now, setNow] = React.useState(Date.now());
  React.useEffect(()=>{
    var x = setInterval(()=>{
      setNow(Date.now());
    },1000);
    return ()=>clearInterval(x);
  })
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



        // @ts-expect-error ts-migrate(2339) FIXME: Property 'params' does not exist on type 'AuthSess... Remove this comment to see the full error message
        if(!response.params || !response.params.teaken) return setLoading(false);
        var x = {};



        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        x[response.params.user_id] = {



          // @ts-expect-error ts-migrate(2339) FIXME: Property 'params' does not exist on type 'AuthSess... Remove this comment to see the full error message
          username: response.params.username,



          // @ts-expect-error ts-migrate(2339) FIXME: Property 'params' does not exist on type 'AuthSess... Remove this comment to see the full error message
          teaken: response.params.teaken
        }



        // @ts-expect-error ts-migrate(2339) FIXME: Property 'params' does not exist on type 'AuthSess... Remove this comment to see the full error message
        var y = await fetch(`https://server.cuppazee.app/auth/get/v2?teaken=${encodeURIComponent(response.params.teaken)}&user_id=${encodeURIComponent(response.params.user_id)}&from=${encodeURIComponent(FROM)}`)



        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        x[response.params.user_id].token = (await y.json()).data;
        dispatch(login(x));
        addUser({



          // @ts-expect-error ts-migrate(2339) FIXME: Property 'params' does not exist on type 'AuthSess... Remove this comment to see the full error message
          user_id: response.params.user_id,



          // @ts-expect-error ts-migrate(2339) FIXME: Property 'params' does not exist on type 'AuthSess... Remove this comment to see the full error message
          username: response.params.username
        });
        setLoading(false);



        // @ts-expect-error ts-migrate(2339) FIXME: Property 'params' does not exist on type 'AuthSess... Remove this comment to see the full error message
        setRedirect(response.params.username);
      })()
    }
  }, [response]);



  // @ts-expect-error ts-migrate(2339) FIXME: Property 'replace' does not exist on type 'Navigat... Remove this comment to see the full error message
  if(redirect) setTimeout(()=>navigation.replace('UserDetails',{username:redirect}),500)



  return <View style={{flex:1,justifyContent:"center",alignItems:"center",backgroundColor:theme.page_content.bg}}>{



    loading ? <View style={{flex:1,justifyContent:"center",alignItems:"center"}}><ActivityIndicator size="large" color={theme.page_content.fg} /></View> : <>



      <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>



      <Text allowFontScaling={false} style={{color:theme.page_content.fg,fontSize:24}}>{hasLogin?t('auth:add'):t('auth:welcome')}</Text>



        <Text allowFontScaling={false} style={{color:theme.page_content.fg,fontSize:16}}>{t('auth:tap')}</Text>



        <IconButton
          size={32}
          onPress={() => {
            setLoading(true);
            promptAsync({
              useProxy: Oconfig.useProxy,



              // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ useProxy: any; redirectUri: st... Remove this comment to see the full error message
              redirectUri: config.redirect_uri
            });
          }}
          color={theme.page_content.fg}
          icon="login-variant"
        />
      </View>
      {/* {now >= 1594314000000 && <Button icon="flag" mode="contained" style={{backgroundColor:theme.navigation.bg,marginBottom:8}} onPress={()=>navigation.navigate('AllCampLeaderboard')}>Camps Leaderboard</Button>} */}
    </>
  }</View>
}