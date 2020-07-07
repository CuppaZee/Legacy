import * as React from 'react';
import { Text, View, Image, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableRipple, Menu } from 'react-native-paper';
import { useSelector } from 'react-redux';
import Card from 'sections/Shared/Card';
import { ClanRequirementsConverter, dateFromGameID } from '../Data';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import useLevelColours from 'utils/hooks/useLevelColours';
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';
import useMoment from 'utils/hooks/useMoment';
import types from 'utils/db/types.json';

function ClanRequirement({ i, data, level_colors, s, t: ty, index }) {
  var theme = useSelector(i => i.themes[i.theme]);
  var [open, setOpen] = React.useState(false);
  var { t } = useTranslation();
  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={
      <TouchableRipple onPress={() => setOpen(true)}>
        <View style={{ ...((ty==="gro"&&index==0)?{borderLeftWidth:2*s,borderLeftColor:level_colors.border}:{}), height: (96 - 19) * s, borderBottomWidth: 2 * s, borderBottomColor: level_colors.border, padding: 4 * s, alignItems: "center",marginHorizontal:-1*s }}>
          <Image source={getIcon(data?.requirements?.[i]?.icon ?? data?.requirements?.[i]?.icons?.[tick % data?.requirements?.[i]?.icons?.length])} style={{ height: 36 * s, width: 36 * s }} />
          <Text allowFontScaling={false} numberOfLines={1} style={{ color: level_colors[ty].fg, textAlign: "center", ...font("bold"), fontSize: 12 * s }}>{t('clan_req:' + data?.requirements?.[i]?.top)}</Text>
          <Text allowFontScaling={false} numberOfLines={1} style={{ color: level_colors[ty].fg, textAlign: "center", ...font(), fontSize: 12 * s }}>{t('clan_req:' + data?.requirements?.[i]?.bottom)}</Text>
        </View>
      </TouchableRipple>
    }
    style={{ marginTop: (96 - 19) * s }}
    contentStyle={{ backgroundColor: theme.page_content.bg, borderWidth: theme.page_content.border ? 1 : 0, borderColor: theme.page_content.border }}
  >
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, ...font("bold") }}>{data?.requirements?.[i]?.meta?.activity.map(y => ((data?.requirements?.[i]?.meta?.points || data?.requirements?.[i]?.meta?.days) ? {
        capture: 'Capture',
        deploy: 'Deploy',
        capon: 'Cap-on'
      } : {
          capture: 'Captures',
          deploy: 'Deploys',
          capon: 'Cap-ons'
        })[y]).join('/')}{data?.requirements?.[i]?.meta?.points && " Points"}{data?.requirements?.[i]?.meta?.days && " Days"}</Text>
      {(!data?.requirements?.[i]?.meta?.types && !data?.requirements?.[i]?.meta?.exclude) ?
        <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16 }}>of All Types</Text> :
        (
          data?.requirements?.[i]?.meta?.types ?
            <>
              <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16 }}>of these types:</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", maxWidth: 300 }}>
                {types.filter(data?.requirements?.[i]?.meta?.types).filter(i => (!(data?.requirements?.[i]?.meta?.exclude || (() => false))(i))).slice(0, 15).map(i => <View style={{ padding: 4 }}>
                  <Image source={getIcon(i.icon)} style={{ height: 24 * s, width: 24 * s }} />
                </View>)}
                {types.filter(data?.requirements?.[i]?.meta?.types).filter(i => (!(data?.requirements?.[i]?.meta?.exclude || (() => false))(i))).length > 15 && <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 12 }}>and more</Text>}
              </View>
            </> :
            <>
              <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16 }}>of All except these types:</Text>
              <View style={{ flexDirection: "row", flexWrap: "wrap", maxWidth: 300 }}>
                {types.filter(data?.requirements?.[i]?.meta?.exclude).slice(0, 15).map(i => <View style={{ padding: 4 }}>
                  <Image source={getIcon(i.icon)} style={{ height: 24 * s, width: 24 * s }} />
                </View>)}
                {types.filter(data?.requirements?.[i]?.meta?.exclude).length > 15 && <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 12 }}>and more</Text>}
              </View>
            </>
        )}
    </View>
  </Menu>
}

export default function ClanRequirementsCard({ game_id, scale: s = 1, list }) {
  var moment = useMoment();
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
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
  var tick = useSelector(i => i.tick)
  if (!unformatted_requirements?.battle) {
    if (!unformatted_requirements) {
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
            <Text allowFontScaling={false} style={{ color: theme.error.fg }}>An Error Occurred</Text>
          </View>
        </Card>
      );
    }
  }
  if (list) {
    return <Card noPad>
      <View style={{ ...(theme.dark ? { borderBottomWidth: 2 * s, borderBottomColor: level_colors.border } : {}), backgroundColor: (theme.clanCardHeader || theme.navigation).bg, paddingHorizontal: 8 * s, borderTopLeftRadius: 8 * s, borderTopRightRadius: 8 * s, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, paddingVertical: 8 * s }}>
          <Text allowFontScaling={false} style={{ color: (theme.clanCardHeader || theme.navigation).fg, ...font("bold"), fontSize: 12 * s, opacity: 0.7, lineHeight: 12 * s }}>{moment(dateFromGameID(game_id)).format('MMMM YYYY')}</Text>
          <Text allowFontScaling={false} style={{ color: (theme.clanCardHeader || theme.navigation).fg, ...font("bold"), fontSize: 16 * s, lineHeight: 16 * s }}>{reward ? t('clan:rewards') : t('clan:requirements')}</Text>
        </View>
        <TouchableRipple style={{ borderRadius: 24 * s, padding: 4 * s }} onPress={() => { setReward(!reward) }}>
          <MaterialCommunityIcons name="gift" size={24 * s} color={(theme.clanCardHeader || theme.navigation).fg} />
        </TouchableRipple>
      </View>
      <View style={{ padding: 4 }}>
        {data.levels.map(i => <View style={{ paddingBottom: 16 }}>
          <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 24 * s }}>{t('clan:level_n', { level: i.level })}</Text>
          <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 20 * s }}>{t('clan:individual')}</Text>
          {(data?.order?.individual ?? []).filter(r => i.individual[r]).map(r => <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
            <Image style={{ height: 24, width: 24, marginRight: 4 }} source={getIcon(data.requirements[r].icon)} />
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 16 * s }}><Text style={font("bold")}>{i.individual[r].toLocaleString()}</Text> {t('clan_req:' + data?.requirements?.[r]?.top)} {t('clan_req:' + data?.requirements?.[r]?.bottom)}</Text>
          </View>)}
          <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 20 * s, marginTop: 4 }}>{t('clan:group')}</Text>
          {(data?.order?.group ?? []).filter(r => i.group[r]).map(r => <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
            <Image style={{ height: 24, width: 24, marginRight: 4 }} source={getIcon(data.requirements[r].icon)} />
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 16 * s }}><Text style={font("bold")}>{i.group[r].toLocaleString()}</Text> {t('clan_req:' + data?.requirements?.[r]?.top)} {t('clan_req:' + data?.requirements?.[r]?.bottom)}</Text>
          </View>)}
          <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 20 * s, marginTop: 4 }}>{t('clan:rewards')}</Text>
          {(data?.order?.rewards ?? []).filter(r => i.rewards[r]).map(r => <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 4 }}>
            <Image style={{ height: 24, width: 24, marginRight: 4 }} source={getIcon(data.rewards[r].logo)} />
            <Text allowFontScaling={false} style={{ color: theme.page_content.fg, ...font(), fontSize: 16 * s }}><Text style={font("bold")}>{i.rewards[r].toLocaleString()}x</Text> {data.rewards[r].name}</Text>
          </View>)}
        </View>)}
      </View>
    </Card>
  }
  return (
    <Card noPad>
      <View style={{ ...(theme.dark ? { borderBottomWidth: 2 * s, borderBottomColor: level_colors.border } : {}), backgroundColor: (theme.clanCardHeader || theme.navigation).bg, paddingHorizontal: 8 * s, borderTopLeftRadius: 8 * s, borderTopRightRadius: 8 * s, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1, paddingVertical: 8 * s }}>
          <Text allowFontScaling={false} style={{ color: (theme.clanCardHeader || theme.navigation).fg, ...font("bold"), fontSize: 12 * s, opacity: 0.7, lineHeight: 12 * s }}>{moment(dateFromGameID(game_id)).format('MMMM YYYY')}</Text>
          <Text allowFontScaling={false} style={{ color: (theme.clanCardHeader || theme.navigation).fg, ...font("bold"), fontSize: 16 * s, lineHeight: 16 * s }}>{reward ? t('clan:rewards') : t('clan:requirements')}</Text>
        </View>
        <TouchableRipple style={{ borderRadius: 24 * s, padding: 4 * s }} onPress={() => { setReward(!reward) }}>
          <MaterialCommunityIcons name="gift" size={24 * s} color={(theme.clanCardHeader || theme.navigation).fg} />
        </TouchableRipple>
      </View>
      {data?.levels?.length > 0 && <View style={{ flexDirection: "row" }}>
        <ScrollView horizontal={true} style={{ flex: 1 }} contentContainerStyle={{ flexDirection: "row", minWidth: '100%', paddingLeft: 55 * s }}>
          {!reward && <>
            <View style={{ flexDirection: "column", flexGrow: 1, alignItems: "stretch", backgroundColor: level_colors.ind.bg }}>
              <View style={{ height: 24 * s, padding: 4 * s }}><Text allowFontScaling={false} style={{ textAlign: "center", ...font("bold"), fontSize: 12 * s, color: level_colors.ind.fg }}>{t('clan:individual')}</Text></View>
              <View style={{ flexDirection: "row" }}>
                {(data?.order?.individual ?? []).map((i, index) => <View key={`Individual${i}`} style={{ flexGrow: 1 }}>
                  <ClanRequirement i={i} data={data} level_colors={level_colors} s={s} t="ind" index={index} />
                  {data?.levels?.map(l => <View key={l.id} style={{ marginHorizontal: -1, height: 24 * s, padding: 4 * s, alignItems: "center", backgroundColor: level_colors[l.id].bg }}>
                    <Text allowFontScaling={false} style={{ textAlign: "center", width: '100%', fontSize: 12 * s, color: level_colors[l.id].fg, ...font() }}>{l.individual?.[i]?.toLocaleString()}</Text>
                  </View>)}
                </View>)}
              </View>
            </View>

            <View style={{ flexDirection: "column", flexGrow: 1, alignItems: "stretch", backgroundColor: level_colors.gro.bg }}>
              <View style={{ borderLeftWidth: 2 * s, borderLeftColor: level_colors.border, marginHorizontal: -1 * s, height: 24 * s, padding: 4 * s }}><Text allowFontScaling={false} style={{ textAlign: "center", ...font("bold"), fontSize: 12 * s, color: level_colors.gro.fg }}>{t('clan:group')}</Text></View>
              <View style={{ flexDirection: "row", marginRight: 1 }}>
                {data?.order?.group?.map((i, index) => <View style={{ flexGrow: 1 }}>
                  <ClanRequirement i={i} data={data} level_colors={level_colors} s={s} t="gro" index={index} />
                  {data?.levels?.map(l => <View style={{ ...(index == 0 ? { borderLeftWidth: 2 * s, borderLeftColor: level_colors.border } : {}), marginHorizontal: -1 * s, height: 24 * s, padding: 4 * s, alignItems: "center", backgroundColor: level_colors[l.id].bg }}>
                    <Text allowFontScaling={false} style={{ color: level_colors[l.id].fg, textAlign: "center", width: '100%', ...font(), fontSize: 12 * s }}>{l.group?.[i]}</Text>
                  </View>)}
                </View>)}
              </View>
            </View>
          </>}

          {reward && <View style={{ flexDirection: "column", flexGrow: 1, alignItems: "stretch", backgroundColor: level_colors.ind.bg }}>
            <View style={{ height: 24 * s, padding: 4 * s }}><Text allowFontScaling={false} style={{ textAlign: "center", ...font("bold"), fontSize: 12 * s, color: level_colors.ind.fg }}>{t('clan:rewards')}</Text></View>
            <View style={{ flexDirection: "row", marginRight: 1 }}>
              {(data?.order?.rewards ?? []).map(i => <View key={`Reward${i}`} style={{ flexGrow: 1 }}>
                <View style={{ height: 60, borderBottomWidth: 2, borderBottomColor: level_colors.border, padding: 4, alignItems: "center" }}>
                  <Image source={getIcon(data?.rewards?.[i]?.logo)} style={{ height: 36 * s, width: 36 * s }} />
                  <Text allowFontScaling={false} numberOfLines={1} style={{ textAlign: "center", ...font("bold"), fontSize: 10 * s, color: level_colors.ind.fg }}>{data?.rewards?.[i]?.short_name ?? data?.rewards?.[i]?.name.replace(/Virtual /, 'V').replace(/Physical /, 'P').replace(/Flat /, '').replace(/ Mystery/, '').replace(/THE /, '').replace(/ Wheel/, 'W').replace(/Hammock/, 'Hamm')}</Text>
                </View>
                {data?.levels?.map(l => <View key={l.id} style={{ marginHorizontal: -1 * s, height: 24 * s, padding: 4 * s, alignItems: "center", backgroundColor: level_colors[l.id].bg }}>
                  <Text allowFontScaling={false} style={{ textAlign: "center", width: '100%', fontSize: 12 * s, color: level_colors[l.id].fg, ...font() }}>{l.rewards?.[i]?.toLocaleString()}</Text>
                </View>)}
              </View>)}
            </View>
          </View>}
        </ScrollView>


        <View style={{ width: 56 * s, position: "absolute", left: 0, top: 0, borderRightWidth: 2 * s, borderRightColor: level_colors.border }}>
          <View style={{ height: 24 * s, backgroundColor: level_colors.null.bg, padding: 4 * s }}><Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12 * s, color: level_colors.null.fg }}>{moment(dateFromGameID(game_id)).format('MMM YY')}</Text></View>
          <View style={{ height: (reward ? 60 : 77) * s, backgroundColor: level_colors.null.bg, flexDirection: "row", alignItems: "center", padding: 4 * s, borderBottomWidth: 2 * s, borderBottomColor: level_colors.border }}>
            <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="head" style={{ fontSize: 12 * s, color: level_colors.null.fg, ...font() }}>{t('clan:level', { count: data?.levels?.length })}</Text>
          </View>
          {(data?.levels ?? []).map(i => <View style={{ backgroundColor: level_colors[i.id].bg, padding: 4 * s, height: 24 * s }} key={i.name}>
            <Text allowFontScaling={false} style={{ fontSize: 12 * s, color: level_colors[i.id].fg, ...font() }}>{t('clan:level_n', { level: i.level })}</Text>
          </View>)}
        </View>
      </View>}
      {unformatted_requirements && data?.levels?.length === 0 && <Text allowFontScaling={false} style={{ color: theme.page_content.fg, padding: 8 * s }}>These Clan Requirements are not out yet... wait until {data?.battle?.reveal_at?.toLocaleString?.()} and then press the refresh button in the top-right corner</Text>}
    </Card>
    // </View>
  );
}