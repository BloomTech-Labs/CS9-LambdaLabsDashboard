const ProjectModel = require("../projects/projectsModel.js");

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

module.exports = noneEmpty;
