import { IGroupMembers } from '../documents/group.document';

export interface IGroupSaveResponse {
	_id: string;
	Name: string;
	Members: IGroupMembers[];
}
export interface IGroupAddMemberResponse {
	Members: IGroupMembers[];
}
export interface IGroupGetResponse {}
export interface IGroupConversationResponse {
	_id: string;
	Name: string;
	Members: IGroupMembers[];
	Conversation: string;
}

export interface IGroupSearchWordResponse {
	User: string;
	Message: string;
	Time: Date;
}