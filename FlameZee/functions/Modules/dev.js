const {Flame,cors,functions,send,db} = require('../Utils');

module.exports = [
    functions.runWith({memory:"512MB",timeoutSeconds:540}).https.onRequest(async (req, res) => {
        var startTime = process.hrtime();
        return cors(req, res, async () => {
            var {data} = await Flame.Request('munzee/specials/mythological');

            var x = {
                "munzee_id": "50259733",
                "latitude": "40.696331871088",
                "longitude": "-111.93625456929",
                "friendly_name": "Lucky Lucky",
                "time_placed": "2020-04-08 06:58:57",
                "full_url": "https://www.munzee.com/m/davehi1/1321/",
                "mythological_munzee": {
                    "friendly_name": "Unicorn Munzee #1",
                    "code": "http://www.munzee.com/m/Zniffer/1369/",
                    "creator_user_id": "185857",
                    "creator_username": "Zniffer",
                    "munzee_id": "21774913",
                    "munzee_logo": "https://munzee.global.ssl.fastly.net/images/pins/theunicorn.png",
                    "capture_type_id": "505"
                },
                "special_good_until": 1586390337
            }

            var types = {}

            try {
                await db.collection('bouncers').doc('2020-04-08').set({
                    bouncers: data.map(i=>{
                        types[i.mythological_munzee.munzee_logo.slice(49,-4)]
                        return {
                            i: i.munzee_id,
                            a: i.latitude,
                            o: i.longitude,
                            n: i.friendly_name,
                            // t: i.time_placed,
                            // u: i.full_url.slice(21,-1),
                            mn: i.mythological_munzee.friendly_name,
                            mc: i.mythological_munzee.code.slice(21,-1),
                            // mui: i.mythological_munzee.creator_user_id,
                            // mun: i.mythological_munzee.creator_username,
                            mi: i.mythological_munzee.munzee_id,
                            ml: i.mythological_munzee.munzee_logo.slice(49,-4),
                            // mt: i.mythological_munzee.capture_type_id,
                            s: i.special_good_until
                        }
                    })
                })

                res.send({done:true,data:data.map(i=>({
                    i: i.munzee_id,
                    a: i.latitude,
                    o: i.longitude,
                    n: i.friendly_name,
                    // t: i.time_placed,
                    // u: i.full_url.slice(21,-1),
                    mn: i.mythological_munzee.friendly_name,
                    mc: i.mythological_munzee.code.slice(21,-1),
                    // mui: i.mythological_munzee.creator_user_id,
                    // mun: i.mythological_munzee.creator_username,
                    mi: i.mythological_munzee.munzee_id,
                    ml: i.mythological_munzee.munzee_logo.slice(49,-4),
                    // mt: i.mythological_munzee.capture_type_id,
                    s: i.special_good_until
                })).slice(0,10)});
            } catch(e) {
                res.send(data.map(i=>({
                    i: i.munzee_id,
                    a: i.latitude,
                    o: i.longitude,
                    n: i.friendly_name,
                    // t: i.time_placed,
                    // u: i.full_url.slice(21,-1),
                    mn: i.mythological_munzee.friendly_name,
                    mc: i.mythological_munzee.code.slice(21,-1),
                    // mui: i.mythological_munzee.creator_user_id,
                    // mun: i.mythological_munzee.creator_username,
                    mi: i.mythological_munzee.munzee_id,
                    ml: i.mythological_munzee.munzee_logo.slice(49,-4),
                    // mt: i.mythological_munzee.capture_type_id,
                    s: i.special_good_until
                })).slice(0,10));
            }
            // var endpoints = [];
            // var y = ['news','app','schedule','whatsnew',null];
            // for(var a in y) {
            //     for(var b in y) {
            //         for(var c in y) {
            //             endpoints.push(Flame.Request([a,b,c].filter(i=>i).join('/')));
            //         }
            //     }
            // }
            // return send({},req,res,startTime,1,(await Promise.all(endpoints)).map(i=>i.status_code))
        })
    })
];