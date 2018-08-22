import Axios from 'axios';
import Github from '../Helpers/Github';
import Trello from '../Helpers/Trello';

const trelloKey = 'cb548cca4f1358b69b3bee4a25ca02ec';
const trelloToken = '5b6ec3db4fe7211b52293adec51fefdd06444a2546ff8ca725dbc5c5ebefa114';
const auth = `?key=${trelloKey}&token=${trelloToken}`;

export const getDataForProject = repository => {
	return dispatch => {
		Axios.all([
      Axios.get(`https://api.trello.com/1/boards/5b70b2c75105750d2795cccb/members${auth}`),
      Axios.get(`https://api.trello.com/1/boards/5b70b2c75105750d2795cccb/cards${auth}`),
      Axios.get(`https://api.trello.com/1/boards/5b70b2c75105750d2795cccb/lists${auth}`),
      Axios.get('https://api.github.com/repos/Lambda-School-Labs/CS9-LambdaLabsDashboard/pulls?state=all'),
      Axios.get('https://api.github.com/repos/Lambda-School-Labs/CS9-LambdaLabsDashboard/contributors'),
    ])
    .then(res => dispatch(parseData(res, repository)))
    .catch(err => dispatch(handleError(err)));
	}
}

const handleError = error => {
	return { type: 'ERROR', error };
}

const parseData = (api, project) => {
  return dispatch => {
    const [ members, cards, lists, pullRequests, contributors ] = api;
    const team = new Github(contributors.data, pullRequests.data);
    const { trello, completeness, updatedTeamStats, totalCards, inProgress } = new Trello(team, members.data, cards.data, lists.data);
    dispatch(initializeProjectData(project, updatedTeamStats, trello, totalCards, inProgress));
    setTimeout(() => dispatch(animateDashboard(completeness)), 250)
  }
}

const initializeProjectData = (project, team, trello, totalCards, inProgress) => {
  return { 
    type: 'INITIALIZE_PROJECT_DATA',
    project, team, trello, totalCards, inProgress
  }
}

const animateDashboard = completeness => {
  return { type: 'ANIMATE_DASHBOARD', completeness };
} 