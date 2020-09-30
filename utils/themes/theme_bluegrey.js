import { DefaultTheme as PaperTheme } from 'react-native-paper';
import { DefaultTheme as NavTheme } from '@react-navigation/native';

export default {
  ...PaperTheme,
  mode: "adaptive",
  id: "bluegrey",
  colors: {
    ...PaperTheme.colors,
    primary: "#263238",
    accent: "#37474F",
    text: "#000000",
    surface: "#ECEFF1",
    background: "#B0BEC5",
  },
  nav: {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      background: "#B0BEC5",
      card: "#ECEFF1",
      text: "#000000",
      border: "#263238"
    }
  }
}