
import * as React from 'react';

import { Text, View, ScrollView, Image } from 'react-native';

import { useSelector, useDispatch } from "react-redux";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types.json' or its co... Remove this comment to see the full error message
import types from 'utils/db/types.json';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types' or its corresp... Remove this comment to see the full error message
import getType from 'utils/db/types';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/categories.json' or i... Remove this comment to see the full error message
import categories from 'utils/db/categories.json';
import { TouchableRipple, Chip } from 'react-native-paper';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';

function u(str = "") {
  return (str[0]||"").toUpperCase() + str.slice(1)
}

function CustomChip({
  label,
  onPress
}: any) {
  return <Chip style={{margin:4}} mode="outlined" textStyle={font()} onPress={onPress}>{label}</Chip>
}

function getCategory(id: any) {
  var cat = categories.find((i: any) => i.id==id) || {};
  return cat.name;
}

function checkCanHost(i: any) {
  return types.find((x: any) => x.id==i)?.bouncer?.type!=="seasonal"
    || (
      categories.find((y: any) => y.id==types.find((x: any) => x.id==i)?.category)?.seasonal
      && categories.find((y: any) => y.id==types.find((x: any) => x.id==i)?.category)?.seasonal?.ends>=Date.now()
      && categories.find((y: any) => y.id==types.find((x: any) => x.id==i)?.category)?.seasonal?.starts<=Date.now()
    );
}

function possibleTypes(list: any) {
  if(!list) return null;
  var l = list.map((i: any) => types.find((x: any) => x.id==i)).filter((i: any) => !i.hidden);
  var hosts = new Set();
  for(var type of l) {
    for(var host of type.bouncer?.lands_on||[]) hosts.add(host);
  }
  return Array.from(hosts);
}

function possibleHosts(list: any) {
  if(!list) return null;
  var l = list.map((i: any) => types.find((x: any) => x.id==i)).filter((i: any) => !i.hidden);
  var hosts = new Set();
  for(var type of l) {
    for(var host of types.filter((i: any) => i.host&&i.host.hosts&&i.host.hosts.includes(type.id))) hosts.add(host.id);
  }
  return Array.from(hosts);
}

export default function SettingsScreen() {
  var {t} = useTranslation()
  var moment = useMoment();
  var route = useRoute();
  // @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'.
  var munzee_icon = route.params.munzee;
  var munzee = getType(munzee_icon);
  var theme = useSelector((i: any) => i.themes[i.theme]);
  var nav = useNavigation();
  if(!munzee) return null;
  return (
    <ScrollView style={{ backgroundColor: theme.page_content.bg }} contentContainerStyle={{padding:8}}>
      <View style={{alignItems:"center"}}>
        <Image source={getIcon(munzee.icon)} style={{height:48,width:48}} />
        <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:24,...font("bold")}}>{munzee.name}</Text>
        <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:20,...font("bold")}}>{t('db:type.info',{icon: munzee.icon, id: munzee.id})}</Text>
      </View>
      <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
        {munzee.state!="bouncer"&&<CustomChip label={`${u(munzee.state)}`}/>}
        {munzee.card&&<CustomChip label={`${u(munzee.card)} Edition`}/>}
        {munzee.bouncer&&<CustomChip label="Bouncer"/>}
        {munzee.host&&<CustomChip label="Bouncer Host"/>}
        {munzee.elemental&&<CustomChip label="Elemental"/>}
        {munzee.event=="custom"&&<CustomChip label="Custom Event"/>}
        {munzee.unique&&<CustomChip label="Unique"/>}
        {munzee.destination?.max_rooms&&<CustomChip label={`${munzee.destination?.max_rooms} Rooms`}/>}
        <CustomChip onPress={()=>nav.navigate('DBCategory',{category:munzee.category})} label={`Category: ${getCategory(munzee.category)}`}/>
        {munzee.virtual_colors?.map((i: any) => <CustomChip label={`Virtual Color: ${u(i)}`}/>)}
      </View>
      {categories.find((i: any) => i.id==munzee.category)?.seasonal&&<View style={{alignItems:"center"}}>
        <Text allowFontScaling={false} style={{color:theme.page_content.fg}}>{moment(categories.find((i: any) => i.id==munzee.category).seasonal.starts).format('L LT')} - {moment(categories.find((i: any) => i.id==munzee.category).seasonal.ends).format('L LT')}</Text>
        <Text allowFontScaling={false} style={{color:theme.page_content.fg}}>{t('bouncers:duration',{duration:moment.duration(moment(categories.find((i: any) => i.id==munzee.category).seasonal.starts).diff(moment(categories.find((i: any) => i.id==munzee.category).seasonal.ends))).humanize()})}</Text>
      </View>}

      {/* Points */}
      {munzee.points&&<>
        <View style={{height:1,backgroundColor:theme.page_content.fg,opacity:0.5,margin:8}}></View>
        <View style={{alignItems:"center"}}>
          <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:24,...font("bold")}}>{t('db:type.points')}</Text>
        </View>
        <View style={{flexDirection: "row", flexWrap: "wrap", justifyContent: "center"}}>
          {munzee.points.deploy!==undefined&&<View style={{alignItems:"center",padding:4,width:100}}>
            <MaterialCommunityIcons name="account" size={32} color={theme.page_content.fg} />
            <Text allowFontScaling={false} numberOfLines={1} style={{color: theme.page_content.fg,lineHeight:16,fontSize:16,...font("bold")}}>{munzee.points.deploy}</Text>
            <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:12,...font()}}>{t('db:type.deploy')}</Text>
          </View>}
          {!munzee.points.type&&<>
            <View style={{alignItems:"center",padding:4,width:100}}>
              <MaterialCommunityIcons name="check" size={32} color={theme.page_content.fg} />
              <Text allowFontScaling={false} numberOfLines={1} style={{color: theme.page_content.fg,lineHeight:16,fontSize:16,...font("bold")}}>{munzee.points.capture}</Text>
              <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:12,...font()}}>{t('db:type.capture')}</Text>
            </View>
            <View style={{alignItems:"center",padding:4,width:100}}>
              <MaterialCommunityIcons name="open-in-app" size={32} color={theme.page_content.fg} />
              <Text allowFontScaling={false} numberOfLines={1} style={{color: theme.page_content.fg,lineHeight:16,fontSize:16,...font("bold")}}>{munzee.points.capon}</Text>
              <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:12,...font()}}>{t('db:type.capon')}</Text>
            </View>
          </>}
          {munzee.points.type=="split"&&<View style={{alignItems:"center",padding:4,width:100}}>
            <MaterialCommunityIcons name="call-split" size={32} color={theme.page_content.fg} />
            <Text allowFontScaling={false} numberOfLines={1} style={{color: theme.page_content.fg,lineHeight:16,fontSize:16,...font("bold")}}>{t('db:type.split_val',munzee.points)}</Text>
            <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:12,...font()}}>{t('db:type.split')}</Text>
          </View>}
        </View>
      </>}

      {/* Evo Stages */}
      {munzee.evolution&&<>
        <View style={{height:1,backgroundColor:theme.page_content.fg,opacity:0.5,margin:8}}></View>
        <View style={{alignItems:"center"}}>
          <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:24,...font("bold")}}>{t('db:type.evo')}</Text>
        </View>
        <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
          {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'push' does not exist on type 'Navigation... Remove this comment to see the full error message */}
          {types.filter((i: any) => i.evolution?.base===munzee.evolution.base).sort((a: any,b: any)=>a.evolution?.stage-b.evolution?.stage).map((i: any) => <TouchableRipple onPress={()=>nav.push('DBType',{munzee:i.icon})}>
            <View style={{alignItems:"center",padding:4,width:100}}>
              <Image source={getIcon(i.icon)} style={{height:32,width:32}} />
              <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={{color: theme.page_content.fg,fontSize:16,...font("bold")}}>{i.name}</Text>
              <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:16,...font()}}>ID: {i.id}</Text>
            </View>
          </TouchableRipple>)}
        </View>
      </>}

      {/* Pouch Creature Stages */}
      {munzee.bouncer?.base&&<>
        <View style={{height:1,backgroundColor:theme.page_content.fg,opacity:0.5,margin:8}}></View>
        <View style={{alignItems:"center"}}>
          <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:24,...font("bold")}}>{t('db:type.pouch')}</Text>
        </View>
        <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
          {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'push' does not exist on type 'Navigation... Remove this comment to see the full error message */}
          {types.filter((i: any) => i.bouncer?.base===munzee.bouncer.base).sort((a: any,b: any)=>a.bouncer?.stage-b.bouncer?.stage).map((i: any) => <TouchableRipple onPress={()=>nav.push('DBType',{munzee:i.icon})}>
            <View style={{alignItems:"center",padding:4,width:100}}>
              <Image source={getIcon(i.icon)} style={{height:32,width:32}} />
              <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={{color: theme.page_content.fg,fontSize:16,...font("bold")}}>{i.name}</Text>
              <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:16,...font()}}>ID: {i.id}</Text>
            </View>
          </TouchableRipple>)}
        </View>
      </>}

      {/* Can Host */}
      {munzee.can_host?.filter?.(checkCanHost)?.length>0&&<>
        <View style={{height:1,backgroundColor:theme.page_content.fg,opacity:0.5,margin:8}}></View>
        <View style={{alignItems:"center"}}>
          <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:24,...font("bold")}}>{t('db:type.can_host')}</Text>
        </View>
        <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
          {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'push' does not exist on type 'Navigation... Remove this comment to see the full error message */}
          {munzee.can_host.filter(checkCanHost).map((i: any) => types.find((x: any) => x.id==i)).filter((i: any) => !i.hidden).map((i: any) => <TouchableRipple onPress={()=>nav.push('DBType',{munzee:i.icon})}>
            <View style={{alignItems:"center",padding:4,width:100}}>
              <Image source={getIcon(i.icon)} style={{height:32,width:32}} />
              <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={{color: theme.page_content.fg,fontSize:16,...font("bold")}}>{i.name}</Text>
              <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:16,...font()}}>ID: {i.id}</Text>
            </View>
          </TouchableRipple>)}
        </View>
      </>}

      {/* Lands On */}
      {munzee?.bouncer?.lands_on&&<>
        <View style={{height:1,backgroundColor:theme.page_content.fg,opacity:0.5,margin:8}}></View>
        <View style={{alignItems:"center"}}>
          <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:24,...font("bold")}}>{t('db:type.lands_on')}</Text>
        </View>
        <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
          {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'push' does not exist on type 'Navigation... Remove this comment to see the full error message */}
          {munzee.bouncer.lands_on.map((i: any) => types.find((x: any) => x.id==i)).filter((i: any) => !i.hidden).map((i: any) => <TouchableRipple onPress={()=>nav.push('DBType',{munzee:i.icon})}>
            <View style={{alignItems:"center",padding:4,width:100}}>
              <Image source={getIcon(i.icon)} style={{height:32,width:32}} />
              <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={{color: theme.page_content.fg,fontSize:16,...font("bold")}}>{i.name}</Text>
              <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:16,...font()}}>ID: {i.id}</Text>
            </View>
          </TouchableRipple>)}
        </View>
      </>}

      {/* Host Types */}
      {types.filter((i: any) => i.host&&i.host.hosts&&i.host.hosts.includes(munzee.id)).length>0&&<>
        <View style={{height:1,backgroundColor:theme.page_content.fg,opacity:0.5,margin:8}}></View>
        <View style={{alignItems:"center"}}>
          <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:24,...font("bold")}}>{t('db:type.host_types')}</Text>
        </View>
        <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
          {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'push' does not exist on type 'Navigation... Remove this comment to see the full error message */}
          {types.filter((i: any) => i.host&&i.host.hosts&&i.host.hosts.includes(munzee.id)).filter((i: any) => !i.hidden).map((i: any) => <TouchableRipple onPress={()=>nav.push('DBType',{munzee:i.icon})}>
            <View style={{alignItems:"center",padding:4,width:100}}>
              <Image source={getIcon(i.icon)} style={{height:32,width:32}} />
              <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={{color: theme.page_content.fg,fontSize:16,...font("bold")}}>{i.name}</Text>
              <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:16,...font()}}>ID: {i.id}</Text>
            </View>
          </TouchableRipple>)}
        </View>
      </>}

      {/* Hosts */}
      {munzee?.host?.hosts&&<>
        <View style={{height:1,backgroundColor:theme.page_content.fg,opacity:0.5,margin:8}}></View>
        <View style={{alignItems:"center"}}>
          <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:24,...font("bold")}}>{t('db:type.hosts')}</Text>
        </View>
        <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
          {/* @ts-expect-error ts-migrate(2339) FIXME: Property 'push' does not exist on type 'Navigation... Remove this comment to see the full error message */}
          {munzee.host.hosts.map((i: any) => types.find((x: any) => x.id==i)).filter((i: any) => !i.hidden).map((i: any) => <TouchableRipple onPress={()=>nav.push('DBType',{munzee:i.icon})}>
            <View style={{alignItems:"center",padding:4,width:100}}>
              <Image source={getIcon(i.icon)} style={{height:32,width:32}} />
              <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={{color: theme.page_content.fg,fontSize:16,...font("bold")}}>{i.name}</Text>
              <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:16,...font()}}>ID: {i.id}</Text>
            </View>
          </TouchableRipple>)}
        </View>
      </>}

      {/* Possible Types */}
      {munzee?.host?.hosts&&possibleTypes(munzee?.host?.hosts)&&<>
        <View style={{height:1,backgroundColor:theme.page_content.fg,opacity:0.5,margin:8}}></View>
        <View style={{alignItems:"center"}}>
          <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:24,...font("bold")}}>{t('db:type.possible_types')}</Text>
        </View>
        <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
          {/* @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'. */}
          {possibleTypes(munzee?.host?.hosts).map(i=>types.find((x: any) => x.id==i)).filter(i=>!i.hidden&&i.state==munzee?.state).map(i=><TouchableRipple onPress={()=>nav.push('DBType',{munzee:i.icon})}>
            <View style={{alignItems:"center",padding:4,width:100}}>
              <Image source={getIcon(i.icon)} style={{height:32,width:32}} />
              <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={{color: theme.page_content.fg,fontSize:16,...font("bold")}}>{i.name}</Text>
              <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:16,...font()}}>ID: {i.id}</Text>
            </View>
          </TouchableRipple>)}
        </View>
      </>}

      {/* Possible Hosts */}
      {munzee?.can_host&&possibleHosts(munzee?.can_host)&&<>
        <View style={{height:1,backgroundColor:theme.page_content.fg,opacity:0.5,margin:8}}></View>
        <View style={{alignItems:"center"}}>
          <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:24,...font("bold")}}>{t('db:type.possible_hosts')}</Text>
        </View>
        <View style={{flexDirection:"row",flexWrap:"wrap",justifyContent:"center"}}>
          {/* @ts-expect-error ts-migrate(2531) FIXME: Object is possibly 'null'. */}
          {possibleHosts(munzee.can_host).map(i=>types.find((x: any) => x.id==i)).filter(i=>!i.hidden&&i.state==munzee?.state).map(i=><TouchableRipple onPress={()=>nav.push('DBType',{munzee:i.icon})}>
            <View style={{alignItems:"center",padding:4,width:100}}>
              <Image source={getIcon(i.icon)} style={{height:32,width:32}} />
              <Text allowFontScaling={false} numberOfLines={1} ellipsizeMode="tail" style={{color: theme.page_content.fg,fontSize:16,...font("bold")}}>{i.name}</Text>
              <Text allowFontScaling={false} style={{color: theme.page_content.fg,fontSize:16,...font()}}>ID: {i.id}</Text>
            </View>
          </TouchableRipple>)}
        </View>
      </>}
    </ScrollView>
  );
}