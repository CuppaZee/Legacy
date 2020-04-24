const { Flame, cors, functions, send, utils, poly } = require('../../Utils');

module.exports = [
  functions.https.onRequest(async (req, res) => {
    var startTime = process.hrtime();
    return cors(req, res, async () => {
      var params = {
        game_id: {
          type: "number",
          required: true,
        }
      }
      if (!req.query.game_id) {
        return send(params, req, res, startTime, 3, 'game_id')
      }
      var [requirements, rewards] = (await Promise.all([
        Flame.Request('clan/v2/requirements', { game_id: req.query.game_id, clan_id: 1349 }),
        Flame.Request(`clan/v2/challenges/${req.query.game_id}`, {}, 234392)
      ])).map(i => i.data);
      var reqs = {
        battle: rewards.battle,
        levels: [],
        requirements: {},
        rewards: {},
        order: {
          individual: [],
          group: [],
          requirements: [],
          rewards: []
        }
      };
      var ensure = (a, b) => { if (!reqs.order[a].includes(b)) reqs.order[a].push(b) };
      for (var level in requirements.data.levels) {
        var level_requirements = requirements.data.levels[level];
        var level_rewards = rewards.rewards.levels[level];
        var level_data = {
          id: level_rewards.name.slice(6, -8),
          name: level_rewards.name.slice(0, -8),
          rewards: poly.fromEntries([].concat.apply([], level_rewards.rewards.map(i => {
            if (i.reward_id === 12) {
              return [[-1, i.amount], [-2, i.amount]]
            } else if (i.reward_id === 11) {
              return [[17, i.amount], [23, i.amount], [24, i.amount], [25, i.amount]]
            } else if (i.reward_id === 45) {
              return [[17, i.amount], [23, i.amount], [25, i.amount]]
            }
            return [[i.reward_id, i.amount]];
          }))),
          individual: poly.fromEntries(level_requirements.individual.map(i => [i.task_id, i.amount])),
          group: poly.fromEntries(level_requirements.group.map(i => [i.task_id, i.amount]))
        }
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
        for (var individual of level_requirements.individual) {
          if (!reqs.order.individual.includes(individual.task_id)) reqs.order.individual.push(individual.task_id)
          reqs.requirements[individual.task_id] = utils.clan.tasks[individual.task_id] || {
            task_id: individual.task_id,
            top: individual.name.split(' ').slice(0, -1).join(' '),
            bottom: individual.name.split(' ').slice(-1).join(' '),
            icon: individual.logo
          }
        }
        for (var group of level_requirements.group) {
          if (!reqs.order.group.includes(group.task_id)) reqs.order.group.push(group.task_id)
          reqs.requirements[group.task_id] = utils.clan.tasks[group.task_id] || {
            task_id: group.task_id,
            top: group.name.split(' ').slice(0, -1).join(' '),
            bottom: group.name.split(' ').slice(-1).join(' '),
            icon: group.logo
          }
        }
        reqs.levels.push(level_data);
      }
      reqs.order.individual.sort(((a, b) => a - b));
      reqs.order.group.sort(((a, b) => a - b));
      reqs.order.individual = [].concat(reqs.order.individual.filter(i => !reqs.order.group.includes(i)).sort((a, b) => a.group_id - b.group_id), reqs.order.individual.filter(i => reqs.order.group.includes(i)).sort((a, b) => a.group_id - b.group_id))
      reqs.order.group = [].concat(reqs.order.group.filter(i => reqs.order.individual.includes(i)).sort((a, b) => a.group_id - b.group_id), reqs.order.group.filter(i => !reqs.order.individual.includes(i)).sort((a, b) => a.group_id - b.group_id))
      reqs.order.requirements = [].concat(reqs.order.individual.filter(i => !reqs.order.group.includes(i)), reqs.order.group.filter(i => reqs.order.individual.includes(i)), reqs.order.group.filter(i => !reqs.order.individual.includes(i)))
      return send(params, req, res, startTime, 1, reqs)
    })
  })
];
