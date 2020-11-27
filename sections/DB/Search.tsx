// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, TextInput, Image, ScrollView } from 'react-native';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/Card' or its c... Remove this comment to see the full error message
import Card from 'sections/Shared/Card';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
import Fuse from 'fuse.js'
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module 'utils/db/types.json'. Consider... Remove this comment to see the full error message
import types from 'utils/db/types.json';
// @ts-expect-error ts-migrate(2732) FIXME: Cannot find module 'utils/db/categories.json'. Con... Remove this comment to see the full error message
import categories from 'utils/db/categories.json';
import { useTranslation } from 'react-i18next';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableRipple } from 'react-native-paper';

const options = {
  includeScore: true,
  keys: ['name', 'id', 'category']
}
const fuse = new Fuse([...types.filter((i: any) => !i.hidden), ...categories.filter((i: any) => !i.hidden)], options)

export default function SearchScreen({
  navigation
}: any) {
  var { t } = useTranslation()
  var theme = useSelector((i: any) => i.themes[i.theme])
  var input = React.useRef();
  var [value, setValue] = React.useState('');
  var [search, setSearch] = React.useState('');
  var [timeoutC, setTimeoutC] = React.useState(null);
  function onValue(val: any) {
    if (timeoutC) clearTimeout(timeoutC)
    setValue(val);
    setTimeoutC(setTimeout(() => {
      return setSearch(val);
    }, 500))
  }
  var list = search.length >= 3 ? fuse.search(search) : [];
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <ScrollView
      contentContainerStyle={{ width: 600, maxWidth: "100%", alignItems: "stretch", flexDirection: "column", alignSelf: "center", padding: 4 }}
      style={{ flex: 1, backgroundColor: theme.page.bg }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ padding: 4, width: "100%" }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Card noPad cardStyle={{ flexDirection: "row", backgroundColor: "#fff", alignItems: "stretch" }}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <TextInput
            onSubmitEditing={() => setSearch(value)}
            ref={input}
            style={{ paddingHorizontal: 8, flex: 1, borderRadius: 8, borderBottomLeftRadius: 8, height: 40 }}
            onChangeText={onValue}
            value={value}
            returnKeyType="search"
          />
        </Card>
      </View>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ padding: 4 }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Card noPad>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <View>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {search.length < 3 && <Text allowFontScaling={false} style={{ textAlign: "center", ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{t('search:type')}</Text>}
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            {search.length >= 3 && list.length === 0 && <Text allowFontScaling={false} style={{ textAlign: "center", ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>No Results {":("}</Text>}
            {
              (search.length < 3 ?
                categories.filter((i: any) => i.parents.includes('root')).filter((i: any) => !i.hidden).map((i: any) => ({
                  item: i
                })) :
                list.slice(0, 20))
                // @ts-expect-error ts-migrate(7031) FIXME: Binding element 'i' implicitly has an 'any' type.
                .map(({ item: i }) => <TouchableRipple key={i.id} onPress={i.category ? () => navigation.navigate('DBType', { munzee: i.icon }) : () => navigation.navigate('DBCategory', { category: i.id })}>
                  {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                  <View style={{ padding: 8, flexDirection: "row", alignItems: "center" }}>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <Image style={{ height: 32, width: 32, marginHorizontal: 4 }} source={getIcon(i.custom_icon ?? i.icon)} />
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <View style={{ flex: 1 }}>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 16, color: theme.page_content.fg }}>{i.name}</Text>
                      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                      <Text allowFontScaling={false} style={{ ...font("bold"), fontSize: 12, color: theme.page_content.fg }}>{i.category ? `#${i.id}` : t(`db:category`)}</Text>
                    </View>
                    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                    <MaterialCommunityIcons size={24} name="chevron-right" color={theme.page_content.fg} />
                  </View>
                </TouchableRipple>)
            }
          </View>
        </Card>
      </View>
    </ScrollView>
  );
}