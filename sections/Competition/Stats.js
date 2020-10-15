import * as React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Card from 'sections/Shared/Card';
import { useSelector } from 'react-redux';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import useLevelColours from 'utils/hooks/useLevelColours';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import getIcon, { g } from 'utils/db/icon';
import useMoment from 'utils/hooks/useMoment';
import gameConfig_1 from './gameconfig.json';
import gameConfig_2 from './gameconfig_2.json';
import Countdown from './Countdown';

export default function ClanScreen({ route }) {
  var moment = useMoment();
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var dark = false;
  var level_colors = useLevelColours();
  if (theme.dark) {
    dark = true;
    level_colors.border = "#fffa"
  }
  var { data: round, status } = useAPIRequest({
    endpoint: 'competition/stats/v1',
    cuppazee: true,
    data: {
      round: route.params.round
    }
  }, true);
  const gameConfig = round?.round_id > 1 ? gameConfig_2 : gameConfig_1;
  if (status) {
    if (status === "loading") {
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
        <ActivityIndicator size="large" color={theme.page.fg} />
      </View>
    } else {
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
        <MaterialCommunityIcons name="alert" color={theme.page.fg} size={48} />
        <Text allowFontScaling={false} style={{ fontSize: 16, fontWeight: "bold", textAlign: "center", color: theme.page_content.fg }}>{t('error:' + status)}</Text>
      </View>
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
        style={{ flex: 1, backgroundColor: theme.page.bg }}>
        <View style={{ padding: 4, paddingBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "center", fontSize: 12, lineHeight: 16, fontWeight: "bold", color: theme.page_content.fg }}>Team PEAR</Text>
              <View style={{ flexDirection: "row" }}>
                <Image source={require('assets/pear.png')} style={{ height: 32, width: 32, borderTopLeftRadius: 4, borderBottomLeftRadius: 4, backgroundColor: "#98CA47", borderWidth: 2, borderColor: theme.page_content.fg, zIndex: 2, marginHorizontal: 0 }} />
                <View style={{ flex: 1 }}><ProgressBar style={{ transform: [{ scaleX: -1 }], height: 32, backgroundColor: theme.page_content.bg, borderTopWidth: 2, borderBottomWidth: 2, borderColor: theme.page_content.fg }} progress={(round.points?.pear ?? round.base ?? round.max) / round.max} color="#98CA47" /></View>
              </View>
              <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 16, fontWeight: "bold", color: theme.page_content.fg }}>{round.points?.pear ?? round.base ?? round.max}<Text style={{ fontSize: 12 }}> / {round.max} HP</Text></Text>
            </View>
            <View style={{
              height: 64, width: 64, borderRadius: 16, backgroundColor: {
                pine: "#16341A",
                pear: "#98CA47"
              }[round.result] || theme.page_content.bg, borderWidth: 2, borderColor: theme.page_content.fg, zIndex: 2, marginHorizontal: 0, justifyContent: "center", alignItems: "center"
            }}>
              <Text style={{
                color: {
                  pine: "#ffffff",
                  pear: "#000000"
                }[round.result] || theme.page_content.fg, fontWeight: "bold", fontSize: 12, lineHeight: 12
              }}>Round</Text>
              <Text style={{
                color: {
                  pine: "#ffffff",
                  pear: "#000000"
                }[round.result] || theme.page_content.fg, fontWeight: "bold", fontSize: 32, lineHeight: 32
              }}>{round.round_id}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "center", fontSize: 12, lineHeight: 16, fontWeight: "bold", color: theme.page_content.fg }}>Team PINE</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}><ProgressBar style={{ height: 32, backgroundColor: theme.page_content.bg, borderTopWidth: 2, borderBottomWidth: 2, borderColor: theme.page_content.fg }} progress={(round.points?.pine ?? round.base ?? round.max) / round.max} color="#16341A" /></View>
                <Image source={require('assets/pine.png')} style={{ height: 32, width: 32, borderTopRightRadius: 4, borderBottomRightRadius: 4, backgroundColor: "#16341A", borderWidth: 2, borderColor: theme.page_content.fg, zIndex: 2, marginHorizontal: 0 }} />
              </View>
              <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 16, fontWeight: "bold", color: theme.page_content.fg }}>{round.points?.pine ?? round.base ?? round.max}<Text style={{ fontSize: 12 }}> / {round.max} HP</Text></Text>
            </View>
          </View>
          <View style={{ paddingTop: 8 }}>
            <Card noPad>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ width: 400, flexGrow: 1, maxWidth: "100%" }}>
                  <Text style={{ color: theme.page_content.fg, textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Round {round.round_id}</Text>
                  <View style={{ flexDirection: "row", justifyContent: "center"}}>
                    <View style={{marginRight: 4}}>
                      <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}>Started</Text>
                      <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}>Data Updated</Text>
                      {round.end && <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}>Ended</Text>}
                      <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}>Timeout</Text>
                      <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}>Base Health</Text>
                      <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}>Max Health</Text>
                    </View>
                    <View style={{marginRight: 4}}>
                      <Text numberOfLines={1} style={{ fontSize: 16, textAlign: "left" }}>{moment(round.start).format('L LT')}</Text>
                      <Text numberOfLines={1} style={{ fontSize: 16, textAlign: "left" }}>{moment(round.updated_at).format('L LT')}</Text>
                      {round.end && <Text numberOfLines={1} style={{ fontSize: 16, textAlign: "left" }}>{moment(round.end).format('L LT')}</Text>}
                      <Text numberOfLines={1} style={{ fontSize: 16, textAlign: "left" }}>{moment(round.start + round.max_length).format('L LT')} | {round.max_length / 86400000} Days</Text>
                      <Text numberOfLines={1} style={{ fontSize: 16, textAlign: "left" }}>{round.base} HP</Text>
                      <Text numberOfLines={1} style={{ fontSize: 16, textAlign: "left" }}>{round.max} HP</Text>
                    </View>
                  </View>
                  {!round.end && <Countdown time={round.start + round.max_length} />}
                  {/* <Text style={{ color: theme.page_content.fg, textAlign: "center", fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Started:</Text> {moment(round.start).format('L LT')}</Text>
                  {round.updated_at && <Text style={{ color: theme.page_content.fg, textAlign: "center", fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Data Updated:</Text> {moment(round.updated_at).format('L LT')}</Text>}
                  {round.end ? <Text style={{ color: theme.page_content.fg, textAlign: "center", fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Ended:</Text> {moment(round.end).format('L LT')}</Text> : <>
                    <Text style={{ color: theme.page_content.fg, textAlign: "center", fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Ends:</Text> {moment(round.start + round.max_length).format('L LT')} or when a Team is knocked out.</Text>
                    <Countdown time={round.start + round.max_length} />
                  </>}
                  <Text style={{ color: theme.page_content.fg, textAlign: "center", fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Timeout:</Text> {round.max_length / 86400000} Days</Text>
                  <Text style={{ color: theme.page_content.fg, textAlign: "center", fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Base Health:</Text> {round.base} HP</Text>
                  <Text style={{ color: theme.page_content.fg, textAlign: "center", fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>Max Health:</Text> {round.max} HP</Text> */}
                </View>
              </View>
            </Card>
          </View>
          {["pear", "pine"].map(team => <View style={{ paddingTop: 8 }}>
            <Card noPad>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ width: 400, flexGrow: 1, maxWidth: "100%" }}>
                  <Text style={{ color: theme.page_content.fg, padding: 4, textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Team {team.toUpperCase()}</Text>
                  <Text style={{ color: theme.page_content.fg, fontWeight: "bold", flex: 1, padding: 4, textAlign: "center", fontSize: 16 }}>Damage Dealing</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <View style={{ width: 250, flexGrow: 1, maxWidth: "100%" }}>
                      <Text style={{ color: theme.page_content.fg, fontWeight: "bold", textAlign: "center" }}>Captures</Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {gameConfig.damaging.filter(i => i.type === "capture").map(type => <View style={{ width: 40, alignItems: "center", paddingHorizontal: 4, opacity: round.stats[team][`${g(type.icon)}_${type.type}`] ? 1 : 0.4 }}>
                          <Image source={getIcon(type.icon)} style={{ height: 32, width: 32 }} />
                          <Text style={{ color: theme.page_content.fg }}>{round.stats[team][`${g(type.icon)}_${type.type}`] || '-'}</Text>
                        </View>)}
                      </View>
                    </View>
                    <View style={{ width: 80, flexGrow: 1, maxWidth: "100%" }}>
                      <Text style={{ color: theme.page_content.fg, fontWeight: "bold", textAlign: "center" }}>Deploys</Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {gameConfig.damaging.filter(i => i.type === "deploy").map(type => <View style={{ width: 40, alignItems: "center", paddingHorizontal: 4, opacity: round.stats[team][`${g(type.icon)}_${type.type}`] ? 1 : 0.4 }}>
                          <Image source={getIcon(type.icon)} style={{ height: 32, width: 32 }} />
                          <Text style={{ color: theme.page_content.fg }}>{round.stats[team][`${g(type.icon)}_${type.type}`] || '-'}</Text>
                        </View>)}
                      </View>
                    </View>
                  </View>
                  <Text style={{ color: theme.page_content.fg, fontWeight: "bold", flex: 1, padding: 4, textAlign: "center", fontSize: 16 }}>Health Gaining</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <View style={{ width: 250, flexGrow: 1, maxWidth: "100%" }}>
                      <Text style={{ color: theme.page_content.fg, fontWeight: "bold", textAlign: "center" }}>Captures</Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {gameConfig.healing.filter(i => i.type === "capture").map(type => <View style={{ width: 40, alignItems: "center", paddingHorizontal: 4, opacity: round.stats[team][`${g(type.icon)}_${type.type}`] ? 1 : 0.4 }}>
                          <Image source={getIcon(type.icon)} style={{ height: 32, width: 32 }} />
                          <Text style={{ color: theme.page_content.fg }}>{round.stats[team][`${g(type.icon)}_${type.type}`] || '-'}</Text>
                        </View>)}
                      </View>
                    </View>
                    <View style={{ width: 80, flexGrow: 1, maxWidth: "100%" }}>
                      <Text style={{ color: theme.page_content.fg, fontWeight: "bold", textAlign: "center" }}>Deploys</Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {gameConfig.healing.filter(i => i.type === "deploy").map(type => <View style={{ width: 40, alignItems: "center", paddingHorizontal: 4, opacity: round.stats[team][`${g(type.icon)}_${type.type}`] ? 1 : 0.4 }}>
                          <Image source={getIcon(type.icon)} style={{ height: 32, width: 32 }} />
                          <Text style={{ color: theme.page_content.fg }}>{round.stats[team][`${g(type.icon)}_${type.type}`] || '-'}</Text>
                        </View>)}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Card>
          </View>)}
        </View>
      </ScrollView>
    </View>
  );
}