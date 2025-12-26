import bookModules from '../modules/bookModules.mjs'

class BookController {
    constructor(bookModules) {
        this.bookModules = bookModules
    }
    getBooksList = (req, res) => {
        try {
            const books = this.bookModules.loadBooksList()

            res.render('books/booksList', { books })
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }

    getBookById = (req, res) => {
        try {
            const { id } = req.params

            const book = this.bookModules.loadBookById(id)

            res.render('books/booksDetails', { title: book.name, book })
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }

    getBooksForm = (req, res) => {
        try {
            const { id } = req.params

            const book = id ? this.bookModules.loadBookById(id) : {}

            res.render('books/booksForm', { book })
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }

    createBook = (req, res) => {
        try {
            const bookData = req.body

            this.bookModules.addNewBook(bookData)

            res.redirect('/books')
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }

    updateBook = (req, res) => {
        try {
            const { id } = req.params

            const bookData = req.body

            this.bookModules.updateBook(id, bookData)

            res.redirect('/books')
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }

    deleteBook = (req, res) => {
        try {
            const { id } = req.params

            this.bookModules.deleteBookById(id)

            res.status(204).end()
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }

    searchBooks = (req, res) => {
        try {
            const { author } = req.query
            const books = this.bookModules.searchBooks(author)
            res.render('books/booksList', { books })
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }

    filterBooks = (req, res) => {
        try {
            const { publication } = req.query
            const books = this.bookModules.filterBooks(publication)
            res.render('books/booksList', { books })
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }
}

export default new BookController(bookModules)
