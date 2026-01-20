import { Router } from 'express'
import UserControllers from '../controllers/userControllers.mjs'

const router = Router()

router.get('/', UserControllers.renderUserForm)

router.get('/create', UserControllers.renderUserForm)

router.get('/admin/:id', UserControllers.renderAdminPage)

router.post('/', UserControllers.loginUser)

router.post('/create', UserControllers.createUser)

router.put('/admin/:id/permissions', UserControllers.updatePermissions)

export default router
