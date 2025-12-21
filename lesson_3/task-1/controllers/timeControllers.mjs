import SeasonService from '../services/SeasonService.mjs'
import DayService from '../services/DayService.mjs'
import TimeOfDayService from '../services/TimeOfDayService.mjs'

class TimeControllers {
    constructor(seasonService, dayService, timeOfDayService) {
        this.seasonService = seasonService
        this.dayService = dayService
        this.timeOfDayService = timeOfDayService
    }

    renderMainPage = (req, res) => {
        res.render('index', {
            title: 'Завдання 1 ',
            taskImg:
                '<img src="https://cdn.discordapp.com/attachments/1020990384249241630/1452305533938831542/image.png?ex=6949546d&is=694802ed&hm=ecc1d754d8cea46f822a360f0baaff1ae6a94de45082daf816666cfc76ee5e4e&" alt="task"  width="400"/>'
        })
    }

    renderSeasonPage = (req, res) => {
        try {
            const currentSeason = this.seasonService.getSeason()
            res.render('time', {
                title: 'Сезон',
                text: 'Поточна пора року:',
                message: currentSeason
            })
        } catch (error) {
            res.status(500).render('error', { error })
        }
    }

    renderDayPage = (req, res) => {
        try {
            const currentDay = this.dayService.getCurrentDay()
            res.render('time', {
                title: 'День',
                text: 'Поточна дата:',
                message: currentDay
            })
        } catch (error) {
            res.status(500).render('error', { error })
        }
    }

    renderTimePage = (req, res) => {
        try {
            const currentTime = this.timeOfDayService.getTimeOfDay()
            res.render('time', {
                title: 'Час дня',
                text: 'Поточний час дня:',
                message: currentTime
            })
        } catch (error) {
            res.status(500).render('error', { error })
        }
    }
}

const seasonService = new SeasonService()
const dayService = new DayService()
const timeOfDayService = new TimeOfDayService()

export default new TimeControllers(seasonService, dayService, timeOfDayService)
