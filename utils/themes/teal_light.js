import { DefaultTheme as PaperTheme, DarkTheme as PaperThemeDark } from 'react-native-paper';
import { DefaultTheme as NavTheme } from '@react-navigation/native';

export default {
  ...PaperTheme,
  mode: "adaptive",
  id: "teal_light",
  colors: {
    ...PaperTheme.colors,
    primary: "#016269",
    accent: "#078495",
    text: "#000000",
    surface: "#b3ebf6",
    background: "#82dfef",
  },
  nav: {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      background: "#82dfef",
      card: "#b3ebf6",
      text: "#000000",
      border: "#016269"
    }
  }
}