import express from "express";
import ClassModel from "./classModel.js";
import { makeToken, secret } from "../MiddleWare/jwtMiddleWare.js";
import { userEmpty } from "../MiddleWare/middleWare.js";
import authenticate from "../MiddleWare/authJWT.js";
const Router = express.Router();

Router.get("/:userID", (req, res) => {
  const { userID } = req.params
  ClassModel.find({ userID })
    .populate("project")
    .then(classes => {
      res.status(200).json({ classes });
    })
    .catch(error => res.send('error'));
});

Router.post("/", (req, res) => {
  console.log("request ===>", req.body);
  const obj = req.body;
  const { userID } = obj;
  const newClass = ClassModel(obj);
  newClass.save()
    .then(newClass => {
      console.log(newClass);
      ClassModel.find({ userID })
        .then(classes => res.status(200).json({classes}))
        .catch(notClasses => res.send('error'));
    })
    .catch(error => res.send('error'));
});

Router.get("/:id", (req, res) => {
  const { id } = req.params;
  ClassModel.findById(id)
    .populate("Students", "-_id")
    .populate("LambdaProject", "-_id")
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: "we cant display this class " });
    });
});

Router.put("/:userID/:id", (req, res) => {
  const { userID, id } = req.params;
  ClassModel.findByIdAndUpdate(id, req.body, {new: true})
    .then(doc => {
      ClassModel.find({ userID })
        .then(classes => res.status(200).json({classes}))
        .catch(notClasses => res.send('error'));
    })
    .catch(err => {
      res.status(500).json({ msg: "... not able to update your class" });
    });
});

Router.delete("/:id/:userID", (req, res) => {
  const { id, userID } = req.params;
  ClassModel.findById(id).remove()
    .then(p => {
      ClassModel.find({ userID })
        .then(classes => res.status(200).json({classes}))
        .catch(notClasses => res.send('error'));
    })
    .catch(err => {
      res.send('error');
    });
});

export default Router
