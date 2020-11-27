// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import * as React from 'react';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { Text, View, ActivityIndicator } from 'react-native';
import { Button, Dialog, Portal, TextInput, Checkbox, RadioButton } from 'react-native-paper';
// @ts-expect-error ts-migrate(7016) FIXME: Could not find a declaration file for module 'reac... Remove this comment to see the full error message
import { useSelector } from 'react-redux';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'sections/Shared/font' or its c... Remove this comment to see the full error message
import font from 'sections/Shared/font';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useAPIRequest' or ... Remove this comment to see the full error message
import useAPIRequest from 'utils/hooks/useAPIRequest';
import { useTranslation } from 'react-i18next';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import QRCode from 'react-native-qrcode-svg';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/icon' or its correspo... Remove this comment to see the full error message
import getIcon from 'utils/db/icon';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/hooks/useMoment' or its ... Remove this comment to see the full error message
import useMoment from 'utils/hooks/useMoment';

function useWatch(munzee_id: any, user_id: any, token: any) {
  const [i, setI] = React.useState({});
  const [response, setResponse] = React.useState(false);
  React.useEffect(()=>{
    var interval = setInterval(async () => {
      if(munzee_id && (!i[munzee_id] || i[munzee_id] < 10)) {
        const reqformData = new FormData();
        reqformData.append('data', JSON.stringify({ munzee_id, i, page: 0, access_token: token }))
        reqformData.append('access_token', token)
        const d = await fetch(`https://api.munzee.com/munzee/captures`, {
          method: 'POST',
          body: reqformData
        })
        const {data} = await d.json();
        if((data||[]).find((i: any) => i.user_id.toString()===user_id.toString())) {
          setResponse(munzee_id);
          setI(10);
        }
      }
      setI((a: any) => ({
        ...a,
        [munzee_id]:(a[munzee_id]||0)+1
      }));
    }, 1500);
    return () => clearInterval(interval)
  })
  return response;
}

function Report({
  qr
}: any) {
  var [reportMenu, setReportMenu] = React.useState(false);
  var [reportOption, setReportOption] = React.useState("invalid_secret_code");
  var [reportMessage, setReportMessage] = React.useState("");
  function report(data: any) {
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
  // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
  return <>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Button onPress={() => setReportMenu(true)} icon="alert">Report as broken</Button>
    {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
    <Portal>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Dialog visible={reportMenu} onDismiss={()=>setReportMenu(false)}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {runReport ? (reportStatus === "loading" ? <Dialog.Title>Reporting...</Dialog.Title> : <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Dialog.Title>{!reportStatus ? "Munzee Reported" : "An error occurred"}</Dialog.Title>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Dialog.Actions>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Button onPress={()=>{setReportMenu(false);setRunReport(false)}}>Close</Button>
            </Dialog.Actions>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          </>) : <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Dialog.Title>Report Munzee</Dialog.Title>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Dialog.Content>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <RadioButton.Group onValueChange={(value: any) => setReportOption(value)} value={reportOption}>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <RadioButton.Item label="Invalid Secret Code" value="invalid_secret_code" />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <RadioButton.Item label="Unable to Scan" value="unable_to_scan" />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <RadioButton.Item label="Other" value="other" />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {reportOption === "other" && <TextInput label="Report Message" mode="outlined" value={reportMessage} onChangeText={(msg: any) => setReportMessage(msg)} />}
              </RadioButton.Group>
              </Dialog.Content>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Dialog.Actions>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Button onPress={()=>setReportMenu(false)}>Cancel</Button>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Button onPress={()=>report(reportOption==="other"?reportMessage:reportOption)}>Report</Button>
            </Dialog.Actions>
          </>}
        </Dialog>
    </Portal>
  </>;
}

export default function UniversalCapScreen({
  navigation,
  route
}: any) {
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
  var theme = useSelector((i: any) => i.themes[i.theme])
  var username = route.params.username;
  const user_id = useAPIRequest({
    endpoint: 'user',
    data: { username },
    function: (i: any) => i?.user_id
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
  var watch = useWatch(qr?.munzee_id, user_id, data?.token);
  React.useEffect(() => {
    if (watch === qr?.munzee_id) setIndex(index + 1);
  }, [watch])
  React.useEffect(() => {
    setIndex(0)
  }, [data?.cacheID])
  if (status) {
    if (status === "loading") {
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <ActivityIndicator size="large" color={theme.page.fg} />
      </View>
    } else {
      // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
      return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <MaterialCommunityIcons name="alert" color={theme.page.fg} size={48} />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), textAlign: "center", color: theme.page_content.fg }}>{t('error:' + status)}</Text>
      </View>
    }
  } else if (data === null) {
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    return <View style={{ flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: theme.page.bg }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <MaterialCommunityIcons name="alert" color={theme.page.fg} size={48} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Text allowFontScaling={false} style={{ fontSize: 16, ...font("bold"), textAlign: "center", color: theme.page_content.fg }}>{t('error:missing_data.locked')}</Text>
    </View>
  }
  return (
    // @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message
    <View style={{ flex: 1, backgroundColor: theme.page.bg, alignItems: "center", justifyContent: "center", padding: 8 }}>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ flex: 1, padding: 8 }}>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text style={{ color: theme.page.fg, textAlign: "center", fontSize: 16 }}><Text style={{ fontWeight: "bold" }}>{data.total - (data.capped + index)}</Text> remaining of <Text style={{ fontWeight: "bold" }}>{data.total}</Text></Text>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        {data?.types?.map((i: any) => <View style={{flexDirection:"row", alignItems: "center", width: 200}}>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Text style={{ flex: 1, fontWeight: "bold", fontSize: 16 }}>{i.name}</Text>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Checkbox.Android status={filter[i.id] ? 'unchecked' : 'checked'} onPress={()=>{
            var update = {};
            // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
            update[i.id] = !filter[i.id];
            setFilter({...filter,...update})
            setX(x+1);
          }} />
        </View>)}
      </View>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      {(data?.munzees?.length > 0 && qr) ? <>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <QRCode
          size={200}
          value={`https://www.munzee.com/m/${qr.munzee}/`}
          color={theme.page.fg}
          backgroundColor={theme.page.bg}
          logo={getIcon(qr.type.icon)}
          logoSize={80}
        />
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text style={{ color: theme.page.fg, fontSize: 16, fontWeight: "bold" }}>{munzee?.friendly_name??qr.munzee}</Text>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text style={{ color: theme.page.fg, fontSize: 16 }}>by {munzee?.creator_username??'?'}</Text>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Text style={{ color: theme.page.fg, fontSize: 12 }}>Deployed {moment(munzee?.deployed_at).format('L LT')}</Text>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Button style={{ marginVertical: 4 }} mode="contained" onPress={() => setIndex(index + 1)} icon="chevron-right">Next</Button>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Report qr={qr} />
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      </> : <>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <MaterialCommunityIcons name="gauge-empty" color={theme.page.fg} size={48} />
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          <Text style={{ color: theme.page.fg }}>You've run out of Munzees to capture.</Text>
        </>}
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <View style={{ flex: 1 }}></View>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Button onPress={() => { setRunSubmit(false); setSubmit(true) }} mode="contained" icon="upload">Submit your Munzee</Button>
      {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
      <Portal>
        {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
        <Dialog
          visible={submit}
          onDismiss={() => { setSubmit(false) }}
          style={{ maxWidth: "100%", width: 600, alignSelf: "center", borderRadius: 8, backgroundColor: theme.page_content.bg }}>

          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          {runSubmit ? (submittedStatus ? (submittedStatus === "loading" ? <>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            <Dialog.Title>Submitting...</Dialog.Title>
          {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
          </> : <>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Dialog.Title>An Error Occured</Dialog.Title>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Dialog.Content>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ color: theme.page.fg, textAlign: "center", fontSize: 16 }}>Was that a valid Barcode Value?</Text>
              </Dialog.Content>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            </>) : <>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Dialog.Title>Submitted</Dialog.Title>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Dialog.Actions>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Button onPress={() => { setRunSubmit(false); setCode(""); setSubmit(false) }}>Close</Button>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Button onPress={() => { setRunSubmit(false); setCode(""); setSubmit(true) }}>Submit Another</Button>
              </Dialog.Actions>
            {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
            </>) : <>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Dialog.Title>Submit your Munzee</Dialog.Title>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Dialog.Content>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <TextInput
                  mode="outlined"
                  label="Munzee Print Code"
                  value={code}
                  onChangeText={(code: any) => setCode(code)}
                />
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Text style={{ color: theme.page_content.fg }}>This is the "Barcode Value" on the Munzee's Print Page.</Text>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                {(!code.match(/(?:https?:\/\/(?:www.)?)?(?:munzee.com)?\/?m\/([^/]{0,30})\/([0-9]+)\/([0-9a-zA-Z]{6})/) && code.match(/(?:https?:\/\/(?:www.)?)?(?:munzee.com)?\/?m\/([^/]{0,30})\/([0-9]+)/)) && <Text style={{ color: theme.page_content.fg }}>This URL is missing the Munzee's Secret Code</Text>}
              </Dialog.Content>
              {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
              <Dialog.Actions>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Button onPress={() => {setCode("");setSubmit(false)}}>Cancel</Button>
                {/* @ts-expect-error ts-migrate(17004) FIXME: Cannot use JSX unless the '--jsx' flag is provided... Remove this comment to see the full error message */}
                <Button disabled={!code.match(/(?:https?:\/\/(?:www.)?)?(?:munzee.com)?\/?m\/([^/]{0,30})\/([0-9]+)\/([0-9a-zA-Z]{6})/)} onPress={() => setRunSubmit(code)}>Submit</Button>
              </Dialog.Actions>
            </>}
        </Dialog>
      </Portal>
    </View>
  );
}