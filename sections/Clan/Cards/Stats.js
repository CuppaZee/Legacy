import * as React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableRipple, Menu } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Card from 'sections/Shared/Card';
import s from 'utils/store';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { ClanRequirementsConverter, ClanStatsConverter } from '../Data';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import useLevelColours from 'utils/hooks/useLevelColours';
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';
var { levelSelect: levelSelectX } = s

function MainScrollView({ scroll, children, s }) {
  if (scroll) return <ScrollView horizontal={true} style={{ flex: 1 }} contentContainerStyle={{ flexDirection: "row", minWidth: '100%', paddingLeft: 100 * s }}>
    {children}
  </ScrollView>
  return <View style={{ flex: 1, flexDirection: "row", minWidth: '100%', paddingLeft: 100 * s }}>
    {children}
  </View>
}

export default function UserActivityDash({ game_id, clan_id, scale: s }) {
  var scroll = false;
  if (s === undefined) {
    scroll = true;
    s = 1;
  }
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var level_colors = useLevelColours();

  var [levelTable, setLevelTable] = React.useState(false);
  var nav = useNavigation();
  var dispatch = useDispatch();
  var userBookmarks = useSelector(i => i.userBookmarks.map(i => Number(i.user_id)))
  var ls = useSelector(i => i.clanLevelSelect[clan_id] ?? 4);
  var levelSelect = Number(ls.toString().slice(0, 1));
  var share = !!ls.toString().slice(1, 2);
  var [userLevelSelect, setUserLevelSelect] = React.useState(false);
  var [clanLevelSelect, setClanLevelSelect] = React.useState(false);
  function setLevelSelect(val) {
    var x = {};
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
    2042
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
  var data = ClanRequirementsConverter(unformatted_stats);
  var clan_data = ClanStatsConverter(Number(clan_id) < 0 ? { shadow: true } : unformatted_clan, unformatted_stats, showGhost ? unformatted_shadow : {});
  var clan = clan_data;

  var members = clan?.members ?? [];
  var [ascending, setAscending] = React.useState(false);
  var [sortReq, setSortReq] = React.useState(3);
  members.sort((a, b) => {
    return (clan?.requirements?.[sortReq]?.users?.[(ascending ? a : b).user_id] || 0) - (clan?.requirements?.[sortReq]?.users?.[(ascending ? b : a).user_id] || 0);
  })

  function calculateLevel(user, value, requirement) {
    var x = false;
    var lvl = 0;
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

  function num(x = "noauth", y) {
    return Number(x) < 1 ? (y ? "-" : "-") : Number(x).toLocaleString();
  }

  function calculateLevelT(user) {
    if (user) {
      var lev = Infinity;
      for (var requirement of data?.order?.individual) {
        var lvl = 0;
        var x = false;
        for (var level of data?.levels) {
          if (level.individual[requirement]) x = true;
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
      for (var user of clan?.members) {
        lev = Math.min(lev, calculateLevelT(user.user_id));
      }
      for (var requirement of data?.order?.group) {
        var lvl = 0;
        var x = false;
        for (var level of data?.levels) {
          if (level.group[requirement]) x = true;
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
              {(data?.order?.requirements ?? []).map((i,reqIndex) => <View style={{ flexGrow: 1 }}>
                <TouchableRipple onPress={() => {
                  if (sortReq !== i) {
                    setSortReq(i);
                    setAscending(false);
                  } else {
                    setAscending(!ascending);
                  }
                }}>
                  <View style={{ ...((reqIndex===data.order.requirements.findIndex(i=>data.order.group.includes(i)&&data.order.individual.includes(i))||reqIndex===data.order.requirements.findIndex(i=>data.order.group.includes(i)&&!data.order.individual.includes(i)))?{ borderLeftWidth: 2 * s, borderLeftColor: level_colors.border }:{}), marginHorizontal: -1 * s, height: (96 - 19) * s, padding: 4 * s, alignItems: "center", backgroundColor: level_colors[data?.order.individual.includes(i) ? (data?.order.group.includes(i) ? 'bot' : 'ind') : 'gro'].bg }}>
                    <Image source={getIcon(data?.requirements?.[i]?.icon ?? data?.requirements?.[i]?.icons?.[tick % data?.requirements?.[i]?.icons?.length])} style={{ height: 36 * s, width: 36 * s }} />
                    <View style={{ flexDirection: "row", alignItems: "baseline" }}>
                      <Text allowFontScaling={false} numberOfLines={1} style={{ color: level_colors[data?.order.individual.includes(i) ? (data?.order.group.includes(i) ? 'bot' : 'ind') : 'gro'].fg, textAlign: "center", ...font("bold"), fontSize: 12 * s }}>{t('clan_req:'+data?.requirements?.[i]?.top)}</Text>
                      <MaterialCommunityIcons color={level_colors[data?.order.individual.includes(i) ? (data?.order.group.includes(i) ? 'bot' : 'ind') : 'gro'].fg} name={sortReq === i ? (ascending ? 'menu-up' : 'menu-down') : 'menu-swap'} size={12 * s} />
                    </View>
                    <Text allowFontScaling={false} numberOfLines={1} style={{ color: level_colors[data?.order.individual.includes(i) ? (data?.order.group.includes(i) ? 'bot' : 'ind') : 'gro'].fg, textAlign: "center", ...font(), fontSize: 12 * s }}>{t('clan_req:'+data?.requirements?.[i]?.bottom)}</Text>
                  </View>
                </TouchableRipple>
                <View style={{ ...((reqIndex===data.order.requirements.findIndex(i=>data.order.group.includes(i)&&data.order.individual.includes(i))||reqIndex===data.order.requirements.findIndex(i=>data.order.group.includes(i)&&!data.order.individual.includes(i)))?{ borderLeftWidth: 2 * s, borderLeftColor: level_colors.border }:{}), borderBottomWidth: 2 * s, borderBottomColor: level_colors.border, marginHorizontal: -1 * s, height: 24 * s, padding: 4 * s, alignItems: "center", backgroundColor: level_colors[levelSelect + 1].bg }}>
                  {
                    share ?
                      <Text allowFontScaling={false} style={{ textAlign: "center", ...font(), width: '100%', fontSize: 12 * s, color: level_colors[levelSelect + 1].fg }}>{num(Math.max(data?.levels?.[levelSelect]?.individual?.[i] || 0, Math.ceil((data?.levels?.[levelSelect]?.group?.[i] || 0) / (clan?.members?.length || 100)), 0), true)}</Text>
                      : <Text allowFontScaling={false} style={{ textAlign: "center", ...font(), width: '100%', fontSize: 12 * s, color: level_colors[levelSelect + 1].fg }}>{num(data?.levels?.[levelSelect]?.individual?.[i] || 0, true)}</Text>
                  }
                </View>
                {members?.map(u => <View style={{ ...((reqIndex===data.order.requirements.findIndex(i=>data.order.group.includes(i)&&data.order.individual.includes(i))||reqIndex===data.order.requirements.findIndex(i=>data.order.group.includes(i)&&!data.order.individual.includes(i)))?{ borderLeftWidth: 2 * s, borderLeftColor: level_colors.border }:{}), marginHorizontal: -1 * s, height: 24 * s, padding: 4 * s, alignItems: "center", backgroundColor: level_colors[calculateLevel(true, clan.requirements?.[i]?.users?.[u.user_id], i)].bg }}>
                  <Text allowFontScaling={false} style={{ flexDirection: "row", textAlign: "center", width: '100%', ...font(userBookmarks.includes(Number(u.user_id)) ? "bold" : 400), fontSize: 12 * s, color: level_colors[calculateLevel(true, clan.requirements?.[i]?.users?.[u.user_id], i)].fg }}>
                    {levelTable ? num((data?.levels?.[levelSelect]?.individual?.[i] || 0) - clan.requirements?.[i]?.users?.[u.user_id]) : num(clan.requirements?.[i]?.users?.[u.user_id])}
                  </Text>
                </View>)}
                <View style={{ ...((reqIndex===data.order.requirements.findIndex(i=>data.order.group.includes(i)&&data.order.individual.includes(i))||reqIndex===data.order.requirements.findIndex(i=>data.order.group.includes(i)&&!data.order.individual.includes(i)))?{ borderLeftWidth: 2 * s, borderLeftColor: level_colors.border }:{}), borderTopWidth: 2 * s, borderTopColor: level_colors.border, marginHorizontal: -1 * s, height: 24 * s, padding: 4 * s, alignItems: "center", backgroundColor: level_colors[calculateLevel(false, clan.requirements?.[i]?.total, i)].bg }}>
                  <Text allowFontScaling={false} style={{ textAlign: "center", width: '100%', ...font(), fontSize: 12 * s, color: level_colors[calculateLevel(false, clan.requirements?.[i]?.total, i)].fg }}>
                    {levelTable ? num((data?.levels?.[levelSelect]?.group?.[i] || 0) - clan.requirements?.[i]?.total) : num(clan.requirements?.[i]?.total)}
                  </Text>
                </View>
                <View style={{ ...((reqIndex===data.order.requirements.findIndex(i=>data.order.group.includes(i)&&data.order.individual.includes(i))||reqIndex===data.order.requirements.findIndex(i=>data.order.group.includes(i)&&!data.order.individual.includes(i)))?{ borderLeftWidth: 2 * s, borderLeftColor: level_colors.border }:{}), marginHorizontal: -1 * s, height: 24 * s, padding: 4 * s, alignItems: "center", backgroundColor: level_colors[levelSelect + 1].bg }}>
                  <Text allowFontScaling={false} style={{ textAlign: "center", width: '100%', ...font(), fontSize: 12 * s, color: level_colors[levelSelect + 1].fg }}>{num(data?.levels?.[levelSelect]?.group?.[i] || 0, true)}</Text>
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
              position="bottom"
              anchor={
                <TouchableRipple style={{ height: 24 * s, justifyContent: "center", paddingHorizontal: 4 * s }} onPress={() => setUserLevelSelect(true)}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text allowFontScaling={false} style={{ fontSize: 12 * s, flex: 1, color: level_colors[levelSelect + 1].fg, ...font() }}>{t('clan:level_n',{level:data?.levels?.[levelSelect]?.level})} {(ls || "")?.endsWith?.('s') ? t('clan:share') : t('clan:indiv')}</Text>
                    <MaterialCommunityIcons color={level_colors[levelSelect + 1].fg} name="chevron-down" size={12} />
                  </View>
                </TouchableRipple>
              }
              contentContainerStyle={{ padding: 0 }}
            >
              {data?.levels?.map((i, index) => <Menu.Item
                key={index}
                style={{ padding: 4 * s, paddingVertical: 0, backgroundColor: level_colors[index + 1].bg }}
                onPress={() => { setLevelSelect(index); setUserLevelSelect(false) }}
                title={<Text allowFontScaling={false} style={{ fontSize: 12 * s, ...font(), color: level_colors[index + 1].fg }}>{t('clan:level_n',{level:i.level})} {t('clan:indiv')}</Text>}
              />)}
              {data?.levels?.map((i, index) => <Menu.Item
                key={index + 's'}
                style={{ padding: 4 * s, paddingVertical: 0, backgroundColor: level_colors[index + 1].bg }}
                onPress={() => { setLevelSelect(index + 's'); setUserLevelSelect(false) }}
                title={<Text allowFontScaling={false} style={{ fontSize: 12 * s, ...font(), color: level_colors[index + 1].fg }}>{t('clan:level_n',{level:i.level})} {t('clan:share')}</Text>}
              />)}
            </Menu>
          </View>
          {members?.map(i => <TouchableWithoutFeedback onPress={() => nav.navigate('UserDetails', { username: i.username })}>
            <View style={{ backgroundColor: level_colors[calculateLevelT(i.user_id)].bg, padding: 4 * s, height: 24 * s, flexDirection: "row", alignItems: "center", justifyContent: "flex-start" }} key={i.name}>
              {(i.leader || i.ghost) && <MaterialCommunityIcons name={i.ghost ? 'ghost' : 'hammer'} color={level_colors[calculateLevelT(i.user_id)].fg} size={12 * s} />}
              <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={{ fontSize: 12 * s, ...font(userBookmarks.includes(Number(i.user_id)) ? "bold" : 400), flexShrink: 1, color: level_colors[calculateLevelT(i.user_id)].fg }}>{i.username}</Text>
            </View>
          </TouchableWithoutFeedback>)}
          <View style={{ justifyContent: "center", borderTopWidth: 2 * s, borderTopColor: level_colors.border, backgroundColor: level_colors[calculateLevelT(false)].bg, padding: 4 * s, height: 24 * s }}>
            <Text allowFontScaling={false} style={{ fontSize: 12 * s, ...font(), color: level_colors[calculateLevelT(false)].fg }}>{t('clan:group_total')}</Text>
          </View>
          <View style={{ justifyContent: "center", height: 24 * s, backgroundColor: level_colors[levelSelect + 1].bg }}>
            <Menu
              visible={clanLevelSelect}
              onDismiss={() => setClanLevelSelect(false)}
              position="bottom"
              anchor={
                <TouchableRipple style={{ height: 24 * s, justifyContent: "center", paddingHorizontal: 4 * s }} onPress={() => setClanLevelSelect(true)}>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Text allowFontScaling={false} style={{ fontSize: 12 * s, flex: 1, color: level_colors[levelSelect + 1].fg, ...font() }}>{t('clan:level_n',{level:data?.levels?.[levelSelect]?.level})} {t('clan:group')}</Text>
                    <MaterialCommunityIcons color={level_colors[levelSelect + 1].fg} name="chevron-down" size={12 * s} />
                  </View>
                </TouchableRipple>
              }
              contentContainerStyle={{ padding: 0 }}
            >
              {data?.levels?.map((i, index) => <Menu.Item
                key={index}
                style={{ padding: 4 * s, paddingVertical: 0, fontSize: 12 * s, backgroundColor: level_colors[index + 1].bg }}
                onPress={() => { setLevelSelect(index + ((ls || "")?.endsWith?.('s') ? 's' : '')); setClanLevelSelect(false) }}
                title={<Text allowFontScaling={false} style={{ fontSize: 12 * s, ...font(), color: level_colors[index + 1].fg }}>{t('clan:level_n',{level:i.level})}</Text>}
              />)}
            </Menu>
          </View>
        </View>
      </View>
    </Card>
  );
}