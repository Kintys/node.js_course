import { readFileSync } from 'fs'
import { fileURLToPath } from 'url'
import path from 'path'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class LoadDataServices {
    loadData(file) {
        if (!file) throw new Error('File not found')
        try {
            const filePath = path.join(__dirname, file)
            const fileContent = readFileSync(filePath, 'utf-8')
            return JSON.parse(fileContent)
        } catch (error) {
            console.error('Error: ', error)
            return error
        }
    }
}

export default LoadDataServices
