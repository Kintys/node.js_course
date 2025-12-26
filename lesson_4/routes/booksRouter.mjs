import { Router } from 'express'
import BookControllers from '../controllers/bookControllers.mjs'

const router = Router()

router.get('/', BookControllers.getBooksList)

router.get('/search', BookControllers.searchBooks)

router.get('/filter', BookControllers.filterBooks)

router.get('/create', BookControllers.getBooksForm)

router.get('/update/:id', BookControllers.getBooksForm)

router.get('/:id', BookControllers.getBookById)

router.post('/create', BookControllers.createBook)

router.post('/update/:id', BookControllers.updateBook)

router.delete('/:id', BookControllers.deleteBook)

export default router
