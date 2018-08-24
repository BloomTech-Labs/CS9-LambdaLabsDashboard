import express from "express";
import mongoose from "mongoose";
import path from "path";
import keys from "./keys";
import bodyParser from "body-parser";
import helmet from "helmet";
import cookieSession from "cookie-session";
import passport from "passport";
import cors from "cors";
import students from "./Students/studentRoute";
import classes from "./Classes/classRoute";
import projects from "./projects/projectsRoute";
import user from "./Users/userRoute.js";
import login from "./login/loginRoute.js";
import charge from "./charge/chargeRoute.js";
import googleRedirect from "./google/googleRedirect.js";
import googleRoute from "./google/googleRoute.js";
import ProjectUsers from "./ProjectUsers/projectUsersRoute.js";
<<<<<<< HEAD

=======
import ExternalApiRoutes from './ExternalApis/ExternalApiRoutes';
require('dotenv').config();
>>>>>>> 27ba6333cbc6e4a312c3c3be739589161cacb26a
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
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
 res.setHeader('Cache-Control', 'no-cache');
 next();
});
Server.use(staticFiles);

const port = process.env.PORT || 4000;

mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true })
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
Server.use("/students", students);
Server.use("/auth/google/callback", googleRedirect);
Server.use("/google", googleRoute);
Server.use("/projectUsers", ProjectUsers);
Server.use("/externalApis", ExternalApiRoutes);
Server.use("*", staticFiles);

// const googleRoute = require("./google/googleRoute.js");
// // Server.use("/google", googleRoute);

// const googleLoginRoute = require("./google/googleLoginRoute.js");
// Server.use("/google", googleLoginRoute);

Server.listen(port, () => {
  console.log(`\n=== server is running on ${port} ==`);
});
