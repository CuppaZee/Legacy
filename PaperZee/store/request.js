import {AsyncStorage} from 'react-native';
import stringify from 'fast-json-stable-stringify';
var login_ = (data) => ({ type: "LOGIN", data: data })
var login = (data,noUpdate) => async (dispatch, getState) => {
  if(!noUpdate) await AsyncStorage.setItem('CUPPAZEE_STORE_API_TOKENS',JSON.stringify({...getState().logins,...data}));
  dispatch(login_(data));
}

var setRequestData = (page,data, originalpage) => ({ type: "SET_REQUEST_DATA", page, data, originalpage })

var loading = (change) => ({ type: "LOADING", change: change })

var pagination = {
  undeployed: {
    hasMore: (data)=>{
      return !!data?.data?.has_more;
    },
    addAll: (dataArr)=>{
      var arr = []
      for(var data of dataArr) {
        arr = arr.concat(data?.data?.munzees||[]);
      }
      return {data:arr};
    }
  }
}
import ClanProgressConverter from '~sections/User/Clan/Data';
var converter = {
  ClanProgress: ClanProgressConverter
}

async function makeRequest(getState, dispatch, pageInput, force) {
  var page;
  if(typeof pageInput === "string") {
    page = JSON.parse(pageInput);
  } else {
    page = pageInput;
  }
  if(!force&&getState().requests.find(i=>i.page==stringify(page))?.expires > Date.now()) return;
  dispatch(loading(1))
  try {
    var data;
    if(page.flameZee) {
      var d = await fetch(`https://server.cuppazee.app/${page.endpoint}`)
      data = await d.json();
    } else {
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
      if(page.pagination) {
        var dataArray = [];
        for(var i = 0;i < 15&&(!dataArray[0]||pagination[page.pagination].hasMore(dataArray[dataArray.length-1]));i++) {
          var reqformData = new FormData();
          reqformData.append('data',stringify({...page.data,page:i,access_token:token}))
          reqformData.append('access_token',token)
          var d = await fetch(`https://api.munzee.com/${page.endpoint}`, {
            method: 'POST',
            body: reqformData
          })
          dataArray.push(await d.json());
        }
        data = pagination[page.pagination].addAll(dataArray);
      } else {
        var reqformData = new FormData();
        reqformData.append('data',stringify({...page.data,access_token:token}))
        reqformData.append('access_token',token)
        var d = await fetch(`https://api.munzee.com/${page.endpoint}`, {
          method: 'POST',
          body: reqformData
        })
        data = await d.json();
      }
      if(page.converter) {
        data = {data:converter[page.converter](data?.data)};
      }
    }

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