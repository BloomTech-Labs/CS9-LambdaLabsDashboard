const express = require("express");
const router = express.Router();
import ProjectsModel from "./projectsModel.js";
import { noneEmpty } from "../MiddleWare/middleWare.js";
import authenticate from "../MiddleWare/authJWT.js";

router.get("/", (req, res) => {
  console.log(req.body);
  ProjectsModel.find({})
    // .populate("class", "-_id")
    // .populate("students", "-_id")
    .then(projects => {
      res.status(200).json({ projects: projects });
    })
    .catch(error => {
      res.status(500).json({ msg: error });
    });
});

router.post("/", (req, res) => {
  console.log("request ===>", req.body);
  const newProject = ProjectsModel(req.body);
  newProject.save()
    .then(project => {
      res.status(200).json({ project });
    })
    .catch(error => res.send('Error creating project'));
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

router.get("/:id", (req, res) => {
  const { id } = req.params;
  ProjectModel.findById(id)
    .populate("class", "-_id")
    .populate("students", "-_id")
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: "we cant display this project " });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  ProjectsModel.findById(id)
    .remove()
    .then(p => {
      res.status(200).json({ msg: "...project successfully deleted" });
    })
    .catch(err => {
      res.status(200).json({ msg: "... not able to  delete project" });
    });
});

module.exports = router;
