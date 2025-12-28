import { randomUUID } from 'crypto'
import DataFileManager from '../services/DataFileManager.mjs'

class CarsModules {
    constructor(dataProvider) {
        this.dataProvider = dataProvider
    }

    _validateId(id) {
        if (!id) {
            throw new Error('ID авта не вказано')
        }
        return true
    }

    loadCarsList = () => {
        try {
            const data = this.dataProvider.loadData()
            return data
        } catch (error) {
            throw new Error(error.message)
        }
    }
    loadCarById = (id) => {
        try {
            this._validateId(id)
            const data = this.dataProvider.getItemById(id)
            return data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    addNewCar(data) {
        try {
            const newCar = {
                id: randomUUID(),
                ...data
            }

            this.dataProvider.addItem(newCar)
            return newCar
        } catch (error) {
            throw new Error(error.message)
        }
    }

    updateCar(id, data) {
        try {
            this._validateId(id)

            if (!data || Object.keys(data).length === 0) {
                throw new Error(error.message)
            }

            const updatedData = { ...data }

            this.dataProvider.updateItemById(id, updatedData)
            return true
        } catch (error) {
            throw new Error(error.message)
        }
    }

    deleteCarById(id) {
        try {
            this._validateId(id)
            this.dataProvider.deleteItemById(id)
            return true
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

export default new CarsModules(DataFileManager)
