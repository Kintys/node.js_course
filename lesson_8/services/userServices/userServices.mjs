import MongoReadRepository from '../mangoDBOperations/MongoReadRepository.mjs'
import MongoWriteRepository from '../mangoDBOperations/MongoWriteRepository.mjs'

class UserServices {
    constructor({ userModule, permissionModule }) {
        this.readRepo = new MongoReadRepository(userModule)
        this.writeRepo = new MongoWriteRepository(userModule)
        this.permissionWriteRepo = new MongoWriteRepository(permissionModule)
        this.permissionReadRepo = new MongoReadRepository(permissionModule)
    }

    loadData = async () => {
        return await this.readRepo.findWithPopulate({}, 'permission')
    }

    getById = async (id) => {
        return await this.readRepo.findByIdWithPopulate({ _id: id }, ['permission'])
    }

    getPermissionById = async (id) => {
        console.log(id)
        return await this.permissionReadRepo.findById({ _id: id })
    }

    getByName = async (name) => {
        return await this.readRepo.findOne({ name: name })
    }
    addItem = async (item) => {
        return await this.writeRepo.create(item)
    }

    updateItemById = async (id, data) => {
        return this.writeRepo.findOneAndUpdate({ _id: id }, data)
    }

    updatePermissions = async (permissionId, permissions) => {
        return await this.permissionWriteRepo.findOneAndUpdate({ _id: permissionId }, permissions)
    }
}

export default UserServices
