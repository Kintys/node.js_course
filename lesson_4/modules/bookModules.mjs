import DataFileManager from '../services/DataFileManager.mjs'
import { randomUUID } from 'crypto'
import settings from '../settings.mjs'

class BookModules {
    constructor(dataProvider = new DataFileManager(settings.dataPath)) {
        this.dataProvider = dataProvider
    }

    _validateId(id) {
        if (!id) {
            throw new Error('ID книги не вказано')
        }
        return true
    }

    loadBooksList() {
        try {
            const data = this.dataProvider.loadData()
            return data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    loadBookById(id) {
        try {
            this._validateId(id)
            return this.dataProvider.getItemById(id)
        } catch (error) {
            throw new Error(error.message)
        }
    }

    addNewBook(data) {
        try {
            const newBook = {
                id: randomUUID(),
                ...data
            }

            this.dataProvider.addItem(newBook)
            return newBook
        } catch (error) {
            throw new Error(error.message)
        }
    }

    deleteBookById(id) {
        try {
            this._validateId(id)
            this.dataProvider.deleteItemById(id)
            return true
        } catch (error) {
            throw new Error(error.message)
        }
    }

    updateBook(id, data) {
        try {
            this._validateId(id)

            if (!data || Object.keys(data).length === 0) {
                throw new Error(error.message)
            }

            const updatedData = { ...data }

            this.dataProvider.updateItemById(id, updatedData)
            return true
        } catch (error) {
            throw new Error(error.message)
        }
    }

    searchBooks(searchValue) {
        try {
            const books = this.dataProvider.loadData()

            const filterBooks = books.filter((book) => book.author.toLowerCase().includes(searchValue.toLowerCase()))

            return filterBooks
        } catch (error) {
            throw new Error(error.message)
        }
    }

    filterBooks(filterValue) {
        try {
            const books = this.dataProvider.loadData()
            const publication = Number(filterValue)
            const filteredBooks = books.filter(
                (book) => parseInt(book.publication) >= publication && parseInt(book.publication) <= publication + 9
            )
            return filteredBooks
        } catch (error) {
            throw new Error(error.message)
        }
    }
}
const fileManager = new DataFileManager(settings.dataPath)

export default new BookModules(fileManager)
