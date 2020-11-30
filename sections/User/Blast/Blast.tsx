
import * as React from 'react';

import { Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';

import { useSelector } from 'react-redux';
import { Button, Menu, TouchableRipple } from 'react-native-paper';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest'



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Maps/MapView' or its ... Remove this comment to see the full error message
import MapView from 'sections/Maps/MapView';
import { useTranslation } from 'react-i18next';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types' or its corresp... Remove this comment to see the full error message
import getType from 'utils/db/types';



import UserFAB from '../FAB';

function BlastType({
  data,
  icon
}: any) {
  var { t } = useTranslation();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var [open, setOpen] = React.useState(false);



  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={



      <TouchableRipple onPress={() => setOpen(true)}>



        <View key={icon} style={{ padding: 2, alignItems: "center" }}>



          <Image style={{ height: 36, width: 36 }} source={getIcon(icon)} />



          <Text allowFontScaling={false} style={{ ...font(), color: theme.page_content.fg, fontSize: 16 }}>{data.total}</Text>
        </View>
      </TouchableRipple>
    }
    style={{ marginTop: 61 }}
  >



    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>



      <Image style={{ height: 48, width: 48 }} source={getIcon(icon)} />



      <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold") }}>{data.total}x {getType(icon)?.name || icon}</Text>



      <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold") }}>{t('blast_checker:type_points',data.points)}</Text>
    </View>
  </Menu>;
}

export default function ClanScreen({
  route
}: any) {
  var { t } = useTranslation();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var username = route.params.username;
  var location = {
    lat: route.params.lat,
    lng: route.params.lon
  }
  var blastSize = route.params.size;
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: (i: any) => i?.user_id
  })
  var blastData = useAPIRequest(location.lat !== 0 || location.lng !== 0 ? {
    endpoint: `map/blast/v1`,
    cuppazee: true,
    data: {
      user_id,
      ...location,
      amount: blastSize
    }
  } : null)
  return (



    <View style={{ flex: 1 }}>



      <ScrollView
        contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center", padding: 4, paddingBottom: 92 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>



        {!blastData && <View style={{ flex: 1, padding: 8, justifyContent: "center", alignItems: "center" }}>



          <ActivityIndicator size="large" color={theme.page.fg} />
        </View>}



        {blastData?.map?.((i: any, index: any) => <View style={{ padding: 4, width: 400, maxWidth: "100%", flexGrow: 1 }}>



          <Card noPad>



            <View>



              <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 20, color: theme.page_content.fg, padding: 4, textAlign: "center", lineHeight: 20 }}>{t('blast_checker:blast',{n:index + 1})} - {t('blast_checker:munzees',{count:i.total})}</Text>



              <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg, padding: 4, textAlign: "center", lineHeight: 16 }}>{t('blast_checker:points',i.points)} ({t('blast_checker:average',{avg:i.points.avg})})</Text>



              <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>



                {Object.entries(i.types).map(([icon, data]) => <BlastType icon={icon} data={data} />)}
              </View>
            </View>
          </Card>
        </View>)}
      </ScrollView>



      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}