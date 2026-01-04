import { matchedData, validationResult } from 'express-validator'
import CarsModules from '../module/carsModules.mjs'
class CarsControllers {
    constructor(carsModules) {
        this.carsModules = carsModules
    }
    getCarsList = (req, res) => {
        try {
            const cars = this.carsModules.loadCarsList()
            res.render('cars/carList', { title: 'Список Автівок', cars })
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }
    getCarById = (req, res) => {
        try {
            const { id } = req.params

            const car = this.carsModules.loadCarById(id)

            res.render('cars/carDetails', { title: car.title, car })
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }
    getCarForm = (req, res) => {
        try {
            const { id } = req.params

            const car = id ? this.carsModules.loadCarById(id) : {}

            res.render('cars/carForm', { car, errors: [] })
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }

    createCar = (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.render('cars/carForm', { car: req.body, errors: errors.array() })
            }
            const carData = matchedData(req)

            if (req.file) carData.image = `/images/${req.file.filename}`

            this.carsModules.addNewCar(carData)

            res.redirect('/cars')
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }

    updateCar = (req, res) => {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.render('cars/carForm', { car: req.body, errors: errors.array() })
            }

            const { id } = req.params

            const carData = matchedData(req)

            if (req.file) {
                this.carsModules.deleteFileByID(id)
                carData.image = `/images/${req.file.filename}`
            }

            this.carsModules.updateCar(id, carData)
            res.redirect('/cars')
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }

    deleteCar = (req, res) => {
        try {
            const { id } = req.params

            this.carsModules.deleteFileByID(id)

            this.carsModules.deleteCarById(id)

            res.status(204).end()
        } catch (error) {
            res.status(500).render('error', {
                error: {
                    status: 500,
                    stack: error.stack
                },
                message: error.message
            })
        }
    }
}
const initCarsModule = CarsModules

export default new CarsControllers(initCarsModule)
