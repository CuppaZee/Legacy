import * as React from "react";
import { TextInput, Menu, Text } from "react-native-paper";
import { TouchableWithoutFeedback, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const useComponentSize = () => {
  const [size, setSize] = React.useState(null);

  const onLayout = React.useCallback((event) => {
    const { width, height } = event.nativeEvent.layout;
    setSize({ width, height });
  }, []);

  return [size, onLayout];
};

export function DropdownItem(props) {
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
}) {
  const [open, setOpen] = React.useState(false);
  const [size, onLayout] = useComponentSize();
  return (
    <Menu
      visible={open}
      onDismiss={() => setOpen(false)}
      anchor={
        <TextInput
          style={style}
          right={
            <TextInput.Icon onPress={() => setOpen(true)} name="chevron-down" />
          }
          mode={mode}
          value={
            [].concat(children).find((i) => i.props.value === selectedValue)
              ?.props.label ?? selectedValue
          }
          disabled={enabled === false}
          editable={false}
          onLayout={onLayout}
          render={({ style, value, onLayout }) => (
            <TouchableWithoutFeedback
              onPress={enabled === false ? undefined : () => setOpen(true)}
            >
              <View
                style={{ paddingLeft: 14, display: "flex", flexDirection: "row", alignSelf: "stretch", flex: 1, alignItems: "center" }}
                onLayout={onLayout}
              >
                <Text style={{fontSize:16}}>{value}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
          {...rest}
        />
      }
      style={{
        marginTop: size?.height,
        width: size?.width,
      }}
    >
      <ScrollView style={{ maxHeight: 400 }}>
        {[].concat(children).map((item) => (
          <Menu.Item
            style={itemStyle}
            disabled={item.props.value === selectedValue}
            onPress={() => {
              onValueChange(item.props.value);
              setOpen(false);
            }}
            title={item.props.label}
          />
        ))}
      </ScrollView>
    </Menu>
  );
}
