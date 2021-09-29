import {
	Body,
	Delete,
	Post,
	Put,
	Route,
	SuccessResponse,
	Tags,
} from '@tsoa/runtime';
import { GroupRepository } from '../repositories/group.repository';
import { IGroup } from '../types/documents/group.document';
import {
	IGroupAddMemberRequest,
	IGroupDeleteRequest,
	IGroupGetRequest,
	IGroupSaveRequest,
} from '../types/requests/group.request';
import {
	IGroupAddMemberResponse,
	IGroupGetResponse,
	IGroupSaveResponse,
} from '../types/responses/group.response';
import ErrorHandler from '../utils/error';

@Route('group')
@Tags('Groups')
export class GroupController {
	/**
	 * Save New Group
	 * @description Save New Group
	 */
	@Post('/saveGroup')
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
	@Post('/getGroup')
	async getGroup(
		@Body() getGroup: IGroupGetRequest
	): Promise<IGroupGetResponse> {
		const group = await new GroupRepository().getGroup(getGroup._id);
		if (!group) {
			throw new ErrorHandler(404, 'Group NOT Found');
		}
		return group;
	}
	@Delete('/deleteGroup')
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
}
