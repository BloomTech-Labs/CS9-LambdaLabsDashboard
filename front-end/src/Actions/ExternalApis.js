<<<<<<< HEAD
import Axios from "axios";

export const getDataForProject = repository => {
  return dispatch => {
    Axios.post("/externalApis", { repository })
      .then(api => {
        if (api.data) {
          const {
            project,
            team,
            trello,
            totalCards,
            inProgress,
            completeness
          } = api.data;
          dispatch(
            initializeProjectData(project, team, trello, totalCards, inProgress)
          );
          setTimeout(() => dispatch(animateDashboard(completeness)), 250);
        } else {
          dispatch(handleError(true));
        }
      })
      .catch(err => dispatch(handleError(err)));
  };
};
=======
import Axios from 'axios';
const baseURL = process.env.NODE_ENV === 'production' ? '' : 'http://localhost:4000';

export const getDataForProject = repository => {
	return dispatch => {
		Axios.post(`${baseURL}/externalApis`, { repository })
    .then(api => {
      if(api.data) {
        const { project, team, trello, totalCards, inProgress, completeness } = api.data;
        dispatch(initializeProjectData(project, team, trello, totalCards, inProgress));
        setTimeout(() => dispatch(animateDashboard(completeness)), 250);
      } else {
        dispatch(handleError(true))
      }
    })
    .catch(err => dispatch(handleError(err)));
	}
}
>>>>>>> bf5b460eecad7fb0a9442164fb900fa3b6cd4c1a

const handleError = error => {
  return { type: "ERROR", error };
};

const initializeProjectData = (
  project,
  team,
  trello,
  totalCards,
  inProgress
) => {
  return {
    type: "INITIALIZE_PROJECT_DATA",
    project,
    team,
    trello,
    totalCards,
    inProgress
  };
};

const animateDashboard = completeness => {
  return { type: "ANIMATE_DASHBOARD", completeness };
};
