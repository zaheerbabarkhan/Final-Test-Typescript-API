import { Document } from 'mongoose';

export interface IAdmin extends Document {
	_id: string;
	Name: string;
	Email: string;
	Password: string;
}
