// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { View, FlatList } from 'react-native';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Activity/Card' was resolved to 'C:/Users... Remove this comment to see the full error message
import ActivityCard from './Activity/Card';
import { useDimensions } from '@react-native-community/hooks'
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';

function User({
  item
}: any) {
  // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
  return ({
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    user_activity: <View style={{ padding: 4, flex: 1 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ActivityCard user_id={item.user_id} username={item.username} displayUsername={true} />
    </View>,
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    blankHack: <View style={{ flex: 1, padding: 4 }}></View>
  }[item.type]||null)
}

export default function AllUsersScreen() {
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var { width } = useDimensions().window;
  var dash = useSelector((i: any) => i.userBookmarks);
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <FlatList
      key={width}
      style={{ backgroundColor: theme.page.bg }}
      contentContainerStyle={{ padding: 4 }}
      numColumns={width > 800 ? 2 : 1}
      data={[
        ...dash.map((i: any) => {
          i.type = "user_activity";
          i.key = i.user_id;
          return i;
        }),
        { type: "blankHack", key: "blankHack" },
      ]}
      renderItem={({
        item
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      }: any) => <User item={item} />}
      keyExtractor={(item: any) => (item.key || "xd").toString()}
    />
  );
}