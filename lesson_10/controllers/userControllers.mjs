import UserModule from '../module/user/userModule.mjs'

class UserController {
    constructor(module) {
        this.module = module
    }
    renderUserForm = async (req, res) => {
        try {
            const create = req.path
            const formUser = { name: '', password: '' }
            if (create === '/create') {
                formUser.confirmPass = ''
                res.render('user/create', {
                    title: 'Create New Account',
                    errors: [],
                    user: formUser,
                    currentUser: req.user || null
                })
            } else {
                res.render('user/login', {
                    title: 'Login',
                    errors: [],
                    user: formUser,
                    currentUser: req.user || null
                })
            }
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }

    renderAdminPage = async (req, res) => {
        try {
            const userList = await this.module.loadUserList()
            const userListWithoutPassword = userList.map((user) => {
                return { id: user._id, name: user.name, permission: user.permission }
            })

            res.render('admin/admin', { title: 'Admin', userList: userListWithoutPassword, user: req.user || null })
        } catch (error) {}
    }

    loginUser = async (req, res, next) => {
        this.passportModule.authenticate('local', (err, user, info) => {
            if (err) return next(err)
            if (!user) return res.status(400).json({ message: info.message })

            req.login(user, (err) => {
                if (err) return next(err)

                res.json({ id: user._id, premId: user.permission })
            })
        })(req, res, next)
    }

    logoutUser(req, res) {
        req.logout()
        res.json({ message: 'Logged out successfully' })
    }

    createUser = async (req, res) => {
        try {
            const newUser = req.body
            const user = await this.module.createNewUser(newUser)
            res.json({ id: user._id, premId: user.permission._id })
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }

    updatePermissions = async (req, res) => {
        try {
            const { permissionId, permissions } = req.body

            await this.module.updatePermissions(permissionId, permissions)

            res.json({ success: true })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

export default new UserController(UserModule)
