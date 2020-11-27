import * as React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { Menu, TouchableRipple, Button, Text, Title, Subheading, Caption, Paragraph } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

import getType from 'utils/db/types';
import getIcon from 'utils/db/icon';

import useMoment from 'utils/hooks/useMoment';
import useAPIRequest from 'utils/hooks/useAPIRequest';

var count = (array, t) => {
  return Object.entries(array.reduce((a, b) => {
    if (!a[b[t]]) a[b[t]] = {
      points: 0,
      total: 0
    };
    a[b[t]].points += Number(b.points_for_creator ?? b.points);
    a[b[t]].total++;
    return a;
  }, {}))
}

var creatures = {
  'firepouchcreature': 'tuli',
  'waterpouchcreature': 'vesi',
  'earthpouchcreature': 'muru',
  'airpouchcreature': 'puffle',
  'mitmegupouchcreature': 'mitmegu',
  'unicorn': 'theunicorn',
  'fancyflatrob': 'coldflatrob',
  'fancy_flat_rob': 'coldflatrob',
  'fancyflatmatt': 'footyflatmatt',
  'fancy_flat_matt': 'footyflatmatt',
  'tempbouncer': 'expiring_specials_filter',
  'temp_bouncer': 'expiring_specials_filter',
  'funfinity': 'oniks'
}

var hostIcon = (icon) => {
  var host = icon.match(/\/([^\/\.]+?)_?(?:virtual|physical)?_?host\./)?.[1];
  if (!host) return null;
  return getIcon(creatures[host] ?? host);
}

function OverviewItem({ i, total }) {
  var small = total > 25;
  var [open, setOpen] = React.useState(false);
  var nav = useNavigation();
  var { t } = useTranslation();
  return <Menu
    visible={open}
    onDismiss={() => setOpen(false)}
    anchor={
      <TouchableRipple onPress={() => setOpen(true)}>
        <View key={i.icon} style={{ padding: 2, alignItems: "center" }}>
          <Image style={{ height: small ? 24 : 32, width: small ? 24 : 32 }} source={getIcon(i[0])} />
          <Paragraph>{i[1].total}</Paragraph>
          {hostIcon(i[0]) && <Image style={{ height: small ? 16 : 24, width: small ? 16 : 24, position: "absolute", right: small ? -3 : -5, bottom: small ? 18 : 15 }} source={hostIcon(i[0])} />}
        </View>
      </TouchableRipple>
    }
  >
    <View style={{ paddingHorizontal: 4, alignItems: "center" }}>
      <View>
        <Image style={{ height: 48, width: 48 }} source={getIcon(i[0])} />
        {hostIcon(i[0]) && <Image style={{ height: 36, width: 36, position: "absolute", right: -7.5, bottom: -7.5 }} source={hostIcon(i[0])} />}
      </View>
      <Title>{i[1].total}x {(getType(i[0]) || { name: i[0].slice(49, -4) }).name}</Title>
      <Subheading>{t('activity:point', { count: i[1].points })}</Subheading>
      <Button
        mode="contained"
        onPress={() => { setOpen(false); nav.push('DBType', { munzee: i[0].slice(49, -4) }) }}>
        {t('db:type_info')}
      </Button>
    </View>
  </Menu>
}

const sumPoints = (a, b) => a + Number(b.points_for_creator ?? b.points);

export default function ({ user_id, date: dateInput, filters }) {
  var { t } = useTranslation();
  var moment = useMoment();
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
  const dataraw = useAPIRequest({
    endpoint: 'user/activity',
    data: { day: dateInput || dateString, user_id },
    cuppazee: true
  })
  function filter(i, s) {
    if (!filters) return true;
    if (filters.activity.size != 0 && !filters.activity.has(s)) return false;
    let g = getType(i.pin);
    if (filters.state.size != 0 && !filters.state.has(g?.state || "N/A")) return false;
    if (filters.category.size != 0 && !filters.category.has(g?.category || "N/A")) return false;
    return true;
  }
  var data = {
    captures: dataraw?.captures.filter(i => filter(i, "captures")),
    deploys: dataraw?.deploys.filter(i => filter(i, "deploys")),
    captures_on: dataraw?.captures_on.filter(i => filter(i, "captures_on")),
  }
  function isRenovation(act) {
    return !!(act.pin.includes('/renovation.') && act.captured_at);
  }
  if (!data || !data.captures) return null;
  return <View>
    <Title style={styles.center}>
      {t('activity:point', { count: [...data.captures, ...data.deploys, ...data.captures_on].reduce(sumPoints, 0) })}
    </Title>
    <Subheading style={styles.center}>
      {t('activity:capture', { count: data.captures.filter(i => !isRenovation(i)).length })} - {t('activity:point', { count: data.captures.filter(i => !isRenovation(i)).reduce(sumPoints, 0) })}
    </Subheading>
    <View style={styles.row}>
      {count(data.captures.filter(i => !isRenovation(i)), "pin").map(i => <OverviewItem key={i[0]} total={count(data.captures.filter(i => !isRenovation(i)), "pin").length} i={i} />)}
    </View>
    <Subheading style={styles.center}>
      {t('activity:deploy', { count: data.deploys.length })} - {t('activity:point', { count: data.deploys.reduce(sumPoints, 0) })}
    </Subheading>
    <View style={styles.row}>
      {count(data.deploys, "pin").map(i => <OverviewItem key={i[0]} total={count(data.deploys, "pin").length} i={i} />)}
    </View>
    <Subheading style={styles.center}>
      {t('activity:capon', { count: data.captures_on.filter(i => !isRenovation(i)).length })} - {t('activity:point', { count: data.captures_on.filter(i => !isRenovation(i)).reduce(sumPoints, 0) })}
    </Subheading>
    <View style={styles.row}>
      {count(data.captures_on.filter(i => !isRenovation(i)), "pin").map(i => <OverviewItem key={i[0]} total={count(data.captures_on.filter(i => !isRenovation(i)), "pin").length} i={i} />)}
    </View>
    {data.captures.filter(i => isRenovation(i)).length > 0 && <Subheading style={styles.center}>
      {t('activity:renovation', { count: data.captures.filter(i => isRenovation(i)).length })} - {t('activity:point', { count: data.captures.filter(i => isRenovation(i)).reduce(sumPoints, 0) })}
    </Subheading>}
    {data.captures_on.filter(i => isRenovation(i)).length > 0 && <Subheading style={styles.center}>
      {t('activity:renovon', { count: data.captures_on.filter(i => isRenovation(i)).length })} - {t('activity:point', { count: data.captures_on.filter(i => isRenovation(i)).reduce(sumPoints, 0) })}
    </Subheading>}
  </View>
}

var styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  center: {
    textAlign: "center",
  }
})