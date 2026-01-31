import { Router } from 'express'
import UserControllers from '../controllers/userControllers.mjs'
import { ensureAdmin, ensureAuthenticated } from '../middleware/auth.mjs'

const router = Router()

router.get('/', UserControllers.renderUserForm)

router.get('/create', UserControllers.renderUserForm)

router.get('/admin', ensureAuthenticated, ensureAdmin, UserControllers.renderAdminPage)

router.post('/create', UserControllers.createUser)

router.put('/admin/:id/permissions', ensureAuthenticated, ensureAdmin, UserControllers.updatePermissions)

export default router
