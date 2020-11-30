
// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'fetch'.
var fetch = require("node-fetch");
// @ts-expect-error ts-migrate(2403) FIXME: Subsequent variable declarations must have the sam... Remove this comment to see the full error message
var { URLSearchParams } = require("url");
module.exports = async function (endpoint: any, params: any, token: any, logMessage: any, fullResponse: any) {
  try {
    var data = await fetch('https://api.munzee.com/' + endpoint, {
      method: 'POST',
      body: new URLSearchParams({
        data: JSON.stringify(params),
        access_token: token
      })
    })
    const dataJSON = await data.json();
    if (logMessage && !dataJSON.data) {
      console.log(logMessage, dataJSON);
    }
    if (fullResponse) {
      return dataJSON;
    }
    return dataJSON.data;
  } catch (e) {
    if (logMessage) {
      console.log(logMessage, e);
    }
    return null;
  }
}