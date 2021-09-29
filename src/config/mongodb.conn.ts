import { connect, connection } from 'mongoose';

export class DBMongo {
	constructor() {}
	connect(h: string, dbName: string, u?: string, pass?: string, p?: number) {
		let connectionUri = `mongodb://${h}/${dbName}`;
		console.log(connectionUri);
		if (u != undefined && pass != undefined) {
			connectionUri = `mongodb+srv://${u}:${pass}@${h}/${dbName}`;
		}
		connect(connectionUri, (error) => {
			if (error) {
				console.log(error);
				console.log('connection to db failed');
			} else {
				console.log('connection established successfully');
			}
		});
	}
}

// export const MongoStateConnection = connection.readyState
