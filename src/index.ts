import express, { Request, Response, NextFunction, Application } from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';
import bodyParser from 'body-parser';
import cors from 'cors';
import { MainRoutes } from './routes';
import { DBMongo } from './config/mongodb.conn';
import { Server } from 'http';

const health = require('@cloudnative/health-connect');
let healthCheck = new health.HealthChecker();
import {
	Mongo_Pass,
	MongoCluster,
	MongoDbName,
	Mongo_User_Name,
} from './utils/constant';

// import swaggerDocument from '/swagger.json'
let server: Server | null = null;
const PORT = process.env.PORT || 4000;

function initApplication(): express.Application {
	new DBMongo().connect(MongoCluster, MongoDbName, Mongo_User_Name, Mongo_Pass);
	const app = express();
	app.use(express.static('public'));
	app.use(express.json());
	app.use(morgan('tiny'));
	const swaggerOptions = {
		swaggerOptions: {
			customCss: '.swagger-ui .topbar { display: none }',
			customSiteTitle: 'New Title',
			customfavIcon: '/assets/favicon.icon',
			url: '/swagger.json',
		},
	};

	app.use(
		'/swagger',
		swaggerUi.serve,
		swaggerUi.setup(undefined, swaggerOptions)
	);
	app.use(cors());
	app.use(express.urlencoded({ extended: true }));
	app.use(MainRoutes);
	app.use((error: any, req: Request, res: Response, next: NextFunction) => {
		res.locals.message = error.message;
		const status = error.statusCode || 500;
		res.locals.status = status;
		res.locals.error = req.app.get('env') === 'development' ? error : {};
		res.status(status);
		res.json({
			error: {
				message: error.message,
			},
		});
	});

	app.use('/health', health.LivenessEndpoint(healthCheck));
	app.use('/ready', health.ReadinessEndpoint(healthCheck));
	return app;
}

function start() {
	const app = initApplication();
	server = app.listen(PORT, () => {
		console.log(`Server is running at http://localhost:${PORT}/swagger`);
	});
}

start();
