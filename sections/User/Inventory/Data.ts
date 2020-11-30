import moment from 'moment';
import 'moment-timezone';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types' or its corresp... Remove this comment to see the full error message
import getType from 'utils/db/types';
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types.json' or its co... Remove this comment to see the full error message
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
    mode,
    includeZeros,
  }
  if(!credits || !boosters || !history || !undeployed) return null;
  for (var credit in credits) {
    data.credits.push({
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
      name: getType(credit, "icon")?.name,
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
      icon: `https://munzee.global.ssl.fastly.net/images/pins/${getType(credit, "icon")?.icon??credit}.png`,
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'never'.
      amount: Number(credits[credit]),
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'never'.
      c: 1
    })
  }
  for (var b in boosters) {
    var booster = boosters[b];
    data.credits.push({
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
      name: booster.name,
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
      icon: `https://munzee.global.ssl.fastly.net/images/pins/${getType(booster.name, "icon")?.icon}.png`,
      // icon: `https://server.cuppazee.app/boosters/${booster.type_id}.png`,
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'never'.
      amount: Number(booster.credits),
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
      category: "Boosters",
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'never'.
      b: 1
    })
  }
  for (var munzee of undeployed) {
    data.undeployed.push({
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
      name: getType(munzee.type, "icon")?.name,
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
      icon: `https://munzee.global.ssl.fastly.net/images/pins/${getType(munzee.type, "icon")?.icon ?? munzee.type}.png`,
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'never'.
      amount: Number(munzee.amount),
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'never'.
      u: 1
    })
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type '{}'.
  for (var log of history.items ?? []) {
    data.history.push({
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
      name: getType(log.type.replace(/^([0-9]+)x? /i, ''), "icon")?.name || log.type,
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
      origName: log.type,
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
      reason: log.log_text,
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
      icon: `https://munzee.global.ssl.fastly.net/images/pins/${getType(log.type.replace(/^([0-9]+)x? /i, ''), "icon")?.icon || 'NA'}.png`,
      // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'never'.
      time: moment.tz(log.time_awarded, "America/Chicago").valueOf()
    })
  }
  for (var item of [...data.credits, ...data.undeployed]) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'category' does not exist on type 'never'... Remove this comment to see the full error message
    var type = (item.category ? item : null) || getType(item.icon) || { category: "other" };
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'amount' does not exist on type 'never'.
    if(item.amount === 0 && includeZeros !== "default") continue;
    if(mode === "state") {
      if(!type.state) type.state = "other";
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      type.state = {
        bouncer: "Physicals",
        virtual: "Virtuals",
        physical: "Physicals",
        other: "Credits"
      }[type.state] || type.state;
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!data.types[type.state]) data.types[type.state] = [];
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      data.types[type.state].push(item);
    } else if(mode === "type") {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'c' does not exist on type 'never'.
      type.type = item.c ? "Credits" : (item.b ? "Boosters" : "Undeployed");
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!data.types[type.type]) data.types[type.type] = [];
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      data.types[type.type].push(item);
    } else {
      if (!type.category) type.category = "other";
      if (type.category == "virtual") type.category = "misc";
      if (type.category == "zeecret") type.category = "misc";
      if (type.evolution) type.category = "evolution";
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      if (!data.types[type.category]) data.types[type.category] = [];
      // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
      data.types[type.category].push(item);
    }
  }
  if(includeZeros === "all" && (mode === "category" || mode === "state")) {
    for(let type of types.filter((i: any) => i.inventory || (!i.cuppazeeExtra&&!i.evolution&&!i.event&&!(i.bouncer&&!i.generic)&&!i.scatter&&!i.host&&!i.unique&&!(i.hidden&&i.category!=="credit"&&!i.generic)&&i.destination?.type!=="room"&&!i.destination?.star_level&&i.category!=="virtual"&&i.category!=="tourism"&&i.category!=="reseller"&&!i.category.includes('zodiac')&&!["qrewzee","renovation","eventtrail","event","eventpin","eventindicator","personalmunzee","premiumpersonal","springseasonalmunzee","summerseasonalmunzee","fallseasonalmunzee","winterseasonalmunzee","social","rover","zeecred"].includes(i.icon)))) {
      if(mode === "state") {
        if(!type.state) type.state = "other";
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        type.state = {
          bouncer: "Physicals",
          virtual: "Virtuals",
          physical: "Physicals",
          other: "Credits"
        }[type.state] || type.state;
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!data.types[type.state]) data.types[type.state] = [];
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!data.types[type.state].some((i: any) => i.icon === `https://munzee.global.ssl.fastly.net/images/pins/${type.icon}.png`)) data.types[type.state].push({
          name: type.name,
          icon: `https://munzee.global.ssl.fastly.net/images/pins/${type.icon}.png`,
          amount: 0,
        });
      } else {
        if (type.category == "zeecret") type.category = "misc";
        if (type.evolution) type.category = "evolution";
        if (type.icon.endsWith('booster')) type.category = "Boosters";
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!data.types[type.category]) data.types[type.category] = [];
        // @ts-expect-error ts-migrate(7053) FIXME: Element implicitly has an 'any' type because expre... Remove this comment to see the full error message
        if (!data.types[type.category].some((i: any) => i.icon === `https://munzee.global.ssl.fastly.net/images/pins/${type.icon}.png`)) data.types[type.category].push({
          name: type.name,
          icon: `https://munzee.global.ssl.fastly.net/images/pins/${type.icon}.png`,
          amount: 0,
        });
      }
    }
  }
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'time' does not exist on type 'never'.
  data.history.sort((a, b) => b.time - a.time)
  // @ts-expect-error ts-migrate(2403) FIXME: Subsequent variable declarations must have the sam... Remove this comment to see the full error message
  for (var item of data.history) {
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'reason' does not exist on type 'never'.
    if (historyBatchTitle === item.reason && item.time > historyBatchTime - 300000) {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'time' does not exist on type 'never'.
      historyBatchTime = item.time;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'never'.
      if (data.historyBatches[data.historyBatches.length - 1].items.find((i: any) => i.icon == item.icon)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'never'.
        data.historyBatches[data.historyBatches.length - 1].items[data.historyBatches[data.historyBatches.length - 1].items.findIndex((i: any) => i.icon == item.icon)].amount += Number((item.origName.match(/^([0-9]+)x? /i) || [])[1] || "1")
      } else {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'items' does not exist on type 'never'.
        data.historyBatches[data.historyBatches.length - 1].items.push({
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'origName' does not exist on type 'never'... Remove this comment to see the full error message
          amount: Number((item.origName.match(/^([0-9]+)x? /i) || [])[1] || "1"),
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type 'never'.
          icon: item.icon,
          // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
          name: item.name
        });
      }
    } else {
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'reason' does not exist on type 'never'.
      historyBatchTitle = item.reason;
      // @ts-expect-error ts-migrate(2339) FIXME: Property 'time' does not exist on type 'never'.
      historyBatchTime = item.time;
      var d = {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'reason' does not exist on type 'never'.
        title: item.reason,
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'time' does not exist on type 'never'.
        time: item.time,
        items: [
          {
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'origName' does not exist on type 'never'... Remove this comment to see the full error message
            amount: Number((item.origName.match(/^([0-9]+)x? /i) || [])[1] || "1"),
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'icon' does not exist on type 'never'.
            icon: item.icon,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
            name: item.name,
            // @ts-expect-error ts-migrate(2339) FIXME: Property 'name' does not exist on type 'never'.
            original: item.name
          }
        ]
      };
      if (d.title.match(/space\s*coast/i)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'short_title' does not exist on type '{ t... Remove this comment to see the full error message
        d.short_title = "Space Coast Geo Store"
      }
      if (d.title.match(/munzee\s*store/i)) {
        // d.short_title = "Space Coast Geo Store"
        d.title = "Freeze Tag Store"
      }
      if (d.title.match(/pimedus/i)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'short_title' does not exist on type '{ t... Remove this comment to see the full error message
        d.short_title = "Pimedus Reward"
      }
      if (d.title.match(/magnetus/i)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'short_title' does not exist on type '{ t... Remove this comment to see the full error message
        d.short_title = "Magnetus Reward"
      }
      if (d.title.match(/prize\s*wheel/i)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'short_title' does not exist on type '{ t... Remove this comment to see the full error message
        d.short_title = "Prize Wheel Reward"
      }
      if (d.title.match(/thanks/i) && d.title.match(/premium/i)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'short_title' does not exist on type '{ t... Remove this comment to see the full error message
        d.short_title = "Premium Reward"
      }
      if (d.title.match(/rewards/i) && d.title.match(/level [0-9]/i)) {
        d.title = `${d.title.match(/level [0-9]/i)?.[0]} - ${d.title.match(/[a-z]+ [0-9]{2,}/i)?.[0]}`
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'clan' does not exist on type '{ title: a... Remove this comment to see the full error message
        d.clan = true;
      }
      if (d.title.match(/rewards/i) && d.title.match(/zeeops/i)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'short_title' does not exist on type '{ t... Remove this comment to see the full error message
        d.short_title = "ZeeOps Rewards"
      }
      if (d.title.match(/munzee\s*support/i)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'short_title' does not exist on type '{ t... Remove this comment to see the full error message
        d.short_title = "Munzee Support"
      }
      if (d.title.match(/\btest\b/i)) {
        // @ts-expect-error ts-migrate(2339) FIXME: Property 'short_title' does not exist on type '{ t... Remove this comment to see the full error message
        d.short_title = "Test"
      }
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ title: any; time: any; items: ... Remove this comment to see the full error message
      data.historyBatches.push(d)
    }
  }
  return data;
}