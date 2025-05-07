import { Request, Response } from "express";
import { AppDataSource } from "../data-sources";
import { Book } from "../entity/Book";

const bookRepo = AppDataSource.getRepository(Book);

export const getBooks = async (_: Request, res: Response) => {
    const books = await bookRepo.find();
    res.json(books);
};

export const getBookById = async (req: Request, res: Response) => {
    const book = await bookRepo.findOneBy({ id: parseInt(req.params.id) });
    if (book) res.json(book);
    else res.status(404).json({ message: "Libro no encontrado" });
};

export const createBook = async (req: Request, res: Response) => {
    const newBook = bookRepo.create(req.body);
    const result = await bookRepo.save(newBook);
    res.status(201).json(result);
};

export const updateBook = async (req: Request, res: Response) => {
    const book = await bookRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!book) return res.status(404).json({ message: "Libro no encontrado" });

    bookRepo.merge(book, req.body);
    const result = await bookRepo.save(book);
    res.json(result);
};

export const deleteBook = async (req: Request, res: Response) => {
    const result = await bookRepo.delete(req.params.id);
    res.json(result);
};
