import {
	Body,
	Delete,
	Post,
	Put,
	Route,
	SuccessResponse,
	Tags,
	Security,
} from '@tsoa/runtime';
import { ConversationModel } from '../models/Conversation.model';
import { ConversationRepository } from '../repositories/conversation.repository';
import { GroupRepository } from '../repositories/group.repository';
import { UserRepository } from '../repositories/user.repository';
import { IConversationSendMessageRequest } from '../types/requests/conversation.request';
import {
	IUserDeleteRequest,
	IUserSaveRequest,
	IUserUpdateRequest,
} from '../types/requests/user.request';
import { IConversationSendMessageResponse } from '../types/responses/conversation.response';
import { IGroupConversationResponse } from '../types/responses/group.response';
import { IUserSaveUpdateResponse } from '../types/responses/user.response';
import ErrorHandler from '../utils/error';
import { GroupController } from './group.controller';

@Route('user')
@Tags('User')
export class UserController {
	/**
	 * Regisater User
	 * @description register User
	 */
	@Security('api_key')
	@Post('saveUser')
	async saveUser(
		@Body() User: IUserSaveRequest
	): Promise<IUserSaveUpdateResponse> {
		const newUser: IUserSaveUpdateResponse =
			await new UserRepository().saveUser(User);
		if (!newUser) {
			throw new ErrorHandler(400, 'User Not Saved');
		}
		return newUser;
	}
	/**
	 * Update Existing User
	 * @description Update Existing User
	 */
	@Put('updateUser')
	async updateUser(
		@Body() User: IUserUpdateRequest
	): Promise<IUserSaveUpdateResponse> {
		const updatedUser = await new UserRepository().updateUser(User);
		if (!updatedUser) {
			throw new ErrorHandler(400, 'User Not Updated');
		}
		return updatedUser;
	}
	/**
	 * Delete Existing User
	 * @description Delete Existing User
	 */
	@Security('api_key')
	@Delete('deleteUser')
	@SuccessResponse(200, 'User Deleted Successfully')
	async deleteUser(@Body() delRequest: IUserDeleteRequest): Promise<any> {
		return await new UserRepository().deleteUser(delRequest._id);
	}

	/**
	 * Sending Message to a group
	 * @description Sending Message to a group
	 */
	@Post('/sendMessage')
	@Tags('Conversation')
	async sendMessage(
		@Body() message: IConversationSendMessageRequest
	): Promise<IGroupConversationResponse> {
		const messages: IConversationSendMessageResponse = <any>(
			await new ConversationRepository().saveMessage(message)
		);
		if (!messages) {
			throw new ErrorHandler(400, 'Bad Request');
		}
		const updatedGroup: IGroupConversationResponse =
			await new GroupRepository().updateGroupConversation({
				GroupId: messages.Group,
				ConversationId: messages._id,
			});
		if (!messages && !updatedGroup) {
			throw new ErrorHandler(400, 'Bad Request');
		}
		console.log(messages);
		return updatedGroup;
	}
}
