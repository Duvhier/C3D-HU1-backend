"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.deleteBook = exports.addBook = exports.getBooks = void 0;
const axios_1 = __importDefault(require("axios"));
const API_URL = 'http://localhost:3000'; // Cambia el puerto si tu backend usa otro
// Obtener todos los libros
const getBooks = async () => {
    try {
        const response = await axios_1.default.get(`${API_URL}/books`);
        return response.data;
    }
    catch (error) {
        console.error('Error fetching books:', error);
        throw new Error('No se pudieron obtener los libros. Intenta nuevamente más tarde.');
    }
};
exports.getBooks = getBooks;
// Agregar un nuevo libro
const addBook = async (newBook) => {
    if (!newBook.title || !newBook.author) {
        throw new Error('El título y el autor son obligatorios.');
    }
    try {
        const response = await axios_1.default.post(`${API_URL}/books`, newBook);
        return response.data;
    }
    catch (error) {
        console.error('Error adding book:', error);
        throw new Error('No se pudo agregar el libro. Intenta nuevamente más tarde.');
    }
};
exports.addBook = addBook;
// Eliminar un libro
const deleteBook = async (id) => {
    try {
        await axios_1.default.delete(`${API_URL}/books/${id}`);
    }
    catch (error) {
        console.error('Error deleting book:', error);
        throw new Error('No se pudo eliminar el libro. Intenta nuevamente más tarde.');
    }
};
exports.deleteBook = deleteBook;
// Actualizar un libro
const updateBook = async (id, updatedBook) => {
    try {
        const response = await axios_1.default.put(`${API_URL}/books/${id}`, updatedBook);
        return response.data;
    }
    catch (error) {
        console.error('Error updating book:', error);
        throw new Error('No se pudo actualizar el libro. Intenta nuevamente más tarde.');
    }
};
exports.updateBook = updateBook;
