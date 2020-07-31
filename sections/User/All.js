import * as React from 'react';
import { View, FlatList } from 'react-native';
import ActivityCard from './Activity/Card';
import { useDimensions } from '@react-native-community/hooks'
import { useSelector } from 'react-redux';

function User({ item }) {
  return ({
    user_activity: <View style={{ padding: 4, flex: 1 }}>
      <ActivityCard user_id={item.user_id} username={item.username} displayUsername={true} />
    </View>,
    blankHack: <View style={{ flex: 1, padding: 4 }}></View>
  }[item.type]||null)
}

export default function AllUsersScreen() {
  var theme = useSelector(i => i.themes[i.theme]);
  var { width } = useDimensions().window;
  var dash = useSelector(i => i.userBookmarks);
  return (
    <FlatList
      key={width}
      style={{ backgroundColor: theme.page.bg }}
      contentContainerStyle={{ padding: 4 }}
      numColumns={width > 800 ? 2 : 1}
      data={[
        ...dash.map(i => {
          i.type = "user_activity";
          i.key = i.user_id;
          return i;
        }),
        { type: "blankHack", key: "blankHack" },
      ]}
      renderItem={({ item }) => <User item={item} />}
      keyExtractor={item => (item.key || "xd").toString()}
    />
  );
}