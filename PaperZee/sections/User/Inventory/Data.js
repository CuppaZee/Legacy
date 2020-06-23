import MunzeeTypes from 'utils/db/types.json';
import moment from 'moment';
import 'moment-timezone';
import getType from 'utils/db/types';
export default function InventoryConverter(credits={}, boosters=[], history={}, undeployed=[]) {
  var historyBatchTitle = "";
  var historyBatchTime = Infinity;
  var data = {
    undeployed: [],
    credits: [],
    history: [],
    types: {},
    historyBatches: []
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
      name: "Destination",
      category: "destination"
    },
    {
      icon: "secure_social",
      name: "Secure Social",
      category: "misc"
    },
    {
      icon: "virtual_colors",
      name: "Virtual Color",
      category: "virtual"
    },
    {
      icon: "virtual_colors",
      name: "Virtual Colors",
      category: "virtual"
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
      name: "Zodiac",
      category: "misc"
    },
    {
      icon: "chinese_zodiac",
      name: "Chinese Zodiac",
      category: "misc"
    },
    {
      icon: "seasonal",
      name: "Seasonal",
      category: "misc"
    }
  ]
  function get(a, b) {
    // TODO Use new system
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
      icon: `https://server.cuppazee.app/boosters/${booster.type_id}.png`,
      amount: Number(booster.credits),
      category: "Boosters"
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
  for (var item of [...data.credits,...data.undeployed]) {
    var type = (item.category?item:null)||getType(item.icon)||extras.find(i=>i.icon==item.icon.slice(49,-4))||{category:"other"};
    if(!type.category) type.category="other";
    if(type.category=="virtual") type.category="misc";
    if(type.category=="zeecret") type.category="misc";
    if(type.evolution) type.category="evolution";
    if(!data.types[type.category]) data.types[type.category] = [];
    data.types[type.category].push(item);
  }
  data.history.sort((a, b) => b.time - a.time)
  for (var item of data.history) {
    if(historyBatchTitle === item.reason && item.time > historyBatchTime - 30000) {
      historyBatchTime = item.time;
      if(data.historyBatches[data.historyBatches.length-1].items.find(i=>i.icon==item.icon)) {
        data.historyBatches[data.historyBatches.length-1].items[data.historyBatches[data.historyBatches.length-1].items.findIndex(i=>i.icon==item.icon)].amount += Number((item.name.match(/^([0-9]+)x /i)||[])[1]||"1")
      } else {
        data.historyBatches[data.historyBatches.length-1].items.push({
          amount: Number((item.name.match(/^([0-9]+)x /i)||[])[1]||"1"),
          icon: item.icon,
          name: item.name
        });
      }
    } else {
      historyBatchTitle = item.reason;
      historyBatchTime = item.time;
      var d = {
        title: item.reason,
        time: item.time,
        items: [
          {
            amount: Number((item.name.match(/^([0-9]+)x /i)||[])[1]||"1"),
            icon: item.icon,
            name: item.name
          }
        ]
      };
      if(d.title.match(/space\s*coast/i)) {
        d.short_title = "Space Coast Geo Store"
      }
      if(d.title.match(/munzee\s*store/i)) {
        // d.short_title = "Space Coast Geo Store"
        d.title = "Freeze Tag Store"
      }
      if(d.title.match(/pimedus/i)) {
        d.short_title = "Pimedus Reward"
      }
      if(d.title.match(/magnetus/i)) {
        d.short_title = "Magnetus Reward"
      }
      if(d.title.match(/prize\s*wheel/i)) {
        d.short_title = "Prize Wheel Reward"
      }
      if(d.title.match(/thanks/i)&&d.title.match(/premium/i)) {
        d.short_title = "Premium Reward"
      }
      if(d.title.match(/rewards/i)&&d.title.match(/level [0-9]/i)) {
        d.title = `${d.title.match(/level [0-9]/i)?.[0]} - ${d.title.match(/[a-z]+ [0-9]{2,}/i)?.[0]}`
        d.clan = true;
      }
      if(d.title.match(/rewards/i)&&d.title.match(/zeeops/i)) {
        d.short_title = "ZeeOps Rewards"
      }
      data.historyBatches.push(d)
    }
  }
  return data;
}