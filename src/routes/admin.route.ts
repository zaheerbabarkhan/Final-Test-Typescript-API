import express from 'express';
import { AdminController } from '../controllers/admin.controller';
import { authAdmin } from '../middleware/adminAuth.middleware';

export class AdminRouter {
	router: express.Router;
	constructor() {
		this.router = express.Router();
		this.configRoutes();
	}
	configRoutes() {
		console.log('router ');
		this.router.post('/saveAdmin', authAdmin, async (req, res, next) => {
			try {
				const admin = req.body;
				const newAdmin = await new AdminController().saveAdmin(admin);
				res.json({
					admin: newAdmin,
				});
			} catch (error) {
				console.error(error, ' erorr');
				next(error);
			}
		});
		this.router.post('/loginAdmin', async (req, res, next) => {
			try {
				const loginData = req.body;
				const token = await new AdminController().adminLogin(loginData);
				res.send(token);
			} catch (error) {
				next(error);
			}
		});
	}
}

export const AdminAPI = new AdminRouter().router;
