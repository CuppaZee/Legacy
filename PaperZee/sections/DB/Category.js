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
  var category_data = categories.find(i=>i.id==category);
  var parent_data = categories.find(i=>i.id==category_data.parent);
  return (
    <ScrollView
      contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      <View style={{padding:4}}>
        <Card noPad>
          <View>
            {category_data.parent?<View style={{padding: 4, flexDirection: "row", alignItems: "center"}}>
              <IconButton size={24} onPress={()=>navigation.push('DBCategory',{category:parent_data.id})} icon="chevron-left" color={theme.page_content.fg} />
              <Image style={{height:32,width:32,marginHorizontal:8}} source={{uri:parent_data.custom_icon??`https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(parent_data.icon)}.png`}} />
              <View style={{flex:1}}>
                <Text style={{...font("bold"),fontSize:16,color:theme.page_content.fg}}>{parent_data.name}</Text>
                <Text style={{...font("bold"),fontSize:12,color:theme.page_content.fg}}>{`Go Back`}</Text>
              </View>
            </View>:<View style={{padding: 4, flexDirection: "row", alignItems: "center"}}>
              <IconButton size={24} onPress={()=>navigation.push('DBSearch')} icon="chevron-left" color={theme.page_content.fg} />
              {/* <Image style={{height:32,width:32,marginHorizontal:8}} source={{uri:parent_data.custom_icon??`https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(parent_data.icon)}.png`}} /> */}
              <View style={{flex:1}}>
                <Text style={{...font("bold"),fontSize:16,color:theme.page_content.fg}}>Types Search</Text>
                <Text style={{...font("bold"),fontSize:12,color:theme.page_content.fg}}>{`Go Back`}</Text>
              </View>
            </View>}
            <Text style={{...font("bold"),fontSize:24,color:theme.page_content.fg,padding:4,textAlign:"center"}}>{category_data.name}</Text>
            {category_data?.seasonal&&<>
              {/* <Text style={{...font("bold"),fontSize:20,color:theme.page_content.fg,textAlign:"center"}}>{category_data.id}</Text> */}
              <Text style={{...font(),textAlign:"center",color:theme.page_content.fg}}>{moment(category_data.seasonal.starts).format('L LT')} - {moment(category_data.seasonal.ends).format('L LT')}</Text>
              <Text style={{...font(),textAlign:"center",color:theme.page_content.fg}}>Duration: {moment.duration(moment(category_data.seasonal.starts).diff(moment(category_data.seasonal.ends))).humanize()}</Text>
            </>}
            {[...types.filter(i=>i.category===category),...categories.filter(i=>i.parent===category)].map(i=><View key={i.id} style={{padding: 4, flexDirection: "row", alignItems: "center"}}>
              <Image style={{height:32,width:32,marginHorizontal:8}} source={{uri:i.custom_icon??`https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(i.icon)}.png`}} />
              <View style={{flex:1}}>
                <Text style={{...font("bold"),fontSize:16,color:theme.page_content.fg}}>{i.name}</Text>
                <Text style={{...font("bold"),fontSize:12,color:theme.page_content.fg}}>{i.category?`#${i.id}`:`Category`}</Text>
              </View>
              <IconButton size={24} onPress={i.category?()=>navigation.push('DBType',{munzee:i.icon}):()=>navigation.push('DBCategory',{category:i.id})} icon="chevron-right" color={theme.page_content.fg} />
            </View>)}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}