import { IUserGroups } from '../documents/user.document';

export interface IUserSaveRequest {
	Name: string;
	Email: string;
}
export interface IUserUpdateRequest {
	_id: string;
	Name: string;
	Email: string;
	Password: string;
	Groups: IUserGroups[];
}

export interface IUserDeleteRequest {
	_id: string;
}

export interface IUserSendMessageRequest {
	Group: string;
	Message: string;
}
