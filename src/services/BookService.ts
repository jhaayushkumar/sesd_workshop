import { BookRepository } from '../repositories/BookRepository';
import { IBook } from '../models/Book';
import { AppError } from '../utils/AppError';

export class BookService {
    private bookRepository: BookRepository;

    constructor() {
        this.bookRepository = new BookRepository();
    }

    async createBook(bookData: Partial<IBook>): Promise<IBook> {
        return await this.bookRepository.create(bookData);
    }

    async getBookById(id: string): Promise<IBook> {
        const book = await this.bookRepository.findById(id);
        if (!book) {
            throw new AppError('Book not found', 404);
        }
        return book;
    }

    async getAllBooks(queryParams: any): Promise<{ books: IBook[], total: number, page: number, limit: number }> {
        const { search, genre, minPrice, maxPrice, sort, page = 1, limit = 10 } = queryParams;

        const query: any = {};

        if (search) {
            query.$text = { $search: search };
        }

        if (genre) {
            query.genre = genre;
        }
        if (minPrice || maxPrice) {
            query.price = {};
            if (minPrice) query.price.$gte = Number(minPrice);
            if (maxPrice) query.price.$lte = Number(maxPrice);
        }

        let sortOptions: any = {};
        if (sort) {
            const parts = sort.split(':');
            sortOptions[parts[0]] = parts[1] === 'desc' ? -1 : 1;
        } else {
            sortOptions = { createdAt: -1 };
        }

        const skip = (Number(page) - 1) * Number(limit);

        const { books, total } = await this.bookRepository.findAll(query, sortOptions, skip, Number(limit));

        return { books, total, page: Number(page), limit: Number(limit) };
    }

    async updateBook(id: string, updateData: Partial<IBook>): Promise<IBook> {
        const book = await this.bookRepository.update(id, updateData);
        if (!book) {
            throw new AppError('Book not found', 404);
        }
        return book;
    }

    async deleteBook(id: string): Promise<void> {
        const book = await this.bookRepository.delete(id);
        if (!book) {
            throw new AppError('Book not found', 404);
        }
    }
}
