
import * as React from 'react';

import { Text, View, Image, ScrollView, ActivityIndicator, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableRipple, Menu, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

import { useDispatch, useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/store' or its correspond... Remove this comment to see the full error message
import s from 'utils/store';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ClanRequirementsConverter, ClanStatsConverter } from '../Data';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useLevelColours' o... Remove this comment to see the full error message
import useLevelColours from 'utils/hooks/useLevelColours';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
var { levelSelect: levelSelectX } = s

function MainScrollView({
  scroll,
  children,
  s
}: any) {
  if (scroll) return <ScrollView horizontal={true} style={{ flex: 1 }} contentContainerStyle={{ flexDirection: "row", minWidth: '100%', paddingLeft: 100 * s }}>
    {children}
  </ScrollView>
  return <View style={{ flex: 1, flexDirection: "row", minWidth: '100%', paddingLeft: 100 * s }}>
    {children}
  </View>
}

function SyncButton ({
  group,
  game_id
}: any) {
  const [pressed,setPressed] = React.useState(false);
  const theme = useSelector((i: any) => i.themes[i.theme]);
  const data = useAPIRequest(pressed?{
    cuppazee: true,
    endpoint: "clan/shadow/generate/v2",
    data: {
      game_id,
      group
    }
  }:null);
  if(pressed && !data) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", minHeight: 64 }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  }
  if(pressed) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", minHeight: 64}}>
      <MaterialCommunityIcons name="check-bold" size={32} color={theme.page_content.fg} />
    </View>
  }
  return <View style={{padding: 4}}>
    <Button color={(theme.clan_header||theme.navigation).bg} mode="contained" onPress={()=>setPressed(true)}>
      Sync Shadow Players in {group}
    </Button>
  </View>
}

export default function UserActivityDash({
  game_id,
  clan_id,
  scale: s
}: any) {
  var scroll = false;
  if (s === undefined) {
    scroll = true;
    s = 1;
  }
  var { t } = useTranslation();
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var level_colors = useLevelColours();
  var coloredStyles = React.useMemo(() => StyleSheet.create({
    cell_borderLeft: {
      borderLeftWidth: 2,
      borderLeftColor: level_colors.border
    },
    cell_borderTop: {
      borderTopWidth: 2,
      borderTopColor: level_colors.border
    },
    cell_borderBottom: {
      borderBottomWidth: 2,
      borderBottomColor: level_colors.border
    }
  }),[level_colors.check])

  const logins = useSelector((i: any) => i.logins);
  var [levelTable, setLevelTable] = React.useState(false);
  var nav = useNavigation();
  var dispatch = useDispatch();
  var userBookmarks = useSelector((i: any) => i.userBookmarks.map((i: any) => Number(i.user_id)))
  var ls = useSelector((i: any) => i.clanLevelSelect[clan_id] ?? 4);
  var levelSelect = Number(ls.toString().slice(0, 1));
  var share = !!ls.toString().slice(1, 2);
  var [userLevelSelect, setUserLevelSelect] = React.useState(false);
  var [clanLevelSelect, setClanLevelSelect] = React.useState(false);
  function setLevelSelect(val: any) {
    var x = {};
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    x[clan_id] = val;
    return dispatch(levelSelectX(x));
  }
  var [showGhost, setShowGhost] = React.useState(true);
  const shadow_clans = [
    -1,
    457,
    1349,
    1441,
    1870,
    1902,
    2042,
    1064,
    2049
  ]
  var [unformatted_clan, unformatted_stats, unformatted_shadow] = useAPIRequest([
    Number(clan_id) >= 0 ? {
      endpoint: 'clan/v2',
      data: { clan_id }
    } : null,
    Number(clan_id) >= 0 ? {
      endpoint: 'clan/v2/requirements',
      data: { clan_id, game_id }
    } : {
        endpoint: 'clan/v2/requirements',
        data: { clan_id: 1349, game_id }
      },
    shadow_clans.includes(Number(clan_id)) ? {
      endpoint: `clan/shadow/v1`,
      data: { clan_id, game_id },
      cuppazee: true
    } : null
  ])
  // @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1.
  var data = ClanRequirementsConverter(unformatted_stats);
  var clan_data = ClanStatsConverter(Number(clan_id) < 0 ? { shadow: true } : unformatted_clan, unformatted_stats, showGhost ? unformatted_shadow : {}, game_id);
  var clan = clan_data;

  const users = useAPIRequest(clan?.members?.filter(i=>i.no).map(i=>({
    endpoint: `user`,
    data: { user_id: i.user_id }
  })) || [], false, true);

  var members = clan?.members ?? [];
  var [ascending, setAscending] = React.useState(false);
  var [sortReq, setSortReq] = React.useState(3);
  members.sort((a, b) => {
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    return (clan?.requirements?.[sortReq]?.users?.[(ascending ? a : b).user_id] || 0) - (clan?.requirements?.[sortReq]?.users?.[(ascending ? b : a).user_id] || 0);
  })

  function calculateLevel(user: any, value: any, requirement: any) {
    var x = false;
    var lvl = 0;
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'.
    for (var level of data?.levels) {
      if (level[user ? "individual" : "group"][requirement]) x = true;
      if (level[user ? "individual" : "group"][requirement] <= value || !level[user ? "individual" : "group"][requirement]) lvl = (lvl || 0) + 1;
    }
    if (levelTable && x) {
      if (levelSelect + 1 > lvl) {
        return 0;
      } else {
        return levelSelect + 1;
      }
    }
    return x ? lvl : null;
  }

  function num(x = "noauth", y: any) {
    return Number(x) < 1 ? (y ? "-" : "-") : Number(x).toLocaleString();
  }

  function calculateLevelT(user: any) {
    if (user) {
      var lev = Infinity;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'.
      for (var requirement of data?.order?.individual) {
        var lvl = 0;
        var x = false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'.
        for (var level of data?.levels) {
          if (level.individual[requirement]) x = true;
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (level.individual[requirement] <= clan?.requirements?.[requirement]?.users?.[user] || !level.individual[requirement]) lvl = (lvl || 0) + 1;
        }
        if (x) lev = Math.min(lev, (lvl || 0));

      }
      if (levelTable) {
        if (levelSelect + 1 > lev) {
          return 0;
        } else {
          return levelSelect + 1;
        }
      }
      return lev;
    } else {
      var lev = Infinity;
      // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
      for (var user of clan?.members) {
        lev = Math.min(lev, calculateLevelT(user.user_id));
      }
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'.
      for (var requirement of data?.order?.group) {
        var lvl = 0;
        var x = false;
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'.
        for (var level of data?.levels) {
          if (level.group[requirement]) x = true;
          // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
          if (level.group[requirement] <= clan?.requirements?.[requirement]?.total || !level.group[requirement]) lvl = (lvl || 0) + 1;
        }
        if (x) lev = Math.min(lev, (lvl || 0));
      }
      if (levelTable) {
        if (levelSelect + 1 > lev) {
          return 0;
        } else {
          return levelSelect + 1;
        }
      }
      return lev;
    }
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'.
  if (!data?.levels || !clan?.details || !clan?.members) {
    if (!data || !clan) {
      return (
        <Card>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <ActivityIndicator size="large" color={theme.page_content.fg} />
          </View>
        </Card>
      )
    } else {
      return (
        <Card cardStyle={{ backgroundColor: theme.error.bg }}>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
            <Text allowFontScaling={false} style={{ color: theme.error.fg, ...font() }}>An Error Occurred</Text>
          </View>
        </Card>
      );
    }
  }
  return (
    <Card noPad>
      <View style={{ ...(theme.dark ? { borderBottomWidth: 2 * s, borderBottomColor: level_colors.border } : {}), backgroundColor: (theme.clanCardHeader || theme.navigation).bg, paddingHorizontal: 8 * s, borderTopLeftRadius: 8 * s, borderTopRightRadius: 8 * s, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, paddingVertical: 8 * s }}>
          <Text allowFontScaling={false} style={{ color: (theme.clanCardHeader || theme.navigation).fg, ...font("bold"), fontSize: 12 * s, opacity: 0.7, lineHeight: 12 * s }}>{!clan?.details?.goal && t('clan:shadow')}{clan?.details?.goal && ((clan?.details?.goal.startsWith('Level ')?t('clan:level_n',{level:clan?.details?.goal.slice(6)}):clan?.details?.goal) + ' ' + t('clan:goal'))} - {levelTable ? t('clan:view.subtract') : t('clan:view.total')}{!showGhost && " - Hiding Shadow Members"}</Text>
          <Text allowFontScaling={false} style={{ color: (theme.clanCardHeader || theme.navigation).fg, ...font("bold"), fontSize: 16 * s, lineHeight: 16 * s }}>{clan?.details?.name}</Text>
        </View>
        {shadow_clans.includes(Number(clan_id)) && Number(clan_id) >= 0 && <TouchableRipple style={{ borderRadius: 24 * s, padding: 4 * s }} onPress={() => { setShowGhost(!showGhost) }}>
          <MaterialCommunityIcons name="ghost" size={24 * s} color={(theme.clanCardHeader || theme.navigation).fg} />
        </TouchableRipple>}
        <TouchableRipple style={{ borderRadius: 24 * s, padding: 4 * s }} onPress={() => { setLevelTable(!levelTable) }}>
          <MaterialCommunityIcons name="plus-minus" size={24 * s} color={(theme.clanCardHeader || theme.navigation).fg} />
        </TouchableRipple>
      </View>
      <View style={{ flexDirection: "row" }}>
        <MainScrollView scroll={scroll} s={s}>
          <View style={{ flexDirection: "column", flexGrow: 1, alignItems: "stretch", backgroundColor: level_colors.null.bg }}>
            <View style={{ flexDirection: "row", marginRight: 1 }}>
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'. */}
              {(data?.order?.requirements ?? []).map((i: any,reqIndex: any) => <View style={{ flexGrow: 1 }}>
                <TouchableRipple onPress={() => {
                  if (sortReq !== i) {
                    setSortReq(i);
                    setAscending(false);
                  } else {
                    setAscending(!ascending);
                  }
                }}>
                  {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'. */}
                  <View style={{ ...((reqIndex===data.order.requirements.findIndex((i: any) => data.order.group.includes(i)&&data.order.individual.includes(i))||reqIndex===data.order.requirements.findIndex((i: any) => data.order.group.includes(i)&&!data.order.individual.includes(i)))?{ borderLeftWidth: 2 * s, borderLeftColor: level_colors.border }:{}), marginHorizontal: -1 * s, height: (96 - 19) * s, padding: 4 * s, alignItems: "center", backgroundColor: level_colors[data?.order.individual.includes(i) ? (data?.order.group.includes(i) ? 'bot' : 'ind') : 'gro'].bg }}>
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'requirements' does not exist on type '{}... Remove this comment to see the full error message */}
                    <Image source={getIcon(data?.requirements?.[i]?.icon ?? data?.requirements?.[i]?.icons?.[tick % data?.requirements?.[i]?.icons?.length])} style={{ height: 36 * s, width: 36 * s }} />
                    <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                      {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'. */}
                      <Text allowFontScaling={false} numberOfLines={1} style={{ color: level_colors[data?.order.individual.includes(i) ? (data?.order.group.includes(i) ? 'bot' : 'ind') : 'gro'].fg, textAlign: "center", ...font("bold"), fontSize: 12 * s }}>{t('clan_req:'+data?.requirements?.[i]?.top)}</Text>
                      {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'. */}
                      <MaterialCommunityIcons color={level_colors[data?.order.individual.includes(i) ? (data?.order.group.includes(i) ? 'bot' : 'ind') : 'gro'].fg} name={sortReq === i ? (ascending ? 'menu-up' : 'menu-down') : 'menu-swap'} size={12 * s} />
                    </View>
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'. */}
                    <Text allowFontScaling={false} numberOfLines={1} style={{ color: level_colors[data?.order.individual.includes(i) ? (data?.order.group.includes(i) ? 'bot' : 'ind') : 'gro'].fg, textAlign: "center", ...font(), fontSize: 12 * s }}>{t('clan_req:'+data?.requirements?.[i]?.bottom)}</Text>
                  </View>
                </TouchableRipple>
                <View style={[
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'.
                  ((reqIndex===data.order.requirements.findIndex((i: any) => data.order.group.includes(i)&&data.order.individual.includes(i))||reqIndex===data.order.requirements.findIndex((i: any) => data.order.group.includes(i)&&!data.order.individual.includes(i)))?{ borderLeftWidth: 2 * s, borderLeftColor: level_colors.border }:{}),
                  coloredStyles.cell_borderBottom,
                  styles.cell,
                  { backgroundColor: level_colors[levelSelect + 1].bg }
                ]}>
                  {
                    share ?
                      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'number' is not assignable to par... Remove this comment to see the full error message
                      <Text allowFontScaling={false} style={{ textAlign: "center", ...font(), width: '100%', fontSize: 12 * s, color: level_colors[levelSelect + 1].fg }}>{num(Math.max(data?.levels?.[levelSelect]?.individual?.[i] || 0, Math.ceil((data?.levels?.[levelSelect]?.group?.[i] || 0) / (clan?.members?.length || 100)), 0), true)}</Text>
                      :


                        // @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'.
                        <Text allowFontScaling={false} style={{ textAlign: "center", ...font(), width: '100%', fontSize: 12 * s, color: level_colors[levelSelect + 1].fg }}>{num(data?.levels?.[levelSelect]?.individual?.[i] || 0, true)}</Text>
                  }
                </View>
                {members?.map(u => <View style={[
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'.
                  ((reqIndex===data.order.requirements.findIndex((i: any) => data.order.group.includes(i)&&data.order.individual.includes(i))||reqIndex===data.order.requirements.findIndex((i: any) => data.order.group.includes(i)&&!data.order.individual.includes(i)))?coloredStyles.cell_borderLeft:null),
                  styles.cell,
                  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                  { backgroundColor: level_colors[calculateLevel(true, clan.requirements?.[i]?.users?.[u.user_id], i)].bg }
                ]}>
                  {/* WORKING HERE */}
                  <Text allowFontScaling={false} style={[
                    styles.cell_text,
                    font(userBookmarks.includes(Number(u.user_id)) ? "bold" : 400),
                    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                    { color: level_colors[calculateLevel(true, clan.requirements?.[i]?.users?.[u.user_id], i)].fg }
                  ]}>
                    {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1. */}
                    {levelTable ? num((data?.levels?.[levelSelect]?.individual?.[i] || 0) - clan.requirements?.[i]?.users?.[u.user_id]) : num(clan.requirements?.[i]?.users?.[u.user_id])}
                  </Text>
                </View>)}
                <View style={[
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'.
                  ((reqIndex===data.order.requirements.findIndex((i: any) => data.order.group.includes(i)&&data.order.individual.includes(i))||reqIndex===data.order.requirements.findIndex((i: any) => data.order.group.includes(i)&&!data.order.individual.includes(i)))?coloredStyles.cell_borderLeft:null),
                  coloredStyles.cell_borderTop,
                  styles.cell,
                  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
                  { backgroundColor: level_colors[calculateLevel(false, clan.requirements?.[i]?.total, i)].bg }
                ]}>
                  {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
                  <Text allowFontScaling={false} style={[styles.cell_text, font(), { color: level_colors[calculateLevel(false, clan.requirements?.[i]?.total, i)].fg }]}>
                    {/* @ts-expect-error ts-migrate(2554) FIXME: Expected 2 arguments, but got 1. */}
                    {levelTable ? num((data?.levels?.[levelSelect]?.group?.[i] || 0) - clan.requirements?.[i]?.total) : num(clan.requirements?.[i]?.total)}
                  </Text>
                </View>
                <View style={[
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'order' does not exist on type '{}'.
                  ((reqIndex===data.order.requirements.findIndex((i: any) => data.order.group.includes(i)&&data.order.individual.includes(i))||reqIndex===data.order.requirements.findIndex((i: any) => data.order.group.includes(i)&&!data.order.individual.includes(i)))?coloredStyles.cell_borderLeft:null),
                  styles.cell,
                  { backgroundColor: level_colors[levelSelect + 1].bg }
                ]}>
                  <Text allowFontScaling={false} style={[
                    styles.cell_text,
                    font(), 
                    { color: level_colors[levelSelect + 1].fg }
                  // @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'.
                  ]}>{num(data?.levels?.[levelSelect]?.group?.[i] || 0, true)}</Text>
                </View>
              </View>)}
            </View>
          </View>
        </MainScrollView>


        <View style={{ width: 101 * s, position: "absolute", left: 0, top: 0, borderRightWidth: 2 * s, borderRightColor: level_colors.border }}>
          <View style={{ height: (96 - 19) * s, backgroundColor: level_colors.null.bg, justifyContent: "center", alignItems: "center", padding: 4 * s }}>
            <Text allowFontScaling={false} style={{ fontSize: 12 * s, ...font(), color: level_colors.null.fg }}>{t('clan:players', { count: clan?.members?.length })}</Text>
            {clan?.details?.rank>0&&<Text allowFontScaling={false} style={{ fontSize: 12 * s, ...font(), color: level_colors.null.fg }}>{t('clan:rank', { rank: clan?.details?.rank })}</Text>}
          </View>
          <View style={{ borderBottomWidth: 2 * s, borderBottomColor: level_colors.border, height: 24 * s, justifyContent: "center", backgroundColor: level_colors[levelSelect + 1].bg }}>
            <Menu
              visible={userLevelSelect}
              onDismiss={() => setUserLevelSelect(false)}


              // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
              position="bottom"
              anchor={
                <TouchableRipple style={{ height: 24 * s, justifyContent: "center", paddingHorizontal: 4 * s }} onPress={() => setUserLevelSelect(true)}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'. */}
                    <Text allowFontScaling={false} style={{ fontSize: 12 * s, flex: 1, color: level_colors[levelSelect + 1].fg, ...font() }}>{t('clan:level_n',{level:data?.levels?.[levelSelect]?.level})} {(ls || "")?.endsWith?.('s') ? t('clan:share') : t('clan:indiv')}</Text>
                    <MaterialCommunityIcons color={level_colors[levelSelect + 1].fg} name="chevron-down" size={12} />
                  </View>
                </TouchableRipple>
              }
              contentContainerStyle={{ padding: 0 }}
            >
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'. */}
              {data?.levels?.map((i: any, index: any) => <Menu.Item
                key={index}
                style={[styles.levelSelect_menuItem,{ backgroundColor: level_colors[index + 1].bg }]}
                onPress={() => { setLevelSelect(index); setUserLevelSelect(false) }}
                title={<Text allowFontScaling={false} style={{ fontSize: 12 * s, ...font(), color: level_colors[index + 1].fg }}>{t('clan:level_n',{level:i.level})} {t('clan:indiv')}</Text>}
              />)}
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'. */}
              {data?.levels?.map((i: any, index: any) => <Menu.Item
                key={index + 's'}
                style={[styles.levelSelect_menuItem,{ backgroundColor: level_colors[index + 1].bg }]}
                onPress={() => { setLevelSelect(index + 's'); setUserLevelSelect(false) }}
                title={<Text allowFontScaling={false} style={{ fontSize: 12 * s, ...font(), color: level_colors[index + 1].fg }}>{t('clan:level_n',{level:i.level})} {t('clan:share')}</Text>}
              />)}
            </Menu>
          </View>
          {members?.map(i => <TouchableWithoutFeedback onPress={() => nav.navigate('UserDetails', { username: users.find((u: any) => u?.user_id.toString()===i.user_id.toString())?.username || i.username })}>
            <View style={{ backgroundColor: level_colors[calculateLevelT(i.user_id)].bg, padding: 4 * s, height: 24 * s, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} key={i.name}>
              {(i.leader || i.ghost) && <MaterialCommunityIcons name={i.ghost ? 'ghost' : 'hammer'} color={level_colors[calculateLevelT(i.user_id)].fg} size={12 * s} />}
              <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 12 * s, ...font(userBookmarks.includes(Number(i.user_id)) ? "bold" : 400), flexShrink: 1, color: level_colors[calculateLevelT(i.user_id)].fg }}>{users.find((u: any) => u?.user_id.toString()===i.user_id.toString())?.username || i.username}</Text>
            </View>
          </TouchableWithoutFeedback>)}
          <View style={{ justifyContent: "center", borderTopWidth: 2 * s, borderTopColor: level_colors.border, backgroundColor: level_colors[calculateLevelT(false)].bg, padding: 4 * s, height: 24 * s }}>
            <Text allowFontScaling={false} style={{ fontSize: 12 * s, ...font(), color: level_colors[calculateLevelT(false)].fg }}>{t('clan:group_total')}</Text>
          </View>
          <View style={{ justifyContent: "center", height: 24 * s, backgroundColor: level_colors[levelSelect + 1].bg }}>
            <Menu
              visible={clanLevelSelect}
              onDismiss={() => setClanLevelSelect(false)}


              // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
              position="bottom"
              anchor={
                <TouchableRipple style={{ height: 24 * s, justifyContent: "center", paddingHorizontal: 4 * s }} onPress={() => setClanLevelSelect(true)}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'. */}
                    <Text allowFontScaling={false} style={{ fontSize: 12 * s, flex: 1, color: level_colors[levelSelect + 1].fg, ...font() }}>{t('clan:level_n',{level:data?.levels?.[levelSelect]?.level})} {t('clan:group')}</Text>
                    <MaterialCommunityIcons color={level_colors[levelSelect + 1].fg} name="chevron-down" size={12 * s} />
                  </View>
                </TouchableRipple>
              }
              contentContainerStyle={{ padding: 0 }}
            >
              {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'levels' does not exist on type '{}'. */}
              {data?.levels?.map((i: any, index: any) => <Menu.Item
                key={index}
                style={[styles.levelSelect_menuItem,{ backgroundColor: level_colors[index + 1].bg }]}
                onPress={() => { setLevelSelect(index + ((ls || "")?.endsWith?.('s') ? 's' : '')); setClanLevelSelect(false) }}
                title={<Text allowFontScaling={false} style={{ fontSize: 12 * s, ...font(), color: level_colors[index + 1].fg }}>{t('clan:level_n',{level:i.level})}</Text>}
              />)}
            </Menu>
          </View>
        </View>
      </View>
      {clan.details.shadow?.group_admins?.some((i: any) => logins[i]) && <SyncButton game_id={game_id} group={clan.details.shadow?.group}/>}
    </Card>
  );
}

const styles = StyleSheet.create({
  levelSelect_menuItem: {
    padding: 4,
    paddingVertical: 0,
    fontSize: 12,
  },
  cell: {
    marginHorizontal: -1,
    height: 24,
    padding: 4,
    alignItems: "center"
  },
  cell_text: {
    flexDirection: "row",
    textAlign: "center",
    width: '100%',
    fontSize: 12
  }
});