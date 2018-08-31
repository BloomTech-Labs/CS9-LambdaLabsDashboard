import Axios from 'axios';
import GithubParser from '../Helpers/Github';
import Trello from '../Helpers/Trello';
import { arrayFilter } from '../Helpers/Arrays';
require('dotenv').config();
const trelloKey = process.env.TRELLO_KEY;
const trelloToken = process.env.TRELLO_TOKEN;
const auth = `?key=${trelloKey}&token=${trelloToken}`;
const gha = {headers: {'Authorization': `bearer ${process.env.GITHUB_TOKEN}`}};

export const fetchDashboardData = async (repository, boardID) => {
  try {
    const batchData = await Axios.all([
      Axios.get(`https://api.trello.com/1/boards/${boardID}/members${auth}`),
      Axios.get(`https://api.trello.com/1/boards/${boardID}/cards${auth}`),
      Axios.get(`https://api.trello.com/1/boards/${boardID}/lists${auth}`),
      Axios.get(`https://api.github.com/repos/Lambda-School-Labs/${repository}/pulls?state=closed&page=1`, gha),
      Axios.get(`https://api.github.com/repos/Lambda-School-Labs/${repository}/pulls?state=closed&page=2`, gha),
      Axios.get(`https://api.github.com/repos/Lambda-School-Labs/${repository}/pulls?state=closed&page=3`, gha),
      Axios.get(`https://api.github.com/repos/Lambda-School-Labs/${repository}/pulls?state=closed&page=4`, gha),
      Axios.get(`https://api.github.com/repos/Lambda-School-Labs/${repository}/pulls?state=closed&page=5`, gha),
      Axios.get(`https://api.github.com/repos/Lambda-School-Labs/${repository}/pulls?state=closed&page=6`, gha),
      Axios.get(`https://api.github.com/repos/Lambda-School-Labs/${repository}/pulls?state=closed&page=7`, gha),
      Axios.get(`https://api.github.com/repos/Lambda-School-Labs/${repository}/contributors`, gha),
    ]);
    if(batchData) return await parseData(batchData, repository);
    return false
  } catch(error) {
    return false;
  }
}

export const fetchClassProgress = async boardID => {
  try {
    const batchData = await Axios.all([
      Axios.get(`https://api.trello.com/1/boards/${boardID}/members${auth}`),
      Axios.get(`https://api.trello.com/1/boards/${boardID}/cards${auth}`),
      Axios.get(`https://api.trello.com/1/boards/${boardID}/lists${auth}`)
    ]);
    if(batchData) {
      if(Array.isArray(batchData)) {
        const [ members, cards, lists ] = batchData;
        return new Trello(null, members.data, cards.data, lists.data, false);
      }
      return false;
    }
    return false
  } catch(error) {
    return false;
  }
}

const handleError = error => {
  return false;
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

const parseData = async (api, project) => {
  const [ members, cards, lists, pr1, pr2, pr3, pr4, pr5, pr6, pr7, contributors ] = api;
  const pullRequests = [...pr1.data, ...pr2.data, ...pr3.data, ...pr4.data, ...pr5.data, ...pr6.data, ...pr7.data];
  const team = await GithubParser(contributors.data, pullRequests, gha);
  const { trello, completeness, updatedTeamStats, totalCards, inProgress } = new Trello(team, members.data, cards.data, lists.data, true);
  return { project, team: getValidUsers(updatedTeamStats), trello, totalCards, inProgress, completeness }; 
}
