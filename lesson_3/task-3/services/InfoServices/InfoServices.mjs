import LoadDataServices from '../LoadDataServices.mjs'

class InfoServices {
    constructor(dataProvider = new LoadDataServices()) {
        this.dataProvider = dataProvider
    }

    getInfoForMe() {
        try {
            const data = this.dataProvider.loadData('InfoServices/data.json')
            return data.info || []
        } catch (error) {
            console.error('Помилка:', error)
            return []
        }
    }
}

export default InfoServices
