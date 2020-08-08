import * as React from 'react';
import { Image } from 'react-native';
import { useSelector } from 'react-redux';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function UserIcon({ user_id, size }) {
  return <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ marginLeft: -(size - 24) / 2, marginTop: -(size - 24) / 2, height: size, width: size }} />
}

export default function UserFAB({ username, user_id }) {
  var theme = useSelector(i=>i.themes[i.theme]);
  var [FABOpen, setFABOpen] = React.useState(false);
  var nav = useNavigation();
  var bookmarks = useSelector(i => i.userBookmarks);
  var list = bookmarks.filter(i => i.username != username).slice(0, 5).map(i => ({
    icon: () => <UserIcon theme={theme} size={40} user_id={Number(i.user_id)} />,
    style: {backgroundColor:theme.page_content.bg},
    label: i.username,
    onPress: () => {
      var prevState = nav.dangerouslyGetState();
      nav.reset({
        index: prevState.index,
        routes: prevState.routes.map(x=>{
          if(x.params?.username) {
            return {
              ...x,
              params: {
                ...x.params,
                username: i.username
              }
            }
          }
          return x;
        })
      })
    }
  }));
  if(list.length === 0) return null;
  return <FAB.Group
    theme={{dark:theme.dark}}
    open={FABOpen}
    fabStyle={{backgroundColor:theme.page_content.bg}}
    icon={() => <UserIcon theme={theme} size={56} user_id={Number(user_id)} />}
    actions={list}
    onStateChange={({ open }) => setFABOpen(open)}
  />;
}