import * as React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';
import { Button, Dialog, Portal, TextInput, Checkbox, RadioButton } from 'react-native-paper';
import { useSelector } from 'react-redux';
import font from 'sections/Shared/font';
import useAPIRequest from 'utils/hooks/useAPIRequest';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
import getIcon from 'utils/db/icon';
import useMoment from 'utils/hooks/useMoment';

function Report({qr}) {
  var [reportMenu, setReportMenu] = React.useState(false);
  var [reportOption, setReportOption] = React.useState("invalid_secret_code");
  var [reportMessage, setReportMessage] = React.useState("");
  function report(data) {
    setRunReport({qr,data});
  }
  var [runReport, setRunReport] = React.useState(false);
  var { status: reportStatus } = useAPIRequest(runReport ? {
    endpoint: 'user/universal/report/v1',
    data: {
      report: JSON.stringify(runReport, null, 2)
    },
    cuppazee: true
  } : null, true)
  return <>
    <Button onPress={() => setReportMenu(true)} icon="alert">Report as broken</Button>
    <Portal>
        <Dialog visible={reportMenu} onDismiss={()=>setReportMenu(false)}>
          {runReport ? (reportStatus === "loading" ? <Dialog.Title>Reporting...</Dialog.Title> : <>
            <Dialog.Title>{!reportStatus ? "Munzee Reported" : "An error occurred"}</Dialog.Title>
            <Dialog.Actions>
              <Button onPress={()=>{setReportMenu(false);setRunReport(false)}}>Close</Button>
            </Dialog.Actions>
          </>) : <>
            <Dialog.Title>Report Munzee</Dialog.Title>
            <Dialog.Content>
              <RadioButton.Group onValueChange={value => setReportOption(value)} value={reportOption}>
                <RadioButton.Item label="Invalid Secret Code" value="invalid_secret_code" />
                <RadioButton.Item label="Unable to Scan" value="unable_to_scan" />
                <RadioButton.Item label="Other" value="other" />
                {reportOption === "other" && <TextInput label="Report Message" mode="outlined" value={reportMessage} onChangeText={(msg)=>setReportMessage(msg)} />}
              </RadioButton.Group>
              </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={()=>setReportMenu(false)}>Cancel</Button>
              <Button onPress={()=>report(reportOption==="other"?reportMessage:reportOption)}>Report</Button>
            </Dialog.Actions>
          </>}
        </Dialog>
    </Portal>
  </>
}

export default function UniversalCapScreen({ navigation, route }) {
  var moment = useMoment();
  var { t } = useTranslation();
  var [index, setIndex] = React.useState(0);
  var [x, setX] = React.useState(0);
  var [submit, setSubmit] = React.useState(false);
  var [code, setCode] = React.useState("");
  var [runSubmit, setRunSubmit] = React.useState(false);
  var [filter, setFilter] = React.useState({
    "0": false,
    "1": false
  });
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
    endpoint: 'user/universal/v4',
    data: {
      username,
      filter: Object.entries(filter).filter(i=>i[1]).map(i=>i[0]).join(','),
      x
    },
    user: user_id,
    cuppazee: true
  } : null, true)
  var qr = data?.munzees[index];
  var { data: munzee } = useAPIRequest(qr?.munzee_id ? {
    endpoint: 'munzee',
    data: {
      munzee_id: qr.munzee_id
    }
  } : null, true)
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
  React.useEffect(() => {
    setIndex(0)
  }, [data?.cacheID])
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
        {data?.types?.map(i=><View style={{flexDirection:"row", alignItems: "center", width: 200}}>
          <Text style={{ flex: 1, fontWeight: "bold", fontSize: 16 }}>{i.name}</Text>
          <Checkbox.Android status={filter[i.id] ? 'unchecked' : 'checked'} onPress={()=>{
            var update = {};
            update[i.id] = !filter[i.id];
            setFilter({...filter,...update})
            setX(x+1);
          }} />
        </View>)}
      </View>
      {(data?.munzees?.length > 0 && qr) ? <>
        <QRCode
          size={200}
          value={`https://www.munzee.com/m/${qr.munzee}/`}
          color={theme.page.fg}
          backgroundColor={theme.page.bg}
          logo={getIcon(qr.type.icon)}
          logoSize={80}
        />
        <Text style={{ color: theme.page.fg, fontSize: 16, fontWeight: "bold" }}>{munzee?.friendly_name??qr.munzee}</Text>
        <Text style={{ color: theme.page.fg, fontSize: 16 }}>by {munzee?.creator_username??'?'}</Text>
        <Text style={{ color: theme.page.fg, fontSize: 12 }}>Deployed {moment(munzee?.deployed_at).format('L LT')}</Text>
        <Button style={{ marginVertical: 4 }} mode="contained" onPress={() => setIndex(index + 1)} icon="chevron-right">Next</Button>
        <Report qr={qr} />
      </> : <>
          <MaterialCommunityIcons name="gauge-empty" color={theme.page.fg} size={48} />
          <Text style={{ color: theme.page.fg }}>You've run out of Munzees to capture.</Text>
        </>}
      <View style={{ flex: 1 }}></View>
      <Button onPress={() => { setRunSubmit(false); setSubmit(true) }} mode="contained" icon="upload">Submit your Munzee</Button>
      <Portal>
        <Dialog
          visible={submit}
          onDismiss={() => { setSubmit(false) }}
          style={{ maxWidth: "100%", width: 600, alignSelf: "center", borderRadius: 8, backgroundColor: theme.page_content.bg }}>

          {runSubmit ? (submittedStatus ? (submittedStatus === "loading" ? <>
            <Dialog.Title>Submitting...</Dialog.Title>
          </> : <>
              <Dialog.Title>An Error Occured</Dialog.Title>
              <Dialog.Content>
                <Text style={{ color: theme.page.fg, textAlign: "center", fontSize: 16 }}>Was that a valid Barcode Value?</Text>
              </Dialog.Content>
            </>) : <>
              <Dialog.Title>Submitted</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => { setRunSubmit(false); setCode(""); setSubmit(false) }}>Close</Button>
                <Button onPress={() => { setRunSubmit(false); setCode(""); setSubmit(true) }}>Submit Another</Button>
              </Dialog.Actions>
            </>) : <>
              <Dialog.Title>Submit your Munzee</Dialog.Title>
              <Dialog.Content>
                <TextInput
                  mode="outlined"
                  label="Munzee Print Code"
                  value={code}
                  onChangeText={code => setCode(code)}
                />
                <Text style={{ color: theme.page_content.fg }}>This is the "Barcode Value" on the Munzee's Print Page.</Text>
                {(!code.match(/(?:https?:\/\/(?:www.)?)?(?:munzee.com)?\/?m\/([^/]{0,30})\/([0-9]+)\/([0-9a-zA-Z]{6})/) && code.match(/(?:https?:\/\/(?:www.)?)?(?:munzee.com)?\/?m\/([^/]{0,30})\/([0-9]+)/)) && <Text style={{ color: theme.page_content.fg }}>This URL is missing the Munzee's Secret Code</Text>}
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={() => {setCode("");setSubmit(false)}}>Cancel</Button>
                <Button disabled={!code.match(/(?:https?:\/\/(?:www.)?)?(?:munzee.com)?\/?m\/([^/]{0,30})\/([0-9]+)\/([0-9a-zA-Z]{6})/)} onPress={() => setRunSubmit(code)}>Submit</Button>
              </Dialog.Actions>
            </>}
        </Dialog>
      </Portal>
    </View>
  );
}