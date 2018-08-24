import BatchRequests from './BatchRequests';

export default async (req, res) => {
	const { repository } = req.body;
	const api = await BatchRequests(repository);
	const { project, team, trello, totalCards, inProgress, completeness } = api;
	if(api) res.status(200).json({ project, team, trello, totalCards, inProgress, completeness }); 
	else res.send(false);
}