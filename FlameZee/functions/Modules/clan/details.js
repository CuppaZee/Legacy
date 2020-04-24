const { Flame, cors, functions, send, db, utils } = require('../../Utils');

module.exports = [
  functions.https.onRequest(async (req, res) => {
    var startTime = process.hrtime();
    return cors(req, res, async () => {
      var params = {
        game_id: {
          type: "number",
          subtype: "gameId",
          required: true,
        },
        clan_id: {
          type: "number",
          subtype: "clanId",
          required: true,
        }
      }
      if (!req.query.game_id) {
        return send(params, req, res, startTime, 3, 'game_id')
      }
      if (!req.query.clan_id) {
        return send(params, req, res, startTime, 3, 'clan_id')
      }
      const shadow = [
        1902,
        1349,
        457,
        1441,
        1870,
        1493,
        -1,
        -2,
        -3,
        -4,
        -5,
        251,
        1793,
        1551,
        1605,
        19,
        1695,
        1343,
        1364,
        1498,
        1491
      ];
      var [requirements, clan, shadow_data] = (await Promise.all([
        Flame.Request('clan/v2/requirements', { game_id: req.query.game_id || "85", clan_id: Number(req.query.clan_id || "1349") < 0 ? 1349 : Number(req.query.clan_id || "1349") }),
        Flame.Request('clan/v2', { clan_id: Number(req.query.clan_id || "1349") }),
        shadow.includes(Number(req.query.clan_id || "1349")) ? db.collection('shadow').doc((req.query.clan_id || "1349").toString()).get() : null
      ].filter(i => i))).map(i => typeof (i || {}).data !== "function" ? (i || {}).data : i.data());
      if (!clan) return send(params, req, res, startTime, 2, 'Invalid clan_id');
      var details = {
        details: (shadow_data && shadow_data.details) ? {
          clan_id: shadow_data.clan_id,
          name: shadow_data.details.name,
          simple_name: shadow_data.details.simple_name,
          tagline: shadow_data.details.tagline,
          // creator: Number(clan.details.created_by_userid),
          logo: shadow_data.details.logo,
          privacy: shadow_data.details.privacy,
          goal: shadow_data.details.goal,
          members: Number(shadow_data.members.length)
        } : {
            clan_id: Number(clan.details.id),
            name: clan.details.name,
            simple_name: clan.details.simple_name,
            tagline: clan.details.tagline,
            creator: Number(clan.details.created_by_userid),
            logo: clan.details.logo,
            privacy: clan.details.privacy,
            goal: clan.details.goal,
            members: Number(clan.details.members)
          },
        members: [
          ...(clan.users || []).map(i => ({
            user_id: Number(i.user_id),
            username: i.username,
            leader: i.is_admin === "1",
            ghost: false
          })),
          ...shadow_data ? shadow_data.members.map(i => ({
            user_id: Number(i),
            username: (shadow_data.usernames || {})[i] || i.toString(),
            leader: false,
            ghost: true
          })) : []
        ].sort((a, b) => a.user_id - b.user_id),
        requirements: {}
      };
      for (var level in requirements.data.levels) {
        var level_requirements = requirements.data.levels[level];
        for (var requirement of [...level_requirements.individual, ...level_requirements.group].sort((a, b) => a.id - b.id)) {
          if (!details.requirements[requirement.task_id]) {
            details.requirements[requirement.task_id] = {
              users: Object.assign({}, shadow_data ? shadow_data.data[requirement.task_id] || {} : {}, shadow_data && shadow_data.details ? {} : requirement.data),
              total: Object.values(Object.assign({}, shadow_data ? shadow_data.data[requirement.task_id] || {} : {}, shadow_data && shadow_data.details ? {} : requirement.data)).reduce(
                (utils.clan.tasks[requirement.task_id] || {}).total === "min" ?
                  (a, b) => Math.min(a, b) :
                  (a, b) => a + b,
                (utils.clan.tasks[requirement.task_id] || {}).total === "min" ? Infinity : 0
              ),
              task_id: requirement.task_id,
            }
          }
        }
      }
      return send(params, req, res, startTime, 1, details)
    })
  })
];
