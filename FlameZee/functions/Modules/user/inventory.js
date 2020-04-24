const {Flame,cors,functions,send,moment,mdb} = require('../../Utils');

module.exports = [
    functions.https.onRequest(async (req, res) => {
        var startTime = process.hrtime();
        return cors(req, res, async () => {
            var params = {
                cryptoken: {
                    type: "string",
                    subtype: "cryptoken",
                    required: true
                }
            }
            if (!req.query.cryptoken) {
                return send(params,req,res,startTime,3,'cryptoken')
            }
            var [credits, history, boosters] = (await Promise.all([
                Flame.Request('user/credits', null, req.query.cryptoken, true),
                Flame.Request('user/credits/history', null, req.query.cryptoken, true),
                Flame.Request('user/boosters/credits', null, req.query.cryptoken, true)
            ])).map(i => i.data);
            var undeployed = [];
            for (var page = 0; page < 10; page++) {
                let und = (await Flame.Request('user/undeploys', { page }, req.query.cryptoken, true)).data;
                if (!und.has_more) {
                    page = 10;
                }
                undeployed = undeployed.concat(und.munzees);
            }
            undeployed = Object.entries(undeployed.map(i => i.pin_icon.match(/\/([^./]+).png/)[1]).reduce((obj, item) => {
                obj[item] = (obj[item] || 0) + 1;
                return obj;
            }, {})).map(i => ({ type: i[0], amount: i[1] }));
            var data = {
                undeployed: [],
                credits: [],
                history: [],
            }
            var extras = [
                {
                    icon: "magnet",
                    name: "Magnet"
                },
                {
                    icon: "virtual_magnet",
                    name: "Virtual Magnet"
                },
                {
                    icon: "blast_capture",
                    name: "Blast Capture"
                },
                {
                    icon: "blast_capture_mini",
                    name: "Mini Blast Capture"
                },
                {
                    icon: "blast_capture_mega",
                    name: "MEGA Blast Capture"
                },
                {
                    icon: "destination",
                    name: "Destination"
                },
                {
                    icon: "secure_social",
                    name: "Secure Social"
                },
                {
                    icon: "virtual_colors",
                    name: "Virtual Color"
                },
                {
                    icon: "virtual_colors",
                    name: "Virtual Colors"
                },
                {
                    icon: "upgrade_myth",
                    name: "Bouncer Upgrade"
                },
                {
                    icon: "evolution_reset",
                    name: "Evolution Reset"
                },
                {
                    icon: "zeds",
                    name: "ZEDS"
                },
                {
                    icon: "zeds",
                    name: "Zeds"
                }
            ]
            function get(a,b) {
                return (mdb.Munzees.get(i=>(i[a]||"").toLowerCase()===b.toLowerCase())||extras.find(i=>(i[a]||"").toLowerCase()===b.toLowerCase()))||{}
            }
            console.log(credits,boosters);
            for(var credit in credits) {
                data.credits.push({
                    name: get("icon",credit).name,
                    icon: `https://munzee.global.ssl.fastly.net/images/pins/${credit}.png`,
                    amount: Number(credits[credit])
                })
            }
            for(var b in boosters) {
                var booster = boosters[b];
                data.credits.push({
                    name: booster.name,
                    icon: `https://static.cuppazee.uk/images/boosters/${booster.type_id}.png`,
                    amount: Number(booster.credits)
                })
            }
            for(var munzee of undeployed) {
                data.undeployed.push({
                    name: get("icon",munzee.type).name,
                    icon: `https://munzee.global.ssl.fastly.net/images/pins/${munzee.type}.png`,
                    amount: Number(munzee.amount)
                })
            }
            for(var log of history.items) {
                data.history.push({
                    name: log.type,
                    reason: log.log_text,
                    icon: `https://munzee.global.ssl.fastly.net/images/pins/${get("name",log.type.replace(/[0-9]+x /,'')).icon||get("icon",log.type.replace(/[0-9]+x /,'')).icon||'what'}.png`,
                    time: moment.tz(log.time_awarded, "America/Chicago").valueOf()
                })
            }
            data.history.sort((a,b)=>b.time-a.time)
            return send(params,req,res,startTime,1,data)
        })
    })
];