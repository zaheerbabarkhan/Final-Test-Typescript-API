import { Body, Post, Route, Security, Tags } from '@tsoa/runtime';
import { AdminRepository } from '../repositories/admin.repository';
import {
	IAdminLoginRequest,
	IAdminSaveRequest,
} from '../types/requests/admin.request';
import {
	IadminLoginResponse,
	IAdminSaveResponse,
} from '../types/responses/admin.response';
import ErrorHandler from '../utils/error';
import jwt from 'jsonwebtoken';
import { SERVER_SECRET } from '../utils/constant';
@Route('admin')
export class AdminController {
	/**
	 * Create New Admin
	 * @description Create New Admin
	 *
	 */
	@Security('api_key')
	@Post('/saveAdmin')
	@Tags('Admin')
	async saveAdmin(
		@Body() Admin: IAdminSaveRequest
	): Promise<IAdminSaveResponse> {
		const newAdmin: IAdminSaveResponse = await new AdminRepository().saveAdmin(
			Admin
		);
		if (!newAdmin) {
			throw new ErrorHandler(400, 'Admin Not Saved');
		}
		return newAdmin;
	}
	/**
	 * Admin Login
	 * @description Admin Login
	 *
	 */
	@Post('loginAdmin')
	@Tags('Admin Login')
	async adminLogin(
		@Body() loginData: IAdminLoginRequest
	): Promise<IadminLoginResponse> {
		const admin: IAdminSaveResponse[] = await new AdminRepository().getAdmin(
			loginData
		);
		if (admin.length === 0) {
			throw new ErrorHandler(400, 'Incorrect Credientials');
		}
		const token = jwt.sign({ _id: admin[0]._id }, SERVER_SECRET);
		return {
			token,
		};
	}
}
