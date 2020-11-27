import getType from 'utils/db/types';

export function ActivityFilterer(dataraw, filters) {
  function filter(activity_entry, activity_type) {
    if (!filters) return true;
    if (filters.activity.size != 0 && !filters.activity.has(activity_type)) return false;
    let g = getType(activity_entry.pin);
    if (filters.state.size != 0 && !filters.state.has(g?.state || "N/A")) return false;
    if (filters.category.size != 0 && !filters.category.has(g?.category || "N/A")) return false;
    return true;
  }
  return {
    captures: dataraw?.captures.filter(i => filter(i, "captures")),
    deploys: dataraw?.deploys.filter(i => filter(i, "deploys")),
    captures_on: dataraw?.captures_on.filter(i => filter(i, "captures_on")),
  }
}

export function ActivityConverter(dataraw, filters, userdata) {
  var data = ActivityFilterer(dataraw, filters);
  var activityList = [];
  for (const capture of data.captures.filter(i => getType(i.pin)?.destination?.type == "bouncer")) {
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
  for (const capture of data.captures.filter(i => getType(i.pin)?.host || i.pin.match(/\/([^\/\.]+?)_?(?:virtual|physical)?_?host\./))) {
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
  for (const capture of data.captures.filter(i => getType(i.pin)?.destination?.type != "bouncer" && !getType(i.pin)?.host && !i.pin.match(/\/([^\/\.]+?)_?(?:virtual|physical)?_?host\./))) {
    const bouncerHost = activityList.findIndex(i => i.bouncerHost && i.time == capture.captured_at);
    if (bouncerHost !== -1) {
      activityList[bouncerHost].subCaptures.push({
        type: "capture",
        creator: capture.username,
        capper: userdata?.username,
        code: capture.code,
        name: capture.friendly_name,
        pin: capture.pin,
        points: Number(capture.points),
        time: capture.captured_at,
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
  activityList.sort((a,b)=>new Date(b.time) - new Date(a.time))
  var heightTotal = 0;
  for(const index in activityList) {
    const h = 8 + (59 * ((activityList[index].subCaptures?.length||0)+1));
    activityList[index] = {
      ...activityList[index],
      height: h,
      offset: heightTotal
    }
    heightTotal += h;
  }
  return activityList;
} 