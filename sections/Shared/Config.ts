
import { Platform } from 'react-native';
export default Platform.OS == "web" ? (

  __DEV__ ? {
    useProxy: false,
    redirect_uri: "http://localhost:19006/auth"
  } : {
      useProxy: false,
      redirect_uri: "https://cuppazee.app/auth"
    }
) :


  // @ts-expect-error ts-migrate(2345) FIXME: Argument of type 'string | number' is not assignab... Remove this comment to see the full error message
  ((__DEV__ || Platform.OS == "android" || (Platform.OS == "ios" && parseInt(Platform.Version, 10) < 12)) ? {
  useProxy: true,
  redirect_uri: 'https://auth.expo.io/@sohcah/PaperZee'
} : {
    useProxy: false,
    redirect_uri: 'cuppazee://auth'
  })