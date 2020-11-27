// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from "react";
import { TextInput, Menu, Text } from "react-native-paper";
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { TouchableWithoutFeedback, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const useComponentSize = () => {
  const [size, setSize] = React.useState(null);

  const onLayout = React.useCallback((event: any) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};

export function DropdownItem(props: any) {
  return props;
}

export function Dropdown({
  onValueChange,
  selectedValue,
  style,
  testID,
  enabled,
  mode,
  itemStyle,
  children,
  ...rest
}: any) {
  const [open, setOpen] = React.useState(false);
  const [size, onLayout] = useComponentSize();
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <Menu
      visible={open}
      onDismiss={() => setOpen(false)}
      anchor={
        // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
        <TextInput
          style={style}
          right={
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <TextInput.Icon onPress={() => setOpen(true)} name="chevron-down" />
          }
          mode={mode}
          value={
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'never'.
            [].concat(children).find((i) => i.props.value === selectedValue)
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'never'.
              ?.props.label ?? selectedValue
          }
          disabled={enabled === false}
          editable={false}
          onLayout={onLayout}
          render={({
            style,
            value,
            onLayout
          }: any) => (
            // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
            <TouchableWithoutFeedback
              onPress={enabled === false ? undefined : () => setOpen(true)}
            >
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <View
                style={{ paddingLeft: 14, display: "flex", flexDirection: "row", alignSelf: "stretch", flex: 1, alignItems: "center" }}
                onLayout={onLayout}
              >
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{fontSize:16}}>{value}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          {...rest}
        />
      }
      style={{
        width: size?.width,
      }}
    >
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <ScrollView style={{ maxHeight: 400 }}>
        {[].concat(children).map((item) => (
          // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
          <Menu.Item
            style={itemStyle}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'never'.
            disabled={item.props.value === selectedValue}
            onPress={() => {
              // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'never'.
              onValueChange(item.props.value);
              setOpen(false);
            }}
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'props' does not exist on type 'never'.
            title={item.props.label}
          />
        ))}
      </ScrollView>
    </Menu>
  );
}
