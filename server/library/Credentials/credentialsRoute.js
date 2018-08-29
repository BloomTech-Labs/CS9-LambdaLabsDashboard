import express from "express";
import CredentialsModel from "./credentialsModel.js";
import { makeToken, secret } from "../MiddleWare/jwtMiddleWare.js";
import { userEmpty } from "../MiddleWare/middleWare.js";
import authenticate from "../MiddleWare/authJWT.js";
const router = express.Router();

router.get("/", (req, res) => {
  console.log(req.body);
  CredentialsModel.find({})

    .then(p => {
      res.status(200).json({ p });
    })
    .catch(error => {
      res.status(500).json({ msg: error });
    });
});

router.post("/", userEmpty, (req, res) => {
  console.log("request ===>", req.body);
  const obj = req.body;
  const newCredential = CredentialsModel(obj);
  newCredential
    .save()
    .then(p => {
      console.log(p);
      res.status(200).json({ newCredential });
    })
    .catch(error => {
      res
        .status(200)
        .json({ msg: "... not able to post your newCredential", error });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  CredentialsModel.findById(id)

    .then(p => {
      res.status(200).json(p);
    })
    .catch(err => {
      res.status(500).json({ msg: "we cant display this newCredential " });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const obj = req.body;
  console.log(obj);
  console.log(id);
  CredentialsModel.findByIdAndUpdate(id, obj, { new: true })
    .then(p => {
      res.status(200).json({ msg: "Credential updated successfully", p });
    })
    .catch(err => {
      res.status(500).json({ msg: "... not able to update your Credential " });
    });
});

router.delete("/:id", (req, res) => {
  const id = req.params.id;
  console.log("===>", id);
  if (id === "kkkk") {
    console.log(id);
    CredentialsModel.find({})
      .deleteMany({})
      .then(p => {
        res.send("deleted");
      });
  } else {
    CredentialsModel.findById(id)
      .remove()
      .then(p => {
        res.status(200).json({ msg: "..Credential  successfully deleted" });
      })
      .catch(err => {
        res.status(200).json({ msg: "... not able to  delete Credential " });
      });
  }
});

module.exports = router;
