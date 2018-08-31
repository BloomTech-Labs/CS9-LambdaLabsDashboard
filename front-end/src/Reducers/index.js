import { combineReducers } from 'redux';
import Navigation from './Navigation';
import ExternalApis from './ExternalApis';
import Database from './Database';

export default combineReducers({
  Navigation,
  ExternalApis,
  Database,
});
