// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { View, FlatList, Platform } from 'react-native';
// @ts-expect-error ts-migrate(2305) FIXME: Module '"react-native-gesture-handler"' has no exp... Remove this comment to see the full error message
import { DrawerLayout } from 'react-native-gesture-handler';
import { ActivityIndicator, IconButton, Menu, Subheading } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/DatePicker' or... Remove this comment to see the full error message
import DatePicker from 'sections/Shared/DatePicker';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useComponentSize' ... Remove this comment to see the full error message
import useComponentSize from 'utils/hooks/useComponentSize';

// @ts-expect-error ts-migrate(6142) FIXME: Module '../FAB' was resolved to 'C:/Users/samst/De... Remove this comment to see the full error message
import UserFAB from '../FAB';
// @ts-expect-error ts-migrate(6142) FIXME: Module './ListItem' was resolved to 'C:/Users/sams... Remove this comment to see the full error message
import ListItem from './ListItem';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Sidebar' was resolved to 'C:/Users/samst... Remove this comment to see the full error message
import Sidebar from './Sidebar';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Overview' was resolved to 'C:/Users/sams... Remove this comment to see the full error message
import ActivityOverview from './Overview'
import { ActivityConverter } from './Data';

function DateSwitcher({
  dateString,
  toggleDrawer
}: any) {
  var moment = useMoment();
  const nav = useNavigation();
  const [datePickerOpen, setDatePickerOpen] = React.useState(false);
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Menu
        visible={datePickerOpen}
        onDismiss={() => setDatePickerOpen(false)}
        anchor={
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <IconButton icon="calendar" onPress={() => setDatePickerOpen(true)} />
        }
        contentStyle={{ padding: 0, width: 300 }}
      >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <DatePicker noWrap value={moment({
          year: Number(dateString.split('-')[0]),
          month: Number(dateString.split('-')[1]) - 1,
          date: Number(dateString.split('-')[2]),
        })} onChange={(date: any) => {
          nav.setParams({
            date: `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
          })
        }} />
      </Menu>

      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Subheading style={{ flex: 1 }}>
        {moment({
          year: Number(dateString.split('-')[0]),
          month: Number(dateString.split('-')[1]) - 1,
          date: Number(dateString.split('-')[2]),
        }).format('L')}
      </Subheading>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {toggleDrawer && <IconButton icon="filter" onPress={() => toggleDrawer()} />}
    </View>
  );
  }

function UserActivityPage({
  toggleDrawer,
  filters
}: any) {
  var moment = useMoment();
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
  var route = useRoute();
  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  if (route.params.date) {
    // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
    dateString = route.params.date;
  }
  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1, alignContent: "center", justifyContent: "center" }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ActivityIndicator size="large" />
    </View>
  )
  var activityList = ActivityConverter(dataraw, filters, userdata);
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <FlatList
        contentContainerStyle={{ width: 500, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", paddingBottom: 88 }}
        style={{ flex: 1 }}
        extraData={[userdata?.username]}
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        ListHeaderComponent={<View>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ padding: 4 }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Card noPad>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <DateSwitcher dateString={dateString} toggleDrawer={toggleDrawer} />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <ActivityOverview date={dateString} user_id={user_id} filters={filters} />
            </Card>
          </View>
        </View>}
        // getItemLayout={(data, index) => (
        //   { length: data.height||0, offset: data.offset||0, index }
        // )}
        // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
        data={activityList.sort((a, b) => new Date(b.time) - new Date(a.time))}
        // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'act' implicitly has an 'any' type... Remove this comment to see the full error message
        renderItem={({ item: act }) => <ListItem act={act} userdata={userdata} />}
        keyExtractor={(item: any, index: any) => item.key}
      />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}

export default function UserActivityScreen() {
  var theme = useSelector((i: any) => i.themes[i.theme]);
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
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <View style={{ flex: 1, height: "100%" }} onLayout={onLayout}>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    {size?.width > 750 ? <View style={{ flexDirection: "row", flex: 1 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ flex: 1 }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <UserActivityPage filters={filters} />
      </View>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ width: 250 }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Sidebar filters={filters} onFiltersChange={setFilters} />
      </View>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    </View> : <DrawerLayout
      drawerLockMode={(Platform.OS === "web" && !open) ? "locked-closed" : "unlocked"}
      ref={drawerRef}
      drawerWidth={250}
      drawerPosition={DrawerLayout.positions.Right}
      drawerType="front"
      onDrawerOpen={() => setOpen(true)}
      onDrawerClose={() => setOpen(false)}
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      renderNavigationView={() => <Sidebar filters={filters} onFiltersChange={setFilters} />}
    >
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <UserActivityPage filters={filters} toggleDrawer={toggleDrawer} />
      </DrawerLayout>}
  </View>
}