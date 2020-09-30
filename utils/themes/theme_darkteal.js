import { DarkTheme as PaperTheme } from 'react-native-paper';
import { DarkTheme as NavTheme } from '@react-navigation/native';

export default {
  ...PaperTheme,
  mode: "adaptive",
  id: "darkteal",
  colors: {
    ...PaperTheme.colors,
    primary: "#016269",
    accent: "#078495",
    text: "#ffffff",
    surface: "#016269",
    background: "#016269",
  },
  nav: {
    ...NavTheme,
    colors: {
      ...NavTheme.colors,
      background: "#016269",
      card: "#016269",
      text: "#ffffff",
      border: "#d3d3d3"
    }
  }
}