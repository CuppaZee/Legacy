import * as React from 'react';
import { Text, View, ScrollView } from 'react-native';
import { Checkbox, Button } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';
import { useSelector } from 'react-redux';

import font from 'sections/Shared/font';

import getType from 'utils/db/types';
import categories from 'utils/db/categories.json';

import useAPIRequest from 'utils/hooks/useAPIRequest';
import useMoment from 'utils/hooks/useMoment';

const stateNames = {
  physical: "Physical",
  virtual: "Virtual",
  bouncer: "Bouncer",
  locationless: "Locationless",
  "N/A": "N/A"
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
        uncheckedColor={theme.page_content.fg}
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

export default function UserActivitySidebar({ filters: filterinput, onFiltersChange }) {
  var [filters, setFilters] = React.useState({ activity: new Set(), state: new Set(), category: new Set() });
  React.useEffect(() => {
    setFilters(filterinput)
  }, [filterinput]);
  var moment = useMoment();
  var theme = useSelector(i => i.themes[i.theme]);
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
  return <ScrollView style={{ flex: 1 }}>
    <View style={{ padding: 4 }}>
      <Button icon="check" mode="contained" color={theme.navigation.bg} onPress={() => onFiltersChange?.(filters)}>Update Filters</Button>
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