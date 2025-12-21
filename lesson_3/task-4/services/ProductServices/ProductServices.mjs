import LoadDataServices from '../LoadDataServices.mjs'

class ProductServices {
    constructor(dataProvider = new LoadDataServices()) {
        this.dataProvider = dataProvider
    }

    getProductList() {
        try {
            const data = this.dataProvider.loadData('ProductServices/data.json')
            return data || []
        } catch (error) {
            console.error('Помилка :', error)
            return []
        }
    }

    getTableHeaders() {
        return ['Назва товару', 'Кількість', 'Опис']
    }
}

export default ProductServices
