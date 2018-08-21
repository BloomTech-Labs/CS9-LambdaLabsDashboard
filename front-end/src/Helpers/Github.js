export default class Github {
	constructor(team, api) {
		return this.parseGithubData(team, api);
	}
	getPullRequestMergeCount(api) {
		const newState = {};
	  for(let i = api.length - 1; i >= 0; i--) {
	    const { merged_at, user } = api[i];
	    if(merged_at !== null) {
	      if(user.login in newState) {
	        newState[user.login] += 1;
	      } else {
	        newState[user.login] = 1;
	      }
	    }
	  }
	  return newState;
	}
	parseGithubData(team, api) {
	  const teamCopy = team.slice();
	  const merges = this.getPullRequestMergeCount(api);
	  for(let i = teamCopy.length - 1; i >= 0; i--) {
	    const { github } = teamCopy[i];
	    if(github in merges) teamCopy[i].merges = merges[github];
	    else teamCopy[i].merges = 0;
	  }
	  return teamCopy;
	}
}