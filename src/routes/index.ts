import express from 'express';

export class MainRouter {
	router: express.Router;
	constructor() {
		this.router = express.Router();
		this.routes();
	}
	routes() {
		this.router.get('/', (req, res, next) => {
			res.send('<h1>Kia student hy aap</h1>');
		});
	}
}





export const MainRoutes = new MainRouter().router;
