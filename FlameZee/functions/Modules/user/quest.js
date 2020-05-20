/**
                    day:time.day(
                        moment().subtract(
                            time.now().date()-i,
                            "days"
                        )
                    ), */

var path = require('path');
const geocoder = require('offline-geocoder')({ database: path.join(__dirname,'../../Utils/db.sqlite') })

const { Flame, cors, functions, send, time, utils, moment, utils: { activity } } = require('../../Utils');

module.exports = [
  functions.https.onRequest(async (req, res) => {
    var startTime = process.hrtime();
    return cors(req, res, async () => {
      function c(i) {
        return Number((i.captured_at||i.deployed_at).slice(8,10))>2;
      }
      var tasks = [
        {id:1,function:({cap,dep})=>[...cap,...dep].filter(i=>c(i)&&new activity(i).munzee.is_mystery).length},
        {id:2,function:({cap,dep})=>[...cap,...dep].filter(i=>c(i)&&new activity(i).munzee.is_evolution).length},
        {id:3,function:({cap,dep})=>[...cap,...dep].filter(i=>c(i)&&new activity(i).munzee.is_weapon).length},
        {id:4,function:({cap,dep})=>[...cap,...dep].filter(i=>c(i)&&new activity(i).munzee.is_jewel).length},
        {id:5,function:({cap})=>cap.filter(i=>(i.url||"").includes("XeresDan/1707")).length}
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

      var captures = [];
      for (var i = 0; i < 50; i++) {
        let x = await Flame.Request('user/captures', {
          page: i,
          user_id
        });
        captures = captures.concat(x.data)
        if(!x.data[0] || !x.data[0].captured_at.startsWith('2020-05')) {
          break;
        }
      }

      var deploys = [];
      for (i = 0; i < 50; i++) {
        let x = await Flame.Request('user/deploys', {
          page: i,
          user_id
        });
        deploys = deploys.concat(x.data.munzees)
        if(!x.data.munzees[0] || !x.data.munzees[0].deployed_at.startsWith('2020-05')) {
          break;
        }
      }
      captures = captures.filter(i=>i.captured_at.startsWith('2020-05'))
      deploys = deploys.filter(i=>i.deployed_at.startsWith('2020-05'))
      for(var capture of captures) {
        capture.location = await geocoder.reverse(capture.latitude, capture.longitude);
      }
      for(var deploy of deploys) {
        deploy.location = await geocoder.reverse(deploy.latitude, deploy.longitude);
      }
      captures=captures.filter(i=>(Number(i.latitude)===0&&Number(i.longitude)===0)||(i.location&&i.location.admin1&&i.location.admin1.name==="Quebec"))
      deploys=deploys.filter(i=>(Number(i.latitude)===0&&Number(i.longitude)===0)||(i.location&&i.location.admin1&&i.location.admin1.name==="Quebec"))

      console.log(deploys);
      console.log(captures);

      for(let task of tasks) {
        output[task.id] = (output[task.id]||0) + task.function({cap:captures,dep:deploys});
      }
      return send(params, req, res, startTime, 1, {
        output,
        x: await geocoder.reverse(48.436555, -71.662755)
      })
    })
  })
];