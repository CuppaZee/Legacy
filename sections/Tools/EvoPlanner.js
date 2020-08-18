import * as React from 'react';
import { Text, View, Image, ScrollView } from 'react-native';
import Card from 'sections/Shared/Card';
import { Button, IconButton, TextInput, Menu, Switch } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { useSelector } from 'react-redux';
import font from 'sections/Shared/font';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import types from 'utils/db/types.json';
import categories from 'utils/db/categories.json';
import useMoment from 'utils/hooks/useMoment';
import { useTranslation } from 'react-i18next';
import getIcon from 'utils/db/icon';

import DatePicker from 'sections/Shared/DatePicker';

const options = [
  {
    id: "original",
    name: "3 Stages (eg. Farm, Education)",
    stages: [
      {
        days: 0,
        icon: 'calf'
      },
      {
        days: 30,
        icon: 'cow'
      },
      {
        days: 60,
        icon: 'milk'
      }
    ]
  },
  {
    id: "nature",
    name: "5 Stages (eg. Carnation, Rose)",
    stages: [
      {
        days: 0,
        icon: 'carnationseed'
      },
      {
        days: 7,
        icon: 'carnationgermination'
      },
      {
        days: 21,
        icon: 'carnationgrowth'
      },
      {
        days: 42,
        icon: 'carnationbud'
      },
      {
        days: 70,
        icon: 'redcarnationblossom'
      }
    ]
  },
  {
    id: "bouncer",
    name: "5 Stages (eg. Butterfly, Turtle)",
    stages: [
      {
        days: 0,
        icon: 'turtleegg'
      },
      {
        days: 4,
        icon: 'turtlehatchling'
      },
      {
        days: 18,
        icon: 'juvenileturtle'
      },
      {
        days: 28,
        icon: 'adultturtle'
      },
      {
        days: 28,
        icon: 'seaturtle'
      }
    ]
  }
]

export default function EvoPlannerScreen({ navigation }) {
  var { t } = useTranslation();
  var moment = useMoment();
  var theme = useSelector(i => i.themes[i.theme])
  var [date, setDate] = React.useState(moment());
  var [option, setOption] = React.useState(options[0].id);
  var [pickerOpen, setPickerOpen] = React.useState(false);
  return (
    <ScrollView
      contentContainerStyle={{ width: 400, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      <View style={{ padding: 4 }}>
        <DatePicker value={date} onChange={setDate} />
      </View>

      <View style={{ padding: 4 }}>
        <Menu
          visible={pickerOpen}
          onDismiss={() => setPickerOpen(false)}
          position="bottom"
          anchor={
            <Button
              mode="contained"
              icon="dna"
              style={theme.page_content.border ? { borderColor: "white", borderWidth: 1 } : {}}
              labelStyle={{ flexDirection: "row" }}
              color={theme.navigation.bg}
              onPress={() => setPickerOpen(true)}
            >
              <Text allowFontScaling={false} style={{ fontSize: 14, textTransform: "none", color: theme.navigation.fg, ...font(), flex: 1, textAlign: "left" }}>{t('evo_planner:types.'+option)}</Text>
              <MaterialCommunityIcons color={theme.navigation.fg} name="chevron-down" size={16} />
            </Button>
          }
          contentStyle={{ backgroundColor: theme.page_content.bg, padding: 0 }}
        >
          {options.map((i, index) => <Menu.Item
            key={index}
            style={{ padding: 4, paddingVertical: 0, fontSize: 14, backgroundColor: theme.page_content.bg }}
            onPress={() => { setOption(i.id); setPickerOpen(false) }}
            title={<Text allowFontScaling={false} style={{ fontSize: 14, ...font(), color: theme.page_content.fg }}>{t(`evo_planner:types.${i.id}`)}</Text>}
          />)}
        </Menu>
      </View>
      {options.find(i => i.id === option).stages.map((i, index) => <View style={{ padding: 4 }}>
        <Card noPad>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View style={{ padding: 8, width: 60, alignItems: "center" }}>
              <Image source={getIcon(i.icon)} style={{ width: 48, height: 48 }} />
            </View>
            <View style={{ padding: 8, paddingLeft: 0, flex: 1, justifyContent: "center" }}>
              <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), color: theme.page_content.fg }} numberOfLines={1} ellipsizeMode={"tail"}>{moment(date).add(i.days, "days").format('L')}</Text>
              <Text allowFontScaling={false} style={{ fontSize: 14, ...font(400), color: theme.page_content.fg, opacity: 1 }}>{t('evo_planner:days',{count:i.days})}</Text>
              <Text allowFontScaling={false} style={{ fontSize: 14, ...font(400), color: theme.page_content.fg, opacity: 1 }}>{t('evo_planner:stage',{n:index+1})}</Text>
            </View>
          </View>
        </Card>
      </View>)}
    </ScrollView>
  );
}