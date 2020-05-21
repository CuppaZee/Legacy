import * as React from 'react';
import { Text, View, ScrollView, Image } from 'react-native';
import { useSelector, useDispatch } from "react-redux";
import types from './types.json';
import { TouchableRipple } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import font from '~sections/Shared/font';

function g(icon) {
  return icon.replace(/_/g,'').replace(/munzee$/g,'');
}
function u(str) {
  return str[0].toUpperCase() + str.slice(1)
}

function Chip({label}) {
  return <View style={{padding:4,margin:4,borderRadius:4,backgroundColor:'white',borderWidth:1,borderColor:"black"}}>
    <Text style={{color:'black'}}>{label}</Text>
  </View>
}

export default function SettingsScreen() {
  var route = useRoute();
  var munzee_icon = route.params.munzee;
  var munzee = types.find(i=>g(i.icon)==g(munzee_icon));
  var theme = useSelector(i=>i.themes[i.theme]);
  var nav = useNavigation();
  if(!munzee) return null;
  return (
    <ScrollView style={{ backgroundColor: theme.page_content.bg }} contentContainerStyle={{padding:8}}>
      <View style={{alignItems:"center"}}>
        <Image source={{uri:`https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(munzee.icon)}.png`}} style={{height:48,width:48}} />
        <Text style={{color: theme.page_content.fg,fontSize:24,...font("bold")}}>{munzee.name}</Text>
        <Text style={{color: theme.page_content.fg,fontSize:20,...font("bold")}}>Icon: {munzee.icon} - ID: {munzee.id}</Text>
      </View>
      <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
        {munzee.state!="bouncer"&&<Chip label={`${u(munzee.state)}`}/>}
        {munzee.card&&<Chip label={`${u(munzee.card)} Edition`}/>}
        {munzee.bouncer&&<Chip label="Bouncer"/>}
        {munzee.host&&<Chip label="Bouncer Host"/>}
        {munzee.elemental&&<Chip label="Elemental"/>}
        {munzee.event=="custom"&&<Chip label="Custom Event"/>}
        {munzee.unique&&<Chip label="Unique"/>}
        {munzee.destination?.max_rooms&&<Chip label={`${munzee.destination?.max_rooms} Rooms`}/>}
        {/* {munzee.bouncer?.type=="nomad"&&<Chip label="Nomad"/>}
        {munzee.bouncer?.type=="pouch"&&<Chip label="Pouch Creature"/>}
        {munzee.bouncer?.type=="myth"&&<Chip label="Mythological"/>} */}
        <Chip label={`Category: ${u(munzee.category)}`}/>
        {munzee.virtual_colors?.map(i=><Chip label={`Virtual Color: ${u(i)}`}/>)}
      </View>
      {munzee.can_host&&<>
        <View style={{height:1,backgroundColor:theme.page_content.fg,opacity:0.5,margin:8}}></View>
        <View style={{alignItems:"center"}}>
          <Text style={{color: theme.page_content.fg,fontSize:24,...font("bold")}}>Can Host</Text>
        </View>
        <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
          {munzee.can_host.map(i=>types.find(x=>x.id==i)).map(i=><TouchableRipple onPress={()=>nav.push('DBType',{munzee:i.icon})}>
            <View style={{alignItems:"center",padding:4,width:100}}>
              <Image source={{uri:`https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(i.icon)}.png`}} style={{height:32,width:32}} />
              <Text numberOfLines={1} ellipsizeMode="tail" style={{color: theme.page_content.fg,fontSize:16,...font("bold")}}>{i.name}</Text>
              <Text style={{color: theme.page_content.fg,fontSize:16,...font()}}>ID: {i.id}</Text>
            </View>
          </TouchableRipple>)}
        </View>
      </>}
      {munzee?.bouncer?.lands_on&&<>
        <View style={{height:1,backgroundColor:theme.page_content.fg,opacity:0.5,margin:8}}></View>
        <View style={{alignItems:"center"}}>
          <Text style={{color: theme.page_content.fg,fontSize:24,...font("bold")}}>Lands On</Text>
        </View>
        <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
          {munzee.bouncer.lands_on.map(i=>types.find(x=>x.id==i)).map(i=><TouchableRipple onPress={()=>nav.push('DBType',{munzee:i.icon})}>
            <View style={{alignItems:"center",padding:4,width:100}}>
              <Image source={{uri:`https://munzee.global.ssl.fastly.net/images/pins/${encodeURIComponent(i.icon)}.png`}} style={{height:32,width:32}} />
              <Text numberOfLines={1} ellipsizeMode="tail" style={{color: theme.page_content.fg,fontSize:16,...font("bold")}}>{i.name}</Text>
              <Text style={{color: theme.page_content.fg,fontSize:16,...font()}}>ID: {i.id}</Text>
            </View>
          </TouchableRipple>)}
        </View>
      </>}
      {/* <View style={{height:1,backgroundColor:theme.page_content.fg,opacity:0.5,margin:8}}></View>
      <View style={{alignItems:"center"}}>
        <Text style={{color: theme.page_content.fg,fontSize:24,...font("bold")}}>Credits</Text>
      </View>
      <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
        {credits.filter(i=>i.type=="dev").map(i=><TouchableRipple onPress={()=>nav.navigate('UserDetails',{userid:i.user_id})}>
          <View style={{alignItems:"center",padding:4,width:160}}>
            <Image source={{uri:`https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png`}} style={{backgroundColor:"white",height:48,width:48,borderRadius:24}} />
            <Text style={{color: theme.page_content.fg,fontSize:20,...font("bold")}}>{i.username}</Text>
            <Text style={{color: theme.page_content.fg,fontSize:16,...font()}}>{i.title}</Text>
          </View>
        </TouchableRipple>)}
      </View>
      <View style={{height:1,backgroundColor:theme.page_content.fg,opacity:0.5,margin:8}}></View>
      <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
        {credits.filter(i=>i.type=="translator").map(i=><TouchableRipple onPress={()=>nav.navigate('UserDetails',{userid:i.user_id})}>
          <View style={{alignItems:"center",padding:4,width:120}}>
            <Image source={{uri:`https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png`}} style={{backgroundColor:"white",height:48,width:48,borderRadius:24}} />
            <Text style={{color: theme.page_content.fg,fontSize:16,...font("bold")}}>{i.username}</Text>
            <Text style={{color: theme.page_content.fg,fontSize:12,...font()}}>{i.title}</Text>
          </View>
        </TouchableRipple>)}
      </View>
      <View style={{height:1,backgroundColor:theme.page_content.fg,opacity:0.5,margin:8}}></View>
      <Text style={{color: theme.page_content.fg,fontSize:20,...font("bold"),textAlign:"center"}}>Patrons and Supporters</Text>
      <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
        {credits.filter(i=>i.type=="supporter").map(i=><TouchableRipple onPress={()=>nav.navigate('UserDetails',{userid:i.user_id})}>
          <View style={{alignItems:"center",padding:4,width:100}}>
            <Image source={{uri:`https://munzee.global.ssl.fastly.net/images/avatars/ua${i.user_id.toString(36)}.png`}} style={{backgroundColor:"white",height:36,width:36,borderRadius:18}} />
            <Text numberOfLines={1} ellipsizeMode='head' style={{color: theme.page_content.fg,fontSize:12,...font("bold")}}>{i.username}</Text>
          </View>
        </TouchableRipple>)}
      </View> */}
    </ScrollView>
  );
}