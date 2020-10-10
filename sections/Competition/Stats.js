import * as React from 'react';
import { View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Text, ProgressBar, useTheme, Surface } from 'react-native-paper';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import useLevelColours from 'utils/hooks/useLevelColours';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';
import useMoment from 'utils/hooks/useMoment';
import gameConfig from './gameconfig.json';

export default function ClanScreen({ route }) {
  var moment = useMoment();
  var { t } = useTranslation();
  var theme = useTheme();
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
  if (status) {
    if (status === "loading") {
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color={theme.colors.text} />
      </View>
    } else {
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <MaterialCommunityIcons name="alert" color={theme.colors.text} size={48} />
        <Subheading>{t('error:' + status)}</Subheading>
      </View>
    }
  }
  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
        style={{ flex: 1 }}>
        <View style={{ padding: 4, paddingBottom: 16 }}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "center", fontSize: 12, lineHeight: 16, fontWeight: "bold" }}>Team PEAR</Text>
              <View style={{ flexDirection: "row" }}>
                <Image source={require('assets/pear.png')} style={{ height: 32, width: 32, borderTopLeftRadius: 4, borderBottomLeftRadius: 4, backgroundColor: "#98CA47", borderWidth: 2, borderColor: theme.colors.text, zIndex: 2, marginHorizontal: 0 }} />
                <View style={{ flex: 1 }}><ProgressBar style={{ transform: [{ scaleX: -1 }], height: 32, backgroundColor: theme.colors.surface, borderTopWidth: 2, borderBottomWidth: 2, borderColor: theme.colors.text }} progress={(round.points?.pear ?? round.base ?? round.max) / round.max} color="#98CA47" /></View>
              </View>
              <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 16, fontWeight: "bold" }}>{round.points?.pear ?? round.base ?? round.max}<Text style={{ fontSize: 12 }}> / {round.max} HP</Text></Text>
            </View>
            <View style={{
              height: 64, width: 64, borderRadius: 16, backgroundColor: {
                pine: "#16341A",
                pear: "#98CA47"
              }[round.result] || theme.colors.surface, borderWidth: 2, borderColor: theme.colors.text, zIndex: 2, marginHorizontal: 0, justifyContent: "center", alignItems: "center"
            }}>
              <Text style={{
                color: {
                  pine: "#ffffff",
                  pear: "#000000"
                }[round.result] || theme.colors.text, fontWeight: "bold", fontSize: 12, lineHeight: 12
              }}>Round</Text>
              <Text style={{
                color: {
                  pine: "#ffffff",
                  pear: "#000000"
                }[round.result] || theme.colors.text, fontWeight: "bold", fontSize: 32, lineHeight: 32
              }}>{round.round_id}</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: "center", fontSize: 12, lineHeight: 16, fontWeight: "bold" }}>Team PINE</Text>
              <View style={{ flexDirection: "row" }}>
                <View style={{ flex: 1 }}><ProgressBar style={{ height: 32, backgroundColor: theme.colors.surface, borderTopWidth: 2, borderBottomWidth: 2, borderColor: theme.colors.text }} progress={(round.points?.pine ?? round.base ?? round.max) / round.max} color="#16341A" /></View>
                <Image source={require('assets/pine.png')} style={{ height: 32, width: 32, borderTopRightRadius: 4, borderBottomRightRadius: 4, backgroundColor: "#16341A", borderWidth: 2, borderColor: theme.colors.text, zIndex: 2, marginHorizontal: 0 }} />
              </View>
              <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 16, fontWeight: "bold" }}>{round.points?.pine ?? round.base ?? round.max}<Text style={{ fontSize: 12 }}> / {round.max} HP</Text></Text>
            </View>
          </View>
          <View style={{ paddingTop: 8 }}>
            <Surface>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ width: 400, flexGrow: 1, maxWidth: "100%" }}>
                  <Text style={{ padding: 4, textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Round {round.round_id}</Text>
                  {round.updated_at && <Text style={{ fontWeight: "bold", flex: 1, padding: 4, textAlign: "center", fontSize: 16 }}>Updated: {moment(round.updated_at).format('L LT')}</Text>}
                  <Text style={{ fontWeight: "bold", flex: 1, padding: 4, textAlign: "center", fontSize: 16 }}>Started: {moment(round.start).format('L LT')}</Text>
                  {round.end && <Text style={{ fontWeight: "bold", flex: 1, padding: 4, textAlign: "center", fontSize: 16 }}>Ended: {moment(round.end).format('L LT')}</Text>}
                </View>
              </View>
            </Surface>
          </View>
          {["pear", "pine"].map(team => <View style={{ paddingTop: 8 }}>
            <Surface>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ width: 400, flexGrow: 1, maxWidth: "100%" }}>
                  <Text style={{ padding: 4, textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Team {team.toUpperCase()}</Text>
                  <Text style={{ fontWeight: "bold", flex: 1, padding: 4, textAlign: "center", fontSize: 16 }}>Damage Dealing</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <View style={{ width: 250, flexGrow: 1, maxWidth: "100%" }}>
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>Captures</Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {gameConfig.damaging.filter(i => i.type === "capture").map(type => <View style={{ width: 40, alignItems: "center", paddingHorizontal: 4, opacity: round.stats[team][`${type.icon}_${type.type}`] ? 1 : 0.4 }}>
                          <Image source={getIcon(type.icon)} style={{ height: 32, width: 32 }} />
                          <Text>{round.stats[team][`${type.icon}_${type.type}`] || '-'}</Text>
                        </View>)}
                      </View>
                    </View>
                    <View style={{ width: 80, flexGrow: 1, maxWidth: "100%" }}>
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>Deploys</Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {gameConfig.damaging.filter(i => i.type === "deploy").map(type => <View style={{ width: 40, alignItems: "center", paddingHorizontal: 4, opacity: round.stats[team][`${type.icon}_${type.type}`] ? 1 : 0.4 }}>
                          <Image source={getIcon(type.icon)} style={{ height: 32, width: 32 }} />
                          <Text>{round.stats[team][`${type.icon}_${type.type}`] || '-'}</Text>
                        </View>)}
                      </View>
                    </View>
                  </View>
                  <Text style={{ fontWeight: "bold", flex: 1, padding: 4, textAlign: "center", fontSize: 16 }}>Health Gaining</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <View style={{ width: 250, flexGrow: 1, maxWidth: "100%" }}>
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>Captures</Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {gameConfig.healing.filter(i => i.type === "capture").map(type => <View style={{ width: 40, alignItems: "center", paddingHorizontal: 4, opacity: round.stats[team][`${type.icon}_${type.type}`] ? 1 : 0.4 }}>
                          <Image source={getIcon(type.icon)} style={{ height: 32, width: 32 }} />
                          <Text>{round.stats[team][`${type.icon}_${type.type}`] || '-'}</Text>
                        </View>)}
                      </View>
                    </View>
                    <View style={{ width: 80, flexGrow: 1, maxWidth: "100%" }}>
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>Deploys</Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {gameConfig.healing.filter(i => i.type === "deploy").map(type => <View style={{ width: 40, alignItems: "center", paddingHorizontal: 4, opacity: round.stats[team][`${type.icon}_${type.type}`] ? 1 : 0.4 }}>
                          <Image source={getIcon(type.icon)} style={{ height: 32, width: 32 }} />
                          <Text>{round.stats[team][`${type.icon}_${type.type}`] || '-'}</Text>
                        </View>)}
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </Surface>
          </View>)}
        </View>
      </ScrollView>
    </View>
  );
}