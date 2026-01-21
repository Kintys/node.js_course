import MongoReadRepository from '../mangoDBOperations/MongoReadRepository.mjs'
import MongoWriteRepository from '../mangoDBOperations/MongoWriteRepository.mjs'

class CarsServices {
    constructor(model) {
        this.readRepo = new MongoReadRepository(model)
        this.writeRepo = new MongoWriteRepository(model)
    }
    loadData = async () => {
        return await this.readRepo.findWithPopulate({}, [{ path: 'owner', select: 'name -_id' }])
    }

    getItemById = async (id) => {
        return await this.readRepo.findById(id)
    }

    addItem = async (item) => {
        return this.writeRepo.create(item)
    }
    updateItemById = async (id, data) => {
        return this.writeRepo.findOneAndUpdate({ _id: id }, data)
    }
    deleteItemById = async (id) => {
        return this.writeRepo.deleteOne({ _id: id })
    }
}

export default CarsServices
