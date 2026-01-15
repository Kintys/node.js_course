import MongooseAdapter from './MongooseAdapter.mjs'

class MongoReadRepository {
    constructor(model) {
        this.adapter = new MongooseAdapter(model)
    }

    async find(filter = {}) {
        return await this.adapter.executeQuery('find', filter)
    }

    async findById(id) {
        return await this.adapter.executeQuery('findById', id)
    }

    async findOne(filter) {
        return await this.adapter.executeQuery('findOne', filter)
    }

    async getAll() {
        return await this.find({})
    }

    async getAllWithParams(params) {
        return await this.find(params)
    }

    async getById(id) {
        return await this.findById(id)
    }
}

export default MongoReadRepository
