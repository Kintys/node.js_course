import UserModule from '../module/user/userModule.mjs'

class UserController {
    constructor(module) {
        this.module = module
    }
    renderUserForm = async (req, res) => {
        try {
            const create = req.path
            const user = { name: '', password: '' }
            if (create === '/create') {
                user.confirmPass = ''
                res.render('user/create', { title: 'Create New Account', errors: [], user })
            } else {
                res.render('user/login', {
                    title: 'Login',
                    errors: [],
                    user
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
            const { id } = req.params
            const admin = await this.module.loadUserById(id)
            if (!admin.permission.isAdmin) res.redirect('/')

            const userList = await this.module.loadUserList()
            const userListWithoutPassword = userList.map((user) => {
                return { id: user._id, name: user.name, permission: user.permission }
            })

            res.render('admin/admin', { title: 'Admin', userList: userListWithoutPassword })
        } catch (error) {}
    }

    loginUser = async (req, res) => {
        try {
            const user = req.body
            const getUser = await this.module.loginUser(user)
            if (getUser) {
                res.json({ id: getUser._id, premId: getUser.permission })
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
