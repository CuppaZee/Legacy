import { DefaultTheme as PaperTheme } from 'react-native-paper';
import { DefaultTheme as NavTheme } from '@react-navigation/native';

export default {
  ...PaperTheme,
  mode: "adaptive",
  id: "grey_light",
  colors: {
    ...PaperTheme.colors,
    primary: "#121212",
    accent: "#232323",
    text: "#000000",
    surface: "#d8d8d8",
    background: "#a0a0a0",
  },
  nav: {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      background: "#aaaaaa",
      card: "#d8d8d8",
      text: "#000000",
      border: "#121212"
    }
  }
}