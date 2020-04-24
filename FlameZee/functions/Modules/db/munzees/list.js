const {cors,functions,send,mdb} = require('../../../Utils');
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
                    required: false,
                    default: "list"
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
                },
                offset: {
                    type: "number",
                    required: false,
                    default: 0
                }
            };
            var list = mdb.Munzees.slice();
            if(req.query.query) {
                var fuse = new Fuse(list, {
                    keys: [
                        {
                            name:'name',
                            weight: 0.4 
                        },
                        {
                            name:'icon',
                            weight: 0.2
                        },
                        {
                            name:'id',
                            weight: 0.5
                        },
                        {
                            name:'state',
                            weight: 0.1
                        },
                    ]
                })
                
                list = fuse.search(req.query.query).map(i=>i.item)
            }
            list = list.slice(Number(req.query.offset||"0"),Number(req.query.limit||"50")+Number(req.query.offset||"0"));
            if(req.query.format === "object") {
                return send(args,req,res,startTime,1,list.reduce((a,b,c)=>{
                    a[b.id] = Object.assign({index:c},b);
                    return a;
                },{}))
            } else if(req.query.format === "visual") {
                return res.send(list.map(i=>{
                    return `<div style="padding:4px;">
                        <div style="border: 2px solid ${{
                            nothing: "#ffaa00",
                            missing_info: '#ff0000',
                            complete: '#00ff00',
                            partial: '#00aaff'
                        }[i.completion]||'#000000'};display:flex;align-items:center;padding:4px;border-radius:4px;background-color: ${{
                            nothing: "#ffe2a8",
                            missing_info: '#ffc4c4',
                            complete: '#adffad',
                            partial: '#93dbff'
                        }[i.completion]||'#ffffff'}">
                            <img style="height:50px;width:50px;" src="https://munzee.global.ssl.fastly.net/images/pins/${i.icon}.png" />
                            ${i.redirect===undefined?`<div>
                                <div style="font-size:1.2em;font-weight:bold;opacity:0.7">${i.id}</div>
                                <div style="font-size:1.4em;font-weight:bold;display:flex;align-items:center;">${i.name}${i.magnet?`<img style="padding-left: 4px;height: 1.2em;" src="https://munzee.global.ssl.fastly.net/images/pins/${i.magnet==="physical"?'magnet':'virtual_magnet'}.png" />`:``}</div>
                                <div style="font-size:1.2em;">${JSON.stringify(Object.assign({},i,{
                                    name: undefined, id: undefined
                                }))}</div>
                            </div>`:`<div>Moved to ${(list.find(x=>x.id===i.redirect)||{}).name} / #${i.redirect}</div>`}
                        </div>
                    </div>`
                }).join(''))
            } else {
                return send(args,req,res,startTime,1,list)
            }
        })
    })
]