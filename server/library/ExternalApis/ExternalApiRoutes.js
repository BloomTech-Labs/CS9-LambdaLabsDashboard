import express from "express";
import getExternalDataForProject from './ExternalApisController';

const Router = express.Router();

Router.post('/', getExternalDataForProject);

export default Router;