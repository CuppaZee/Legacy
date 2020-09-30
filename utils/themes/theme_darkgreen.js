import { DarkTheme as PaperTheme } from 'react-native-paper';
import { DarkTheme as NavTheme } from '@react-navigation/native';

export default {
  ...PaperTheme,
  mode: "adaptive",
  id: "darkgreen",
  colors: {
    ...PaperTheme.colors,
    primary: "#005627",
    accent: "#005627",
    text: "#ffffff",
    surface: "#005627",
    background: "#005627",
  },
  nav: {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      background: "#005627",
      card: "#005627",
      text: "#ffffff",
      border: "#d3d3d3"
    }
  }
}