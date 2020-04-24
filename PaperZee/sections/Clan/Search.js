import * as React from 'react';
import { Button, Text, View, TextInput, Image, ScrollView } from 'react-native';
import Card from '~sections/Shared/Card';
import { useFocusEffect } from '@react-navigation/native';
import { IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import { useDimensions } from '@react-native-community/hooks'
import request from '~store/request';
import s from '~store';
var { dash } = s;

export default function SearchScreen({ navigation }) {
  var input = React.useRef();
  var {width} = useDimensions().window;
  var [value,setValue] = React.useState('');
  var [search,setSearch] = React.useState('');
  var { data: clans } = useSelector(i => i.request_data[`clan/list/v1?format=list&query=${encodeURIComponent(search)}`] ?? {});
  var dash_list = useSelector(i => i.dash);
  var dispatch = useDispatch();
  useFocusEffect(
    React.useCallback(() => {
      // console.log(input);
      // setTimeout(()=>input.current.focus(),100)
    }, [])
  );
  function addClan(clan_id) {
    dispatch(dash(dash_list.concat([{
      type: "clan_stats",
      clan_id
    }])));
  }
  useFocusEffect(
    React.useCallback(() => {
      if(search) {
        dispatch(request.add(`clan/list/v1?format=list&query=${encodeURIComponent(search)}`))
        return () => {
          dispatch(request.remove(`clan/list/v1?format=list&query=${encodeURIComponent(search)}`))
        };
      } else {
        return ()=>{};
      }
    }, [search])
  );
  return (
    <ScrollView style={{flex: 1, backgroundColor: '#b3dc9c'??'#c6e3b6'??'#e6fcd9'}} contentContainerStyle={{ flexDirection: "row", flexWrap: "wrap", padding: 4 }}>
    {/* <View style={{ flex: 1, flexDirection: "row", flexWrap: "wrap", alignItems: "flex-start", backgroundColor: '#b3dc9c'??'#c6e3b6', padding: 4 }}> */}
      {/* <View style={{position:"absolute",top:0,left:0,bottom:0,right:0,alignItems:"center",justifyContent:"center"}}>
        <View style={{borderRadius:8,backgroundColor:'#ff3322',padding:8}}>
          <Text style={{fontWeight:"bold",fontSize:20,color:"white"}}>Coming Soon</Text>
        </View>
      </View> */}
      <View style={{padding:4,width:"100%"}}>
        <Card noPad cardStyle={{flexDirection: "row", backgroundColor: "#fff", alignItems:"stretch"}}>
          <TextInput
            onSubmitEditing={()=>setSearch(value)}
            ref={input}
            style={{ paddingLeft: 8, flex: 1, borderRadius: 8, borderBottomLeftRadius: 8 }}
            onChangeText={text => setValue(text)}
            value={value}
            returnKeyType="search"
          />
          <IconButton onPress={()=>setSearch(value)} style={{backgroundColor: "#016930"}} icon="magnify" color="#fff" />
        </Card>
      </View>
      <View style={{padding:4,width:width>800?"50%":"100%"}}>
        <Card noPad cardStyle={{}}>
          <View style={{padding:4}}>
            <View style={{padding: 4}}>
              <Text style={{fontWeight:"bold",fontSize:20}}>Clans</Text>
            </View>
            <ScrollView style={{maxHeight:400}}>
              {clans?.data?.map(i=><View key={i.clan_id} style={{padding: 4, flexDirection: "row", alignItems: "center"}}>
                <Image style={{height:32,width:32,marginRight:8,borderRadius:8}} source={{uri:i.logo??`https://munzee.global.ssl.fastly.net/images/clan_logos/${Number(i.clan_id).toString(36)}.png`}} />
                <View style={{flex:1}}>
                  <Text style={{fontWeight:"bold",fontSize:16}}>{i.name}</Text>
                  <Text style={{fontWeight:"bold",fontSize:12}}>{i.tagline}</Text>
                </View>
                <IconButton disabled={!!dash_list.find(x=>x.clan_id==i.clan_id)} size={32} onPress={()=>addClan(i.clan_id)} icon="bookmark-plus" color="#016930" />
              </View>)}
            </ScrollView>
          </View>
        </Card>
      </View>
      {/* <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      /> */}
    </ScrollView>
  );
}