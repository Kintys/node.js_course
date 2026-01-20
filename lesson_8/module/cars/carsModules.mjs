import path from 'path'
import { deleteFileFromDir } from '../../helper/deleteFile.mjs'
import CarsServices from '../../services/carsServices/carsServices.mjs'
import CarModel from './carsSchema.mjs'

class CarsModules {
    constructor(dataProvider, deleteFileFromDir) {
        this.dataProvider = dataProvider
        this.deleteFileFromDir = deleteFileFromDir
    }

    _validateId(id) {
        if (!id) {
            throw new Error('ID авта не вказано')
        }
        return true
    }

    loadCarsList = async () => {
        try {
            const data = await this.dataProvider.loadData()
            return data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    loadCarById = async (id) => {
        try {
            this._validateId(id)
            const data = await this.dataProvider.getItemById(id)
            return data
        } catch (error) {
            throw new Error(error.message)
        }
    }

    addNewCar = async (data) => {
        try {
            const result = await this.dataProvider.addItem(data)
            return result
        } catch (error) {
            throw new Error(error.message)
        }
    }

    updateCar = async (id, data) => {
        try {
            this._validateId(id)

            if (!data || Object.keys(data).length === 0) {
                throw new Error('Дані для оновлення не надані')
            }

            const updatedData = { ...data }

            await this.dataProvider.updateItemById(id, updatedData)
            return true
        } catch (error) {
            throw new Error(error.message)
        }
    }

    deleteCarById = async (id) => {
        try {
            this._validateId(id)
            await this.dataProvider.deleteItemById(id)
            return true
        } catch (error) {
            throw new Error(error.message)
        }
    }

    deleteFileByID = async (id) => {
        try {
            this._validateId(id)

            const item = await this.loadCarById(id)
            if (item && item.image) {
                const filename = path.basename(item.image)
                await this.deleteFileFromDir('uploads', filename)
            }
            return true
        } catch (error) {
            throw new Error(error.message)
        }
    }
}

const carsServices = new CarsServices(CarModel)

const carsModules = new CarsModules(carsServices, deleteFileFromDir)
export default carsModules
