import { DarkTheme as PaperTheme } from 'react-native-paper';
import { DarkTheme as NavTheme } from '@react-navigation/native';

export default {
  ...PaperTheme,
  mode: "adaptive",
  id: "black",
  colors: {
    ...PaperTheme.colors,
    primary: "#121212",
    accent: "#005627",
    text: "#ffffff",
    surface: "#000000",
    background: "#000000",
  },
  nav: {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      background: "#000000",
      card: "#000000",
      text: "#ffffff",
      border: "#d3d3d3"
    }
  }
}