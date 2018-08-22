import {
  TRELLONAME,
  GITHUBHANDLER
} from "../Components/CreateProject/createProject.js";

const initialState = [];

const trelloGithubReducer = (state = initialState, action) => {
  console.log("action===>", action.type);
  switch (action.type) {
    case TRELLONAME:
      return (state = state.push(action.payload));
    case GITHUBHANDLER:
      return (state = state.push(action.payload));
    case "hilal":
      if (action.payload !== undefined || action.payload !== null) {
        return (state = [action.payload]);
      }

    default:
      return state;
  }
};

export { trelloGithubReducer };
