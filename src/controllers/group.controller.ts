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
		@Body() group: IGroupSearchWordRequest
	): Promise<IGroupSearchWordResponse[]> {
		const conversation = await new ConversationRepository().getConversation(
			group.GroupId
		);
		const result: IGroupSearchWordResponse[] = [];
		conversation?.Messages.map((element) => {
			if (element.Message.includes(group.Word)) {
				result.push({
					User: element.User,
					Message: element.Message,
					Time: element.Date,
				});
			}
		});
		return result;
	}
}
