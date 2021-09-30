import { ConversationModel } from '../models/Conversation.model';
import { IConversationSendMessageRequest } from '../types/requests/conversation.request';

export class ConversationRepository {
	saveMessage(message: IConversationSendMessageRequest) {
		return ConversationModel.findOneAndUpdate(
			{ Group: message.GroupId },
			{
				'$push': {
					'Messages': { Message: message.Message, User: message.UserId },
				},
			},
			{
				new: true,
				upsert: true,
			}
		);
	}
	getConversation(_id: string) {
		return ConversationModel.findOne({ Group: _id }).select('Messages');
	}
}
