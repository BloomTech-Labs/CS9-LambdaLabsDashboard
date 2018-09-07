import express from 'express';
import JWT from 'jsonwebtoken';
import UserModel from '../Users/userModel';

const Secret = process.env.SECRET_KEY;

const Router = express.Router();

Router.post("/", (req, res) => {
	const { token } = req.body; 
	if(token) {
		JWT.verify(token, Secret, (err, decoded) => {
			if(err) res.send({auth: false});
			else {
				UserModel.findById(decoded.sub)
					.then(user => {
						const { name, email, _id, subscribed, subscribedDate } = user;
						res.json({ name, email, _id, subscribed, subscribedDate, auth: true });
					})
					.catch(err => res.send({auth: true, _id: decoded.sub}));
			}
		});
	} else {
		return res.send({auth: false})
	}
});

export default Router;
