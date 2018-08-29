import Axios from "axios";
const baseURL =
  process.env.NODE_ENV === "production" ? "" : "http://localhost:4000";

<<<<<<< HEAD
export const getDataForProject = repository => {
  return dispatch => {
    Axios.post(`${baseURL}/externalApis`, { repository })
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
export const getDataForProject = (repository, boardID) => {
	return dispatch => {
		Axios.post(`${baseURL}/externalApis`, { repository, boardID })
    .then(api => {
      console.log(api);
      if(api.data) {
        const { project, team, trello, totalCards, inProgress, completeness } = api.data;
        dispatch(initializeProjectData(project, team, trello, totalCards, inProgress));
        setTimeout(() => dispatch(animateDashboard(completeness)), 250);
      } else {
        dispatch(handleError(true))
      }
    })
    .catch(err => {
      console.log(err);
      dispatch(handleError(err))
    });
	}
}
>>>>>>> d78ce657cdb712073ad7d82bbc187aa46e69a9cf

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
