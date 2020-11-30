
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module 'utils/db/types' or its corresp... Remove this comment to see the full error message
import getType from 'utils/db/types';

export function ActivityFilterer(dataraw: any, filters: any) {
  function filter(activity_entry: any, activity_type: any) {
    if (!filters) return true;
    if (filters.activity.size != 0 && !filters.activity.has(activity_type)) return false;
    let g = getType(activity_entry.pin);
    if (filters.state.size != 0 && !filters.state.has(g?.state || "N/A")) return false;
    if (filters.category.size != 0 && !filters.category.has(g?.category || "N/A")) return false;
    return true;
  }
  return {
    captures: dataraw?.captures.filter((i: any) => filter(i, "captures")),
    deploys: dataraw?.deploys.filter((i: any) => filter(i, "deploys")),
    captures_on: dataraw?.captures_on.filter((i: any) => filter(i, "captures_on")),
  };
}

export function ActivityConverter(dataraw: any, filters: any, userdata: any) {
  var data = ActivityFilterer(dataraw, filters);
  var activityList = [];
  for (const capture of data.captures.filter((i: any) => getType(i.pin)?.destination?.type == "bouncer")) {
    activityList.push({
      type: "capture",
      creator: capture.username,
      capper: userdata?.username,
      code: capture.code,
      name: capture.friendly_name,
      pin: capture.pin,
      points: Number(capture.points),
      subCaptures: [],
      time: capture.captured_at,
      bouncerHost: true,
      key: capture.key,
    })
  }
  for (const capture of data.captures.filter((i: any) => getType(i.pin)?.host || i.pin.match(/\/([^\/\.]+?)_?(?:virtual|physical)?_?host\./))) {
    activityList.push({
      type: "capture",
      creator: capture.username,
      capper: userdata?.username,
      code: capture.code,
      name: capture.friendly_name,
      pin: capture.pin,
      points: Number(capture.points),
      subCaptures: [],
      time: capture.captured_at,
      bouncerHost: true,
      key: capture.key,
    })
  }
  for (const capture of data.captures.filter((i: any) => getType(i.pin)?.destination?.type != "bouncer" && !getType(i.pin)?.host && !i.pin.match(/\/([^\/\.]+?)_?(?:virtual|physical)?_?host\./))) {
    const bouncerHost = activityList.findIndex(i => i.bouncerHost && i.time == capture.captured_at);
    if (bouncerHost !== -1) {
      activityList[bouncerHost].subCaptures.push({
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'never'.
        type: "capture",
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
        creator: capture.username,
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
        capper: userdata?.username,
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
        code: capture.code,
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
        name: capture.friendly_name,
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
        pin: capture.pin,
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'number' is not assignable to type 'never'.
        points: Number(capture.points),
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
        time: capture.captured_at,
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'any' is not assignable to type 'never'.
        key: capture.key,
      })
    } else {
      activityList.push({
        type: "capture",
        creator: capture.username,
        capper: userdata?.username,
        code: capture.code,
        name: capture.friendly_name,
        pin: capture.pin,
        points: Number(capture.points),
        subCaptures: [],
        time: capture.captured_at,
        key: capture.key,
      })
    }
  }
  
  for (const capture of data.captures_on) {
    const ownCapture = activityList.findIndex(i => i.type === "capture" && i.time === capture.captured_at && i.creator === userdata?.username && i.code === capture.code && i.pin === capture.pin);
    if (ownCapture !== -1) {
      activityList[ownCapture].points += Number(capture.points_for_creator);
    } else {
      activityList.push({
        type: "capon",
        creator: userdata?.username,
        capper: capture.username,
        code: capture.code,
        name: capture.friendly_name,
        pin: capture.pin,
        points: Number(capture.points_for_creator),
        subCaptures: [],
        time: capture.captured_at,
        key: capture.key,
      })
    }
  }
  
  for (const deploy of data.deploys) {
    activityList.push({
      type: "deploy",
      creator: userdata?.username,
      code: deploy.code,
      name: deploy.friendly_name,
      pin: deploy.pin,
      points: Number(deploy.points),
      subCaptures: [],
      time: deploy.deployed_at,
      key: deploy.key,
    })
  }
  // @ts-expect-error ts-migrate(2362) FIXME: The left-hand side of an arithmetic operation must... Remove this comment to see the full error message
  activityList.sort((a,b)=>new Date(b.time) - new Date(a.time))
  var heightTotal = 0;
  for(const index in activityList) {
    const h = 8 + (59 * ((activityList[index].subCaptures?.length||0)+1));
    activityList[index] = {
      ...activityList[index],
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ height: number; offset: number; type: stri... Remove this comment to see the full error message
      height: h,
      offset: heightTotal
    }
    heightTotal += h;
  }
  return activityList;
} 