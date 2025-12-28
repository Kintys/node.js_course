import fs from 'fs'
import path from 'path'
import { __dirname } from '../settings.mjs'
import carsModules from '../module/carsModules.mjs'

const CarModule = carsModules

function deleteFileFromDir(containsDirname, filename) {
    const filePath = path.join(__dirname, containsDirname, filename)
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath)
}

function deleteFileFromUploads(req, res, next) {
    try {
        const id = req.params.id
        const car = CarModule.loadCarById(id)

        if (car && car.image) {
            const filename = path.basename(car.image)
            deleteFileFromDir('uploads', filename)
        }
        next()
    } catch (error) {
        req.deleteImageError = error
        next()
    }
}

export default deleteFileFromUploads
