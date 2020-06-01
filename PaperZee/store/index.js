import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import r from './request';
import { AsyncStorage } from 'react-native';
import themes from '../themes'
var {makeRequest} = r;
const defaultState = {
  requests: [],
  request_data: {},
  loading: 0,
  loadingLogin: true,
  loggedIn: false,
  logins: true,
  tick: 0,
  code: '',
  clanBookmarks: [],
  clanLevelSelect: {},
  route: {},
  themes,
  theme: themes._default
};


function refreshRequests(store,force) {
  for(var request of store.getState().requests.filter(i=>i.count>0&&(force||i.expires<Date.now()))) {
    makeRequest(store.getState,store.dispatch,request.page,true);
  }
}

var refresh = () => async (dispatch, getState) => {
  refreshRequests({dispatch,getState},true);
}

var setCurrentRoute = (data) => ({ type: "CURRENT_ROUTE", data: data })
var login_ = (data) => ({ type: "LOGIN", data: data })
var replaceLogin_ = (data) => ({ type: "REPLACE_LOGIN", data: data })
var clanBookmarks_ = (data) => ({ type: "CLAN_BOOKMARKS", data: data })
var setCode_ = (data) => ({ type: "SET_CODE", data: data })
var setTheme_ = (data) => ({ type: "SET_THEME", data: data })
var levelSelect_ = (data) => ({ type: "LEVEL_SELECT", data: data })
var tick = () => ({ type: "TICK" })
var removeLogin = (user_id) => async (dispatch, getState) => {
  var x = {...getState().logins};
  delete x[user_id]
  await AsyncStorage.setItem('CUPPAZEE_TEAKENS',JSON.stringify(x));
  dispatch(replaceLogin_(x));
}
var login = (data,noUpdate) => async (dispatch, getState) => {
  if(!noUpdate) await AsyncStorage.setItem('CUPPAZEE_TEAKENS',JSON.stringify({...getState().logins,...data}));
  dispatch(login_(data));
}
var clanBookmarks = (data,noUpdate) => async (dispatch, getState) => {
  if(!noUpdate) await AsyncStorage.setItem('CLAN_BOOKMARKS',JSON.stringify(data));
  dispatch(clanBookmarks_(data));
}
var setCode = (data,noUpdate) => async (dispatch, getState) => {
  if(!noUpdate) await AsyncStorage.setItem('CODE',data);
  dispatch(setCode_(data));
}
var setTheme = (data,noUpdate) => async (dispatch, getState) => {
  if(!noUpdate) await AsyncStorage.setItem('THEME',data);
  dispatch(setTheme_(data));
}
var levelSelect = (data,noUpdate) => async (dispatch, getState) => {
  if(!noUpdate) await AsyncStorage.setItem('LEVEL_SELECT',JSON.stringify({...getState().clanLevelSelect,...data}));
  dispatch(levelSelect_(data));
}

var rootReducer = (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_REQUEST':
      if(state.requests.find(i=>i.page==JSON.stringify(action.page))) {
        return {
          ...state,
          requests: state.requests.map(i=>i.page==JSON.stringify(action.page)?{...i,count:i.count+1}:i)
        }
      } else {
        return {
          ...state,
          requests: [...state.requests, {page:JSON.stringify(action.page),count:1,expires:Date.now()+(15*60000)}]
        }
      }
    case 'REMOVE_REQUEST':
      if(state.requests.find(i=>i.page==JSON.stringify(action.page)).count>0) {
        return {
          ...state,
          requests: state.requests.map(i=>i.page==JSON.stringify(action.page)?{...i,count:i.count-1}:i)
        }
      } else {
        return {
          ...state,
          requests: state.requests.filter(i=>i.page!=JSON.stringify(action.page))
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
        requests: state.requests.map(i=>i.page==action.originalpage?{...i,expires:Date.now()+(20*60000)}:i),
        request_data: {
          ...state.request_data,
          ...data
        }
      }
    case 'TICK':
      return {
        ...state,
        tick: state.tick+1
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
    case 'CLAN_BOOKMARKS':
      return {
        ...state,
        clanBookmarks: action.data
      }
    case 'CURRENT_ROUTE':
      return {
        ...state,
        route: action.data
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
// import rootReducer from './reducers/index';


const store = createStore(rootReducer, applyMiddleware(thunk));
setInterval(refreshRequests,60000,store);
// setInterval(()=>{
//   store.dispatch(tick());
// },1000)
async function getToken(user_id,data) {
  var x = Object.assign({},data);
  var y = await fetch(`https://server.cuppazee.app/auth/get?teaken=${encodeURIComponent(x.teaken)}&user_id=${encodeURIComponent(user_id)}`)
  x.token = (await y.json()).data;
  return x;
}
AsyncStorage.getItem('CUPPAZEE_TEAKENS').then(async (dat)=>{
  if(!dat) return store.dispatch(login({},true));
  var data = JSON.parse(dat)
  console.log(data,dat);
  for(var user in data) {
    data[user] = await getToken(user,data[user]);
  }
  store.dispatch(login(data,true));
})
AsyncStorage.getItem('CLAN_BOOKMARKS').then((data)=>{
  if(!data) return store.dispatch(clanBookmarks([],true));
  store.dispatch(clanBookmarks(JSON.parse(data),true));
})
AsyncStorage.getItem('CODE').then((data)=>{
  if(!data) return;
  store.dispatch(setCode(data,true));
})
AsyncStorage.getItem('THEME').then((data)=>{
  if(!data) return;
  if(themes[data]) store.dispatch(setTheme(data,true));
  return;
})
AsyncStorage.getItem('LEVEL_SELECT').then((data)=>{
  if(!data) return store.dispatch(levelSelect({},true));
  store.dispatch(levelSelect(JSON.parse(data),true));
})

export default {store,refresh,login,setCode,clanBookmarks,levelSelect,setCurrentRoute,setTheme,removeLogin};