import InfoServices from '../services/InfoServices/InfoServices.mjs'
import CinemaServices from '../services/CinemaServices/CinemaServices.mjs'
import SitesServices from '../services/SitesServices/SitesServices.mjs'

const staticData = {
    siteRoutes: [
        { route: '/', title: 'Вітання користувача' },
        { route: '/goals', title: '(/goals) Ваші цілі' },
        { route: '/about', title: '(/about) Містить тему та умову задачі' },
        { route: '/news', title: '(/new) містить перелік важливі новини ' },
        {
            route: '/info',
            title: '(/info) у залежності від значення параметра повертає сторінку з: sites - адресами улюблених сайтів, films - адреси улюблених онлайн кінотеатрів, me - або інформацію про себе'
        }
    ],
    goalsMsg:
        'Моя головна мета — створити для вас комфортний, зручний та функціональний сайт, який стане надійним помічником у вирішенні ваших завдань. Я прагну, щоб кожен відвідувач легко знаходив потрібну інформацію та з задоволенням користувався всіма можливостями сайту. Створюючи цей проект, я дбаю про простоту, естетику та ефективність, щоб ваш досвід був приємним та безперешкодним. Ваш комфорт та задоволення від використання — мої основні пріоритети!.',
    infoLinks: [
        { url: '/info/sites', name: 'Список улюблених сайтів' },
        { url: '/info/films', name: 'Список онлайн кінотеатрів' },
        { url: '/info/me', name: 'Інформація про мене' }
    ]
}

class MyAppControllers {
    constructor(infoService, cinemaService, sitesService) {
        this.infoService = infoService
        this.cinemaService = cinemaService
        this.sitesService = sitesService
    }
    renderGreetingPage = (req, res) => {
        try {
            res.render('index', {
                title: 'Вітаю на сайті',
                message:
                    'Вітаємо на нашому сайті! Ми раді, що ви завітали до нас. Насолоджуйтесь переглядом та знаходьте корисну інформацію.',
                list: staticData.siteRoutes
            })
        } catch (error) {
            res.status(500).render('error', { error })
        }
    }

    renderGoalsPage = (req, res) => {
        try {
            res.render('goals', {
                title: 'Мої цілі',
                message: staticData.goalsMsg
            })
        } catch (error) {
            res.status(500).render('error', { error })
        }
    }

    renderInfoWithoutParams = (req, res) => {
        try {
            res.render('info', {
                title: 'Інформація!',
                list: staticData.infoLinks
            })
        } catch (error) {
            res.status(500).render('error', { error })
        }
    }

    renderPageWithParams = (req, res) => {
        try {
            const params = req.params['someParams']

            const handlers = {
                sites: () => ({
                    title: 'Список улюблених сайтів',
                    list: this.sitesService.getSitesList()
                }),
                films: () => ({
                    title: 'Список улюблених онлайн кінотеатрів!',
                    list: this.cinemaService.getCinemaList()
                }),
                me: () => ({
                    title: 'Інформація про мене!',
                    list: this.infoService.getInfoForMe()
                })
            }

            const handler = handlers[params]

            if (!handler) {
                return res.status(404).render('error', {
                    error: { message: 'Сторінка не знайдена' }
                })
            }

            const data = handler()
            console.log(params)
            res.render('info', data)
        } catch (error) {
            res.status(500).render('error', { error })
        }
    }
}

const infoService = new InfoServices()
const cinemaService = new CinemaServices()
const sitesService = new SitesServices()

export default new MyAppControllers(infoService, cinemaService, sitesService)
