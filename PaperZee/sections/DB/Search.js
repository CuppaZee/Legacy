import * as React from 'react';
import { Text, View, TextInput, Image, ScrollView } from 'react-native';
import Card from 'sections/Shared/Card';
import { IconButton } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import font from 'sections/Shared/font';
import Fuse from 'fuse.js'
import types from 'utils/db/types.json';
import categories from 'utils/db/categories.json';
import { useTranslation } from 'react-i18next';
  
const options = {
  includeScore: true,
  keys: ['name', 'id', 'category']
}
const fuse = new Fuse([...types.filter(i=>!i.hidden),...categories.filter(i=>!i.hidden)], options)

export default function SearchScreen({ navigation }) {
  var {t} = useTranslation()
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
  var list = search.length>=3?fuse.search(search):[];
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
            {search.length<3&&<Text allowFontScaling={false} style={{textAlign:"center",...font("bold"),fontSize:16,color:theme.page_content.fg}}>{t('search:type')}</Text>}
            {search.length>=3&&list.length===0&&<Text allowFontScaling={false} style={{textAlign:"center",...font("bold"),fontSize:16,color:theme.page_content.fg}}>No Results {":("}</Text>}
            {(search.length<3?categories.filter(i=>i.parents.includes('root')).filter(i=>!i.hidden).map(i=>({item:i})):list.slice(0,20)).map(({item:i})=><View key={i.id} style={{padding: 4, flexDirection: "row", alignItems: "center"}}>
              <Image style={{height:32,width:32,marginHorizontal:8}} source={{uri:i.custom_icon??`https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(i.icon)}.png`}} />
              <View style={{flex:1}}>
                <Text allowFontScaling={false} style={{...font("bold"),fontSize:16,color:theme.page_content.fg}}>{i.name}</Text>
                <Text allowFontScaling={false} style={{...font("bold"),fontSize:12,color:theme.page_content.fg}}>{i.category?`#${i.id}`:t(`db:category`)}</Text>
              </View>
              <IconButton size={24} onPress={i.category?()=>navigation.navigate('DBType',{munzee:i.icon}):()=>navigation.navigate('DBCategory',{category:i.id})} icon="chevron-right" color={theme.page_content.fg} />
            </View>)}
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}