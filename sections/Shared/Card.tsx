// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
import { TouchableRipple, Surface } from 'react-native-paper';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';

export default function (props: any) {
  var theme = useSelector((i: any) => i.themes[i.theme]);
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <TouchableRipple rippleColor="rgba(0, 0, 0, .32)" style={{ flex: props.noFlex===undefined?1:null, borderRadius: 8 }} onPress={props.onPress}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Surface style={{ elevation: 4 }}>
        {/* style={{ ...(theme.page_content.border?{borderWidth:1,borderColor:theme.page_content.border}:{}), flex: props.noFlex===undefined?1:null, elevation: theme.page_content.border?0:4, padding: props.noPad === undefined ? 8 : 0, borderRadius: 8, backgroundColor: theme.page_content.bg, ...(props.cardStyle||{}) }}> */}
        {props.children}
      </Surface>
    </TouchableRipple>
  )
}