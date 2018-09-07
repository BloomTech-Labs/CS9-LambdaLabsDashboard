import { combineReducers } from "redux";
import Navigation from "./Navigation";
import ExternalApis from "./ExternalApis";
import Database from "./Database";
import { chargeReducer } from "./charge";
export default combineReducers({
  Navigation,
  ExternalApis,
  Database,
  chargeReducer
});
