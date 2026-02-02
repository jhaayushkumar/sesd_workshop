import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserRepository } from '../repositories/UserRepository';
import { IUser } from '../models/User';
import { AppError } from '../utils/AppError';

export class UserService {
    private userRepository: UserRepository;

    constructor() {
        this.userRepository = new UserRepository();
    }

    async register(userData: Partial<IUser>): Promise<{ user: IUser; token: string }> {
        const existingUser = await this.userRepository.findByEmail(userData.email!);
        if (existingUser) {
            throw new AppError('Email already exists', 400);
        }

        const hashedPassword = await bcrypt.hash(userData.password!, 10);
        const user = await this.userRepository.create({ ...userData, password: hashedPassword });

        const token = this.generateToken(user._id as unknown as string);
        return { user, token };
    }

    async login(userData: Partial<IUser>): Promise<{ user: IUser; token: string }> {
        const user = await this.userRepository.findByEmail(userData.email!);
        if (!user || !user.password) {
            throw new AppError('Invalid email or password', 401);
        }

        const isMatch = await bcrypt.compare(userData.password!, user.password);
        if (!isMatch) {
            throw new AppError('Invalid email or password', 401);
        }

        const token = this.generateToken(user._id as unknown as string);
        return { user, token };
    }

    private generateToken(userId: string): string {
        return jwt.sign({ id: userId }, process.env.JWT_SECRET || 'secret', { expiresIn: '1d' });
    }
}
