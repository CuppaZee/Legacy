import { DefaultTheme as PaperTheme } from 'react-native-paper';
import { DefaultTheme as NavTheme } from '@react-navigation/native';

export default {
  ...PaperTheme,
  mode: "adaptive",
  id: "white",
  colors: {
    ...PaperTheme.colors,
    primary: "#d3d3d3",
    accent: "#005627",
    text: "#000000",
    surface: "#ffffff",
    background: "#f6f6f6",
  },
  nav: {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      background: "#eeeeee",
      card: "#ffffff",
      text: "#000000",
      border: "#016930"
    }
  }
}