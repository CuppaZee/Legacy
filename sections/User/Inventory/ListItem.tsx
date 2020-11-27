// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { View, Image } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
// @ts-expect-error ts-migrate(6142) FIXME: Module './Item' was resolved to 'C:/Users/samst/De... Remove this comment to see the full error message
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
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ padding: 4, width: 400, flexGrow: 1, maxWidth: "100%" }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Surface>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <View style={{ flexDirection: "column", width: "100%", alignItems: "center", paddingLeft: 8, paddingRight: 8, borderRadius: 0 }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {i.clan && <MaterialCommunityIcons name="shield-outline" size={24} color={theme.colors.text} />}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {i.title.match(/freeze tag store/i) && <MaterialCommunityIcons name="cart-outline" size={24} color={theme.colors.text} />}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {i.title.match(/premium/i) && <MaterialCommunityIcons name="star-outline" size={24} color={theme.colors.text} />}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {i.title.match(/zeeops/i) && <MaterialCommunityIcons name="briefcase-outline" size={24} color={theme.colors.text} />}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {i.title.match(/munzee\s*support/i) && <MaterialCommunityIcons name="heart-outline" size={24} color={theme.colors.text} />}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {i.title.match(/\btest\b/i) && <MaterialCommunityIcons name="briefcase-outline" size={24} color={theme.colors.text} />}

            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {i.title.match(/giveaway/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('theunicorn_full')} />}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {i.title.match(/magnetus/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('magnetus')} />}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {i.title.match(/prize\s*wheel/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('prizewheel')} />}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {i.title.match(/pimedus/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('pimedus')} />}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {i.title.match(/space\s*coast/i) && <Image style={{ height: 24, width: 24 }} source={getIcon('https://server.cuppazee.app/spacecoastgeostore.png')} />}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Title style={{ marginLeft: 4 }}>
              {i.short_title || i.title}
            </Title>
          </View>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Subheading>
              {moment(i.time).format('L LT')}
            </Subheading>
          </View>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {i.short_title && <View style={{ flexDirection: "row", justifyContent: "center", alignItems: "center" }}>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Paragraph>
              {i.title}
            </Paragraph>
          </View>}
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View style={{ flexWrap: "wrap", flexDirection: "row", justifyContent: "center" }}>
            {
              // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
              i.items?.map((i: any) => <InventoryItem key={i.icon} i={i} />)
            }
          </View>
        </View>
      </Surface>
    </View>
  );
}