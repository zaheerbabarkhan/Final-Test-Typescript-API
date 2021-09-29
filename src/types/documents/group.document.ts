import { Document } from 'mongoose';
export interface IGroup extends Document {
	_id: string;
	Name: string;
	Members: IGroupMembers[];
	Conversation: string;
}

export interface IGroupMembers {
	_id: string;
}
