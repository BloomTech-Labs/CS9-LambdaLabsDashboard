import express from "express";
import Axios from 'axios';
import ClassModel from "./classModel.js";
require('dotenv').config();

const Router = express.Router();
const trelloKey = process.env.TRELLO_KEY;
const trelloToken = process.env.TRELLO_TOKEN;
const auth = `?key=${trelloKey}&token=${trelloToken}`;

Router.get("/:userID", (req, res) => {
  const { userID } = req.params
  ClassModel.find({ userID })
    .populate("projects")
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
        .populate("projects")
        .then(classes => res.status(200).json({classes}))
        .catch(notClasses => res.send('error'));
    })
    .catch(error => res.send('error'));
});

Router.get("/projects/:id", async (req, res) => {
  const { id } = req.params;
  ClassModel.findById(id)
    .populate("projects")
    .then(c => {
      const { projects } = c;
      const requests = [];
      for(let i = 0; i < projects.length; i++) {
        const { trello } = projects[i];
        requests.push(Axios.get(`https://api.trello.com/1/boards/${trello}/members${auth}`))
      }
      Axios.all(requests)
        .then(resolve => {
          const results = [];
          for(let i = 0; i < resolve.length; i++) {
            const { data } = resolve[i];
            results.push(data);
          }
          res.status(200).json({ results });
        })
        .catch(err => res.json({error: 'error'}));
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
        .populate("projects")
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
        .populate("projects")
        .then(classes => res.status(200).json({classes}))
        .catch(notClasses => res.send('error'));
    })
    .catch(err => {
      res.send('error');
    });
});

export default Router
