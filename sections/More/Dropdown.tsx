
import * as React from "react";
import { TextInput, Menu, Text } from "react-native-paper";

import { TouchableWithoutFeedback, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const useComponentSize = () => {
  const [size, setSize] = React.useState(null);

  const onLayout = React.useCallback((event: any) => {
    const { width, height } = event.nativeEvent.layout;


    // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ width: any; height: any; }' is... Remove this comment to see the full error message
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


        // @ts-expect-error ts-migrate(2339) FIXME: Property 'width' does not exist on type '(event: a... Remove this comment to see the full error message
        width: size?.width,
      }}
    >



      <ScrollView style={{ maxHeight: 400 }}>
        {[].concat(children).map((item) => (



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
