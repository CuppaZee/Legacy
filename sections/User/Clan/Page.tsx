
import * as React from 'react';

import { Text, View, Image, ScrollView, ActivityIndicator, FlatList } from 'react-native';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
import { useTranslation } from 'react-i18next';

import { useSelector } from 'react-redux';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Clan/Cards/Requiremen... Remove this comment to see the full error message
import RequirementsCard from 'sections/Clan/Cards/Requirements';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useLevelColours' o... Remove this comment to see the full error message
import useLevelColours from 'utils/hooks/useLevelColours';
import { ClanRequirementsConverter } from '../../Clan/Data';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
import { MaterialCommunityIcons } from '@expo/vector-icons';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';



import UserFAB from '../FAB';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/config' or its correspon... Remove this comment to see the full error message
import config from 'utils/config';
// import ViewShot from 'react-native-view-shot';
// import { Button } from 'react-native-paper';
// import * as Sharing from 'expo-sharing';

export default function ClanScreen({
  route
}: any) {
  var ref = React.useRef();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var dark = theme.dark;
  var level_colors = useLevelColours()
  var { t } = useTranslation();
  var username = route.params.username;
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: (i: any) => i?.user_id
  })
  var unformatted_requirements = useAPIRequest({
    endpoint: 'clan/v2/requirements',
    data: { clan_id: 1349, game_id: config.clan.game_id }
  })
  var data = useAPIRequest(user_id ? {
    endpoint: 'user/clanprogress',
    data: { user_id },
    cuppazee: true
  } : null)
  // async function screenshot() {
  //   const result = await ref.current.capture();
  //   if (!(await Sharing.isAvailableAsync())) {
  //     alert(`Uh oh, sharing isn't available on your platform`);
  //     return;
  //   }
  //   await Sharing.shareAsync(result);
  // }
  if (!data) {
    if (data === undefined) {



      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>



        <ActivityIndicator size="large" color={theme.page_content.fg} />
      </View>
    } else {



      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: '#ffaaaa' }}>



        <MaterialCommunityIcons name="alert" size={48} color="#d00" />
      </View>;
    }
  }



  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  var requirements = ClanRequirementsConverter(unformatted_requirements);
  function calculateLevel(requirement: any, value: any) {
    if (!requirements) return 0;
    let level = 0;



    // @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'.
    for (var lev of requirements?.levels || []) {
      if (value >= (lev?.individual?.[requirement] || 0)) {
        level++;
      }
    }
    return level;
  }
  return (



    <View style={{ flex: 1 }}>




      <ScrollView
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        {/* <ViewShot ref={ref} options={{ format: "jpg", quality: 0.9 }}> */}



        <FlatList
          style={{ flexGrow: 0 }}



          // @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'.
          data={requirements?.order?.requirements}
          extraData={data}



          renderItem={({ item: i }) => <View style={{ padding: 4 }}>



            <Card noPad>



              <View style={{ flexDirection: "row", alignItems: "center" }}>



                <View style={{ padding: 8 }}>



                  {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'requirements' does not exist on type '{}... Remove this comment to see the full error message */}
                  <Image source={getIcon(requirements?.requirements?.[i]?.icon)} style={{ width: 48, height: 48 }} />
                </View>



                <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>



                  {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'requirements' does not exist on type '{}... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ fontSize: 20, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{requirements?.requirements?.[i]?.top} {requirements?.requirements?.[i]?.bottom}</Text>
                  {/* <Text allowFontScaling={false} style={{ fontSize: 12, fontWeight: "500", color: theme.page_content.fg, opacity: 0.8 }}>{requirements?.requirements?.[i]?.description}</Text> */}



                  <Text allowFontScaling={false} style={{ fontSize: 16, ...font(500), color: theme.page_content.fg, opacity: 0.8 }}>{data?.[i]?.toLocaleString?.() || '0'}</Text>
                </View>



                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'. */}
                {requirements?.order?.individual?.includes?.(i) ? <View style={{ alignSelf: "stretch", borderTopRightRadius: 8, borderBottomRightRadius: 8, borderLeftWidth: dark ? 2 : 0, borderLeftColor: dark ? level_colors[calculateLevel(i, data?.[i])].fg : undefined, backgroundColor: dark ? undefined : level_colors[calculateLevel(i, data?.[i])].bg, width: 60, alignItems: "center", justifyContent: "center" }}>



                  <Text allowFontScaling={false} style={{ color: dark ? theme.page_content.fg : level_colors[calculateLevel(i, data?.[i])].fg, ...font() }}>{t('clan:level', { count: 1 })}</Text>



                  <Text allowFontScaling={false} style={{ color: dark ? theme.page_content.fg : level_colors[calculateLevel(i, data?.[i])].fg, fontSize: 24, ...font("bold") }}>{calculateLevel(i, data?.[i])}</Text>
                </View> : null}
              </View>
            </Card>
          </View>}
        />
        {/* </ViewShot> */}
        {/* <Button onPress={screenshot}>Screenshot</Button> */}



        <View style={{ padding: 4, flex: 1 }}>



          <RequirementsCard game_id={config.clan.game_id} />
        </View>
      </ScrollView>



      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}