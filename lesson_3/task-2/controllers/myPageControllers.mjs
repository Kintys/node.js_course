import DataService from '../services/DataService.mjs'

class MyPageControllers {
    constructor(dataService) {
        this.dataService = dataService
    }

    renderMainPage = (req, res) => {
        try {
            res.render('index', {
                title: 'Мій сайт',
                welcomeText: 'Вітаю на на сайті',
                task: 'Задача 2. Розробити серверну частину додатку, який за відповідними маршрутами (“/”, “/coffee”, “/music”) повертає створені HTML документи.'
            })
        } catch (error) {
            res.status(500).render('error', { error })
        }
    }

    renderMusicPage = (req, res) => {
        try {
            const musicText = this.dataService.getMusicText()
            res.render('my_page/music', {
                title: 'Мій сайт',
                text: musicText
            })
        } catch (error) {
            res.status(500).render('error', { error })
        }
    }

    renderCoffeePage = (req, res) => {
        try {
            const coffeeText = this.dataService.getCoffeeText()
            res.render('my_page/coffee', {
                title: 'Мій сайт',
                text: coffeeText
            })
        } catch (error) {
            res.status(500).render('error', { error })
        }
    }
}

const dataService = new DataService()

export default new MyPageControllers(dataService)
