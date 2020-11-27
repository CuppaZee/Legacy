// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import React from "react";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { ActivityIndicator, View, Platform, Text, Image } from "react-native";
import { IconButton, Button } from "react-native-paper";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
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
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'params' does not exist on type 'AuthSess... Remove this comment to see the full error message
          setStatus(`success_${response.params.status}`);
        } else {
          setStatus("success");
        }
      })()
    }
  }, [response]);
  if (status === "loading") {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page_content.bg }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  }
  if (status === "success" || status === "success_reopt" || status === "success_already") {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page_content.bg }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {status !== "success_already" && <>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Image source={data?.team === "pine" ? require('assets/pine.png') : require('assets/pear.png')} style={{ height: 128, width: 128, borderRadius: 8, marginBottom: 16 }} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", color: theme.page_content.fg }}>{response.params.username} {status === "success" ? "has joined" : "is in"} Team {data?.team.toUpperCase() || '???¿??'}</Text>
      </>}
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Button mode="contained" onPress={()=>navigation.replace('CompetitionHome')}>Return to Competition Dashboard</Button>
    </View>
  }
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page_content.bg }}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    {!!status && <>
      {/* @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message */}
      {statusIcons[status]==="loading"?<ActivityIndicator size="large" color={theme.page_content.fg} />:<MaterialCommunityIcons name={statusIcons[status]} color={theme.page.fg} size={48} />}
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", color: theme.page_content.fg }}>{statusMessages[status]}</Text>
    </>}
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 24 }}>Opt-in to Competition</Text>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16 }}>{t('auth:tap')}</Text>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <IconButton
      disabled={!data || (status && status !== "invalid_response")}
      size={32}
      onPress={() => {
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