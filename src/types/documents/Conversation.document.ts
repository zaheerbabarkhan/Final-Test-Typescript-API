import { Document } from 'mongoose';
export interface IConversation extends Document {
	Group: string;
	Messages: IGroupMessage[];
}

export interface IGroupMessage {
	User: string;
	Message: string;
}
