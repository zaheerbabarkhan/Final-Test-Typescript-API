import { IUserGroups } from '../documents/user.document';

export interface IUserSaveUpdateResponse {
	_id: string;
	Name: string;
	Email: string;
	Password: string;
	Groups: IUserGroups[];
}
