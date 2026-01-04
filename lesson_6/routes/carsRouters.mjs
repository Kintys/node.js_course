import { Router } from 'express'
import Cars from '../controllers/carsControllers.mjs'

import uploadMiddleWare from '../middleware/uploadMiddleware.mjs'
import { checkSchema } from 'express-validator'

import CarsValidator from '../module/carsValidator.mjs'
const router = Router()

router.get('/', Cars.getCarsList)

router.get('/create', Cars.getCarForm)

router.get('/update/:id', Cars.getCarForm)

router.get('/:id', Cars.getCarById)

router.post('/create', uploadMiddleWare.single('image'), checkSchema(CarsValidator.schema), Cars.createCar)

router.post('/update/:id', uploadMiddleWare.single('image'), checkSchema(CarsValidator.schema), Cars.updateCar)

router.delete('/:id', Cars.deleteCar)

export default router
