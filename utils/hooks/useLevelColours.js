function whiteOrBlack(bgColor) {
  var color = (bgColor.charAt(0) === '#') ? bgColor.substring(1, 7) : bgColor;
  var r = parseInt(color.substring(0, 2), 16); // hexToR
  var g = parseInt(color.substring(2, 4), 16); // hexToG
  var b = parseInt(color.substring(4, 6), 16); // hexToB
  var uicolors = [r / 255, g / 255, b / 255];
  var c = uicolors.map((col) => {
    if (col <= 0.03928) {
      return col / 12.92;
    }
    return Math.pow((col + 0.055) / 1.055, 2.4);
  });
  var L = (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2]);
  return (L > 0.179) ? '#000000' : '#ffffff';
}
function a(x,d) {
  if(d) return {
    bg: null,
    fg: x
  }
  return {
    fg: whiteOrBlack(x),
    bg: x
  }
}
import { useSelector } from 'react-redux';
import stringify from 'fast-json-stable-stringify';
import { useTheme } from 'react-native-paper';



export default function useLevelColours() {
  var theme = useTheme();
  var settings = useSelector(i=>i.settings)||{};
  var d = (settings.alt_clan_design ? !theme.dark : theme.dark)
  var levelColours = {
    ind: a(settings.clan_level_ind,d),
    bot: a(settings.clan_level_bot,d),
    gro: a(settings.clan_level_gro,d),
    0:   a(settings.clan_level_0,d),
    1:   a(settings.clan_level_1,d),
    2:   a(settings.clan_level_2,d),
    3:   a(settings.clan_level_3,d),
    4:   a(settings.clan_level_4,d),
    5:   a(settings.clan_level_5,d),
    null:a(settings.clan_level_null,d),
    border: d?'#fffa':'#000a'
  }
  return {
    ...levelColours,
    check: stringify(levelColours)
  };
}