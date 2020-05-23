import {Platform} from 'react-native';
export default Platform.OS=="web"?(
  __DEV__?{
    useProxy: false,
    redirect_uri: "",
    client_id: '',
    client_secret: ""
  }:{
    useProxy: false,
    redirect_uri: "",
    client_id: '',
    client_secret: ""
  }
):(Platform.OS=="os-android"?{
  useProxy: true,
  redirect_uri: "",
  client_id: '',
  client_secret: ""
}:{
  useProxy: true,
  redirect_uri: "",
  client_id: '',
  client_secret: ""
})