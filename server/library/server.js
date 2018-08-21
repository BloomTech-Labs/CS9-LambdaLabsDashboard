import express from "express";
import mongoose from "mongoose";
import path from "path";
import keys from "./keys";
import bodyParser from "body-parser";
import helmet from "helmet";
const cookieSession = require("cookie-session");
const passport = require("passport");
import cors from "cors";
import students from "./Students/studentRoute";
import classes from "./Classes/classRoute";
import projects from "./projects/projectsRoute";
import user from "./Users/userRoute.js";
import login from "./login/loginRoute.js";
import charge from "./charge/chargeRoute.js";
const Server = express();
const sessionOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  keys: [keys.session.cookieKey]
};
const staticFiles = express.static(
  path.join(__dirname, "../../front-end/build")
);
Server.use(cors());
Server.use(helmet());
Server.use(bodyParser.json());
Server.use(staticFiles);

const port = process.env.PORT || 4000;

mongoose
  .connect(
    keys.mongodb.dbURL,
    { useNewUrlParser: true }
  )
  .then(p => {
    console.log("=== connected to lambdadashboard==");
  })
  .catch(err => {
    console.log(`err:${err}`);
  });

Server.get("/", (req, res) => {
  res.status(200).json({ msg: "api is running!" });
});

Server.use("/classes", classes);
Server.use("/projects", cors(), projects);
Server.use("/users", user);
Server.use("*", staticFiles);
Server.use("/login", login);
Server.use("/charge", charge);
Server.use("/students", students);

const googleRedirect = require("./google/googleRedirect.js");
Server.use("/auth/google/callback", googleRedirect);

// const googleRoute = require("./google/googleRoute.js");
// Server.use("/google", googleRoute);

const googleLoginRoute = require("./google/googleLoginRoute.js");
Server.use("/google", googleLoginRoute);

Server.listen(port, () => {
  console.log(`\n=== server is running on ${port} ==`);
});
