import CarsModules from '../module/cars/carsModules.mjs'
class CarsControllers {
    constructor(carsModules) {
        this.carsModules = carsModules
    }
    getCarsList = async (req, res) => {
        try {
            const cars = await this.carsModules.loadCarsList()
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
    getCarById = async (req, res) => {
        try {
            const { id } = req.params

            const car = await this.carsModules.loadCarById(id)

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
    getCarForm = async (req, res) => {
        try {
            const { id } = req.params

            const car = id ? await this.carsModules.loadCarById(id) : {}

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

    createCar = async (req, res) => {
        try {
            const carData = req.validatedCarData

            if (req.file) carData.image = `/images/${req.file.filename}`

            await this.carsModules.addNewCar(carData)

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

    updateCar = async (req, res) => {
        try {
            const { id } = req.params

            const carData = req.validatedCarData

            if (req.file) {
                this.carsModules.deleteFileByID(id)
                carData.image = `/images/${req.file.filename}`
            }

            await this.carsModules.updateCar(id, carData)
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

    deleteCar = async (req, res) => {
        try {
            const { id } = req.params

            await this.carsModules.deleteFileByID(id)

            await this.carsModules.deleteCarById(id)

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
