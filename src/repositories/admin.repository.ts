import { AdminModel } from '../models/admin.model';
import {
	IAdminLoginRequest,
	IAdminSaveRequest,
} from '../types/requests/admin.request';

export class AdminRepository {
	getAdmin(Admin: IAdminLoginRequest) {
		return AdminModel.find(Admin);
	}
	getAdminById(_id: string) {
		return AdminModel.findById(_id);
	}
	saveAdmin(Admin: IAdminSaveRequest) {
		return new AdminModel(Admin).save();
	}
}
