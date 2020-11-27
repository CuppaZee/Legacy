import * as React from 'react';
import { View, FlatList, Platform } from 'react-native';
import { DrawerLayout } from 'react-native-gesture-handler';
import { ActivityIndicator, IconButton, Menu, Subheading } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import Card from 'sections/Shared/Card';
import DatePicker from 'sections/Shared/DatePicker';

import useAPIRequest from 'utils/hooks/useAPIRequest';
import useMoment from 'utils/hooks/useMoment';
import useComponentSize from 'utils/hooks/useComponentSize';

import UserFAB from '../FAB';
import ListItem from './ListItem';
import Sidebar from './Sidebar';
import ActivityOverview from './Overview'
import { ActivityConverter } from './Data';

function DateSwitcher({ dateString, toggleDrawer }) {
  var moment = useMoment();
  const nav = useNavigation();
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  return <View style={{ flexDirection: "row", alignItems: "center" }}>
    <Menu
      visible={datePickerOpen}
      onDismiss={() => setDatePickerOpen(false)}
      anchor={
        <IconButton icon="calendar" onPress={() => setDatePickerOpen(true)} />
      }
      contentStyle={{ padding: 0, width: 300 }}
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

    <Subheading style={{ flex: 1 }}>
      {moment({
        year: Number(dateString.split('-')[0]),
        month: Number(dateString.split('-')[1]) - 1,
        date: Number(dateString.split('-')[2]),
      }).format('L')}
    </Subheading>
    {toggleDrawer && <IconButton icon="filter" onPress={() => toggleDrawer()} />}
  </View>
  }

function UserActivityPage({ toggleDrawer, filters }) {
  var moment = useMoment();
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
  var dataraw = useAPIRequest(user_id ? {
    endpoint: 'user/activity',
    data: { day: dateString, user_id },
    cuppazee: true
  } : null)
  if (!dataraw) return (
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" />
    </View>
  )
  var activityList = ActivityConverter(dataraw, filters, userdata);
  return <View style={{ flex: 1 }}>
    <FlatList
      contentContainerStyle={{ width: 500, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", paddingBottom: 88 }}
      style={{ flex: 1 }}
      extraData={[userdata?.username]}
      ListHeaderComponent={<View>
        <View style={{ padding: 4 }}>
          <Card noPad>
            <DateSwitcher dateString={dateString} toggleDrawer={toggleDrawer} />
            <ActivityOverview date={dateString} user_id={user_id} filters={filters} />
          </Card>
        </View>
      </View>}
      // getItemLayout={(data, index) => (
      //   { length: data.height||0, offset: data.offset||0, index }
      // )}
      data={activityList.sort((a, b) => new Date(b.time) - new Date(a.time))}
      renderItem={({ item: act }) => <ListItem act={act} userdata={userdata} />}
      keyExtractor={(item, index) => item.key}
    />
    <UserFAB username={username} user_id={user_id} />
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
      <View style={{ width: 250 }}>
        <Sidebar filters={filters} onFiltersChange={setFilters} />
      </View>
    </View> : <DrawerLayout
      drawerLockMode={(Platform.OS === "web" && !open) ? "locked-closed" : "unlocked"}
      ref={drawerRef}
      drawerWidth={250}
      drawerPosition={DrawerLayout.positions.Right}
      drawerType="front"
      onDrawerOpen={() => setOpen(true)}
      onDrawerClose={() => setOpen(false)}
      renderNavigationView={() => <Sidebar filters={filters} onFiltersChange={setFilters} />}
    >
        <UserActivityPage filters={filters} toggleDrawer={toggleDrawer} />
      </DrawerLayout>}
  </View>
}