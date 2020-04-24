import axios from 'axios';

var setRequestData = (page,data, originalpage) => ({ type: "SET_REQUEST_DATA", page, data ,originalpage })

var loading = (change) => ({ type: "LOADING", change: change })

async function makeRequest(getState, dispatch, page, force) {
  if(!force&&getState().requests.find(i=>i.page==page)?.expires > Date.now()+(10*60000)) return;
  dispatch(loading(1))
  try {
    var data = await axios.get(`https://flame.cuppazee.uk/${page}`.replace(/{token:([0-9]+)}/g, (_, a) => getState().allCryptokens[a]));
    dispatch(setRequestData(page.replace(/{token:([0-9]+)}/g, (_, a) => getState().allCryptokens[a]), data, page));
  } catch(e) {
    dispatch(setRequestData(page.replace(/{token:([0-9]+)}/g, (_, a) => getState().allCryptokens[a]), {data:"error",error:"failed_loading"}, page));
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