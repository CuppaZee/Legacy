
import * as React from 'react';

import { View, ScrollView } from 'react-native';
import { Text, Checkbox, Button, Subheading } from 'react-native-paper';
import { useRoute } from '@react-navigation/native';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types' or its corresp... Remove this comment to see the full error message
import getType from 'utils/db/types';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/categories.json' or i... Remove this comment to see the full error message
import categories from 'utils/db/categories.json';

// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
import { useTranslation } from 'react-i18next';

const stateNames = {
  physical: "Physical",
  virtual: "Virtual",
  bouncer: "Bouncer",
  universal: "Universal",
  "N/A": "N/A"
}

function UserActivityFilterSection({
  filter,
  onFilterChange,
  options,
  title
}: any) {
  return (
    <View>
      <View style={{ paddingTop: 4, paddingLeft: 8 }}>
        <Subheading>{title}</Subheading>
      </View>
      {options.map((i: any) => <View key={i.id} style={{ flexDirection: "row", paddingLeft: 8, alignItems: "center" }}>
        <Checkbox
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
        <Text style={{ fontSize: 16 }}>{i.title}</Text>
      </View>)}
    </View>
  );
}

export default function UserActivitySidebar({
  filters: filterinput,
  onFiltersChange
}: any) {
  var [filters, setFilters] = React.useState({ activity: new Set(), state: new Set(), category: new Set() });
  React.useEffect(() => {
    setFilters(filterinput)
  }, [filterinput]);
  var moment = useMoment();
  const {t} = useTranslation();
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
  var data = useAPIRequest(user_id ? {
    endpoint: 'user/activity',
    data: { day: dateString, user_id },
    cuppazee: true
  } : null)
  var all = data ? [...data.captures, ...data.deploys, ...data.captures_on] : [];
  var allTypes = all.map(i => getType(i.pin));
  var stateOptions = Array.from(new Set(allTypes.map(i => i?.state || "N/A"))).map(i => ({
    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    title: stateNames[i] ?? i,
    id: i
  }));
  var categoryOptions = Array.from(new Set(allTypes.map(i => i?.category || "N/A"))).map(i => ({
    title: categories.find((c: any) => c.id == i)?.name ?? i,
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
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 4 }}>
        <Button icon="check" mode="contained" onPress={() => onFiltersChange?.(filters)}>{t('activity:filters.update')}</Button>
      </View>
      <UserActivityFilterSection
        filter={filters.activity}
        onFilterChange={(filter: any) => setFilters({
          ...filters,
          activity: filter
        })}
        title={t('activity:filters.activity')}
        options={activityOptions}
      />
      <UserActivityFilterSection
        filter={filters.state}
        onFilterChange={(filter: any) => setFilters({
          ...filters,
          state: filter
        })}
        title={t('activity:filters.state')}
        options={stateOptions}
      />
      <UserActivityFilterSection
        filter={filters.category}
        onFilterChange={(filter: any) => setFilters({
          ...filters,
          category: filter
        })}
        title={t('activity:filters.category')}
        options={categoryOptions}
      />
    </ScrollView>
  );
}