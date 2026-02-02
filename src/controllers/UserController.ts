import { Request, Response, NextFunction } from 'express';
import { UserService } from '../services/UserService';

export class UserController {
    private userService: UserService;

    constructor() {
        this.userService = new UserService();
    }

    public register = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user, token } = await this.userService.register(req.body);
            res.status(201).json({ status: 'success', data: { user, token } });
        } catch (error) {
            next(error);
        }
    };

    public login = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { user, token } = await this.userService.login(req.body);
            res.status(200).json({ status: 'success', data: { user, token } });
        } catch (error) {
            next(error);
        }
    };
}
