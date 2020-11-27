import { DarkTheme as PaperTheme } from 'react-native-paper';
import { DarkTheme as NavTheme } from '@react-navigation/native';

export default {
  ...PaperTheme,
  mode: "adaptive",
  id: "bluegrey_dark",
  colors: {
    ...PaperTheme.colors,
    primary: "#37474F",
    accent: "#005627",
    text: "#ffffff",
    surface: "#263238",
    background: "#263238",
  },
  nav: {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      background: "#263238",
      card: "#263238",
      text: "#ffffff",
      border: "#d3d3d3"
    }
  }
}