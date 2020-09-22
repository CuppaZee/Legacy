import allSettled from '@ungap/promise-all-settled'
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import r from './request';
import { AppState } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import stringify from 'fast-json-stable-stringify';
import themes from 'utils/themes'
import changelogs from 'changelogs'
import FROM from 'from';
var {makeRequest} = r;
const defaultState = {
  // Requests
  requests: [],
  request_data: {},
  loading: 0,

  // Login Teakens
  loadingLogin: true,
  loggedIn: false,
  logins: true,

  // Tick
  tick: 0,

  // Beta Test Code
  code: '',
  
  // Clan Bookmarks
  clanBookmarks: [],
  
  // User Bookmarks
  userBookmarks: [],

  // Clan Level Selections
  clanLevelSelect: {},

  // Current Navigation Route
  route: {},

  // Themes
  themes,
  theme: themes._default,
  
  // Last Used Version
  version: -1,

  // Settings
  settings: {
    alt_clan_design: false,
    clan_level_ind: "#ffe97f",
    clan_level_bot: "#dff77e",
    clan_level_gro: "#b0fc8d",
    clan_level_0:   "#eb0000",
    clan_level_1:   "#ef6500",
    clan_level_2:   "#fa9102",
    clan_level_3:   "#fcd302",
    clan_level_4:   "#bfe913",
    clan_level_5:   "#55f40b",
    clan_level_null:"#e3e3e3",
    activityV2Beta: false,
    appleMaps: false
  },

  mini: false
};


function refreshRequests(store,force) {
  for(var request of store.getState().requests.filter(i=>i.count>0&&(force||i.expires<Date.now()))) {
    makeRequest(store.getState,store.dispatch,request.page,true);
  }
}

var refresh = () => async (dispatch, getState) => {
  refreshRequests({dispatch,getState},true);
}

// Current Navigation Route
var setCurrentRoute = (data) => ({ type: "CURRENT_ROUTE", data: data })

// Last Used Version
var cuppazeeVersion_ = (data) => ({ type: "CUPPAZEE_VERSION", data: data })
var cuppazeeVersion = (data,noUpdate) => async (dispatch, getState) => {
  if(!noUpdate) await AsyncStorage.setItem('CUPPAZEE_VERSION',stringify(data));
  dispatch(cuppazeeVersion_(data));
}

// Login Teakens
var login_ = (data) => ({ type: "LOGIN", data: data })
var replaceLogin_ = (data) => ({ type: "REPLACE_LOGIN", data: data })
var login = (data,noUpdate) => async (dispatch, getState) => {
  if(!noUpdate) await AsyncStorage.setItem('CUPPAZEE_TEAKENS',stringify({...getState().logins,...data}));
  dispatch(login_(data));
}
var removeLogin = (user_id) => async (dispatch, getState) => {
  var x = {...getState().logins};
  delete x[user_id]
  await AsyncStorage.setItem('CUPPAZEE_TEAKENS',stringify(x));
  dispatch(replaceLogin_(x));
}

// Clan Bookmarks
var clanBookmarks_ = (data) => ({ type: "CLAN_BOOKMARKS", data: data })
var clanBookmarks = (data,noUpdate) => async (dispatch, getState) => {
  if(!noUpdate) await AsyncStorage.setItem('CLAN_BOOKMARKS',stringify(data));
  dispatch(clanBookmarks_(data));
}

// User Bookmarks
var userBookmarks_ = (data) => ({ type: "USER_BOOKMARKS", data: data })
var userBookmarks = (data,noUpdate) => async (dispatch, getState) => {
  if(!noUpdate) await AsyncStorage.setItem('USER_BOOKMARKS',stringify(data));
  dispatch(userBookmarks_(data));
}

// Beta Test Code
var setCode_ = (data) => ({ type: "SET_CODE", data: data })
var setCode = (data,noUpdate) => async (dispatch, getState) => {
  if(!noUpdate) await AsyncStorage.setItem('CODE',data);
  dispatch(setCode_(data));
}

// Theme Selection
var setTheme_ = (data) => ({ type: "SET_THEME", data: data })
var setTheme = (data,noUpdate) => async (dispatch, getState) => {
  if(getState().themes[data]) {
    if(!noUpdate) await AsyncStorage.setItem('THEME',data);
    dispatch(setTheme_(data));
  }
}

// Clan Level Selections
var levelSelect_ = (data) => ({ type: "LEVEL_SELECT", data: data })
var levelSelect = (data,noUpdate) => async (dispatch, getState) => {
  if(!noUpdate) await AsyncStorage.setItem('LEVEL_SELECT',stringify({...getState().clanLevelSelect,...data}));
  dispatch(levelSelect_(data));
}

// Settings
var settings_ = (data) => ({ type: "SETTINGS", data: data })
var settings = (data,noUpdate) => async (dispatch, getState) => {
  if(!noUpdate) await AsyncStorage.setItem('CUPPAZEE_SETTINGS',stringify({...getState().settings,...data}));
  dispatch(settings_(data));
}

// Mini Sidebar
var mini = (data) => ({ type: "MINI", data: data })

var rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_REQUEST':
      if(state.requests.find(i=>i.page==stringify(action.page))) {
        return {
          ...state,
          requests: state.requests.map(i=>i.page==stringify(action.page)?{...i,count:i.count+1}:i)
        }
      } else {
        return {
          ...state,
          requests: [...state.requests, {page:stringify(action.page),count:1,expires:Date.now()+(15*60000)}]
        }
      }
    case 'REMOVE_REQUEST':
      if(state.requests.find(i=>i.page==stringify(action.page)).count>0) {
        return {
          ...state,
          requests: state.requests.map(i=>i.page==stringify(action.page)?{...i,count:i.count-1}:i)
        }
      } else {
        return {
          ...state,
          requests: state.requests.filter(i=>i.page!=stringify(action.page))
        }
      }
    case 'LOADING':
      return {
        ...state,
        loading: state.loading+action.change
      }
    case 'LOGIN':
      return {
        ...state,
        loggedIn: Object.keys(action.data).length>0,
        logins: {...state.logins,...action.data},
        loadingLogin: false,
      }
    case 'REPLACE_LOGIN':
      return {
        ...state,
        loggedIn: Object.keys(action.data).length>0,
        logins: action.data,
        loadingLogin: false,
      }
    case 'SET_REQUEST_DATA':
      var data = {};
      data[action.page] = action.data;
      return {
        ...state,
        requests: state.requests.map(i=>stringify(i.page)===action.page?{...i,expires:Date.now()+(20*60000)}:i),
        request_data: {
          ...state.request_data,
          ...data
        }
      }
    case 'SET_CODE':
      return {
        ...state,
        code: action.data
      }
    case 'SET_THEME':
      return {
        ...state,
        theme: action.data
      }
    case 'CUPPAZEE_VERSION':
      return {
        ...state,
        version: action.data
      }
    case 'CLAN_BOOKMARKS':
      return {
        ...state,
        clanBookmarks: action.data
      }
    case 'USER_BOOKMARKS':
      return {
        ...state,
        userBookmarks: action.data
      }
    case 'CURRENT_ROUTE':
      return {
        ...state,
        route: action.data
      }
    case 'SETTINGS':
      return {
        ...state,
        settings: {
          ...state.settings,
          ...action.data
        }
      }
    case 'MINI':
      return {
        ...state,
        mini: action.data
      }
    case 'LEVEL_SELECT':
      return {
        ...state,
        clanLevelSelect: {
          ...state.clanLevelSelect,
          ...action.data,
        }
      }
    default:
      return state;
  }
}


const store = createStore(rootReducer, applyMiddleware(thunk));
var intervalID = null;
function startLoop() {
  if(intervalID!==null) clearInterval(intervalID);
  intervalID = setInterval(refreshRequests,60000,store);
}
function stopLoop() {
  if(intervalID!==null) clearInterval(intervalID);
}
startLoop();
AppState.addEventListener('change',function(state) {
  if(state==="active") {
    refreshRequests(store);
    startLoop();
  } else {
    stopLoop();
  };
})

async function getToken(user_id,data) {
  try {
    var x = Object.assign({},data);
    var y = await fetch(`https://server.cuppazee.app/auth/get/v2?teaken=${encodeURIComponent(x.teaken)}&user_id=${encodeURIComponent(user_id)}&from=${encodeURIComponent(FROM)}`)
    x.token = (await y.json()).data;
    return x;
  } catch(e) {
    console.log(e);
    return data;
  }
}
async function loadData() {
  var [clan_bookmarks,user_bookmarks,code,theme,level_select,settingsD,version,teakens] = (await allSettled.call(Promise, [
    AsyncStorage.getItem('CLAN_BOOKMARKS'),
    AsyncStorage.getItem('USER_BOOKMARKS'),
    AsyncStorage.getItem('CODE'),
    AsyncStorage.getItem('THEME'),
    AsyncStorage.getItem('LEVEL_SELECT'),
    AsyncStorage.getItem('CUPPAZEE_SETTINGS'),
    AsyncStorage.getItem('CUPPAZEE_VERSION'),
    AsyncStorage.getItem('CUPPAZEE_TEAKENS')
  ])).map(i=>i?.value);
  if(clan_bookmarks) store.dispatch(clanBookmarks(JSON.parse(clan_bookmarks),true));
  if(user_bookmarks) {
    store.dispatch(userBookmarks(JSON.parse(user_bookmarks),true))
  } else if(teakens) {
    var teaken_data = JSON.parse(teakens);
    var user_bookmark_list = [];
    for(var user_id in teaken_data) {
      user_bookmark_list.push({
        user_id,
        username: teaken_data[user_id].username
      })
    }
    store.dispatch(userBookmarks(user_bookmark_list))
  };
  if(code) store.dispatch(setCode(code,true));
  if(theme) store.dispatch(setTheme(theme,true));
  if(level_select) store.dispatch(levelSelect(JSON.parse(level_select),true));
  if(settingsD) store.dispatch(settings(JSON.parse(settingsD),true));
  if(version) {
    store.dispatch(cuppazeeVersion(Number(version),true));
  } else {
    store.dispatch(cuppazeeVersion(Math.max(...Object.keys(changelogs).map(Number))));
  }
  
  if(teakens) {
    var teakens_data = JSON.parse(teakens)
    var token_data = await Promise.all(Object.keys(teakens_data).map(async user=>[user,await getToken(user,teakens_data[user])]))
    var final_data = {};
    for(var token of token_data) final_data[token[0]] = token[1];
    store.dispatch(login(final_data,true));
  } else {
    store.dispatch(login({},true))
  }
}
loadData();

export default {store,refresh,login,setCode,clanBookmarks,userBookmarks,levelSelect,setCurrentRoute,setTheme,removeLogin,cuppazeeVersion,settings,mini};