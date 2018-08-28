import { combineReducers } from "redux";
import Navigation from "./Navigation";
import ExternalApis from "./ExternalApis";
import { trelloGithubReducer } from "./trelloGithub.js";
import { editProjectReducer } from "./editProjectReducer.js";
import { submitProjectReducer } from "./submitProjectReducer.js";
import { studentInfoReducer } from "./studentInfoReducer";
import { githubDummyDataReducer } from "./githubDummyData.js";
import { catchingStudents } from "./catchingStudentsToProjects.js";
export default combineReducers({
  Navigation,
  ExternalApis,
  trelloGithubReducer,
  editProjectReducer,
  submitProjectReducer,
  studentInfoReducer,
  githubDummyDataReducer,
  catchingStudents
});
