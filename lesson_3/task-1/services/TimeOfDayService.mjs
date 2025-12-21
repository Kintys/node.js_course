class TimeOfDayService {
    constructor(dateProvider = () => new Date()) {
        this.dateProvider = dateProvider
    }

    getTimeOfDay() {
        const hours = this.dateProvider().getHours()

        if (hours >= 6 && hours < 12) return 'Ранок'
        if (hours >= 12 && hours < 17) return 'Обід'
        if (hours >= 17 && hours < 22) return 'Вечір'
        return 'Ніч'
    }
}

export default TimeOfDayService
