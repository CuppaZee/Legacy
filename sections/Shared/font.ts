
import {Platform} from 'react-native';
export default function font(weight: any) {
  var f = 'Roboto'
  if(Platform.OS=="web") return {
    fontWeight: (weight||400).toString()
  }
  return {



    // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
    fontFamily: {
      100: `${f}_100Thin`,
      200: `${f}_200ExtraLight`,
      300: `${f}_300Light`,
      400: `${f}_400Regular`,
      500: `${f}_500Medium`,
      600: `${f}_600SemiBold`,
      700: `${f}_700Bold`,
      bold: `${f}_700Bold`,
      800: `${f}_800ExtraBold`,
      900: `${f}_900Black`
    }[weight] || `${f}_400Regular`
  };
}