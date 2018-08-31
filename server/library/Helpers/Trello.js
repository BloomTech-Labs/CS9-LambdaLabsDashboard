export default class Trello {
	constructor(team, members, cards, lists, rebuild) {
		this.teamStats = team;
		this.team = members;
		this.lists = this.parseLists(lists);
		this.rebuild = rebuild;
		return this.parseCards(cards);
	}
	parseLists(lists) {
		const trello = { members: this.team };
		for(let i = lists.length - 1; i >= 0; i--) {
			const { id, name } = lists[i];
			if(name in trello === false) {
				trello[name] = { id, cards: [] };
			}
		}
		return trello;
	}
	loopLists(listID) {
		let check = false;
		for(let list in this.lists) {
			if(this.lists.hasOwnProperty(list)) {
				const { id } = this.lists[list];
				if(id === listID) {
					check = list;
					break;
				}
			}
		}
		return check;
	}
	loopTeam(idMembers) {
		const { length } = idMembers;
		let totalFound = 0;
		for(let i = this.team.length - 1; i >= 0; i--) {
			const { id, fullName } = this.team[i];
			if(idMembers.includes(id)) {
				totalFound++;
				if(this.rebuild && fullName in this.teamStats) {
					this.teamStats[fullName].trellos += 1;
				}
				if(totalFound === length) break;
			}
		}
	}
	parseCards(cards) {
		let pending = 0, inProgress = 0, complete = 0;
		for(let i = cards.length - 1; i >= 0; i--) {
			const { idList, idMembers, name } = cards[i];
			const list = this.loopLists(idList);
			if(list) {
				this.lists[list].cards.push({ name, idMembers });
				if(list === 'Done') {
					complete++;
					this.loopTeam(idMembers);
				}
				else if(list === 'In Progress' || list === 'Testing') inProgress++;
				else if(list === 'To Do') pending++;
			}
		}
		const total = complete+inProgress+pending;
		const completeness = (complete/total)*100;
		const circ = Math.PI * (2 * (200 - ((completeness*200)/100)));
		if(this.rebuild) return { updatedTeamStats: this.rebuildTeamObject(), totalCards: total, inProgress: this.getInProgress(), trello: this.lists, completeness: circ };
		return { completeness, circ };
	}
	rebuildTeamObject() {
		const res = [];
		for(let name in this.teamStats) {
			const userObj = {};
			userObj.name = name;
			userObj.github = this.teamStats[name].github;
			userObj.merges = this.teamStats[name].merges;
			userObj.trellos = this.teamStats[name].trellos;
			res.push(userObj);
		}
		return res;
	}
	getInProgress() {
		if('In Progress' in this.lists && 'Testing' in this.lists) {
			return [...this.lists['In Progress'].cards, ...this.lists['Testing'].cards]
		}
		return [];
	}
}