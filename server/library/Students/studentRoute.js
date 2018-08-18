import express from 'express';
import StudentModel from "./studentModel.js";
import { makeToken, secret } from "../MiddleWare/jwtMiddleWare.js";
import { userEmpty } from "../MiddleWare/middleWare.js";
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.body);
  StudentModel.find({})
    .populate("className", "-_id")
    .populate("project", "-_id")
    .then(s => {
      res.status(200).json({ students: s });
    })
    .catch(error => {
      res.status(500).json({ msg: error });
    });
});

router.post("/", (req, res) => {
  console.log("request ===>", req.body);
  const obj = req.body;
  const newStudent = StudentModel(obj);
  newStudent
    .save()
    .then(p => {
      console.log(p);
      res.status(200).json({ newStudent });
    })
    .catch(error => {
      res.status(200).json({ msg: "... not able to post your student", error });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  console.log(obj);
  console.log(id);
  StudentModel.findByIdAndUpdate(id, obj, { new: true })
    .then(p => {
      res.status(200).json({ msg: "user updated successfully", p });
    })
    .catch(err => {
      res.status(500).json({ msg: "... not able to update your user" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  StudentModel.findById(id)
    .populate("className", "-_id")
    .populate("project", "-_id")
    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: "we cant display expenses " });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  StudentModel.findById(id)
    .remove()
    .then(p => {
      res.status(200).json({ msg: "...student  successfully deleted" });
    })
    .catch(err => {
      res.status(200).json({ msg: "... not able to  delete student" });
    });
});

module.exports = router;
