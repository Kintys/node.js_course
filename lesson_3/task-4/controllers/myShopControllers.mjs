import ProductServices from '../services/ProductServices/ProductServices.mjs'
import StaticDataService from '../services/StaticDataService.mjs'

class MyShopControllers {
    constructor(productService, staticDataService) {
        this.productService = productService
        this.staticDataService = staticDataService
    }
    renderMainPage = (req, res) => {
        try {
            res.render('index', {
                title: 'Головна',
                welcomeText: this.staticDataService.getWelcomeText(),
                links: this.staticDataService.getNavigationLinks()
            })
        } catch (error) {
            res.status(500).render('error', { error })
        }
    }

    renderAddProductPage = (req, res) => {
        try {
            res.render('products/product_add', {
                title: 'Додати продукт'
            })
        } catch (error) {
            res.status(500).render('error', { error })
        }
    }
    renderProductPage = (req, res) => {
        try {
            res.render('products/product_view', {
                title: 'Список продуктів',
                headline: this.productService.getTableHeaders(),
                productList: this.productService.getProductList()
            })
        } catch (error) {
            res.status(500).render('error', { error })
        }
    }
}

const productService = new ProductServices()
const staticDataService = new StaticDataService()

export default new MyShopControllers(productService, staticDataService)
