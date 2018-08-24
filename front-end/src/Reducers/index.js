import { combineReducers } from "redux";
import Navigation from "./Navigation";
import ExternalApis from "./ExternalApis";
import { trelloGithubReducer } from "./TrelloGithub.js";
import { editProjectReducer } from "./EditProjectReducer.js";
import { submitProjectReducer } from "./SubmitProjectReducer.js";
import { studentInfoReducer } from "./StudentInfoReducer";
import { githubDummyDataReducer } from "./GithubDummyData.js";
export default combineReducers({
  Navigation,
  ExternalApis,
  trelloGithubReducer,
  editProjectReducer,
  submitProjectReducer,
  studentInfoReducer,
  githubDummyDataReducer
});
