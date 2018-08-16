const express = require("express");
const router = express.Router();
import ProjectsModel from "./projectsModel.js";
import { noneEmpty } from "../MiddleWare/middleWare.js";

router.get("/", (req, res) => {
  console.log(req.body);
  ProjectsModel.find({})
    .then(projects => {
      res.status(200).json({ projects: projects });
    })
    .catch(error => {
      res.status(500).json({ msg: error });
    });
});

router.post("/", noneEmpty, (req, res) => {
  console.log("request ===>", req.body);
  const obj = req.body;
  const newProject = ProjectsModel(obj);
  newProject
    .save()
    .then(p => {
      console.log(p);
      res.status(200).json({ newProject });
    })
    .catch(error => {
      res.status(200).json({ msg: "... not able to post your project", error });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  console.log(obj);
  console.log(id);
  ProjectsModel.findByIdAndUpdate(id, obj, { new: true })
    .then(p => {
      res.status(200).json({ msg: "project updated successfully", p });
    })
    .catch(err => {
      res.status(500).json({ msg: "... not able to update your project" });
    });
});
module.exports = router;
