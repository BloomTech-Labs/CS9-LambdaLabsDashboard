import { fetchDashboardData } from './BatchRequests';

export default async (req, res) => {
	const { repository, boardID } = req.body;
	const api = await fetchDashboardData(repository, boardID);
	const { project, team, trello, totalCards, inProgress, completeness } = api;
	if(api) res.status(200).json({ project, team, trello, totalCards, inProgress, completeness }); 
	else res.send(false);
}