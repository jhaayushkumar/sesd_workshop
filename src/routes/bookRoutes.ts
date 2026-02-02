import { Router } from 'express';
import { Routes } from '../utils/route.Interface';
import { BookController } from '../controllers/BookController';
import { validate, bookSchema } from '../middlewares/validationMiddleware';
import { authMiddleware } from '../middlewares/authMiddleware';

export class BookRoutes implements Routes {
    public path = '/books';
    public router = Router();
    public bookController = new BookController();

    constructor() {
        this.initializeRoutes();
    }

    private initializeRoutes() {
        this.router.post(`${this.path}`, authMiddleware, validate(bookSchema), this.bookController.createBook);
        this.router.get(`${this.path}`, this.bookController.getAllBooks);
        this.router.get(`${this.path}/:id`, this.bookController.getBookById);
        this.router.put(`${this.path}/:id`, authMiddleware, validate(bookSchema), this.bookController.updateBook);
        this.router.delete(`${this.path}/:id`, authMiddleware, this.bookController.deleteBook);
    }
}
