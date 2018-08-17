"use strict";

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _path = require("path");

var _path2 = _interopRequireDefault(_path);

var _keys = require("./keys");

var _keys2 = _interopRequireDefault(_keys);

var _bodyParser = require("body-parser");

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _helmet = require("helmet");

var _helmet2 = _interopRequireDefault(_helmet);

var _cors = require("cors");

var _cors2 = _interopRequireDefault(_cors);

var _projectsRoute = require("./projects/projectsRoute");

var _projectsRoute2 = _interopRequireDefault(_projectsRoute);

var _userRoute = require("./Users/userRoute.js");

var _userRoute2 = _interopRequireDefault(_userRoute);

var _loginRoute = require("./login/loginRoute.js");

var _loginRoute2 = _interopRequireDefault(_loginRoute);

var _chargeRoute = require("./charge/chargeRoute.js");

var _chargeRoute2 = _interopRequireDefault(_chargeRoute);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Server = (0, _express2.default)();
var staticFiles = _express2.default.static(_path2.default.join(__dirname, '../../front-end/build'));
Server.use((0, _cors2.default)());
Server.use((0, _helmet2.default)());
Server.use(_bodyParser2.default.json());
Server.use(staticFiles);

var port = process.env.PORT || 4000;

_mongoose2.default.connect(_keys2.default.mongodb.dbURL, { useNewUrlParser: true }).then(function (p) {
  console.log("=== connected to lambdadashboard==");
}).catch(function (err) {
  console.log("err:" + err);
});

Server.get("/", function (req, res) {
  res.status(200).json({ msg: "api is running!" });
});

Server.use("/projects", _projectsRoute2.default);
Server.use("/user", _userRoute2.default);
Server.use('*', staticFiles);
Server.use("/login", _loginRoute2.default);
Server.use("/charge", _chargeRoute2.default);

Server.listen(port, function () {
  console.log("\n=== server is running on " + port + " ==");
});