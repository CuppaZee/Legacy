import * as React from 'react';
import { Text, View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useSelector } from 'react-redux';
import InventoryItem from './Item'
import useMoment from 'utils/hooks/useMoment';
import font from 'sections/Shared/font';
import Card from 'sections/Shared/Card';
import getIcon from 'utils/db/icon';

export default function ListItem({ i }) {
  var moment = useMoment();
  var theme = useSelector(i => i.themes[i.theme]);
  return <View style={{ padding: 4, width: 400, flexGrow: 1, maxWidth: "100%" }}>
    <Card noPad>
      <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          {i.clan && <MaterialCommunityIcons name="shield-outline" size={24} color={theme.page_content.fg} />}
          {i.title.match(/freeze tag store/i) && <MaterialCommunityIcons name="cart-outline" size={24} color={theme.page_content.fg} />}
          {i.title.match(/premium/i) && <MaterialCommunityIcons name="star-outline" size={24} color={theme.page_content.fg} />}
          {i.title.match(/zeeops/i) && <MaterialCommunityIcons name="briefcase-outline" size={24} color={theme.page_content.fg} />}
          {i.title.match(/munzee\s*support/i) && <MaterialCommunityIcons name="heart-outline" size={24} color={theme.page_content.fg} />}
          {i.title.match(/\btest\b/i) && <MaterialCommunityIcons name="briefcase-outline" size={24} color={theme.page_content.fg} />}

          {i.title.match(/giveaway/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('theunicorn_full')} />}
          {i.title.match(/magnetus/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('magnetus')} />}
          {i.title.match(/prize\s*wheel/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('prizewheel')} />}
          {i.title.match(/pimedus/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('pimedus')} />}
          {i.title.match(/space\s*coast/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('https://server.cuppazee.app/spacecoastgeostore.png')} />}
          <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 20, ...font("bold"), marginLeft: 4 }}>
            {i.short_title || i.title}
          </Text>
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, fontWeight: "bold", marginLeft: 4 }}>
            {moment(i.time).format('L LT')}
          </Text>
        </View>
        {i.short_title && <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
          <Text allowFontScaling={false} style={{ color: theme.page_content.fg, fontSize: 16, marginLeft: 4 }}>
            {i.title}
          </Text>
        </View>}
        <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
          {
            i.items?.map(i => <InventoryItem key={i.icon} theme={theme} i={i} />)
          }
        </View>
      </View>
    </Card>
  </View>
}