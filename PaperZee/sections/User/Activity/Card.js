import * as React from 'react';
import { Text, View, ActivityIndicator, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import Card from 'sections/Shared/Card';
import ActivityOverview from './Overview';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import font from 'sections/Shared/font';
import useMoment from 'utils/hooks/useMoment';
import { useTranslation } from 'react-i18next';

export default function UserActivityDash({user_id,username,displayUsername}) {
  var {t} = useTranslation();
  var theme = useSelector(i=>i.themes[i.theme])
  var nav = useNavigation();
  var moment = useMoment();
  var date = moment().tz('America/Chicago');
  var dateString = `${date.year()}-${(date.month() + 1).toString().padStart(2, '0')}-${(date.date()).toString().padStart(2, '0')}`
  const data = useAPIRequest({
    endpoint: 'user/activity',
    data: {day:dateString,user_id},
    cuppazee: true
  })
  if (!data) {
    if(data===undefined) {
      return (
        <Card>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <ActivityIndicator size="large" color={theme.page_content.fg} />
          </View>
        </Card>
      )
    } else {
      return (
        <Card cardStyle={{backgroundColor:'#ffaaaa'}}>
          <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
            <MaterialCommunityIcons name="alert" size={48} color="#d00" />
          </View>
        </Card>
      );
    }
  }
  return (
    <Card noPad>
      <TouchableRipple onPress={displayUsername?()=>nav.navigate('UserDetails',{ username: username }):()=>nav.navigate('UserActivity',{ username: username, date:dateString})}>
        <View style={{...(theme.page_content.border?{borderBottomWidth:1,borderBottomColor:theme.page_content.border}:{}), backgroundColor:(theme.clanCardHeader||theme.navigation).bg,padding:8, borderTopLeftRadius: 8, borderTopRightRadius: 8, flexDirection:"row", alignItems: "center"}}>
          {displayUsername?
          <Image style={{height:32,width:32,borderRadius:16}} source={{uri:`https://munzee.global.ssl.fastly.net/images/avatars/ua${Number(user_id).toString(36)}.png`}} />:
          <MaterialCommunityIcons style={{marginHorizontal:4}} name="calendar" size={24} color={(theme.clanCardHeader||theme.navigation).fg} />}
          <Text allowFontScaling={false} style={{paddingLeft: 4, ...font("bold"),fontSize:16,flex:1,color:(theme.clanCardHeader||theme.navigation).fg}}>{displayUsername?username:t('user:activity')}</Text>
          <MaterialCommunityIcons name="chevron-right" size={24} color={(theme.clanCardHeader||theme.navigation).fg} />
        </View>
      </TouchableRipple>
      {data?.captures?
        <View style={{paddingBottom:4}}><ActivityOverview username={username} user_id={user_id}/></View>:
        (data?<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <MaterialCommunityIcons name="alert" size={48} color="#d00" />
        </View>:<View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
          <ActivityIndicator size="large" color="#000" />
        </View>)}
    </Card>
  );
}