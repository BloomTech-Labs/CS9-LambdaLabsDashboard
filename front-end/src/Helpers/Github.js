import Axios from 'axios';

export default class Github {
	constructor(team, api) {
		console.log(team, api);
		this.api = api;
		this.users = null;
		this.requests = null;
		return this.getTeamNames(team);
	}
	getTeamNames(team) {
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
			requests.push(Axios.get(`https://api.github.com/users/${login}`));
		}
		this.requests = requests;
		this.getPullRequestMergeCount(logins);
	}
	getPullRequestMergeCount(team) {
	  for(let i = this.api.length - 1; i >= 0; i--) {
	    const { merged_at, user } = this.api[i];
	    if(merged_at !== null) {
	      if(user.login in team) team[user.login].merges += 1;
	    }
	  }
	  this.rebuildTeamObject(team);
	}
	async rebuildTeamObject(team) {
		this.users = await Axios.all(this.requests);
		const finalTeamObject = {};
		if(this.users) {
			let i = 0;
			for(let username in team) {
				const user = this.users[i].data.name;
				finalTeamObject[user] = team[username];
				i++;
			}
		}
		return finalTeamObject;
	}
}