import { IGroupMembers } from '../documents/group.document';

export interface IGroupSaveResponse {
	_id: string;
	Name: string;
	Members: IGroupMembers[];
}
export interface IGroupAddMemberResponse {
	Members: IGroupMembers[];
}
