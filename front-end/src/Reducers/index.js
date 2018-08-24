import { combineReducers } from "redux";
import Navigation from "./Navigation";
import { trelloGithubReducer } from "./trelloGithub.js";
import { editProjectReducer } from "./editProjectReducer.js";
import { submitProjectReducer } from "./submitProjectReducer.js";
import { studentInfoReducer } from "./studentInfoReducer";
import { githubDummyDataReducer } from "./githubDummyData.js";
export default combineReducers({
  Navigation,
  trelloGithubReducer,
  editProjectReducer,
  submitProjectReducer,
  studentInfoReducer,
  githubDummyDataReducer
});
