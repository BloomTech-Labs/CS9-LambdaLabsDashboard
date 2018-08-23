import { combineReducers } from "redux";
import Navigation from "./Navigation";
import { trelloGithubReducer } from "./trelloGithub.js";
import { editProjectReducer } from "./editProjectReducer.js";
import { submitProjectReducer } from "./submitProjectReducer.js";

export default combineReducers({
  Navigation,
  trelloGithubReducer,
  editProjectReducer,
  submitProjectReducer
});
