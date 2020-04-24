// const admin = require('firebase-admin');
var rss = require('rss-parser');
var parser = new rss();

const functions = require('firebase-functions');
const needle = require('needle');
const spherical = require('spherical');
const MunzeeAPI = require('./Utils/API');
const config = require('./Utils/Config');
const __clan = require('./Utils/Clan');
const API1 = new MunzeeAPI(config.Auth1);
const {db,currentGameID,moment,time,utils} = require('./Utils')
// admin.initializeApp(functions.config().firebase);
// const db = admin.firestore();
const cors = require('cors')({
    origin: true,
});
const crypto = require("crypto");


// Polyfills
const POLYfromEntries = require('object.fromentries');

exports.generateCryptokens = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        return res.send(crypto.randomBytes(20).toString('hex'))
    })
})

var _auth = require('./Modules/auth');
exports.auth_v1 = _auth[0];

var _user_activity = require('./Modules/user/activity');
exports.user_activity_v1 = _user_activity[0];

var _user_details = require('./Modules/user/details');
exports.user_details_v1 = _user_details[0];

var _user_inventory = require('./Modules/user/inventory');
exports.user_inventory_v1 = _user_inventory[0];

var _user_search = require('./Modules/user/search');
exports.user_search_v1 = _user_search[0];

var _user_specials = require('./Modules/user/specials');
exports.user_specials_v1 = _user_specials[0];

var _clan_requirements = require('./Modules/clan/requirements');
exports.clan_requirements_v1 = _clan_requirements[0];

var _clan_details = require('./Modules/clan/details');
exports.clan_details_v1 = _clan_details[0];

var _clan_list = require('./Modules/clan/list');
exports.clan_list_v1 = _clan_list[0];

var _munzee_bouncers = require('./Modules/munzee/bouncers');
exports.munzee_bouncers_v1 = _munzee_bouncers[0];

var _bouncers_limbo = require('./Modules/bouncers/limbo');
exports.bouncers_limbo_v1 = _bouncers_limbo[0];

var _db_munzees_list = require('./Modules/db/munzees/list');
exports.db_munzees_list_v1 = _db_munzees_list[0];

var _dev = require('./Modules/dev');
exports.dev_v1 = _dev[0];

async function request(page, inputdata = {}, user_id = config.default_user_id, cryptoken) {
    try {
        var token, document;
        if (!cryptoken) {
            document = await db.collection('authToken').doc(user_id.toString()).get()
            token = document.data().token;
        } else {
            document = (await db.collection('authToken').where('cryptokens', 'array-contains', user_id.toString()).limit(1).get()).docs[0]
            token = document.data().token;
        }
        if (token.expires * 1000 < Date.now() + 60000) {
        // if (token.expires >= Date.now() - 60000) {
            console.log('Refresh',token);
            token = await API1.refreshToken(token);
            await document.ref.update({ token: token });
        }
        return await API1.request(token, page, inputdata);
    } catch (e) {
        console.log(e)
        return { data: null }
    }
}

exports["user_badges"] = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        if (!req.query.user_id) {
            return res.status(502).send('Missing User ID')
        }
        return res.send(await request('user/badges', { user_id: req.query.user_id }))
    })
})

exports["user_inventory"] = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        if (!req.query.cryptoken) {
            return res.status(502).send('Missing Cryptoken')
        }
        var [credits, history, boosters] = (await Promise.all([
            request('user/credits', null, req.query.cryptoken, true),
            request('user/credits/history', null, req.query.cryptoken, true),
            request('user/boosters/credits', null, req.query.cryptoken, true)
        ])).map(i => i.data);
        var undeployed = [];
        for (var page = 0; page < 10; page++) {
            let und = (await request('user/undeploys', { page }, req.query.cryptoken, true)).data;
            if (!und.has_more) {
                page = 10;
            }
            undeployed = undeployed.concat(und.munzees);
        }
        undeployed = Object.entries(undeployed.map(i => i.pin_icon.match(/\/([^./]+).png/)[1]).reduce((obj, item) => {
            obj[item] = (obj[item] || 0) + 1;
            return obj;
        }, {})).map(i => ({ type: i[0], amount: i[1] }));
        return res.status(200).send({ credits, undeployed, boosters, history });
    })
})

exports["munzee_specials_overview"] = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        var data = await request('munzee/specials', {})
        let output = data.data.reduce((a, b) => {
            a[b.logo] = (a[b.logo] || 0) + 1;
            return a;
        }, {});
        if (req.query.v === undefined) {
            return res.send({ types: output, type: req.query.type, list: data.data.filter(i => i.logo === req.query.t) })
        } else {
            return res.send(`<div style="text-align:center;">${Object.keys(output).map(i => `<a href="${req.originalUrl.includes('munzee/specials') ? '/munzee/specials/overview' : '/munzee_specials_overview'}?v&t=${encodeURIComponent(i)}"><div style="display:inline-block;padding:8px;font-size:20px;font-weight:bold;"><img style="height:50px;width:50px;" src="${i}"/><br>${output[i]}</div>`).join('')}</div>${data.data.filter(i => i.logo === req.query.t).map(i => `<div><a href="${i.full_url}">${i.friendly_name}</a></div>`).join('')}`)
        }
    })
})

exports["munzee_bouncers_overview"] = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        var body = await Promise.all([
            request('munzee/specials', {}),
            request('munzee/specials/mythological', {}),
            request('munzee/specials/pouchcreatures', {}),
            request('munzee/specials/retired', {}),
            request('munzee/specials/flat', {}),
            request('munzee/specials/bouncers', {})
        ])
        var data = {
            data: [].concat(...body.map(i => i.data))
        }
        let output = data.data.reduce((a, b) => {
            a[(b.mythological_munzee ? b.mythological_munzee.munzee_logo : b.logo)] = (a[(b.mythological_munzee ? b.mythological_munzee.munzee_logo : b.logo)] || 0) + 1;
            return a;
        }, {});
        if (req.query.v === undefined) {
            return res.send({ types: output, type: req.query.type, list: data.data.filter(i => (i.mythological_munzee ? i.mythological_munzee.munzee_logo : i.logo) === req.query.t) })
        } else {
            return res.send(`<div style="text-align:center;">${Object.keys(output).map(i => `<a href="${req.originalUrl.includes('munzee/specials') ? '/munzee/bouncers/overview' : '/munzee_bouncers_overview'}?v&t=${encodeURIComponent(i)}"><div style="display:inline-block;padding:8px;font-size:20px;font-weight:bold;"><img style="height:50px;width:50px;" src="${i}"/><br>${output[i]}</div>`).join('')}</div>${data.data.filter(i => (i.mythological_munzee ? i.mythological_munzee.munzee_logo : i.logo) === req.query.t).map(i => `<div>${i.mythological_munzee ? `<a href="${i.mythological_munzee.code}">${i.mythological_munzee.friendly_name}</a> by <a href="https://www.munzee.com/m/${i.mythological_munzee.creator_username}">${i.mythological_munzee.creator_username}</a> at ` : ''}<a href="${i.full_url}">${i.friendly_name}</a></div>`).join('')}`)
        }
    })
})

exports["clan_requirements"] = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        return res.send({
            requirements: await request('clan/v2/requirements', { game_id: req.query.game_id, clan_id: 1349 }),
            rewards: await request(`clan/v2/challenges/${req.query.game_id}`, {}, 234392)
        })
    })
})

exports["clan_details"] = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        return res.send({
            requirements: await request('clan/v2/requirements', { game_id: 82, clan_id: req.query.clan_id }),
            details: await request('clan/v2', { clan_id: req.query.clan_id })
        })
    })
})

// Hack to Find Event Endpoint (Failed)
exports["find_calendar"] = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        var arr = [];
        var x = ["calendar", "event", "events", "nearby", "v4", ""];

        for (var a of x) {
            for (var b of x) {
                for (var c of x) {
                    arr.push([a, b, c].filter(i => i).join('/'));
                }
            }
        }
        console.log(arr.join('\n'))
        var q = Array.from(new Set(arr)).map(i => request(i));
        var data = await Promise.all(q);
        return res.send(data)
    })
})

var cached_down = {}
exports["down"] = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        var x = {};
        var r = {};
        async function a(p, d) {
            if (d === true) {
                try {
                    await needle('get',`https://${p.replace(/#/g, '')}`, { response_timeout: 15000 });
                    console.log('got',p);
                    x[p] = true;
                } catch (e) {
                    console.log('fail',p,e);
                    x[p] = false;
                }
                return;
            } else {
                try {
                    if ((await request(p.replace(/#/g, ''), d)).data === undefined) throw new Error();
                    x[p] = true;
                } catch (e) {
                    x[p] = false;
                }
                return;
            }
        }
        async function b(p, d) {
            await Promise.all(p.map(i => a(i[0], i[1])));
            r[d] = 0;
            for (var i = 0; i < p.length; i++) {
                let t = p[i];
                if (x[t[0]]) {
                    r[d]++;
                }
            }
        }
        var q = [
            [
                [["user", { user_id: 125914 }], ["user#", { user_id: 51311 }]],
                "Munzee API - /user|User Profile"
            ],
            [
                [["user/badges", { user_id: 125914 }], ["user/badges#", { user_id: 51311 }]],
                "Munzee API - /user/badges|User Badges"
            ],
            [
                [["user/captures", { user_id: 125914 }]],
                "Munzee API - /user/captures|User Captures"
            ],
            [
                [["user/deploys", { user_id: 125914 }]],
                "Munzee API - /user/deploys|User Deploys"
            ],
            [
                [["user/credits", {}]],
                "Munzee API - /user/credits|User Credits"
            ],
            [
                [["user/credits/history", {}]],
                "Munzee API - /user/credits/history|User Credits History"
            ],
            [
                [["munzee", { munzee_id: 1234 }]],
                "Munzee API - /munzee|Munzee Details"
            ],
            [
                [["munzee/entries", { munzee_id: 1234 }]],
                "Munzee API - /munzee/entries|Munzee Entries"
            ],
            [
                [["clan/v2", { clan_id: 1349 }]],
                "Munzee API - /clan/v2|Clan Roster"
            ],
            [
                [["clan/v2/requirements", { clan_id: 1349, game_id: 84 }]],
                "Munzee API - /clan/v2/requirements|Clan Stats"
            ],
            [
                [["statzee/player/day", { day: "2020-03-23" }]],
                "Munzee API - /statzee/player/day|StatZee Today"
            ],
            [
                [["statzee/player/captures/types", { username: "sohcah" }], ["statzee/player/captures/types", { username: "htv" }]],
                "Munzee API - /statzee/player/captures/types|StatZee Capture Types"
            ],
            [
                [["statzee/player/deploys/types", { username: "sohcah" }], ["statzee/player/deploys/types", { username: "htv" }]],
                "Munzee API - /statzee/player/deploys/types|StatZee Deploy Types"
            ],
            [
                [["playmunzee.com", true]],
                "Munzee Websites - playmunzee.com|Play Munzee"
            ],
            [
                [["munzee.com/m/sohcah", true], ["munzee.com/m/thegenie18", true], ["munzee.com", true]],
                "Munzee Websites - www.munzee.com|Munzee"
            ],
            [
                [["zeeops.munzee.com", true]],
                "Munzee Websites - zeeops.munzee.com|ZeeOps"
            ],
            [
                [["calendar.munzee.com", true]],
                "Munzee Websites - calendar.munzee.com|Calendar"
            ],
            [
                [["munzeeblog.com", true]],
                "Munzee Websites - munzeeblog.com|Blog"
            ],
            [
                [["wallabeegame.com", true]],
                "Other Websites - wallabeegame.com|WallaBee"
            ],
            [
                [["wallabeeblog.com", true]],
                "Other Websites - wallabeeblog.com|WallaBee Blog"
            ],
            [
                [["eventzeeapp.com", true]],
                "Other Websites - eventzeeapp.com|EventZee"
            ],
            [
                [["eventzeeblog.com", true]],
                "Other Websites - eventzeeblog.com|EventZee Blog"
            ],
            [
                [["freezetag.com", true]],
                "Other Websites - freezetag.com|Freeze Tag Games"
            ]
            // ['store.freezetag.com/collections/munzee/products/blast-capture',true,'Store - store.freezetag.com|Freeze Tag Store'],
        ];
        if (!cached_down.time || cached_down.time < Date.now() - (60 * 1000)) {
            await Promise.all(q.map(i => b(i[0], i[1])));
            cached_down = {
                r,
                x,
                time: Date.now()
            }
        } else {
            r = cached_down.r;
            x = cached_down.x;
        }
        if (req.query.y !== undefined) {
            return res.send(x);
        } else {
            return res.send(`<!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset="UTF-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <title>Is Munzee Down?</title>
                <link href="https://fonts.googleapis.com/css?family=Roboto&display=swap" rel="stylesheet">
                <style>
                    * {
                        font-family: 'Roboto', sans-serif;
                    }
                </style>
            </head>
            <body>
                <div style="font-weight:100;">Data Loaded: ${new Date(cached_down.time).toString()}</div>
                ${q.map((i, index) => `<div style="padding:4px;">
                    ${q.findIndex(a => a[1].split('|')[0].split(' - ')[0] === i[1].split('|')[0].split(' - ')[0]) === index ? `<div style="font-size:1.8em;font-weight:bold">${i[1].split('|')[0].split(' - ')[0]}</div>` : ``}
                    <div style="border:1px solid ${r[i[1]] === i[0].length ? 'green' : (r[i[1]] === 0 ? 'red' : 'orange')};border-left:8px solid ${r[i[1]] === i[0].length ? 'green' : (r[i[1]] === 0 ? 'red' : 'orange')};background-color:${r[i[1]] === i[0].length ? '#cfc' : (r[i[1]] === 0 ? '#fcc' : '#ffc')};border-radius:8px;padding:8px;">
                        <div style="font-size:1.4em;font-weight:bold">${i[1].split('|')[1]}</div>
                        <div style="font-size:1.0em;font-weight:bold;opacity:0.7">${i[1].split('|')[0].split(' - ')[1]}</div>
                    </div>
                </div>`).join('')}
            </body>
            </html>`)
        }
    })
})

exports["overpass"] = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        //spherical.radial(from, heading, distance)
        var output = {
            name: null,
            latitude: null,
            longitude: null,
        }
        var topleft = spherical.radial([req.query.longitude, req.query.latitude].map(Number), 315, 250);
        var bottomright = spherical.radial([req.query.longitude, req.query.latitude].map(Number), 135, 250);
        var big = [Math.max(topleft[0], bottomright[0]), Math.max(topleft[1], bottomright[1])]
        var small = [Math.min(topleft[0], bottomright[0]), Math.min(topleft[1], bottomright[1])]
        console.log(topleft, bottomright, `[out:json][timeout:25];(way["highway"](${small[1]},${small[0]},${big[1]},${big[0]}););out;>;out skel qt;`, `https://overpass.kumi.systems/api/interpreter?data=${encodeURIComponent(`[out:json][timeout:25];(way["highway"](${small[1]},${small[0]},${big[1]},${big[0]}););out;>;out skel qt;`)}`);
        var data = await superagent.get(`https://overpass.kumi.systems/api/interpreter?data=${encodeURIComponent(`[out:json][timeout:25];(way["highway"](${small[1]},${small[0]},${big[1]},${big[0]}););out;>;out skel qt;`)}`)
        var j = JSON.parse(data).elements;
        var ways = j.filter(i => i.type === "way" && (i.tags.name || i.tags.highway === "footway"));
        var way = ways[Math.floor(Math.random() * ways.length)];
        var node = way.nodes[Math.floor(Math.random() * way.nodes.length)];
        var allnodes = j.filter(i => i.type === "node");
        var foundnode = allnodes.find(i => i.id === node);
        var coords = spherical.radial([foundnode.lon, foundnode.lat].map(Number), Math.floor(Math.random() * 360), Math.floor(Math.random() * 50));
        output.latitude = coords[1];
        output.longitude = coords[0];
        output.name = way.tags.name || "Footway";
        return res.send(output);
    })
})


exports.blogzee_checker_minute = functions.runWith({memory:"512MB"}).pubsub.topic('shadow').onPublish(async (message) => {
    var data = (await db.collection('data').doc('blog').get()).data();
    if(!data.run) return;
    var update = {};
    async function check(x) {
        // Munzee
        var feed = await parser.parseURL('https://www.munzeeblog.com/feed/')
        if(feed.items[0].link !== data.munzee_blog) {
            data.munzee_blog = feed.items[0].link;
            update.munzee_blog = feed.items[0].link;

            console.log('New Munzee Blog',feed.items[0].link);
        } else {
            console.log('Same Munzee Blog',feed.items[0].link);
        }

        if(x && Object.keys(update).length > 0) {
            await db.collection('data').doc('blog').update(update);
        }
    }
    check();
    await Promise.all([
        new Promise((resolve, reject) => {
            setTimeout( async function() {
                await check();
                resolve("Success!")
            }, 15000) 
        }),
        new Promise((resolve, reject) => {
            setTimeout( async function() {
                await check();
                resolve("Success!")
            }, 30000) 
        }),
        new Promise((resolve, reject) => {
            setTimeout( async function() {
                await check(true);
                resolve("Success!")
            }, 45000) 
        }) 
    ])
})


exports.clan_list_minute = functions.runWith({memory:"512MB"}).pubsub.topic('shadow').onPublish(async (message) => {
    var clans = (await db.collection('data').doc('clans').get()).data();
    var array = [];
    for(var i = clans.counter;i < (clans.counter+10);i++) {
        array.push(request('clan/v2',{clan_id:i}))
    }
    var found = false;
    var data = await Promise.all(array);
    for(var d of data) {
        try {
            let det = d.data.details;
            if(det.name && det.members) {
                found = true;
                clans.clans[det.clan_id] = {
                    name: det.name,
                    tagline: det.tagline
                }
            } else if(det.name) {
                found = true;
                delete clans.clans[det.clan_id]
            }
        } catch(e) {
            console.log('No Clan')
        }
    }
    clans.counter = found ? i : 0;
    clans.clans[-1] = {
        name: "CuppaClans Shadow Crew",
        logo: "https://munzee.global.ssl.fastly.net/images/pins/ghost.png",
        tagline: "We'll join soon!"
    }
    clans.clans[-2] = {
        name: "Bushrangers Shadow",
        logo: "https://i.ibb.co/hs3Z3rN/Bushrangers-Ghost.png",
        tagline: "Boo!"
    }
    clans.clans[-3] = {
        name: "Angy",
        logo: "https://munzee.global.ssl.fastly.net/images/avatars/ua49ut.png",
        tagline: "This isn't a real clan"
    }
    clans.clans[-4] = {
        name: "GrannyCache",
        logo: "https://munzee.global.ssl.fastly.net/images/avatars/ua6av1.png",
        tagline: "This isn't a real clan"
    }
    await db.collection('data').doc('clans').set(clans);
});


exports.minute = functions.runWith({memory:"512MB",timeoutSeconds:540}).pubsub.topic('shadow').onPublish(async (message) => {
    var shadowDoc = (await db.collection('shadow').orderBy('updated_at').limit(1).get()).docs[0]
    var shadowData = (shadowDoc||{data:function(){}}).data();
    if(!shadowData) return;
    if(shadowData.usernames) shadowData.members = Object.keys(shadowData.usernames);
    var [ clan, requirements ] = (await Promise.all([
        request('clan/v2',{clan_id:shadowData.clan_id<0?1349:shadowData.clan_id}),
        request('clan/v2/requirements',{clan_id:shadowData.clan_id<0?1349:shadowData.clan_id,game_id:currentGameID()}),
    ])).map(i=>i.data);
    var tasks = [];
    for(var ind of requirements.data.levels["5"].individual) {
        tasks.push(ind.task_id);
    }
    for(var gro of requirements.data.levels["5"].group) {
        if(!tasks.includes(gro.task_id)) tasks.push(gro.task_id);
    }
    // var archiveMemberData = [];
    // if(time.now().date()>4 && shadowData.archive_date!==time.day(moment().subtract(2,"days"))) {
    //     archiveMemberData = (await Promise.all([
    //         ...shadowData.members.filter(i=>!clan.users.find(x=>x.user_id===i)).map(i=>request('statzee/player/day',{day:time.day(moment().subtract(2,"days"))},i))
    //     ])).map(i=>Object.assign({user_id:(i||{}).authenticated_entity},(i||{}).data||{}));
    // }
    var memberData = (await Promise.all([
        ...shadowData.members.filter(i=>!clan.users.find(x=>x.user_id===i)).map(i=>request('statzee/player/day',{day:time.day()},i)),
        ...shadowData.members.filter(i=>!clan.users.find(x=>x.user_id===i)).map(i=>request('statzee/player/day',{day:time.day(moment().subtract(1,"day"))},i))
    ])).map(i=>Object.assign({user_id:i.authenticated_entity},(i||{}).data));
    // var memberToday = memberData.slice(0,memberData.length/2);
    // var memberYesterday = memberData.slice(memberData.length/2,memberData.length);
    var members = {};
    if(!shadowData.archive_data) shadowData.archive_data = {};
    console.log(time.now().day());
    for(let member of shadowData.members.filter(i=>!clan.users.find(x=>x.user_id===i))) {
        if(!shadowData.archive_data[member]) shadowData.archive_data[member] = {};
        for(var i = 3;i < time.now().date()-1;i++) {
            if(!shadowData.archive_data || !shadowData.archive_data[member] || !shadowData.archive_data[member][i]) {
                let a = {}
                let x = await request('statzee/player/day',{
                    day:time.day(
                        moment().subtract(
                            time.now().date()-i,
                            "days"
                        )
                    ),
                },member);
                x=x.data;
                if(x && x.captures) {
                    for(let task of tasks) {
                            a[task] = utils.clan.tasks[task].function({cap:x.captures,dep:x.deploys,con:x.captures_on});
                    }
                    shadowData.archive_data[member][i] = a;
                } else {
                    i = Infinity;
                }
            }
            if(i!==Infinity) {
                for(let task of tasks) {
                    if(!members[task]) members[task] = {};
                    if(shadowData.archive_data[member][i]) members[task][member] = (members[task][member]||0) + shadowData.archive_data[member][i][task];
                }
            }
        }
    }
    var gotDataFor = [];
    for(let member of memberData) {
        if(member.captures) {
            if(!gotDataFor.includes(member.user_id)) gotDataFor.push(member.user_id);
            // if(!members[member.user_id]) members[member.user_id] = {};
            for(let task of tasks) {
                if(!members[task]) members[task] = {};
                members[task][member.user_id] = (members[task][member.user_id]||0) + utils.clan.tasks[task].function({cap:member.captures,dep:member.deploys,con:member.captures_on});
            }
        }
    }
    for(let member of shadowData.members.filter(i=>!gotDataFor.includes(i))) {
        for(let task of tasks) {
            if(!members[task]) members[task] = {};
            delete members[task][member];
        }
    }

    console.log('SHADOW DATA',members,memberData.map(i=>i.user_id));

    return await shadowDoc.ref.update({
        data: members,
        archive_data: shadowData.archive_data,
        members: shadowData.members.filter(i=>!clan.users.find(x=>x.user_id===i)),
        updated_at: Date.now(),
    })

    // for(var member of shadowData.members.filter(i=>clan.users.find(x=>x.user_id===i))) {

    // }
});

exports["mhq_time"] = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        return res.send(moment().tz('America/Chicago').format())
    })
})

exports["usercount"] = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        return res.send(`Users: ${(await db.collection('users').listDocuments()).length.toString()}`)
    })
})

exports["bingo"] = functions.https.onRequest(async (req, res) => {
    return cors(req, res, async () => {
        var aaa = `<input id="x" value="" oninput="aaaa()" placeholder="username" type="text" /><a id="xd"></a><script>function aaaa(){
            var x = document.getElementById('x');
            var xd = document.getElementById('xd');
            xd.href = \`https://flame.cuppazee.uk/bingo?username=\${x.value}\`;
            xd.innerText = x.value;
        }</script>`
        if(!req.query.username) return res.send(aaa);
        if(req.query.username === "YOURUSERNAME") return res.send(aaa);
        var userdata = await request('user',{username:req.query.username})
        var user_id = userdata.data.user_id;
        var specials = [
            `louroll`,'quiznormal','1starmotel','birthday','rainbowtrail',
            'elekter','tardytimetraveler','surprise','shurikenninja-breadman','rainbowunicorn',
            'virtual_citrine','virtual_rainbow','munzee','temporaryvirtual','virtual_onyx',
            'motherearth','rootrunnerboomerang','mystery','partingseaboomerang','redheartbreaker',
            'h.zee.wells%27timemachine','bcapin','premium','nfc','thereturn'
        ]
        var {data} = await request('user/specials',{user_id:user_id});
        return res.send(`<div style="width:335px">${specials.map(i=>{
            var x = (data.find(a=>a.logo===i)||{count:0}).count||0;
            if(i==="munzee") x = 1;
            return `<div style="padding:4px;display:inline-block;border:4px solid ${x?'green':'red'};background-color: ${x?'#aaffaa':'#ffaaaa'}"><img style="height:50px;width:50px;" src="https://munzee.global.ssl.fastly.net/images/pins/${i}.png" /></div>`
        }).join('')}</div><div>Generated by<br>https://flame.cuppazee.uk/bingo?username=${req.query.username}</div>`)
    })
})