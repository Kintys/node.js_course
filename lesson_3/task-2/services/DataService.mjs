import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class DataService {
    constructor() {
        this.data = this.loadData()
    }

    loadData() {
        try {
            const filePath = path.join(__dirname, 'data.json')
            const fileContent = readFileSync(filePath, 'utf-8')
            return JSON.parse(fileContent)
        } catch (error) {
            console.error('Error: ', error)
            return {
                musicText: 'Текст не знайдено',
                coffeeText: 'Текст не знайдено'
            }
        }
    }

    getMusicText() {
        return this.data.musicText
    }

    getCoffeeText() {
        return this.data.coffeeText
    }
}

export default DataService
