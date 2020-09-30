import { DarkTheme as PaperTheme } from 'react-native-paper';
import { DarkTheme as NavTheme } from '@react-navigation/native';

export default {
  ...PaperTheme,
  mode: "adaptive",
  id: "grey",
  colors: {
    ...PaperTheme.colors,
    primary: "#232323",
    accent: "#005627",
    text: "#ffffff",
    surface: "#121212",
    background: "#121212",
  },
  nav: {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      background: "#121212",
      card: "#121212",
      text: "#ffffff",
      border: "#d3d3d3"
    }
  }
}