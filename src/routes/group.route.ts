import express from 'express';
import { GroupController } from '../controllers/group.controller';
import { authAdmin } from '../middleware/adminAuth.middleware';
export class GroupRouter {
	router: express.Router;
	constructor() {
		this.router = express.Router();
		this.configRoutes();
	}
	configRoutes() {
		this.router.post('/saveGroup', authAdmin, async (req, res, next) => {
			try {
				const group = req.body;
				const newGroup = await new GroupController().saveGroup(group);
				res.json({
					group: newGroup,
				});
			} catch (error) {
				next(error);
			}
		});
		this.router.put('/addMemberToGroup', authAdmin, async (req, res, next) => {
			try {
				const memeber = req.body;
				const updatedGroup = await new GroupController().addMemberToGroup(
					memeber
				);
				res.send(updatedGroup);
			} catch (error) {
				next(error);
			}
		});
		this.router.post('/getGroup', authAdmin, async (req, res, next) => {
			try {
				const getGroup = req.body;
				const group = await new GroupController().getGroup(getGroup);
				res.send({
					group: group,
				});
			} catch (error) {}
		});
		this.router.delete('/deleteGroup', authAdmin, async (req, res, next) => {
			const delreq = req.body;
			await new GroupController().deleteGroup(delreq);
			res.status(200).json({
				message: 'Group Deleted',
			});
		});
		this.router.post('/searchWord', authAdmin, async (req, res, next) => {
			try {
				const search = req.body;
				const result = await new GroupController().searchWord(search);
				res.send(result);
			} catch (error) {
				next(error);
			}
		});
		this.router.post('/searchWordByUser', authAdmin, async (req, res, next) => {
			try {
				const search = req.body;
				const result = await new GroupController().searchWordByUser(search);
				res.send(result);
			} catch (error) {
				next(error);
			}
		});
	}
}

export const GroupAPI = new GroupRouter().router;
