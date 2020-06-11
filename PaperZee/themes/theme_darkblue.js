import darkMapStyle from './map_dark.json';

export default {
  name: "Dark Blue",
  dark: true,
  error: {
    bg: '#ffaaaa',
    fg: '#000000'
  },
  navigation: {
    bg: "#0f1358",
    fg: "#ffffff"
  },
  navigation_selected: {
    bg: "#050043",
    fg: "#ffffff"
  },
  page: {
    bg: "#050043",
    fg: "#ffffff"
  },
  page_content: {
    bg: "#0f1358",
    fg: "#ffffff",
    border: "#ffffff"
  },
  activity: {
    capture: {
      bg: "#aaffaa",
      fg: "#004400"
    },
    deploy: {
      bg: "#a5fffc",
      fg: "#00403e"
    },
    capon: {
      bg: "#ffbcad",
      fg: "#401700"
    }
  },
  mapStyle: darkMapStyle
};