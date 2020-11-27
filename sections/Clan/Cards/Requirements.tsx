// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, Image, ScrollView, ActivityIndicator, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableRipple, Menu } from 'react-native-paper';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
import { ClanRequirementsConverter, dateFromGameID } from '../Data';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useLevelColours' o... Remove this comment to see the full error message
import useLevelColours from 'utils/hooks/useLevelColours';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module 'utils/db/types.json'. Consider... Remove this comment to see the full error message
import types from 'utils/db/types.json';

function ClanCountdown({
  time
}: any) {
  const moment = useMoment();
  const [now,setNow] = React.useState(moment());
  React.useEffect(()=>{
    const interval = setInterval(()=>{
      setNow(moment())
    },500)
    return ()=>clearInterval(interval);
  })
  const dur = moment.duration(moment(time).diff(now))
  const theme = useSelector((i: any) => i.themes[i.theme])
  if(dur.valueOf() < 0) {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <View>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{flexDirection:"row",justifyContent:"center",flexWrap:"wrap",padding:4}}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{padding:4}}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{backgroundColor:theme.page.bg,height:64,width:64,borderRadius:8,justifyContent:"center",alignItems:"center"}}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font("bold"), fontSize: 24 }}>0</Text>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font(), fontSize: 12 }}>Days</Text>
          </View>
        </View>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{padding:4}}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{backgroundColor:theme.page.bg,height:64,width:64,borderRadius:8,justifyContent:"center",alignItems:"center"}}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font("bold"), fontSize: 24 }}>0</Text>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font(), fontSize: 12 }}>Hours</Text>
          </View>
        </View>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{padding:4}}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{backgroundColor:theme.page.bg,height:64,width:64,borderRadius:8,justifyContent:"center",alignItems:"center"}}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font("bold"), fontSize: 24 }}>0</Text>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font(), fontSize: 12 }}>Minutes</Text>
          </View>
        </View>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{padding:4}}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{backgroundColor:theme.page.bg,height:64,width:64,borderRadius:8,justifyContent:"center",alignItems:"center"}}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font("bold"), fontSize: 24 }}>0</Text>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font(), fontSize: 12 }}>Seconds</Text>
          </View>
        </View>
      </View>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, textAlign: "center", padding: 4 }}>Clan Requirements are now out! Press the Refresh icon in the header to view them!</Text>
    </View>
  }
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <View style={{flexDirection:"row",justifyContent:"center",flexWrap:"wrap",padding:4}}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <View style={{padding:4}}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{backgroundColor:theme.page.bg,height:64,width:64,borderRadius:8,justifyContent:"center",alignItems:"center"}}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font("bold"), fontSize: 24 }}>{dur.days()}</Text>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font(), fontSize: 12 }}>Days</Text>
      </View>
    </View>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <View style={{padding:4}}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{backgroundColor:theme.page.bg,height:64,width:64,borderRadius:8,justifyContent:"center",alignItems:"center"}}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font("bold"), fontSize: 24 }}>{dur.hours()}</Text>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font(), fontSize: 12 }}>Hours</Text>
      </View>
    </View>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <View style={{padding:4}}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{backgroundColor:theme.page.bg,height:64,width:64,borderRadius:8,justifyContent:"center",alignItems:"center"}}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font("bold"), fontSize: 24 }}>{dur.minutes()}</Text>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font(), fontSize: 12 }}>Minutes</Text>
      </View>
    </View>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <View style={{padding:4}}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{backgroundColor:theme.page.bg,height:64,width:64,borderRadius:8,justifyContent:"center",alignItems:"center"}}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font("bold"), fontSize: 24 }}>{dur.seconds()}</Text>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text allowFontScaling={false} numberOfLines={1} style={{ color: theme.page.fg, ...font(), fontSize: 12 }}>Seconds</Text>
      </View>
    </View>
  </View>
}

function ClanRequirement({
  i,
  data,
  level_colors,
  s,
  t: ty,
  index
}: any) {
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var [open, setOpen] = React.useState(false);
  var { t } = useTranslation();
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Menu
      visible={open}
      onDismiss={() => setOpen(false)}
      anchor={
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <TouchableRipple onPress={() => setOpen(true)}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ ...((ty==="gro"&&index==0)?{borderLeftWidth:2*s,borderLeftColor:level_colors.border}:{}), height: (96 - 19) * s, borderBottomWidth: 2 * s, borderBottomColor: level_colors.border, padding: 4 * s, alignItems: "center",marginHorizontal:-1*s }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Image source={getIcon(data?.requirements?.[i]?.icon ?? data?.requirements?.[i]?.icons?.[tick % data?.requirements?.[i]?.icons?.length])} style={{ height: 36 * s, width: 36 * s }} />
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} numberOfLines={1} style={{ color: level_colors[ty].fg, textAlign: "center", ...font("bold"), fontSize: 12 * s }}>{t('clan_req:' + data?.requirements?.[i]?.top)}</Text>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} numberOfLines={1} style={{ color: level_colors[ty].fg, textAlign: "center", ...font(), fontSize: 12 * s }}>{t('clan_req:' + data?.requirements?.[i]?.bottom)}</Text>
          </View>
        </TouchableRipple>
      }
      style={{ marginTop: (96 - 19) * s }}
      contentStyle={{ backgroundColor: theme.page_content.bg, borderWidth: theme.page_content.border ? 1 : 0, borderColor: theme.page_content.border }}
    >
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>{data?.requirements?.[i]?.meta?.activity.map((y: any) => ((data?.requirements?.[i]?.meta?.points || data?.requirements?.[i]?.meta?.days) ? {
          capture: 'Capture',
          deploy: 'Deploy',
          capon: 'Cap-on'
        } : {
            capture: 'Captures',
            deploy: 'Deploys',
            capon: 'Cap-ons'
          })[y]).join('/')}{data?.requirements?.[i]?.meta?.points && " Points"}{data?.requirements?.[i]?.meta?.days && " Days"}</Text>
        {(!data?.requirements?.[i]?.meta?.types && !data?.requirements?.[i]?.meta?.exclude) ?
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16 }}>of All Types</Text> :
          (
            data?.requirements?.[i]?.meta?.types ?
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16 }}>of these types:</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ flexDirection: "row", flexWrap: "wrap", maxWidth: 300 }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  {types.filter(data?.requirements?.[i]?.meta?.types).filter((i: any) => !(data?.requirements?.[i]?.meta?.exclude || (() => false))(i)).slice(0, 15).map((i: any) => <View style={{ padding: 4 }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Image source={getIcon(i.icon)} style={{ height: 24 * s, width: 24 * s }} />
                  </View>)}
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  {types.filter(data?.requirements?.[i]?.meta?.types).filter((i: any) => !(data?.requirements?.[i]?.meta?.exclude || (() => false))(i)).length > 15 && <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 12 }}>and more</Text>}
                </View>
              </> :
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              <>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16 }}>of All except these types:</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ flexDirection: "row", flexWrap: "wrap", maxWidth: 300 }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  {types.filter(data?.requirements?.[i]?.meta?.exclude).slice(0, 15).map((i: any) => <View style={{ padding: 4 }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Image source={getIcon(i.icon)} style={{ height: 24 * s, width: 24 * s }} />
                  </View>)}
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  {types.filter(data?.requirements?.[i]?.meta?.exclude).length > 15 && <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 12 }}>and more</Text>}
                </View>
              </>
          )}
      </View>
    </Menu>
  );
}

export default function ClanRequirementsCard({
  game_id,
  scale: s = 1,
  list
}: any) {
  var moment = useMoment();
  var { t } = useTranslation();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var [reward, setReward] = React.useState(false);
  var level_colors = useLevelColours();
  var unformatted_requirements = useAPIRequest({
    endpoint: 'clan/v2/requirements',
    data: { clan_id: 1349, game_id }
  })
  var unformatted_rewards = useAPIRequest({
    endpoint: 'clan/rewards/v1',
    data: {
      game_id
    },
    cuppazee: true
  })
  var data = ClanRequirementsConverter(unformatted_requirements, unformatted_rewards);
  if (!unformatted_requirements?.battle) {
    if (!unformatted_requirements) {
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Card>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <ActivityIndicator size="large" color={theme.page_content.fg} />
          </View>
        </Card>
      )
    } else {
      return (
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <Card cardStyle={{ backgroundColor: theme.error.bg }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} style={{ color: theme.error.fg }}>An Error Occurred</Text>
          </View>
        </Card>
      );
    }
  }
  if (list) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'.
    if(unformatted_requirements && data?.levels?.length === 0) return null;
    return (
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      <Card noPad>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ ...(theme.dark ? { borderBottomWidth: 2 * s, borderBottomColor: level_colors.border } : {}), backgroundColor: (theme.clanCardHeader || theme.navigation).bg, paddingHorizontal: 8 * s, borderTopLeftRadius: 8 * s, borderTopRightRadius: 8 * s, flexDirection: "row", alignItems: "center" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ flex: 1, paddingVertical: 8 * s }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} style={{ color: (theme.clanCardHeader || theme.navigation).fg, ...font("bold"), fontSize: 12 * s, opacity: 0.7, lineHeight: 12 * s }}>{moment(dateFromGameID(game_id)).format('MMMM YYYY')}</Text>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} style={{ color: (theme.clanCardHeader || theme.navigation).fg, ...font("bold"), fontSize: 16 * s, lineHeight: 16 * s }}>{reward ? t('clan:rewards') : t('clan:requirements')}</Text>
          </View>
        </View>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ padding: 4 }}>
          {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'. */}
          {data.levels.map((i: any) => <View style={{ paddingBottom: 16 }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 24 * s }}>{t('clan:level_n', { level: i.level })}</Text>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 20 * s }}>{t('clan:individual')}</Text>
            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'. */}
            {(data?.order?.individual ?? []).filter((r: any) => i.individual[r]).map((r: any) => <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Image style={{ height: 24, width: 24, marginRight: 4 }} source={getIcon(data.requirements[r].icon)} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 16 * s }}><Text style={font("bold")}>{i.individual[r].toLocaleString()}</Text> {t('clan_req:' + data?.requirements?.[r]?.top)} {t('clan_req:' + data?.requirements?.[r]?.bottom)}</Text>
            </View>)}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 20 * s, marginTop: 4 }}>{t('clan:group')}</Text>
            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'. */}
            {(data?.order?.group ?? []).filter((r: any) => i.group[r]).map((r: any) => <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Image style={{ height: 24, width: 24, marginRight: 4 }} source={getIcon(data.requirements[r].icon)} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 16 * s }}><Text style={font("bold")}>{i.group[r].toLocaleString()}</Text> {t('clan_req:' + data?.requirements?.[r]?.top)} {t('clan_req:' + data?.requirements?.[r]?.bottom)}</Text>
            </View>)}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 20 * s, marginTop: 4 }}>{t('clan:rewards')}</Text>
            {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'. */}
            {(data?.order?.rewards ?? []).filter((r: any) => i.rewards[r]).map((r: any) => <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Image style={{ height: 24, width: 24, marginRight: 4 }} source={getIcon(data.rewards[r].logo)} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 16 * s }}><Text style={font("bold")}>{i.rewards[r].toLocaleString()}x</Text> {data.rewards[r].name}</Text>
            </View>)}
          </View>)}
        </View>
      </Card>
    );
  }
  return (
    // </View>
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Card noPad>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ ...(theme.dark ? { borderBottomWidth: 2 * s, borderBottomColor: level_colors.border } : {}), backgroundColor: (theme.clanCardHeader || theme.navigation).bg, paddingHorizontal: 8 * s, borderTopLeftRadius: 8 * s, borderTopRightRadius: 8 * s, flexDirection: "row", alignItems: "center" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ flex: 1, paddingVertical: 8 * s }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Text allowFontScaling={false} style={{ color: (theme.clanCardHeader || theme.navigation).fg, ...font("bold"), fontSize: 12 * s, opacity: 0.7, lineHeight: 12 * s }}>{moment(dateFromGameID(game_id)).format('MMMM YYYY')}</Text>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Text allowFontScaling={false} style={{ color: (theme.clanCardHeader || theme.navigation).fg, ...font("bold"), fontSize: 16 * s, lineHeight: 16 * s }}>{reward ? t('clan:rewards') : t('clan:requirements')}</Text>
        </View>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <TouchableRipple style={{ borderRadius: 24 * s, padding: 4 * s }} onPress={() => { setReward(!reward) }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <MaterialCommunityIcons name="gift" size={24 * s} color={(theme.clanCardHeader || theme.navigation).fg} />
        </TouchableRipple>
      </View>
      {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'. */}
      {data?.levels?.length > 0 && <View style={{ flexDirection: "row" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ScrollView horizontal={true} style={{ flex: 1 }} contentContainerStyle={{ flexDirection: "row", minWidth: '100%', paddingLeft: 55 * s }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {!reward && <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ flexDirection: "column", flexGrow: 1, alignItems: "stretch", backgroundColor: level_colors.ind.bg }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ height: 24 * s, padding: 4 * s }}><Text allowFontScaling={false} style={{ textAlign: "center", ...font("bold"), fontSize: 12 * s, color: level_colors.ind.fg }}>{t('clan:individual')}</Text></View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ flexDirection: "row" }}>
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'. */}
                {(data?.order?.individual ?? []).map((i: any, index: any) => <View key={`Individual${i}`} style={{ flexGrow: 1 }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <ClanRequirement i={i} data={data} level_colors={level_colors} s={s} t="ind" index={index} />
                  {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'. */}
                  {data?.levels?.map((l: any) => <View key={l.id} style={{ marginHorizontal: -1, height: 24 * s, padding: 4 * s, alignItems: "center", backgroundColor: level_colors[l.id].bg }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text allowFontScaling={false} style={{ textAlign: "center", width: '100%', fontSize: 12 * s, color: level_colors[l.id].fg, ...font() }}>{l.individual?.[i]?.toLocaleString()}</Text>
                  </View>)}
                </View>)}
              </View>
            </View>

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ flexDirection: "column", flexGrow: 1, alignItems: "stretch", backgroundColor: level_colors.gro.bg }}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ borderLeftWidth: 2 * s, borderLeftColor: level_colors.border, marginHorizontal: -1 * s, height: 24 * s, padding: 4 * s }}><Text allowFontScaling={false} style={{ textAlign: "center", ...font("bold"), fontSize: 12 * s, color: level_colors.gro.fg }}>{t('clan:group')}</Text></View>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ flexDirection: "row", marginRight: 1 }}>
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'. */}
                {data?.order?.group?.map((i: any, index: any) => <View style={{ flexGrow: 1 }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <ClanRequirement i={i} data={data} level_colors={level_colors} s={s} t="gro" index={index} />
                  {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'. */}
                  {data?.levels?.map((l: any) => <View style={{ ...(index == 0 ? { borderLeftWidth: 2 * s, borderLeftColor: level_colors.border } : {}), marginHorizontal: -1 * s, height: 24 * s, padding: 4 * s, alignItems: "center", backgroundColor: level_colors[l.id].bg }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Text allowFontScaling={false} style={{ color: level_colors[l.id].fg, textAlign: "center", width: '100%', ...font(), fontSize: 12 * s }}>{l.group?.[i]}</Text>
                  </View>)}
                </View>)}
              </View>
            </View>
          </>}

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {reward && <View style={{ flexDirection: "column", flexGrow: 1, alignItems: "stretch", backgroundColor: level_colors.ind.bg }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ height: 24 * s, padding: 4 * s }}><Text allowFontScaling={false} style={{ textAlign: "center", ...font("bold"), fontSize: 12 * s, color: level_colors.ind.fg }}>{t('clan:rewards')}</Text></View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <View style={{ flexDirection: "row", marginRight: 1 }}>
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'. */}
              {(data?.order?.rewards ?? []).map((i: any) => <View key={`Reward${i}`} style={{ flexGrow: 1 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ height: 60, borderBottomWidth: 2, borderBottomColor: level_colors.border, padding: 4, alignItems: "center" }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Image source={getIcon(data?.rewards?.[i]?.logo)} style={{ height: 36 * s, width: 36 * s }} />
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} numberOfLines={1} style={{ textAlign: "center", ...font("bold"), fontSize: 10 * s, color: level_colors.ind.fg }}>{data?.rewards?.[i]?.short_name ?? data?.rewards?.[i]?.name.replace(/Virtual /, 'V').replace(/Physical /, 'P').replace(/Flat /, '').replace(/ Mystery/, '').replace(/THE /, '').replace(/ Wheel/, 'W').replace(/Hammock/, 'Hamm')}</Text>
                </View>
                {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'. */}
                {data?.levels?.map((l: any) => <View key={l.id} style={{ marginHorizontal: -1 * s, height: 24 * s, padding: 4 * s, alignItems: "center", backgroundColor: level_colors[l.id].bg }}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <Text allowFontScaling={false} style={{ textAlign: "center", width: '100%', fontSize: 12 * s, color: level_colors[l.id].fg, ...font() }}>{l.rewards?.[i]?.toLocaleString()}</Text>
                </View>)}
              </View>)}
            </View>
          </View>}
        </ScrollView>


        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ width: 56 * s, position: "absolute", left: 0, top: 0, borderRightWidth: 2 * s, borderRightColor: level_colors.border }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <TouchableWithoutFeedback onPress={()=>console.log(JSON.stringify(data?.order?.requirements))}><View style={{ height: 24 * s, backgroundColor: level_colors.null.bg, padding: 4 * s }}><Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12 * s, color: level_colors.null.fg }}>{moment(dateFromGameID(game_id)).format('MMM YY')}</Text></View></TouchableWithoutFeedback>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ height: (reward ? 60 : 77) * s, backgroundColor: level_colors.null.bg, flexDirection: "row", alignItems: "center", padding: 4 * s, borderBottomWidth: 2 * s, borderBottomColor: level_colors.border }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="head" style={{ fontSize: 12 * s, color: level_colors.null.fg, ...font() }}>{t('clan:level', { count: data?.levels?.length })}</Text>
          </View>
          {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'. */}
          {(data?.levels ?? []).map((i: any) => <View style={{ backgroundColor: level_colors[i.id].bg, padding: 4 * s, height: 24 * s }} key={i.name}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Text allowFontScaling={false} style={{ fontSize: 12 * s, color: level_colors[i.id].fg, ...font() }}>{t('clan:level_n', { level: i.level })}</Text>
          </View>)}
        </View>
      </View>}
      {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'. */}
      {unformatted_requirements && data?.levels?.length === 0 && <ClanCountdown time={data?.battle?.reveal_at} />}
    </Card>
  );
}