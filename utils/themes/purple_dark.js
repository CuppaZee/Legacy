import { DarkTheme as PaperTheme } from 'react-native-paper';
import { DarkTheme as NavTheme } from '@react-navigation/native';

export default {
  ...PaperTheme,
  mode: "adaptive",
  id: "purple_dark",
  colors: {
    ...PaperTheme.colors,
    primary: "#440169",
    accent: "#600578",
    text: "#ffffff",
    surface: "#440169",
    background: "#440169",
  },
  nav: {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      background: "#440169",
      card: "#440169",
      text: "#ffffff",
      border: "#d3d3d3"
    }
  }
}