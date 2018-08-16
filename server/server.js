import express from 'express';

const Server = express();

Server.listen(5000, () => {
	console.log('Server listening on port 5000')
});