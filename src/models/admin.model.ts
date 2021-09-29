import { Schema, model } from 'mongoose';
import { IAdmin } from '../types/documents/admin.document';

const AdminSchema = new Schema({
	Name: {
		type: String,
	},
	Email: {
		type: String,
	},
	Password: {
		type: String,
	},
});

export const AdminModel = model<IAdmin>('Admin', AdminSchema);
