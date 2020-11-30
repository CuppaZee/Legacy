
import React from "react";

import { ActivityIndicator, View, Platform, Text, Image } from "react-native";
import { IconButton, Button } from "react-native-paper";

import { useSelector } from "react-redux";
import * as AuthSession from 'expo-auth-session';
import { useNavigation } from '@react-navigation/native';
import Oconfig from './Config';
import { useTranslation } from "react-i18next";
import { MaterialCommunityIcons } from "@expo/vector-icons";



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
var config_pear = {
  redirect_uri: 'https://server.cuppazee.app/auth/auth/pear/v1',
  client_id: '03976daca89a9120a3eef81996629184'
}
var config_pine = {
  client_id: "c983d59354542f8d15e11924ed61bae6",
  redirect_uri: "https://server.cuppazee.app/auth/auth/pine/v1"
}

const statusMessages = {
  waiting_for_login: "Waiting for Login...",
  logging_in: "Logging in...",
  invalid_response: "Oops, it looks like something went wrong when logging in.",
  success: "Logged in Successfully!",
}
const statusIcons = {
  waiting_for_login: "loading",
  logging_in: "loading",
  invalid_response: "alert",
  success: "check-bold",
}

export default function AuthScreen({
  route
}: any) {
  var { t } = useTranslation();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var [status, setStatus] = React.useState(0);
  const navigation = useNavigation();
  const discovery = {
    authorizationEndpoint: 'https://api.munzee.com/oauth',
    tokenEndpoint: 'https://api.munzee.com/oauth/login',
  };
  const data = useAPIRequest({
    endpoint: 'competition/join/v1',
    cuppazee: true,
    data: {
      username: route.params.username
    }
  })
  const config = data?.team === "pear" ? config_pear : config_pine;

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
      (async function () {



        // @ts-expect-error ts-migrate(2339) FIXME: Property 'params' does not exist on type 'AuthSess... Remove this comment to see the full error message
        if (!response.params || !response.params.teaken) return setStatus("invalid_response");



        // @ts-expect-error ts-migrate(2339) FIXME: Property 'params' does not exist on type 'AuthSess... Remove this comment to see the full error message
        if(response.params.status) {



          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
          setStatus(`success_${response.params.status}`);
        } else {


          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
          setStatus("success");
        }
      })()
    }
  }, [response]);


  // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
  if (status === "loading") {



    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page_content.bg }}>



      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  }


  // @ts-expect-error ts-migrate(2367) FIXME: This condition will always return 'false' since th... Remove this comment to see the full error message
  if (status === "success" || status === "success_reopt" || status === "success_already") {



    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page_content.bg }}>



      {status !== "success_already" && <>



        <Image source={data?.team === "pine" ? require('assets/pine.png') : require('assets/pear.png')} style={{ height: 128, width: 128, borderRadius: 8, marginBottom: 16 }} />



        {/* @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'. */}
        <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", color: theme.page_content.fg }}>{response.params.username} {status === "success" ? "has joined" : "is in"} Team {data?.team.toUpperCase() || '???¿??'}</Text>
      </>}



      {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'replace' does not exist on type 'Navigat... Remove this comment to see the full error message */}
      <Button mode="contained" onPress={()=>navigation.replace('CompetitionHome')}>Return to Competition Dashboard</Button>
    </View>
  }



  return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page_content.bg }}>



    {!!status && <>



      {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
      {statusIcons[status]==="loading"?<ActivityIndicator size="large" color={theme.page_content.fg} />:<MaterialCommunityIcons name={statusIcons[status]} color={theme.page.fg} size={48} />}



      {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
      <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", color: theme.page_content.fg }}>{statusMessages[status]}</Text>
    </>}



    <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 24 }}>Opt-in to Competition</Text>



    <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16 }}>{t('auth:tap')}</Text>



    <IconButton


      // @ts-expect-error ts-migrate(2322) FIXME: Type 'boolean | 0' is not assignable to type 'bool... Remove this comment to see the full error message
      disabled={!data || (status && status !== "invalid_response")}
      size={32}
      onPress={() => {


        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string' is not assignable to par... Remove this comment to see the full error message
        setStatus("waiting_for_login");
        promptAsync({
          useProxy: Oconfig.useProxy,



          // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ useProxy: boolean; redirectUri... Remove this comment to see the full error message
          redirectUri: config.redirect_uri
        });
      }}
      color={theme.page_content.fg}
      icon="login-variant"
    />
  </View>
}