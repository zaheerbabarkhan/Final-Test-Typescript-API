import { GroupModel } from '../models/group.model';
import {
	IGroupAddMemberRequest,
	IGroupSaveRequest,
} from '../types/requests/group.request';

export class GroupRepository {
	saveGroup(Group: IGroupSaveRequest) {
		return new GroupModel(Group).save();
	}
	getGroup(_id: string) {
		return GroupModel.findById(_id).populate('Conversation', 'Members');
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
}
