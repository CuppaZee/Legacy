const functions = require("firebase-functions");
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);
const db = admin.firestore();
const cors = require("cors")({
  origin: true,
});

var routes = [...require("./user"), ...require("./auth"), ...require("./minute"), ...require("./clan"), ...require("./munzee"), ...require("./bouncers"), ...require("./notifications"), ...require("./map"), ...require("./camps")];

exports.api = functions.https.onRequest(async (req, res) => {
  var startTime = process.hrtime();
  function executed_in() {
    let pt = process.hrtime(startTime);
    return pt[0] * 1e9 + pt[1];
  }
  return cors(req, res, async () => {
    try {
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
        console.log(e);
      }
      var params = Object.assign({}, req.query || {}, body || {});
      var response = await use.function({
        params: params,
        res,
        db
      });
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
      console.log(e);
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
});
