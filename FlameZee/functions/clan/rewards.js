var { request, retrieve } = require('../util');
const POLYfromEntries = require('object.fromentries')
module.exports = {
  path: "clan/rewards",
  latest: 1,
  versions: [
    {
      version: 1,
      params: {},
      async function({ db, params: { game_id } }) {
        var token = await retrieve(db, { user_id: 125914, teaken: false }, 60);
        var rewards = (await request(`clan/v2/challenges/${game_id}`, {}, token.access_token));
        var reqs = {
          battle: rewards.battle,
          levels: [],
          rewards: {},
          order: []
        };
        var ensure = (a, b) => { if (!reqs.order.includes(b)) reqs.order.push(b) };
        for (var level in rewards.rewards.levels) {
          var level_rewards = rewards.rewards.levels[level];
          var level_data = POLYfromEntries([].concat.apply([], level_rewards.rewards.map(i => {
            if (i.reward_id === 12) {
              return [[-1, i.amount], [-2, i.amount]]
            } else if (i.reward_id === 11) {
              return [[17, i.amount], [23, i.amount], [24, i.amount], [25, i.amount]]
            } else if (i.reward_id === 45) {
              return [[17, i.amount], [23, i.amount], [25, i.amount]]
            }
            return [[i.reward_id, i.amount]];
          })))
          for (var reward of level_rewards.rewards) {
            if (reward.reward_id === 12) {
              ensure("rewards", -1);
              ensure("rewards", -2);
              reqs.rewards[-1] = {
                "reward_id": -1,
                "name": "Virtual",
                "logo": "https://munzee.global.ssl.fastly.net/images/pins/virtual.png"
              }
              reqs.rewards[-2] = {
                "reward_id": -2,
                "name": "Virtual Color",
                "logo": "https://munzee.global.ssl.fastly.net/images/pins/virtual_rainbow.png"
              }
            } else if (reward.reward_id === 11) {
              ensure("rewards", 17);
              ensure("rewards", 23);
              ensure("rewards", 24);
              ensure("rewards", 25);
              reqs.rewards[17] = {
                "reward_id": 17,
                "name": "Flat Rob",
                "logo": "https://munzee.global.ssl.fastly.net/images/pins/flatrob.png"
              }
              reqs.rewards[23] = {
                "reward_id": 23,
                "name": "Flat Lou",
                "logo": "https://munzee.global.ssl.fastly.net/images/pins/flatlou.png"
              }
              reqs.rewards[24] = {
                "reward_id": 24,
                "name": "Flat Matt",
                "logo": "https://munzee.global.ssl.fastly.net/images/pins/flatmatt.png"
              }
              reqs.rewards[25] = {
                "reward_id": 25,
                "name": "Flat Hammock",
                "logo": "https://munzee.global.ssl.fastly.net/images/pins/flathammock.png"
              }
            } else if (reward.reward_id === 45) {
              ensure("rewards", 17);
              ensure("rewards", 23);
              ensure("rewards", 25);
              reqs.rewards[17] = {
                "reward_id": 17,
                "name": "Flat Rob",
                "logo": "https://munzee.global.ssl.fastly.net/images/pins/flatrob.png"
              }
              reqs.rewards[23] = {
                "reward_id": 23,
                "name": "Flat Lou",
                "logo": "https://munzee.global.ssl.fastly.net/images/pins/flatlou.png"
              }
              reqs.rewards[25] = {
                "reward_id": 25,
                "name": "Flat Hammock",
                "logo": "https://munzee.global.ssl.fastly.net/images/pins/flathammock.png"
              }
            } else {
              ensure("rewards", reward.reward_id);
              reqs.rewards[reward.reward_id] = {
                "reward_id": reward.reward_id,
                "name": reward.name,
                "logo": reward.logo
              }
            }
          }
          reqs.levels.push(level_data);
        }
        return {
          status: "success",
          data: reqs
        }
      }
    }
  ]
}