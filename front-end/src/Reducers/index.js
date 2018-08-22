import { combineReducers } from "redux";
import Navigation from "./Navigation";
import { trelloGithubReducer } from "./trelloGithub.js";

export default combineReducers({
  Navigation,
  trelloGithubReducer
});
