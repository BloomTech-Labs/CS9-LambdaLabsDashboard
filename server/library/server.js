import express from "express";
import mongoose from "mongoose";
import path from "path";
import keys from "./keys";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";
import students from "./Students/studentRoute";
import classes from "./Classes/classRoute";
import projects from "./projects/projectsRoute";
import user from "./Users/userRoute.js";
import login from "./login/loginRoute.js";
import charge from "./charge/chargeRoute.js";

const Server = express();
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

// Server.get("/", (req, res) => {
//   res.status(200).json({ msg: "api is running!" });
// });

Server.use("api/classes", classes);
Server.use("api/projects", projects);
Server.use("api/users", user);
Server.use("api/login", login);
Server.use("api/charge", charge);
Server.use("api/students", students);
Server.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../front-end/build/index.html'));
});
Server.listen(port, () => {
  console.log(`\n=== server is running on ${port} ==`);
});
