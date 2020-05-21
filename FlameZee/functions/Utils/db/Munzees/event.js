var fs = require('fs');
// var events = require('./Categories.json');

// fs.writeFileSync('Event.json',JSON.stringify(events.filter(i=>i.type=="Event").map(i=>({
//   name: i.name,
//   icon: i.icon,
//   id: i.id
// })).sort((a,b)=>a.id-b.id).filter(i=>i.id!==undefined),null,2))

// fs.writeFileSync('Normal.json',JSON.stringify(events.filter(i=>i.type=="Normal").map(i=>({
//   name: i.name,
//   icon: i.icon,
//   id: i.id
// })).sort((a,b)=>a.id-b.id).filter(i=>i.id!==undefined),null,2))

// fs.writeFileSync('NA.json',JSON.stringify(events.filter(i=>i.type=="N/A").map(i=>({
//   name: i.name,
//   icon: i.icon,
//   id: i.id
// })).sort((a,b)=>a.id-b.id).filter(i=>i.id!==undefined),null,2))

// var normal = require('./NormalCategories.json');

// fs.writeFileSync('Normal/Physical.json',JSON.stringify(normal.filter(i=>i.types=="Physical").map(i=>({
//   name: i.name,
//   icon: i.icon,
//   id: i.id
// })).sort((a,b)=>a.id-b.id).filter(i=>i.id!==undefined),null,2))

// fs.writeFileSync('Normal/Virtual.json',JSON.stringify(normal.filter(i=>i.types=="Virtual").map(i=>({
//   name: i.name,
//   icon: i.icon,
//   id: i.id
// })).sort((a,b)=>a.id-b.id).filter(i=>i.id!==undefined),null,2))

// fs.writeFileSync('Normal/Bouncer.json',JSON.stringify(normal.filter(i=>i.types=="Bouncer").map(i=>({
//   name: i.name,
//   icon: i.icon,
//   id: i.id
// })).sort((a,b)=>a.id-b.id).filter(i=>i.id!==undefined),null,2))

// fs.writeFileSync('Normal/Other.json',JSON.stringify(normal.filter(i=>i.types=="Other").map(i=>({
//   name: i.name,
//   icon: i.icon,
//   id: i.id
// })).sort((a,b)=>a.id-b.id).filter(i=>i.id!==undefined),null,2))