import { DefaultTheme as PaperTheme, DarkTheme as PaperThemeDark } from 'react-native-paper';
import { DefaultTheme as NavTheme } from '@react-navigation/native';

export default {
  ...PaperTheme,
  mode: "adaptive",
  id: "purple_light",
  colors: {
    ...PaperTheme.colors,
    primary: "#440169",
    accent: "#600578",
    text: "#000000",
    surface: "#dcb8db",
    background: "#c68ac4",
  },
  nav: {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      background: "#c68ac4",
      card: "#b3ebf6",
      text: "#000000",
      border: "#440169"
    }
  }
}