const {Flame,cors,functions,send,db} = require('../../Utils');
const Fuse = require('fuse.js')

module.exports = [
    functions.https.onRequest(async (req, res) => {
        var startTime = process.hrtime();
        return cors(req, res, async () => {
            var args = {
                format: {
                    type: "string",
                    subtype: "outputFormat",
                    options: ["list","object"],
                    required: true
                },
                query: {
                    type: "string",
                    subtype: "searchQuery",
                    required: false
                },
                limit: {
                    type: "number",
                    required: false,
                    default: 50
                }
            };
            if (!req.query.format) {
                return send(args,req,res,startTime,3,'format')
            }
            var data = (await db.collection('data').doc('clans').get()).data().clans;
            var list = Object.entries(data).map(i=>({
                clan_id: Number(i[0]),
                name: i[1].name,
                tagline: i[1].tagline,
                logo: i[1].logo,
            }));
            if(req.query.query) {
                var fuse = new Fuse(list, {
                    keys: [
                        {
                            name:'name',
                            weight: 0.7 
                        },
                        {
                            name:'clan_id',
                            weight: 0.15
                        },
                        {
                            name:'tagline',
                            weight: 0.15
                        },
                    ]
                })
                
                list = fuse.search(req.query.query).map(i=>i.item)
            }
            list = list.slice(0,Number(req.query.limit||(req.query.query?"50":"1000000")));
            if(req.query.format === "list") {
                return send(args,req,res,startTime,1,list)
            } else {
                return send(args,req,res,startTime,1,list.reduce((a,b,c)=>{
                    a[b.clan_id] = {
                        name: b.name,
                        tagline: b.tagline,
                        logo: b.logo,
                        index: c
                    }
                    return a;
                },{}))
            }
        })
    })
]