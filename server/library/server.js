import express from "express";
import mongoose from "mongoose";
import path from "path";
import keys from "./keys";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieSession from "cookie-session";
import passport from "passport";
import cors from "cors";
import classes from "./Classes/classRoute";
import projects from "./projects/projectsRoute";
import user from "./Users/userRoute.js";
import login from "./login/loginRoute.js";
import charge from "./charge/chargeRoute.js";
import googleRedirect from "./google/googleRedirect.js";
import googleRoute from "./google/googleRoute.js";
import facebookRedirect from "./facebook/facebookRedirect.js";
import facebookRoute from "./facebook/facebookRoute.js";
import trelloRedirect from "./trello/trelloRedirect.js";
import trelloRoute from "./trello/trelloRoute.js";

import githubRedirect from "./github/githubRedirect.js";
import githubRoute from "./github/githubRoute.js";

import ExternalApiRoutes from "./ExternalApis/ExternalApiRoutes";
import ValidateTokenRoute from "./Token/ValidateTokenRoute";
require("dotenv").config();
const Server = express();
const sessionOptions = {
  maxAge: 24 * 60 * 60 * 1000,
  keys: [process.env.cookieKey]
};
const staticFiles = express.static(
  path.join(__dirname, "../../front-end/build")
);
Server.use(cors());
Server.use(helmet());
Server.use(bodyParser.json());
Server.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  res.setHeader("Cache-Control", "no-cache");
  next();
});
Server.use(staticFiles);

const port = process.env.PORT || 4000;

mongoose
  .connect(
    process.env.MONGO_URL,
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
Server.use("/projects", projects);
Server.use("/users", user);
Server.use("/login", login);
Server.use("/charge", charge);
Server.use("/auth/google/callback", googleRedirect);
Server.use("/google", googleRoute);
Server.use("/auth/facebook/callback", facebookRedirect);
Server.use("/facebook", facebookRoute);

Server.use("/auth/trello/callback", trelloRedirect);
Server.use("/trello", trelloRoute);

Server.use("/auth/github/callback", githubRedirect);
Server.use("/github", githubRoute);

Server.use("/externalApis", ExternalApiRoutes);
Server.use("/token", ValidateTokenRoute);
Server.use("*", staticFiles);

Server.listen(port, () => {
  console.log(`\n=== server is running on ${port} ==`);
});
