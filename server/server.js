import express from "express";
import mongoose from "mongoose";

const keys = require("./keys.js");
const Server = express();

const bodyParser = require("body-parser");
const helmet = require("helmet");
const cors = require("cors");
Server.use(cors());
Server.use(helmet());
Server.use(bodyParser.json());

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

const projects = require("./projects/projectsRoute.js");
Server.use("/projects", projects);

Server.listen(port, () => {
  console.log(`\n=== server is running on ${port} ==`);
});
