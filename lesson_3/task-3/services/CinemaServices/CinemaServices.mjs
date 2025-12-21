import LoadDataServices from '../LoadDataServices.mjs'

class CinemaServices {
    constructor(dataProvider = new LoadDataServices()) {
        this.dataProvider = dataProvider
    }

    getCinemaList() {
        try {
            const data = this.dataProvider.loadData('CinemaServices/data.json')
            return data || []
        } catch (error) {
            console.error('Помилка:', error)
            return []
        }
    }
}

export default CinemaServices
