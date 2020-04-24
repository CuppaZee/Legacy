const {Flame,cors,functions,send,validateCode} = require('../../Utils');

module.exports = [
    functions.https.onRequest(async (req, res) => {
        var startTime = process.hrtime();
        return cors(req, res, async () => {
            var params = {
                user_id: {
                    type: "number",
                    required: true,
                },
                day: {
                    type: "string",
                    subtype: "day",
                    required: true,
                }
            }
            // if (!req.query.code) {
            //     return send(req,res,startTime,3,'code')
            // }
            // if (!validateCode(req.query.code)) {
            //     return send(req,res,startTime,1,{captures:[],deploys:[],captures_on:[]})
            // }
            if (!req.query.user_id) {
                return send(params,req,res,startTime,3,'user_id')
            }
            if (!req.query.day) {
                return send(params,req,res,startTime,3,'day')
            }
            return send(params,req,res,startTime,1,(await Flame.Request('statzee/player/day', { day: req.query.day }, req.query.user_id)).data)
        })
    })
];