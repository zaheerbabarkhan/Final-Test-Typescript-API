import { IGroupMessage } from '../documents/Conversation.document';

export interface IConversationSendMessageRequest {
	UserId: string;
	GroupId: string;
	Message: string;
}
