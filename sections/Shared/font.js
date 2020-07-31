import {Platform} from 'react-native';
export default function font(weight) {
  var f = 'Roboto'
  if(Platform.OS=="web") return {
    fontWeight: (weight||400).toString()
  }
  return {
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