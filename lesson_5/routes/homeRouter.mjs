import { Router } from 'express'

import HomeController from '../controllers/homeControllers.mjs'
const router = Router()

router.get('/', HomeController.renderMainPage)

export default router
