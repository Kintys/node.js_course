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

    async findWithPopulate(filter = {}, populateFields = []) {
        const query = this.adapter.model.find(filter)

        if (Array.isArray(populateFields)) {
            populateFields.forEach((field) => {
                if (typeof field === 'string') {
                    query.populate(field)
                } else {
                    query.populate(field)
                }
            })
        } else if (typeof populateFields === 'string') {
            query.populate(populateFields)
        }

        return await query.exec()
    }

    async findOneWithPopulate(filter, populateFields = []) {
        const query = this.adapter.model.findOne(filter)

        if (Array.isArray(populateFields)) {
            populateFields.forEach((field) => {
                if (typeof field === 'string') {
                    query.populate(field)
                } else {
                    query.populate(field)
                }
            })
        } else if (typeof populateFields === 'string') {
            query.populate(populateFields)
        }

        return await query.exec()
    }

    async findByIdWithPopulate(id, populateFields = []) {
        const query = this.adapter.model.findById(id)

        if (Array.isArray(populateFields)) {
            populateFields.forEach((field) => {
                if (typeof field === 'string') {
                    query.populate(field)
                } else {
                    query.populate(field)
                }
            })
        } else if (typeof populateFields === 'string') {
            query.populate(populateFields)
        }

        return await query.exec()
    }
}

export default MongoReadRepository
