import { Router } from 'express'

import upload from '../middleware/uploadFileManager.mjs'
import ProductController from '../controllers/productControllers.mjs'
const router = Router()

router.get('/', ProductController.createProductForm)
router.get('/list', ProductController.renderProductList)

router.post('/', upload.single('img'), ProductController.addNewProduct)

export default router
