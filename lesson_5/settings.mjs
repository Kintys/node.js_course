import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
export const __dirname = path.dirname(__filename)

const filePath = path.join(__dirname, '/data/cars.json')

export default {
    dataPath: filePath
}
