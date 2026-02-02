import { Router } from 'express';
import { Routes } from '../utils/route.Interface';
import { UserController } from '../controllers/UserController';
import { validate, userRegisterSchema, userLoginSchema } from '../middlewares/validationMiddleware';

export class UserRoutes implements Routes {
    public path = '/users';
    public router = Router();
    public userController = new UserController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}/register`, validate(userRegisterSchema), this.userController.register);
        this.router.post(`${this.path}/login`, validate(userLoginSchema), this.userController.login);
    }
}
