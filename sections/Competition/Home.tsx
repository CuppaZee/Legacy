// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { View, Image, ScrollView, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { Text, Button, ProgressBar, useTheme, Surface } from 'react-native-paper';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
import { useNavigation } from '@react-navigation/native';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './gameconfig.json'. Consider u... Remove this comment to see the full error message
import gameConfig_1 from './gameconfig.json';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './gameconfig_2.json'. Consider... Remove this comment to see the full error message
import gameConfig_2 from './gameconfig_2.json';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './gameconfig_3.json'. Consider... Remove this comment to see the full error message
import gameConfig_3 from './gameconfig_3.json';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './gameconfig_7.json'. Consider... Remove this comment to see the full error message
import gameConfig_7 from './gameconfig_7.json';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module './gameconfig_8.json'. Consider... Remove this comment to see the full error message
import gameConfig_8 from './gameconfig_8.json';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Countdown' was resolved to 'C:/Users/sam... Remove this comment to see the full error message
import Countdown from './Countdown';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../More/Dropdown' was resolved to 'C:/User... Remove this comment to see the full error message
import { Dropdown, DropdownItem } from '../More/Dropdown';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Image' was resolved to 'C:/Users/samst/D... Remove this comment to see the full error message
import CompetitionImage from './Image';

const gameConfigs = [
  {
    gameConfig: gameConfig_1,
    name: "Round 1",
    id: "r1"
  },
  {
    gameConfig: gameConfig_2,
    name: "Round 2",
    id: "r2"
  },
  {
    gameConfig: gameConfig_3,
    name: "Round 3-6",
    id: "r3"
  },
  {
    gameConfig: gameConfig_7,
    name: "Round 7",
    id: "r7"
  },
  {
    gameConfig: gameConfig_8,
    name: "Round 8+",
    id: "r8"
  }
]

export default function ClanScreen() {
  var moment = useMoment();
  var { t } = useTranslation();
  var theme = useTheme();
  var nav = useNavigation();
  var { data, status } = useAPIRequest({
    endpoint: 'competition/rounds/v2',
    cuppazee: true
  }, true);
  const [selectedConfig, setSelectedConfig] = React.useState(null);
  const [viewMode, setViewMode] = React.useState("image");
  React.useEffect(()=>{
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    if(data?.rounds.length) setSelectedConfig({
      1: "r1",
      2: "r2",
      3: "r3",
      4: "r3",
      5: "r3",
      6: "r3",
      7: "r7",
      8: "r8",
      9: "r8"
    }[data?.rounds.length] || "r8");
  },[data?.rounds.length])
  const gameConfig = gameConfigs.find(i=>i.id===selectedConfig)?.gameConfig;
  if (status) {
    if (status === "loading") {
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ActivityIndicator size="large" color={theme.colors.text} />
      </View>
    } else {
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <MaterialCommunityIcons name="alert" color={theme.colors.text} size={48} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Subheading>{t('error:' + status)}</Subheading>
      </View>
    }
  }
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ScrollView
        contentContainerStyle={{ flexGrow: 1, width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
        style={{ flex: 1 }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {data.rounds.length === 0 ? <View style={{ paddingVertical: 16, alignItems: "center" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <MaterialCommunityIcons name="clock" size={48} color={theme.colors.text} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Text style={{ fontSize: 20, fontWeight: "bold" }}>Starting Soon</Text>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Text style={{ fontSize: 16 }}>Whilst you are waiting... make sure to opt-in!</Text>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        </View> : <View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {data.rounds.slice().reverse().map((round: any, index: any) => <TouchableWithoutFeedback onPress={() => nav.navigate('CompetitionRoundStats', { round: round.id })}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ padding: 4, paddingBottom: 16 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ flexDirection: "row", alignItems: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ flex: 1 }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text style={{ textAlign: "center", fontSize: 12, lineHeight: 16, fontWeight: "bold" }}>Team PEAR</Text>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={{ flexDirection: "row" }}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Image source={require('assets/pear.png')} style={{ height: 32, width: 32, borderTopLeftRadius: 4, borderBottomLeftRadius: 4, backgroundColor: "#98CA47", borderWidth: 2, borderColor: theme.colors.text, zIndex: 2, marginHorizontal: 0 }} />
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <View style={{ flex: 1 }}><ProgressBar style={{ transform: [{ scaleX: -1 }], height: 32, backgroundColor: theme.colors.surface, borderTopWidth: 2, borderBottomWidth: 2, borderColor: theme.colors.text }} progress={round.pear / round.max} color="#98CA47" /></View>
                    </View>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 16, fontWeight: "bold" }}>{round.pear}<Text style={{ fontSize: 12 }}> / {round.max} HP</Text></Text>
                  </View>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{
                    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                    height: 64, width: 64, borderRadius: 16, backgroundColor: {
                      pine: "#16341A",
                      pear: "#98CA47"
                    }[round.result] || theme.colors.surface, borderWidth: 2, borderColor: theme.colors.text, zIndex: 2, marginHorizontal: 0, justifyContent: "center", alignItems: "center"
                  }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text style={{
                      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                      color: {
                        pine: "#ffffff",
                        pear: "#000000"
                      }[round.result] || theme.colors.text, fontWeight: "bold", fontSize: 12, lineHeight: 12
                    }}>Round</Text>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text style={{
                      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
                      color: {
                        pine: "#ffffff",
                        pear: "#000000"
                      }[round.result] || theme.colors.text, fontWeight: "bold", fontSize: 32, lineHeight: 32
                    }}>{round.id}</Text>
                  </View>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ flex: 1 }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text style={{ textAlign: "center", fontSize: 12, lineHeight: 16, fontWeight: "bold" }}>Team PINE</Text>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={{ flexDirection: "row" }}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <View style={{ flex: 1 }}><ProgressBar style={{ height: 32, backgroundColor: theme.colors.surface, borderTopWidth: 2, borderBottomWidth: 2, borderColor: theme.colors.text }} progress={round.pine / round.max} color="#16341A" /></View>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Image source={require('assets/pine.png')} style={{ height: 32, width: 32, borderTopRightRadius: 4, borderBottomRightRadius: 4, backgroundColor: "#16341A", borderWidth: 2, borderColor: theme.colors.text, zIndex: 2, marginHorizontal: 0 }} />
                    </View>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 16, fontWeight: "bold" }}>{round.pine}<Text style={{ fontSize: 12 }}> / {round.max} HP</Text></Text>
                  </View>
                </View>
              </View>
            </TouchableWithoutFeedback>)}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ padding: 4 }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Surface>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ flexDirection: "row", alignItems: "center", paddingHorizontal: 4 }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <MaterialCommunityIcons name="information" size={24} style={{ marginVertical: 4 }} color={theme.colors.text} />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ padding: 4, flex: 1 }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text>Tap on a round for full information and stats</Text>
                  </View>
                </View>
              </Surface>
          </View>
        </View>}
        {/* <View style={{ padding: 4 }}><Button mode="contained" onPress={()=>nav.navigate('CompetitionOptIn')}>Opt-in to Competition</Button></View> */}
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {(data.rounds.length > 0 && !!gameConfig) && <>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ padding: 4 }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Card noPad>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {data.rounds.length > 1 && <View style={{ padding: 4 }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Dropdown dense={true} mode="outlined" selectedValue={selectedConfig} onValueChange={setSelectedConfig}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    {gameConfigs.map(i=><DropdownItem label={i.name} value={i.id} />)}
                  </Dropdown>
                </View>}
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ padding: 4 }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Dropdown dense={true} mode="outlined" selectedValue={viewMode} onValueChange={setViewMode}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <DropdownItem label="View: Images" value="image" />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <DropdownItem label="View: List" value="list" />
                  </Dropdown>
                </View>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ color: theme.page_content.fg, fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Dealing Damage</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ color: theme.page_content.fg, padding: 4, textAlign: "center", fontSize: 16 }}>Capture / Deploy these types to deal damage to the opposing team!</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ width: viewMode === "list" ? "100%" : 250, flexGrow: 1, maxWidth: "100%" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text style={{ color: theme.page_content.fg, fontWeight: "bold", textAlign: "center" }}>Captures</Text>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={viewMode === "list" ? {alignItems: "center"} : { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      {gameConfig.damaging.filter((i: any) => i.type === "capture").map((type: any) => <CompetitionImage viewMode={viewMode} type={type} />)}
                    </View>
                  </View>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ width: viewMode === "list" ? "100%" : 80, flexGrow: 1, maxWidth: "100%" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text style={{ color: theme.page_content.fg, fontWeight: "bold", textAlign: "center" }}>Deploys</Text>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={viewMode === "list" ? {alignItems: "center"} : { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      {gameConfig.damaging.filter((i: any) => i.type === "deploy").map((type: any) => <CompetitionImage viewMode={viewMode} type={type} />)}
                    </View>
                  </View>
                </View>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ color: theme.page_content.fg, fontWeight: "bold", flex: 1, padding: 4, textAlign: "center", fontSize: 20 }}>Regenerating Health</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ color: theme.page_content.fg, padding: 4, textAlign: "center", fontSize: 16 }}>Capture / Deploy these types to regenerate your team's health!</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ width: viewMode === "list" ? "100%" : 250, flexGrow: 1, maxWidth: "100%" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text style={{ color: theme.page_content.fg, fontWeight: "bold", textAlign: "center" }}>Captures</Text>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={viewMode === "list" ? {alignItems: "center"} : { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      {gameConfig.healing.filter((i: any) => i.type === "capture").map((type: any) => <CompetitionImage viewMode={viewMode} type={type} />)}
                    </View>
                  </View>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ width: viewMode === "list" ? "100%" : 80, flexGrow: 1, maxWidth: "100%" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text style={{ color: theme.page_content.fg, fontWeight: "bold", textAlign: "center" }}>Deploys</Text>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={viewMode === "list" ? {alignItems: "center"} : { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      {gameConfig.healing.filter((i: any) => i.type === "deploy").map((type: any) => <CompetitionImage viewMode={viewMode} type={type} />)}
                    </View>
                  </View>
                </View>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ color: theme.page_content.fg, padding: 4, textAlign: "center", fontStyle: "italic", fontSize: 16 }}>We may change these values between rounds in order to improve gameplay.</Text>
              </View>
            {/* @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'Card'. */}
            </Card>
          </View>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ padding: 4 }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Surface>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Aim of the Game</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ padding: 4, textAlign: "center", fontSize: 16 }}>
                  The primary objective of the Zeecret Agents Competition is to defeat the opposing team in as many rounds as possible. The team with the most rounds won at the end of the game will win.
                </Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Winning a Round</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ padding: 4, textAlign: "center", fontSize: 16 }}>
                  To win a round, you must damage the opposing team until their health is down to 0 HP. The first to be knocked out in a round loses.
                </Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Damaging your Opponent</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ padding: 4, textAlign: "center", fontSize: 16 }}>
                  To damage your opponent, you can capture or deploy any of the types listed above under the "Dealing Damage" section.
                </Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Healing your Team</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ padding: 4, textAlign: "center", fontSize: 16 }}>
                  To regenerate your team's health, you can capture or deploy any of the types mentioned above under the "Regenerating Health" section.
                </Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ color: theme.page_content.fg, fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Round Endings</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ color: theme.page_content.fg, padding: 4, textAlign: "center", fontSize: 16 }}>
                  A round will end as soon as one team's health reaches 0 HP or when the round times out after a specified period of time. If a round times out, the team with the highest remaining health will be given the win.
                </Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Competition Ending</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ padding: 4, textAlign: "center", fontSize: 16 }}>
                  After the competition ending time ({moment('2020-11-08T23:59:59-06:00').format('L LT')}), the final round will continue until it ends, as normal. If the final round ends and both teams have won the same amount of rounds, there will be a final rapid decider round, with a low starting HP.
                </Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Countdown time="2020-11-08T23:59:59-06:00" />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ color: theme.page_content.fg, fontWeight: "bold", padding: 4, textAlign: "center", fontSize: 20 }}>Health</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ color: theme.page_content.fg, padding: 4, textAlign: "center", fontSize: 16 }}>
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