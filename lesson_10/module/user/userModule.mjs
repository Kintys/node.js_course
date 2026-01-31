import UserServices from '../../services/userServices/userServices.mjs'
import UserMGSchema from './userSchema.mjs'
import PermissionSchema from './permissionSchema.mjs'

class UserModule {
    constructor(dataProvider) {
        this.dataProvider = dataProvider
    }

    _validateId(id) {
        if (!id) {
            throw new Error('ID авта не вказано')
        }
        return true
    }

    loadUserList = async () => {
        try {
            const data = await this.dataProvider.loadData()
            return data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    loadPermissionById = async (id) => {
        try {
            const data = await this.dataProvider.getPermissionById(id)
            return data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    loadUserById = async (id) => {
        try {
            const data = await this.dataProvider.getById(id)
            return data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    loginUser = async (userValue) => {
        try {
            const { name, password } = userValue
            const foundUser = await this.dataProvider.getByName(name)
            if (foundUser.password !== password) {
                throw new Error('User not found')
            }
            return foundUser
        } catch (error) {
            throw new Error(error.message)
        }
    }
    createNewUser = async (data) => {
        try {
            const result = await this.dataProvider.addItem(data)
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    updatePermissions = async (permissionId, permissions) => {
        try {
            const result = await this.dataProvider.updatePermissions(permissionId, permissions)
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export const userServices = new UserServices({ userModule: UserMGSchema, permissionModule: PermissionSchema })

const userModule = new UserModule(userServices)

export default userModule
