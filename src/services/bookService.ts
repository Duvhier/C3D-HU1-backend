import axios from 'axios';

const API_URL = 'http://localhost:3000'; // Cambia el puerto si tu backend usa otro

// Define la interfaz para un libro
interface Book {
    id?: number;
    title: string;
    author: string;
    publishedDate?: string;
}

// Obtener todos los libros
export const getBooks = async (): Promise<Book[]> => {
    try {
        const response = await axios.get(`${API_URL}/books`);
        return response.data;
    } catch (error) {
        console.error('Error fetching books:', error);
        throw new Error('No se pudieron obtener los libros. Intenta nuevamente más tarde.');
    }
};

// Agregar un nuevo libro
export const addBook = async (newBook: Book): Promise<Book> => {
    if (!newBook.title || !newBook.author) {
        throw new Error('El título y el autor son obligatorios.');
    }

    try {
        const response = await axios.post(`${API_URL}/books`, newBook);
        return response.data;
    } catch (error) {
        console.error('Error adding book:', error);
        throw new Error('No se pudo agregar el libro. Intenta nuevamente más tarde.');
    }
};

// Eliminar un libro
export const deleteBook = async (id: number): Promise<void> => {
    try {
        await axios.delete(`${API_URL}/books/${id}`);
    } catch (error) {
        console.error('Error deleting book:', error);
        throw new Error('No se pudo eliminar el libro. Intenta nuevamente más tarde.');
    }
};

// Actualizar un libro
export const updateBook = async (id: number, updatedBook: Book): Promise<Book> => {
    try {
        const response = await axios.put(`${API_URL}/books/${id}`, updatedBook);
        return response.data;
    } catch (error) {
        console.error('Error updating book:', error);
        throw new Error('No se pudo actualizar el libro. Intenta nuevamente más tarde.');
    }
};