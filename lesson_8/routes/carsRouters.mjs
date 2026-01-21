import { Router } from 'express'
import Cars from '../controllers/carsControllers.mjs'

import uploadMiddleWare from '../middleware/uploadMiddleware.mjs'
import { carValidationMiddleware } from '../middleware/carsValidationMiddleware.mjs'
import carsZODSchema from '../validator/carsValidateSchema.mjs'

const router = Router()

router.get('/create', Cars.getCarForm)

router.get('/update/:id', Cars.getCarForm)

router.get('/:permId?', Cars.getCarsList)

router.get('/car/:id', Cars.getCarById)

router.post('/create', uploadMiddleWare.single('image'), carValidationMiddleware(carsZODSchema), Cars.createCar)

router.post('/update/:id', uploadMiddleWare.single('image'), carValidationMiddleware(carsZODSchema), Cars.updateCar)

router.delete('/:id', Cars.deleteCar)

export default router
