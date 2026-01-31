import { Router } from 'express'
import Cars from '../controllers/carsControllers.mjs'

import uploadMiddleWare from '../middleware/uploadMiddleware.mjs'
import { carValidationMiddleware } from '../middleware/carsValidationMiddleware.mjs'
import carsZODSchema from '../validator/carsValidateSchema.mjs'
import { ensureAuthenticated } from '../middleware/auth.mjs'

const router = Router()
router.get('/', ensureAuthenticated, Cars.getCarsList)

router.get('/create', ensureAuthenticated, Cars.getCarForm)

router.get('/update/:id', ensureAuthenticated, Cars.getCarForm)

router.get('/car/:id', ensureAuthenticated, Cars.getCarById)

router.post(
    '/create',
    ensureAuthenticated,
    uploadMiddleWare.single('image'),
    carValidationMiddleware(carsZODSchema),
    Cars.createCar
)

router.post(
    '/update/:id',
    ensureAuthenticated,
    uploadMiddleWare.single('image'),
    carValidationMiddleware(carsZODSchema),
    Cars.updateCar
)

router.delete('/:id', ensureAuthenticated, Cars.deleteCar)

export default router
