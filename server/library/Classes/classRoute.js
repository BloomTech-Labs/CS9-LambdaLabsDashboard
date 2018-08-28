import express from "express";
import ClassModel from "./classModel.js";
import { makeToken, secret } from "../MiddleWare/jwtMiddleWare.js";
import { userEmpty } from "../MiddleWare/middleWare.js";
import authenticate from "../MiddleWare/authJWT.js";
const Router = express.Router();

Router.get("/", (req, res) => {
  console.log(req.body);
  ClassModel.find({})
    .populate("students", "-_id")
    .populate("project", "-_id")
    .then(p => {
      res.status(200).json({ classes: p });
    })
    .catch(error => {
      res.status(500).json({ msg: error });
    });
});

Router.post("/", userEmpty, (req, res) => {
  console.log("request ===>", req.body);
  const obj = req.body;
  const newClass = ClassModel(obj);
  newClass
    .save()
    .then(p => {
      console.log(p);
      res.status(200).json({ newClass });
    })
    .catch(error => {
      res.status(200).json({ msg: "... not able to post your user", error });
    });
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

Router.put("/:id", (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  console.log(obj);
  console.log(id);
  ClassModel.findByIdAndUpdate(id, obj, { new: true })
    .then(p => {
      res.status(200).json({ msg: "class updated successfully", p });
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
