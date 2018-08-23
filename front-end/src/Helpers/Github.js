import Axios from 'axios';

const getTeamNames = (team, auth) => {
	const requests = [];
	const logins = {};
	for(let i = team.length - 1; i >= 0; i--) {
		const { login } = team[i];
		if(login in logins === false) {
			logins[login] = {};
			logins[login].github = login;
			logins[login].merges = 0;
			logins[login].trellos = 0;
		}
		requests.push(Axios.get(`https://api.github.com/users/${login}`, auth));
	}
	return { logins, requests };
}

const getPullRequestMergeCount = (team, api) => {
  for(let i = api.length - 1; i >= 0; i--) {
    const { merged_at, user } = api[i];
    if(merged_at !== null) {
      if(user.login in team) team[user.login].merges += 1;
    }
  }
  return team;
}

const rebuildTeamObject = async (team, requests) => {
	const users = await Axios.all(requests);
	const finalTeamObject = {};
	if(users) {
		let i = 0;
		for(let username in team) {
			const user = users[i].data.name;
			finalTeamObject[user] = team[username];
			i++;
		}
	}
	return finalTeamObject;
}

export default async (team, api, auth) => {
	const { logins, requests } = getTeamNames(team, auth);
	const mergeCountsPerUser = getPullRequestMergeCount(logins, api);
	return await rebuildTeamObject(mergeCountsPerUser, requests);
}