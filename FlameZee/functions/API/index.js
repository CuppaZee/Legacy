const functions = require('firebase-functions');
const cors = require('cors')({
    origin: true,
});

var routes = [
  ...require('./user'),
  // ...require('./clan'),
  // ...require('./database')
]
console.log(routes);

module.exports = functions.https.onRequest(async (req, res) => {
  var startTime = process.hrtime();
  function executed_in() {
    let pt = process.hrtime(startTime);
    return pt[0] * 1e9 + pt[1];
  }
  return cors(req, res, async () => {
    var path = req.path.split('/').filter(Boolean);
    var version = null;
    var route = path.join('/');
    if(path[path.length-1].match(/^v([0-9]+)$/)) {
      version = Number(path[path.length-1].match(/^v([0-9]+)$/)[1])
      route = path.slice(0,-1).join('/');
    }
    var routeDetails = {route,version:version||"latest",raw:path.join('/'),params:null}
    var use_route = routes.find(i=>i.path===route);
    if(!use_route) {
      return res.send({
        data: null,
        status: {
          text: "Route not Found",
          id: "route_not_found",
          code: 404
        },
        route: routeDetails,
        executed_in: executed_in()
      });
    }
    var use_version = version||use_route.latest;
    routeDetails.version=use_version;
    if(!use_route.versions.find(i=>i.version===use_version)) {
      return res.send({
        data: null,
        status: {
          text: "Version not Found",
          id: "version_not_found",
          code: 404
        },
        route: routeDetails,
        executed_in: executed_in()
      });
    }
    var use = use_route.versions.find(i=>i.version===use_version);
    routeDetails.params = use.params;
    if(!use.function) {
      return res.send({
        data: null,
        status: {
          text: "Function not Found",
          id: "function_not_found",
          code: 500
        },
        route: routeDetails,
        executed_in: executed_in()
      });
    }
    var response = await use.function();
    return res.send({
      data: response.data,
      status: {
        200: {
          text: "Success",
          "id": "success",
          code: 200
        },
        500: {
          text: "Unexpected Error",
          id: "unexpected_error",
          code: 500
        }
      }[response.status]||response.status,
      route: routeDetails,
      executed_in: executed_in()
    })
  })
})