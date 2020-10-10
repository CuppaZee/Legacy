var moment = require("moment");
var { retrieve, request } = require("../util");
var { g } = require('../util/db');
const gameConfig = require('./gameconfig.json');
const config = require('../config.json');
const capturesTypes = new Set([...gameConfig.healing.filter(i => i.type === "capture"), ...gameConfig.damaging.filter(i => i.type === "capture")].map(i => g(i.icon)));
const deploysTypes = new Set([...gameConfig.healing.filter(i => i.type === "deploy"), ...gameConfig.damaging.filter(i => i.type === "deploy")].map(i => g(i.icon)));

module.exports = {
  path: "competition/minute",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ params: { key }, teamsData, db }) {
        if(key !== config.zeecret_competition_minute_key) {
          return {
            status: "error",
            data: "Don't even try. 😜"
          }
        }
        const teams = await teamsData();
        const roundDoc = (await db.collection('zeecret').orderBy('round_id', 'desc').limit(1).get()).docs[0];
        if (!roundDoc) {
          return {
            status: "error",
            data: null,
          }
        }
        const round = roundDoc.data();
        const roundUpdate = {};
        const teamBatches = {};
        for (let team of ["pine", "pear"]) {
          const team_info = teams.find(i => i.team_id === (team));
          const userListUpdate = {}
          const batchID = round[`next_id_${team}`] || 0;
          const batches = await db.collection('zeecret').doc(roundDoc.id).collection(team).get();
          teamBatches[team] = batches.docs;
          const batchDoc = batches.docs.find(i=>i.id===batchID.toString());
          const batch = batchDoc ? batchDoc.data() : {};

          const users = team_info.list.slice(batchID * 90, (batchID + 1) * 90);
          console.log('competition/minute', team_info.team_id, team_info.list.length, users.length);

          for (let date = moment(round.start).hour(0).minute(0).second(0).millisecond(0); date.valueOf() < Date.now(); date = moment(date).add(1, 'day')) {
            const dateString = date.format('YYYY-MM-DD');
            // if (!batch[dateString] || !batch[dateString].final) {
            if(!batch[dateString] || !batch[dateString].finalised) {
              batch[dateString] = {}
            }
            if (date.valueOf() < Date.now() - 86400000 && !batch[dateString].finalised) {
              batch[dateString].finalised = {};
            }
            const data = await Promise.all(users.map(async i => {
              try {
                if(batch[dateString].finalised && batch[dateString].finalised[i.i]) return {};
                const token = await retrieve(db, { user_id: i.i, teaken: false }, 120, team)
                const activity = await request('statzee/player/day', { day: dateString }, token.access_token, `competition/minute/err ${i.i} ${i.n}`, true);
                if(!activity) return {};
                if(activity.status_text === "The access token provided is expired, revoked, malformed, or invalid for other reasons.") {
                  userListUpdate[`fixed.${i.i}`] = false;
                  return {};
                }
                if(activity.data && batch[dateString].finalised) {
                  batch[dateString].finalised[i.i] = true;
                }
                return activity.data || {};
              } catch(e) {
                console.log('Competition Error', i.n, i.i, e)
                return {};
              }
            }))
            const activity = {
              captures: [].concat(...data.map(i => ((i || {}).captures || []))),
              deploys: [].concat(...data.map(i => ((i || {}).deploys || [])))
            }
            console.log('competition/minute', team, activity.captures.length, activity.deploys.length, JSON.stringify(activity.captures[0]), JSON.stringify(activity.deploys[0]))
            for (const capture of activity.captures) {
              const icon = g(capture.pin);
              if (capturesTypes.has(icon)) {
                if (!batch[dateString][`${icon}_capture`]) batch[dateString][`${icon}_capture`] = [];
                batch[dateString][`${icon}_capture`].push(new Date(capture.captured_at).valueOf());
              }
            }
            for (const deploy of activity.deploys) {
              const icon = g(deploy.pin);
              if (deploysTypes.has(icon)) {
                if (!batch[dateString][`${icon}_deploy`]) batch[dateString][`${icon}_deploy`] = [];
                batch[dateString][`${icon}_deploy`].push(new Date(deploy.deployed_at).valueOf());
              }
            }
            // }
          }

          roundUpdate[`next_id_${team}`] = (users.length < 90) ? 0 : (batchID + 1);
          await db.collection('zeecret').doc(roundDoc.id).collection(team).doc(batchID.toString()).set(batch);
          if(Object.keys(userListUpdate).length > 0) await db.collection('data').doc(`user_list_${team}`).update(userListUpdate);
        }

        let actions = [];

        for(let batchDoc of teamBatches.pear) {
          let batchData = batchDoc.data();
          for(let day in batchData) {
            let batch = batchData[day];
            for(let requirement of [...gameConfig.healing,...gameConfig.damaging]) {
              actions = actions.concat((batch[`${requirement.icon}_${requirement.type}`]||[]).map(i=>({
                pear: requirement.health || 0,
                pine: -(requirement.damage || 0),
                time: i,
                type: `${requirement.icon}_${requirement.type}`,
                team: "pear",
              })))
            }
          }
        }
        for(let batchDoc of teamBatches.pine) {
          let batchData = batchDoc.data();
          for(let day in batchData) {
            let batch = batchData[day];
            for(let requirement of [...gameConfig.healing,...gameConfig.damaging]) {
              actions = actions.concat((batch[`${requirement.icon}_${requirement.type}`]||[]).map(i=>({
                pine: requirement.health || 0,
                pear: -(requirement.damage || 0),
                time: i,
                type: `${requirement.icon}_${requirement.type}`,
                team: "pine",
              })))
            }
          }
        }
        actions.sort((a,b)=>a.time-b.time);

        const startTime = moment(round.start).valueOf();
        
        const points = {
          pine: round.base || round.max,
          pear: round.base || round.max,
        }
        const stats = {
          pear: {},
          pine: {},
        }
        let end = false;

        for(let action of actions) {
          if(action.time > startTime && action.time < (Date.now() - ((teamBatches.pear.length + 2) * 60000)) && !end) {
            points.pine = Math.min(round.max, Math.max(0, points.pine + action.pine));
            points.pear = Math.min(round.max, Math.max(0, points.pear + action.pear));
            stats[action.team][action.type] = (stats[action.team][action.type] || 0) + 1;
            if(points.pine === 0 || points.pear === 0) {
              end = action.time;
            }
          }
        }

        if(end) {
          await db.collection('zeecret').doc((Number(roundDoc.id) + 1).toString()).set({
            max: 5000,
            base: 2500,
            next_id_pear: 0,
            next_id_pine: 0,
            round_id: Number(roundDoc.id) + 1,
            start: end,
          })
          roundUpdate.end = end;
          roundUpdate.result = points.pine === 0 ? "pear" : "pine";
        }

        roundUpdate.points = points;
        roundUpdate.stats = stats;
        roundUpdate.updated_at = (Date.now() - ((teamBatches.pear.length + 2) * 60000));

        await roundDoc.ref.update(roundUpdate);

        return {
          status: "success",
          data: {
            v: 5
          }
        };
      },
    },
  ],
};