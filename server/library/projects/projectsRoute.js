import express from "express";
import ProjectsModel from "./projectsModel.js";
import ClassModel from '../Classes/classModel';
import { noneEmpty } from "../MiddleWare/middleWare.js";
import authenticate from "../MiddleWare/authJWT.js";

const Router = express.Router();

Router.post("/", (req, res) => {
  console.log("request ===>", req.body);
  const { classID } = req.body;
  const newProject = ProjectsModel(req.body);
  newProject.save()
    .then(project => {
      ClassModel.findByIdAndUpdate(classID, { $push: { projects: project._id }})
        .then(update => {
          const { userID } = update;
          ClassModel.find({ userID })
            .populate("projects")
            .then(classes => res.status(200).json({ classes }))
            .catch(err => res.send('Error creating project'));
        })
        .catch(err => res.send('Error creating project'));
    })
    .catch(error => res.send('Error creating project'));
});

Router.put("/:id", (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  ProjectsModel.findByIdAndUpdate(id, obj, { new: true })
    .then(p => {
      res.status(200).json({ msg: "project updated successfully", p });
    })
    .catch(err => {
      res.status(500).json({ msg: "... not able to update your project" });
    });
});

Router.get("/:id", (req, res) => {
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

Router.delete("/:id/:userID", (req, res) => {
  const { id, userID } = req.params;
  ProjectsModel.findById(id).remove()
    .then(p => {
      ClassModel.find({ userID })
        .populate("projects")
        .then(classes => res.status(200).json({ classes }))
        .catch(err => res.send('Error creating project'));
    })
    .catch(err => {
      res.status(200).json({ msg: "... not able to  delete project" });
    });
});

export default Router
