import express from "express";
import mongoose from "mongoose";
import path from 'path'
import keys from './keys';
import bodyParser from 'body-parser';
import helmet from 'helmet';
import cors from 'cors';
import projects from './projects/projectsRoute';
import user from './Users/userRoute.js';
const Server = express();
const staticFiles = express.static(path.join(__dirname, '../../front-end/build'));
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

Server.use("/projects", projects);
Server.use("/user", user);
Server.use('*', staticFiles);

Server.listen(port, () => {
  console.log(`\n=== server is running on ${port} ==`);
});
