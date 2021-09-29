import express from 'express';
import { AdminAPI } from './admin.route';
import { GroupAPI } from './group.route';
import { UserAPI } from './user.route';

export class MainRouter {
	router: express.Router;
	constructor() {
		this.router = express.Router();
		this.routes();
	}
	routes() {
		this.router.use('/admin', AdminAPI);
		this.router.use('/user', UserAPI);
		this.router.use('/group', GroupAPI);
	}
}

export const MainRoutes = new MainRouter().router;
