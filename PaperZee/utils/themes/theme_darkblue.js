import darkMapStyle from './map_dark.json';

export default {
  id: "darkblue",
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
      bg: "#004400",
      fg: "#aaffaa"
    },
    deploy: {
      bg: "#00403e",
      fg: "#a5fffc"
    },
    capon: {
      bg: "#401700",
      fg: "#ffbcad"
    }
  },
  mapStyle: darkMapStyle
};