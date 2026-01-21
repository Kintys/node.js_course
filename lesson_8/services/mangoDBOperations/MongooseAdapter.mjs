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
            console.error(`MongoDB operation ${operation} failed:`, error.message)
            throw error
        }
    }
}

export default MongooseAdapter
