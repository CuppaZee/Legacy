// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { Text, ProgressBar, useTheme, Surface } from 'react-native-paper';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useLevelColours' o... Remove this comment to see the full error message
import useLevelColours from 'utils/hooks/useLevelColours';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon, { g } from 'utils/db/icon';
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
// @ts-expect-error ts-migrate(6142) FIXME: Module './Image' was resolved to 'C:/Users/samst/D... Remove this comment to see the full error message
import CompetitionImage from './Image';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../More/Dropdown' was resolved to 'C:/User... Remove this comment to see the full error message
import { Dropdown, DropdownItem } from '../More/Dropdown';

export default function ClanScreen({
  route
}: any) {
  var moment = useMoment();
  var { t } = useTranslation();
  var theme = useTheme();
  var level_colors = useLevelColours();
  if (theme.dark) {
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'dark'.
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
  const [viewMode, setViewMode] = React.useState("image");
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  const gameConfig = {
    1: gameConfig_1,
    2: gameConfig_2,
    3: gameConfig_3,
    4: gameConfig_3,
    5: gameConfig_3,
    6: gameConfig_3,
    7: gameConfig_7,
    8: gameConfig_8,
  }[round?.round_id] || gameConfig_8;
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
        contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
        style={{ flex: 1 }}>
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
                <View style={{ flex: 1 }}><ProgressBar style={{ transform: [{ scaleX: -1 }], height: 32, backgroundColor: theme.colors.surface, borderTopWidth: 2, borderBottomWidth: 2, borderColor: theme.colors.text }} progress={(round.points?.pear ?? round.base ?? round.max) / round.max} color="#98CA47" /></View>
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 16, fontWeight: "bold" }}>{round.points?.pear ?? round.base ?? round.max}<Text style={{ fontSize: 12 }}> / {round.max} HP</Text></Text>
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
              }}>{round.round_id}</Text>
            </View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ flex: 1 }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text style={{ textAlign: "center", fontSize: 12, lineHeight: 16, fontWeight: "bold" }}>Team PINE</Text>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ flexDirection: "row" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ flex: 1 }}><ProgressBar style={{ height: 32, backgroundColor: theme.colors.surface, borderTopWidth: 2, borderBottomWidth: 2, borderColor: theme.colors.text }} progress={(round.points?.pine ?? round.base ?? round.max) / round.max} color="#16341A" /></View>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Image source={require('assets/pine.png')} style={{ height: 32, width: 32, borderTopRightRadius: 4, borderBottomRightRadius: 4, backgroundColor: "#16341A", borderWidth: 2, borderColor: theme.colors.text, zIndex: 2, marginHorizontal: 0 }} />
              </View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text style={{ textAlign: "center", fontSize: 16, lineHeight: 16, fontWeight: "bold" }}>{round.points?.pine ?? round.base ?? round.max}<Text style={{ fontSize: 12 }}> / {round.max} HP</Text></Text>
            </View>
          </View>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ paddingTop: 8 }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Surface>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ width: 400, flexGrow: 1, maxWidth: "100%" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text style={{ color: theme.page_content.fg, textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Round {round.round_id}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ flexDirection: "row", justifyContent: "center"}}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={{marginRight: 4}}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}>Started</Text>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}>Data Updated</Text>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      {round.end && <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}>Ended</Text>}
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}>Timeout</Text>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}>Base Health</Text>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text numberOfLines={1} style={{ fontSize: 16, fontWeight: "bold", textAlign: "right" }}>Max Health</Text>
                    </View>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={{marginRight: 4}}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text numberOfLines={1} style={{ fontSize: 16, textAlign: "left" }}>{moment(round.start).format('L LT')}</Text>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text numberOfLines={1} style={{ fontSize: 16, textAlign: "left" }}>{moment(round.updated_at).format('L LT')}</Text>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      {round.end && <Text numberOfLines={1} style={{ fontSize: 16, textAlign: "left" }}>{moment(round.end).format('L LT')}</Text>}
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text numberOfLines={1} style={{ fontSize: 16, textAlign: "left" }}>{moment(round.start + round.max_length).format('L LT')}</Text>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text numberOfLines={1} style={{ fontSize: 16, textAlign: "left" }}>{round.base} HP</Text>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text numberOfLines={1} style={{ fontSize: 16, textAlign: "left" }}>{round.max} HP</Text>
                    </View>
                  </View>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
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
            </Surface>
          </View>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {["pear", "pine"].map(team => <View style={{ paddingTop: 8 }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Surface>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ width: 400, flexGrow: 1, maxWidth: "100%" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  {team === "pear" && <View style={{ padding: 4 }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Dropdown dense={true} mode="outlined" selectedValue={viewMode} onValueChange={setViewMode}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <DropdownItem label="View: Images" value="image" />
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <DropdownItem label="View: List" value="list" />
                    </Dropdown>
                  </View>}
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text style={{ color: theme.page_content.fg, padding: 4, textAlign: "center", fontSize: 20, fontWeight: "bold" }}>Team {team.toUpperCase()}</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text style={{ color: theme.page_content.fg, fontWeight: "bold", flex: 1, padding: 4, textAlign: "center", fontSize: 16 }}>Damage Dealing</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={{ width: viewMode === "list" ? "100%" : 250, flexGrow: 1, maxWidth: "100%" }}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text style={{ color: theme.page_content.fg, fontWeight: "bold", textAlign: "center" }}>Captures</Text>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <View style={viewMode === "list" ? {alignItems: "center"} : { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        {gameConfig.damaging.filter((i: any) => i.type === "capture").map((type: any) => <CompetitionImage viewMode={viewMode} type={type} count={round.stats[team][`${g(type.icon)}_${type.type}`] || 0} />)}
                      </View>
                    </View>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={{ width: viewMode === "list" ? "100%" : 80, flexGrow: 1, maxWidth: "100%" }}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text style={{ color: theme.page_content.fg, fontWeight: "bold", textAlign: "center" }}>Deploys</Text>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <View style={viewMode === "list" ? {alignItems: "center"} : { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        {gameConfig.damaging.filter((i: any) => i.type === "deploy").map((type: any) => <CompetitionImage viewMode={viewMode} type={type} count={round.stats[team][`${g(type.icon)}_${type.type}`] || 0} />)}
                      </View>
                    </View>
                  </View>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text style={{ fontWeight: "bold", flex: 1, padding: 4, textAlign: "center", fontSize: 16 }}>Health Gaining</Text>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={{ width: viewMode === "list" ? "100%" : 250, flexGrow: 1, maxWidth: "100%" }}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text style={{ color: theme.page_content.fg, fontWeight: "bold", textAlign: "center" }}>Captures</Text>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <View style={viewMode === "list" ? {alignItems: "center"} : { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        {gameConfig.healing.filter((i: any) => i.type === "capture").map((type: any) => <CompetitionImage viewMode={viewMode} type={type} count={round.stats[team][`${g(type.icon)}_${type.type}`] || 0} />)}
                      </View>
                    </View>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={{ width: viewMode === "list" ? "100%" : 80, flexGrow: 1, maxWidth: "100%" }}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text style={{ color: theme.page_content.fg, fontWeight: "bold", textAlign: "center" }}>Deploys</Text>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <View style={viewMode === "list" ? {alignItems: "center"} : { flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
                        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                        {gameConfig.healing.filter((i: any) => i.type === "deploy").map((type: any) => <CompetitionImage viewMode={viewMode} type={type} count={round.stats[team][`${g(type.icon)}_${type.type}`] || 0} />)}
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