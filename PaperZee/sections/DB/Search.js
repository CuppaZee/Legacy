import * as React from 'react';
import { Text, View, TextInput, Image, ScrollView } from 'react-native';
import Card from '~sections/Shared/Card';
import { IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import font from '~sections/Shared/font';
import Fuse from 'fuse.js'
import types from './types.json';
import categories from './categories.json';
  
const options = {
  includeScore: true,
  keys: ['name', 'id', 'category']
}
const fuse = new Fuse([...types,...categories], options)

export default function SearchScreen({ navigation }) {
  var theme = useSelector(i=>i.themes[i.theme])
  var input = React.useRef();
  var [value,setValue] = React.useState('');
  var [search,setSearch] = React.useState('');
  var [timeoutC,setTimeoutC] = React.useState(null);
  function onValue(val) {
    if(timeoutC) clearTimeout(timeoutC)
    setValue(val);
    setTimeoutC(setTimeout(() => {
      return setSearch(val);
    }, 500))
  }
  var list = search.length>3?fuse.search(search):[];
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
            {search.length<3&&<Text style={{textAlign:"center",...font("bold"),fontSize:16,color:theme.page_content.fg}}>Search for a Munzee Type</Text>}
            {search.length>=3&&list.length===0&&<Text style={{textAlign:"center",...font("bold"),fontSize:16,color:theme.page_content.fg}}>No Results {":("}</Text>}
            {list.slice(0,20).map(({item:i})=><View key={i.id} style={{padding: 4, flexDirection: "row", alignItems: "center"}}>
              <Image style={{height:24,width:24,marginHorizontal:8,borderRadius:8}} source={{uri:i.custom_icon??`https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(i.icon)}.png`}} />
              <View style={{flex:1}}>
                <Text style={{...font("bold"),fontSize:16,color:theme.page_content.fg}}>{i.name}</Text>
                <Text style={{...font("bold"),fontSize:12,color:theme.page_content.fg}}>{i.category?`#${i.id}`:`Category`}</Text>
              </View>
              <IconButton size={24} onPress={i.category?()=>navigation.navigate('DBType',{munzee:i.icon}):()=>navigation.navigate('DBCategory',{category:i.id})} icon="chevron-right" color={theme.page_content.fg} />
            </View>)}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}