class MongooseAdapter {
    constructor(model) {
        if (!model) {
            throw new Error('Model is required')
        }
        this.model = model
    }

    async executeQuery(operation, ...args) {
        try {
            const result = await this.model[operation](...args)
            return result
        } catch (error) {
            return error.message
        }
    }
}

export default MongooseAdapter
