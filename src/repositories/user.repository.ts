import { AdminModel } from '../models/admin.model';
import { UserModel } from '../models/user.model';
import {
	IUserSaveRequest,
	IUserUpdateRequest,
} from '../types/requests/user.request';

export class UserRepository {
	saveUser(User: IUserSaveRequest) {
		return new UserModel(User).save();
	}
	updateUser(User: IUserUpdateRequest) {
		return UserModel.findByIdAndUpdate(User._id, User, {
			new: true,
		});
	}
	deleteUser(_id: string) {
		return UserModel.findByIdAndDelete(_id);
	}
}
