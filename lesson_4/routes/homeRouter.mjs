import { Router } from 'express'

import HomeController from '../controllers/homeController.mjs'
const router = Router()

router.get('/', HomeController.renderIndexPage)

export default router
