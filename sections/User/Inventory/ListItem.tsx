
import * as React from 'react';

import { View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import InventoryItem from './Item'
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
import { Surface, Paragraph, Title, useTheme, Subheading } from 'react-native-paper';

export default function ListItem({
  i
}: any) {
  var moment = useMoment();
  var theme = useTheme();
  return (
    <View style={{ padding: 4, width: 400, flexGrow: 1, maxWidth: "100%" }}>
      <Surface>
        <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            {i.clan && <MaterialCommunityIcons name="shield-outline" size={24} color={theme.colors.text} />}
            {i.title.match(/freeze tag store/i) && <MaterialCommunityIcons name="cart-outline" size={24} color={theme.colors.text} />}
            {i.title.match(/premium/i) && <MaterialCommunityIcons name="star-outline" size={24} color={theme.colors.text} />}
            {i.title.match(/zeeops/i) && <MaterialCommunityIcons name="briefcase-outline" size={24} color={theme.colors.text} />}
            {i.title.match(/munzee\s*support/i) && <MaterialCommunityIcons name="heart-outline" size={24} color={theme.colors.text} />}
            {i.title.match(/\btest\b/i) && <MaterialCommunityIcons name="briefcase-outline" size={24} color={theme.colors.text} />}

            {i.title.match(/giveaway/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('theunicorn_full')} />}
            {i.title.match(/magnetus/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('magnetus')} />}
            {i.title.match(/prize\s*wheel/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('prizewheel')} />}
            {i.title.match(/pimedus/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('pimedus')} />}
            {i.title.match(/space\s*coast/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('https://server.cuppazee.app/spacecoastgeostore.png')} />}
            <Title style={{ marginLeft: 4 }}>
              {i.short_title || i.title}
            </Title>
          </View>
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Subheading>
              {moment(i.time).format('L LT')}
            </Subheading>
          </View>
          {i.short_title && <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            <Paragraph>
              {i.title}
            </Paragraph>
          </View>}
          <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
            {
              i.items?.map((i: any) => <InventoryItem key={i.icon} i={i} />)
            }
          </View>
        </View>
      </Surface>
    </View>
  );
}