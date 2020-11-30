
import * as React from 'react';

import { Image } from 'react-native';

import { useSelector } from 'react-redux';
import { FAB } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';

function UserIcon ({
  user_id,
  size
}: any) {
  return <Image source={{ uri: `https://munzee.global.ssl.fastly.net/images/avatars/ua${(user_id).toString(36)}.png` }} style={{ marginLeft: -(size - 24) / 2, marginTop: -(size - 24) / 2, height: size, width: size }} />
}

export default function UserFAB({
  username,
  user_id
}: any) {
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var [FABOpen, setFABOpen] = React.useState(false);
  var nav = useNavigation();
  var bookmarks = useSelector((i: any) => i.userBookmarks);
  var list = bookmarks.filter((i: any) => i.username != username).slice(0, 5);
  var actions = React.useMemo(() => list.map((i: any) => ({
    icon: () => <UserIcon theme={theme} size={40} user_id={Number(i.user_id)} />,
    style: {backgroundColor:theme.page_content.bg},
    label: i.username,

    onPress: () => {
      var prevState = nav.dangerouslyGetState();
      nav.reset({
        index: prevState.index,
        routes: prevState.routes.map(x=>{
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'username' does not exist on type 'object... Remove this comment to see the full error message
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
  })), [list.map((i: any) => i.user_id).join(',')]);
  const userAvatar = React.useMemo(() => () => <UserIcon size={56} user_id={Number(user_id)} />, [user_id]);
  if(list.length === 0) return null;
  return (
    <FAB.Group


      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ animated: boolean; theme: { dark: any; }; ... Remove this comment to see the full error message
      animated={false}
      theme={{dark:theme.dark}}
      open={FABOpen}
      fabStyle={{backgroundColor:theme.page_content.bg}}
      icon={FABOpen ? 'close' : userAvatar}
      actions={actions}
      onStateChange={({
        open
      }: any) => setFABOpen(open)}
    />
  );
}