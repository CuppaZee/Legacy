
import * as React from 'react';

import { Text, View, Image, ScrollView } from 'react-native';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';

import { useSelector } from 'react-redux';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';



import { Dropdown, DropdownItem } from '../More/Dropdown';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';
import { useTranslation } from 'react-i18next';



// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';




// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/DatePicker' or... Remove this comment to see the full error message
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

export default function EvoPlannerScreen({
  navigation
}: any) {
  var { t } = useTranslation();
  var moment = useMoment();
  var theme = useSelector((i: any) => i.themes[i.theme])
  var [date, setDate] = React.useState(moment());
  var [option, setOption] = React.useState(options[0].id);
  return (



    <ScrollView
      contentContainerStyle={{ width: 400, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>



      <View style={{ padding: 4 }}>



        <DatePicker value={date} onChange={setDate} />
      </View>




      <View style={{ padding: 4 }}>



        <Dropdown dense={true} mode="outlined" selectedValue={option} onValueChange={setOption}>



          {options.map(i=><DropdownItem label={t(`evo_planner:types.${i.id}`)} value={i.id} />)}
        </Dropdown>
      </View>



      {/* @ts-expect-error ts-migrate(2532) FIXME: Object is possibly 'undefined'. */}
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