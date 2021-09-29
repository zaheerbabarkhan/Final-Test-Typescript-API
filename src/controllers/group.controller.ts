import { Body, Post, Put } from '@tsoa/runtime';
import { GroupRepository } from '../repositories/group.repository';
import {
	IGroupAddMemberRequest,
	IGroupSaveRequest,
} from '../types/requests/group.request';
import {
	IGroupAddMemberResponse,
	IGroupSaveResponse,
} from '../types/responses/group.response';
import ErrorHandler from '../utils/error';

export class GroupController {
	/**
	 * Save New Group
	 * @description Save New Group
	 */
	@Post('/saveGroup')
	async saveGroup(Group: IGroupSaveRequest): Promise<IGroupSaveResponse> {
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
}
