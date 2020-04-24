const {Flame,cors,functions,send} = require('../../Utils');

module.exports = [
    functions.https.onRequest(async (req, res) => {
        var startTime = process.hrtime();
        return cors(req, res, async () => {
            var args = {}
            var body = await Promise.all([
                Flame.Request('munzee/specials/mythological', {}),
                Flame.Request('munzee/specials/pouchcreatures', {}),
                Flame.Request('munzee/specials/flat', {}),
                Flame.Request('munzee/specials/bouncers', {}),
                Flame.Request('statzee/global/types', {})
            ])
            var y = body[body.length - 1];
            var data = {
                data: [].concat(...body.map(i => i.data).slice(0, -1))
            }
            function x(a) {
                if (a.includes('tuli')) return 'https://munzee.global.ssl.fastly.net/images/pins/tuli.png';
                if (a.includes('vesi')) return 'https://munzee.global.ssl.fastly.net/images/pins/vesi.png';
                if (a.includes('muru')) return 'https://munzee.global.ssl.fastly.net/images/pins/muru.png';
                if (a.includes('megu')) return 'https://munzee.global.ssl.fastly.net/images/pins/mitmegu.png';
                if (a.includes('/puf')) return 'https://munzee.global.ssl.fastly.net/images/pins/puffle.png';
                if (a.includes('elek')) return 'https://munzee.global.ssl.fastly.net/images/pins/elekter.png';
                return a;
            }
            let output = data.data.reduce((a, b) => {
                a[x(b.mythological_munzee ? b.mythological_munzee.munzee_logo : b.logo)] = (a[x(b.mythological_munzee ? b.mythological_munzee.munzee_logo : b.logo)] || 0) + 1;
                return a;
            }, {});
            var onmap = 0;
            var total = 0;
            var z = Object.keys(output);
            for (i of z) {
                onmap += output[i];
                total += Number((y.data.find(x => x.logo === i) || {}).number);
            }
            var percent = Math.floor((onmap / total) * 1000000) / 10000;
            var allTypes = {};
            for(var type of Object.keys(output)) {
                allTypes[type.slice(49,-4)] = {
                    total: Number((y.data.find(x => x.logo === type) || {}).number),
                    hosted: output[type],
                    limbo: Number((y.data.find(x => x.logo === type) || {}).number) - output[type],
                    percent: Math.floor((output[type] / Number((y.data.find(x => x.logo === type) || {}).number)) * 1000000) / 10000
                }
            }
            if (req.query.v === undefined) {
                return send(args,req,res,startTime,1,{ hosted: onmap, limbo: total - onmap, total, percent, types: allTypes })
            } else {
                return res.send(`<div style="text-align:center;font-size:2em;font-weight:bold;"><div>${onmap} / ${total} Bouncers on the map | ${percent}%</div>${Object.keys(output).map(i => `<div style="display:inline-block;padding:4px;font-size:20px;font-weight:bold;width:112px;border:1px solid black;margin:4px;border-radius:8px;"><img style="height:50px;width:50px;" src="${i}"/><br>${output[i]} / ${(y.data.find(x => x.logo === i) || {}).number}<br>${Math.floor((Number(output[i]) / Number((y.data.find(x => x.logo === i) || {}).number)) * 10000) / 100}%</div>`).join('')}</div>`)
            }
        })
    })
]