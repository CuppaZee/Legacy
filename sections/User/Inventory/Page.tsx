// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { ActivityIndicator, View, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Item' was resolved to 'C:/Users/samst/De... Remove this comment to see the full error message
import InventoryItem from './Item'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useSetting' or its... Remove this comment to see the full error message
import useSetting from 'utils/hooks/useSetting';
import InventoryConverter from './Data';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module 'utils/db/categories.json'. Con... Remove this comment to see the full error message
import categories from 'utils/db/categories.json';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/More/Dropdown' or its... Remove this comment to see the full error message
import { Dropdown, DropdownItem } from 'sections/More/Dropdown';

// @ts-expect-error ts-migrate(6142) FIXME: Module './ListItem' was resolved to 'C:/Users/sams... Remove this comment to see the full error message
import ListItem from './ListItem';
// @ts-expect-error ts-migrate(6142) FIXME: Module '../FAB' was resolved to 'C:/Users/samst/De... Remove this comment to see the full error message
import UserFAB from '../FAB';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Text, Headline, Surface, Title, Subheading, useTheme } from 'react-native-paper';

const modes = [
  {
    label: "Category",
    value: "category"
  },
  {
    label: "State",
    value: "state"
  },
  {
    label: "Type",
    value: "type"
  }
]

export default function () {
  const [mode, setMode] = useSetting('inventory_group_by','category');
  const [zeros, setZeros] = useSetting('inventory_include_zeros','all');
  var { t } = useTranslation()
  var route = useRoute();
  var theme = useTheme();
  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  var username = route.params.username;
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: (i: any) => i?.user_id
  })
  var {data, status} = useAPIRequest(user_id ? {
    endpoint: 'user/inventory',
    data: {},
    user: user_id,
    cuppazee: true,
    function: (x: any) => InventoryConverter(x?.credits, x?.boosters, x?.history, x?.undeployed, mode, zeros),
    extraData: [mode, zeros]
  } : null, 1);
  if (status) {
    if(status === "loading") {
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ActivityIndicator size="large" color={theme.colors.text} />
      </View>
    } else {
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <MaterialCommunityIcons name="alert" color={theme.colors.text} size={48} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Subheading>{t('error:' + status)}</Subheading>
      </View>
    }
  } else if (data === null) {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <MaterialCommunityIcons name="alert" color={theme.colors.text} size={48} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Subheading>{t('error:missing_data.locked')}</Subheading>
    </View>
  }
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ScrollView style={{ flex: 1 }} contentContainerStyle={{ padding: 4, paddingBottom: 92 }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{flexDirection:"row",flexWrap:"wrap"}}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{flexGrow: 1, width: 400, maxWidth: "100%", padding: 4}}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Dropdown dense={true} mode="outlined" selectedValue={mode} onValueChange={setMode}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              {modes.map(i=><DropdownItem label={`Group by ${i.label}`} value={i.value} />)}
            </Dropdown>
          </View>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{flexGrow: 1, width: 400, maxWidth: "100%", padding: 4}}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Dropdown enabled={mode!=="type"} dense={true} mode="outlined" selectedValue={zeros} onValueChange={setZeros}>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <DropdownItem label={`Include Zeros: Yes`} value="all" />
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <DropdownItem label={`Include Zeros: No`} value="none" />
            </Dropdown>
          </View>
        </View>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          {/* @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'. */}
          {Object.entries(data?.types || {}).sort(mode === "category" ? (a, b) => (categories.find((i: any) => i.id == b[0])?.priority || 0) - (categories.find((i: any) => i.id == a[0])?.priority || 0) : (a, b) => b[1].length - a[1].length).map(([label, list]) => <View style={{ padding: 4, width: 400, flexGrow: 1, maxWidth: "100%" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Surface>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Title>
                  {categories.find((i: any) => i.id == label)?.name ?? label}
                </Title>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
                  {
                    // @ts-expect-error ts-migrate(2571) FIXME: Object is of type 'unknown'.
                    list?.map((i: any) => <InventoryItem key={`${i.icon}|${i.c ? "c" : (i.b ? "b" : (i.u ? "u" : "z"))}`} i={i} />)
                  }
                </View>
              </View>
            </Surface>
          </View>)}
        </View>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Headline>
            {t('inventory:history')}
          </Headline>
        </View>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "center" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {data?.historyBatches.map((i: any) => <ListItem i={i} />)}
        </View>
      </ScrollView>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <UserFAB username={username} user_id={user_id} />
    </View>
  );
}