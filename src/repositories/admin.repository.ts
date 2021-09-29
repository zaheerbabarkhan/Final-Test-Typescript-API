import { AdminModel } from '../models/admin.model';
import {
	IAdminLoginRequest,
	IAdminSaveRequest,
} from '../types/requests/admin.request';

export class AdminRepository {
	getAdmin(Admin: IAdminLoginRequest) {
		return AdminModel.find(Admin);
	}
	saveAdmin(Admin: IAdminSaveRequest) {
		return new AdminModel(Admin).save();
	}
}
