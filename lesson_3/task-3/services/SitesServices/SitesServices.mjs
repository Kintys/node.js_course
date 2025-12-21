import LoadDataServices from '../LoadDataServices.mjs'

class SitesServices {
    constructor(dataProvider = new LoadDataServices()) {
        this.dataProvider = dataProvider
    }

    getSitesList() {
        try {
            const data = this.dataProvider.loadData('SitesServices/data.json')
            return data || []
        } catch (error) {
            console.error('Помилка:', error)
            return []
        }
    }
}

export default SitesServices
