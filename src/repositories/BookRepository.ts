import Book, { IBook } from '../models/Book';

export class BookRepository {
    async create(bookData: Partial<IBook>): Promise<IBook> {
        const book = new Book(bookData);
        return await book.save();
    }

    async findById(id: string): Promise<IBook | null> {
        return await Book.findById(id);
    }

    async findAll(query: any = {}, sort: any = {}, skip: number = 0, limit: number = 10): Promise<{ books: IBook[], total: number }> {
        const books = await Book.find(query).sort(sort).skip(skip).limit(limit);
        const total = await Book.countDocuments(query);
        return { books, total };
    }

    async update(id: string, updateData: Partial<IBook>): Promise<IBook | null> {
        return await Book.findByIdAndUpdate(id, updateData, { new: true });
    }

    async delete(id: string): Promise<IBook | null> {
        return await Book.findByIdAndDelete(id);
    }
}
