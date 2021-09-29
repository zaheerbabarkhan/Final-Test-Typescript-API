import { Schema, model } from 'mongoose';
import { IUser } from '../types/documents/user.document';

const UserSchema = new Schema({
	Name: String,
	Email: String,
	Password: {
		type: String,
		default: '12345',
	},
	Groups: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Group',
		},
	],
});
export const UserModel = model<IUser>('User', UserSchema);
