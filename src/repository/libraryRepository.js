import axios from '../custom-axios/axios';

const LibraryService = {
    fetchCategories: () => {
        return axios.get('/categories');
    },
    fetchAuthors: () => {
        return axios.get('/authors');
    },
    fetchBooks: () => {
        return axios.get('/books');
    },
    deleteBook: (id) => {
        return axios.delete(`/books/delete/${id}`);
    },
    addBook: (name, category, author, availableCopies) => {
        return axios.post("/books/add", {
            "name" : name,
            "category" : category,
            "author" : author,
            "availableCopies" : availableCopies
        })
    },
    editBook: (id, name, category, author, availableCopies) => {
        return axios.put(`/books/edit/${id}`,{
            "name" : name,
            "category" : category,
            "author" : author,
            "availableCopies" : availableCopies
        });
    },
    getBook: (id) => {
        return axios.get(`/books/${id}`);
    },
    takeBook: (id) => {
        return axios.post(`/books/${id}/take`)
    }
}

export default LibraryService;