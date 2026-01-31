import MongooseAdapter from './MongooseAdapter.mjs'

class MongoWriteRepository {
    constructor(model) {
        this.adapter = new MongooseAdapter(model)
        this.model = model
    }

    async create(data) {
        return await this.adapter.executeQuery('create', data)
    }

    async insertMany(dataArray) {
        return await this.adapter.executeQuery('insertMany', dataArray)
    }

    async updateOne(filter, update) {
        return await this.adapter.executeQuery('updateOne', filter, update)
    }

    async updateMany(filter, update) {
        return await this.adapter.executeQuery('updateMany', filter, update)
    }

    async findByIdAndUpdate(id, update, options = { new: true }) {
        return await this.adapter.executeQuery('findByIdAndUpdate', id, update, options)
    }

    async findOneAndUpdate(filter, update, options = { new: true }) {
        return await this.adapter.executeQuery('findOneAndUpdate', filter, update, options)
    }

    async findOneAndReplace(filter, replacement, options = { new: true }) {
        return await this.adapter.executeQuery('findOneAndReplace', filter, replacement, options)
    }

    async replaceOne(filter, replacement) {
        return await this.adapter.executeQuery('replaceOne', filter, replacement)
    }

    async deleteOne(filter) {
        return await this.adapter.executeQuery('deleteOne', filter)
    }

    async deleteMany(filter) {
        return await this.adapter.executeQuery('deleteMany', filter)
    }

    async findByIdAndDelete(id) {
        return await this.adapter.executeQuery('findByIdAndDelete', id)
    }

    async findByIdAndRemove(id) {
        return await this.adapter.executeQuery('findByIdAndRemove', id)
    }

    async findOneAndDelete(filter) {
        return await this.adapter.executeQuery('findOneAndDelete', filter)
    }
}

export default MongoWriteRepository
