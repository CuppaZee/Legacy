import MunzeeTypes from '~sections/DB/alltypes.min.json';
import moment from 'moment';
import 'moment-timezone';
export default function InventoryConverter(credits={}, boosters=[], history={}, undeployed=[]) {
  undeployed = Object.entries(undeployed?.map?.(i => i.pin_icon.match(/\/([^./]+).png/)[1])?.reduce?.((obj, item) => {
    obj[item] = (obj[item] || 0) + 1;
    return obj;
  }, {})).map(i => ({ type: i[0], amount: i[1] }));
  var data = {
    undeployed: [],
    credits: [],
    history: [],
  }
  var extras = [
    {
      icon: "magnet",
      name: "Magnet"
    },
    {
      icon: "virtual_magnet",
      name: "Virtual Magnet"
    },
    {
      icon: "blast_capture",
      name: "Blast Capture"
    },
    {
      icon: "blast_capture_mini",
      name: "Mini Blast Capture"
    },
    {
      icon: "blast_capture_mega",
      name: "MEGA Blast Capture"
    },
    {
      icon: "destination",
      name: "Destination"
    },
    {
      icon: "secure_social",
      name: "Secure Social"
    },
    {
      icon: "virtual_colors",
      name: "Virtual Color"
    },
    {
      icon: "virtual_colors",
      name: "Virtual Colors"
    },
    {
      icon: "upgrade_myth",
      name: "Bouncer Upgrade"
    },
    {
      icon: "evolution_reset",
      name: "Evolution Reset"
    },
    {
      icon: "zeds",
      name: "ZEDS"
    },
    {
      icon: "zeds",
      name: "Zeds"
    },
    {
      icon: "zodiac",
      name: "Zodiac"
    },
    {
      icon: "chinese_zodiac",
      name: "Chinese Zodiac"
    },
    {
      icon: "seasonal",
      name: "Seasonal"
    }
  ]
  function get(a, b) {
    return (MunzeeTypes.find(i => (i[a] || "").toLowerCase().replace(/_/g,'') === b.toLowerCase().replace(/_/g,'')) || extras.find(i => (i[a] || "").toLowerCase().replace(/_/g,'') === b.toLowerCase().replace(/_/g,''))) || {}
  }
  for (var credit in credits) {
    data.credits.push({
      name: get("icon", credit).name,
      icon: `https://munzee.global.ssl.fastly.net/images/pins/${credit}.png`,
      amount: Number(credits[credit])
    })
  }
  for (var b in boosters) {
    var booster = boosters[b];
    data.credits.push({
      name: booster.name,
      icon: `https://flame.cuppazee.uk/boosters/${booster.type_id}.png`,
      amount: Number(booster.credits)
    })
  }
  for (var munzee of undeployed) {
    data.undeployed.push({
      name: get("icon", munzee.type).name,
      icon: `https://munzee.global.ssl.fastly.net/images/pins/${munzee.type}.png`,
      amount: Number(munzee.amount)
    })
  }
  for (var log of history.items??[]) {
    data.history.push({
      name: log.type,
      reason: log.log_text,
      icon: `https://munzee.global.ssl.fastly.net/images/pins/${get("name", log.type.replace(/[0-9]+x /, '')).icon || get("icon", log.type.replace(/[0-9]+x /, '')).icon || 'NA'}.png`,
      time: moment.tz(log.time_awarded, "America/Chicago").valueOf()
    })
  }
  data.history.sort((a, b) => b.time - a.time)
  return data;
}