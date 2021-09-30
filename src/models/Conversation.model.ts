import { Schema, model } from 'mongoose';
import { IConversation } from '../types/documents/Conversation.document';
const ConversationSchema = new Schema({
	Group: {
		type: Schema.Types.ObjectId,
		ref: 'Group',
	},
	Messages: [
		{
			User: {
				type: Schema.Types.ObjectId,
				ref: 'User',
			},
			Message: String,
			Date: {
				type: Date,
				default: new Date(),
			},
		},
	],
});

export const ConversationModel = model<IConversation>(
	'Conversation',
	ConversationSchema
);
