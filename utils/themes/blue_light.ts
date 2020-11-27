import { DefaultTheme as PaperTheme, DarkTheme as PaperThemeDark } from 'react-native-paper';
import { DefaultTheme as NavTheme } from '@react-navigation/native';

export default {
  ...PaperTheme,
  mode: "adaptive",
  id: "blue_light",
  colors: {
    ...PaperTheme.colors,
    primary: "#0f1358",
    accent: "#050043",
    text: "#000000",
    surface: "#babdff",
    background: "#888efc",
  },
  nav: {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      background: "#888efc",
      card: "#babdff",
      text: "#000000",
      border: "#0f1358"
    }
  }
}