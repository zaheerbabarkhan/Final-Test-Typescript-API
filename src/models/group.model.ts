import { Schema, model } from 'mongoose';
import { IGroup } from '../types/documents/group.document';
const GroupSchema = new Schema({
	Name: String,
	Conversation: {
		type: Schema.Types.ObjectId,
		ref: 'Conversation',
	},
	Members: [
		{
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
	],
});

export const GroupModel = model<IGroup>('Group', GroupSchema);
