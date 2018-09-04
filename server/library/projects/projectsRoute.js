import express from "express";
import ProjectsModel from "./projectsModel.js";
import ClassModel from '../Classes/classModel';
import { noneEmpty } from "../MiddleWare/middleWare.js";
import authenticate from "../MiddleWare/authJWT.js";
import { getBoardID } from '../ExternalApis/BatchRequests';

const Router = express.Router();

Router.post("/", async (req, res) => {
  console.log("request ===>", req.body);
  const { name, github, classID, trello } = req.body;
  const { id, error } = await getBoardID(trello);
  if(id && !error) {
    const newProject = ProjectsModel({ name, github, trelloID: id, trelloURL: trello, classID });
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
  } else {
    res.send('Incorrect Trello link');
  }
});

Router.put("/:id/:userID", (req, res) => {
  const { id, userID } = req.params;
  const obj = req.body;
  ProjectsModel.findByIdAndUpdate(id, obj, { new: true })
    .then(p => {
      ClassModel.find({ userID })
        .populate("projects")
        .then(classes => res.status(200).json({ classes }))
        .catch(err => res.send('Error creating project'));
    })
    .catch(err => res.send('error'));
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
