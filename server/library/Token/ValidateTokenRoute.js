import express from 'express';
import JWT from 'jsonwebtoken';

const Secret = process.env.SECRET_KEY;

const Router = express.Router();

Router.post("/", (req, res) => {
	const { token } = req.body; 
	if(token) {
		JWT.verify(token, Secret, (err, decoded) => {
			if(err) res.send({auth: false});
			else res.send({auth: true, _id: decoded.sub});
			return;
		});
	} else {
		return res.send({auth: false})
	}
});

export default Router;
