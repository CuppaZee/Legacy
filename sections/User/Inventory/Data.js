import moment from 'moment';
import 'moment-timezone';
import getType from 'utils/db/types';
import types from 'utils/db/types.json';
export default function InventoryConverter(credits = {}, boosters = [], history = {}, undeployed = [], mode = "category", includeZeros = "all") {
  var historyBatchTitle = "";
  var historyBatchTime = Infinity;
  var data = {
    undeployed: [],
    credits: [],
    history: [],
    types: {},
    historyBatches: [],
    mode
  }
  for (var credit in credits) {
    data.credits.push({
      name: getType(credit, "icon")?.name,
      icon: `https://munzee.global.ssl.fastly.net/images/pins/${getType(credit, "icon")?.icon??credit}.png`,
      amount: Number(credits[credit]),
      c: 1
    })
  }
  for (var b in boosters) {
    var booster = boosters[b];
    data.credits.push({
      name: booster.name,
      icon: `https://munzee.global.ssl.fastly.net/images/pins/${getType(booster.name, "icon")?.icon}.png`,
      // icon: `https://server.cuppazee.app/boosters/${booster.type_id}.png`,
      amount: Number(booster.credits),
      category: "Boosters",
      b: 1
    })
  }
  for (var munzee of undeployed) {
    data.undeployed.push({
      name: getType(munzee.type, "icon")?.name,
      icon: `https://munzee.global.ssl.fastly.net/images/pins/${getType(munzee.type, "icon")?.icon ?? munzee.type}.png`,
      amount: Number(munzee.amount),
      u: 1
    })
  }
  for (var log of history.items ?? []) {
    data.history.push({
      name: getType(log.type.replace(/^([0-9]+)x? /i, ''), "icon")?.name || log.type,
      origName: log.type,
      reason: log.log_text,
      icon: `https://munzee.global.ssl.fastly.net/images/pins/${getType(log.type.replace(/^([0-9]+)x? /i, ''), "icon")?.icon || 'NA'}.png`,
      time: moment.tz(log.time_awarded, "America/Chicago").valueOf()
    })
  }
  for (var item of [...data.credits, ...data.undeployed]) {
    var type = (item.category ? item : null) || getType(item.icon) || { category: "other" };
    if(item.amount === 0 && includeZeros !== "default") continue;
    if(mode === "state") {
      if(!type.state) type.state = "other";
      type.state = {
        bouncer: "Physicals",
        virtual: "Virtuals",
        physical: "Physicals",
        other: "Credits"
      }[type.state] || type.state;
      if (!data.types[type.state]) data.types[type.state] = [];
      data.types[type.state].push(item);
    } else if(mode === "type") {
      type.type = item.c ? "Credits" : (item.b ? "Boosters" : "Undeployed");
      if (!data.types[type.type]) data.types[type.type] = [];
      data.types[type.type].push(item);
    } else {
      if (!type.category) type.category = "other";
      if (type.category == "virtual") type.category = "misc";
      if (type.category == "zeecret") type.category = "misc";
      if (type.evolution) type.category = "evolution";
      if (!data.types[type.category]) data.types[type.category] = [];
      data.types[type.category].push(item);
    }
  }
  if(includeZeros === "all" && (mode === "category" || mode === "state")) {
    for(let type of types.filter(i=>i.inventory || (!i.icon.startsWith('cuppazee__')&&!i.evolution&&!i.event&&!(i.bouncer&&!i.generic)&&!i.scatter&&!i.host&&!i.unique&&!(i.hidden&&i.category!=="credit"&&!i.generic)&&i.destination?.type!=="room"&&!i.destination?.star_level&&i.category!=="virtual"&&i.category!=="tourism"&&i.category!=="reseller"&&!i.category.includes('zodiac')&&!["qrewzee","renovation","eventtrail","event","eventpin","eventindicator","personalmunzee","premiumpersonal","springseasonalmunzee","summerseasonalmunzee","fallseasonalmunzee","winterseasonalmunzee","social","rover","zeecred"].includes(i.icon)))) {
      if(mode === "state") {
        if(!type.state) type.state = "other";
        type.state = {
          bouncer: "Physicals",
          virtual: "Virtuals",
          physical: "Physicals",
          other: "Credits"
        }[type.state] || type.state;
        if (!data.types[type.state]) data.types[type.state] = [];
        if (!data.types[type.state].some(i=>i.icon === `https://munzee.global.ssl.fastly.net/images/pins/${type.icon}.png`)) data.types[type.state].push({
          name: type.name,
          icon: `https://munzee.global.ssl.fastly.net/images/pins/${type.icon}.png`,
          amount: 0,
        });
      } else {
        if (type.category == "zeecret") type.category = "misc";
        if (type.evolution) type.category = "evolution";
        if (type.icon.endsWith('booster')) type.category = "Boosters";
        if (!data.types[type.category]) data.types[type.category] = [];
        if (!data.types[type.category].some(i=>i.icon === `https://munzee.global.ssl.fastly.net/images/pins/${type.icon}.png`)) data.types[type.category].push({
          name: type.name,
          icon: `https://munzee.global.ssl.fastly.net/images/pins/${type.icon}.png`,
          amount: 0,
        });
      }
    }
  }
  data.history.sort((a, b) => b.time - a.time)
  for (var item of data.history) {
    if (historyBatchTitle === item.reason && item.time > historyBatchTime - 300000) {
      historyBatchTime = item.time;
      if (data.historyBatches[data.historyBatches.length - 1].items.find(i => i.icon == item.icon)) {
        data.historyBatches[data.historyBatches.length - 1].items[data.historyBatches[data.historyBatches.length - 1].items.findIndex(i => i.icon == item.icon)].amount += Number((item.origName.match(/^([0-9]+)x? /i) || [])[1] || "1")
      } else {
        data.historyBatches[data.historyBatches.length - 1].items.push({
          amount: Number((item.origName.match(/^([0-9]+)x? /i) || [])[1] || "1"),
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
            amount: Number((item.origName.match(/^([0-9]+)x? /i) || [])[1] || "1"),
            icon: item.icon,
            name: item.name,
            original: item.name
          }
        ]
      };
      if (d.title.match(/space\s*coast/i)) {
        d.short_title = "Space Coast Geo Store"
      }
      if (d.title.match(/munzee\s*store/i)) {
        // d.short_title = "Space Coast Geo Store"
        d.title = "Freeze Tag Store"
      }
      if (d.title.match(/pimedus/i)) {
        d.short_title = "Pimedus Reward"
      }
      if (d.title.match(/magnetus/i)) {
        d.short_title = "Magnetus Reward"
      }
      if (d.title.match(/prize\s*wheel/i)) {
        d.short_title = "Prize Wheel Reward"
      }
      if (d.title.match(/thanks/i) && d.title.match(/premium/i)) {
        d.short_title = "Premium Reward"
      }
      if (d.title.match(/rewards/i) && d.title.match(/level [0-9]/i)) {
        d.title = `${d.title.match(/level [0-9]/i)?.[0]} - ${d.title.match(/[a-z]+ [0-9]{2,}/i)?.[0]}`
        d.clan = true;
      }
      if (d.title.match(/rewards/i) && d.title.match(/zeeops/i)) {
        d.short_title = "ZeeOps Rewards"
      }
      if (d.title.match(/munzee\s*support/i)) {
        d.short_title = "Munzee Support"
      }
      if (d.title.match(/\btest\b/i)) {
        d.short_title = "Test"
      }
      data.historyBatches.push(d)
    }
  }
  return data;
}