import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { AdminRepository } from '../repositories/admin.repository';
import { SERVER_SECRET } from '../utils/constant';
export const authAdmin = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const token: any = req.header('token');
	if (!token) {
		res.status(401).send('UnAuthorized');
	}
	const _id: string = <any>jwt.verify(token, SERVER_SECRET);
	const admin = await new AdminRepository().getAdminById(_id);
	if (admin) {
		next();
	} else {
		res.send({
			message: 'User Not Found',
		});
	}
};
