import {AsyncStorage} from 'react-native';
import stringify from 'fast-json-stable-stringify';
var login_ = (data) => ({ type: "LOGIN", data: data })
var login = (data,noUpdate) => async (dispatch, getState) => {
  if(!noUpdate) await AsyncStorage.setItem('CUPPAZEE_STORE_API_TOKENS',JSON.stringify({...getState().logins,...data}));
  dispatch(login_(data));
}

var setRequestData = (page,data, originalpage) => ({ type: "SET_REQUEST_DATA", page, data ,originalpage })

var loading = (change) => ({ type: "LOADING", change: change })

async function makeRequest(getState, dispatch, page, force) {
  if(!force&&getState().requests.find(i=>i.page==stringify(page))?.expires > Date.now()+(10*60000)) return;
  dispatch(loading(1))
  try {
    // Get User
    let use_user = page.user;
    if(!use_user) {
      use_user = Object.keys(getState().logins)[0]
    }

    // Get Updated Token
    var token_data = getState().logins[use_user].token;
    if((token_data.expires*1000)<Date.now()+10000) {
      var formData = new FormData();
      formData.append('client_id', config.client_id)
      formData.append('client_secret', '')
      formData.append('grant_type', 'refresh_token')
      formData.append('refresh_token', token_data.refresh_token)
      var n = await fetch('https://api.munzee.com/oauth/login', {
        method: 'POST',
        body: formData
      })
      var ne = await n.json();
      var new_token = ne.data.token;
      var x = {};
      x[use_user] = getState().logins[use_user]
      x[use_user].token = new_token;
      dispatch(login(x))
      token_data = new_token;
    }
    var token = token_data.access_token;

    // Request Data
    var reqformData = new FormData();
    reqformData.append('data',stringify({...page.data,access_token:token}))
    reqformData.append('access_token',token)
    var d = await fetch(`https://api.munzee.com/${page.endpoint}`, {
      method: 'POST',
      body: reqformData
    })
    var data = await d.json();

    // Store Data
    dispatch(setRequestData(stringify(page), data, page));
  } catch(e) {
    dispatch(setRequestData(stringify(page), {data:"error",error:"failed_loading"}, page));
  }
  dispatch(loading(-1))
}

var addRequest_ = (page) => ({ type: "ADD_REQUEST", page: page })
var addRequest = (page) => async (dispatch, getState) => {
  makeRequest(getState, dispatch, page);
  dispatch(addRequest_(page));
}

var removeRequest = (page) => ({ type: "REMOVE_REQUEST", page: page })

export default {
  remove: removeRequest,
  add: addRequest,
  makeRequest,
}