import express from 'express';
import { UserController } from '../controllers/user.controller';
import { authAdmin } from '../middleware/adminAuth.middleware';

export class UserRouter {
	router: express.Router;
	constructor() {
		this.router = express.Router();
		this.configRoutes();
	}
	configRoutes() {
		this.router.post('/saveUser', authAdmin, async (req, res, next) => {
			try {
				const user = req.body;
				const newUser = await new UserController().saveUser(user);
				res.json({
					user: newUser,
				});
			} catch (error) {
				next(error);
			}
		});
		this.router.put('/updateUser', authAdmin, async (req, res, next) => {
			try {
				const user = req.body;
				const updatedUser = await new UserController().updateUser(user);
				res.json({
					user: updatedUser,
				});
			} catch (error) {
				next(error);
			}
		});
		this.router.delete('/deleteUser', authAdmin, async (req, res, next) => {
			try {
				const delUser = req.body;
				const deletedUser = await new UserController().deleteUser(delUser);
				res.status(200).json({
					message: 'User Deleted',
				});
			} catch (error) {
				next(error);
			}
		});
		this.router.post('/sendMessage', async (req, res, next) => {
			const message = req.body;
			const conversation = await new UserController().sendMessage(message);
			if (conversation) {
				res.status(200).send(conversation);
			} else {
				res.status(400).send({
					status: 'Failed',
				});
			}
		});
	}
}

export const UserAPI = new UserRouter().router;
