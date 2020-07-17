import * as React from 'react';
import { Text, View, Image, FlatList, Platform, ScrollView } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import { ActivityIndicator, FAB, IconButton, Menu, TouchableRipple, Checkbox, Button } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ActivityOverview from './Overview'
import useAPIRequest from 'utils/hooks/useAPIRequest';
import font from 'sections/Shared/font';
import Card from 'sections/Shared/Card';
import DatePicker from 'sections/Shared/DatePicker';
import useMoment from 'utils/hooks/useMoment';
import getIcon from 'utils/db/icon';
import getType from 'utils/db/types';
import categories from 'utils/db/categories.json';
import useComponentSize from 'utils/hooks/useComponentSize';

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
function isRenovation(act) {
  return !!(act.pin.includes('/renovation.') && act.captured_at);
}

function ActivityListItem({ act, userdata }) {
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var navigation = useNavigation();
  return <View style={{ padding: 4 }}>
    <Card noPad>
      <TouchableRipple onPress={() => { navigation.navigate('MunzeeDetails', { username: (!act.points_for_creator && act.captured_at) ? act.username : userdata?.username, code: act.code }) }}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ width: 60, paddingVertical: 4, marginRight: 4, borderTopLeftRadius: 8, borderBottomLeftRadius: 8, backgroundColor: act.points_for_creator ? theme.activity.capon.bg : (act.captured_at ? theme.activity.capture.bg : theme.activity.deploy.bg), position: "relative", alignContent: 'center', alignItems: "center", flexGrow: 0 }}>
            <View style={{ justifyContent: 'center', flexDirection: "row", flexWrap: "wrap", flexGrow: 0 }}>
              <View style={{ paddingHorizontal: 8, borderRadius: 9.5 }}>
                <Text allowFontScaling={false} style={{ alignSelf: "stretch", textAlign: "center", color: act.points_for_creator ? theme.activity.capon.fg : (act.captured_at ? theme.activity.capture.fg : theme.activity.deploy.fg), ...font("bold") }}>{(act.points_for_creator ?? act.points) > 0 && '+'}{(Number(act.points_for_creator ?? act.points)) || t('activity:none')}</Text>
              </View>
            </View>
            <View style={{ position: 'relative' }}>
              <Image style={{ height: 32, width: 32 }} source={getIcon(act.pin)} />
              {hostIcon(act.pin) && <Image style={{ height: 24, width: 24, position: "absolute", right: -5, bottom: -4 }} source={hostIcon(act.pin)} />}
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="middle" style={{ color: theme.page_content.fg, ...font() }}>{act.points_for_creator ? (isRenovation(act) ? t('activity:user_renovated', { user: act.username }) : t('activity:user_captured', { user: act.username })) : (act.captured_at ? (isRenovation(act) ? t('activity:you_renovated') : t('activity:you_captured')) : t('activity:you_deployed'))}</Text>
            {!isRenovation(act) && <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="middle" style={{ color: theme.page_content.fg, ...font("bold") }}>{act.friendly_name}</Text>}
            {!isRenovation(act) && <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="middle" style={{ color: theme.page_content.fg, opacity: 0.8, ...font() }}>{act.points_for_creator ? t('activity:by_you') : (act.captured_at ? t('activity:by_user', { user: act.username }) : t('activity:by_you'))}</Text>}
          </View>
          <View style={{ padding: 8, flexGrow: 0, paddingLeft: 16, alignContent: 'center', position: "relative", alignItems: "flex-end" }}>
            <Text allowFontScaling={false} style={{ alignSelf: "stretch", textAlign: "right", color: theme.page_content.fg, ...font("bold") }}>{new Date(act.captured_at ?? act.deployed_at).getHours().toString().padStart(2, "0")}:{new Date(act.captured_at ?? act.deployed_at).getMinutes().toString().padStart(2, "0")}</Text>
          </View>
        </View>
      </TouchableRipple>
    </Card>
  </View>
}

function DateSwitcher({ dateString, toggleDrawer }) {
  var moment = useMoment();
  const nav = useNavigation();
  const theme = useSelector(i => i.themes[i.theme]);
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  return <View style={{ borderTopLeftRadius: 8, borderTopRightRadius: 8, backgroundColor: (theme.clanCardHeader || theme.navigation).bg }}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Menu
        visible={datePickerOpen}
        onDismiss={() => setDatePickerOpen(false)}
        anchor={
          <IconButton icon="calendar" color={(theme.clanCardHeader || theme.navigation).fg} onPress={() => setDatePickerOpen(true)} />
        }
        contentStyle={{ padding: 0, backgroundColor: theme.page_content.bg, borderWidth: theme.page_content.border ? 1 : 0, borderColor: theme.page_content.border }}
      >
        <DatePicker noWrap value={moment({
          year: Number(dateString.split('-')[0]),
          month: Number(dateString.split('-')[1]) - 1,
          date: Number(dateString.split('-')[2]),
        })} onChange={(date) => {
          nav.setParams({
            date: `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
          })
        }} />
      </Menu>

      <Text allowFontScaling={false} style={{ flex: 1, ...font("bold"), fontSize: 16, color: (theme.clanCardHeader || theme.navigation).fg }}>{moment({
        year: Number(dateString.split('-')[0]),
        month: Number(dateString.split('-')[1]) - 1,
        date: Number(dateString.split('-')[2]),
      }).format('L')}</Text>
      {toggleDrawer && <IconButton icon="filter" color={(theme.clanCardHeader || theme.navigation).fg} onPress={() => toggleDrawer()} />}
    </View>
  </View>
}

function UserIcon({ user_id, size }) {
  return <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ marginLeft: -(size - 24) / 2, marginTop: -(size - 24) / 2, height: size, width: size }} />
}

const stateNames = {
  physical: "Physical",
  virtual: "Virtual",
  bouncer: "Bouncer",
  locationless: "Locationless",
  "N/A": "N/A"
}

function UserActivitySidebar({ filters: filterinput, onFiltersChange }) {
  var [filters, setFilters] = React.useState({activity:new Set(),state:new Set(),category:new Set()});
  React.useEffect(()=>{
    setFilters(filterinput)
  },[filterinput]);
  var moment = useMoment();
  var theme = useSelector(i=>i.themes[i.theme]);
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
  var route = useRoute();
  if (route.params.date) {
    dateString = route.params.date;
  }
  var username = route.params.username
  var userdata = useAPIRequest({
    endpoint: 'user',
    data: { username }
  })
  let user_id = userdata?.user_id
  var data = useAPIRequest(user_id ? {
    endpoint: 'user/activity',
    data: { day: dateString, user_id },
    cuppazee: true
  } : null)
  var all = data ? [...data.captures, ...data.deploys, ...data.captures_on] : [];
  var allTypes = all.map(i => getType(i.pin));
  var stateOptions = Array.from(new Set(allTypes.map(i => i?.state || "N/A"))).map(i => ({
    title: stateNames[i] ?? i,
    id: i
  }));
  var categoryOptions = Array.from(new Set(allTypes.map(i => i?.category || "N/A"))).map(i => ({
    title: categories.find(c => c.id == i)?.name ?? i,
    id: i
  }));
  var activityOptions = [
    {
      title: "Captures",
      id: "captures"
    },
    {
      title: "Deploys",
      id: "deploys"
    },
    {
      title: "Capons",
      id: "captures_on"
    }
  ]
  return <ScrollView style={{flex:1}}>
    <View style={{padding:4}}>
      <Button icon="check" mode="contained" color={theme.navigation.bg} onPress={()=>onFiltersChange?.(filters)}>Update Filters</Button>
    </View>
    <UserActivityFilterSection
      filter={filters.activity}
      onFilterChange={filter => setFilters({
        ...filters,
        activity: filter
      })}
      title="Activity"
      options={activityOptions}
    />
    <UserActivityFilterSection
      filter={filters.state}
      onFilterChange={filter => setFilters({
        ...filters,
        state: filter
      })}
      title="State"
      options={stateOptions}
    />
    <UserActivityFilterSection
      filter={filters.category}
      onFilterChange={filter => setFilters({
        ...filters,
        category: filter
      })}
      title="Category"
      options={categoryOptions}
    />
  </ScrollView>
}

function UserActivityFilterSection({ filter, onFilterChange, options, title }) {
  var theme = useSelector(i => i.themes[i.theme]);
  return <View>
    <View style={{ paddingTop: 4, paddingLeft: 8 }}>
      <Text allowFontScaling={false} style={{ flex: 1, ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{title}</Text>
    </View>
    {options.map(i => <View style={{ flexDirection: "row", paddingLeft: 8, alignItems: "center" }}>
      <Checkbox
        color={theme.page_content.fg}
        status={filter.has(i.id) ? 'checked' : 'unchecked'}
        onPress={() => {
          var x = new Set(filter);
          if (x.has(i.id)) {
            x.delete(i.id)
          } else {
            x.add(i.id)
          }
          onFilterChange?.(x);
        }}
      />
      <Text allowFontScaling={false} style={{ flex: 1, ...font(), fontSize: 16, color: theme.page_content.fg }}>{i.title}</Text>
    </View>)}
  </View>;
}

function UserActivityPage({ toggleDrawer, filters }) {
  var moment = useMoment();
  var [FABOpen, setFABOpen] = React.useState(false);
  var logins = useSelector(i => i.logins)
  var nav = useNavigation();
  var { t } = useTranslation();
  var theme = useSelector(i => i.themes[i.theme]);
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
  var navigation = useNavigation();
  var route = useRoute();
  if (route.params.date) {
    dateString = route.params.date;
  }
  var username = route.params.username
  var userdata = useAPIRequest({
    endpoint: 'user',
    data: { username }
  })
  let user_id = userdata?.user_id
  var dataraw = useAPIRequest(user_id ? {
    endpoint: 'user/activity',
    data: { day: dateString, user_id },
    cuppazee: true
  } : null)
  function filter(i, s) {
    if (!filters) return true;
    if (filters.activity.size != 0 && !filters.activity.has(s)) return false;
    let g = getType(i.pin);
    if (filters.state.size != 0 && !filters.state.has(g?.state||"N/A")) return false;
    if (filters.category.size != 0 && !filters.category.has(g?.category||"N/A")) return false;
    return true;
  }
  var data = {
    captures: dataraw?.captures.filter(i=>filter(i,"captures")),
    deploys: dataraw?.deploys.filter(i=>filter(i,"deploys")),
    captures_on: dataraw?.captures_on.filter(i=>filter(i,"captures_on")),
  }
  if (!data || !data.captures) return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center", backgroundColor: theme.page_content.bg }}>
      <ActivityIndicator size="large" color={theme.page_content.fg} />
    </View>
  )
  return <View style={{ flex: 1 }}>
    <FlatList
      contentContainerStyle={{ width: 500, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", paddingBottom: 88 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}
      extraData={[userdata?.username]}
      ListHeaderComponent={<View>
        <View style={{ padding: 4 }}>
          <Card noPad>
            <DateSwitcher dateString={dateString} toggleDrawer={toggleDrawer} />
            <ActivityOverview date={dateString} user_id={user_id} filters={filters} />
          </Card>
        </View>
      </View>}
      getItemLayout={(data, index) => (
        { length: 67, offset: 67 * index, index }
      )}
      data={[
        ...data.captures,
        ...data.deploys,
        ...data.captures_on
      ].sort((a, b) => new Date(b.captured_at ?? b.deployed_at) - new Date(a.captured_at ?? a.deployed_at))}
      renderItem={({ item: act }) => <ActivityListItem act={act} userdata={userdata} />}
      keyExtractor={(item, index) => item.key}
    />
    <FAB.Group
      open={FABOpen}
      icon={() => <UserIcon size={56} user_id={user_id} />}
      actions={Object.entries(logins).filter(i => i[0] != user_id).slice(0, 5).map(i => ({ icon: () => <UserIcon size={40} user_id={Number(i[0])} />, label: i[1].username, onPress: () => { nav.popToTop(); nav.replace('UserDetails', { userid: Number(i[0]) }) } }))}
      onStateChange={({ open }) => setFABOpen(open)}
    />
  </View>
}

export default function UserActivityScreen() {
  var theme = useSelector(i => i.themes[i.theme]);
  var [size, onLayout] = useComponentSize();
  var [open, setOpen] = React.useState(false);
  var [filters, setFilters] = React.useState({
    activity: new Set(),
    state: new Set(),
    category: new Set()
  });
  var drawerRef = React.useRef();
  function toggleDrawer() {
    console.log('toggle', open)
    if (!open) {
      drawerRef.current?.openDrawer()
    } else {
      drawerRef.current?.closeDrawer()
    }
  }
  return <View style={{ flex: 1, height: "100%" }} onLayout={onLayout}>
    {size?.width > 750 ? <View style={{ flexDirection: "row", flex: 1 }}>
      <View style={{ flex: 1 }}>
        <UserActivityPage filters={filters} />
      </View>
      <View style={{ width: 250, backgroundColor: theme.page_content.bg }}>
        <UserActivitySidebar filters={filters} onFiltersChange={setFilters} />
      </View>
    </View> : <DrawerLayout
      drawerLockMode={(Platform.OS === "web" && !open) ? "locked-closed" : "unlocked"}
      ref={drawerRef}
      drawerWidth={250}
      drawerPosition={DrawerLayout.positions.Right}
      drawerType='front'
      drawerBackgroundColor={theme.page_content.bg}
      onDrawerOpen={() => setOpen(true)}
      onDrawerClose={() => setOpen(false)}
      renderNavigationView={() => <UserActivitySidebar filters={filters} onFiltersChange={setFilters} />}>
        <UserActivityPage filters={filters} toggleDrawer={toggleDrawer} />
      </DrawerLayout>}
  </View>
}