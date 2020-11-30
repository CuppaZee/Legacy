
import * as React from 'react';

import { Text, View, TextInput, Image, ScrollView, ActivityIndicator } from 'react-native';
import { TouchableRipple } from 'react-native-paper';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
import { useFocusEffect } from '@react-navigation/native';

import { useSelector, useDispatch } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/store/request' or its co... Remove this comment to see the full error message
import request from 'utils/store/request';
import stringify from 'fast-json-stable-stringify';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SearchScreen({
  navigation
}: any) {
  var { t } = useTranslation();
  var theme = useSelector((i: any) => i.themes[i.theme])
  var input = React.useRef();
  var [value, setValue] = React.useState('');
  var [search, setSearch] = React.useState('');
  var [timeoutC, setTimeoutC] = React.useState(null);
  function onValue(val: any) {


    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    if (timeoutC) clearTimeout(timeoutC)
    setValue(val);


    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'Timeout' is not assignable to pa... Remove this comment to see the full error message
    setTimeoutC(setTimeout(() => {
      return setSearch(val);
    }, 500))
  }
  var dispatch = useDispatch();

  var reqData = {
    endpoint: 'user/find',
    data: { text: search },
    cuppazee: true
  }
  var users = useSelector((i: any) => i.request_data[stringify(reqData)] ?? {})
  useFocusEffect(
    React.useCallback(() => {
      if (search.length >= 1) dispatch(request.add(reqData))
      return () => {
        if (search.length >= 1) dispatch(request.remove(reqData))
      };
    }, [search])
  );
  return (
    <ScrollView
      contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      <View style={{ padding: 4, width: "100%" }}>
        <Card noPad cardStyle={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "stretch" }}>
          <TextInput
            onSubmitEditing={() => setSearch(value)}


            // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
            ref={input}
            style={{ paddingHorizontal: 8, flex: 1, borderRadius: 8, borderBottomLeftRadius: 8, height: 40 }}
            onChangeText={onValue}
            value={value}
            returnKeyType="search"
          />
        </Card>
      </View>
      <View style={{ padding: 4 }}>
        <Card noPad>
          <View>
            {search.length < 3 && <Text allowFontScaling={false} style={{ textAlign: "center", ...font("bold"), fontSize: 16, color: theme.page_content.fg, marginVertical: 4 }}>Type in your Username</Text>}
            {search.length >= 3 && !users?.data?.users && <View style={{ height: 100, justifyContent: "center", alignItems: "center" }}>
              <ActivityIndicator size={32} color={theme.page_content.fg} />
            </View>}
            {users?.data?.users?.length === 0 && <Text allowFontScaling={false} style={{ textAlign: "center", ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{t('search:empty')}</Text>}
            {users?.data?.users?.slice?.(0, 20)?.map?.((i: any) => <TouchableRipple onPress={() => navigation.navigate('CompetitionAuth', { username: i.username })}>
              <View key={i.clan_id} style={{ padding: 4, flexDirection: "row", alignItems: "center" }}>
                <Image style={{ height: 24, width: 24, marginRight: 8, marginLeft: 4, borderRadius: 12 }} source={{ uri: i.avatar ?? `https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(i.user_id).toString(36)}.png` }} />
                <View style={{ flex: 1 }}>
                  <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{i.username}</Text>
                  <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>#{i.user_id}</Text>
                </View>
                <MaterialCommunityIcons size={24} name="chevron-right" color={theme.page_content.fg} />
              </View>
            </TouchableRipple>)}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}