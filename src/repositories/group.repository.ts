import { GroupController } from '../controllers/group.controller';
import { GroupModel } from '../models/group.model';
import {
	IGroupAddMemberRequest,
	IGroupSaveRequest,
	IUpdateConversation,
} from '../types/requests/group.request';

export class GroupRepository {
	saveGroup(Group: IGroupSaveRequest) {
		return new GroupModel(Group).save();
	}
	getGroup(_id: string) {
		return GroupModel.findById(_id)
			.populate('Members')
			.populate('Conversation');
	}
	updateGroup(Group: IGroupAddMemberRequest) {
		return GroupModel.findByIdAndUpdate(
			Group.GroupId,
			{
				'$push': { Members: { _id: Group.UserId } },
			},
			{
				new: true,
				upsert: true,
			}
		);
	}
	deleteGroup(_id: string) {
		return GroupModel.findByIdAndDelete(_id);
	}

	updateGroupConversation(group: IUpdateConversation) {
		return GroupModel.findByIdAndUpdate(
			group.GroupId,
			{ Conversation: group.ConversationId },
			{
				new: true,
				upsert: true,
			}
		).populate('Conversation');
	}
}
