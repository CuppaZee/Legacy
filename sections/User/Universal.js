import * as React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Button, Dialog, Portal, TextInput } from 'react-native-paper';
import { useSelector } from 'react-redux';
import font from 'sections/Shared/font';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import getIcon from 'utils/db/icon';

export default function UniversalCapScreen({ navigation, route }) {
  var { t } = useTranslation();
  var [index, setIndex] = React.useState(0);
  var [submit, setSubmit] = React.useState(false);
  var [code, setCode] = React.useState("");
  var [runSubmit, setRunSubmit] = React.useState(false);
  var theme = useSelector(i => i.themes[i.theme])
  var username = route.params.username;
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: i => i?.user_id
  })
  const { data: submitted, status: submittedStatus } = useAPIRequest(runSubmit ? {
    endpoint: 'user/universal/submit/v1',
    data: {
      code: runSubmit
    },
    cuppazee: true
  } : null, true)
  var { data, status } = useAPIRequest(user_id ? {
    endpoint: 'user/universal/v3',
    data: {
      username
    },
    user: user_id,
    cuppazee: true
  } : null, true)
  var qr = data?.munzees[index];
  var watch = useAPIRequest(qr?.munzee_id ? {
    endpoint: 'user/universal/watch/v1',
    data: {
      user_id,
      munzee_id: Number(qr.munzee_id)
    },
    cuppazee: true
  } : null)
  React.useEffect(() => {
    if (watch) setIndex(index + 1);
  }, [watch])
  function report() {
    setRunReport(qr);
    setIndex(index + 1);
  }
  var [runReport, setRunReport] = React.useState(false);
  var reportData = useAPIRequest(runReport ? {
    endpoint: 'user/universal/report/v1',
    data: {
      report: JSON.stringify(runReport, null, 2)
    },
    cuppazee: true
  } : null)
  if (status) {
    if (status === "loading") {
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
        <ActivityIndicator size="large" color={theme.page.fg} />
      </View>
    } else {
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
        <MaterialCommunityIcons name="alert" color={theme.page.fg} size={48} />
        <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), textAlign: "center", color: theme.page_content.fg }}>{t('error:' + status)}</Text>
      </View>
    }
  } else if (data === null) {
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
      <MaterialCommunityIcons name="alert" color={theme.page.fg} size={48} />
      <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), textAlign: "center", color: theme.page_content.fg }}>{t('error:missing_data.locked')}</Text>
    </View>
  }
  return (
    <View style={{ flex: 1, backgroundColor: theme.page.bg, alignItems: "center", justifyContent: "center", padding: 8 }}>
      <View style={{ flex: 1, padding: 8 }}>
        <Text style={{ color: theme.page.fg, textAlign: "center", fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>{data.total - (data.capped + index)}</Text> remaining of <Text style={{ fontWeight: "bold" }}>{data.total}</Text></Text>
      </View>
      {(data.munzees.length > 0 && qr) ? <>
        <QRCode
          size={200}
          value={`https://www.munzee.com/m/${qr.munzee}/`}
          color={theme.page.fg}
          backgroundColor={theme.page.bg}
          logo={getIcon(qr.type.icon)}
          logoSize={80}
        />
        <Text style={{ color: theme.page.fg, fontSize: 16, fontWeight: "bold" }}>/m/{qr.munzee?.slice(0, -7)}</Text>
        <Button style={{ marginVertical: 4 }} mode="contained" onPress={() => setIndex(index + 1)} icon="chevron-right">Next</Button>
        <Button mode="contained" onPress={() => report()} icon="alert">Report</Button>
      </> : <>
          <MaterialCommunityIcons name="gauge-empty" color={theme.page.fg} size={48} />
          <Text style={{ color: theme.page.fg }}>You've run out of Universals to capture.</Text>
        </>}
      <View style={{ flex: 1 }}></View>
      <Button onPress={() => { setRunSubmit(false); setSubmit(true) }} mode="contained" icon="upload">Submit your Universal</Button>
      <Portal>
        <Dialog
          visible={submit}
          onDismiss={() => { setSubmit(false) }}
          style={{ maxWidth: "100%", width: 600, alignSelf: "center", borderRadius: 8, backgroundColor: theme.page_content.bg }}>

          {runSubmit ? (submittedStatus ? (submittedStatus === "loading" ? <>
            <Text style={{ color: theme.page.fg, textAlign: "center", fontSize: 16 }}>Submitting...</Text>
          </> : <>
              <Text style={{ color: theme.page.fg, textAlign: "center", fontSize: 16 }}>An error occurred submitting that Munzee. Is it a valid Barcode Value?</Text>
            </>) : <>
              <Text style={{ color: theme.page.fg, textAlign: "center", fontSize: 16 }}>{submitted === true ? "Submitted!" : submitted}</Text>
              <Button onPress={() => { setRunSubmit(false); setCode(""); setSubmit(true) }} mode="contained" icon="upload">Submit Another</Button>
            </>) : <>
              <View style={{ padding: 4 }}>
                <TextInput
                  mode="outlined"
                  label="Munzee Print Code"
                  value={code}
                  onChangeText={code => setCode(code)}
                />
                <Text style={{ color: theme.page_content.fg }}>This is the "Barcode Value" on the Munzee's Print Page.</Text>
              </View>
              <View style={{ padding: 4 }}>
                <Button onPress={() => setRunSubmit(code)} mode="contained" icon="upload">Submit</Button>
              </View>
            </>}
        </Dialog>
      </Portal>
    </View>
  );
}