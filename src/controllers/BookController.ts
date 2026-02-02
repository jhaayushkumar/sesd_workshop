import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services/BookService';

export class BookController {
    private bookService: BookService;

    constructor() {
        this.bookService = new BookService();
    }

    public createBook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = await this.bookService.createBook(req.body);
            res.status(201).json({ status: 'success', data: book });
        } catch (error) {
            next(error);
        }
    };

    public getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const result = await this.bookService.getAllBooks(req.query);
            res.status(200).json({ status: 'success', ...result });
        } catch (error) {
            next(error);
        }
    };

    public getBookById = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = await this.bookService.getBookById(req.params.id as string);
            res.status(200).json({ status: 'success', data: book });
        } catch (error) {
            next(error);
        }
    };

    public updateBook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            const book = await this.bookService.updateBook(req.params.id as string, req.body);
            res.status(200).json({ status: 'success', data: book });
        } catch (error) {
            next(error);
        }
    };

    public deleteBook = async (req: Request, res: Response, next: NextFunction) => {
        try {
            await this.bookService.deleteBook(req.params.id as string);
            res.status(204).json({ status: 'success', data: null });
        } catch (error) {
            next(error);
        }
    };
}
