/**
                    day:time.day(
                        moment().subtract(
                            time.now().date()-i,
                            "days"
                        )
                    ), */

const { Flame, cors, functions, send, time, utils, moment } = require('../../Utils');

module.exports = [
  functions.https.onRequest(async (req, res) => {
    var startTime = process.hrtime();
    return cors(req, res, async () => {
      var tasks = [
        1,
        3,
        13,
        24,
        34,
        6,
        17,
        26,
        28
      ]
      var params = {
        user_id: {
          type: "number",
          subType: "userID",
          required: true,
        }
      }
      if (!req.query.user_id) {
        return send(params, req, res, startTime, 3, 'user_id')
      }
      let user_id = Number(req.query.user_id);

      var output = {};

      for (var i = 3; i <= time.now().date(); i++) {
        let x = await Flame.Request('statzee/player/day', {
          day: time.day(
            moment().subtract(
              time.now().date() - i,
              "days"
            )
          ),
        }, user_id);
        if(x.data&&x.data.captures) {
          let y = x.data;
          for(let task of tasks) {
            output[task] = (output[task]||0) + utils.clan.tasks[task].function({cap:y.captures,dep:y.deploys,con:y.captures_on});
          }
        }
      }
      return send(params, req, res, startTime, 1, output)
    })
  })
];