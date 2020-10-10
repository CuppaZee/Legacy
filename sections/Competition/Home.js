import * as React from 'react';
import { View, Image, ScrollView, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, ProgressBar, useTheme, Surface } from 'react-native-paper';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';
import { useNavigation } from '@react-navigation/native';
import useMoment from 'utils/hooks/useMoment';
import gameConfig from './gameconfig.json';

export default function ClanScreen() {
  var moment = useMoment();
  var { t } = useTranslation();
  var theme = useTheme();
  var nav = useNavigation();
  var { data, status } = useAPIRequest({
    endpoint: 'competition/rounds/v2',
    cuppazee: true
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
        contentContainerStyle={{ flexGrow: 1, width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
        style={{ flex: 1 }}>
        {data.rounds.length === 0 ? <View style={{ paddingVertical: 16, alignItems: "center" }}>
          <MaterialCommunityIcons name="clock" size={48} color={theme.colors.text} />
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Starting Soon</Text>
          <Text style={{ fontSize: 16 }}>Whilst you are waiting... make sure to opt-in!</Text>
        </View> : <View>
            {data.rounds.slice().reverse().map((round, index) => <TouchableWithoutFeedback onPress={() => nav.navigate('CompetitionRoundStats', { round: round.id })}>
              <View style={{ padding: 4, paddingBottom: 16 }}>
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: "center", fontSize: 12, lineHeight: 16, fontWeight: "bold" }}>Team PEAR</Text>
                    <View style={{ flexDirection: "row" }}>
                      <Image source={require('assets/pear.png')} style={{ height: 32, width: 32, borderTopLeftRadius: 4, borderBottomLeftRadius: 4, backgroundColor: "#98CA47", borderWidth: 2, borderColor: theme.colors.text, zIndex: 2, marginHorizontal: 0 }} />
                      <View style={{ flex: 1 }}><ProgressBar style={{ transform: [{ scaleX: -1 }], height: 32, backgroundColor: theme.colors.surface, borderTopWidth: 2, borderBottomWidth: 2, borderColor: theme.colors.text }} progress={round.pear / round.max} color="#98CA47" /></View>
                    </View>
                    <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 16, fontWeight: "bold" }}>{round.pear}<Text style={{ fontSize: 12 }}> / {round.max} HP</Text></Text>
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
                    }}>{round.id}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={{ textAlign: "center", fontSize: 12, lineHeight: 16, fontWeight: "bold" }}>Team PINE</Text>
                    <View style={{ flexDirection: "row" }}>
                      <View style={{ flex: 1 }}><ProgressBar style={{ height: 32, backgroundColor: theme.colors.surface, borderTopWidth: 2, borderBottomWidth: 2, borderColor: theme.colors.text }} progress={round.pine / round.max} color="#16341A" /></View>
                      <Image source={require('assets/pine.png')} style={{ height: 32, width: 32, borderTopRightRadius: 4, borderBottomRightRadius: 4, backgroundColor: "#16341A", borderWidth: 2, borderColor: theme.colors.text, zIndex: 2, marginHorizontal: 0 }} />
                    </View>
                    <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 16, fontWeight: "bold" }}>{round.pine}<Text style={{ fontSize: 12 }}> / {round.max} HP</Text></Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>)}
            <View style={{ padding: 4 }}>
              <Surface>
                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 4 }}>
                  <MaterialCommunityIcons name="information" size={24} style={{ marginVertical: 4 }} color={theme.colors.text} />
                  <View style={{ padding: 4, flex: 1 }}>
                    <Text>Tap on a round for full information and stats</Text>
                  </View>
                </View>
              </Surface>
            </View>
          </View>}
        <View style={{ padding: 4 }}><Button mode="contained" onPress={() => nav.navigate('CompetitionOptIn')}>Opt-in to Competition</Button></View>
        {data.rounds.length > 0 && <>
          <View style={{ padding: 4 }}>
            <Surface>
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                <View style={{ width: 400, flexGrow: 1, maxWidth: "100%" }}>
                  <Text style={{ fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Dealing Damage</Text>
                  <Text style={{ padding: 4, textAlign: "center", fontSize: 16 }}>Capture / Deploy these types to deal damage to the opposing team!</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <View style={{ width: 250, flexGrow: 1, maxWidth: "100%" }}>
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>Captures</Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {gameConfig.damaging.filter(i => i.type === "capture").map(type => <View style={{ width: 40, alignItems: "center", paddingHorizontal: 4 }}>
                          <Image source={getIcon(type.icon)} style={{ height: 32, width: 32 }} />
                          <Text>{-type.damage}</Text>
                        </View>)}
                      </View>
                    </View>
                    <View style={{ width: 80, flexGrow: 1, maxWidth: "100%" }}>
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>Deploys</Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {gameConfig.damaging.filter(i => i.type === "deploy").map(type => <View style={{ width: 40, alignItems: "center", paddingHorizontal: 4 }}>
                          <Image source={getIcon(type.icon)} style={{ height: 32, width: 32 }} />
                          <Text>{-type.damage}</Text>
                        </View>)}
                      </View>
                    </View>
                  </View>
                  <Text style={{ fontWeight: "bold", flex: 1, padding: 4, textAlign: "center", fontSize: 20 }}>Regenerating Health</Text>
                  <Text style={{ padding: 4, textAlign: "center", fontSize: 16 }}>Capture / Deploy these types to regenerate your team's health!</Text>
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    <View style={{ width: 250, flexGrow: 1, maxWidth: "100%" }}>
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>Captures</Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {gameConfig.healing.filter(i => i.type === "capture").map(type => <View style={{ width: 40, alignItems: "center", paddingHorizontal: 4 }}>
                          <Image source={getIcon(type.icon)} style={{ height: 32, width: 32 }} />
                          <Text>{type.health}</Text>
                        </View>)}
                      </View>
                    </View>
                    <View style={{ width: 80, flexGrow: 1, maxWidth: "100%" }}>
                      <Text style={{ fontWeight: "bold", textAlign: "center" }}>Deploys</Text>
                      <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {gameConfig.healing.filter(i => i.type === "deploy").map(type => <View style={{ width: 40, alignItems: "center", paddingHorizontal: 4 }}>
                          <Image source={getIcon(type.icon)} style={{ height: 32, width: 32 }} />
                          <Text>{type.health}</Text>
                        </View>)}
                      </View>
                    </View>
                  </View>
                  <Text style={{ padding: 4, textAlign: "center", fontStyle: "italic", fontSize: 16 }}>We may change these values between rounds in order to improve gameplay.</Text>
                </View>
              </View>
            </Surface>
          </View>
          <View style={{ padding: 4 }}>
            <Surface>
              <View>
                <Text style={{ fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Aim of the Game</Text>
                <Text style={{ padding: 4, textAlign: "center", fontSize: 16 }}>
                  The primary objective of the Zeecret Agents Competition is to defeat the opposing team in as many rounds as possible. The team with the most rounds won at the end of the game will win.
                </Text>
                <Text style={{ fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Winning a Round</Text>
                <Text style={{ padding: 4, textAlign: "center", fontSize: 16 }}>
                  To win a round, you must damage the opposing team until their health is down to 0 HP. The first to be knocked out in a round loses.
                </Text>
                <Text style={{ fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Damaging your Opponent</Text>
                <Text style={{ padding: 4, textAlign: "center", fontSize: 16 }}>
                  To damage your opponent, you can capture or deploy any of the types listed above under the "Dealing Damage" section.
                </Text>
                <Text style={{ fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Healing your Team</Text>
                <Text style={{ padding: 4, textAlign: "center", fontSize: 16 }}>
                  To regenerate your team's health, you can capture or deploy any of the types mentioned above under the "Regenerating Health" section.
                </Text>
                <Text style={{ fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Round Endings</Text>
                <Text style={{ padding: 4, textAlign: "center", fontSize: 16 }}>
                  A round will end as soon as one team's health reaches 0 HP or after 5 days. If 5 days pass, the team with the highest remaining health will be given the win.
                </Text>
                <Text style={{ fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Competition Ending</Text>
                <Text style={{ padding: 4, textAlign: "center", fontSize: 16 }}>
                  After the competition ending time ({moment('2020-11-08T23:59:59-06:00').format('L LT')}), the final round will continue until it ends, as normal. If the final round ends and both teams have won the same amount of rounds, there will be a final rapid decider round, with a low starting HP.
                </Text>
                <Text style={{ fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Health</Text>
                <Text style={{ padding: 4, textAlign: "center", fontSize: 16 }}>
                  The Starting Health and Maximum Health may change between rounds. For the first round, the Starting Health will be 1000 and the Maximum Health will be 2500, however future rounds may have different Starting and Maximum Health values.
                </Text>
              </View>
            </Surface>
          </View>
        </>}
      </ScrollView>
    </View>
  );
}