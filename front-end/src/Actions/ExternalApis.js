import Axios from 'axios';
import GithubParser from '../Helpers/Github';
import Trello from '../Helpers/Trello';
import { arrayFilter } from '../Helpers/Arrays';

const trelloKey = 'cb548cca4f1358b69b3bee4a25ca02ec';
const trelloToken = '5b6ec3db4fe7211b52293adec51fefdd06444a2546ff8ca725dbc5c5ebefa114';
const auth = `?key=${trelloKey}&token=${trelloToken}`;
const gha = {headers: {'Authorization': "bearer 077f954a454bef9cbd2d88dbbba0a38ba1152a13"}};

export const getDataForProject = repository => {
	return dispatch => {
		Axios.all([
      Axios.get(`https://api.trello.com/1/boards/5b70b2c75105750d2795cccb/members${auth}`),
      Axios.get(`https://api.trello.com/1/boards/5b70b2c75105750d2795cccb/cards${auth}`),
      Axios.get(`https://api.trello.com/1/boards/5b70b2c75105750d2795cccb/lists${auth}`),
      Axios.get('https://api.github.com/repos/Lambda-School-Labs/CS9-LambdaLabsDashboard/pulls?state=closed&page=1', gha),
      Axios.get('https://api.github.com/repos/Lambda-School-Labs/CS9-LambdaLabsDashboard/pulls?state=closed&page=2', gha),
      Axios.get('https://api.github.com/repos/Lambda-School-Labs/CS9-LambdaLabsDashboard/pulls?state=closed&page=3', gha),
      Axios.get('https://api.github.com/repos/Lambda-School-Labs/CS9-LambdaLabsDashboard/pulls?state=closed&page=4', gha),
      Axios.get('https://api.github.com/repos/Lambda-School-Labs/CS9-LambdaLabsDashboard/pulls?state=closed&page=5', gha),
      Axios.get('https://api.github.com/repos/Lambda-School-Labs/CS9-LambdaLabsDashboard/pulls?state=closed&page=6', gha),
      Axios.get('https://api.github.com/repos/Lambda-School-Labs/CS9-LambdaLabsDashboard/pulls?state=closed&page=7', gha),
      Axios.get('https://api.github.com/repos/Lambda-School-Labs/CS9-LambdaLabsDashboard/contributors', gha),
    ])
    .then(res => dispatch(parseData(res, repository)))
    .catch(err => dispatch(handleError(err)));
	}
}

const handleError = error => {
	return { type: 'ERROR', error };
}

const getValidUsers = team => {
  return arrayFilter(team, (user, i) => {
    const { name } = user;
    const [ first, last ] = name.split(" ");
    if(name !== 'null' && first && last) {
      return user;
    }
  })
}

const parseData = (api, project) => {
  return async dispatch => {
    const [ members, cards, lists, pr1, pr2, pr3, pr4, pr5, pr6, pr7, contributors ] = api;
    const pullRequests = [...pr1.data, ...pr2.data, ...pr3.data, ...pr4.data, ...pr5.data, ...pr6.data, ...pr7.data];
    const team = await GithubParser(contributors.data, pullRequests, gha);
    const { trello, completeness, updatedTeamStats, totalCards, inProgress } = new Trello(team, members.data, cards.data, lists.data);
    dispatch(initializeProjectData(project, getValidUsers(updatedTeamStats), trello, totalCards, inProgress));
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