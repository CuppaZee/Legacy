import { DefaultTheme as PaperTheme } from 'react-native-paper';
import { DefaultTheme as NavTheme } from '@react-navigation/native';

export default {
  ...PaperTheme,
  mode: "adaptive",
  id: "green_light",
  colors: {
    ...PaperTheme.colors,
    primary: "#016930",
    accent: "#005627",
    text: "#000000",
    surface: "#e7f7ec",
    background: "#c6ebd0",
  },
  nav: {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      background: "#c6ebd0",
      card: "#e7f7ec",
      text: "#000000",
      border: "#016930"
    }
  }
}