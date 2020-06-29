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
  for (var credit in credits) {
    data.credits.push({
      name: getType(credit, "icon")?.name,
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
      name: getType(munzee.type, "icon")?.name,
      icon: `https://munzee.global.ssl.fastly.net/images/pins/${munzee.type}.png`,
      amount: Number(munzee.amount)
    })
  }
  for (var log of history.items??[]) {
    data.history.push({
      name: getType(log.type.replace(/[0-9]+x /, ''), "icon")?.name||log.type,
      origName: log.type,
      reason: log.log_text,
      icon: `https://munzee.global.ssl.fastly.net/images/pins/${getType(log.type.replace(/[0-9]+x /, ''), "icon")?.icon || 'NA'}.png`,
      time: moment.tz(log.time_awarded, "America/Chicago").valueOf()
    })
  }
  for (var item of [...data.credits,...data.undeployed]) {
    var type = (item.category?item:null)||getType(item.icon)||{category:"other"};
    if(!type.category) type.category="other";
    if(type.category=="virtual") type.category="misc";
    if(type.category=="zeecret") type.category="misc";
    if(type.evolution) type.category="evolution";
    if(!data.types[type.category]) data.types[type.category] = [];
    data.types[type.category].push(item);
  }
  data.history.sort((a, b) => b.time - a.time)
  for (var item of data.history) {
    if(historyBatchTitle === item.reason && item.time > historyBatchTime - 300000) {
      historyBatchTime = item.time;
      if(data.historyBatches[data.historyBatches.length-1].items.find(i=>i.icon==item.icon)) {
        data.historyBatches[data.historyBatches.length-1].items[data.historyBatches[data.historyBatches.length-1].items.findIndex(i=>i.icon==item.icon)].amount += Number((item.origName.match(/^([0-9]+)x /i)||[])[1]||"1")
      } else {
        data.historyBatches[data.historyBatches.length-1].items.push({
          amount: Number((item.origName.match(/^([0-9]+)x /i)||[])[1]||"1"),
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
            amount: Number((item.origName.match(/^([0-9]+)x /i)||[])[1]||"1"),
            icon: item.icon,
            name: item.name,
            original: item.name
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
      if(d.title.match(/munzee\s*support/i)) {
        d.short_title = "Munzee Support"
      }
      if(d.title.match(/\btest\b/i)) {
        d.short_title = "Test"
      }
      data.historyBatches.push(d)
    }
  }
  return data;
}