import express from "express";
import ProjectUsersModel from "./projectUsersModel.js";
import { makeToken, secret } from "../MiddleWare/jwtMiddleWare.js";
import { userEmpty } from "../MiddleWare/middleWare.js";
const router = express.Router();
import authenticate from "../MiddleWare/authJWT.js";

router.get("/", (req, res) => {
  console.log(req.body);
  ProjectUsersModel.find({})

    .then(s => {
      res.status(200).json({ s });
    })
    .catch(error => {
      res.status(500).json({ msg: error });
    });
});

router.post("/", (req, res, next) => {
  if (req.body.users.length === 0 || req.body.projectId === "") {
    return res.send(" can not post empty projectusers ");
  }
  const { projectId } = req.body;
  console.log("request ===>", req.body);
  ProjectUsersModel.findOne({ projectId }).then(p => {
    if (p) {
      res.send("sorry we have one already ");
    } else {
      const obj = req.body;
      const newUsers = ProjectUsersModel(obj);
      newUsers
        .save()
        .then(p => {
          console.log(p);
          res.status(200).json({ p });
        })
        .catch(error => {
          res
            .status(200)
            .json({ msg: "... not able to post your projectsUsers", error });
        });
    }
  });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  console.log(obj);
  console.log(id);
  ProjectUsersModel.findByIdAndUpdate(id, obj, { new: true })
    .then(p => {
      res.status(200).json({ msg: "users updated successfully", p });
    })
    .catch(err => {
      res.status(500).json({ msg: "... not able to update your users" });
    });
});

router.get("/:id", (req, res) => {
  const { projectId } = req.params;
  ProjectUsersModel.findOne(projectId)

    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: "we cant find this projectusers " });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;

  ProjectUsersModel.findById(id)
    .remove()
    .then(p => {
      res.status(200).json({ msg: "...users  successfully deleted" });
    })
    .catch(err => {
      res.status(200).json({ msg: "... not able to  delete users" });
    });
});

module.exports = router;
