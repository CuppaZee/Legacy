import * as React from 'react';
import { Text, View, TextInput, Image, ScrollView } from 'react-native';
import Card from '~sections/Shared/Card';
import { IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import font from '~sections/Shared/font';
import types from './types.json';
import categories from './categories.json';
import moment from 'moment';

export default function SearchScreen({ navigation, route }) {
  var category = route.params.category;
  var theme = useSelector(i=>i.themes[i.theme])
  return (
    <ScrollView
      contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      <View style={{padding:4}}>
        <Card noPad>
          <View>
            <Text style={{...font("bold"),fontSize:24,color:theme.page_content.fg,padding:4,textAlign:"center"}}>{categories.find(i=>i.id==category).name}</Text>
            {categories.find(i=>i.id==category)?.seasonal&&<>
              {/* <Text style={{...font("bold"),fontSize:20,color:theme.page_content.fg,textAlign:"center"}}>{categories.find(i=>i.id==category).id}</Text> */}
              <Text style={{...font(),textAlign:"center",color:theme.page_content.fg}}>{moment(categories.find(i=>i.id==category).seasonal.starts).format('L LT')} - {moment(categories.find(i=>i.id==category).seasonal.ends).format('L LT')}</Text>
              <Text style={{...font(),textAlign:"center",color:theme.page_content.fg}}>Duration: {moment.duration(moment(categories.find(i=>i.id==category).seasonal.starts).diff(moment(categories.find(i=>i.id==category).seasonal.ends))).humanize()}</Text>
            </>}
            {types.filter(i=>i.category===category).map(i=><View key={i.id} style={{padding: 4, flexDirection: "row", alignItems: "center"}}>
              <Image style={{height:24,width:24,marginHorizontal:8,borderRadius:8}} source={{uri:i.avatar??`https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(i.icon)}.png`}} />
              <View style={{flex:1}}>
                <Text style={{...font("bold"),fontSize:16,color:theme.page_content.fg}}>{i.name}</Text>
                <Text style={{...font("bold"),fontSize:12,color:theme.page_content.fg}}>#{i.id}</Text>
              </View>
              <IconButton size={24} onPress={()=>navigation.navigate('DBType',{munzee:i.icon})} icon="chevron-right" color={theme.page_content.fg} />
            </View>)}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}