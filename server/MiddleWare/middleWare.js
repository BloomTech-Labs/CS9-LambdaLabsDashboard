const ProjectModel = require("../projects/projectsModel.js");
const UserModel = require("../Users/userModel.js");

const noneEmpty = (req, res, next) => {
  const projectName = req.body.projectName;
  const numberOfStudents = req.body.numberOfStudents;
  const dueDate = req.body.dueDate;
  if (projectName === "" || numberOfStudents === "" || dueDate === "") {
    return res
      .status(400)
      .json(" fields are require, plz enter the missing field ....");
  } else {
    next();
  }
};

const userEmpty = (req, res, next) => {
  const username = req.body.username;
  const password = req.body.password;
  if (username === "" || password === "") {
    return res.status(400).json("credentials can`t be empty..!!!");
  } else {
    next();
  }
};
module.exports = { noneEmpty, userEmpty };
