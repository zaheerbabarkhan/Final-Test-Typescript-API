import { Document, model, Schema } from 'mongoose';
export interface IUser extends Document {
	_id: string;
	Name: string;
	Email: string;
	Password: string;
	Groups: IUserGroups[];
}

export interface IUserGroups {
	_id: string;
}
