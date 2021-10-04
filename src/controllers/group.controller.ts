import {
	Body,
	Delete,
	Post,
	Put,
	Route,
	SuccessResponse,
	Tags,
} from '@tsoa/runtime';
import { Security } from 'tsoa';
import { ConversationRepository } from '../repositories/conversation.repository';
import { GroupRepository } from '../repositories/group.repository';
import { IGroup } from '../types/documents/group.document';
import {
	IGroupAddMemberRequest,
	IGroupDeleteRequest,
	IGroupGetRequest,
	IGroupSaveRequest,
	IGroupSearchWordRequest,
	IGroupSearchWordByUserRequest,
} from '../types/requests/group.request';
import {
	IGroupAddMemberResponse,
	IGroupGetResponse,
	IGroupSaveResponse,
	IGroupSearchWordResponse,
} from '../types/responses/group.response';
import ErrorHandler from '../utils/error';

@Route('group')
export class GroupController {
	/**
	 * Save New Group
	 * @description Save New Group
	 */
	@Post('/saveGroup')
	@Security('api_key')
	@Tags('Groups')
	async saveGroup(
		@Body() Group: IGroupSaveRequest
	): Promise<IGroupSaveResponse> {
		const newGroup: IGroupSaveResponse = await new GroupRepository().saveGroup(
			Group
		);
		if (!newGroup) {
			throw new ErrorHandler(400, 'Group Not Created');
		}
		return newGroup;
	}
	/**
	 * Add Member to Group
	 * @description Add member to Group
	 */
	@Put('/addMemberToGroup')
	@Security('api_key')
	@Tags('Groups')
	async addMemberToGroup(
		@Body() addMember: IGroupAddMemberRequest
	): Promise<IGroupAddMemberResponse> {
		const groupMember: IGroupAddMemberResponse =
			await new GroupRepository().updateGroup(addMember);
		if (!groupMember) {
			throw new ErrorHandler(404, 'Group Not Found');
		}
		return groupMember;
	}
	/**
	 * Get Details of  Group
	 * @description  Get Details of  Group
	 */
	@Security('api_key')
	@Post('/getGroup')
	@Tags('Groups')
	async getGroup(
		@Body() getGroup: IGroupGetRequest
	): Promise<IGroupGetResponse> {
		const group = await new GroupRepository().getGroup(getGroup._id);
		if (!group) {
			throw new ErrorHandler(404, 'Group NOT Found');
		}
		return group;
	}
	/**
	 * Delete Group
	 * @description  Delete Group
	 */
	@Security('api_key')
	@Delete('/deleteGroup')
	@Tags('Groups')
	@SuccessResponse('200', 'Group Deleted')
	async deleteGroup(
		@Body() delGroup: IGroupDeleteRequest
	): Promise<IGroupGetResponse> {
		const group = await new GroupRepository().getGroup(delGroup._id);
		if (!group) {
			throw new ErrorHandler(404, 'Group NOT Found');
		}
		return group;
	}
	/**
	 * Search Words in Group
	 * @description  Search Words in  Group
	 */
	@Security('api_key')
	@Post('/searchWord')
	@Tags('Search Word')
	async searchWord(
		@Body() word: IGroupSearchWordRequest
	): Promise<IGroupSearchWordResponse[]> {
		const conversation = await new ConversationRepository().getConversation();
		let result: IGroupSearchWordResponse[] = [];

		conversation.map((element) => {
			let groupWiseResult: IGroupSearchWordResponse = {
				GroupId: element.Group,
				Occurence: [],
			};
			if (element.Messages) {
				element.Messages.map((element) => {
					if (element.Message.includes(word.Word)) {
						groupWiseResult.Occurence.push({
							User: element.User,
							Message: element.Message,
							Time: element.Date,
						});
					}
				});
			}
			if (groupWiseResult.Occurence.length > 0) {
				result.push(groupWiseResult);
			}
		});
		return result;
	}
	@Security('api_key')
	@Post('searchWordByUser')
	@Tags('Search Word')
	async searchWordByUser(
		@Body() word: IGroupSearchWordByUserRequest
	): Promise<IGroupSearchWordResponse> {
		const conversation = await new ConversationRepository().getConversation();
		let result: any[] = [];

		conversation.map((element) => {
			let groupWiseResult: IGroupSearchWordResponse = {
				GroupId: element.Group,
				Occurence: [],
			};
			if (element.Messages) {
				element.Messages.map((element) => {
					if (element.Message.includes(word.Word)) {
						groupWiseResult.Occurence.push({
							User: element.User,
							Message: element.Message,
							Time: element.Date,
						});
					}
				});
			}
			if (groupWiseResult.Occurence.length > 0) {
				result.push(groupWiseResult);
			}
		});
		return <IGroupSearchWordResponse>(<any>result);
	}
}
