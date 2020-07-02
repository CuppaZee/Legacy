import * as React from 'react';
import { Text, View, ScrollView, Image, ActivityIndicator } from 'react-native';
import Card from 'sections/Shared/Card';
import { useSelector } from 'react-redux';
import { Button, Menu, TouchableRipple } from 'react-native-paper';
import useAPIRequest from 'utils/hooks/useAPIRequest'
import font from 'sections/Shared/font';
import MapView from 'sections/Maps/MapView';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';
import getType from 'utils/db/types';
import UserFAB from './FAB';

function BlastType({ data, icon }) {
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
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
    </View>
  </Menu>;
}

export default function ClanScreen({ route }) {
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var username = route.params.username;
  var [location, setLocation] = React.useState({
    lat: 0,
    lng: 0
  })
  var [storedLocation, setStoredLocation] = React.useState({
    lat: 0,
    lng: 0
  })
  var [blastSize, setBlastSize] = React.useState(0)
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: i => i?.user_id
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
        {(location.lat !== 0 || location.lng !== 0) ? <View style={{ flexDirection: "row", width: "100%" }}>
          <View style={{ padding: 4, flex: 1 }}>
            <Button
              mode="contained"
              backgroundColor={theme.navigation.fg}
              style={theme.page_content.border ? { borderColor: "white", borderWidth: 1 } : {}}
              color={theme.navigation.bg}
              onPress={() => {
                setLocation({ lat: 0, lng: 0 });
              }}>
              Close
              </Button>
          </View>
        </View> : <>
            <View style={{ padding: 4, height: 400, width: "100%" }}>
              <Card noPad>
                <MapView center={storedLocation} onRegionChange={({ latitude, longitude }) => {
                  if (storedLocation.lat !== latitude || storedLocation.lng !== longitude) setStoredLocation({
                    lat: latitude,
                    lng: longitude
                  })
                }} tracksViewChanges={true} markers={[{
                  ...storedLocation,
                  icon: "blastcapture"
                }]} style={{ flex: 1 }} />
              </Card>
            </View>
            <View style={{ flexDirection: "row", width: "100%" }}>
              <View style={{ padding: 4, flex: 1 }}>
                <Button
                  mode="contained"
                  backgroundColor={theme.navigation.fg}
                  style={theme.page_content.border ? { borderColor: "white", borderWidth: 1 } : {}}
                  color={theme.navigation.bg}
                  onPress={() => {
                    setBlastSize(50);
                    setLocation(storedLocation);
                  }}>
                  Mini
                </Button>
              </View>
              <View style={{ padding: 4, flex: 1 }}>
                <Button
                  mode="contained"
                  backgroundColor={theme.navigation.fg}
                  style={theme.page_content.border ? { borderColor: "white", borderWidth: 1 } : {}}
                  color={theme.navigation.bg}
                  onPress={() => {
                    setBlastSize(100);
                    setLocation(storedLocation);
                  }}>
                  Normal
              </Button>
              </View>
              <View style={{ padding: 4, flex: 1 }}>
                <Button
                  mode="contained"
                  backgroundColor={theme.navigation.fg}
                  style={theme.page_content.border ? { borderColor: "white", borderWidth: 1 } : {}}
                  color={theme.navigation.bg}
                  onPress={() => {
                    setBlastSize(500);
                    setLocation(storedLocation);
                  }}>
                  Mega
                </Button>
              </View>
            </View>
          </>}
        {!blastData && (location.lat !== 0 || location.lng !== 0) && <View style={{ flex: 1, padding: 8, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator size="large" color={theme.page.fg} />
        </View>}
        {blastData?.map?.((i, index) => <View style={{ padding: 4, width: 400, maxWidth: "100%", flexGrow: 1 }}>
          <Card noPad>
            <View>
              <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 20, color: theme.page_content.fg, padding: 4, textAlign: "center", lineHeight: 20 }}>Blast {index + 1} - {i.total} Munzees</Text>
              <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg, padding: 4, textAlign: "center", lineHeight: 16 }}>{i.points.min} - {i.points.max} Points (Avg. {i.points.avg})</Text>
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