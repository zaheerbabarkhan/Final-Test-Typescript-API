import {
	Body,
	Delete,
	Post,
	Put,
	Route,
	SuccessResponse,
	Tags,
	Security,
} from '@tsoa/runtime';
import { UserRepository } from '../repositories/user.repository';
import {
	IUserDeleteRequest,
	IUserSaveRequest,
	IUserUpdateRequest,
} from '../types/requests/user.request';
import { IUserSaveUpdateResponse } from '../types/responses/user.response';
import ErrorHandler from '../utils/error';

@Route('user')
@Tags('User')
export class UserController {
	/**
	 * Regisater User
	 * @description register User
	 */
	@Security('api_key')
	@Post('saveUser')
	async saveUser(
		@Body() User: IUserSaveRequest
	): Promise<IUserSaveUpdateResponse> {
		const newUser: IUserSaveUpdateResponse =
			await new UserRepository().saveUser(User);
		if (!newUser) {
			throw new ErrorHandler(400, 'User Not Saved');
		}
		return newUser;
	}
	/**
	 * Update Existing User
	 * @description Update Existing User
	 */
	@Put('updateUser')
	async updateUser(
		@Body() User: IUserUpdateRequest
	): Promise<IUserSaveUpdateResponse> {
		const updatedUser = await new UserRepository().updateUser(User);
		if (!updatedUser) {
			throw new ErrorHandler(400, 'User Not Updated');
		}
		return updatedUser;
	}

	@Security('api_key')
	@Delete('deleteUser')
	@SuccessResponse(200, 'User Deleted Successfully')
	async deleteUser(@Body() delRequest: IUserDeleteRequest): Promise<any> {
		return await new UserRepository().deleteUser(delRequest._id);
	}
}
