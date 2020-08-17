const weeks = require('./data.json');
const { retrieve, request } = require('../util');

const needsPatch = {
  "pkoopmanpk": true,
}

module.exports = {
  path: "weekly/minute",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db }) {
        const week = weeks.find(i => Date.now() > new Date(i.prestart).valueOf() && Date.now() < new Date(i.finalend).valueOf())
        if (!week) {
          return {
            status: "success",
            data: false,
          }
        }

        const data = (await db.collection('weekly').doc(week.id).get()).data().players;
        const batchDoc = (await db.collection('weekly').doc(week.id).collection('batches').orderBy('_updated_at').limit(1).get()).docs[0];
        const batch = batchDoc.data();

        var token = await retrieve(db, { user_id: 455935, teaken: false }, 180, "team");

        batch.players = await Promise.all(batch.players.map(async player => {
          try {
            if (!player.i) {
              const player_data = await request('user', { username: player.n }, token.access_token)
              player.i = Number(player_data.user_id);
            }
          } catch (e) {
            console.log('Weeklyboard Error', player.n, e);
            player.b = true;
          }
          return player;
        }))

        if (Date.now() < new Date(week.start).valueOf()) {
          batch.players = await Promise.all(batch.players.map(async player => {
            try {
              if (!player.pre) {
                const player_specials = await request('user/specials', { user_id: player.i }, token.access_token)
                player.pre = [];
                for (const req of week.requirements) {
                  let count = (player_specials.find(i => i.logo === req.type) || {}).count || 0;
                  player.pre.push(count);
                }
              }
              data[player.i] = {
                n: player.n,
                d: [],
                p: 0,
                f: 0
              }
            } catch (e) {
              console.log('Weeklyboard Error', player.n, e);
            }
            return player;
          }))
        } else if (Date.now() < new Date(week.end).valueOf()) {
          batch.players = await Promise.all(batch.players.map(async player => {
            try {
              let player_specials = await request('user/specials', { user_id: player.i }, token.access_token)
              if (!player.fpre || (!player.fix && (player.b || player.fpre.join()!==player.pre.join()))) {
                player.fpre = [];
                for (const req of week.requirements) {
                  let count = Number((player_specials.find(i => i.logo === req.type) || {}).count || 0);
                  if(player.pre[player.fpre.length] !== count) {
                    const player_type_captures = await request('user/captures/special',{
                      user_id: player.i,
                      type: req.type
                    }, token.access_token)
                    for(const capture of player_type_captures.munzees) {
                      if(new Date(capture.captured_at).valueOf() > new Date(week.start).valueOf()) {
                        count -= 1;
                      }
                    }
                  }
                  player.fpre.push(count);
                }
                player.fix = true;
              }
              player.p = 0;
              player.d = [];
              for (const req of week.requirements) {
                let count = Number((player_specials.find(i => i.logo === req.type) || {}).count || 0);
                count -= player.fpre[player.d.length];
                player.d.push(count);
                player.p += count * req.points;
              }
              data[player.i] = {
                n: player.n,
                d: player.fd || player.d,
                p: player.fp || player.p,
                f: player.fd?1:0
              }
            } catch (e) {
              console.log('Weeklyboard Error', player.n, e);
            }
            return player;
          }))
        } else if (Date.now() < new Date(week.finalend).valueOf()) {
          batch.players = await Promise.all(batch.players.map(async player => {
            try {
              if (!player.fd) {
                const player_specials = await request('user/specials', { user_id: player.i }, token.access_token)
                player.fp = 0;
                player.fd = [];
                for (const req of week.requirements) {
                  let count = Number((player_specials.find(i => i.logo === req.type) || {}).count || 0);
                  count -= player.fpre[player.fd.length];
                  if(player.d[player.fd.length] !== count) {
                    const player_type_captures = await request('user/captures/special',{
                      user_id: player.i,
                      type: req.type
                    }, token.access_token)
                    for(const capture of player_type_captures.munzees) {
                      if(new Date(capture.captured_at).valueOf() < new Date(week.end).valueOf()) {
                        count -= 1;
                      }
                    }
                  }
                  player.fd.push(count);
                  player.fp += count * req.points;
                }
              }
            } catch (e) {
              console.log('Weeklyboard Error', player.n, e);
            }
            data[player.i] = {
              n: player.n,
              d: player.fd || player.d,
              p: player.fp || player.p,
              f: player.fd?1:0
            }
            return player;
          }))
        }

        await db.collection('weekly').doc(week.id).set({ players: data });
        batch._updated_at = Date.now();
        await batchDoc.ref.set(batch);

        return {
          status: "success",
          data: true,
        }
      }
    }
  ]
}