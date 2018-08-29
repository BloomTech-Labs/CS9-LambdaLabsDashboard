import express from "express";
import mongoose from "mongoose";
import path from "path";
import keys from "./keys";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieSession from "cookie-session";
import passport from "passport";
import cors from "cors";
import StudentCredentials from "./Students/studentRoute";
import classes from "./Classes/classRoute";
import projects from "./projects/projectsRoute";
import user from "./Users/userRoute.js";
import login from "./login/loginRoute.js";
import charge from "./charge/chargeRoute.js";
import googleRedirect from "./google/googleRedirect.js";
import googleRoute from "./google/googleRoute.js";
import ProjectUsers from "./ProjectUsers/projectUsersRoute.js";
import ExternalApiRoutes from "./ExternalApis/ExternalApiRoutes";
import ValidateTokenRoute from "./Token/ValidateTokenRoute";
import StudentCredential from "./Credentials/credentialsRoute.js";
import facebookRoute from "./Facebook/facebookRoute.js";
import facebookRedirect from "./Facebook/facebookRedirect.js";

require("dotenv").config();
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
Server.use("/login", login);
Server.use("/charge", charge);
Server.use("/auth/google/callback", googleRedirect);
Server.use("/google", googleRoute);
Server.use("/projectUsers", ProjectUsers);
Server.use("/externalApis", ExternalApiRoutes);
Server.use("/token", ValidateTokenRoute);
Server.use("/studentCredential", StudentCredential);

Server.use("/facebook", facebookRoute);

Server.use("/auth/facebook/callback", facebookRedirect);
Server.use("*", staticFiles);

// const googleRoute = require("./google/googleRoute.js");
// // Server.use("/google", googleRoute);

// const googleLoginRoute = require("./google/googleLoginRoute.js");
// Server.use("/google", googleLoginRoute);

Server.listen(port, () => {
  console.log(`\n=== server is running on ${port} ==`);
});
