const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const cors = require("cors")({
  origin: true,
});

function checkFrom(from,route) {
  if(route==="auth/auth") {
    return true;
  } else if(route.includes("minute")) {
    return true;
  } else if(from===undefined) {
    return false;
  } else if(from.match(/^cuppazee_([a-z]+)_([0-9.]+)_([0-9.]+)$/)) {
    const [fullMatch,platform,version,build] = from.match(/^cuppazee_([a-z]+)_([0-9.]+)_([0-9.]+)$/);
    if(["android","ios","web"].includes(platform)) {
      if(version==="1.2") {
        if(Number(build)>=210) {
          return true;
        }
      }
    }
  } else if(from.match(/^zeetreehouses_([0-9]{4})\.([0-9]{2})\.([0-9]{2})\.([0-9]{2})([0-9]{2})([αßΩ]?)$/)) {
    const [fullMatch,year,month,day,hour,minute,type] = from.match(/^zeetreehouses_([0-9]{4})\.([0-9]{2})\.([0-9]{2})\.([0-9]{2})([0-9]{2})([αßΩ]?)$/);
    return true;
  } else if(from.match(/^destination_expiry_([0-9.]+)$/)) {
    const [fullMatch,version] = from.match(/^destination_expiry_([0-9.]+)$/);
    return true;
  } else if(from==="human") {
    return true;
  }
  return false;
}

var routes = [...require("./user"), ...require("./auth"), ...require("./minute"), ...require("./clan"), ...require("./munzee"), ...require("./bouncers"), ...require("./notifications"), ...require("./map"), ...require("./camps")];

var x = async (req, res) => {
  const cns = {
    function: '?',
    log(){console.log(this.function,...arguments)},
    error(){console.error(this.function,...arguments)},
    warn(){console.warn(this.function,...arguments)},
  }
  var startTime = process.hrtime();
  function executed_in() {
    let pt = process.hrtime(startTime);
    return pt[0] * 1e9 + pt[1];
  }
  return cors(req, res, async () => {
    try {
      cns.function = req.path;
      var path = req.path.split("/").filter(Boolean);
      var version = null;
      var route = path.join("/");
      if (path.length === 0) return res.redirect("https://dev.cuppazee.app/");
      if (path[path.length - 1].match(/^v([0-9]+)$/)) {
        version = Number(path[path.length - 1].match(/^v([0-9]+)$/)[1]);
        route = path.slice(0, -1).join("/");
      }
      var routeDetails = {
        route,
        version: version || "latest",
        raw: path.join("/"),
        params: null,
      };
      cns.function = `E: ${routeDetails.route} V: ${routeDetails.version} R: ${routeDetails.raw}`;
      var use_route = routes.find((i) => i.path === route);
      if (!use_route) {
        return res.send({
          data: null,
          status: {
            text: "Route not Found",
            id: "route_not_found",
            code: 404,
          },
          route: routeDetails,
          executed_in: executed_in(),
        });
      }
      var use_version = version || use_route.latest;
      routeDetails.version = use_version;
      cns.function = `E: ${routeDetails.route} V: ${routeDetails.version} R: ${routeDetails.raw}`;
      if (!use_route.versions.find((i) => i.version === use_version)) {
        return res.send({
          data: null,
          status: {
            text: "Version not Found",
            id: "version_not_found",
            code: 404,
          },
          route: routeDetails,
          executed_in: executed_in(),
        });
      }
      var use = use_route.versions.find((i) => i.version === use_version);
      routeDetails.params = use.params;
      if (!use.function) {
        return res.send({
          data: null,
          status: {
            text: "Function not Found",
            id: "function_not_found",
            code: 500,
          },
          route: routeDetails,
          executed_in: executed_in(),
        });
      }
      var body = {};
      try {
        if (typeof req.body === "string") {
          body = JSON.parse(req.body || "{}");
        } else {
          body = req.body;
        }
      } catch (e) {
        cns.error(e);
      }
      var params = Object.assign({}, req.query || {}, body || {});
      if(!checkFrom(params.from,routeDetails.route)) {
        return res
          .status(403)
          .send({
            data: null,
            status: {
              text: "Blocked FROM",
              id: "blocked_from",
              code: 403,
            },
            route: null,
            executed_in: executed_in(),
          });
      }
      cns.log('Running')
      var response = await use.function({
        params: params,
        res,
        db,
        cns
      });
      cns.log('Finished')
      if (response.norespond) return;
      return res
        .status(
          { success: 200, error: 500 }[response.status] ||
          (response.status ? response.status.code : 500) ||
          500
        )
        .send({
          data: response.data,
          status: {
            success: {
              text: "Success",
              id: "success",
              code: 200,
            },
            error: {
              text: "Unexpected Error",
              id: "unexpected_error",
              code: 500,
            },
          }[response.status] ||
            response.status || {
            text: "Unexpected Error",
            id: "unexpected_error",
            code: 500,
          },
          route: routeDetails,
          executed_in: executed_in(),
        });
    } catch (e) {
      cns.error(e);
      return res
        .status(500)
        .send({
          data: null,
          status: {
            text: "Unexpected Error",
            id: "unexpected_error",
            code: 500,
          },
          route: null,
          executed_in: executed_in(),
        });
    }
  });
};

exports.api = functions.https.onRequest(x);

exports.api2gb = functions.runWith({
  memory: '2GB',
}).https.onRequest(x);
