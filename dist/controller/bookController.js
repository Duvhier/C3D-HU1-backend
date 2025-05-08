"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteBook = exports.updateBook = exports.createBook = exports.getBookById = exports.getBooks = void 0;
const data_sources_1 = require("../data-sources");
const Book_1 = require("../entity/Book");
const bookRepo = data_sources_1.AppDataSource.getRepository(Book_1.Book);
const getBooks = async (_, res) => {
    const books = await bookRepo.find();
    res.json(books);
};
exports.getBooks = getBooks;
const getBookById = async (req, res) => {
    const book = await bookRepo.findOneBy({ id: parseInt(req.params.id) });
    if (book)
        res.json(book);
    else
        res.status(404).json({ message: "Libro no encontrado" });
};
exports.getBookById = getBookById;
const createBook = async (req, res) => {
    const newBook = bookRepo.create(req.body);
    const result = await bookRepo.save(newBook);
    res.status(201).json(result);
};
exports.createBook = createBook;
const updateBook = async (req, res) => {
    const book = await bookRepo.findOneBy({ id: parseInt(req.params.id) });
    if (!book)
        return res.status(404).json({ message: "Libro no encontrado" });
    bookRepo.merge(book, req.body);
    const result = await bookRepo.save(book);
    res.json(result);
};
exports.updateBook = updateBook;
const deleteBook = async (req, res) => {
    const result = await bookRepo.delete(req.params.id);
    res.json(result);
};
exports.deleteBook = deleteBook;
