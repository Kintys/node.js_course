import { Router } from 'express'
import Cars from '../controllers/carsControllers.mjs'

import uploadMiddleWare from '../middleware/uploadMiddleware.mjs'
import deleteFileFromUploads from '../middleware/deleteMiddleware.mjs'

const router = Router()

router.get('/', Cars.getCarsList)

router.get('/create', Cars.getCarForm)

router.get('/update/:id', Cars.getCarForm)

router.get('/:id', Cars.getCarById)

router.post('/create', uploadMiddleWare.single('image'), Cars.createCar)

router.post('/update/:id', uploadMiddleWare.single('image'), Cars.updateCar)

router.delete('/:id', deleteFileFromUploads, Cars.deleteCar)

export default router
