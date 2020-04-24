const {Flame,cors,functions,send} = require('../../Utils');

module.exports = [
    functions.https.onRequest(async (req, res) => {
        var startTime = process.hrtime();
        return cors(req, res, async () => {
            var params = {
                username: {
                    type: "string",
                    required: true,
                },
                munzee: {
                    type: "number",
                    required: true,
                }
            }
            if (!req.query.username) {
                return send(params,req,res,startTime,3,'username')
            }
            if (!req.query.munzee) {
                return send(params,req,res,startTime,3,'munzee')
            }
            var data = await Flame.Request('munzee', { url: `/m/${req.query.username}/${req.query.munzee}` });
            return send(params,req,res,startTime,1,data.data.bouncers||[])
        })
    })
]