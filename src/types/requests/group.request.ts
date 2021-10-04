import { IGroupMembers } from '../documents/group.document';

export interface IGroupSaveRequest {
	Name: string;
	Members: IGroupMembers[];
}
export interface IGroupAddMemberRequest {
	GroupId: string;
	UserId: string;
}
export interface IGroupDeleteRequest {
	_id: string;
}

export interface IGroupGetRequest {
	_id: string;
}


export interface IUpdateConversation {
	GroupId: string;
	ConversationId: string;
}
export interface IGroupSearchWordRequest {
	Word: string;
}

export interface IGroupSearchWordByUserRequest {
	User: string;
	Word: string;
}