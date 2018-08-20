const express = require("express");
const router = express.Router();
import ClassModel from "./classModel.js";
import { makeToken, secret } from "../Middleware/jwtMiddleWare.js";
import { userEmpty } from "../MiddleWare/middleWare.js";
import authenticate from "../MiddleWare/authJWT.js";

router.get("/", authenticate, (req, res) => {
  console.log(req.body);
  ClassModel.find({})
    .populate("Students", "-_id")
    .populate("LambdaProject", "-_id")
    .then(p => {
      res.status(200).json({ classes: p });
    })
    .catch(error => {
      res.status(500).json({ msg: error });
    });
});

router.post("/", userEmpty, authenticate, (req, res) => {
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

router.get("/:id", authenticate, (req, res) => {
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

router.put("/:id", authenticate, (req, res) => {
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

router.delete("/:id", authenticate, (req, res) => {
  const id = req.params.id;

  ClassModel.findById(id)
    .remove()
    .then(p => {
      res.status(200).json({ msg: "...class  successfully deleted" });
    })
    .catch(err => {
      res.status(200).json({ msg: "... not able to  delete class" });
    });
});

module.exports = router;
