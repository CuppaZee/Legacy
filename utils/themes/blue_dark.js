import { DarkTheme as PaperTheme } from 'react-native-paper';
import { DarkTheme as NavTheme } from '@react-navigation/native';

export default {
  ...PaperTheme,
  mode: "adaptive",
  id: "blue_dark",
  colors: {
    ...PaperTheme.colors,
    primary: "#0f1358",
    accent: "#050043",
    text: "#ffffff",
    surface: "#050043",
    background: "#050043",
  },
  nav: {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      background: "#050043",
      card: "#050043",
      text: "#ffffff",
      border: "#d3d3d3"
    }
  }
}