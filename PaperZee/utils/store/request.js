import { AsyncStorage } from 'react-native';
import stringify from 'fast-json-stable-stringify';

import FROM from 'from';

var login_ = (data) => ({ type: "LOGIN", data: data })
var login = (data, noUpdate) => async (dispatch, getState) => {
  if (!noUpdate) await AsyncStorage.setItem('CUPPAZEE_TEAKENS', JSON.stringify({ ...getState().logins, ...data }));
  dispatch(login_(data));
}

var setRequestData = (page, data, originalpage) => ({ type: "SET_REQUEST_DATA", page, data, originalpage })

var loading = (change) => ({ type: "LOADING", change: change })

var pagination = {
  undeployed: {
    hasMore: (data) => {
      return !!data?.data?.has_more;
    },
    addAll: (dataArr) => {
      var arr = []
      for (var data of dataArr) {
        arr = arr.concat(data?.data?.munzees || []);
      }
      return { data: arr };
    }
  }
}
import ClanProgressConverter from 'sections/User/Clan/Data';
var converter = {
  ClanProgress: ClanProgressConverter
}

async function makeRequest(getState, dispatch, pageInput, force) {
  var page;
  if (typeof pageInput === "string") {
    page = JSON.parse(pageInput);
  } else {
    page = pageInput;
  }
  if (!force && getState().requests.find(i => i.page == stringify(page))?.expires > Date.now()) return;
  dispatch(loading(1))
  try {
    var data;
    if (page.flameZee) {
      var d = await fetch(`https://server.cuppazee.app/${page.endpoint}`)
      data = await d.json();
    } else {
      // Get User
      let use_user = page.user;
      if (!use_user) {
        use_user = Object.keys(getState().logins)[0]
      }

      for (var loop = 0; loop < 1; loop++) {
        // Get Updated Token
        var token_data = getState().logins[use_user]?.token;
        var token = token_data?.access_token;

        // Request Data
        if (page.pagination) {
          var dataArray = [];
          for (var i = 0; i < 15 && (!dataArray[0] || pagination[page.pagination].hasMore(dataArray[dataArray.length - 1])); i++) {
            var reqformData = new FormData();
            reqformData.append('data', stringify({ ...page.data, page: i, access_token: token }))
            reqformData.append('access_token', token)
            var d = await fetch(`${page.cuppazee?'https://server.cuppazee.app':'https://api.munzee.com'}/${page.endpoint}`, {
              method: 'POST',
              body: page.cuppazee?stringify({ ...page.data, page: i, access_token: token, from: FROM }):reqformData
            })
            var da = await d.json();
            if(da?.data) loop = 10;
            dataArray.push(da);
          }
          data = pagination[page.pagination].addAll(dataArray);
        } else {
          var reqformData = new FormData();
          reqformData.append('data', stringify({ ...page.data, access_token: token }))
          reqformData.append('access_token', token)
          var d = await fetch(`${page.cuppazee?'https://server.cuppazee.app':'https://api.munzee.com'}/${page.endpoint}`, {
            method: 'POST',
            body: page.cuppazee?stringify({ ...page.data, access_token: token, from: FROM }):reqformData
          })
          data = await d.json();
          if(data?.data) loop = 10;
        }
        if (page.converter) {
          data = { data: converter[page.converter](data?.data) };
        }
        data.id = Math.floor(Math.random()*10000)
      }
    }

    // Store Data
    dispatch(setRequestData(stringify(page), data, page));
  } catch (e) {
    dispatch(setRequestData(stringify(page), { data: "error", error: "failed_loading" }, page));
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