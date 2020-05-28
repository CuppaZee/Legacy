import * as React from 'react';
import { Text, View, TextInput, Image, ScrollView } from 'react-native';
import Card from '~sections/Shared/Card';
import { useFocusEffect } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import request from '~store/request';
import s from '~store';
var { clanBookmarks: clanBookmarksR } = s;
import stringify from 'fast-json-stable-stringify';
import font from '~sections/Shared/font';
import groups from '~sections/DB/clans';

export default function SearchScreen({ navigation }) {
  var theme = useSelector(i=>i.themes[i.theme])
  var input = React.useRef();
  var [value,setValue] = React.useState('');
  var [search,setSearch] = React.useState('');
  var [selectedClanGroup,setSelectedClanGroup] = React.useState(null);
  var [timeoutC,setTimeoutC] = React.useState(null);
  function onValue(val) {
    if(timeoutC) clearTimeout(timeoutC)
    setValue(val);
    setTimeoutC(setTimeout(() => {
      return setSearch(val);
    }, 500))
  }
  var dispatch = useDispatch();
  var clanBookmarks = useSelector(i => i.clanBookmarks);
  function addClan(clan) {
    dispatch(clanBookmarksR(clanBookmarks.concat([clan])));
  }
  function removeClan(clan) {
    dispatch(clanBookmarksR(clanBookmarks.filter(i=>i.clan_id!=clan.clan_id)));
  }
  var clansInGroup = [];
  if(groups.find(i=>i.title==selectedClanGroup)) {
    clansInGroup = groups.find(i=>i.title==selectedClanGroup).clans;
  }
  
  var reqData = {
    endpoint: `clan/list/v1`,
    data: {
      query: search,
      format: "list"
    },
    cuppazee: true
  }
  var clans = useSelector(i => i.request_data[stringify(reqData)] ?? {})
  useFocusEffect(
    React.useCallback(() => {
      if(search.length>=3) dispatch(request.add(reqData))
      return () => {
        if(search.length>=3) dispatch(request.remove(reqData))
      };
    }, [search])
  );
  return (
    <ScrollView
      contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      <View style={{padding:4,width:"100%"}}>
        <Card noPad cardStyle={{flexDirection: "row", backgroundColor: "#fff", alignItems:"stretch"}}>
          <TextInput
            onSubmitEditing={()=>setSearch(value)}
            ref={input}
            style={{ paddingHorizontal: 8, flex: 1, borderRadius: 8, borderBottomLeftRadius: 8, height: 40 }}
            onChangeText={onValue}
            value={value}
            returnKeyType="search"
          />
        </Card>
      </View>
      <View style={{padding:4}}>
        <Card noPad>
          <View>
            {!search&&<Text style={{textAlign:"center",...font("bold"),fontSize:16,color:theme.page_content.fg}}>Search for a Clan</Text>}
            {!!search&&!clans?.data&&<Text style={{textAlign:"center",...font("bold"),fontSize:16,color:theme.page_content.fg}}>Loading...</Text>}
            {(search?clans?.data?.slice?.(0,20):clansInGroup)?.map?.(i=><View key={i.clan_id} style={{padding: 4, flexDirection: "row", alignItems: "center"}}>
              {!clanBookmarks.find(x=>x.clan_id==i.clan_id)&&<IconButton size={24} onPress={()=>addClan(i)} icon="bookmark-plus" color="#016930" />}
              {!!clanBookmarks.find(x=>x.clan_id==i.clan_id)&&<IconButton size={24} onPress={()=>removeClan(i)} icon="bookmark-minus" color="#ff2222" />}
              <Image style={{height:24,width:24,marginRight:8,marginLeft:-8,borderRadius:8}} source={{uri:i.logo??`https://munzee.global.ssl.fastly.net/images/clan_logos/${Number(i.clan_id).toString(36)}.png`}} />
              <View style={{flex:1}}>
                <Text style={{...font("bold"),fontSize:16,color:theme.page_content.fg}}>{i.name}</Text>
                <Text style={{...font("bold"),fontSize:12,color:theme.page_content.fg}}>{i.tagline}</Text>
              </View>
              <IconButton size={24} onPress={()=>navigation.navigate('Clan',{clanid:i.clan_id})} icon="chevron-right" color={theme.page_content.fg} />
            </View>)}
            {!search&&groups.map(i=><View key={i.clan_id} style={{padding: 4, flexDirection: "row", alignItems: "center"}}>
              <Image style={{height:32,width:32,marginHorizontal:8,borderRadius:8}} source={{uri:i.icon??`https://munzee.global.ssl.fastly.net/images/clan_logos/${Number(i.clan_id).toString(36)}.png`}} />
              <View style={{flex:1}}>
                <Text style={{...font("bold"),fontSize:16,color:theme.page_content.fg}}>{i.title}</Text>
              </View>
              <IconButton size={24} onPress={()=>setSelectedClanGroup(i.title)} icon="chevron-right" color={theme.page_content.fg} />
            </View>)}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}